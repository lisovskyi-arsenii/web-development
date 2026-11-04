import { find, isString, padStart, random, sample, toLower, trim, upperFirst } from "lodash-es";

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
  return isString(str) ? upperFirst(str) : str;
}

export function getRandomInt(max) {
  return random(max - 1);
}

export function getRandomColor() {
  const channel = () => padStart(getRandomInt(256).toString(16), 2, "0");

  return `#${channel()}${channel()}${channel()}`;
}

export function getRandomCourse() {
  return sample(courses);
}

export function findCourse(course) {
  if (!isString(course)) return undefined;
  return find(courses, (c) => toLower(c) === toLower(trim(course)));
}
