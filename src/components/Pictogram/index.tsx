import { FC } from 'react'
import { House } from '@components/Icons/'

export interface PictogramType {}

const energyComparison = {
  heat: 5500,
  electricity: 5500,
}

function getUsageData(feat, type) {
  if (feat[type] && feat[type] != 0 && feat[type] !== -1) {
    return Number(feat[type])
  } else {
    return 0
  }
}

function getComparisonNumber(feat, type) {
  return (
    Math.round((getUsageData(feat, type) / energyComparison[type]) * 100) / 100
  )
}

export const Pictogram: FC<PictogramType> = ({ data, consumptionType }) => {
  return (
    <>
      <p className="text-xs pt-2 pb-4 text-gray-500">
        Der Verbrauch aller Gebäude auf diesem Grundstück entspricht dem
        Energieverbauch von ca. {getComparisonNumber(data, consumptionType)}{' '}
        5-Personenhaushalten (
        {energyComparison[consumptionType].toLocaleString('de-DE')} kWh).
      </p>
      {Array.apply(null, { length: 40 }).map((d, i) => (
        <>
          <span className="inline-block ">
            <House size={22} />
          </span>
          {i === 9 || i === 19 || i === 29 ? <br /> : null}
        </>
      ))}
    </>
  )
}
