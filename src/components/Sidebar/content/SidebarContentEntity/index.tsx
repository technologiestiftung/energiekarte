import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard'
import { typeTranslation } from '@lib/translation'

import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { House } from '@components/Icons/'

export interface SidebarContentEntityType {
  marketData: any
}

function getUsageData(feat, type) {
  if (feat[type] && feat[type] != 0) {
    return (
      <p className="pb-2">{feat[type].toLocaleString('de-DE') + ' kWh/a'}</p>
    )
  } else {
    return <p className="pb-2 text-sm">liegt nicht vor</p>
    // return (type === 'heat' ? 'Wärmeverbrauch':'Stromverbrauch') + ' liegt nicht vor'
  }
}

export const SidebarContentEntity: FC<SidebarContentEntityType> = ({
  entityId,
  entityConsumptionData,
  entityRenovationData,
}) => {
  if (!entityId || !entityConsumptionData || !entityRenovationData) {
    return null
  }
  const consumptionData = entityConsumptionData.properties
  const renovationData = entityRenovationData
  let sumRenovationCosts = 0
  let sumRenovationArea = 0

  renovationData.forEach((d) => {
    sumRenovationArea += d.properties.houseArea
    sumRenovationCosts += d.properties.houseCosts
  })

  return (
    <>
      <SidebarHeader
        text={entityConsumptionData.properties.entityAddress}
        fontSize="text-lg"
      />
      <SidebarBody>
        {' '}
        <>
          <div className="text-bold">
            <h2 className="font-bold pt-4 text-lg">
              {typeTranslation(consumptionData.entityType)}
            </h2>
            <p className="text-xs pb-2">
              {consumptionData.entityAddress}; {consumptionData.entityPLZ}
            </p>

            <p className="text-sm">Stromverprauch</p>
            {getUsageData(consumptionData, 'entityHeatUsage')}

            <p className="text-sm">Wärmeverbrauch</p>
            {getUsageData(consumptionData, 'entityHeatUsage')}

            <p className="text-sm">Art der Wärmeversorgung</p>
            <p className="pb-2">{consumptionData.entityHeatType}</p>
          </div>
          <h2 className="font-bold pt-4 text-lg py-4">Sanierungen:</h2>
          Fläche insgesamt: {sumRenovationArea.toLocaleString('de-DE')}m2
          <br />
          Kosten insgesamt: {sumRenovationCosts.toLocaleString('de-DE')}€
          {renovationData?.map((feat, i) => (
            <div className="py-4 text-sm" key={'haus' + i}>
              <div className="flex pb-2">
                <House />
                <p className="ml-2 font-bold flex text-base">
                  {feat.properties['houseName']}
                </p>
              </div>

              <p>
                Fläche: {feat.properties['houseArea'].toLocaleString('de-DE')}{' '}
                m2
              </p>
              <p>Einsparpotenzial: {feat.properties['houseSavingPotential']}</p>
              <p>
                Kosten: {feat.properties['houseCosts'].toLocaleString('de-DE')}{' '}
                €
              </p>
            </div>
          ))}
          {!renovationData.length && <p>Keine Sanierungdaten vorhanden</p>}
        </>
        <div className="mb-10"></div>
      </SidebarBody>
    </>
  )
}
