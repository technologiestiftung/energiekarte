import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { typeTranslation } from '@lib/translation'

import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { Accordion } from '@components/Accordion'
import { Pictogram } from '@components/Pictogram'
import { Comparision } from './Comparison'

import {
  Person,
  Location,
  Building,
  BuildingsSanierung,
  ThermometerHalf,
  SortDown,
  ArrowLeftRight,
} from '@components/Icons/'

import { getConsumtionColor } from '@lib/getConsumtionColor'

export interface SidebarContentEntityType {
  entityId: number | null | null
  entityData: any
  consumptionType: string
  rankingInfo: any
  setEntityId: (id: number | null) => void
  pointDataLenght: number
  showEntityRenovations: boolean
  showEntityConsumption: boolean
}

function getUsageDataString(energyUsage: number) {
  if (energyUsage != 0) {
    return energyUsage.toLocaleString('de-DE') + ' kWh/a'
  } else {
    return (
      <span className="text-xs pb-2 font-normal">
        Es liegt kein Stromverbrauch vor.
      </span>
    )
  }
}

export const SidebarContentEntity: FC<SidebarContentEntityType> = ({
  entityId,
  entityData,
  consumptionType,
  rankingInfo,
  setEntityId,
  pointDataLenght,
  showEntityRenovations,
  showEntityConsumption,
}) => {
  if (!entityId || !entityData) {
    return null
  }
  const data = entityData.properties
  const [energyUsage, setEnergyUsage] = useState<number>(0)

  useEffect(() => {
    if (
      entityData.properties[consumptionType] &&
      entityData.properties[consumptionType] != 0 &&
      entityData.properties[consumptionType] !== -1
    ) {
      setEnergyUsage(Number(entityData.properties[consumptionType]))
    } else {
      setEnergyUsage(0)
    }
  }, [consumptionType, entityData])

  return (
    <>
      <SidebarHeader
        text={typeTranslation(data.entityType)}
        fontSize="text-lg"
      />
      <SidebarBody>
        {' '}
        <>
          <div className="flex text-sm pb-2 location">
            <div className="w-12 place-items-center grid">
              <Location />
            </div>
            <div className="flex-1 pl-2">
              <p>{data.entityAddress}</p>
              <p className="text-xs">
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
              <p className="text-xs">Berliner Immobilien Management</p>
            </div>
          </div>
          <hr className="my-2" />

          <Accordion
            title={
              consumptionType === 'electricity'
                ? 'Stromverbrauch'
                : 'Wärmeverbrauch'
            }
            active={showEntityConsumption}
            extraClassName="energy-usage-dropdown"
          >
            <div className="flex text-sm pb-4">
              <div className="w-12 place-items-center grid">
                <span
                  className="text-sm  w-5 h-5 rounded-2xl border-textcolor border"
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
                <p className="font-bold">{getUsageDataString(energyUsage)}</p>
              </div>
            </div>
            {consumptionType === 'heat' ? (
              <div className="flex pb-4 ">
                <div className="w-12 place-items-center grid">
                  <ThermometerHalf />
                </div>
                <div className="flex-1 pl-2">
                  <p className="text-sm">Art der Wärmeversorgung</p>
                  <p className="font-bold">{data.entityHeatType}</p>
                </div>
              </div>
            ) : null}

            {consumptionType === 'electricity' ? (
              <div className="flex pb-4">
                <div className="w-12 justify-center top-1 grid">
                  <ArrowLeftRight />
                </div>
                <div className="flex-1 pl-2">
                  <p className="text-sm">Vergleich</p>

                  <Pictogram
                    energyUsage={energyUsage}
                    consumptionType={consumptionType}
                  />
                </div>
              </div>
            ) : null}

            <div className="flex ">
              <div className="w-12 grid justify-center top-1">
                <SortDown />
              </div>
              <div className="flex-1 pl-2">
                <Comparision
                  consumptionType={consumptionType}
                  rankingInfo={rankingInfo}
                  setEntityId={setEntityId}
                />
              </div>
            </div>
          </Accordion>

          <span className="my-4 w-full block"></span>
          {data.renovations.length ? (
            <Accordion
              title="Sanierungen"
              active={showEntityRenovations}
              extraClassName="renovation-dropdown"
            >
              <>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae voluptates iure quidem ipsum repudiandae dolorem,
                  labore autem dignissimos debitis.
                </p>
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
                          Fläche:{' '}
                          <b>
                            {data.renovationsArea.toLocaleString('de-DE')}{' '}
                            &#13217;
                          </b>
                        </span>
                      )}
                      <br />
                      {data.renovationsCosts !== 0 && (
                        <span>
                          Kosten:{' '}
                          <b>
                            {data.renovationsCosts.toLocaleString('de-DE')} €
                          </b>
                        </span>
                      )}
                    </div>
                  </li>
                  {data.renovations?.map((feat: any, i: number) => (
                    <li className="flex py-4" key={'haus' + i}>
                      <div className="w-12 place-items-center grid">
                        <Building />
                      </div>
                      <div className="flex-1 pl-2">
                        <p className="font-bold pb-1">{feat['houseName']}</p>
                        <p>
                          Fläche:{' '}
                          <span className="font-bold">
                            {feat['houseArea'].toLocaleString('de-DE')} &#13217;
                          </span>
                        </p>
                        <p>
                          Einsparpotenzial:{' '}
                          <span className="font-bold">
                            {feat['houseSavingPotential'].replace('%', ' %')}
                          </span>
                        </p>
                        <p>
                          Kosten:{' '}
                          <span className="font-bold">
                            {feat['houseCosts'].toLocaleString('de-DE')} €
                          </span>
                        </p>
                        <p>
                          Ranking:{' '}
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
            <p className="pt-4 text-xs">
              Keine Daten zu zukünftigen Sanierungen vorhanden
            </p>
          )}
        </>
        <div className="mb-10"></div>
      </SidebarBody>
    </>
  )
}
