import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
// import { snowStorm } from '@lib/snowstorm'

import { useRouter } from 'next/router'
import { Head } from '@components/Head'

import { MapComponent } from '@components/Map'
import { SidebarWrapper } from '@components/Sidebar/SidebarWrapper'
import { SidebarContentEntity } from '@components/Sidebar/content/SidebarContentEntity'
import { SidebarContentInfo } from '@components/Sidebar/content/SidebarContentInfo'
import { SidebarContentList } from '@components/Sidebar/content/SidebarContentList'

import { HamburgerMenu, Info } from '@components/Icons'
import { SidebarNav } from '@components/Sidebar/SidebarNav'
import { MapNav } from '@components/MapNav'

import { IntroModal } from '@components/IntroModal'

import { getData } from '@lib/loadMapData'
import { getDataFromId } from '@lib/getDataFromId'

export async function getStaticProps() {
  const energyData = getData()
  return energyData
}

const navViews = [
  {
    value: 'list',
    name: 'list',
    icon: <HamburgerMenu />,
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
  const [marketId, setMarketId] = useState<string | number | null>(null)
  const [marketData, setMarketData] = useState<any>()

  const [entityId, setEntityId] = useState<string | number | null>(null)
  const [entityConsumptionData, setEntityConsumptionData] = useState<any>(null)
  const [entityRenovationData, setEntityRenovationData] = useState<any>(null)

  const [navView, setNavView] = useState<'list' | 'info'>('list')
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(false)
  const [sidebarInfoOpen, setSidebarInfoOpen] = useState<boolean>(false)
  const [mobileHeight, setMobileHeight] = useState<'half' | 'full'>('half')

  const [zoomToCenter, setZoomToCenter] = useState<number[]>([0, 0])
  const [mapZoom, setMapZoom] = useState<number>(10)

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

  // when the id changes -> open the sidebar and set the query
  useEffect(() => {
    setSidebarInfoOpen(entityId === null ? false : true)
    if (entityId) {
      const { consumption, renovation } = getDataFromId(entityId, energyData)
      setEntityConsumptionData(consumption)
      setEntityRenovationData(renovation)
      setZoomToCenter(consumption?.geometry.coordinates)
    } else {
      setEntityConsumptionData(null)
      setEntityRenovationData(null)
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
      <SidebarWrapper
        classes="z-20"
        position="left"
        isOpen={sidebarMenuOpen}
        setOpen={setSidebarMenuOpen}
        closeSymbol="cross"
        mobileHeight={mobileHeight}
      >
        {navView === 'list' && (
          <SidebarContentList
            data={energyData.consumption}
            entityId={entityId}
            setEntityId={setEntityId}
          />
        )}
        {navView === 'info' && <SidebarContentInfo />}
      </SidebarWrapper>
      {/* market data information */}
      <SidebarWrapper
        classes="z-30"
        position="right"
        isOpen={sidebarInfoOpen}
        setOpen={setSidebarInfoOpen}
        closeSymbol="cross"
        mobileHeight="full"
      >
        <SidebarContentEntity
          entityId={entityId}
          entityConsumptionData={entityConsumptionData}
          entityRenovationData={entityRenovationData}
        />
      </SidebarWrapper>
      <SidebarNav
        navViews={navViews}
        setNavView={setNavView}
        navView={navView}
        sidebarMenuOpen={sidebarMenuOpen}
        setSidebarMenuOpen={setSidebarMenuOpen}
        setModalOpen={setModalOpen}
        marketId={marketId}
        setMarketId={setMarketId}
      />
      <MapComponent
        energyData={energyData}
        zoomToCenter={zoomToCenter}
        mapZoom={mapZoom}
        setMarketId={setMarketId}
        setMarketData={setMarketData}
        marketId={marketId}
        energyData={energyData}
        entityId={entityId}
        setEntityId={setEntityId}
        entityConsumptionData={entityConsumptionData}
      />
      <MapNav mapZoom={mapZoom} setMapZoom={setMapZoom} />
    </>
  )
}

export default MapSite
