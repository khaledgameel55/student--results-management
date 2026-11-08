export default class Student {
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

  getGrade(average = this.calculateAverage()) {
    if (average >= 90) {
      return 'A';
    }
    if (average >= 80) {
      return 'B';
    }
    if (average >= 70) {
      return 'C';
    }
    if (average >= 60) {
      return 'D';
    }
    if (average >= 50) {
      return 'E';
    }
    return 'F';
  }

  getFinalResult() {
    const average = this.calculateAverage();
    return average >= 50 && this.attendance >= 75 ? 'ناجح' : 'يحتاج مراجعة';
  }

  static calculateMercyAverage(students) {
    if (!students.length) {
      return 0;
    }

    const total = students.reduce((sum, student) => {
      const adjustedAverage = student.calculateAverage() + 5;
      return sum + adjustedAverage;
    }, 0);

    return total / students.length;
  }
}
