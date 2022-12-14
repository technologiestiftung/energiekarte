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
import { getMaxMinValues } from '@lib/getMaxMinValues'

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

  const [entityId, setEntityId] = useState<string | number | null>(null)
  const [entityData, setEntityData] = useState<any>(null)

  const [navView, setNavView] = useState<'filter' | 'info'>('filter')
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(false)
  const [sidebarInfoOpen, setSidebarInfoOpen] = useState<boolean>(false)
  const [mobileHeight, setMobileHeight] = useState<'half' | 'full'>('half')

  const [zoomToCenter, setZoomToCenter] = useState<number[]>([0, 0])
  const [mapZoom, setMapZoom] = useState<number>(10)

  const [consumptionType, setConsumptionType] = useState('heat')
  let [maxMinValues, setMaxMinValues] = useState<object>({})

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
    setSidebarInfoOpen(entityId === null ? false : true)
    if (entityId) {
      const dataFromId = getDataFromId(entityId, energyData.pointData)
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
  }, [entityId])

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
    <>
      <Head />
      <IntroModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setNavView={setNavView}
        setSidebarMenuOpen={setSidebarMenuOpen}
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
        {navView === 'filter' && <SidebarContentFilter />}
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
      />
      <MapComponent
        zoomToCenter={zoomToCenter}
        mapZoom={mapZoom}
        setMapZoom={setMapZoom}
        energyData={energyData}
        entityId={entityId}
        setEntityId={setEntityId}
        entityData={entityData}
        consumptionType={consumptionType}
      />
      <MapNav mapZoom={mapZoom} setMapZoom={setMapZoom} />
    </>
  )
}

export default MapSite
