import { useEffect, FC, useRef, useState, useCallback } from 'react'
import maplibregl, { LngLatLike, Map, Marker } from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'
import mapStyle from './mapStyle'

import booleanPointInPolygon from '@turf/boolean-point-in-polygon'

import { getConsumtionColor } from '@lib/getConsumtionColor'
import { MapKey } from './MapKey'

interface MapType {
  zoomToCenter?: number[]
  entityId: string | number | null
  setEntityId: (time: string | null | number) => void
  entityData: any
  consumptionType: string
  mapZoom: number
  landparcelData: any
  pointData: any
}

const MAP_CONFIG = {
  defaultZoom: 11,
  defaultLatitude: 52.520008,
  defaultLongitude: 13.404954,
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
}) => {
  const [mapMarkers, setMapMarkers] = useState([])

  const map = useRef<Map>(null)
  const highlightedMarker = useRef<Marker>(null)

  useEffect(() => {
    if (mapMarkers) {
      mapMarkers.forEach((m, i) => {
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
      pitch: 0,
    })
    map.current.on('load', function () {
      if (!map.current || loaded) return
      let markers: number[] = []
      loaded = true

      pointData.features.forEach(function (marker: any, index: number) {
        const el = document.createElement('div')
        el.key = index
        el.id = 'marker-' + marker.properties.entityId

        el.style.backgroundColor = getConsumtionColor(
          consumptionType,
          consumptionType === 'heat'
            ? marker.properties.heat
            : marker.properties.electricity
        )
        el.style.display = 'unset'
        el.className =
          'h-3 w-3 rounded-full cursor-pointer border-gray-500 border'
        el.addEventListener('click', function () {
          onMarkerClick(marker.properties.entityId, marker.geometry.coordinates)
        })
        markers.push(el)

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

      map.current.on('zoomend', (e) => {
        setMapZoom(map.current?.getZoom())
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

      console.log(entityData.properties)

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

        map.current.addLayer(
          {
            id: 'landparcel-layer',
            type: 'fill',
            source: 'landparcel-source',
            paint: {
              'fill-color': getConsumtionColor(
                consumptionType,
                consumptionType === 'heat'
                  ? entityData.properties.heat
                  : entityData.properties.electricity
              ),
              'fill-opacity': [
                'interpolate',
                ['exponential', 0.5],
                ['zoom'],
                13,
                0,
                16,
                0.5,
              ],
            },
          },
          process.env.NODE_ENV == 'development' ? '' : 'building'
        )
        // map.current.addLayer({
        //   id: 'landparcel-layer',
        //   type: 'line',
        //   source: 'landparcel-source',
        //   paint: {
        //     'line-dasharray': [1, 1],
        //     'line-color': getConsumtionColor(
        //       consumptionType,
        //       consumptionType === 'heat'
        //         ? entityData.properties.heat
        //         : entityData.properties.electricity
        //     ),
        //     // 'line-blur': 6,
        //     'line-width': 3,
        //     'line-opacity': [
        //       'interpolate',
        //       ['exponential', 0.5],
        //       ['zoom'],
        //       13,
        //       0,
        //       16,
        //       0.8,
        //     ],
        //   },
        // })

        // map.current.addLayer({
        //   id: 'landparcel-layer-extrusion',
        //   type: 'fill-extrusion',
        //   source: 'landparcel-source',
        //   paint: {
        //     // See the MapLibre Style Specification for details on data expressions.
        //     // https://maplibre.org/maplibre-gl-js-docs/style-spec/expressions/

        //     // Get the fill-extrusion-color from the source 'color' property.
        //     'fill-extrusion-color': getConsumtionColor(
        //       consumptionType,
        //       consumptionType === 'heat'
        //         ? entityData.properties.heat
        //         : entityData.properties.electricity
        //     ),
        //     'fill-extrusion-height': 30,
        //     'fill-extrusion-base': 0,
        //     'fill-extrusion-opacity': 0.3,
        //   },
        // })
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
