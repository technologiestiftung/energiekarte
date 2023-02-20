export function getStripes({ color }) {
  if (document) {
    const canvas = document.createElement('canvas')
    const size = 300
    canvas.width = size
    canvas.height = size
    const drawingContext = canvas.getContext('2d')
    const colorBackgound = '#00000000'
    const numberOfStripes = 60

    for (let i = 0; i < numberOfStripes * 2; i++) {
      const thickness = size / numberOfStripes
      drawingContext.beginPath()
      drawingContext.strokeStyle = i % 2 ? colorBackgound : color
      drawingContext.lineWidth = thickness
      drawingContext.lineCap = 'round'

      drawingContext.moveTo(i * thickness + thickness / 2 - size, 0)
      drawingContext.lineTo(0 + i * thickness + thickness / 2, size)
      drawingContext.stroke()
    }
    return drawingContext.getImageData(0, 0, canvas.width, canvas.height)
  }
}
