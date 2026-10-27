export function escapeHTML(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return String(value ?? "—").replace(/[&<>"']/g, (char) => entities[char]);
}

function createAvatarHTML(teacher, isPopup = false) {
  const className = isPopup ? "teacher-info-photo" : "teacher-card-profile";

  if (teacher.picture_large) {
    return `
      <img
        class="${className}"
        src="${escapeHTML(teacher.picture_large)}"
        alt="Profile of ${escapeHTML(teacher.full_name)}"
      />
    `;
  }

  const initials = teacher.full_name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join(".");
  const backgroundColor = /^#[0-9a-f]{6}$/i.test(teacher.bg_color)
    ? teacher.bg_color
    : "#ffffff";

  return `
    <div
      class="${isPopup ? "teacher-info-photo teacher-info-initials" : "teacher-initials"}"
      style="background-color: ${backgroundColor}"
    >
      ${escapeHTML(initials)}
    </div>
  `;
}

export function createTeacherCardHTML(teacher) {
  return `
    <div class="teacher-card${teacher.favorite ? " favorite-card" : ""}">
      <div class="avatar-container">
        ${createAvatarHTML(teacher)}
        ${teacher.favorite ? '<img class="teacher-card-star" src="img/star.svg" alt="Favorite" />' : ""}
      </div>
      <h3 class="teacher-card-name">
        <a href="#teacher-info-popup" data-teacher-id="${escapeHTML(teacher.id)}">
          ${escapeHTML(teacher.full_name)}
        </a>
      </h3>
      <p class="teacher-card-subject">${escapeHTML(teacher.course)}</p>
      <p class="teacher-card-country">${escapeHTML(teacher.country)}</p>
    </div>
  `;
}

export function createStatisticsBody(teacher) {
  return `
    <tr>
      <td>${escapeHTML(teacher.full_name)}</td>
      <td>${escapeHTML(teacher.course)}</td>
      <td>${escapeHTML(teacher.age)}</td>
      <td>${escapeHTML(teacher.b_date?.slice(0, 10))}</td>
      <td>${escapeHTML(teacher.gender)}</td>
      <td>${escapeHTML(teacher.country)}</td>
    </tr>
  `;
}

export function createTeacherInfoHTML(teacher) {
  return `
    ${createAvatarHTML(teacher, true)}
    <div class="teacher-info-details">
      <h3 class="teacher-info-name">${escapeHTML(teacher.full_name)}</h3>
      <button
        type="button"
        class="teacher-info-star${teacher.favorite ? " is-active" : ""}"
        data-action="toggle-favorite"
        data-teacher-id="${escapeHTML(teacher.id)}"
        aria-label="${teacher.favorite ? "Remove from favorites" : "Add to favorites"}"
        aria-pressed="${teacher.favorite}"
      >
        <img src="img/star.svg" alt="" />
      </button>
      <p class="teacher-info-subject">${escapeHTML(teacher.course)}</p>
      <p>${escapeHTML(teacher.city)}, ${escapeHTML(teacher.country)}</p>
      <p>${escapeHTML(teacher.age)}, ${escapeHTML(teacher.gender)}</p>
      ${teacher.email ? `<a href="mailto:${escapeHTML(teacher.email)}">${escapeHTML(teacher.email)}</a>` : ""}
      ${teacher.phone ? `<p><a href="tel:${escapeHTML(teacher.phone)}">${escapeHTML(teacher.phone)}</a></p>` : ""}
    </div>
    <p class="teacher-info-notes">${escapeHTML(teacher.note || "No notes yet.")}</p>
  `;
}
