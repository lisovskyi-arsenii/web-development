export function initSearch(teachers, onChange) {
  const form = document.querySelector('form[role="search"]');
  const input = form.querySelector('input[type="search"]');
  let filteredTeachers = teachers;

  function applySearch(visibleTeachers = filteredTeachers) {
    filteredTeachers = visibleTeachers;
    const query = input.value.trim().toLowerCase();

    const results = query
      ? filteredTeachers.filter(
          (teacher) =>
            teacher.full_name.toLowerCase().includes(query) ||
            (teacher.note ?? "").toLowerCase().includes(query) ||
            teacher.age === Number(query),
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
