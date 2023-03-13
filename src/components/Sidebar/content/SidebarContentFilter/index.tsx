import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { Accordion } from '@components/Accordion'
import { RangeSlider } from '@components/RangeSlider'
import { Square, CheckSquare } from '@components/Icons/'

export interface SidebarContentFilterType {
  data: any
}

const defaultValues = {
  electricityConsumption: [0, 5000000],
  heatConsumption: [0, 30000000],
  renovationCosts: [0, 71000000],
  savingPotential: [0, 100],
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({ }) => {
  // FILTER
  const [filterBuildingType, setFilterBuildingType] = useState<string | null>(
    null
  )
  const [filterHeatType, setFilterHeatType] = useState<string | null>(null)
  const [filterElectricityConsumption, setFilterElectricityConsumption] =
    useState<number[]>(defaultValues.electricityConsumption)
  const [filterHeatConsumption, setFilterHeatConsumption] = useState<number[]>(
    defaultValues.heatConsumption
  )
  const [filterRenovationCosts, setFilterRenovationCosts] = useState<number[]>(
    defaultValues.renovationCosts
  )
  const [filterSavingPotential, setFilterSavingPotential] = useState<number[]>(
    defaultValues.savingPotential
  )

  function resetFilter() {
    setFilterBuildingType(null)
    setFilterHeatType(null)
    setFilterElectricityConsumption(defaultValues.electricityConsumption)
    setFilterHeatConsumption(defaultValues.heatConsumption)
  }

  const buidlingTypes = [
    { lable: 'Allgemeiner Bestand', value: 'Allgemeiner Bestand' },
    { lable: 'Externe Mieter', value: 'externe Mieter' },
    { lable: 'Feuerwehr', value: 'Feuerwehr' },
    { lable: 'Flüchtlingsunterbringung', value: 'Geflüchtetenunterbringung' },
    { lable: 'Gericht', value: 'Gerichte' },
    { lable: 'Justizvollzugsanstalt', value: 'JVA' },
    { lable: 'Kultur', value: 'Kultur' },
    { lable: 'Polizei', value: 'Polizei' },
    { lable: 'Schulen', value: 'Schule' },
  ]

  const filterHeatTypes = [
    { lable: 'Fernwärme', value: 'Fernwärme' },
    { lable: 'Gas', value: 'Gas' },
    { lable: 'Nahwärme', value: 'Nahwärme' },
    { lable: 'Öl', value: 'Öl' },
    { lable: 'Pellet', value: 'Pellet' },
  ]

  return (
    <>
      <SidebarHeader text="Filter" />

      <SidebarBody>
        <p className="py-2 text-sm">
          Hier lassen sich die Adressen nach verschiedenen Merkmalen filtern.
        </p>
        <Accordion title="Gebäudetyp" acitve={true}>
          {buidlingTypes?.map((type) => (
            <button
              className={classNames(
                'block w-full text-left hover:text-primary '
              )}
              onClick={() =>
                setFilterBuildingType(
                  type.value !== filterBuildingType ? type.value : null
                )
              }
              key={type.value}
            >
              <span
                className={classNames(
                  type.value === filterBuildingType
                    ? 'text-primary font-bold'
                    : '',
                  'text-xs inline-block mr-2'
                )}
              >
                {' '}
                {type.value === filterBuildingType ? (
                  <CheckSquare size={18} />
                ) : (
                  <Square size={18} />
                )}
              </span>
              <span className="relative bottom-0.5">{type.lable}</span>
            </button>
          ))}
        </Accordion>
        <Accordion title="Wärmetyp" acitve={true}>
          {filterHeatTypes?.map((type) => (
            <button
              className={classNames(
                type.value === filterHeatType ? '!text-primary font-bold' : '',
                'block'
              )}
              onClick={() =>
                setFilterHeatType(
                  type.value !== filterHeatType ? type.value : null
                )
              }
              key={type.value}
            >
              <span
                className={classNames(
                  type.value === filterHeatType ? 'text-primary font-bold' : '',
                  'text-xs inline-block mr-2'
                )}
              >
                {' '}
                {type.value === filterHeatType ? (
                  <CheckSquare size={18} />
                ) : (
                  <Square size={18} />
                )}
              </span>
              <span className="relative bottom-0.5">{type.lable}</span>
            </button>
          ))}
        </Accordion>
        <Accordion title="Stromverbrauch" acitve={true}>
          <p className="text-xs">
            Der Verbrauch bezieht sich auf die Summe aller Gebäude auf einem
            Grundstück.
            <b className="block pt-2">In Mio. kWh/a</b>
          </p>
          <RangeSlider
            value={filterElectricityConsumption}
            setValue={setFilterElectricityConsumption}
            minValue={defaultValues.electricityConsumption[0]}
            maxValue={defaultValues.electricityConsumption[1]}
            step={100000}
            rounding={'million'}
          />
        </Accordion>
        <Accordion title="Wärmeverbrauch" acitve={true}>
          <p className="text-xs">
            Der Verbrauch bezieht sich auf die Summe aller Gebäude auf einem
            Grundstück.
            <b className="block pt-2">In Mio. kWh/a</b>
          </p>
          <RangeSlider
            value={filterHeatConsumption}
            setValue={setFilterHeatConsumption}
            minValue={defaultValues.heatConsumption[0]}
            maxValue={defaultValues.heatConsumption[1]}
            step={100000}
            rounding={'million'}
          />
        </Accordion>
        <Accordion title="Sanierungskosten" acitve={true}>
          <p className="text-xs">
            Sanierungskosten beziehen sich auf die Summe der zu sanierenden
            Gebäude auf einem Grundstück.
            <b className="block pt-2">In Millionen Euro</b>
          </p>
          <RangeSlider
            value={filterRenovationCosts}
            setValue={setFilterRenovationCosts}
            minValue={defaultValues.renovationCosts[0]}
            maxValue={defaultValues.renovationCosts[1]}
            step={100000}
            rounding={'million'}
          />
        </Accordion>
        <Accordion title="Einsparpotenzial" acitve={true}>
          <p className="text-xs">
            Das Einsparpotential ist nur eine Schätzung, die sich stets in einem
            Rahmen befindet.
            <b className="block pt-2">In %</b>
          </p>
          <RangeSlider
            value={filterSavingPotential}
            setValue={setFilterSavingPotential}
            minValue={defaultValues.savingPotential[0]}
            maxValue={defaultValues.savingPotential[1]}
            step={10}
          />
        </Accordion>

        {(filterBuildingType || filterHeatType) && (
          <button
            className="text-secondary block mr-auto ml-auto sticky bottom-4 mb-8 px-4 bg-primary hover:bg-primary hover:text-secondary p-2 text-bold rounded border-1 border-textcolor "
            onClick={resetFilter}
          >
            Filter zurücksetzen
          </button>
        )}
      </SidebarBody>
    </>
  )
}
