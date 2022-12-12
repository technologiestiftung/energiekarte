export const typeTranslation = (type) => {
  const types = {
    Schulen: 'Schule',
    Flüchtlingsunterbringung: 'Geflüchtetenunterbringung',
    Gerichte: 'Gericht',
    JVA: 'Gefängnis (JVA)',
  }
  const translatedType = types[type]
  return translatedType || type
}
