import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { useCopyToClipboard } from '@lib/hooks/useCopyToClipboard'
import { typeTranslation } from '@lib/translation'
// import { Accordion } from '@components/Accordion'

import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { House, Houses, Building, Buildings } from '@components/Icons/'

import { getConsumtionColor } from '@lib/getConsumtionColor'

export interface SidebarContentEntityType {
  marketData: any
  consumptionType: string
}

const energyComparison = {
  heat: 5500,
  electricity: 5500,
}

function getUsageDataString(feat, type) {
  if (feat[type] && feat[type] != 0 && feat[type] !== -1) {
    return (
      <p className="pb-2">
        {getUsageData(feat, type).toLocaleString('de-DE') + ' kWh/a'}
      </p>
    )
  } else {
    return <p className="pb-2 text-sm">liegt nicht vor</p>
    // return (type === 'heat' ? 'Wärmeverbrauch':'Stromverbrauch') + ' liegt nicht vor'
  }
}

function getUsageData(feat, type) {
  if (feat[type] && feat[type] != 0 && feat[type] !== -1) {
    return Number(feat[type])
  } else {
    return 0
  }
}

function getComparisonNumber(feat, type) {
  return (
    Math.round((getUsageData(feat, type) / energyComparison[type]) * 100) / 100
  )
}

export const SidebarContentEntity: FC<SidebarContentEntityType> = ({
  entityId,
  entityConsumptionData,
  entityRenovationData,
  renovationLength,
  consumptionType,
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
        text={typeTranslation(consumptionData.entityType)}
        fontSize="text-lg"
      />
      <SidebarBody>
        {' '}
        <>
          <p className="text-sm">{consumptionData.entityAddress}</p>
          <p className="text-sm pb-2 pt-1">
            {consumptionData.ortsteil} | {consumptionData.entityPLZ} Berlin
          </p>
          <hr className="my-2" />

          <h2 className="font-bold pt-4 text-md py-4">
            {consumptionType === 'electricity'
              ? 'Stromverbrauch'
              : 'Wärmeverbrauch'}
          </h2>
          <p className="text-sm pb-1">In Kilowattstunden pro Jahr </p>
          <p className="font-bold flex pb-2">
            <span
              className="text-sm mr-2  w-4 h-4 rounded-2xl mt-1 border-gray-500 border"
              style={{
                backgroundColor: getConsumtionColor(
                  consumptionType,
                  consumptionData[consumptionType]
                ),
              }}
            ></span>
            {getUsageDataString(consumptionData, consumptionType)}
          </p>

          {consumptionType === 'heat' ? (
            <>
              <p className="text-sm pb-1">Art der Wärmeversorgung</p>
              <p className="pb-2 font-bold">{consumptionData.entityHeatType}</p>
            </>
          ) : null}

          <div>
            <p className="text-xs py-2">
              Der Verbrauch aller Gebäude auf diesem Grundstück entspricht dem
              Energieverbauch von ca.{' '}
              {getComparisonNumber(consumptionData, consumptionType)} 5
              Personehaushalten (
              {energyComparison[consumptionType].toLocaleString('de-DE')} kWh).
            </p>
            {/* <div className="flex py-4">
              {getUsageData(consumptionData, 'heat').map((feat, i) => (
                <House />))}
              ))}
            </div>
            <p className="text-xs italic">
              Ein Haus entspricht 1000 5 Personenhaushalte
            </p> */}
          </div>

          <div className="text-xs pt-6">
            Grundstück ist im Ranking x von X. Zeige Grundstück mit
            <span className="flex">
              <button className="text-xs py-2 flex-1 bg-white/50 m-1 rounded border-2">
                höheren Verbrauch
              </button>
              <button className="text-xs py-2 flex-1 bg-white/50 m-1 rounded border-2">
                niedrigeren Verbrauch
              </button>
            </span>
          </div>

          {renovationData.length ? (
            <>
              <h2 className="font-bold py-4 pt-8 text-lg">Sanierungen</h2>

              <ul className="text-sm">
                <li className="flex py-2">
                  <div className="w-12 place-items-center grid">
                    <Buildings />
                  </div>
                  <div className="flex-1 pl-2">
                    <p className="font-bold pb-1">Gesamtsanierung</p>
                    {sumRenovationArea !== 0 && (
                      <span>
                        Fläche: {sumRenovationArea.toLocaleString('de-DE')}m2
                      </span>
                    )}
                    <br />
                    {sumRenovationCosts !== 0 && (
                      <span>
                        Kosten: {sumRenovationCosts.toLocaleString('de-DE')}€
                      </span>
                    )}
                  </div>
                </li>
                {renovationData?.map((feat, i) => (
                  <li className="flex py-4" key={'haus' + i}>
                    <div className="w-12 place-items-center grid">
                      <Building />
                    </div>
                    <div className="flex-1 pl-2">
                      <p className="font-bold pb-1">
                        {feat.properties['houseName']}
                      </p>
                      <p>
                        Fläche:{' '}
                        <span className="font-bold">
                          {feat.properties['houseArea'].toLocaleString('de-DE')}{' '}
                          m2
                        </span>
                      </p>
                      <p>
                        Einsparpotenzial:{' '}
                        <span className="font-bold">
                          {feat.properties['houseSavingPotential']}
                        </span>
                      </p>
                      <p>
                        Kosten:{' '}
                        <span className="font-bold">
                          {feat.properties['houseCosts'].toLocaleString(
                            'de-DE'
                          )}{' '}
                          €
                        </span>
                      </p>
                      <p>
                        Prio:{' '}
                        <span className="font-bold">
                          {feat.properties['housePrio']} von {renovationLength}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {!renovationData.length && (
            <p className="pt-4 text-xs">Keine Sanierungdaten vorhanden</p>
          )}
        </>
        <div className="mb-10"></div>
      </SidebarBody>
    </>
  )
}
