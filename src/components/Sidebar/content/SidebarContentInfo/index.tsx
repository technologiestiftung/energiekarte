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

export interface SidebarContentInfoType {}

export const SidebarContentInfo: FC<SidebarContentInfoType> = ({}) => {
  return (
    <>
      <SidebarHeader text="Über das Projekt" />
      <div className="leading-relaxed">
        <SidebarBody>
          <p className="text-sm pt-2 pb-2">
            Wie hoch ist der jährliche Energieverbrauch des
            Friedrichstadtpalast? Welchen Beitrag zur Energieeinsparung kann die
            energetische Sanierung des Roten Rathauses leisten? Mit welchem
            Energieträger wird die Berliner Philharmonie versorgt?
            <br />
            <br />
            Als Betreiber öffentlicher Gebäude sind die BIM Berliner
            Immobilienmanagement GmbH ebenso wie die Bezirke im Rahmen des
            Berliner Klimaschutz- und Energiewendegesetzes (EWG Bln)
            verpflichtet zu Energieverbrauchsdaten und Einsparmaßnahmen
            regemäßig und vollständig zu berichten. Um das Ziel Klimaneutralität
            bis 2045 zu erreichen, müssen nicht nur die Gebäude der öffentlichen
            Hand Stück für Stück saniert werden, es bedarf auch eines
            umfassenden Monitorings um Entwicklungen aufzuzeigen und
            gegebenenfalls nachjustieren zu können.
          </p>

          <Accordion title="Was ist der EnergieCheckpoint?">
            <p className="text-sm pb-2">
              Der EnergieCheckpoint ist eine prototypische Anwendung, die eine
              Visualisierung der Daten und Erkundung der einzelnen Standorte
              möglich macht. So werden z.B. Energieverbräuche nach Strom und
              Wärme, die Art der Wärmeversorgung sowie Angaben zu
              Einsparpotenzialen einer Gebäudesanierung für alle Standorte auf
              einer Karte angezeigt. Mit verschiedenen Filterfunktionen lassen
              sich die Gebäude nach bestimmten Attributen wie Gebäude- oder
              Wärmetyp durchsuchen und exportieren. Die Anwendung ist offen für
              weitere Daten zum Beispiel aus den Berliner Bezirken, um eine
              landesweite Übersicht zu schaffen.
            </p>
          </Accordion>

          <Accordion title="Woher kommen die Daten?">
            <p className="text-sm pb-2">
              Diese Anwendung basiert komplett auf (eingeschränkt) offenen Daten
              der BIM Berliner Immobilienmanagement GmbH, die jährlich unter{' '}
              <a
                target="blank"
                href="https://www.bim-berlin.de/presse/publikationen/"
                className="text-primary"
              >
                Berichte und Reports{' '}
              </a>{' '}
              die Energieverbrauchsübersicht und den Sanierungsfahrplan als
              PDF-Dateien veröffentlichen. Die Daten liegen (noch) nicht als
              maschinenlesbare Daten auf dem Berliner Datenportal bereit,
              weswegen wir in diesem Fall von eingeschränkt offenen Daten
              sprechen. Die aktuelle Energieverbrauchsübersicht liegt für 2020
              vor, die Daten zum Sanierungsfahrplan haben den Stand 04.05.2022.
              Um die einzelnen Adresspunkte zu Grundstücken zuordnen zu können,
              haben wir offene Daten zu ALKIS verwendet. Die verarbeiteten Daten
              und die Skripte zur Datenprozessierung sind in einem
              GitHub-Repository zu finden. Die Hintergrundkarte basiert auf der
              OpenStreetMap.
            </p>
          </Accordion>

          <Accordion title="Wie sind die Daten zu verstehen? Was muss ich beachten?">
            <p className="text-sm pb-2">
              Der Sanierungsfahrplan, der eine zielorientierte
              Abarbeitungsreihenfolge der erforderlichen Gebäudesanierungen
              aufzeigt, dient den Bezirken und der BIM als strategisches
              Instrument bei der Sanierungsplanung. Die hierin enthaltene
              Grobkostenschätzung stellt lediglich eine überschlägige
              informative Angabe zum Anteil der energetischen
              Sanierungskostenanteile dar und entspricht dem Stand der
              Erstellung des Sanierungsfahrplans. Über eine energetische
              Sanierung hinausgehende Sanierungs- und Modernisierungsbedarfe,
              die im Rahmen einer Gebäudesanierung mit umgesetzt werden, sind
              hier kostenseitig nicht enthalten. Gleiches gilt für
              Planungskosten sowie markt- bzw. inflationsbedingte
              Kostensteigerungen. Die tatsächlichen Sanierungskosten können
              somit abhängig vom Beginn und Umfang der konkreten
              Sanierungsmaßnahmen davon abweichen.<br></br>
              <br></br>
              Für 3 Adressen (Wallstr. 32, WRD Feuerwehr SILB, Dorfstr. 3)
              liegen nur Sanierungsdaten vor. Sie sind nicht in der Anwendung
              dargestellt.
              <br></br>
              <br></br>
              Der Stromverbrauch-Vergleich zu einem Einfamilienhaus mit 5
              Personen bezieht sich auf einen Verbrauch ohne elektrische
              Warmwasserbereitung (Quelle:{' '}
              <a
                target="blank"
                className="text-primary"
                href="https://de.statista.com/statistik/daten/studie/558295/umfrage/stromverbrauch-einen-5-personen-haushalts-in-deutschland/"
              >
                Statista
              </a>
              ).
            </p>
          </Accordion>

          <Accordion title="Was ist Open Data?">
            <p className="text-sm pb-2">
              Offene Daten definieren sich dadurch, dass sie in einem offenen
              und maschinenlesbaren Format vorliegen, unter einer freien Lizenz
              nutzbar sind, der Zugang diskriminierungsfrei und kostenlos ist
              und die Daten an einem zentralen Ort dauerhaft auffindbar sind.
              Open Data ist heute ein wichtiger Bestandteil im
              Verwaltungshandeln Berlins und schafft nicht nur Transparenz und
              Offenheit, sondern ermöglicht auch Analysen und Monitorings wie
              diese, Deshalb unterstützt die{' '}
              <a
                target="blank"
                href="https://odis-berlin.de"
                className="text-primary"
              >
                Open Data Informationsstelle{' '}
              </a>{' '}
              Berliner Behörden bei der Bereit­stellung von Open Data. Mehr
              offene Daten findest Du im{' '}
              <a
                target="blank"
                href="https://daten.berlin.de"
                className="text-primary"
              >
                Berliner Datenportal{' '}
              </a>
              .
            </p>
          </Accordion>

          <Accordion title="Was ist mit anderen Städten?">
            <p className="text-sm pb-2">
              Der “Berliner EnergieCheckpoint” ist ein Open-Source-Projekt und
              läuft unter einer MIT Lizenz. Dementsprechend kann die Idee, aber
              auch der Quellcode für die Umsetzung in anderen Städten kostenlos
              genutzt, angepasst und weiterentwickelt werden. Wenn Du dich dafür
              interessierst, schau gerne in unserem{' '}
              <a
                target="blank"
                href="https://github.com/technologiestiftung/energiekarte"
                className="text-primary"
              >
                GitHub-Repository{' '}
              </a>{' '}
              vorbei.
            </p>
          </Accordion>

          <Accordion title="Über uns">
            <p className="text-sm pb-2">
              Der “Berliner EnergieCheckpoint” ist ein Projekt der{' '}
              <a
                target="blank"
                href="https://odis-berlin.de"
                className="text-primary"
              >
                Open Data Informationsstelle{' '}
              </a>{' '}
              in Zusammenarbeit mit dem{' '}
              <a
                target="blank"
                href="https://citylab-berlin.org/de/start/"
                className="text-primary"
              >
                CityLAB Berlin{' '}
              </a>
              . Die ODIS wird von der Berliner Senatsverwaltung für Inneres,
              Digitalisierung und Sport und der Investitionsbank Berlin aus den
              Mitteln des Landes Berlin gefördert und ist ein Projekt der{' '}
              <a
                target="blank"
                href="https://www.technologiestiftung-berlin.de"
                className="text-primary"
              >
                Technologiestiftung Berlin{' '}
              </a>
              . Seit 2018 begleiten wir als ODIS die Stadt auf dem Weg zu einer
              partizipativen, nachhaltigen und datengetriebenen Gesellschaft mit
              dem Schwerpunkt auf die Bereitstellung und Nutzung offener Daten.
              Du hast Feedback oder willst mehr erfahren? Schau dich auf unserer
              Webseite um oder{' '}
              <a
                target="blank"
                href="https://odis-berlin.de/contact/"
                className="text-primary"
              >
                kontaktiere uns
              </a>
              .
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
            <div className="flex flex-col mb-8">
              <span className="text-sm mb-4">In Zusammenarbeit mit dem</span>
              <a
                href="https://odis-berlin.de/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CityLAB Berlin"
              >
                <CitylabLogo className={`w-40`} />
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-sm mb-2">Gefördert von</span>
              <SenInLogo className="w-32" />
            </div>
          </section>
        </SidebarBody>
      </div>
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
