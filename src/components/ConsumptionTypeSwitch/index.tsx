import { FC } from 'react'
export interface ConsumptionTypeSwitchType {}

export const ConsumptionTypeSwitch: FC<ConsumptionTypeSwitchType> = ({
  consumptionType,
  setConsumptionType,
}) => {
  return (
    <div className="fixed w-full top-4 z-20 text-center">
      <div className=" mr-auto ml-auto w-fit cursor-pointer text-xs md:text-base ">
        <button
          onClick={() => setConsumptionType('electricity')}
          className={`${
            consumptionType === 'electricity'
              ? 'bg-primary text-secondary'
              : 'bg-secondary text-textcolor'
          } flex-1 rounded-l-2xl w-16 md:w-20 py-2.5  hover:bg-primary hover:text-secondary`}
        >
          Strom
        </button>
        <button
          onClick={() => setConsumptionType('heat')}
          className={`${
            consumptionType === 'heat'
              ? 'bg-primary text-secondary'
              : 'bg-secondary text-textcolor'
          } flex-1 rounded-r-2xl w-16 md:w-20 py-2.5  hover:bg-primary hover:text-secondary`}
        >
          Wärme
        </button>{' '}
      </div>
    </div>
  )
}
