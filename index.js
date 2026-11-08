import Student from './Student.js';

const studentsList = [
  new Student(1, 'Jalal', [78, 82, 90], 88),
  new Student(2, 'Sara', [52, 57, 49], 80),
  new Student(3, 'Omar', [42, 39, 44], 76),
  new Student(4, 'Maha', [46, 45, 44], 72),
];

console.log('========================================');
console.log('          تقرير الطلاب الأكاديمي');
console.log('========================================');

studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(`اسم الطالب: ${student.name}`);
  console.log(`المتوسط: ${average.toFixed(2)}`);
  console.log(`التقدير: ${student.getGrade(average)}`);
  console.log(`الحالة: ${student.getFinalResult()}`);
  console.log('----------------------------------------');
});

const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

const mercyAdjustedStudents = strugglingStudents.map((student) => {
  const originalAverage = student.calculateAverage();
  const adjustedAverage = originalAverage + 5;
  return {
    ...student,
    originalAverage,
    adjustedAverage,
    adjustedGrade: student.getGrade(adjustedAverage),
  };
});

const mercyTotal = mercyAdjustedStudents.reduce((sum, student) => sum + student.adjustedAverage, 0);
const mercyAverage = mercyAdjustedStudents.length ? mercyTotal / mercyAdjustedStudents.length : 0;

console.log('\n========================================');
console.log('     الطلاب المتعثرون المستهدفون بالرأفة');
console.log('========================================');
console.log('مصفوفة الطلاب بعد تطبيق الرأفة:', mercyAdjustedStudents);

if (mercyAdjustedStudents.length) {
  mercyAdjustedStudents.forEach((student) => {
    console.log(`اسم الطالب: ${student.name}`);
    console.log(`المتوسط بعد الرأفة: ${student.adjustedAverage.toFixed(2)}`);
    console.log(`التقدير الجديد: ${student.adjustedGrade}`);
    console.log('----------------------------------------');
  });
} else {
  console.log('لا يوجد طلاب متعثرون في القائمة.');
}

console.log(`\nمتوسط المتعثرين بعد الرأفة: ${Student.calculateMercyAverage(strugglingStudents).toFixed(2)}`);
console.log(`متوسط الرأفة العام: ${mercyAverage.toFixed(2)}`);
console.log('========================================');

if (typeof document !== 'undefined') {
  const setText = (selector, value) => {
    document.querySelector(selector).textContent = value;
  };

  const appendCells = (row, values) => {
    values.forEach(({ value, className = '' }) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      cell.className = className;
      row.append(cell);
    });
  };

  setText('#student-count', studentsList.length);
  setText('#passed-count', studentsList.filter((student) => student.getFinalResult() === 'ناجح').length);
  setText('#mercy-count', mercyAdjustedStudents.length);
  setText('#mercy-average', mercyAverage.toFixed(2));

  const studentRows = document.querySelector('#student-rows');
  studentsList.forEach((student) => {
    const average = student.calculateAverage();
    const result = student.getFinalResult();
    const row = document.createElement('tr');
    appendCells(row, [
      { value: student.name, className: 'student-name' },
      { value: student.id },
      { value: student.grades.join(' / ') },
      { value: average.toFixed(2) },
      { value: student.getGrade(average) },
      { value: `${student.attendance}%` },
      { value: result, className: result === 'ناجح' ? 'result-pass' : 'result-review' },
    ]);
    studentRows.append(row);
  });

  const mercyRows = document.querySelector('#mercy-rows');
  mercyAdjustedStudents.forEach((student) => {
    const row = document.createElement('tr');
    appendCells(row, [
      { value: student.name, className: 'student-name' },
      { value: student.id },
      { value: student.originalAverage.toFixed(2) },
      { value: student.adjustedAverage.toFixed(2) },
      { value: student.adjustedGrade },
    ]);
    mercyRows.append(row);
  });

  document.querySelector('#mercy-table-wrap').hidden = mercyAdjustedStudents.length === 0;
  document.querySelector('#mercy-empty').hidden = mercyAdjustedStudents.length > 0;
}
