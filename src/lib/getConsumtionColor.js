export function getConsumtionColor(consumptionType, val) {
  if (consumptionType === 'heat') {
    return val > 1200000
      ? '#9E1E0B'
      : val > 400000
      ? '#F03B20'
      : val > 0
      ? '#FEB24C'
      : '#ffffff'
  } else {
    return val > 200000
      ? '#031A6D'
      : val > 60000
      ? '#276AEC'
      : val > 0
      ? '#719BF0'
      : '#ffffff'
  }
}
