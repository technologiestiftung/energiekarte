import { FC, useState } from 'react'
import classNames from 'classnames'
import { typeTranslation } from '@lib/translation'

import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { Accordion } from '@components/Accordion'

import {
  Person,
  Location,
  Building,
  BuildingsSanierung,
} from '@components/Icons/'

import { getConsumtionColor } from '@lib/getConsumtionColor'

export interface SidebarContentEntityType {
  marketData: any
  consumptionType: string
  pointDataLenght: number
}

const energyComparison = {
  heat: 5500,
  electricity: 5500,
}

function Comparision({ consumptionType, rankingInfo, setEntityId }) {
  let rankingText
  if (!rankingInfo.idLess) {
    rankingText = `Es liegt kein ${
      consumptionType === 'electricity' ? 'Stromverbrauch' : 'Wärmeverbrauch'
    } vor. `
  } else {
    rankingText = `Das Grundstück liegt im 
    ${
      consumptionType === 'electricity' ? 'Stromverbrauch' : 'Wärmeverbrauch'
    } auf Platz ${rankingInfo.rankingPosition} von ${
      rankingInfo.rankingLength
    }. `
  }

  return (
    <div className="text-xs pt-6">
      {rankingText}
      Gehe zu einem Grundstück mit
      <span className="flex pt-4">
        <button
          className={classNames(
            'disabled:opacity-50 text-xs py-2 flex-1 bg-white/50 mr-1 rounded border hover:border-primary'
          )}
          onClick={() => setEntityId(rankingInfo.idMore)}
          disabled={!rankingInfo.idMore}
        >
          mehr Verbrauch
        </button>
        <button
          className="disabled:opacity-50 text-xs py-2 flex-1 bg-white/50 ml-1 rounded border hover:border-primary"
          onClick={() => setEntityId(rankingInfo.idLess)}
          disabled={!rankingInfo.idLess}
        >
          weniger Verbrauch
        </button>
      </span>
    </div>
  )
}

function getUsageDataString(feat, type) {
  if (feat[type] && feat[type] != 0 && feat[type] !== -1) {
    return getUsageData(feat, type).toLocaleString('de-DE') + ' kWh/a'
  } else {
    return <span className="pb-2 text-sm">liegt nicht vor</span>
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
  entityData,
  // renovationLength,
  consumptionType,
  rankingInfo,
  setEntityId,
  pointDataLenght,
}) => {
  if (!entityId || !entityData) {
    return null
  }
  const data = entityData.properties
  const [showRenovations, setShowRenovations] = useState<boolean>(false)

  return (
    <>
      <SidebarHeader
        text={typeTranslation(data.entityType)}
        fontSize="text-lg"
      />
      <SidebarBody>
        {' '}
        <>
          <div className="flex text-sm pb-2">
            <div className="w-12 place-items-center grid">
              <Location />
            </div>
            <div className="flex-1 pl-2">
              <p>{data.entityAddress}</p>
              <p>
                {data.ortsteil} | {data.entityPLZ} Berlin
              </p>
            </div>
          </div>
          <div className="flex text-sm pb-2">
            <div className="w-12 place-items-center grid">
              <Person />
            </div>
            <div className="flex-1 pl-2">
              <p>BIM</p>
            </div>
          </div>
          <hr className="my-2" />
          <h2 className="font-bold pt-4 text-md py-4">
            {consumptionType === 'electricity'
              ? 'Stromverbrauch'
              : 'Wärmeverbrauch'}
          </h2>
          <div className="flex text-sm pb-2">
            <div className="w-12 place-items-center grid">
              <span
                className="text-sm mr-2  w-6 h-6 rounded-2xl mt-1 border-gray-500 border"
                style={{
                  backgroundColor: getConsumtionColor(
                    consumptionType,
                    data[consumptionType]
                  ),
                }}
              ></span>
            </div>
            <div className="flex-1 pl-2">
              <p className="">In Kilowattstunden pro Jahr</p>
              <p className="font-bold">
                {getUsageDataString(data, consumptionType)}
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="w-12"></div>
            <div className="flex-1 pl-2">
              {consumptionType === 'heat' ? (
                <>
                  <p className="text-sm pb-1">Art der Wärmeversorgung</p>
                  <p className="pb-2 font-bold">{data.entityHeatType}</p>
                </>
              ) : null}
              <div>
                <p className="text-xs py-4">
                  Der Verbrauch aller Gebäude auf diesem Grundstück entspricht
                  dem Energieverbauch von ca.{' '}
                  {getComparisonNumber(data, consumptionType)}{' '}
                  5-Personenhaushalten (
                  {energyComparison[consumptionType].toLocaleString('de-DE')}{' '}
                  kWh).
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
              <Comparision
                consumptionType={consumptionType}
                rankingInfo={rankingInfo}
                setEntityId={setEntityId}
              />
            </div>
          </div>

          <span className="my-4 w-full block"></span>
          {data.renovations.length ? (
            <Accordion title="Sanierungen" acitve={showRenovations}>
              <>
                <ul className="text-sm">
                  <li className="flex py-2">
                    <div className="w-12 place-items-center grid">
                      <BuildingsSanierung
                        size={50}
                        color2={getConsumtionColor(
                          consumptionType,
                          data[consumptionType]
                        )}
                      />
                    </div>
                    <div className="flex-1 pl-2">
                      <p className="font-bold pb-1">Gesamtsanierung</p>
                      {data.renovationsArea !== 0 && (
                        <span>
                          Fläche: {data.renovationsArea.toLocaleString('de-DE')}
                          m2
                        </span>
                      )}
                      <br />
                      {data.renovationsCosts !== 0 && (
                        <span>
                          Kosten:{' '}
                          {data.renovationsCosts.toLocaleString('de-DE')}€
                        </span>
                      )}
                    </div>
                  </li>
                  {data.renovations?.map((feat, i) => (
                    <li className="flex py-4" key={'haus' + i}>
                      <div className="w-12 place-items-center grid">
                        <Building />
                      </div>
                      <div className="flex-1 pl-2">
                        <p className="font-bold pb-1">{feat['houseName']}</p>
                        <p>
                          Fläche:{' '}
                          <span className="font-bold">
                            {feat['houseArea'].toLocaleString('de-DE')} m2
                          </span>
                        </p>
                        <p>
                          Einsparpotenzial:{' '}
                          <span className="font-bold">
                            {feat['houseSavingPotential']}
                          </span>
                        </p>
                        <p>
                          Kosten:{' '}
                          <span className="font-bold">
                            {feat['houseCosts'].toLocaleString('de-DE')} €
                          </span>
                        </p>
                        <p>
                          Prio:{' '}
                          <span className="font-bold">
                            {feat['housePrio']} von {pointDataLenght}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            </Accordion>
          ) : null}
          {!entityData.properties.renovations.length && (
            <p className="pt-4 text-xs">Keine Sanierungdaten vorhanden</p>
          )}
        </>
        <div className="mb-10"></div>
      </SidebarBody>
    </>
  )
}
