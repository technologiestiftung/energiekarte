import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'

import { typeTranslation } from '@lib/translation'

export interface SidebarContentListType {
  data: any
}

export const SidebarContentList: FC<SidebarContentListType> = ({
  data,
  entityId,
  setEntityId,
}) => {
  function onSelect(feature: any) {
    const clickedId = feature.properties.entityId
    setEntityId(clickedId === entityId ? null : clickedId)
  }

  function getUsageData(feat, type) {
    if (feat.properties[type] && feat.properties[type] != 0) {
      return (
        <p className="pb-2">
          {feat.properties[type].toLocaleString('de-DE') + ' kWh/a'}
        </p>
      )
    } else {
      return <p className="pb-2 text-sm">liegt nicht vor</p>
    }
  }

  const [highlightedEntity, setHighlightedEntity] = useState(null)
  // const [scrollMargin, setScrollMargin] = useState(null)

  // const menuRef = useRef()

  useEffect(() => {
    const element = document.getElementById(entityId?.toString())
    // const menuRefHeight = menuRef.current.getBoundingClientRect().height
    // setScrollMargin(menuRefHeight)
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })

    //     var y = $(window).scrollTop();  //your current y position on the page
    // $(window).scrollTop(y+150);
    setHighlightedEntity(entityId)
  }, [entityId, consumptionType])

  return (
    <>
      <SidebarHeader text="Energieverbauch" />

      <SidebarBody>
        <p className="py-2 text-sm">
          Hier kannst du im Ranking den Strom- und Wärmeverbrauch eines
          Grundstückes sehen.
        </p>

        <ul className="h-full">
          {data.features
            .sort(
              (a: string, b: string) =>
                b.properties[consumptionType] - a.properties[consumptionType]
            )
            .map((feat, i) => (
              <li
                className={classNames(
                  feat.properties['entityId'] === highlightedEntity
                    ? '!bg-primary text-secondary'
                    : '',
                  'cursor-pointer',
                  'hover:bg-gray',
                  'scroll-mt-10',
                  'flex',
                  'py-2'
                )}
                key={'priolist' + i}
                id={feat.properties['entityId']}
                onClick={() => onSelect(feat)}
              >
                <div className="w-10 text-right font-bold">{i + 1}.</div>
                <div className="flex-1 pl-2 text-bold border-b-[1px]">
                  <h3 className="font-bold">
                    {typeTranslation(feat.properties.entityType)}
                  </h3>
                  <p className="text-xs pb-2">
                    {feat.properties.entityAddress}; {feat.properties.entityPLZ}
                  </p>
                  {consumptionType === 'entityElectricityUsage' ? (
                    <>
                      <p className="text-sm">Stromverprauch</p>
                      {getUsageData(feat, 'entityElectricityUsage')}
                    </>
                  ) : null}
                  {consumptionType === 'entityHeatUsage' ? (
                    <>
                      <p className="text-sm">Wärmeverbrauch</p>
                      {getUsageData(feat, 'entityHeatUsage')}
                      <p className="text-sm">Art der Wärmeversorgung</p>
                      <p className="pb-2">{feat.properties.entityHeatType}</p>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
        </ul>
      </SidebarBody>
    </>
  )
}
