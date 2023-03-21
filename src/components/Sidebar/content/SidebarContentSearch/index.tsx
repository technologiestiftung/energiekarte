import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'
import { SearchResultType, useGeocodedPlace } from '@lib/hooks/useGeocodedPlace'
import { useDebounce } from 'use-debounce'
import { GeoMarker } from '@components/Icons'

interface SearchResultItemPropType extends SearchResultType {
  searchTerm: string
  onClick: () => void
}

const SearchResultItem: FC<SearchResultItemPropType> = ({
  name,
  searchTerm,
  onClick,
}) => {
  const indexOfTerm = name.toLowerCase().indexOf(searchTerm.toLowerCase())
  const before = name.slice(0, indexOfTerm)
  const after = name.slice(indexOfTerm + searchTerm.length, name.length)
  return (
    <button
      onClick={onClick}
      className={classNames(
        'flex items-center pt-3 text-left w-full',
        'hover:bg-gray-100 rounded transition px-4 -ml-4',
        'group focus:outline-none focus:ring-2 focus:ring-gray-500',
        'focus:ring-gray-500 focus:z-10 relative'
      )}
      style={{ width: 'calc(100% + 32px)' }}
    >
      <span className="text-gray-300 transform -translate-y-2 mr-2">
        <GeoMarker />
      </span>
      <div
        className={classNames(
          'pb-2 border-b border-gray-300 flex-grow border-dashed',
          'group-hover:border-opacity-0 group-focus:border-opacity-0 transition'
        )}
      >
        <h6 className="text-sm leading-4">
          {indexOfTerm === -1 ? (
            name
          ) : (
            <>
              {before}
              <span className="text-gray-400 text-light">{searchTerm}</span>
              {after}
            </>
          )}
        </h6>
      </div>
    </button>
  )
}

export interface SidebarContentSearchType {
  setZoomToCenter: (center: number[]) => void
}

export const SidebarContentSearch: FC<SidebarContentSearchType> = ({
  setZoomToCenter,
}) => {
  const [inputVal, setInputVal] = useState('')
  const [debouncedInputValue] = useDebounce(inputVal, 700)

  const { results } = useGeocodedPlace(debouncedInputValue)

  const clickHandler = function (d: any) {
    setZoomToCenter([Number(d[1]), Number(d[0])])
  }

  return (
    <>
      <SidebarHeader text="Suche" />
      <div className="leading-relaxed">
        <SidebarBody>
          <p>
            Finde deinen Bezirk, deine Straße oder einen anderen Ort in Berlin.
          </p>

          <input
            type="text"
            placeholder="Gib hier einen Ort an"
            value={inputVal}
            onChange={(evt) => setInputVal(evt.target.value)}
            className={classNames(
              'block px-3 py-2 border rounded border-gray-400 w-full',
              'my-4 focus:outline-none focus:ring-2 focus:ring-gray-500',
              'focus:ring-offset-2 focus:ring-offset-white'
            )}
          />

          {results && (
            <ul>
              {results.map((item) => (
                <li key={`${item.id}`}>
                  <SearchResultItem
                    {...item}
                    searchTerm={inputVal}
                    onClick={() =>
                      clickHandler([item.latitude, item.longitude])
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </SidebarBody>
      </div>
    </>
  )
}
