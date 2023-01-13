export function getDataFromId(id, energyData) {
  let energyDataFromId

  energyData.features.forEach((d) => {
    if (d.properties.entityId === id) {
      energyDataFromId = d
    }
  })

  return energyDataFromId
}
