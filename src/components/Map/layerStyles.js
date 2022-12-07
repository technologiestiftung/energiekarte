export const layerStyles = {
  landparcel: {
    id: 'layer-landparcel',
    type: 'line',
    paint: {
      // 'line-dasharray':[1,1],
      'line-color': '#9bc95b',
      'line-blur': 2,
      'line-width': 5,
      'line-opacity': [
        'interpolate',
        ['exponential', 0.5],
        ['zoom'],
        13,
        0,
        22,
        1,
      ],
    },
  },
}
