export function getConsumtionColor(consumptionType, val, opt) {
  if (consumptionType === 'heat') {
    return val > 1200000
      ? '#9E1E0B'
      : val > 400000
      ? '#F03B20'
      : val > 0
      ? '#FEB24C'
      : opt?.text
      ? '#222222'
      : '#ffffff'
  } else {
    return val > 200000
      ? '#031A6D'
      : val > 60000
      ? '#276AEC'
      : val > 0
      ? '#719BF0'
      : opt?.text
      ? '#222222'
      : '#ffffff'
  }
}
