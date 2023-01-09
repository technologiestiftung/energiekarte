export const typeTranslation = (type) => {
  const types = {
    Schulen: 'Schule',
    Flüchtlingsunterbringung: 'Geflüchtetenunterbringung',
    Gerichte: 'Gericht',
    JVA: 'Justizvollzugsanstalt',
    'externe Mieter': 'Externe Mieter',
  }
  const translatedType = types[type]
  return translatedType || type
}
