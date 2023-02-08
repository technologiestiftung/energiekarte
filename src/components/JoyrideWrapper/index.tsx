import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { FC, useState } from 'react'

//  1. Toggle: Wärme, Auswahl von Rotes Rathaus und Zoom auf Gebäude (Jüdenstr. 1), Sprechblase auf Punkt, restlicher Bildschirm ausgegraut
// 2. Seitenmenü mit Informationen zum Gebäude wird eingeblendet, Dropdown Wärmeverbrauch und Sanierungen sind nicht ausgewählt, restlicher Bildschirm ausgegraut
// 3. Auswahl Dropdown ‘Wärmeverbrauch’, Rest ausgegraut
// 4. Auswahl Dropdown ‘Wärmeverbrauch’, nur ‘Ranking’ hervorgehoben:
// 5. Klick auf Button ‘Pfeil unten’/nächstniedriger Verbrauch, Zoom auf Gothaer Str. 19:
// 6. Wärmeverbrauch eingeklappt, Klick/Auswahl auf Dropdown Sanierungen, Rest ausgegraut
// 7. Highlight “Strom/Wärme” Toggle:
// 8. Rausgezoomt, Ansicht ganz Berlin, Klick auf Filter:

const steps = [
  {
    target: '#marker-26',
    title: 'Energie Checkpoint',
    content:
      'Der Energie CheckPoint visualisiert prototypisch den Strom- und Wärmeverbrauch unterschiedlicher öffentlicher Gebäude in Berlin – beispielsweise das Rote Rathaus, Sitz der Regierenden Bürgermeisterin Berlins.',
    disableBeacon: true,
    spotlightPadding: 75,
    offset: 0,
  },
  {
    target: '.entity-wrapper',
    title: 'Seitenleiste',
    content:
      'Die Seitenleiste zeigt einen Steckbrief zum Strom- und Wärmeverbrauch (im Jahr 2020). Außerdem gibt es Angaben zu Sanierungsplänen und Einsparpotenzialen des jeweiligen Gebäudes.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.energy-usage-dropdown',
    title: 'Einheiten-Vergleich',
    content:
      'Hier finden sich Informationen über die Art der Wärmeversorgung und die Höhe des Verbrauches in Kilowattstunden pro Jahr. Für ein besseres Verständnis wird der Wert in den vergleichbaren Verbrauch eines durchschnittlichen Fünfpersonenhaushaltes umgerechnet.',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '.ranking-btns',
    title: 'Ranking',
    content:
      'Die ‘Ranking’ Funktion erlaubt es, zum Gebäude mit dem nächsthohen bzw. nächstniedrigen Verbrauch zu springen.',
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '.location',
    title: 'Gebäudetyp-Anzeige',
    content:
      'Hier wird der Gebäudetyp bzw. die Art der Liegenschaft und die dazugehörige Adresse angezeigt. In unserem Beispiel vom Roten Rathaus ist das Gebäude mit dem nächstniedrigen Wärmeverbrauch ein Polizeigebäude. Die Daten umfassen sowohl das Revier, als auch die Dienstgebäude des Landeskriminalamtes.',
    disableBeacon: true,
    spotlightPadding: 20,
  },
  // step 6
  {
    target: '.renovation-dropdown',
    title: 'Sanierungen',
    content:
      'Der Sanierungsfahrplan des Landes berechnet für jedes Gebäude Kerndaten zur Sanierung, wie Kosten oder Einsparpotenzial.',
    placement: 'right',
    disableBeacon: true,
  },
  // step 7
  {
    target: '.consumption-switch',
    title: 'Wärme- und Stromverbrauch',
    content:
      'Sämtliche Gebäudeinformationen lassen sich sowohl für Wärme- als auch Stromverbrauch anzeigen. Die Ansicht kann hier umgeschaltet werden. ',
    // isFixed: true
    disableBeacon: true,
  },
  {
    target: '.filter',
    title: 'Filter',
    content:
      'Über die Filterfunktion lassen sich Gebäude nach bestimmten Merkmalen eingrenzen und anzeigen, wie zum Beispiel Schulen, Feuerwehren oder Gebäude mit besonders hohem, bzw. niedrigen Verbrauch.',
    placement: 'bottom',
    disableBeacon: true,
  },
]

// renovation-dropdown

export interface JoyrideWrapper {
  runJoyride: boolean
  setRunJoyride: (x: boolean) => void
  setZoomToCenter: (x: number[]) => void
  setEntityId: (id: number | null) => void
  setShowEntityConsumption: (x: boolean) => void
  setShowEntityRenovations: (x: boolean) => void
  setConsumptionType: (typeName: string) => void
  setNavView: (view: 'filter' | 'info') => void
  setSidebarMenuOpen: (open: boolean) => void
  setMapZoom: (zoom: number) => void
}

export const JoyrideWrapper: FC<JoyrideWrapper> = ({
  runJoyride,
  setRunJoyride,
  setZoomToCenter,
  setEntityId,
  setShowEntityConsumption,
  setShowEntityRenovations,
  setConsumptionType,
  setNavView,
  setSidebarMenuOpen,
  setMapZoom,
}) => {
  const [joyrideIndex, setJoyrideIndex] = useState<number>(0)

  const handleJoyrideCallback = (jRData: any) => {
    const { action, index, status, type } = jRData

    if (type === 'tour:end') {
      setRunJoyride(false)
      setJoyrideIndex(0)
      setSidebarMenuOpen(false)
      setEntityId(null)
      return
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (action === 'close') {
        setEntityId(null)
        setRunJoyride(false)
        setJoyrideIndex(0)
        return
      }

      let tempIndex = 0
      if (action === 'next') {
        tempIndex = index + 1
        setJoyrideIndex(tempIndex)
      }
      if (action === 'prev') {
        tempIndex = index - 1
        setJoyrideIndex(tempIndex)
      }

      if (tempIndex === 0) {
        // setEntityId(26)
      }
      if (tempIndex === 1) {
        setShowEntityConsumption(false)
        setShowEntityRenovations(false)
        // setEntityId(26)
      }
      if (tempIndex === 2) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
      }
      if (tempIndex === 3) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
      }
      if (tempIndex === 4) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
        setEntityId(278)
      }
      if (tempIndex === 5) {
        setShowEntityConsumption(false)
        setShowEntityRenovations(true)
      }
      if (tempIndex === 6) {
        // setTimeout(() => {
        //   setConsumptionType('electricity')
        //   setTimeout(() => {
        //     setConsumptionType('heat')
        //   }, 1000)
        // }, 1000)

        setSidebarMenuOpen(false)
        setEntityId(278)
      }
      if (tempIndex === 7) {
        setNavView('filter')
        setSidebarMenuOpen(true)
        setEntityId(null)
        setZoomToCenter([13.404954, 52.520008])
        setMapZoom(11)
        return
      }
    }
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      run={runJoyride}
      // @ts-ignore
      steps={steps}
      showProgress
      disableScrolling={false}
      disableScrollParentFix
      showSkipButton
      continuous
      stepIndex={joyrideIndex}
      scrollToSteps={true}
      locale={{
        back: 'Zurück',
        close: 'Verlassen',
        last: 'Ende',
        next: 'Weiter',
        skip: 'Tour verlassen',
      }}
      styles={{
        options: { primaryColor: '#9bc95b' },
        tooltip: {
          borderRadius: '.2rem',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          margin: 0,
        },
        tooltipContent: {
          padding: '1rem 0',
        },
        buttonNext: {
          borderRadius: '.2rem',
          color: '#fff',
        },
        buttonBack: {
          marginRight: '.2rem',
        },
      }}
    />
  )
}
