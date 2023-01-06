import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { Accordion } from '@components/Accordion'
import { RangeSlider } from '@components/RangeSlider'

export interface SidebarContentFilterType {
  data: any
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
  data,
  entityId,
  setEntityId,
}) => {
  //   function getUsageData(feat, type) {

  //   {'}'}

  //   const [highlightedEntity, setHighlightedEntity] = useState(null)

  //   useEffect(() => {

  //   }, [])

  const [buildingType, setBuildingType] = useState<string | null>(null)
  const [heatType, setHeatType] = useState<string | null>(null)
  const [electricityConsumption, setElectricityConsumption] = useState<
    number[]
  >([30, 50])

  function resetFilter() {
    setBuildingType(null)
    setHeatType(null)
  }

  const buidlingTypes = [
    { lable: 'Schulen', value: 'Schule' },
    { lable: 'Flüchtlingsunterbringung', value: 'Geflüchtetenunterbringung' },
    { lable: 'Gericht', value: 'Gerichte' },
    { lable: 'Justizvollzugsanstalt', value: 'JVA' },
    { lable: 'Allgemeiner Bestand', value: 'Allgemeiner Bestand' },
    { lable: 'externe Mieter', value: 'externe Mieter' },
    { lable: 'Feuerwehr', value: 'Feuerwehr' },
    { lable: 'Kultur', value: 'Kultur' },
    { lable: 'Polizei', value: 'Polizei' },
  ]

  const heatTypes = [
    { lable: 'Gas', value: 'Gas' },
    { lable: 'Fernwärme', value: 'Fernwärme' },
    { lable: 'Nahwärme', value: 'Nahwärme' },
    { lable: 'Pellet', value: 'Pellet' },
    { lable: 'Öl', value: 'Öl' },
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
                type.value === buildingType ? 'text-primary font-bold' : '',
                'block w-full text-left hover:text-primary '
              )}
              onClick={() =>
                setBuildingType(type.value !== buildingType ? type.value : null)
              }
              key={type.value}
            >
              {type.lable}
            </button>
          ))}
        </Accordion>
        <Accordion title="Wäremtyp" acitve={true}>
          {heatTypes?.map((type) => (
            <button
              className={classNames(
                type.value === heatType ? '!text-primary font-bold' : '',
                'block'
              )}
              onClick={() =>
                setHeatType(type.value !== heatType ? type.value : null)
              }
              key={type.value}
            >
              {type.lable}
            </button>
          ))}
        </Accordion>
        <Accordion title="Stromverbrauch" acitve={true}>
          <p className="text-xs">
            Der Verbrauch bezieht sich auf alle Gebäude auf einem Grundstück
            zusammengenommen.
          </p>
          <RangeSlider
            value={electricityConsumption}
            setValue={setElectricityConsumption}
          />
        </Accordion>
        <Accordion title="Wärmeverbrauch" acitve={true}>
          <p className="text-xs">
            Der Verbrauch bezieht sich auf alle Gebäude auf einem Grundstück
            zusammengenommen.
          </p>
          {/* <RangeSlider
            value={electricityConsumption}
            setter={setElectricityConsumption}
          /> */}
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

        {(buildingType || heatType) && (
          <button
            className="block mr-auto ml-auto sticky bottom-4 mb-8 px-4 bg-secondary hover:bg-textcolor hover:text-secondary p-2 text-bold rounded border-2 border-gold "
            onClick={resetFilter}
          >
            Filter zurücksetzen
          </button>
        )}
      </SidebarBody>
    </>
  )
}
