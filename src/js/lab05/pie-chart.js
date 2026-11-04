import { countBy, keys, values } from "lodash-es";

export function initPieChart() {
  const select = document.querySelector("#chart-field");
  let visibleTeachers = [];

  const chart = new Chart(document.querySelector("#statistics-chart"), {
    type: "pie",
    data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
    options: {
      plugins: { legend: { position: "right" } },
    },
  });

  function renderChart() {
    const counts = countBy(visibleTeachers, select.value);
    const labels = keys(counts);

    chart.data.labels = labels;
    chart.data.datasets[0].data = values(counts);
    chart.data.datasets[0].backgroundColor = labels.map(
      (_, index) => `hsl(${(index * 360) / labels.length}, 65%, 55%)`,
    );
    chart.update();
  }

  select.addEventListener("change", renderChart);

  return function updateChart(teachers) {
    visibleTeachers = teachers;
    renderChart();
  };
}
