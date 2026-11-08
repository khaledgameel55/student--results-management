import test from 'node:test';
import assert from 'node:assert/strict';
import Student from '../src/Student.js';

test('Student calculates average and grade correctly', () => {
  const student = new Student(1, 'Ali', [70, 60, 80], 90);

  assert.equal(student.calculateAverage(), 70);
  assert.equal(student.getGrade(70), 'C');
  assert.equal(student.getFinalResult(), 'ناجح');
});

test('Student catches poor attendance and low average', () => {
  const student = new Student(2, 'Sara', [40, 45, 49], 70);

  assert.equal(Number(student.calculateAverage().toFixed(2)), 44.67);
  assert.equal(student.getGrade(student.calculateAverage()), 'F');
  assert.equal(student.getFinalResult(), 'يحتاج مراجعة');
});

test('Mercy average prevents division by zero when list is empty', () => {
  const mercyAverage = Student.calculateMercyAverage([]);
  assert.equal(mercyAverage, 0);
});
