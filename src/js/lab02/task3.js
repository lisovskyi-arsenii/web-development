import { filter, isMatch, isUndefined, omitBy } from "lodash-es";

export function filterUsers(
  users,
  { country, ageRange, gender, favorite } = {},
) {
  const fields = omitBy({ country, gender, favorite }, isUndefined);

  return filter(
    users,
    (user) =>
      isMatch(user, fields) &&
      (ageRange === undefined ||
        (user.age >= ageRange[0] && user.age <= ageRange[1])),
  );
}
