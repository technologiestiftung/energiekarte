import { FC } from 'react'
import classNames from 'classnames'
import { SidebarHeader } from '@components/Sidebar/SidebarHeader'
import { SidebarBody } from '@components/Sidebar/SidebarBody'

import { CitylabLogo } from '@components/Logos/CitylabLogo'
import { OdisLogo } from '@components/Logos/OdisLogo'
import { SenWebLogo } from '@components/Logos/SenWebLogo'
import { TsbLogo } from '@components/Logos/TsbLogo'
import { Accordion } from '@components/Accordion'
import { SenInLogo } from '@components/Logos/SenInLogo'

export interface SidebarContentInfoType { }

export const SidebarContentInfo: FC<SidebarContentInfoType> = ({ }) => {
  return (
    <>
      <SidebarHeader text="Über die Karte" />

      <SidebarBody>
        <p className="text-sm pt-2 pb-2">
          WIP
        </p>

        <Accordion title="Woher kommen die Daten?">
          <p className="text-sm pb-2">
            WIP
          </p>
        </Accordion>

        <Accordion title="Was ist Open Data?">
          <p className="text-sm pb-2">
            WIP
          </p>
        </Accordion>

        <Accordion title="Was ist mit anderen Städten?">
          <p className="text-sm pb-2">
            WIP
          </p>
        </Accordion>

        <Accordion title="Über uns">
          <p className="text-sm pb-2">
            Der “Berliner EnergieCheckpoint” ist ein Projekt der Open Data Informationsstelle in Zusammenarbeit mit dem CityLAB Berlin.
            Die ODIS wird von der Berliner Senatsverwaltung für Inneres, Digitalisierung und Sport und der Investitionsbank Berlin
            aus den Mitteln des Landes Berlin gefördert und ist ein Projekt der Technologiestiftung Berlin.
            Seit 2018 begleiten wir als ODIS die Stadt auf dem Weg zu einer partizipativen, nachhaltigen und datengetriebenen Gesellschaft
            mit dem Schwerpunkt auf die Bereitstellung und Nutzung offener Daten.
            Du hast Feedback oder willst mehr erfahren? Schau dich auf unserer Webseite um oder kontaktiere uns unter odis@ts.berlin.
          </p>
        </Accordion>



        <section className="mt-6 flex flex-wrap">
          <div className="flex flex-col mr-6 mb-6">
            <span className="text-sm mb-3">Ein Projekt der</span>
            <TsbLogo className={`w-30`} />
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-sm mb-2">Durchgeführt von der</span>
            <a
              href="https://odis-berlin.de/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Data Informationsstelle Berlin"
            // className={}
            >
              <OdisLogo className={`w-40`} />
            </a>
          </div>
          <div className="flex flex-col">
            <span className="text-sm mb-2">Gefördert von</span>
            <SenInLogo className="w-40" />
          </div>
        </section>
      </SidebarBody>
      <footer className={classNames('mt-8 p-4', 'flex flex-wrap')}>
        <span className="text-xs w-full mb-4">
          © 2023 Technologiestiftung Berlin
        </span>
        <a
          href="https://www.technologiestiftung-berlin.de/de/impressum/"
          className={`text-xs hover:underline mr-4`}
          target="_blank"
          rel="noreferrer"
        >
          Impressum
        </a>
        <a
          href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
          className={`text-xs hover:underline`}
          target="_blank"
          rel="noreferrer"
        >
          Datenschutzerklärung
        </a>
      </footer>
    </>
  )
}
