import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { Accordion } from '@components/Accordion'

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
                type.value === buildingType ? '!text-primary font-bold' : '',
                'block'
              )}
              onClick={() =>
                setBuildingType(type.value !== buildingType ? type.value : null)
              }
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
            >
              {type.lable}
            </button>
          ))}
        </Accordion>
        <Accordion title="Verbrauch" acitve={true}>
          <p className="text-xs">
            Der Verbrauch bezieht sich auf alle Gebäude auf einem Grundstück
            zusammengenommen.
          </p>
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
      </SidebarBody>
    </>
  )
}
