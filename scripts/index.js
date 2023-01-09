'use strict'

const fs = require('fs')
const glob = require('glob')
const async = require('async')
const Papa = require('papaparse')
const { getRenovationGeoJSON } = require('./getRenovationGeoJSON')
const { getConsuptionGeoJSON } = require('./getConsuptionGeoJSON')

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
let finalFile = [allHeaders]

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

    // finalFile.push(...dataSanierung)
    // let csv = Papa.unparse(finalFile, { newline: '\r\n' })
    // // write CSV with all data
    // fs.writeFile(`dataOut/sanierungExtended.csv`, csv, function (err) {
    //   console.log('data analysed vvvv')
    // })

    fs.writeFile(
      `../public/renovation.json`,
      JSON.stringify(renovationGeoJSON),
      function (err) {
        fs.writeFile(
          `../public/consuption.json`,
          JSON.stringify(consuptionGeoJSON),
          function (err) {
            console.log('all done')
          }
        )
      }
    )
  }
)

// non existent cco
