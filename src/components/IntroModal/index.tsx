import { FC } from 'react'
import { Dialog } from '@headlessui/react'
import { Cross } from '../Icons'

import { TsbLogo } from '@components/Logos/TsbLogo'
import { OdisLogo } from '@components/Logos/OdisLogo'

export interface IntroModalType {
  modalOpen: boolean
  setModalOpen: (date: boolean) => void
  setNavView: (date: 'info' | 'filter') => void
  setSidebarMenuOpen: (date: boolean) => void
}

export const IntroModal: FC<IntroModalType> = ({
  modalOpen,
  setModalOpen,
  setNavView,
  setSidebarMenuOpen,
  setRunJoyride,
}) => {
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
            <Dialog.Panel className="border border-primary/50  bg-secondary text-textcolor/90 max-h-full p-6 max-w-xs md:max-w-none filter drop-shadow-lg rounded-lg md:min-w-xl md:w-1/2 mx-auto transition-all">
              <button
                className="text-textcolor focus:outline-none top-0 right-0 m-2 absolute cursor-pointer z-20 hover:bg-primary rounded-full p-2 hover:text-secondary"
                onClick={closeModal}
              >
                <Cross />
              </button>
              <h2 className="font-bold text-2xl pb-4 pt-2 text-textcolor/80">
                Berliner EnergieCheckpoint
              </h2>
              <h4 className="pb-4">
                <p>
                  Energieverbrauch und Einsparpotentiale - Wie steht es um den
                  Beitrag öffentlicher Gebäude zur Klimaneutralität?<br></br>
                </p>

                <p>
                  Berlin möchte spätestens bis 2045 klimaneutral sein. Dazu
                  beschloss das Berliner Klimaschutz- und Energiewendegesetz
                  (EWG Bln) eine Reduktion der Kohlendioxidemmissionen um
                  mindestens 95 % im Vergleich zu den Emissionen des Jahres
                  1990. Öffentliche Gebäude wie Feuerwehren oder
                  Kultureinrichtungen sollen durch Energieeinsparungen und
                  Sanierungen eine Vorbildrolle einnehmen.
                </p>

                <p>
                  Wir schauen beispielhaft auf die Daten zu Strom- und
                  Wärmevebrauch sowie Sanierungskosten und Einsparpotenzial der
                  Liegenschaften der BIM (Berliner Immobilien Management)
                </p>
              </h4>

              <button
                className="xmas-btn px-4 bg-secondary hover:bg-primary hover:text-secondary text-primary p-2 text-bold rounded border-2 border-primary hover:border-primary"
                onClick={closeModalExplore}
              >
                Erkunden
              </button>
              <button
                className="px-4 ml-4 bg-secondary text-textcolor text-bold border-2 border-textcolor/90 hover:border-primary p-2 rounded hover:text-secondary hover:bg-primary"
                onClick={closeModalInfo}
              >
                Mehr Infos
              </button>
              <button
                className="px-4 ml-4 bg-secondary text-textcolor text-bold border-2 border-textcolor/90 hover:border-primary p-2 rounded hover:text-secondary hover:bg-primary"
                onClick={() => setRunJoyride(true)}
              >
                Tour starten
              </button>

              <div className="grid md:grid-cols-[1fr,auto] gap-4 mt-4 md:mt-6">
                <p className="text-xs mb-2 md:mb-0 text-gray-500 max-w-md pt-4">
                  <i>
                    Eine prototypische Datenvisualisierung der Open Data
                    Informationsstelle Berlin in Zusammenarbeit mit dem CityLAB
                    Berlin
                  </i>
                </p>
                <div className="inline-block ml-4 md:flex self-center">
                  <div className="w-32">
                    <TsbLogo className={`w-30`} />
                  </div>
                  <div className="w-32 pt-2 mr-8 md:mt-0 self-center">
                    <OdisLogo className={`w-30`} />
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
