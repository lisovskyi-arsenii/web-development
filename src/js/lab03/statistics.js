import { createStatisticsBody } from "./render.js";
import { sortUsers } from "../lab02/task4.js";

export function initStatistics(teachers) {
  const statisticsBodyContainer = document.querySelector("#statistics-body");
  const pagination = document.querySelector("#statistics .pagination ul");

  const PAGE_SIZE = 10;
  let currentPage = 1;
  let statisticsTeachers = teachers;

  let sortField;
  let sortOrder = "asc";

  function renderStatistics() {
    const pageCount = Math.ceil(statisticsTeachers.length / PAGE_SIZE);
    currentPage = Math.max(1, Math.min(currentPage, pageCount));

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageTeachers = statisticsTeachers.slice(start, start + PAGE_SIZE);

    statisticsBodyContainer.innerHTML = pageTeachers.length
      ? pageTeachers.map(createStatisticsBody).join("")
      : '<tr><td colspan="6">No teachers found.</td></tr>';

    pagination.innerHTML = Array.from({ length: pageCount }, (_, index) => {
      const page = index + 1;

      if (page === currentPage) {
        return `<li><span aria-current="page" tabindex="-1">${page}</span></li>`;
      }

      return `
        <li>
          <a href="#statistics" data-page="${page}">${page}</a>
        </li>
      `;
    }).join("");
  }

  pagination.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-page]");
    if (!link) return;

    event.preventDefault();
    currentPage = Number(link.dataset.page);
    renderStatistics();
    pagination.querySelector('[aria-current="page"]').focus();
  });

  const statisticsHead = document.querySelector("#statistics-head");

  statisticsHead.addEventListener("click", (event) => {
    const header = event.target.closest("th[data-sort]");
    if (!header) return;

    const field = header.dataset.sort;
    if (field === sortField) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortOrder = "asc";
    }
    sortField = field;
    statisticsTeachers = sortUsers(teachers, sortField, sortOrder);
    currentPage = 1;

    renderStatistics();
  });

  renderStatistics();

  return function refreshStatistics() {
    statisticsTeachers = sortField
      ? sortUsers(teachers, sortField, sortOrder)
      : teachers;

    renderStatistics();
  };
}
