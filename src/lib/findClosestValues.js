// sort data by value
// then find the closes entries
// return id of values

export function findClosestValues(data, consumptionType, id) {
  let more
  let less
  let lastWithValue
  let rankingPosition
  let dataSorted = [...data.features].filter((d) => d.properties.visible)
  dataSorted = dataSorted.sort(
    (a, b) => b.properties[consumptionType] - a.properties[consumptionType]
  )

  for (let index = 0; index < dataSorted.length; index++) {
    const hasValue = dataSorted[index].properties[consumptionType] !== 0

    if (hasValue) {
      lastWithValue = dataSorted[index].properties.entityId
    }
    if (dataSorted[index].properties.entityId === id) {
      rankingPosition = index + 1
      less = hasValue ? dataSorted[index + 1]?.properties.entityId : null
      more = hasValue
        ? dataSorted[index - 1]?.properties.entityId
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
