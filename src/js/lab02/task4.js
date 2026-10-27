import { deburr, includes, isNil, isString, orderBy, toLower } from "lodash-es";

const SORTABLE_FIELDS = ["full_name", "age", "b_date", "country", "course", "gender"];

export function sortUsers(users, field, order = "asc") {
  if (!includes(SORTABLE_FIELDS, field)) {
    throw new Error(
      `Cannot sort by ${field}. Allowed fields: ${SORTABLE_FIELDS.join(", ")}`,
    );
  }

  if (order !== "asc" && order !== "desc") {
    throw new Error(`Invalid sort order "${order}". Use "asc" or "desc"`);
  }

  // empty values always go last; text is compared without case and accents
  const isEmptyValue = (user) => isNil(user[field]);
  const sortValue = (user) =>
    isString(user[field]) ? deburr(toLower(user[field])) : user[field];

  return orderBy(users, [isEmptyValue, sortValue], ["asc", order]);
}
