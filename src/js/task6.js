export function getPercentage(users, predicate) {
  if (users.length === 0) return 0;

  const matching = users.filter(predicate).length;

  return Math.round((matching / users.length) * 10000) / 100;
}
