import fs from 'fs'
import path from 'path'

export function getData() {
  const flurePath = path.join(process.cwd(), 'public/flure.json')
  const flure = JSON.parse(fs.readFileSync(flurePath, 'utf-8'))
  const pointDataPath = path.join(process.cwd(), 'public/pointData.json')
  const pointData = JSON.parse(fs.readFileSync(pointDataPath, 'utf-8'))
  return {
    props: { landparcel: flure, pointData: pointData },
  }
}
