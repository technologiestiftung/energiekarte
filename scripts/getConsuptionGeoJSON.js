'use strict'

module.exports = { getConsuptionGeoJSON }

function getConsuptionGeoJSON(headers, dataVerbrauch, headerTransaltions) {
  const consuptionGeoJSON = {
    type: 'FeatureCollection',
    name: 'sanierung',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: [],
  }

  dataVerbrauch.forEach((element) => {
    const props = {}
    const coordinates = {}

    headers.forEach((h, i) => {
      if (headersWant.includes(h)) {
        props[headerTransaltions[h] || h] = Number(element[i])
          ? Number(element[i])
          : h === 'Wärmeverbrauch' || h === 'Stromverbrauch'
          ? -1
          : element[i]
      }
      if (h.includes('gc_xwert') || h.includes('gc_ywert')) {
        console.log(i, element[i])

        coordinates[h] = Number(element[i])
      }
    })

    if (coordinates.gc_xwert) {
      const feature = {
        type: 'Feature',
        properties: props,
        geometry: {
          type: 'Point',
          coordinates: [coordinates.gc_xwert, coordinates.gc_ywert],
        },
      }
      consuptionGeoJSON.features.push(feature)
    }
  })
  return consuptionGeoJSON
}

const headersWant = [
  // 'Nr',
  // 'Addresse',
  'Gebaeudebezeichnung',
  // 'Plz',
  'Nettoflaeche',
  'Denkmal',
  // 'Prio',
  // 'Einsparen',
  // 'Kosten',
  'lfd.',
  // 'Segment - Liegenschaft',
  'Typ',
  'Wirtschaftseinheit',
  'PLZ',
  'Art der Wärmeversorgung',
  'Wärmeverbrauch',
  'Stromverbrauch',
  'Bemerkung',
  // 'Adresse',
  // 'Wirtschaftseinheit_check',
  'gc_xwert',
  'gc_ywert',
  'gc_ortsteil',
  // 'gc_haus',
  // 'gc_wert',
  // 'gc_typ',
  // 'geo_corrected',
  // 'more_work',
]
