import { FC } from 'react'
import { Dialog } from '@headlessui/react'
import { Cross } from '../Icons'

import { TsbLogo } from '@components/Logos/TsbLogo'
import { OdisLogo } from '@components/Logos/OdisLogo'
import { CitylabLogo } from '@components/Logos/CitylabLogo'

import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'

export interface IntroModalType {
  modalOpen: boolean
  setModalOpen: (date: boolean) => void
  setNavView: (date: 'info' | 'filter') => void
  setSidebarMenuOpen: (date: boolean) => void
  setRunJoyride: (date: boolean) => void
  setEntityId: (date: number | null) => void
  setConsumptionType: (type: string) => void
  setZoomToCenter: (center: number[]) => void
}

export const IntroModal: FC<IntroModalType> = ({
  modalOpen,
  setModalOpen,
  setNavView,
  setSidebarMenuOpen,
  setRunJoyride,
  setEntityId,
  setConsumptionType,
  setZoomToCenter,
}) => {
  const hasMobileSize = useHasMobileSize()

  function closeModal() {
    setModalOpen(false)
  }
  function closeModalExplore() {
    setModalOpen(false)
    setNavView('filter')
    setSidebarMenuOpen(true)
  }
  function closeModalInfo() {
    setModalOpen(false)
    setNavView('info')
    setSidebarMenuOpen(true)
  }

  return (
    <>
      <Dialog
        open={modalOpen}
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-secondary/80" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 leading-7">
            <Dialog.Panel className="absolute border border-primary/50  bg-secondary text-textcolor/90 max-h-full p-6 max-w-xs md:max-w-none filter drop-shadow-lg rounded-lg md:min-w-xl md:w-1/2 mx-auto transition-all">
              <button
                className="text-textcolor focus:outline-none top-0 right-0 m-4 absolute cursor-pointer z-20 hover:bg-textcolor border-textcolor border-2 rounded-full p-1 hover:text-white"
                onClick={closeModal}
              >
                <Cross />
              </button>
              <h2 className="font-bold text-2xl pb-4 pt-2 text-textcolor/80">
                Berliner <span className="text-primary">Energie</span>Checkpoint
              </h2>
              <h4 className="pb-6 leading-normal">
                <p className="font-bold text-base md:text-lg pb-2">
                  Öffentliche Gebäude und ihr Beitrag zur Klimaneutralität
                </p>
                <p className="text-sm md:text-base">
                  Berlin möchte spätestens bis 2045 klimaneutral sein. Dazu
                  wurde im Berliner Klimaschutz- und Energiewendegesetz (EWG
                  Bln) als Ziel eine Reduktion der Kohlendioxidemissionen um
                  mindestens 95 % im Vergleich zum Jahr 1990 festgelegt.
                  Öffentliche Gebäude wie Schulen und Kultureinrichtungen sollen
                  durch Energieeinsparungen und Sanierungen eine Vorbildrolle
                  einnehmen. Doch welche Gebäude verbrauchen wie viel Energie
                  und welche Einsparpotentiale stecken in der Sanierung
                  einzelner Gebäude? Wir schauen beispielhaft auf die Daten zu
                  Liegenschaften der BIM (Berliner Immobilien Management).
                </p>
              </h4>

              <button
                className="px-4 bg-primary hover:bg-primary-dark font-bold text-white p-2 text-bold rounded hover:border-primary"
                onClick={() =>
                  (function () {
                    setModalOpen(false)
                    if (hasMobileSize) {
                      setEntityId(null)
                      setZoomToCenter([13.40907, 52.51853])
                    } else {
                      setEntityId(26)
                    }
                    setConsumptionType('heat')

                    setTimeout(() => {
                      setRunJoyride(true)
                    }, 500)
                  })()
                }
              >
                Erkunden
              </button>

              <button
                className="px-4 ml-4 bg-secondary text-gray-500 text-bold hover:text-primary p-2 rounded "
                onClick={closeModalInfo}
              >
                Mehr Infos
              </button>

              <div className="grid md:grid-cols-[1fr,auto] gap-4 mt-4 md:mt-6">
                <p className="text-xs mb-2 md:mb-0 text-gray-500 max-w-md pt-4">
                  <i>
                    Eine prototypische Datenvisualisierung der Open Data
                    Informationsstelle Berlin in Zusammenarbeit mit dem CityLAB
                    Berlin
                  </i>
                </p>
                <div className="inline-block  pt-0 ml-4 md:flex self-center">
                  <div className="w-32 md:pt-4 mr-8 md:mt-0 self-center">
                    <OdisLogo className={`w-30`} />
                  </div>
                  <div className="w-32 pt-0 mr-8 md:mt-0 self-center">
                    <CitylabLogo className={`w-30`} />
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
