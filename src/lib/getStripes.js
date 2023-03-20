export function getStripes({
  color = '#000000',
  width = 10,
  height = 10,
  stripeGap = 3,
  stripeWidth = 4,
  stripeAngle = 90,
}) {
  const data = new Uint8ClampedArray(width * height * 4)
  const stripeLength = stripeWidth + stripeGap

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4
      const stripeIndex =
        y * Math.cos((stripeAngle * Math.PI) / 180) +
        x * Math.sin((stripeAngle * Math.PI) / 180)

      if (stripeIndex % stripeLength < stripeWidth) {
        data[index] = parseInt(color.slice(1, 3), 16)
        data[index + 1] = parseInt(color.slice(3, 5), 16)
        data[index + 2] = parseInt(color.slice(5, 7), 16)
        data[index + 3] = 180
      } else {
        data[index] = 0
        data[index + 1] = 0
        data[index + 2] = 0
        data[index + 3] = 0
      }
    }
  }

  return { data, width, height }
}
