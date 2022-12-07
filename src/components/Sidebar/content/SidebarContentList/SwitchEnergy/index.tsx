import { FC } from 'react'
import { Switch } from '@headlessui/react'

export interface SwitchEnergy {}

export const SwitchEnergy: FC<SwitchEnergy> = ({
  consumptionType,
  setConsumptionType,
}) => {
  function onSwitch(enabled) {
    if (enabled) {
      setConsumptionType('entityElectricityUsage')
    } else {
      setConsumptionType('entityHeatUsage')
    }
  }

  return (
    <div className="top-[76px] py-2 flex sticky bg-secondary">
      <div className="pr-2 text-sm">Wärme</div>
      <Switch
        checked={consumptionType === 'entityElectricityUsage'}
        onChange={onSwitch}
        className={`${
          consumptionType === 'entityElectricityUsage'
            ? 'bg-primary'
            : 'bg-primary'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            consumptionType === 'entityElectricityUsage'
              ? 'translate-x-6'
              : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition text-center `}
        />
      </Switch>
      <div className="pl-2 text-sm">Strom</div>
    </div>
  )
}
