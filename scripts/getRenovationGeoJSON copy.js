'use strict'

module.exports = { getRenovationGeoJSON }

function getRenovationGeoJSON(allHeaders, dataSanierung,headerTransaltions) {
  const sanierungGeoJSON = {
    type: 'FeatureCollection',
    name: 'sanierung',
    crs: {
      type: 'name',
      properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
    },
    features: [],
  }

  dataSanierung.forEach((element) => {
    const props = {}
    const coordinates = {}

    allHeaders.forEach((h, i) => {
      if (headersWant.includes(h)) {
        props[headerTransaltions[h]||h] = element[i]
      }
      if (h.includes('gc_xwert') || h.includes('gc_ywert')) {
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
      sanierungGeoJSON.features.push(feature)
    }
  })
  return sanierungGeoJSON
}



const headersWant = [
  // 'Nr',
  // 'Addresse',
  'Gebaeudebezeichnung',
  // 'Plz',
  'Nettoflaeche',
  'Denkmal',
  'Prio',
  'Einsparen',
  'Kosten',
  'lfd.',
  // 'Segment - Liegenschaft',
  'Typ',
  'Wirtschaftseinheit',
  'PLZ',
  // 'Art der Wärmeversorgung',
  // 'Wärmeverbrauch',
  // 'Stromverbrauch',
  // 'Bemerkung',
  // 'Adresse',
  // 'Wirtschaftseinheit_check',
  // 'gc_xwert',
  // 'gc_ywert',
  // 'gc_ortsteil',
  // 'gc_haus',
  // 'gc_wert',
  // 'gc_typ',
  // 'geo_corrected',
  // 'more_work',
]