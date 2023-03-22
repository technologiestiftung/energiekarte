import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
// import { snowStorm } from '@lib/snowstorm'

import { useRouter } from 'next/router'
import { Head } from '@components/Head'

import { MapComponent } from '@components/Map'
import { SidebarWrapper } from '@components/Sidebar/SidebarWrapper'
import { SidebarContentEntity } from '@components/Sidebar/content/SidebarContentEntity'
import { SidebarContentInfo } from '@components/Sidebar/content/SidebarContentInfo'
import { SidebarContentFilter } from '@components/Sidebar/content/SidebarContentFilter'
import { SidebarContentSearch } from '@components/Sidebar/content/SidebarContentSearch'

import { Info, Filter, Search } from '@components/Icons'

import { SidebarNav } from '@components/Sidebar/SidebarNav'
import { ConsumptionTypeSwitch } from '@components/ConsumptionTypeSwitch'

import { IntroModal } from '@components/IntroModal'

import { getData } from '@lib/loadMapData'
import { getDataFromId } from '@lib/getDataFromId'

import { findClosestValues } from '@lib/findClosestValues'
import { JoyrideWrapper } from '@components/JoyrideWrapper'

export async function getStaticProps() {
  const energyData = getData()
  return energyData
}

const navViews = [
  {
    value: 'filter',
    name: 'filter',
    icon: <Filter />,
    mobileHeight: 'half',
  },
  {
    value: 'info',
    name: 'information',
    icon: <Info />,
    mobileHeight: 'full',
  },
  {
    value: 'search',
    name: 'search',
    icon: <Search />,
    mobileHeight: 'full',
  },
]

const MapSite: NextPage = (energyData: any) => {
  const { pathname, query, replace, isReady } = useRouter()
  const [modalOpen, setModalOpen] = useState(true)

  const [pointData, setPointData] = useState<any>(null)
  const [landparcelData, setLandparcelData] = useState<any>(null)

  const [entityId, setEntityId] = useState<number | null>(null)
  const [entityData, setEntityData] = useState<any>(null)

  const [navView, setNavView] = useState<'filter' | 'info'>('filter')
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(false)
  const [sidebarInfoOpen, setSidebarInfoOpen] = useState<boolean>(false)
  const [mobileHeight, setMobileHeight] = useState<'half' | 'full'>('half')

  const [zoomToCenter, setZoomToCenter] = useState<number[]>([0, 0])
  const [mapZoom, setMapZoom] = useState<number>(10)
  const [mapPitch, setMapPitch] = useState<boolean>(true)

  const [consumptionType, setConsumptionType] = useState('heat')
  let [rankingInfo, setRankingInfo] = useState<any>([])

  const [pointDataLenght, setPointDataLenght] = useState<number>(0)

  const [showEntityConsumption, setShowEntityConsumption] =
    useState<boolean>(true)
  const [showEntityRenovations, setShowEntityRenovations] =
    useState<boolean>(false)

  const [runJoyride, setRunJoyride] = useState<boolean>(false)

  useEffect(() => {
    setPointData(energyData.pointData)
    setLandparcelData(energyData.landparcel)
    setPointDataLenght(energyData.pointData.features.length)
  }, [])

  // when the id changes -> open the sidebar and set the query
  useEffect(() => {
    if (pointData) {
      setSidebarInfoOpen(entityId === null ? false : true)
      if (entityId) {
        const dataFromId = getDataFromId(entityId, pointData)
        setEntityData(dataFromId)
        // @ts-ignore
        setZoomToCenter(dataFromId.geometry.coordinates)
        setSidebarMenuOpen(false)
      } else {
        setEntityData(null)
        setZoomToCenter([0, 0])
      }
    }
  }, [entityId])

  useEffect(() => {
    if (pointData) {
      setRankingInfo(findClosestValues(pointData, consumptionType, entityId))
    }
  }, [entityId, consumptionType, pointData])

  // when the sidebar is closed -> set markerId to null
  useEffect(() => {
    if (!sidebarInfoOpen) {
      setEntityId(null)
    }
  }, [sidebarInfoOpen])

  // when the nav view changes
  // -> set the mobile height (it differs for some views)
  // and close the info sidebar
  useEffect(() => {
    const navViewFiltered = navViews.filter((d) => d.value === navView)
    // @ts-ignore
    setMobileHeight(navViewFiltered[0].mobileHeight)
    setSidebarInfoOpen(false)
  }, [navView])

  return (
    pointData && (
      <>
        <JoyrideWrapper
          runJoyride={runJoyride}
          setRunJoyride={setRunJoyride}
          setZoomToCenter={setZoomToCenter}
          setEntityId={setEntityId}
          setShowEntityConsumption={setShowEntityConsumption}
          setShowEntityRenovations={setShowEntityRenovations}
          setConsumptionType={setConsumptionType}
          setNavView={setNavView}
          setSidebarMenuOpen={setSidebarMenuOpen}
          setMapZoom={setMapZoom}
          setMapPitch={setMapPitch}
        />
        <IntroModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setNavView={setNavView}
          setSidebarMenuOpen={setSidebarMenuOpen}
          setRunJoyride={setRunJoyride}
          setEntityId={setEntityId}
          setConsumptionType={setConsumptionType}
          setZoomToCenter={setZoomToCenter}
        />
        <ConsumptionTypeSwitch
          setConsumptionType={setConsumptionType}
          consumptionType={consumptionType}
        />
        <SidebarWrapper
          classes="z-20"
          position="left"
          isOpen={sidebarMenuOpen}
          setOpen={setSidebarMenuOpen}
          closeSymbol="cross"
          mobileHeight={mobileHeight}
        >
          {navView === 'info' && <SidebarContentInfo />}
          {navView === 'filter' && (
            <SidebarContentFilter
              pointData={pointData}
              setPointData={setPointData}
            />
          )}
          {navView === 'search' && (
            <SidebarContentSearch setZoomToCenter={setZoomToCenter} />
          )}
        </SidebarWrapper>
        {/* market data information */}
        <SidebarWrapper
          classes="z-40 entity-wrapper"
          position="left"
          isOpen={sidebarInfoOpen}
          setOpen={setSidebarInfoOpen}
          closeSymbol="cross"
          mobileHeight="full"
        >
          <SidebarContentEntity
            entityId={entityId}
            entityData={entityData}
            consumptionType={consumptionType}
            rankingInfo={rankingInfo}
            setEntityId={setEntityId}
            pointDataLenght={pointDataLenght}
            showEntityConsumption={showEntityConsumption}
            showEntityRenovations={showEntityRenovations}
          />
        </SidebarWrapper>
        <SidebarNav
          navViews={navViews}
          setNavView={setNavView}
          navView={navView}
          sidebarMenuOpen={sidebarMenuOpen}
          setSidebarMenuOpen={setSidebarMenuOpen}
          setModalOpen={setModalOpen}
          entityId={entityId}
          setEntityId={setEntityId}
          mapZoom={mapZoom}
          setMapZoom={setMapZoom}
          setMapPitch={setMapPitch}
          mapPitch={mapPitch}
        />
        <MapComponent
          zoomToCenter={zoomToCenter}
          mapZoom={mapZoom}
          setMapZoom={setMapZoom}
          landparcelData={landparcelData}
          pointData={pointData}
          entityId={entityId}
          setEntityId={setEntityId}
          entityData={entityData}
          consumptionType={consumptionType}
          mapPitch={mapPitch}
        />
      </>
    )
  )
}

export default MapSite
