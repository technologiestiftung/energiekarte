import { useEffect, FC, useRef, useState, useCallback } from 'react'
import maplibregl, { LngLatLike, Map, Marker } from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'
import mapStyle from './mapStyle'

import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

interface MapType {
  energyData: any
  zoomToCenter?: number[]
  entityId: string | number | null
  setEntityId: (time: string | null | number) => void
  entityConsumptionData: any
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
}) => {
  const map = useRef<Map>(null)
  const highlightedMarker = useRef<Marker>(null)

  // Map setup (run only once on initial render)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.current = new maplibregl.Map({
      container: 'map',
      style: mapStyle(),
      // style={process.env.NEXT_PUBLIC_MAPTILER_STYLE},
      // style={process.env.NEXT_PUBLIC_MAPTILER_STYLE},

      // style: `${process.env.NEXT_PUBLIC_MAPTILER_STYLE}`,

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

      energyData.consumption.features.forEach(function (marker: any) {
        const el = document.createElement('div')
        el.className = 'h-3 w-3 rounded-full bg-primary/70 cursor-pointer'
        el.addEventListener('click', function () {
          onMarkerClick(marker.properties.entityId, marker.geometry.coordinates)
        })
        // add marker to map
        new maplibregl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map.current)
      })

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
            'line-color': '#9bc95b',
            // 'line-blur': 6,
            'line-width': 2,
            'line-opacity': [
              'interpolate',
              ['exponential', 0.5],
              ['zoom'],
              13,
              0,
              16,
              0.6,
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
          'rounded-full w-4 h-4 blur-sm border-2 border-primary'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        highlightedMarker.current = new maplibregl.Marker(customMarker)
          .setLngLat(entityConsumptionData.geometry.coordinates)
          .addTo(map.current)
      }
    }
  }, [entityConsumptionData])

  function onMarkerClick(entityId: any) {
    setEntityId(entityId)
  }

  return (
    <div
      id="map"
      className="w-full h-full bg-[#F8F4F0] !fixed"
      aria-label="Kartenansicht der Einrichtungen"
    ></div>
  )
}
