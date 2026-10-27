import { fetchTeachers } from "./api.js";
import { validateUser } from "../lab02/task2.js";
import { initFilters } from "../lab03/filters.js";
import { initSearch } from "../lab03/search.js";
import { initTeacherPopup } from "../lab03/teacher-popup.js";
import { createTeacherCardHTML } from "../lab03/render.js";
import { initStatistics } from "./statistics.js";
import { initTeacherForm } from "./teacher-form.js";

const FIRST_PAGE_SIZE = 50;
const TEACHERS_PER_PAGE = 10;

const teachers = [];
let nextPage = FIRST_PAGE_SIZE / TEACHERS_PER_PAGE + 1;

const teachersContainer = document.querySelector("#teachers .teacher-cards");
const favoritesContainer = document.querySelector(
  "#favorites .favorites-cards",
);

const countryFilter = document.querySelector("#country");
const nextButton = document.querySelector("#next-btn");
const updateStatistics = initStatistics();

function renderTeachers(visibleTeachers) {
  teachersContainer.innerHTML = visibleTeachers.length
    ? visibleTeachers.map(createTeacherCardHTML).join("")
    : "<p>No teachers found.</p>";

  const favorites = teachers.filter((teacher) => teacher.favorite);

  favoritesContainer.innerHTML = favorites.length
    ? favorites.map(createTeacherCardHTML).join("")
    : "<p>No favorite teachers yet.</p>";

  updateStatistics(visibleTeachers);
}

const applySearch = initSearch(teachers, renderTeachers);
const applyFilters = initFilters(teachers, applySearch);

initTeacherPopup(teachers, applyFilters);

function isValid(teacher) {
  try {
    validateUser(teacher);
    return true;
  } catch {
    return false;
  }
}

function addCountryOption(country) {
  const hasCountry = Array.from(countryFilter.options).some(
    (option) => option.value === country,
  );

  if (!hasCountry) {
    countryFilter.add(new Option(country, country));
  }
}

function addTeachers(newTeachers) {
  teachers.push(...newTeachers);
  newTeachers.forEach((teacher) => addCountryOption(teacher.country));
  applyFilters();
}

async function loadTeachers(page, results) {
  const newTeachers = await fetchTeachers(page, results);
  addTeachers(newTeachers.filter(isValid));
}

nextButton.addEventListener("click", async () => {
  nextButton.disabled = true;

  try {
    await loadTeachers(nextPage, TEACHERS_PER_PAGE);
    nextPage++;
  } catch (error) {
    alert(`Could not load more teachers: ${error.message}`);
  } finally {
    nextButton.disabled = false;
  }
});

initTeacherForm((teacher) => {
  addTeachers([teacher]);
});

try {
  await loadTeachers(1, FIRST_PAGE_SIZE);
} catch (error) {
  teachersContainer.innerHTML = `<p>Could not load teachers: ${error.message}</p>`;
}
