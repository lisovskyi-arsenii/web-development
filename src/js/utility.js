const courses = [
  "Mathematics",
  "Physics",
  "English",
  "Computer Science",
  "Dancing",
  "Chess",
  "Biology",
  "Chemistry",
  "Law",
  "Art",
  "Medicine",
  "Statistics",
];

export function capitalize(str) {
  if (typeof str !== "string" || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomColor() {
  const r = getRandomInt(256).toString(16).padStart(2, "0");
  const g = getRandomInt(256).toString(16).padStart(2, "0");
  const b = getRandomInt(256).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function getRandomCourse() {
  return courses[getRandomInt(courses.length)];
}

export function findCourse(course) {
  if (typeof course !== "string") return undefined;
  return courses.find((c) => c.toLowerCase() === course.trim().toLowerCase());
}
