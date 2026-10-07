const FINDABLE_FIELDS = ["full_name", "note", "age"];

export function findUser(users, field, value) {
  if (!FINDABLE_FIELDS.includes(field)) {
    throw new Error(
      `Cannot search by "${field}". Allowed fields: ${FINDABLE_FIELDS.join(", ")}`,
    );
  }

  return users.find((user) => user[field] === value);
}
