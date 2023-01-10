'use strict'

const fs = require('fs')
const async = require('async')
const Papa = require('papaparse')
const { getRenovationGeoJSON } = require('./getRenovationGeoJSON')
const { getConsuptionGeoJSON } = require('./getConsuptionGeoJSON')
const minMaxValues = {}

const headerTransaltions = {
  'lfd.': 'entityId',
  Wirtschaftseinheit: 'entityAddress',
  Gebaeudebezeichnung: 'houseName',
  Prio: 'housePrio',
  Nettoflaeche: 'houseArea',
  Einsparen: 'houseSavingPotential',
  Typ: 'entityType',
  'Art der Wärmeversorgung': 'entityHeatType',
  Wärmeverbrauch: 'heat',
  Stromverbrauch: 'electricity',
  Bemerkung: 'houseComment',
  PLZ: 'entityPLZ',
  Kosten: 'houseCosts',
  Denkmal: 'houseMonument',
  gc_xwert: 'x',
  gc_ywert: 'y',
  gc_ortsteil: 'ortsteil',
}

let dataSanierung = fs.readFileSync('dataIn/sanierungsplan.csv', 'utf-8')
let dataVerbrauch = fs.readFileSync('dataIn/verbrauch.csv', 'utf-8')
dataSanierung = Papa.parse(dataSanierung).data
dataVerbrauch = Papa.parse(dataVerbrauch).data

const dataVerbrauchHeader = dataVerbrauch[0]
const dataSanierungHeader = dataSanierung[0]
const allHeaders = [...dataSanierungHeader, ...dataVerbrauchHeader]

dataSanierung = dataSanierung.splice(1)
dataVerbrauch = dataVerbrauch.splice(1)
dataVerbrauch.pop()

async.eachSeries(
  dataSanierung,
  function (row, callbackEachRow) {
    const adrSanierung = row[1]
    if (!adrSanierung) {
      callbackEachRow()
      return
    }
    for (let i = 0; i < dataVerbrauch.length; i++) {
      const adrVerbrauch = dataVerbrauch[i][3]
      if (
        adrSanierung.includes(adrVerbrauch) ||
        adrVerbrauch.includes(adrSanierung)
      ) {
        row.push(...dataVerbrauch[i])
        break
      }

      const nonExistent = ['Wallstr. 32', 'WRD Feuerwehr SILB', 'Dorfstr. 3']

      if (nonExistent.includes(adrSanierung)) {
        row.push('nodata')
        break
      }

      if (
        adrSanierung === 'Märkische Allee 189' &&
        adrVerbrauch.includes('Märkische Allee 181, 189')
      ) {
        row.push(...dataVerbrauch[i])
        break
      }

      if (
        adrSanierung === 'Hallesches Ufer 32-38' &&
        adrVerbrauch.includes('Hallesches Ufer 34-38')
      ) {
        row.push(...dataVerbrauch[i])
        break
      }
    }
    callbackEachRow()
  },
  function (err) {
    const renovationGeoJSON = getRenovationGeoJSON(
      allHeaders,
      dataSanierung,
      headerTransaltions
    )
    const consuptionGeoJSON = getConsuptionGeoJSON(
      dataVerbrauchHeader,
      dataVerbrauch,
      headerTransaltions
    )

    // add the senierungsdata to the consuption data and sum up some values
    consuptionGeoJSON.features.forEach((featConsumption) => {
      featConsumption.properties.renovations = []
      featConsumption.properties.renovationsCosts = 0
      featConsumption.properties.renovationsArea = 0
      featConsumption.properties.renovationsSavingsMax = null
      featConsumption.properties.renovationsSavingsMin = 10000000000000000000000000

      renovationGeoJSON.features.forEach((featRenovation) => {
        if (
          featConsumption.properties.entityId ===
          featRenovation.properties.entityId
        ) {
          featConsumption.properties.renovations.push(featRenovation.properties)
          featConsumption.properties.renovationsCosts +=
            featRenovation.properties.houseCosts
          featConsumption.properties.renovationsArea +=
            featRenovation.properties.houseArea

          const minMaxValues = featRenovation.properties.houseSavingPotential
            .replace('%', '')
            .split('-')

            .map((d) => Number(d))
          if (!minMaxValues[1]) {
            featConsumption.properties.renovationsSavingsMin = null
            featConsumption.properties.renovationsSavingsMax = null
          } else {
            featConsumption.properties.renovationsSavingsMin = Math.min(
              minMaxValues[0],
              featConsumption.properties.renovationsSavingsMin
            )
            featConsumption.properties.renovationsSavingsMax = Math.max(
              minMaxValues[1],
              featConsumption.properties.renovationsSavingsMax
            )
          }
        }
      })
    })

    minMaxValues.amountRenovations = renovationGeoJSON.features.length
    minMaxValues.maxElectricity = Math.max(
      ...consuptionGeoJSON.features.map(function (f) {
        return f.properties.electricity
      })
    )
    minMaxValues.maxHeat = Math.max(
      ...consuptionGeoJSON.features.map(function (f) {
        return f.properties.heat
      })
    )
    minMaxValues.maxRenovationCosts = Math.max(
      ...consuptionGeoJSON.features.map(function (f) {
        return f.properties.renovationsCosts
      })
    )
    minMaxValues.minRenovationCosts = Math.min(
      ...consuptionGeoJSON.features.map(function (f) {
        return f.properties.renovationsCosts
      })
    )

    console.log(minMaxValues)

    fs.writeFile(
      `../public/pointData.json`,
      JSON.stringify(consuptionGeoJSON),
      function (err) {
        console.log('all done')
      }
    )
  }
)
