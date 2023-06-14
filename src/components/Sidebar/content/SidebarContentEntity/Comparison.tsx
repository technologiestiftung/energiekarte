import { FC } from 'react'
import classNames from 'classnames'

import { ArrowUp, ArrowDown } from '@components/Icons/'

export interface ComparisionType {
  consumptionType: string
  rankingInfo: any
  setEntityId: (id: number | null) => void
}
export const Comparision: FC<ComparisionType> = ({
  consumptionType,
  rankingInfo,
  setEntityId,
}) => {
  const type =
    consumptionType === 'electricity' ? 'Stromverbrauch' : 'Wärmeverbrauch'

  return (
    <div className="text-xs">
      <p className="text-sm pb-2">Ranking</p>

      <span className="text-gray-500 text-xs">
        {!rankingInfo.idLess ? (
          <span>Es liegt kein {type} vor.</span>
        ) : (
          <span>
            Der {type} liegt im Ranking auf Platz{' '}
            <b>{rankingInfo.rankingPosition}</b> von{' '}
            <b>{rankingInfo.rankingLength}</b>. Finde Grundstücke mit höherem bzw.
            niedrigerem Verbrauch.
          </span>
        )}
      </span>

      <span className="flex pt-4 ranking-btns">
        {/* <div className="w-24 border"> */}
        <button
          className={classNames(
            'disabled:opacity-50 text-xs py-2 flex-1 justify-center flex bg-white/50 mr-1 rounded border border-textcolor hover:border-primary hover:text-primary'
          )}
          onClick={() => setEntityId(rankingInfo.idMore)}
          disabled={!rankingInfo.idMore}
        >
          <ArrowUp />
        </button>
        <button
          className="disabled:opacity-50 text-xs py-2 flex-1 justify-center flex bg-white/50 ml-1 rounded border border-textcolor hover:border-primary  hover:text-primary"
          onClick={() => setEntityId(rankingInfo.idLess)}
          disabled={!rankingInfo.idLess}
        >
          <ArrowDown />
        </button>
      </span>
    </div>
  )
}
