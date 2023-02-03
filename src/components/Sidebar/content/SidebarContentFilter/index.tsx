import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { Accordion } from '@components/Accordion'
import { RangeSlider } from '@components/RangeSlider'
import { Square, CheckSquare, Filter } from '@components/Icons/'
import { toCSV } from '@lib/toCSV'

export interface SidebarContentFilterType {
  pointData: any
  setPointData: (data: any) => void
}

const defaultValues = {
  electricityConsumption: [0, 5000000], // 5000000
  heatConsumption: [0, 30000000],
  renovationCosts: [0, 71000000],
  savingPotential: [0, 60],
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
  pointData,
  setPointData,
}) => {
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

  const [allHeatUsage, setAllHeatUsage] = useState<number>(0)
  const [allElectrictyUsage, setAllElectrictyUsage] = useState<number>(0)

  const [isFiltered, setIsFiltered] = useState<boolean>(false)

  function filterData() {
    let heat = 0
    let electricity = 0
    pointData.features.forEach((f: any) => {
      const props = f.properties
      props.visible = true
      // building type
      if (filterBuildingType && props.entityType !== filterBuildingType) {
        props.visible = false
      }
      // what kind of heat
      if (filterHeatType && !props.entityHeatType.includes(filterHeatType)) {
        props.visible = false
      }
      // electricity consumption
      if (
        props.electricity < filterElectricityConsumption[0] ||
        props.electricity > filterElectricityConsumption[1]
      ) {
        props.visible = false
      }
      // heat consumption
      if (
        props.heat < filterHeatConsumption[0] ||
        props.heat > filterHeatConsumption[1]
      ) {
        props.visible = false
      }
      // renovations costs

      if (
        props.renovationsCosts < filterRenovationCosts[0] ||
        props.renovationsCosts > filterRenovationCosts[1]
      ) {
        props.visible = false
      }

      if (
        props.renovationsSavingsMax > filterSavingPotential[1] ||
        props.renovationsSavingsMax < filterSavingPotential[0]
      ) {
        props.visible = false
      }

      if (props.visible) {
        heat += props.heat
        electricity += props.electricity
      }
    })

    return { pointData: pointData, heat: heat, electricity: electricity }
  }

  function downloadCSV() {
    const { pointData } = filterData()
    toCSV(pointData)
  }

  useEffect(() => {
    const { pointData, heat, electricity } = filterData()

    setAllHeatUsage(heat)
    setAllElectrictyUsage(electricity)

    setPointData(JSON.parse(JSON.stringify(pointData)))

    const isFiltereddd = Boolean(
      filterBuildingType ||
        filterHeatType ||
        defaultValues.electricityConsumption[0] !==
          filterElectricityConsumption[0] ||
        defaultValues.electricityConsumption[1] !==
          filterElectricityConsumption[1] ||
        defaultValues.heatConsumption[0] !== filterHeatConsumption[0] ||
        defaultValues.heatConsumption[1] !== filterHeatConsumption[1] ||
        defaultValues.renovationCosts[0] !== filterRenovationCosts[0] ||
        defaultValues.renovationCosts[1] !== filterRenovationCosts[1] ||
        defaultValues.savingPotential[0] !== filterSavingPotential[0] ||
        defaultValues.savingPotential[1] !== filterSavingPotential[1]
    )

    setIsFiltered(isFiltereddd)
  }, [
    filterBuildingType,
    filterHeatType,
    filterElectricityConsumption,
    filterHeatConsumption,
    filterRenovationCosts,
    filterSavingPotential,
  ])

  function resetFilter() {
    setFilterBuildingType(null)
    setFilterHeatType(null)
    setFilterElectricityConsumption(defaultValues.electricityConsumption)
    setFilterHeatConsumption(defaultValues.heatConsumption)
    setFilterRenovationCosts(defaultValues.renovationCosts)
    setFilterSavingPotential(defaultValues.savingPotential)
  }

  const buidlingTypes = [
    { lable: 'Allgemeiner Bestand', value: 'Allgemeiner Bestand' },
    { lable: 'Externe Mieter', value: 'externe Mieter' },
    { lable: 'Feuerwehr', value: 'Feuerwehr' },
    { lable: 'Geflüchtetenunterbringung', value: 'Flüchtlingsunterbringung' },
    { lable: 'Gericht', value: 'Gerichte' },
    { lable: 'Justizvollzugsanstalt', value: 'JVA' },
    { lable: 'Kultur', value: 'Kultur' },
    { lable: 'Polizei', value: 'Polizei' },
    { lable: 'Schule', value: 'Schulen' },
  ]

  const filterHeatTypes = [
    { lable: 'Fernwärme', value: 'Fernwärme' },
    { lable: 'Gas', value: 'Gas' },
    { lable: 'Heizöl', value: 'Heizöl' },
    { lable: 'Pellet', value: 'Pellet' },
    { lable: 'keine Angabe', value: 'n/a' },
  ]

  return (
    <>
      <SidebarHeader text="Filter" />

      <SidebarBody>
        <p className="pt-2 pb-4 text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est,
          repellat? Voluptatem, eum accusantium molestias voluptatibus placeat
          veritatis quod officiis.
        </p>
        <p className="text-xs">
          Gesamter Wäremverbrauch{' '}
          {isFiltered ? (
            <span
              title="gefiltert"
              className="text-primary inline-block absolute pl-2"
            >
              <Filter size={15} />{' '}
            </span>
          ) : null}
        </p>
        <p className="font-bold text-lg pb-2">
          {allHeatUsage.toLocaleString('de-DE')} in kWh/a
        </p>
        <p className="text-xs">
          Gesamter Stromverbrauch{' '}
          {isFiltered ? (
            <span
              title="gefiltert"
              className="text-primary inline-block absolute pl-2"
            >
              <Filter size={15} />{' '}
            </span>
          ) : null}
        </p>
        <p className="font-bold text-lg pb-4">
          {allElectrictyUsage.toLocaleString('de-DE')} in kWh/a
        </p>

        <Accordion title="Gebäudetyp" active={false}>
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
        <Accordion title="Wärmetyp" active={false}>
          {filterHeatTypes?.map((type) => (
            <button
              className={classNames(
                type.value === filterHeatType ? '!text-primary font-bold' : '',
                'block w-full text-left hover:text-primary'
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
        <Accordion title="Stromverbrauch" active={false}>
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
        <Accordion title="Wärmeverbrauch" active={false}>
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
        <Accordion title="Sanierungskosten" active={false}>
          <p className="text-xs">
            Snierungskosten beziehen sich auf die Summe der zu sanierenden
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
        <Accordion title="Einsparpotenzial" active={false}>
          <p className="text-xs">
            Das Einsparpotential ist nur eine Schätzung, die sich stets in einem
            Rahmen befindet.
            <b className="block pt-2">In Prozent (%)</b>
          </p>
          <RangeSlider
            value={filterSavingPotential}
            setValue={setFilterSavingPotential}
            minValue={defaultValues.savingPotential[0]}
            maxValue={defaultValues.savingPotential[1]}
            step={10}
          />
        </Accordion>
        {isFiltered && (
          <button
            className="text-secondary block mr-auto ml-auto sticky bottom-4 mb-8 px-4 bg-primary hover:bg-primary-dark font-bold hover:text-secondary p-2 text-bold rounded border-1 border-textcolor "
            onClick={resetFilter}
          >
            Filter zurücksetzen
          </button>
        )}

        <button
          className="text-secondary block mr-auto ml-auto bottom-4 mt-8 mb-8 px-4 bg-primary hover:bg-primary-dark font-bold hover:text-secondary p-2 text-bold rounded border-1 border-textcolor "
          onClick={downloadCSV}
        >
          CSV exportieren
        </button>
      </SidebarBody>
    </>
  )
}
