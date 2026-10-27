import {
  capitalize,
  getRandomColor,
  getRandomCourse,
  findCourse,
} from "./utility.js";

export function createNewObject(users) {
  return users.map((user) => {
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
  return additionalUsers.map((user) => {
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

    const favorite = user.favorite ?? false;
    const course = findCourse(user.course) ?? getRandomCourse();
    const bg_color = user.bg_color ?? getRandomColor();
    const note = user.note ?? "";

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
  const map = new Map();

  for (const user of users) {
    map.set(user.full_name, user);
  }

  for (const user of additionalUsers) {
    const existingUser = map.get(user.full_name);
    if (existingUser) {
      const merged = { ...existingUser };

      for (const [key, value] of Object.entries(user)) {
        if (value !== null && value !== undefined) {
          merged[key] = value;
        }
      }

      map.set(user.full_name, merged);
    } else {
      map.set(user.full_name, user);
    }
  }

  return Array.from(map.values());
}

export function getFormattedUsers(randomUsers, extraUsers) {
  return mergeUsers(
    createNewObject(randomUsers),
    mapToCorrectFormat(extraUsers),
  );
}
