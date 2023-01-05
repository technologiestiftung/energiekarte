import { ChevronDown } from '@components/Icons/ChevronDown'
import classNames from 'classnames'
import { FC, ReactNode, useState } from 'react'

interface AccordionPropType {
  title: string
  children: ReactNode
}

type StyleGetterType = (props: { isActive: boolean }) => Record<string, string>

const borderBottomStyle = 'border-b border-gray-300'
const getStyles: StyleGetterType = ({ isActive }) => ({
  wrapper: classNames(!isActive && borderBottomStyle, 'relative z-0'),
  title: classNames('pt-2 flex w-full', isActive ? 'pb-3' : 'pb-4'),
  content: classNames(
    borderBottomStyle,
    'rounded m-0 pb-6 pt-0 overflow-hidden',
    'max-w-none w-full text-sm'
  ),
})

export const Accordion: FC<AccordionPropType> = ({ title, children }) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const classes = getStyles({ isActive })

  return (
    <div className={classes.wrapper}>
      <button
        className={classes.title}
        onClick={() => {
          setIsActive(!isActive)
        }}
        tabIndex={isActive ? 1 : 0}
      >
        <h2 className="text-left font-bold max-w-[90%] flex-1 group-hover:text-blue-500 text-sm">
          {title}
        </h2>
        <ChevronDown
          className={classNames(
            'transform transition-transform text-primary',
            isActive ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
      {isActive && (
        <span style={{ margin: 0 }} className={classes.content}>
          {children}
        </span>
      )}
    </div>
  )
}
