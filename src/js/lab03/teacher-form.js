export function initTeacherForm(onAdd) {
  const form = document.querySelector(".add-teacher-form");
  const popup = document.querySelector("#add-teacher-popup");
  const nameInput = form.elements.namedItem("name");
  const cityInput = form.elements.namedItem("city");
  const phoneInput = form.elements.namedItem("phone");
  const birthInput = form.elements.namedItem("birth");
  let opener;

  function updateBirthLimit() {
    const today = new Date();
    birthInput.max = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
    return today;
  }

  function closePopup() {
    popup.classList.remove("is-open");
    opener?.focus({ preventScroll: true });
  }

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest(".add-teacher-btn");
    if (addButton) {
      event.preventDefault();
      opener = addButton;
      updateBirthLimit();
      popup.classList.add("is-open");
      popup.scrollTop = 0;
      nameInput.focus({ preventScroll: true });
      return;
    }

    const closeButton = event.target.closest(
      "#add-teacher-popup .popup-close, #add-teacher-popup .popup-backdrop",
    );
    if (closeButton) {
      event.preventDefault();
      closePopup();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.classList.contains("is-open")) {
      closePopup();
    }
  });

  form.addEventListener("input", (event) => {
    event.target.setCustomValidity("");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const today = updateBirthLimit();
    const data = Object.fromEntries(new FormData(form));
    const fullName = data.name.trim();
    const city = data.city.trim();
    const phone = data.phone.trim();

    nameInput.value = fullName;
    cityInput.value = city;
    phoneInput.value = phone;

    const digitCount = (phone.match(/\d/g) ?? []).length;
    const validPhone =
      /^\+?[\d\s()-]+$/.test(phone) && digitCount >= 6 && digitCount <= 15;
    phoneInput.setCustomValidity(validPhone ? "" : "Enter a valid phone number.");

    if (!form.reportValidity()) return;

    const birthDate = new Date(`${data.birth}T00:00:00`);
    let age = today.getFullYear() - birthDate.getFullYear();
    const birthdayPending =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());
    if (birthdayPending) age--;

    const newTeacher = {
      id: crypto.randomUUID(),
      full_name: fullName,
      course: data.speciality,
      country: data.country,
      city,
      email: data.email.trim(),
      phone,
      b_date: data.birth,
      age,
      gender: data.sex,
      bg_color: data.color,
      note: data.notes.trim(),
      favorite: false,
      picture_large: "",
      picture_thumbnail: "",
    };

    onAdd(newTeacher);
    form.reset();
    closePopup();
  });

  updateBirthLimit();
}
