export function getDataFromId(id, energyData) {
  let renovationFromId = []
  let consumptionFromId

  energyData.renovation.features.forEach((d) => {
    if (d.properties.entityId === id) {
      renovationFromId.push(d)
    }
  })

  energyData.consumption.features.forEach((d) => {
    if (d.properties.entityId === id) {
      consumptionFromId = d
    }
  })

  return { consumption: consumptionFromId, renovation: renovationFromId }
}
