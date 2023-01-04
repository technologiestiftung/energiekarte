import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'

export interface SidebarContentFilterType {
  data: any
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
  data,
  entityId,
  setEntityId,
}) => {
  //   function getUsageData(feat, type) {

  //   {'}'}

  //   const [highlightedEntity, setHighlightedEntity] = useState(null)

  //   useEffect(() => {

  //   }, [])

  return (
    <>
      <SidebarHeader text="Filter" />

      <SidebarBody>
        <p className="py-2 text-sm">Filter intro Text</p>
      </SidebarBody>
    </>
  )
}
