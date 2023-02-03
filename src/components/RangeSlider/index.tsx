import { FC } from 'react'
import { Range, getTrackBackground } from 'react-range'

export interface RangeSliderType {
  value: number[]
  setValue: (value: number[]) => void
  minValue: number
  maxValue: number
  step: number
  rounding?: string | undefined
}

const primaryColor = '#9bc95b'

function roundingFunction(value: number, type: string | undefined) {
  if (type === 'million') {
    return Math.round((value / 1000000) * 100) / 100
  }
  return value.toLocaleString('de-DE')
}

export const RangeSlider: FC<RangeSliderType> = ({
  value,
  setValue,
  minValue,
  maxValue,
  step,
  rounding,
}) => {
  return (
    <div className="m-4 mx-4">
      <Range
        values={value}
        step={step}
        min={minValue}
        max={maxValue}
        // rtl={rtl}
        onChange={(v: number[]) => {
          // @ts-ignore
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
                  min: minValue,
                  max: maxValue,
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
              height: '30px',
              width: '30px',
              // borderRadius: '4px',
              // backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // boxShadow: '0px 2px 6px #AAA',
              outline: 'none',
            }}
          >
            <div
              style={{
                height: '15px',
                width: '15px',
                borderRadius: '1rem',
                backgroundColor: primaryColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // boxShadow: '0px 2px 6px #AAA',
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                top: '28px',
                color: primaryColor,
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                // backgroundColor: isDragged ? primaryColor : '#CCC',
              }}
            >
              {roundingFunction(value[index], rounding)}
            </div>
          </div>
        )}
      />
    </div>
  )
}
