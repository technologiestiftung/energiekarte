import { FC } from 'react'
export interface ConsumptionTypeSwitchType {}

export const ConsumptionTypeSwitch: FC<ConsumptionTypeSwitchType> = ({
  consumptionType,
  setConsumptionType,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden fixed z-20 left-2/4 -translate-x-2/4 top-4 w-fit cursor-pointer text-xs md:text-base shadow-lg">
      <button
        onClick={() => setConsumptionType('electricity')}
        className={`${
          consumptionType === 'electricity'
            ? 'bg-primary text-secondary'
            : 'bg-secondary text-textcolor'
        } flex-1  w-16 md:w-20 py-2.5  hover:bg-primary hover:text-secondary`}
      >
        Strom
      </button>
      <button
        onClick={() => setConsumptionType('heat')}
        className={`${
          consumptionType === 'heat'
            ? 'bg-primary text-secondary'
            : 'bg-secondary text-textcolor'
        } flex-1 w-16 md:w-20 py-2.5  hover:bg-primary hover:text-secondary`}
      >
        Wärme
      </button>{' '}
    </div>
  )
}
