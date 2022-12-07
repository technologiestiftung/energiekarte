import { FC, useEffect, useRef, useCallback, useMemo } from 'react'
import Map, {
  Source,
  Layer,
  Marker,
  GeolocateControl,
  Popup,
} from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import mapStyle from './mapStyle'
import { layerStyles } from './layerStyles'
import { useState } from 'react'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'

export interface MapComponentType {
  energyData: any
  marketsData: any
  setMarketId: (time: string | null | number) => void
  marketId: string | number | null
  setMarketData: (time: any) => void
  zoomToCenter?: number[]
  mapZoom?: number
}

export const MapComponent: FC<MapComponentType> = ({
  energyData,
  zoomToCenter,
  mapZoom,
  entityId,
  setEntityId,
}) => {
  const isMobile = useHasMobileSize()
  const mapRef = useRef<mapboxgl.Map>()
  const startMapView = {
    longitude: 13.341760020413858,
    latitude: 52.510831578689704,
    zoom: mapZoom,
  }

  const [showMarker, setShowMarker] = useState<boolean>(true)
  const [popupVisible, setPopupVisible] = useState<boolean>(false)
  const [popupText, setPopupText] = useState<string>('')
  const [popupCoo, setPopupCoo] = useState<number[]>([0, 0])

  const [markerPosition, setMarkerPosition] = useState<number[]>([0, 0])

  useEffect(() => {
    if (mapRef.current) {
      // @ts-ignore
      if (mapRef.current.getZoom() !== mapZoom) {
        // @ts-ignore
        mapRef.current.zoomTo(mapZoom, {
          duration: 200,
        })
      }
    }
  }, [mapZoom])

  useEffect(() => {
    if (mapRef.current) {
      // @ts-ignore
      mapRef.current.easeTo({
        // @ts-ignore
        center: zoomToCenter,
        zoom: 15,
        // @ts-ignore
        // padding: { left: isMobile ? 0 : 200 },
      })
    }
  }, [zoomToCenter])

  const markers = useMemo(
    () =>
      energyData.consumption.features.map((feature: any, index: number) => (
        <Marker
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          anchor="center"
          onClick={() => setEntityId(feature.properties.entityId)}
          key={index}
          style={{ cursor: 'pointer' }}
        >
          <div
            // onMouseEnter={() => showPopupNow(true, feature)}
            // onMouseOut={() => showPopupNow(false, false)}
            className={'h-3 w-3 rounded-full bg-primary/70'}
          ></div>
        </Marker>
      )),

    [energyData]
  )

  // useEffect(() => {
  //   if (marketId == null) {
  //     setShowMarker(false)
  //   } else {
  //     const queriedMarket = marketsData.filter((d: any) => d.id == marketId)[0]
  //     setShowMarker(true)
  //     setMarkerPosition([queriedMarket.lng, queriedMarket.lat])
  //   }
  // }, [marketId])

  // const onMapCLick = (e: any): void => {
  //   if (e?.originalEvent?.originalTarget?.nodeName === 'CANVAS') {
  //     setMarketId(null)
  //     return
  //   }
  // }

  const onMapCLick = (e: any): void => {
    if (e?.originalEvent?.originalTarget?.nodeName === 'CANVAS') {
      setEntityId(null)
      return
    }
  }

  const onMapLoad = useCallback(() => {
    // mapRef.current.on('move', () => {
    //   // do something
    // });
    console.log('map loaded')
  }, [])

  return (
    <div className="h-screen w-screen">
      <Map
        mapLib={maplibregl}
        initialViewState={{ ...startMapView }}
        // mapStyle={process.env.NEXT_PUBLIC_MAPTILER_STYLE}
        mapStyle={mapStyle()}
        onClick={onMapCLick}
        onLoad={onMapLoad}
        // @ts-ignore
        ref={mapRef}
        maxBounds={[
          12.536773681640625, 52.08034997571588, 14.20257568359375,
          52.9395349771423,
        ]}
        attributionControl={false}
        // onLoad={onMapLoad}
      >
        <Source
          id="landparcel-source"
          type="geojson"
          data={energyData.landparcel}
        >
          <Layer {...layerStyles['landparcel']} />
        </Source>
        {markers}

        {entityId && zoomToCenter && (
          <Marker
            longitude={zoomToCenter[0]}
            latitude={zoomToCenter[1]}
            anchor="center"
          >
            <div
              className={
                'h-5 w-5 rounded-full bg-primary border-solid border-secondary border-2'
              }
            ></div>
          </Marker>
        )}
      </Map>

      <div>
        <div className="fixed bottom-2 right-2 text-gray-500/60 text-xs">
          <a href="https://www.maptiler.com/copyright/" target="_blank">
            © MapTiler
          </a>{' '}
          <a href="https://www.openstreetmap.org/copyright" target="_blank">
            © OpenStreetMap contributors
          </a>
        </div>
      </div>
    </div>
  )
}
