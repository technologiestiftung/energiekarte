export default function mapStyle() {
  return {
    version: 8,
    name: 'weihnachtsmarktkarte',
    metadata: {},
    sources: {
      osmBaseMap: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution:
          "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        // bounds: [13.076477, 52.340374, 13.760376, 52.664723],
      },
    },
    // "glyphs": "./data/{fontstack}/{range}.pbf",
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': '#949494',
        },
      },
      {
        id: 'osmBaseMap',
        type: 'raster',
        source: 'osmBaseMap',
        paint: {
          'raster-brightness-max': 0.3,
          'raster-saturation': -1,
        },
        layout: {
          visibility: 'none',
        },
      },
    ],
  }
}
