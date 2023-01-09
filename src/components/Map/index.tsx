import { useEffect, FC, useRef, useState, useCallback } from 'react'
import maplibregl, { LngLatLike, Map, Marker } from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'
import mapStyle from './mapStyle'

import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

import { getConsumtionColor } from '@lib/getConsumtionColor'
import { MapKey } from './MapKey'

interface MapType {
  energyData: any
  zoomToCenter?: number[]
  entityId: string | number | null
  setEntityId: (time: string | null | number) => void
  entityConsumptionData: any
  consumptionType: string
  mapZoom: number
}

const MAP_CONFIG = {
  defaultZoom: 11,
  defaultLatitude: 52.520008,
  defaultLongitude: 13.404954,
  minZoom: 10,
  maxZoom: 19,
}

export const MapComponent: FC<MapType> = ({
  energyData,
  zoomToCenter,
  entityId,
  setEntityId,
  entityConsumptionData,
  consumptionType,
  mapZoom,
}) => {
  const [mapMarkers, setMapMarkers] = useState([])

  const map = useRef<Map>(null)
  const highlightedMarker = useRef<Marker>(null)

  if (mapMarkers) {
    mapMarkers.forEach((m) => {
      m[0].style.backgroundColor = getConsumtionColor(
        consumptionType,
        consumptionType === 'heat' ? m[1].heat : m[1].electricity
      )
    })
  }

  // Map setup (run only once on initial render)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.current = new maplibregl.Map({
      container: 'map',
      // style: mapStyle(),
      // @ts-ignore
      style: `${process.env.NEXT_PUBLIC_MAPTILER_STYLE}`,
      center: [
        MAP_CONFIG.defaultLongitude,
        MAP_CONFIG.defaultLatitude,
      ] as LngLatLike,
      zoom: MAP_CONFIG.defaultZoom,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      pitch: 20,
    })

    map.current.on('load', function () {
      if (!map.current) return
      let markers: number[] = []
      energyData.consumption.features.forEach(function (marker: any) {
        const el = document.createElement('div')
        el.style.backgroundColor = getConsumtionColor(
          consumptionType,
          consumptionType === 'heat'
            ? marker.properties.heat
            : marker.properties.electricity
        )
        el.className =
          'h-3 w-3 rounded-full cursor-pointer border-gray-500 border'
        el.addEventListener('click', function () {
          onMarkerClick(marker.properties.entityId, marker.geometry.coordinates)
        })
        markers.push([el, marker.properties])

        // add marker to map
        new maplibregl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map.current)
      })
      setMapMarkers(markers)

      map.current.on('click', (e) => {
        if (e?.originalEvent?.originalTarget?.nodeName === 'CANVAS') {
          setEntityId(null)
          return
        }
      })
    })
  }, [])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      // @ts-ignore
      map.current.easeTo({
        // @ts-ignore
        center: zoomToCenter,
        zoom: 15,
        // @ts-ignore
        // padding: { left: isMobile ? 0 : 200 },
      })
    }
  }, [zoomToCenter])

  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
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
        map.current.removeSource('landparcel-source')
        highlightedMarker && highlightedMarker.current?.remove()
      }

      if (!entityConsumptionData) {
        return
      }

      let intersectingPolygon = false
      energyData.landparcel.features.forEach((feat: any) => {
        if (!intersectingPolygon) {
          if (
            booleanPointInPolygon(
              entityConsumptionData.geometry.coordinates,
              feat
            )
          )
            intersectingPolygon = feat
        }
      })

      if (entityId && map.current.isStyleLoaded()) {
        map.current.addSource('landparcel-source', {
          type: 'geojson',
          data: intersectingPolygon,
        })

        map.current.addLayer({
          id: 'landparcel-layer',
          type: 'line',
          source: 'landparcel-source',
          paint: {
            'line-dasharray': [1, 1],
            'line-color': getConsumtionColor(
              consumptionType,
              consumptionType === 'heat'
                ? entityConsumptionData.properties.heat
                : entityConsumptionData.properties.electricity
            ),
            // 'line-blur': 6,
            'line-width': 3,
            'line-opacity': [
              'interpolate',
              ['exponential', 0.5],
              ['zoom'],
              13,
              0,
              16,
              0.8,
            ],
          },
        })

        // map.current.addLayer({
        //   id: 'landparcel-layer',
        //   type: 'fill',
        //   source: 'landparcel-source',
        //   paint: {
        //     'fill-color': '#9bc95b',
        //     'fill-opacity': [
        //       'interpolate',
        //       ['exponential', 0.5],
        //       ['zoom'],
        //       13,
        //       0,
        //       22,
        //       0.4,
        //     ],
        //   },
        // })

        // Remove possibly existent markers:
        highlightedMarker.current?.remove()

        const customMarker = document.createElement('div')
        customMarker.className =
          'rounded-full w-4 h-4 blur-sm border-2 border-secondary'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        highlightedMarker.current = new maplibregl.Marker(customMarker)
          .setLngLat(entityConsumptionData.geometry.coordinates)
          .addTo(map.current)
      }
    }
  }, [entityConsumptionData, consumptionType])

  function onMarkerClick(entityId: any) {
    setEntityId(entityId)
  }

  return (
    <>
      <div
        id="map"
        className="w-full h-full bg-[#F8F4F0] !fixed"
        aria-label="Kartenansicht der Einrichtungen"
      ></div>
      <MapKey consumptionType={consumptionType} />
    </>
  )
}
