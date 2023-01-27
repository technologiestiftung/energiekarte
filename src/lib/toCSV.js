export function toCSV(pointData) {
  const headerTranslation = {
    x: 'lat',
    y: 'lng',
    houseComment: 'kommentar',
    entityAddress: 'adresse',
    entityPLZ: 'plz',
    entityType: 'type',
    houseArea: 'fleach',
    houseCosts: 'kosten',
    houseMonument: 'denkmal',
    houseName: 'name',
    housePrio: 'prio',
    houseSavingPotential: 'einsparpotenzial',
  }
  const verbrauchWant = [
    'entityId',
    'entityType',
    'entityAddress',
    'entityPLZ',
    'entityHeatType',
    'heat',
    'electricity',
    'houseComment',
    'x',
    'y',
    'ortsteil',
    'renovationsCosts',
    'renovationsArea',
    'renovationsSavingsMax',
    'renovationsSavingsMin',
  ]
  const sanierungWant = [
    'entityAddress',
    // 'entityId',
    'entityPLZ',
    'entityType',
    'houseArea',
    'houseCosts',
    'houseMonument',
    'houseName',
    'housePrio',
    'houseSavingPotential',
  ]

  let headersVerbrauch = ''
  verbrauchWant.forEach((head, i) => {
    headersVerbrauch += headerTranslation[head] ? headerTranslation[head] : head
    headersVerbrauch += verbrauchWant.length - 1 == i ? '' : ','
  })
  headersVerbrauch += '\n'

  let headersSanierungen = ''
  sanierungWant.forEach((head, i) => {
    headersSanierungen += headerTranslation[head]
      ? headerTranslation[head]
      : head
    headersSanierungen += sanierungWant.length - 1 == i ? '' : ','
  })
  headersSanierungen += '\n'

  let rowsVerbrauch = ''
  pointData.features.forEach((feat) => {
    console.log(feat.properties.renovations)
    verbrauchWant.forEach((d, ii) => {
      rowsVerbrauch += Number(feat.properties[d])
        ? feat.properties[d]
        : '"' + feat.properties[d] + '"'
      const comma = verbrauchWant.length - 1 == ii ? '' : ','
      rowsVerbrauch += comma
    })
    rowsVerbrauch += '\n'
  })

  let rowsSanierung = ''
  pointData.features.forEach((feat) => {
    feat.properties.renovations.forEach((renovation, ii) => {
      sanierungWant.forEach((d, ii) => {
        rowsSanierung += Number(renovation[d])
          ? renovation[d]
          : '"' + renovation[d] + '"'
        const comma = sanierungWant.length - 1 == ii ? '' : ','
        rowsSanierung += comma
      })
      rowsSanierung += '\n'
    })
  })

  let csvVerbrauch =
    'data:text/csv;charset=utf-8,' + headersVerbrauch + rowsVerbrauch

  let csvSanierung =
    'data:text/csv;charset=utf-8,' + headersSanierungen + rowsSanierung

  var encodedUri = encodeURI(csvVerbrauch)
  var link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'odis-verbrauch.csv')
  document.body.appendChild(link) // Required for FF
  link.click() // This will download the data file named "my_data.csv".

  var encodedUri = encodeURI(csvSanierung)
  var link2 = document.createElement('a')
  link2.setAttribute('href', encodedUri)
  link2.setAttribute('download', 'odis-sanierungen.csv')
  document.body.appendChild(link2) // Required for FF

  link2.click() // This will download the data file named "my_data.csv".
}
