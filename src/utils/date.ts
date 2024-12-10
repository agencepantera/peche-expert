export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/Paris'
  };
  return new Intl.DateTimeFormat('fr-FR', options).format(date);
}
