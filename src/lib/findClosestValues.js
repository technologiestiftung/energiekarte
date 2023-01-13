// sort data by value
// then find the closes entries
// return id of values

export function findClosestValues(data, consumptionType, id) {
  let more
  let less
  let lastWithValue
  let rankingPosition
  const dataSorted = data.features.sort(
    (a, b) => b.properties[consumptionType] - a.properties[consumptionType]
  )

  for (let index = 0; index < dataSorted.length; index++) {
    const hasValue = dataSorted[index].properties[consumptionType] !== -1

    if (hasValue) {
      lastWithValue = dataSorted[index].properties.entityId
    }
    console.log(hasValue)
    if (dataSorted[index].properties.entityId === id) {
      rankingPosition = index + 1
      less = hasValue ? data.features[index + 1]?.properties.entityId : null
      more = hasValue
        ? data.features[index - 1]?.properties.entityId
        : lastWithValue
      break
    }
  }

  return {
    idMore: more,
    idLess: less,
    rankingPosition: rankingPosition,
    rankingLength: dataSorted.length,
  }
}
