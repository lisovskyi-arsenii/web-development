import { createTeacherInfoHTML } from "./render.js";

export function initTeacherPopup(teachers, onFavoriteChange, onToggleMap) {
  const teacherPopup = document.querySelector("#teacher-info-popup");
  const teacherInfoContainer = teacherPopup.querySelector(".teacher-info");

  let lastTeacherId;
  let lastTeacherSection;

  function closePopup() {
    teacherPopup.classList.remove("is-open");

    const teacherLink = Array.from(
      lastTeacherSection.querySelectorAll("a[data-teacher-id]"),
    ).find((link) => link.dataset.teacherId === lastTeacherId);
    const focusTarget = teacherLink ?? lastTeacherSection.querySelector("h2");

    if (!teacherLink) focusTarget.tabIndex = -1;
    focusTarget.focus({ preventScroll: true });
  }

  document.addEventListener("click", (event) => {
    const closeControl = event.target.closest(
      "#teacher-info-popup .popup-close, #teacher-info-popup .popup-backdrop",
    );
    if (closeControl) {
      event.preventDefault();
      closePopup();
      return;
    }

    const control = event.target.closest("[data-teacher-id]");
    if (!control) return;

    const teacher = teachers.find(
      (item) => item.id === control.dataset.teacherId,
    );
    if (!teacher) return;

    if (control.dataset.action === "toggle-map") {
      onToggleMap(teacher);
      return;
    }

    if (control.dataset.action === "toggle-favorite") {
      teacher.favorite = !teacher.favorite;
      onFavoriteChange();

      teacherInfoContainer.innerHTML = createTeacherInfoHTML(teacher);
      teacherInfoContainer
        .querySelector('[data-action="toggle-favorite"]')
        .focus({ preventScroll: true });
      return;
    }

    event.preventDefault();
    lastTeacherId = teacher.id;
    lastTeacherSection = control.closest("#teachers, #favorites");
    teacherInfoContainer.innerHTML = createTeacherInfoHTML(teacher);
    teacherPopup.classList.add("is-open");
    teacherPopup.focus({ preventScroll: true });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !teacherPopup.classList.contains("is-open")) {
      return;
    }

    closePopup();
  });
}
