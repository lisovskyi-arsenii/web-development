import { filterUsers } from "../lab02/task3.js";

export function initFilters(teachers, onChange) {
  const filterSection = document.querySelector(".filter-section");

  function applyFilters() {
    const country = filterSection.querySelector("#country").value;
    const ageValue = filterSection.querySelector("#age").value;
    const gender = filterSection.querySelector("#sex").value;
    const onlyFavorites = filterSection.querySelector("#only-favorites").checked;
    const onlyPhoto = filterSection.querySelector("#only-photo").checked;

    const ageRange = ageValue ? ageValue.split("-").map(Number) : undefined;

    let filteredTeachers = filterUsers(teachers, {
      country: country || undefined,
      ageRange,
      gender: gender || undefined,
      favorite: onlyFavorites ? true : undefined,
    });

    if (onlyPhoto) {
      filteredTeachers = filteredTeachers.filter(
        (teacher) => teacher.picture_large,
      );
    }

    onChange(filteredTeachers);
  }

  filterSection.addEventListener("change", applyFilters);
  return applyFilters;
}
