import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride'
import { FC, useState } from 'react'

// 1. Toggle: Wärme, Auswahl von Rotes Rathaus und Zoom auf Gebäude (Jüdenstr. 1), Sprechblase auf Punkt, restlicher Bildschirm ausgegraut
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
    title: 'Öffentliche Einrichtungen',
    content:
      'Wo wird wie viel verbraucht? Die Karte zeigt den Standort und eine grobe Einordnung des Energieverbrauchs unterschiedlicher öffentlicher Einrichtungen bzw. Liegenschaften in Berlin – beispielsweise das Rote Rathaus, Sitz der Regierenden Bürgermeisterin oder des Regierenden Bürgermeisters Berlins.',
    disableBeacon: true,
    spotlightPadding: 75,
    offset: 0,
  },
  {
    target: '.energy-data',
    title: 'Verbrauchsdaten',
    content:
      'Durch Klick auf einen Standort öffnen sich die Detailinformationen zum Verbrauch (Stand 2020). Der Verbrauch im Roten Rathaus ist vergleichsweise hoch. ABER: Die Daten müssen natürlich auch in Relation zur Größe und Nutzungsart der Einrichtung gesehen werden. Zu einer Einrichtung gehören oft auch mehrere Gebäude. Ein hoher Verbrauch weist nicht direkt auf ein Defizit hin!',
    placement: 'right',
    disableBeacon: true,
  },

  {
    target: '.ranking-btns',
    title: 'Ranking',
    content:
      'Die Ranking-Funktion erlaubt es, die Karte weiter zu explorieren und die Einrichtungen nacheinander durchzugehen. Es kann zur Liegenschaft mit dem nächsthohen bzw. nächstniedrigen Verbrauch gesprungen werden.',
    placement: 'top',
    disableBeacon: true,
  },
  {
    target: '.location',
    title: 'Gebäudetyp',
    content:
      'Hier wird der Gebäudetyp bzw. die Art der Liegenschaft und die dazugehörige Adresse angezeigt. Die Liegenschaft mit dem nächstniedrigen Wärmeverbrauch ist eine Einrichtung der Polizei. Die Daten umfassen sowohl das Revier, als auch die Dienstgebäude des Landeskriminalamtes.',
    disableBeacon: true,
    spotlightPadding: 20,
  },
  {
    target: '.consumption-switch',
    title: 'Wärme- und Stromverbrauch',
    content:
      'Die Verbrauchsinformationen lassen sich sowohl für Wärme- als auch Stromverbrauch anzeigen. Die Ansicht kann hier umgeschaltet werden. ',
    // isFixed: true
    disableBeacon: true,
  },
  {
    target: '.compare-section',
    title: 'Vergleich zur besseren Einordnung',
    content:
      'Für ein besseres Verständnis wird der Stromverbrauch mit dem Verbrauch eines durchschnittlichen Fünfpersonenhaushalts verglichen. Diese Polizeieinrichtung verbraucht geschätzt so viel wie 92 Haushalte.',
    placement: 'right',
    disableBeacon: true,
  },

  // step 6
  {
    target: '.renovation-dropdown',
    title: 'Informationen zur Sanierung',
    content:
      'Der Sanierungsfahrplan des Landes enthält Kerndaten zur Sanierung, wie Kosten oder Einsparpotenzial. Im Gegensatz zum Verbrauch liegen diese Informationen detailliert für die einzelnen Gebäude oder Gebäudeteile vor.',
    placement: 'right',
    disableBeacon: true,
  },
  // step 7
  {
    target: '.pitch-btn',
    title: '2D-Ansicht und Liegenschaft',
    content:
      'Hier läßt sich die Ansicht ändern, um einen besseren Blick auf die Grundfläche der Liegenschaft zu bekommen. ABER: Diese Fläche ist in einigen Fällen nur ungefähre Angabe. Teilweise stehen Gebäude auch außerhalb dieser Liegenschaft.',
    // isFixed: true
    disableBeacon: true,
  },
  // step 8

  {
    target: '.filter',
    title: 'Filter',
    content:
      'Über die Filterfunktion lassen sich die öffentlichen Einrichtungen nach bestimmten Merkmalen eingrenzen und anzeigen, wie zum Beispiel nach dem Gebäudetyp "Schulen", nach Gebäuden die über Gas beheizt werden oder nach Gebäude mit besonders hohem Einsparpotential.',
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
  setMapPitch: (pitch: boolean) => void
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
  setMapPitch,
}) => {
  const [joyrideIndex, setJoyrideIndex] = useState<number>(0)

  const handleJoyrideCallback = (jRData: any) => {
    const { action, index, status, type } = jRData

    if (type === 'tour:end') {
      setRunJoyride(false)
      setJoyrideIndex(0)
      setSidebarMenuOpen(false)
      setEntityId(null)
      setMapPitch(true)

      return
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (action === 'close') {
        setEntityId(null)
        setRunJoyride(false)
        setJoyrideIndex(0)
        setMapPitch(true)

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

      console.log('ddd', tempIndex)
      //                     setConsumptionType('electricity')

      if (tempIndex === 0) {
      }
      if (tempIndex === 1) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
      }
      if (tempIndex === 2) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
      }
      if (tempIndex === 3) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
        setEntityId(278)
      }
      if (tempIndex === 4) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
      }
      if (tempIndex === 5) {
        setShowEntityConsumption(true)
        setShowEntityRenovations(false)
        setConsumptionType('electricity')
        setMapPitch(true)
      }
      if (tempIndex === 6) {
        setShowEntityConsumption(false)
        setShowEntityRenovations(true)
        setMapPitch(true)
      }
      if (tempIndex === 7) {
        setMapPitch(false)
        setSidebarMenuOpen(false)
        setEntityId(278)
      }

      if (tempIndex === 8) {
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
