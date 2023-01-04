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
          onClick={() => setConsumptionType('electricity')}
          className={`${
            consumptionType === 'electricity'
              ? 'bg-primary text-secondary'
              : 'bg-secondary text-primary'
          } flex-1 rounded`}
        >
          Strom
        </button>
        <button
          onClick={() => setConsumptionType('heat')}
          className={`${
            consumptionType === 'heat'
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
