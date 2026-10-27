import { additionalUsers, randomUserMock } from "../lab02/FE4U-Lab2-mock.js";
import { getFormattedUsers } from "../lab02/task1.js";
import { initFilters } from "./filters.js";
import { initSearch } from "./search.js";
import { initStatistics } from "./statistics.js";
import { initTeacherPopup } from "./teacher-popup.js";
import { createTeacherCardHTML } from "./render.js";
import { initTeacherForm } from "./teacher-form.js";

const teachers = getFormattedUsers(randomUserMock, additionalUsers);

const teachersContainer = document.querySelector("#teachers .teacher-cards");

const favoritesContainer = document.querySelector(
  "#favorites .favorites-cards",
);

function renderTeachers(visibleTeachers = teachers) {
  teachersContainer.innerHTML = visibleTeachers.length
    ? visibleTeachers.map(createTeacherCardHTML).join("")
    : "<p>No teachers found.</p>";

  const favorites = teachers.filter((teacher) => teacher.favorite);

  favoritesContainer.innerHTML = favorites.length
    ? favorites.map(createTeacherCardHTML).join("")
    : "<p>No favorite teachers yet.</p>";
}

const applySearch = initSearch(teachers, renderTeachers);
const applyFilters = initFilters(teachers, applySearch);
initTeacherPopup(teachers, applyFilters);

applyFilters();
const refreshStatistics = initStatistics(teachers);

initTeacherForm((teacher) => {
  teachers.push(teacher);

  const countryFilter = document.querySelector("#country");
  const hasCountry = Array.from(countryFilter.options).some(
    (option) => option.value === teacher.country,
  );
  if (!hasCountry) {
    countryFilter.add(new Option(teacher.country, teacher.country));
  }

  applyFilters();
  refreshStatistics();
});
