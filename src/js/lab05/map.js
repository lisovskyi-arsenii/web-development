let map;

export async function toggleTeacherMap(teacher) {
  const container = document.querySelector("#teacher-map");
  if (!container) return;

  container.hidden = !container.hidden;
  map?.remove();
  map = undefined;

  if (container.hidden) return;

  let position;
  try {
    position = await findCityPosition(teacher);
  } catch {}

  if (container.hidden) return;

  position ??= [
    Number(teacher.coordinates.latitude),
    Number(teacher.coordinates.longitude),
  ];

  map = L.map(container).setView(position, 10);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  L.marker(position)
    .addTo(map)
    .bindPopup(`${teacher.city}, ${teacher.country}`);
}

async function findCityPosition(teacher) {
  const url =
    "https://nominatim.openstreetmap.org/search" +
    `?city=${encodeURIComponent(teacher.city)}` +
    `&country=${encodeURIComponent(teacher.country)}` +
    "&format=json&limit=1";

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const [place] = await response.json();
  return place && [Number(place.lat), Number(place.lon)];
}
