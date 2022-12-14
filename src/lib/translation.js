export const typeTranslation = (type) => {
  const types = {
    Schulen: 'Schule',
    Fl├╝chtlingsunterbringung: 'Gefl├╝chtetenunterbringung',
    Gerichte: 'Gericht',
    JVA: 'Justizvollzugsanstalt',
    'externe Mieter': 'Externe Mieter',
  }
  const translatedType = types[type]
  return translatedType || type
}
