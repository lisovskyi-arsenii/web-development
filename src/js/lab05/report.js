import { keys, map, mapKeys, pick, values } from "lodash-es";

const COLUMNS = {
  full_name: "Name",
  course: "Speciality",
  age: "Age",
  b_date: "Date of birth",
  gender: "Gender",
  country: "Country",
  city: "City",
  email: "Email",
  phone: "Phone",
};

const REPORTS = {
  country: {
    slice: {
      rows: [{ uniqueName: COLUMNS.country }],
      columns: [{ uniqueName: "[Measures]" }],
      measures: [
        {
          uniqueName: COLUMNS.full_name,
          aggregation: "count",
          caption: "Teachers",
        },
      ],
    },
    options: { grid: { type: "classic", showHeaders: false } },
  },
  flat: {
    slice: { rows: values(COLUMNS).map((uniqueName) => ({ uniqueName })) },
    options: { grid: { type: "flat", showHeaders: false } },
  },
};

export function initReport() {
  const buttons = document.querySelectorAll(".report-btn");
  let data = [];
  let currentReport = "country";
  let pivot;

  function showReport() {
    const report = {
      dataSource: { data },
      ...REPORTS[currentReport],
    };

    if (pivot) {
      pivot.setReport(report);
    } else {
      pivot = new WebDataRocks({
        container: "#report",
        toolbar: false,
        width: "100%",
        height: 420,
        report,
      });
    }

    buttons.forEach((button) =>
      button.classList.toggle(
        "is-active",
        button.dataset.report === currentReport,
      ),
    );
  }

  buttons.forEach((button) =>
    button.addEventListener("click", () => {
      currentReport = button.dataset.report;
      showReport();
    }),
  );

  return function updateReport(teachers) {
    data = map(teachers, (teacher) =>
      mapKeys(
        {
          ...pick(teacher, keys(COLUMNS)),
          b_date: teacher.b_date?.slice(0, 10),
        },
        (_, field) => COLUMNS[field],
      ),
    );
    showReport();
  };
}
