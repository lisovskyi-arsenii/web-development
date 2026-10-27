import { createNewObject } from "../lab02/task1.js";

const API_URL = "https://randomuser.me/api/";

export async function fetchTeachers(page = 1, results = 50) {
  const response = await fetch(
    `${API_URL}?results=${results}&page=${page}&seed=teachinder`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();
  return createNewObject(data.results);
}

export async function postTeacher(teacher) {
  const response = await fetch("http://localhost:3001/teachers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });

  if (!response.ok) {
    throw new Error(`POST failed: ${response.status}`);
  }

  return response.json();
}
