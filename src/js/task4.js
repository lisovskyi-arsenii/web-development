const SORTABLE_FIELDS = ["full_name", "age", "b_date", "country"];

function compareValues(a, b) {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  }

  return a - b;
}

export function sortUsers(users, field, order = "asc") {
  if (!SORTABLE_FIELDS.includes(field)) {
    throw new Error(
      `Cannot sort by ${field}. Allowed fields: ${SORTABLE_FIELDS.join(", ")}`,
    );
  }

  if (order !== "asc" && order !== "desc") {
    throw new Error(`Invalid sort order "${order}". Use "asc" or "desc"`);
  }

  const direction = order === "desc" ? -1 : 1;

  return [...users].sort((userA, userB) => {
    const a = userA[field];
    const b = userB[field];

    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    return compareValues(a, b) * direction;
  });
}
