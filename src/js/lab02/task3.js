export function filterUsers(
  users,
  { country, ageRange, gender, favorite } = {},
) {
  return users.filter(
    (user) =>
      (country === undefined || user.country === country) &&
      (ageRange === undefined ||
        (user.age >= ageRange[0] && user.age <= ageRange[1])) &&
      (gender === undefined || user.gender === gender) &&
      (favorite === undefined || user.favorite === favorite),
  );
}
