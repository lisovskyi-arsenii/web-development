import { assign, defaultTo, isNil, keyBy, map, omitBy, values } from "lodash-es";
import {
  capitalize,
  getRandomColor,
  getRandomCourse,
  findCourse,
} from "./utility.js";

export function createNewObject(users) {
  return map(users, (user) => {
    const { title, first, last } = user.name;
    const { city, state, country, postcode, coordinates, timezone } =
      user.location;
    const { date, age } = user.dob;
    const { large, thumbnail } = user.picture;

    return {
      gender: capitalize(user.gender),
      title: title,
      full_name: `${first} ${last}`,
      city: city,
      state: state,
      country: country,
      postcode: postcode,
      coordinates: coordinates,
      timezone: timezone,
      email: user.email,
      b_date: date,
      age: age,
      phone: user.phone,
      picture_large: large,
      picture_thumbnail: thumbnail,
      id: user.login.uuid,
      favorite: false,
      course: getRandomCourse(),
      bg_color: getRandomColor(),
      note: "",
    };
  });
}

export function mapToCorrectFormat(additionalUsers) {
  return map(additionalUsers, (user) => {
    const {
      gender,
      title,
      full_name,
      city,
      state,
      country,
      postcode,
      coordinates,
      timezone,
      email,
      phone,
      picture_large,
      picture_thumbnail,
      id,
    } = user;

    const favorite = defaultTo(user.favorite, false);
    const course = defaultTo(findCourse(user.course), getRandomCourse());
    const bg_color = defaultTo(user.bg_color, getRandomColor());
    const note = defaultTo(user.note, "");

    return {
      gender: capitalize(gender),
      title,
      full_name,
      city,
      state,
      country,
      postcode,
      coordinates,
      timezone,
      email,
      b_date: user.b_day,
      age: undefined,
      phone,
      picture_large,
      picture_thumbnail,
      id,
      favorite,
      course,
      bg_color,
      note,
    };
  });
}

export function mergeUsers(users, additionalUsers) {
  const usersByName = keyBy(users, "full_name");

  additionalUsers.forEach((user) => {
    const existingUser = usersByName[user.full_name];

    usersByName[user.full_name] = existingUser
      ? assign({}, existingUser, omitBy(user, isNil))
      : user;
  });

  return values(usersByName);
}

export function getFormattedUsers(randomUsers, extraUsers) {
  return mergeUsers(
    createNewObject(randomUsers),
    mapToCorrectFormat(extraUsers),
  );
}
