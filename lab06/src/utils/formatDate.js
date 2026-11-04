// API dates ("2026-11-04") are parsed as UTC midnight, so format them in UTC
// to avoid showing the previous day in negative-offset time zones.
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
