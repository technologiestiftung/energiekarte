import { FC, useState, useEffect } from 'react'
import { House } from '@components/Icons/'

export interface PictogramType {
  energyUsage: number
  consumptionType: string
}

const houseConsuption = 5000

function getComparisonNumber(energyUsage: number, consumptionType: string) {
  return (
    // @ts-ignore
    // Math.round((energyUsage / energyComparison[consumptionType]) * 100) / 100
    Math.round(energyUsage / houseConsuption)
  )
}

export const Pictogram: FC<PictogramType> = ({
  energyUsage,
  consumptionType,
}) => {
  const [numberOfPictograms, setNumberOfPictograms] = useState<number[]>([])
  const [amountHouseholds, setAmountHouseholds] = useState<number>(0)

  useEffect(() => {
    const pictos =
      // @ts-ignore
      Math.round(energyUsage / houseConsuption)
    setAmountHouseholds(pictos)
    // @ts-ignore
    const arr = Array.apply(null, { length: pictos })
    // @ts-ignore
    setNumberOfPictograms(arr)
  }, [consumptionType, energyUsage])

  if (energyUsage !== 0) {
    return (
      <>
        <p className="text-xs pt-2 pb-4 text-gray-500">
          Der Verbrauch aller Gebäude dieser Einrichtung entspricht etwa dem
          Energieverbrauch von{' '}
          <span className={'font-bold'}>{amountHouseholds} </span>
          Einfamilienhäusern mit 5 Personen ({houseConsuption} kWh).
        </p>

        {amountHouseholds <= 40 && (
          <div className="pb-4 grid grid-cols-10">
            {numberOfPictograms.map((d, i) => (
              <span key={'picto-' + i} className="inline-block">
                <House size={22} />
              </span>
            ))}
          </div>
        )}
        {amountHouseholds > 40 && amountHouseholds <= 81 && (
          <div className="leading-4 grid grid-cols-20">
            {numberOfPictograms.map((d, i) => (
              <span key={'picto-' + i} className="pb-1">
                <House size={12} />
              </span>
            ))}
          </div>
        )}
        {amountHouseholds > 80 && (
          <div className="leading-4 grid grid-cols-30">
            {numberOfPictograms.map((d, i) => (
              <span key={'picto-' + i} className="pb-1">
                <House size={8} />
              </span>
            ))}
          </div>
        )}
      </>
    )
  } else {
    return <span className="text-xs">Es liegt kein Stromverbrauch vor.</span>
  }
}
