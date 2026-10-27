import { filter, isEmpty, round } from "lodash-es";

export function getPercentage(users, predicate) {
  if (isEmpty(users)) return 0;

  return round((filter(users, predicate).length / users.length) * 100, 2);
}
