import { FC } from 'react'
import classNames from 'classnames'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'

export interface SidebarNavType {
  navViews: any
  setNavView: (view: 'info' | 'list') => void
  navView?: 'info' | 'list'
  sidebarMenuOpen: boolean
  setSidebarMenuOpen: (open: boolean) => void
  setModalOpen: (open: boolean) => void
  marketId: string | number | null
  setMarketId: (time: string | null | number) => void
}

export const SidebarNav: FC<SidebarNavType> = ({
  navViews,
  setNavView,
  navView,
  sidebarMenuOpen,
  setSidebarMenuOpen,
  setModalOpen,
  marketId,
  setMarketId,
}) => {
  const hasMobileSize = useHasMobileSize()
  let navPositionClasses =
    !sidebarMenuOpen || hasMobileSize ? 'left-[0px]' : 'left-sidebar'

  if (marketId && !hasMobileSize) {
    navPositionClasses = 'left-sidebar'
  }

  const padding = sidebarMenuOpen ? (hasMobileSize ? 'pl-4' : 'pl-0') : 'pl-4'
  const navClasses =
    'h-14 cursor-pointer list-none text-center grid place-items-center hover:bg-primary'
  function onNavClick(listView: any) {
    if (!sidebarMenuOpen) {
      setSidebarMenuOpen(true)
    }
    setNavView(listView.value)
    setMarketId(null)
  }
  return (
    <>
      <div className="fixed w-full top-4 z-10 text-center">
        <div
          onClick={() => setModalOpen(true)}
          title="home"
          className={classNames(
            'text-xs md:text-base mr-4 float-right w-fit cursor-pointer bg-secondary font-bold hover:bg-primary rounded-2xl mb-4 px-4 py-2.5 group'
          )}
        >
          <span className={'text-primary group-hover:text-secondary'}>
            Energie
          </span>
          <span className={'text-lightblue'}>Karte</span>
        </div>
      </div>

      <nav
        className={classNames(
          navPositionClasses,
          padding,
          'fixed top-0 p-4 transition-left ease-in-out duration-300 z-10 rounded overflow-hidden'
        )}
      >
        <div className="w-14 flex flex-col list-none overflow-hidden shadow-lg text-primary ">
          <div className="w-14 flex flex-col list-none rounded overflow-hidden shadow-lg">
            {navViews.map((listView: any) => (
              <div
                key={listView.value}
                title={listView.name}
                onClick={() => onNavClick(listView)}
                className={classNames(
                  'text-primary',
                  'hover:text-secondary',
                  listView.value === navView && sidebarMenuOpen
                    ? 'bg-primary text-secondary'
                    : 'bg-secondary text-primary',
                  navClasses
                )}
              >
                {listView.icon}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}