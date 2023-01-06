import { FC } from 'react'
import { Range, getTrackBackground } from 'react-range'

export interface RangeSliderType {
  value: number[]
  // setValue
}

const primaryColor = '#9bc95b'

export const RangeSlider: FC<RangeSliderType> = ({ value, setValue }) => {
  return (
    <div className="m-4">
      <Range
        values={value}
        step={1}
        min={0}
        max={100}
        // rtl={rtl}
        onChange={(v) => {
          setValue(v)
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: value,
                  colors: ['#ccc', primaryColor, '#ccc'],
                  min: 0,
                  max: 100,
                  //   rtl,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '10x',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA',
            }}
          >
            <div
              style={{
                height: '16px',
                width: '5px',
                backgroundColor: isDragged ? primaryColor : '#CCC',
              }}
            >
              {value[index].toFixed(1)}
            </div>
          </div>
        )}
      />
    </div>
  )
}
