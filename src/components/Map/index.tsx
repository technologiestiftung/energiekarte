import { useEffect, FC, useRef, useState, useCallback } from 'react'
import maplibregl, { LngLatLike, Map, Marker } from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'
import mapStyle from './mapStyle'

import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

import { getConsumtionColor } from '@lib/getConsumtionColor'
import { MapKey } from './MapKey'

import { getStripes } from '@lib/getStripes'

interface MapType {
  zoomToCenter?: number[]
  entityId: number | null
  setEntityId: (time: null | number) => void
  setMapZoom: (zoom: number) => void
  entityData: any
  consumptionType: string
  mapZoom: number
  landparcelData: any
  pointData: any
  mapPitch: boolean
}

const MAP_CONFIG = {
  defaultZoom: 15,
  defaultLatitude: 52.520008,
  defaultLongitude: 13.414954,
  minZoom: 10,
  maxZoom: 19,
}

export const MapComponent: FC<MapType> = ({
  zoomToCenter,
  entityId,
  setEntityId,
  entityData,
  consumptionType,
  mapZoom,
  setMapZoom,
  landparcelData,
  pointData,
  mapPitch,
}) => {
  const [mapMarkers, setMapMarkers] = useState([])

  const map = useRef<Map>(null)
  const highlightedMarker = useRef<Marker>(null)

  useEffect(() => {
    if (mapMarkers) {
      mapMarkers.forEach((m: any, i: number) => {
        m.style.backgroundColor = getConsumtionColor(
          consumptionType,
          consumptionType === 'heat'
            ? pointData.features[i].properties.heat
            : pointData.features[i].properties.electricity
        )
        const visble = pointData.features[i].properties.visible
        m.style['pointer-events'] = visble ? 'unset' : 'none'
        m.style.opacity = visble ? 1 : 0
      })
    }
  }, [consumptionType, pointData])

  // Map setup (run only once on initial render)
  let loaded = false

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.current = new maplibregl.Map({
      container: 'map',
      // style: mapStyle(),
      // @ts-ignore
      style:
        // process.env.NODE_ENV == 'development'
        //   ? mapStyle()
        //   :
        `${process.env.NEXT_PUBLIC_MAPTILER_STYLE}`,
      center: [
        MAP_CONFIG.defaultLongitude,
        MAP_CONFIG.defaultLatitude,
      ] as LngLatLike,
      zoom: MAP_CONFIG.defaultZoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      maxBounds: [
        11.82943127508483, 51.74832292717255, 15.046752480983088,
        53.467541934574086,
      ],
      pitch: 60,
    })
    map.current.on('load', function () {
      if (!map.current || loaded) return
      // @ts-ignore
      let markers = []
      loaded = true

      pointData.features.forEach(function (marker: any, index: number) {
        const el = document.createElement('div')
        // @ts-ignore
        el.key = index
        el.id = 'marker-' + marker.properties.entityId

        el.style.backgroundColor = getConsumtionColor(
          consumptionType,
          consumptionType === 'heat'
            ? marker.properties.heat
            : marker.properties.electricity
        )
        el.style.display = 'unset'
        el.className = 'h-3 w-3 rounded-full cursor-pointer'
        if (el.style.backgroundColor === 'rgb(255, 255, 255)') {
          el.className += ' border-gray-500 border'
        }
        el.addEventListener('click', function () {
          // @ts-ignore
          onMarkerClick(marker.properties.entityId, marker.geometry.coordinates)
        })
        markers.push(el)

        // add marker to map
        new maplibregl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          // @ts-ignore
          .addTo(map.current)
      })
      // @ts-ignore
      setMapMarkers(markers)

      map.current.on('click', (e) => {
        // @ts-ignore
        if (e?.originalEvent?.originalTarget?.nodeName === 'CANVAS') {
          setEntityId(null)
          return
        }
      })

      map.current.on('zoomend', (e) => {
        // @ts-ignore
        setMapZoom(map.current?.getZoom())
      })
    })
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (zoomToCenter[0] === 0) {
      return
    }

    if (map.current && map.current.isStyleLoaded()) {
      // @ts-ignore
      map.current.easeTo({
        // @ts-ignore
        center: zoomToCenter,
        zoom: 17,
        // @ts-ignore
        // padding: { left: isMobile ? 0 : 200 },
      })
    }
  }, [zoomToCenter])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      // @ts-ignore
      map.current.easeTo({
        pitch: mapPitch ? 60 : 0,
      })
    }
  }, [mapPitch])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      if (map.current.getZoom() === mapZoom) return
      // @ts-ignore
      map.current.easeTo({
        // @ts-ignore
        zoom: mapZoom,
      })
    }
  }, [mapZoom])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      if (map.current.getSource('landparcel-source')) {
        map.current.removeLayer('landparcel-layer')
        // map.current.removeLayer('landparcel-layer-extrusion')
        map.current.removeSource('landparcel-source')
        highlightedMarker && highlightedMarker.current?.remove()
      }

      if (!entityData) {
        return
      }

      // for debugging
      // console.log(entityData.properties)

      let intersectingPolygon = false
      landparcelData.features.forEach((feat: any) => {
        if (!intersectingPolygon) {
          if (booleanPointInPolygon(entityData.geometry.coordinates, feat))
            intersectingPolygon = feat
        }
      })

      if (entityId && map.current.isStyleLoaded()) {
        map.current.addSource('landparcel-source', {
          type: 'geojson',
          data: intersectingPolygon,
        })

        if (map.current.hasImage('stripes')) {
          map.current.removeImage('stripes')
        }

        const fillColor = getConsumtionColor(
          consumptionType,
          consumptionType === 'heat'
            ? entityData.properties.heat
            : entityData.properties.electricity
        )
        // @ts-ignore
        map.current.addImage(`stripes`, getStripes({ color: fillColor }))

        map.current.addLayer(
          {
            id: 'landparcel-layer',
            type: 'fill',
            source: 'landparcel-source',
            paint: {
              // 'fill-color': fillColor,
              'fill-opacity': [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                13,
                0,
                16,
                0.5,
              ],
              'fill-pattern': `stripes`,
            },
          },
          process.env.NODE_ENV == 'development' ? '' : 'building-3d'
        )

        // Remove possibly existent markers:
        highlightedMarker.current?.remove()

        const customMarker = document.createElement('div')
        customMarker.className =
          'rounded-full w-4 h-4 blur-sm border-2 border-secondary cursor-pointer'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        highlightedMarker.current = new maplibregl.Marker(customMarker)
          .setLngLat(entityData.geometry.coordinates)
          .addTo(map.current)
      }
    }
  }, [entityData, consumptionType])

  function onMarkerClick(entityId: any) {
    setEntityId(entityId)
  }

  return (
    <>
      <div
        id="map"
        className="w-full h-full bg-[#F8F4F0] !fixed"
        aria-label="Kartenansicht"
      ></div>
      <MapKey consumptionType={consumptionType} />
    </>
  )
}
