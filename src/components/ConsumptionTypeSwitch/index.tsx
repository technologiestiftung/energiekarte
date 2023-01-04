import { FC } from 'react'
export interface ConsumptionTypeSwitchType {}

export const ConsumptionTypeSwitch: FC<ConsumptionTypeSwitchType> = ({
  consumptionType,
  setConsumptionType,
}) => {
  return (
    <div className="fixed w-full top-4 z-20 text-center">
      <div className="text-xs mr-auto ml-auto w-fit cursor-pointer">
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
    </div>
  )
}
