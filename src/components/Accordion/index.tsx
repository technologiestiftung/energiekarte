import { ChevronDown } from '@components/Icons/ChevronDown'
import classNames from 'classnames'
import { FC, ReactNode, useState, useEffect } from 'react'

interface AccordionPropType {
  title: string
  children: ReactNode
  active: boolean
  extraClassName: string
}

type StyleGetterType = (props: { isActive: boolean }) => Record<string, string>

const borderBottomStyle = 'border-b border-gray-300/40'
const getStyles: StyleGetterType = ({ isActive }) => ({
  wrapper: classNames(!isActive && borderBottomStyle, 'relative z-0'),
  title: classNames('pt-2 flex w-full', isActive ? 'pb-3' : 'pb-4'),
  content: classNames(
    borderBottomStyle,
    'm-0 pb-6 pt-0 overflow-hidden',
    'max-w-none w-full text-sm'
  ),
})

export const Accordion: FC<AccordionPropType> = ({
  title,
  children,
  active,
  extraClassName,
}) => {
  const [isActive, setIsActive] = useState<boolean>(active || false)
  const classes = getStyles({ isActive })

  useEffect(() => {
    setIsActive(active)
  }, [active])

  return (
    <div className={classNames(extraClassName, classes.wrapper)}>
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
            'transform transition-transform',
            isActive ? 'rotate-180' : 'rotate-0'
          )}
        />
      </button>
      {isActive && (
        <div style={{ margin: 0 }} className={classes.content}>
          {children}
        </div>
      )}
    </div>
  )
}
