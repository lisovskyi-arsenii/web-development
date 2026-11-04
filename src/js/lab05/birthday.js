import dayjs from "dayjs";

export function getDaysToBirthday(birthDate) {
  const today = dayjs().startOf("day");
  let nextBirthday = dayjs(birthDate).year(today.year()).startOf("day");

  if (nextBirthday.isBefore(today)) {
    nextBirthday = nextBirthday.add(1, "year");
  }

  return nextBirthday.diff(today, "day");
}

export function getBirthdayText(birthDate) {
  const days = getDaysToBirthday(birthDate);

  if (days === 0) return "Birthday is today!";
  return `Next birthday in ${days} ${days === 1 ? "day" : "days"}`;
}
