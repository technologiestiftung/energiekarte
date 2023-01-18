// sort data by value
// then find the closes entries
// return id of values

export function findClosestValues(data, consumptionType, id) {
  let more
  let less
  let lastWithValue
  let rankingPosition
  const dataSorted = [...data.features].sort(
    (a, b) => b.properties[consumptionType] - a.properties[consumptionType]
  )

  for (let index = 0; index < dataSorted.length; index++) {
    const hasValue = dataSorted[index].properties[consumptionType] !== 0

    if (hasValue) {
      lastWithValue = dataSorted[index].properties.entityId
    }
    if (dataSorted[index].properties.entityId === id) {
      rankingPosition = index + 1
      console.log('hasValue', hasValue)
      less = hasValue ? dataSorted[index + 1]?.properties.entityId : null
      more = hasValue
        ? dataSorted[index - 1]?.properties.entityId
        : lastWithValue
      break
    }
  }

  console.log(more, less)

  return {
    idMore: more,
    idLess: less,
    rankingPosition: rankingPosition,
    rankingLength: dataSorted.length,
  }
}
