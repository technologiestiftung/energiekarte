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
  'Wärmeverbrauch Witterung': 'heat',
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
// dataVerbrauch.pop()

let noMatch = {}

async.eachSeries(
  dataSanierung,
  function (row, callbackEachRow) {
    const adrSanierung = row[1].trim().replaceAll('\n', '')
    if (!adrSanierung) {
      callbackEachRow()
      console.log('THIS should not happen')
      return
    }
    noMatch[adrSanierung] = 'HI'

    for (let i = 0; i < dataVerbrauch.length; i++) {
      const adrVerbrauch = dataVerbrauch[i][1].trim().replaceAll('\n', '')
      if (
        adrSanierung.includes(adrVerbrauch) ||
        adrVerbrauch.includes(adrSanierung)
      ) {
        row.push(...dataVerbrauch[i])
        delete noMatch[adrSanierung]
        break
      }

      const nonExistent = ['Wallstr. 32', 'WRD Feuerwehr SILB', 'Dorfstr. 3']

      if (nonExistent.includes(adrSanierung)) {
        row.push('nodata')
        delete noMatch[adrSanierung]

        break
      }

      if (
        adrSanierung === 'Märkische Allee 189' &&
        adrVerbrauch.includes('Märkische Allee 181, 189')
      ) {
        row.push(...dataVerbrauch[i])
        delete noMatch[adrSanierung]

        break
      }

      if (
        adrSanierung === 'Hallesches Ufer 32-38' &&
        adrVerbrauch.includes('Hallesches Ufer 34-38')
      ) {
        row.push(...dataVerbrauch[i])
        delete noMatch[adrSanierung]

        break
      }
    }
    callbackEachRow()
  },
  function (err) {
    console.log(noMatch)

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
      featConsumption.properties.renovationsSavingsMax = 0
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
          // console.log('!!!!!', featRenovation.properties.houseSavingPotential)

          const minMaxValues = featRenovation.properties.houseSavingPotential
            .replace('%', '')
            .replace('>', '')
            .split('-')
            .map((d) => Number(d))

          if (minMaxValues.length === 1) {
            minMaxValues.unshift(0)
            // console.log('öööö', minMaxValues)
          }

          if (!minMaxValues[1]) {
            console.log(
              '?????',
              featRenovation.properties.houseSavingPotential,
              minMaxValues
            )
            featConsumption.properties.renovationsSavingsMin = 0
            featConsumption.properties.renovationsSavingsMax = 0
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

    consuptionGeoJSON.features.forEach((featConsumption) => {
      if (
        featConsumption.properties.renovationsSavingsMin ===
        10000000000000000000000000
      ) {
        featConsumption.properties.renovationsSavingsMin = 0
      }
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
