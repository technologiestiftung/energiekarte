import { FC, useState, useEffect } from 'react'
import { House, FootballField } from '@components/Icons/'

export interface PictogramType {
  energyUsage: number
  consumptionType: string
}

const energyComparison = {
  heat: 19500 * 3,
  electricity: 19500,
}

function getComparisonNumber(energyUsage: number, consumptionType: string) {
  return (
    // @ts-ignore
    Math.round((energyUsage / energyComparison[consumptionType]) * 100) / 100
  )
}

export const PictogramSolar: FC<PictogramType> = ({
  energyUsage,
  consumptionType,
}) => {
  const [numberOfPictograms, setNumberOfPictograms] = useState<number[]>([])

  useEffect(() => {
    const amountPictos =
      // @ts-ignore
      Math.round((energyUsage / energyComparison[consumptionType]) * 100) / 100
    // @ts-ignore
    const arr = Array.apply(null, { length: amountPictos })
    // @ts-ignore
    setNumberOfPictograms(arr)
  }, [consumptionType, energyUsage])

  if (energyUsage !== 0) {
    return (
      <>
        <p className="text-xs pt-2 pb-4 text-gray-500">
          Um den Stromverbauch aller Gebäude auf diesem Grundstück zu decken
          bräuchte es ca. {getComparisonNumber(energyUsage, consumptionType)}{' '}
          Tennisfelder mit Freiflächen PV-Anlage.
        </p>

        {numberOfPictograms.map((d, i) => (
          <span key={'picto-' + i}>
            <span className="inline-block ">
              <FootballField size={22} />
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
