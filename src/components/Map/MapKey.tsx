import { FC, useState, useEffect } from 'react'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'

export interface MapKeyType {
  consumptionType: string
}
import { getMapKeyValues } from '@lib/getConsumtionColor'
import { Plus, Minus } from '@components/Icons/'

export const MapKey: FC<MapKeyType> = ({ consumptionType }) => {
  const [open, setOpen] = useState<boolean>(true)
  const keyData = getMapKeyValues(consumptionType)
  const hasMobileSize = useHasMobileSize()
  useEffect(() => {
    setOpen(!hasMobileSize)
  }, [hasMobileSize])

  return (
    <div className="shadow-lg text-sm  rounded fixed z-20 bottom-0 right-0 mr-4 mb-4 bg-secondary">
      <h2
        onClick={() => setOpen(!open)}
        className="font-bold text-md cursor-pointer hover:text-primary p-4"
      >
        {!open
          ? 'Legende'
          : consumptionType === 'electricity'
          ? 'Stromverbrauch (kWh/a)'
          : 'Wärmeverbrauch (kWh/a)'}

        <span className="float-right bottom-0.5 relative ml-4">
          {open ? <Minus /> : <Plus />}
        </span>
      </h2>
      {open && (
        <span className="block px-4 pb-4">
          <p className="flex">
            <span
              className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1  "
              style={{
                backgroundColor: keyData.colors[0],
              }}
            ></span>
            {'>'} {keyData.values[0].toLocaleString('de-DE')}
          </p>
          <p className="flex">
            <span
              className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1 "
              style={{
                backgroundColor: keyData.colors[1],
              }}
            ></span>
            {'>'} {keyData.values[1].toLocaleString('de-DE')} {' - '}
            {keyData.values[0].toLocaleString('de-DE')}
          </p>{' '}
          <p className="flex">
            <span
              className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1  "
              style={{
                backgroundColor: keyData.colors[2],
              }}
            ></span>
            {'<='} {keyData.values[1].toLocaleString('de-DE')}
          </p>
          <p className="flex">
            <span
              className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1 border-gray-500 border"
              style={{
                backgroundColor: keyData.colors[3],
              }}
            ></span>
            keine Daten
          </p>
        </span>
      )}
    </div>
  )
}
