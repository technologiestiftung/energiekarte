import { FC, useState, useEffect } from 'react'
import { House } from '@components/Icons/'

export interface PictogramType {}

const energyComparison = {
  heat: 5500,
  electricity: 5500,
}

function getComparisonNumber(energyUsage, consumptionType) {
  return (
    Math.round((energyUsage / energyComparison[consumptionType]) * 100) / 100
  )
}

export const Pictogram: FC<PictogramType> = ({
  energyUsage,
  consumptionType,
}) => {
  const [numberOfPictograms, setNumberOfPictograms] = useState<number>(40)

  useEffect(() => {
    const pictos =
      Math.round((energyUsage / energyComparison[consumptionType]) * 100) / 100

    setNumberOfPictograms(pictos)
  }, [consumptionType, energyUsage])

  if (energyUsage !== 0) {
    return (
      <>
        <p className="text-xs pt-2 pb-4 text-gray-500">
          Der Verbrauch aller Gebäude auf diesem Grundstück entspricht dem
          Energieverbauch von ca.{' '}
          {getComparisonNumber(energyUsage, consumptionType)}{' '}
          5-Personenhaushalten ({energyUsage.toLocaleString('de-DE')} kWh).
        </p>
        {Array.apply(null, { length: numberOfPictograms }).map((d, i) => (
          <span key={'picto-' + i}>
            <span className="inline-block ">
              <House size={22} />
            </span>
            {i === 9 || i === 19 || i === 29 ? <br /> : null}
          </span>
        ))}
      </>
    )
  } else {
    return <span className="text-xs">Es liegt kein Stromverbrauch vor.</span>
  }
}
