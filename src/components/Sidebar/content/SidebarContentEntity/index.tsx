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
            'disabled:opacity-50 text-xs py-2 flex-1 bg-white/50 mr-1 rounded border-2'
          )}
          onClick={() => setEntityId(rankingInfo.idMore)}
          disabled={!rankingInfo.idMore}
        >
          höheren Verbrauch
        </button>
        <button
          className="disabled:opacity-50 text-xs py-2 flex-1 bg-white/50 ml-1 rounded border-2"
          onClick={() => setEntityId(rankingInfo.idLess)}
          disabled={!rankingInfo.idLess}
        >
          niedrigeren Verbrauch
        </button>
      </span>
    </div>
  )
}

function getUsageDataString(feat, type) {
  if (feat[type] && feat[type] != 0 && feat[type] !== -1) {
    return getUsageData(feat, type).toLocaleString('de-DE') + ' kWh/a'
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
  entityData,
  // renovationLength,
  consumptionType,
  rankingInfo,
  setEntityId,
}) => {
  if (!entityId || !entityData) {
    return null
  }
  const data = entityData.properties

  return (
    <>
      <SidebarHeader
        text={typeTranslation(data.entityType)}
        fontSize="text-lg"
      />
      <SidebarBody>
        {' '}
        <>
          <p className="text-sm">{data.entityAddress}</p>
          <p className="text-sm pb-2 pt-1">
            {data.ortsteil} | {data.entityPLZ} Berlin
          </p>
          <p className="text-sm">Betrieben von: BIM</p>
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
                  data[consumptionType]
                ),
              }}
            ></span>
            {getUsageDataString(data, consumptionType)}
          </p>

          {consumptionType === 'heat' ? (
            <>
              <p className="text-sm pb-1">Art der Wärmeversorgung</p>
              <p className="pb-2 font-bold">{data.entityHeatType}</p>
            </>
          ) : null}

          <div>
            <p className="text-xs py-2">
              Der Verbrauch aller Gebäude auf diesem Grundstück entspricht dem
              Energieverbauch von ca.{' '}
              {getComparisonNumber(data, consumptionType)} 5-Personenhaushalten
              ({energyComparison[consumptionType].toLocaleString('de-DE')} kWh).
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

          {data.renovations.length ? (
            <>
              <h2 className="font-bold py-4 pt-8 text-lg">Sanierungen</h2>

              <ul className="text-sm">
                <li className="flex py-2">
                  <div className="w-12 place-items-center grid">
                    <Buildings />
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
                        Kosten: {data.renovationsCosts.toLocaleString('de-DE')}€
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
                          {/* {feat['housePrio']} von {renovationLength} */}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
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
