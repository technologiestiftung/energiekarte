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

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({}) => {
  const [filterBuildingType, setFilterBuildingType] = useState<string | null>(
    null
  )
  const [filterHeatType, setFilterHeatType] = useState<string | null>(null)
  const [filterElectricityConsumption, setFilterElectricityConsumption] =
    useState<number[]>([0, 4896155])
  const [filterHeatConsumption, setFilterHeatConsumption] = useState<number[]>([
    0, 100,
  ])
  const [filterRenovationCosts, setFilterRenovationCosts] = useState<number[]>([
    0, 100,
  ])
  const [filterSavingPotential, setFilterSavingPotential] = useState<number[]>([
    0, 100,
  ])

  function resetFilter() {
    setFilterBuildingType(null)
    setFilterHeatType(null)
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est,
          repellat? Voluptatem, eum accusantium molestias voluptatibus placeat
          veritatis quod officiis.
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
        <Accordion title="Wäremtyp" acitve={true}>
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
            Der Verbrauch bezieht sich auf alle Gebäude auf einem Grundstück
            zusammengenommen.
          </p>
          <RangeSlider
            value={filterElectricityConsumption}
            setValue={setFilterElectricityConsumption}
            minValue={0}
            maxValue={4896155}
            step={1}
          />
        </Accordion>
        <Accordion title="Wärmeverbrauch" acitve={true}>
          <p className="text-xs">
            Der Verbrauch bezieht sich auf alle Gebäude auf einem Grundstück
            zusammengenommen.
          </p>
          <RangeSlider
            value={filterHeatConsumption}
            setValue={setFilterHeatConsumption}
            minValue={0}
            maxValue={100}
            step={1}
          />
        </Accordion>
        <Accordion title="Sanierungskosten" acitve={true}>
          <p className="text-xs">
            Snierungskosten beziehen sich auf die zu sanierenden Gebäude auf
            einem Grundstück. Es sind Schätzungen aus dem Jahr 2020.
          </p>
        </Accordion>
        <Accordion title="Einsparpotenzial" acitve={true}>
          <p className="text-xs">
            Das Einsparpotential ist nur eine Schätzung, die sich stets in einem
            Rahmen befindet.{' '}
          </p>
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
