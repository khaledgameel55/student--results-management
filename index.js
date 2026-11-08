class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  getGrade(average) {
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    if (average >= 50) return "E";
    return "F";
  }

  getFinalResult(average) {
    return average >= 50 && this.attendance >= 75
      ? "ناجح"
      : "يحتاج مراجعة";
  }
}

const GRACE_POINTS = 5;
const STRUGGLING_MIN_AVERAGE = 40;
const STRUGGLING_MAX_AVERAGE = 49;

const studentsList = [
  new Student(101, "خالد", [88, 92, 85], 95),
  new Student(102, "سارة", [45, 48, 42], 80),
  new Student(103, "جميل", [40, 46, 44], 70),
  new Student(104, "مريم", [65, 72, 68], 90),
];

console.log("=== تقرير نتائج الطلاب ===");
const studentReports = studentsList.map((student) => {
  const average = student.calculateAverage();

  return {
    "رقم الجلوس": student.id,
    الاسم: student.name,
    "المتوسط": Number(average.toFixed(2)),
    التقدير: student.getGrade(average),
    النتيجة: student.getFinalResult(average),
  };
});
console.table(studentReports);

const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return (
    average >= STRUGGLING_MIN_AVERAGE &&
    average <= STRUGGLING_MAX_AVERAGE
  );
});

const mercyCommitteeResults = strugglingStudents.map((student) => {
  const originalAverage = student.calculateAverage();

  return {
    id: student.id,
    name: student.name,
    originalAverage,
    adjustedAverage: originalAverage + GRACE_POINTS,
  };
});

const adjustedAveragesTotal = mercyCommitteeResults.reduce(
  (total, student) => total + student.adjustedAverage,
  0,
);

const mercyCommitteeAverage =
  mercyCommitteeResults.length > 0
    ? adjustedAveragesTotal / mercyCommitteeResults.length
    : 0;

console.log("=== الطلاب المستفيدون من لجنة الرأفة ===");
if (mercyCommitteeResults.length === 0) {
  console.log("لا يوجد طلاب متعثرون في النطاق المحدد.");
} else {
  console.table(
    mercyCommitteeResults.map((student) => ({
      "رقم الجلوس": student.id,
      الاسم: student.name,
      "المتوسط قبل الرأفة": Number(student.originalAverage.toFixed(2)),
      "المتوسط بعد الرأفة": Number(student.adjustedAverage.toFixed(2)),
    })),
  );
}
console.log(
  "متوسط درجات الطلاب المتعثرين بعد الرأفة:",
  mercyCommitteeAverage.toFixed(2),
);

if (typeof document !== "undefined") {
  const formatNumber = (value) =>
    new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 }).format(value);

  const addCell = (row, value, className = "") => {
    const cell = document.createElement("td");
    cell.textContent = value;
    if (className) cell.className = className;
    row.appendChild(cell);
  };

  const studentTableBody = document.querySelector("#student-report");
  studentReports.forEach((student, index) => {
    const row = document.createElement("tr");
    addCell(row, formatNumber(index + 1));
    addCell(row, student["رقم الجلوس"]);
    addCell(row, student.الاسم, "student-name");
    addCell(row, formatNumber(student["المتوسط"]));
    addCell(row, student.التقدير, `grade grade-${student.التقدير}`);
    addCell(
      row,
      student.النتيجة,
      student.النتيجة === "ناجح" ? "status status-pass" : "status status-review",
    );
    studentTableBody.appendChild(row);
  });

  const mercyTableBody = document.querySelector("#mercy-report");
  mercyCommitteeResults.forEach((student, index) => {
    const row = document.createElement("tr");
    addCell(row, formatNumber(index + 1));
    addCell(row, student.id);
    addCell(row, student.name, "student-name");
    addCell(row, formatNumber(student.originalAverage));
    addCell(row, formatNumber(student.adjustedAverage), "adjusted-average");
    mercyTableBody.appendChild(row);
  });

  document.querySelector("#mercy-count").textContent = formatNumber(
    mercyCommitteeResults.length,
  );
  document.querySelector("#mercy-average").textContent =
    mercyCommitteeResults.length > 0 ? formatNumber(mercyCommitteeAverage) : "—";
  document.querySelector("#mercy-empty").hidden =
    mercyCommitteeResults.length > 0;
  document.querySelector("#mercy-table").hidden =
    mercyCommitteeResults.length === 0;
}
