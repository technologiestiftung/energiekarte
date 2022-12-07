import fs from 'fs'
import path from 'path'

export function getData() {
  const flurePath = path.join(process.cwd(), 'public/flure.json')
  const sanierungPath = path.join(process.cwd(), 'public/renovation.json')
  const flure = JSON.parse(fs.readFileSync(flurePath, 'utf-8'))
  const sanierung = JSON.parse(fs.readFileSync(sanierungPath, 'utf-8'))
  const verbrauchPath = path.join(process.cwd(), 'public/consuption.json')
  const verbrauch = JSON.parse(fs.readFileSync(verbrauchPath, 'utf-8'))
  return {
    props: { landparcel: flure, renovation: sanierung, consumption: verbrauch },
  }
}
