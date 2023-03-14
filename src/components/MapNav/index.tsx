import { FC } from 'react'
import classNames from 'classnames'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { Plus, Minus, Geolocate } from '../Icons'

export interface MapNavType {
  mapZoom: number
  setMapZoom: (zoom: number) => void
}

export const MapNav: FC<MapNavType> = ({ mapZoom, setMapZoom }) => {
  const navClasses =
    'hover:bg-textcolor hover:text-secondary bg-secondary text-textcolor h-10 w-10 mt-2 cursor-pointer list-none text-center grid place-items-center rounded-full'

  return (
    <nav
      className={classNames(
        'mb-3 fixed bottom-12 p-6 ease-in-out duration-300 z-10 right-0'
      )}
    >
      <div>
        <button
          title="zoom in"
          className={navClasses}
          onClick={() => setMapZoom(mapZoom + 1)}
        >
          <Plus />
        </button>
        <button
          title="zoom out"
          className={navClasses}
          onClick={() => setMapZoom(mapZoom - 1)}
        >
          <Minus />
        </button>
        {/* <button title="" className={navClasses}>
          {' '}
          <Geolocate />
        </button> */}
      </div>
    </nav>
  )
}
