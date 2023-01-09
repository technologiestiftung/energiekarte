import { FC } from 'react'
export interface MapKeyType {}
import { getMapKeyValues } from '@lib/getConsumtionColor'

export const MapKey: FC<MapKeyType> = ({ consumptionType }) => {
  const keyData = getMapKeyValues(consumptionType)
  console.log(keyData)

  return (
    <div className="shadow-lg text-sm w-56 rounded fixed z-20 bottom-0 right-0 mr-4 mb-4 p-4 bg-secondary">
      <h2 className="font-bold text-md pb-2">
        {consumptionType === 'electricity'
          ? 'Stromverbrauch'
          : 'Wärmeverbrauch'}
      </h2>
      <p className="flex">
        <span
          className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1 border-gray-500 border"
          style={{
            backgroundColor: keyData.colors[0],
          }}
        ></span>
        {'>'} {keyData.values[0]}
      </p>
      <p className="flex">
        <span
          className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1 border-gray-500 border"
          style={{
            backgroundColor: keyData.colors[1],
          }}
        ></span>
        {'>'} {keyData.values[1]}
      </p>{' '}
      <p className="flex">
        <span
          className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1 border-gray-500 border"
          style={{
            backgroundColor: keyData.colors[2],
          }}
        ></span>
        {'<'} {keyData.values[1]}
      </p>
      <p className="flex">
        <span
          className="text-sm mr-2 w-4 h-4 rounded-2xl mt-1 border-gray-500 border"
          style={{
            backgroundColor: keyData.colors[3],
          }}
        ></span>
        Keine Daten
      </p>
    </div>
  )
}
