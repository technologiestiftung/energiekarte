import { FC } from 'react'
import classNames from 'classnames'

export interface SidebarHeaderType {
  text: string
  fontSize?: string
  sidebarId?: string
}

export const SidebarHeader: FC<SidebarHeaderType> = ({
  text,
  fontSize = 'text-2xl',
  sidebarId = '',
}) => {
  return (
    <>
      <h1
        className={classNames(
          fontSize,
          'font-bold pt-7 pb-4 px-4 sticky top-0 bg-secondary scroll-shadow z-10 w-full'
        )}
      >
        <span id={sidebarId} className="w-[85%] inline-block text-textcolor/90">
          {text}
        </span>
      </h1>
    </>
  )
}
