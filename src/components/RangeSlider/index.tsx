import { FC } from 'react'
import { Range, getTrackBackground } from 'react-range'

export interface RangeSliderType {
  value: number[]
  // setValue
}

const primaryColor = '#9bc95b'

export const RangeSlider: FC<RangeSliderType> = ({
  value,
  setValue,
  minValue,
  maxValue,
  step,
}) => {
  return (
    <div className="m-4 mx-8">
      <Range
        values={value}
        step={step}
        min={minValue}
        max={maxValue}
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
            }}
          >
            <div
              style={{
                height: '20px',
                width: '5px',
                borderRadius: '4px',
                backgroundColor: '#AAA',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
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
              {value[index].toLocaleString('de-DE')}
            </div>
          </div>
        )}
      />
    </div>
  )
}
