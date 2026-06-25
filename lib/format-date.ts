const formatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

export function formatDate(date: string) {
  return formatter.format(new Date(`${date}T12:00:00.000Z`));
}
