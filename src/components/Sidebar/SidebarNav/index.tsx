import { FC } from 'react'
import classNames from 'classnames'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { Plus, Minus } from '@components/Icons'

const btnClasses =
  'shadow-lg hover:bg-textcolor hover:text-secondary bg-secondary text-textcolor h-10 w-10 mt-2 cursor-pointer list-none text-center grid place-items-center rounded-full'

export interface SidebarNavType {
  navViews: any
  setNavView: (view: 'info' | 'list') => void
  navView?: 'info' | 'list'
  sidebarMenuOpen: boolean
  setSidebarMenuOpen: (open: boolean) => void
  setModalOpen: (open: boolean) => void
  entityId: string | number | null
  setEntityId: (time: string | null | number) => void
  mapZoom: number
  setMapZoom: (time: number) => void
}

export const SidebarNav: FC<SidebarNavType> = ({
  navViews,
  setNavView,
  navView,
  sidebarMenuOpen,
  setSidebarMenuOpen,
  setModalOpen,
  entityId,
  setEntityId,
  mapZoom,
  setMapZoom,
}) => {
  const hasMobileSize = useHasMobileSize()
  let navPositionClasses =
    !sidebarMenuOpen || hasMobileSize ? 'left-[0px]' : 'left-sidebar'

  if (entityId && !hasMobileSize) {
    navPositionClasses = 'left-sidebar'
  }

  const padding = sidebarMenuOpen ? (hasMobileSize ? 'pl-4' : 'pl-0') : 'pl-4'
  const navClasses =
    'h-14 cursor-pointer list-none text-center grid place-items-center hover:bg-textcolor'
  function onNavClick(listView: any) {
    if (!sidebarMenuOpen) {
      setSidebarMenuOpen(true)
    }
    setNavView(listView.value)
    setEntityId(null)
  }
  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        title="home"
        className={classNames(
          'introbtn rotate-90 translate-x-12 translate-y-14 md:rotate-0 md:translate-x-0 md:translate-y-0 fixed top-4 z-20 right-4 text-center text-xs md:text-base cursor-pointer bg-secondary font-bold hover:bg-primary rounded-2xl mb-4 px-4 py-2.5 group'
        )}
      >
        <span className={'text-primary group-hover:text-secondary'}>
          Energie
        </span>
        <span className={'text-textcolor'}>Checkpoint </span>
      </div>

      <nav
        className={classNames(
          navPositionClasses,
          padding,
          'fixed top-0 p-4 transition-left ease-in-out duration-300 z-30 rounded overflow-hidden'
        )}
      >
        <div className="w-14 flex flex-col list-none overflow-hidden shadow-lg text-textcolor ">
          <div className="w-14 flex flex-col list-none rounded overflow-hidden shadow-lg">
            {navViews.map((listView: any) => (
              <div
                key={listView.value}
                title={listView.name}
                onClick={() => onNavClick(listView)}
                className={classNames(
                  'text-secondary',
                  'hover:text-secondary',
                  listView.value === navView && sidebarMenuOpen
                    ? 'bg-textcolor text-secondary'
                    : 'bg-secondary text-textcolor',
                  navClasses
                )}
              >
                {listView.icon}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <nav
        className={classNames(
          navPositionClasses,
          padding,
          'fixed bottom-0 p-4 transition-left ease-in-out duration-300 z-30 rounded overflow-hidden'
        )}
      >
        <div>
          <button
            title="zoom in"
            className={btnClasses}
            onClick={() => setMapZoom(mapZoom + 1)}
          >
            <Plus />
          </button>
          <button
            title="zoom out"
            className={btnClasses}
            onClick={() => setMapZoom(mapZoom - 1)}
          >
            <Minus />
          </button>
          {/* <button title="" className={navClasses}>
          {' '}
          <Geolocate />
        </button> */}
        </div>
      </nav>
    </>
  )
}
