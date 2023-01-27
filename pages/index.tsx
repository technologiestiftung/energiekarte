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

import { HamburgerMenu, Info, Filter } from '@components/Icons'

import { SidebarNav } from '@components/Sidebar/SidebarNav'
import { MapNav } from '@components/MapNav'
import { ConsumptionTypeSwitch } from '@components/ConsumptionTypeSwitch'

import { IntroModal } from '@components/IntroModal'

import { getData } from '@lib/loadMapData'
import { getDataFromId } from '@lib/getDataFromId'

import { findClosestValues } from '@lib/findClosestValues'

import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'

export async function getStaticProps() {
  const energyData = getData()
  return energyData
}

const navViews = [
  // {
  //   value: 'list',
  //   name: 'list',
  //   icon: <HamburgerMenu />,
  //   mobileHeight: 'half',
  // },
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
]

const MapSite: NextPage = (energyData: any) => {
  const { pathname, query, replace, isReady } = useRouter()
  let [modalOpen, setModalOpen] = useState(false)

  const [pointData, setPointData] = useState<any>(null)
  const [landparcelData, setLandparcelData] = useState<any>(null)

  const [entityId, setEntityId] = useState<string | number | null>(null)
  const [entityData, setEntityData] = useState<any>(null)

  const [navView, setNavView] = useState<'filter' | 'info'>('filter')
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(false)
  const [sidebarInfoOpen, setSidebarInfoOpen] = useState<boolean>(false)
  const [mobileHeight, setMobileHeight] = useState<'half' | 'full'>('half')

  const [zoomToCenter, setZoomToCenter] = useState<number[]>([0, 0])
  const [mapZoom, setMapZoom] = useState<number>(10)

  const [consumptionType, setConsumptionType] = useState('heat')
  let [rankingInfo, setRankingInfo] = useState<any>([])

  const [pointDataLenght, setPointDataLenght] = useState<number>(0)

  const [runJoyride, setRunJoyride] = useState<boolean>(false)
  const [joyrideIndex, setJoyrideIndex] = useState<number>(0)

  useEffect(() => {
    setPointData(energyData.pointData)
    setLandparcelData(energyData.landparcel)
    setPointDataLenght(energyData.pointData.features.length)
  }, [])

  // // when the query string is read check if we have an id
  // useEffect(() => {
  //   if (!isReady) return
  //   const queryId = Number(query.id)
  //   const allowedId = mapData.allowedIds.includes(Number(query.id))
  //   if (Boolean(query.id) && allowedId && queryId !== marketId) {
  //     const queriedMarket = marketsData.filter((d: any) => d.id == queryId)[0]
  //     // make 2X sure we have the data
  //     if (queriedMarket) {
  //       setMarketId(queryId)
  //       setMarketData(queriedMarket)
  //       setModalOpen(false)
  //       setZoomToCenter([queriedMarket.lng, queriedMarket.lat])
  //       setMapZoom(12)
  //     }
  //   } else {
  //     setModalOpen(true)
  //   }
  // }, [isReady])

  // useEffect(() => {
  //   setMaxMinValues(getMaxMinValues(energyData))
  // }, [])

  // when the id changes -> open the sidebar and set the query
  useEffect(() => {
    if (pointData) {
      setSidebarInfoOpen(entityId === null ? false : true)
      if (entityId) {
        const dataFromId = getDataFromId(entityId, pointData)
        setEntityData(dataFromId)
        setZoomToCenter(dataFromId.geometry.coordinates)
      } else {
        setEntityData(null)
      }
      if (isReady) {
        replace({ pathname, query: { id: entityId } }, undefined, {
          shallow: true,
        })
      }
      setRankingInfo(findClosestValues(pointData, consumptionType, entityId))
    }
  }, [entityId])

  useEffect(() => {
    if (pointData) {
      setRankingInfo(findClosestValues(pointData, consumptionType, entityId))
    }
  }, [consumptionType])

  consumptionType

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

  const steps = [
    {
      target: '.introbtn',
      content: 'Hi 1',
      title: 'This is my awesome feature!',
      // isFixed: true
      disableBeacon: true,
    },
    {
      target: '.introbtn',
      content: 'Hiiii 1',
      title: 'This is my awesome feature!',
      // isFixed: true
      disableBeacon: true,
    },
    {
      target: '.introbtn',
      content: 'END',
      title: 'This is my awesome feature!',
      // isFixed: true
      disableBeacon: true,
    },
  ]

  useEffect(() => {
    setRunJoyride(true)
  }, [])

  const handleJoyrideCallback = (jRData) => {
    const { action, index, status, type } = jRData

    console.log(action, index, status, type)

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      let tempIndex
      if (action === 'next') {
        tempIndex = index + 1
        setJoyrideIndex(tempIndex)
      }
      if (action === 'prev') {
        tempIndex = index - 1
        setJoyrideIndex(tempIndex)
      }
      if (action === 'close') {
        setRunJoyride(false)
        setJoyrideIndex(0)
      }

      if (tempIndex === 1) {
        setMapZoom(12)
      }
    }
  }

  return (
    pointData && (
      <>
        <Joyride
          // callback={handleJoyrideCallback}
          run={runJoyride}
          steps={steps}
          debug
          showProgress
          disableScrolling={false}
          disableScrollParentFix
          showSkipButton
          continuous
          stepIndex={joyrideIndex}
          locale={{
            back: 'Zurück',
            close: 'Verlassen',
            last: 'Ende',
            next: 'Weiter',
            skip: 'Tour verlassen',
          }}
          styles={{
            options: { primaryColor: '#9bc95b' },
            tooltip: {
              borderRadius: '.2rem',
            },
            tooltipContainer: {
              textAlign: 'left',
            },
            tooltipTitle: {
              margin: 0,
            },
            tooltipContent: {
              padding: '1rem 0',
            },
            buttonNext: {
              borderRadius: '.2rem',
              color: '#fff',
            },
            buttonBack: {
              marginRight: '.2rem',
            },
          }}
        />

        <Head />
        <IntroModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setNavView={setNavView}
          setSidebarMenuOpen={setSidebarMenuOpen}
          setRunJoyride={setRunJoyride}
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
        </SidebarWrapper>
        {/* market data information */}
        <SidebarWrapper
          classes="z-40"
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
        />
        {/* <MapNav mapZoom={mapZoom} setMapZoom={setMapZoom} /> */}
      </>
    )
  )
}

export default MapSite
