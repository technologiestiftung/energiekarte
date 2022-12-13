import { FC } from 'react'
import { Switch } from '@headlessui/react'

export interface SwitchEnergyType {}

export const SwitchEnergy: FC<SwitchEnergyType> = ({
  consumptionType,
  setConsumptionType,
}) => {
  return (
    <div className="flex top-[76px] sticky">
      <button
        onClick={() => setConsumptionType('entityElectricityUsage')}
        className={`${
          consumptionType === 'entityElectricityUsage'
            ? 'bg-primary text-secondary'
            : 'bg-secondary text-primary'
        } flex-1 rounded`}
      >
        Strom
      </button>
      <button
        onClick={() => setConsumptionType('entityHeatUsage')}
        className={`${
          consumptionType === 'entityHeatUsage'
            ? 'bg-primary text-secondary'
            : 'bg-secondary text-primary'
        } flex-1 rounded`}
      >
        Wärme
      </button>{' '}
    </div>
  )
}
