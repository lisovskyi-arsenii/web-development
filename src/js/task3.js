export function filterUsers(users, { country, age, gender, favorite } = {}) {
  return users.filter(
    (user) =>
      (country === undefined || user.country === country) &&
      (age === undefined || user.age === age) &&
      (gender === undefined || user.gender === gender) &&
      (favorite === undefined || user.favorite === favorite),
  );
}
