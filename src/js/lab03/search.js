import { filter, includes, toLower, toNumber, trim } from "lodash-es";

export function initSearch(teachers, onChange) {
  const form = document.querySelector('form[role="search"]');
  const input = form.querySelector('input[type="search"]');
  let filteredTeachers = teachers;

  function applySearch(visibleTeachers = filteredTeachers) {
    filteredTeachers = visibleTeachers;
    const query = toLower(trim(input.value));

    const results = query
      ? filter(
          filteredTeachers,
          (teacher) =>
            includes(toLower(teacher.full_name), query) ||
            includes(toLower(teacher.note), query) ||
            teacher.age === toNumber(query),
        )
      : filteredTeachers;

    onChange(results);
  }

  input.addEventListener("input", () => applySearch());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    applySearch();
  });

  return applySearch;
}
