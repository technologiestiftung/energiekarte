export function toCSV(pointData) {
  const headerTranslation = {
    x: 'lat',
    y: 'lng',
    houseComment: 'kommentar',
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
  let headersVerbrauch = ''
  verbrauchWant.forEach((head, i) => {
    headersVerbrauch += headerTranslation[head] ? headerTranslation[head] : head
    headersVerbrauch += verbrauchWant.length - 1 == i ? '' : ','
  })
  headersVerbrauch += '\n'

  let rowsVerbrauch = ''
  pointData.features.forEach((feat) => {
    verbrauchWant.forEach((d, ii) => {
      rowsVerbrauch += Number(feat.properties[d])
        ? feat.properties[d]
        : '"' + feat.properties[d] + '"'
      const comma = verbrauchWant.length - 1 == ii ? '' : ','
      rowsVerbrauch += comma
    })

    rowsVerbrauch += '\n'
  })

  let csvVerbrauch =
    'data:text/csv;charset=utf-8,' + headersVerbrauch + rowsVerbrauch

  var encodedUri = encodeURI(csvVerbrauch)
  var link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'odis-verbrauche.csv')
  document.body.appendChild(link) // Required for FF
  link.click() // This will download the data file named "my_data.csv".

  var encodedUri = encodeURI(csvVerbrauch)
  var link2 = document.createElement('a')
  link2.setAttribute('href', encodedUri)
  link2.setAttribute('download', 'odis-sanierungen.csv')
  document.body.appendChild(link2) // Required for FF

  link2.click() // This will download the data file named "my_data.csv".
}
