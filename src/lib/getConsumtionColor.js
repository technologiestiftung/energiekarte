const mapKeyValues = {
  heat: {
    colors: ['#9E1E0B', '#F03B20', '#FEB24C', '#ffffff'],
    values: [1200000, 400000, 0],
  },
  electricity: {
    colors: ['#031A6D', '#276AEC', '#719BF0', '#ffffff'],
    values: [200000, 60000, 0],
  },
}

export function getMapKeyValues(consumptionType) {
  return mapKeyValues[consumptionType]
}

export function getConsumtionColor(consumptionType, val) {
  return val > mapKeyValues[consumptionType].values[0]
    ? mapKeyValues[consumptionType].colors[0]
    : val > mapKeyValues[consumptionType].values[1]
    ? mapKeyValues[consumptionType].colors[1]
    : val > mapKeyValues[consumptionType].values[2]
    ? mapKeyValues[consumptionType].colors[2]
    : mapKeyValues[consumptionType].colors[3]
}
