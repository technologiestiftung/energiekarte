// sort data by value
// then find the closes entries
// return id of values

export function findClosestValues(data, consumptionType, id) {
  let min
  let max
  let lastWithValue
  const dataSorted = data.features.sort(
    (a, b) => b.properties[consumptionType] - a.properties[consumptionType]
  )

  for (let index = 0; index < dataSorted.length; index++) {
    const hasValue = dataSorted[index].properties[consumptionType] !== -1

    if (hasValue) {
      lastWithValue = dataSorted[index].properties.entityId
    }
    if (dataSorted[index].properties.entityId === id) {
      min = data.features[index - 1]?.properties.entityId
      max = hasValue
        ? data.features[index + 1]?.properties.entityId
        : lastWithValue
      break
    }
  }
  return [max, min]
}
