import { find, includes } from "lodash-es";

const FINDABLE_FIELDS = ["full_name", "note", "age"];

export function findUser(users, field, value) {
  if (!includes(FINDABLE_FIELDS, field)) {
    throw new Error(
      `Cannot search by "${field}". Allowed fields: ${FINDABLE_FIELDS.join(", ")}`,
    );
  }

  return find(users, [field, value]);
}
