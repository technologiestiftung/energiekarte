export function getMaxMinValues(energyData) {
  console.log(energyData)
  let renovationFromId = []
  let consumptionFromId

  energyData.renovation.features.forEach((d) => {
    renovationFromId.push(d)
  })

  energyData.consumption.features.forEach((d) => {
    consumptionFromId = d
  })

  const maxElectricity = Math.max(
    ...energyData.consumption.features.map(function (o) {
      return o.properties.electricity
    })
  )

  const maxHeat = Math.max(
    ...energyData.consumption.features.map(function (o) {
      return o.properties.heat
    })
  )

  const sanierungById = {}

  const maxSanierung = Math.max(
    ...energyData.consumption.features.map(function (o) {
      return o.properties.heat
    })
  )

  const minSanierung = Math.max(
    ...energyData.consumption.features.map(function (o) {
      return o.properties.heat
    })
  )

  const maxSaving = Math.max(
    ...energyData.consumption.features.map(function (o) {
      return o.properties.heat
    })
  )

  const minaving = Math.max(
    ...energyData.consumption.features.map(function (o) {
      return o.properties.heat
    })
  )

  const data = { maxElectricity: maxElectricity, maxHeat: maxHeat }
  console.log(data)
  return data
}
