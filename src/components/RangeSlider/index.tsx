import { FC } from 'react'
import { Range, getTrackBackground } from 'react-range'

export interface RangeSliderType {
  value: number[]
  // setter
}

export const RangeSlider: FC<RangeSliderType> = ({ value, setter }) => {
  return (
    <div className="m-4">
      <Range
        step={10}
        min={0}
        max={100}
        values={value}
        onChange={(values) => setter(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '3px',
              width: '100%',
              // backgroundColor: 'red',
            }}
            className={'bg-primary'}
          >
            {children}
          </div>
        )}
        renderMark={({ props, index }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '16px',
              width: '5px',
              backgroundColor:
                index * 10 < value[0] || index * 10 > value[1] ? '#ccc' : 'red',
            }}
          />
        )}
        renderThumb={({ props }) => (
          <>
            <div
              {...props}
              style={{
                ...props.style,
                height: '10px',
                width: '10px',
              }}
              className={'bg-primary'}
            />
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: value,
                  // colors: ['#548BF4', '#ccc'],
                  colors: ['#ccc', '#548BF4', '#ccc'],
                  min: 0,
                  max: 100,
                  // rtl,
                }),
                alignSelf: 'center',
              }}
            ></div>
          </>
        )}
      />
    </div>
  )
}
