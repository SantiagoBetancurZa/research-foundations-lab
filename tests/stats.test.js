import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  cohensD,
  createNormal,
  createRng,
  formatP,
  mean,
  meanCi,
  pearson,
  sd,
  tQuantile,
  tTwoTailedP,
  welchTTest,
} from '../src/lib/stats.js';

const close = (actual, expected, tolerance = 1e-4) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not close to ${expected}`);

// Reference values: textbook t tables, and p-values cross-checked by numerically integrating
// the t density (Simpson's rule, 200,000 steps) in an independent script.
test('t distribution matches reference values', () => {
  close(tTwoTailedP(2.0, 10), 0.07338803);
  close(tTwoTailedP(-2.0, 10), 0.07338803);
  close(tQuantile(0.975, 10), 2.228139);
  close(tQuantile(0.975, 30), 2.042272);
  close(tQuantile(0.025, 5), -2.570582);
});

test("Welch's t-test matches reference values", () => {
  const result = welchTTest([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]);
  close(result.t, -1.897367);
  close(result.df, 5.882353);
  close(result.p, 0.1075311, 1e-5);
  close(result.ci[0], -6.887742, 1e-4);
  close(result.ci[1], 0.887742, 1e-4);
});

test("Cohen's d uses the pooled standard deviation", () => {
  close(cohensD([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]), -1.2);
});

test('Pearson correlation matches reference values', () => {
  const result = pearson([1, 2, 3, 4, 5], [2, 4, 5, 4, 5]);
  close(result.r, 0.7745967);
  close(result.t, 2.12132);
  close(result.p, 0.1240271, 1e-5);
  close(result.slope, 0.6);
  close(result.intercept, 2.2);
});

test('descriptives and confidence interval', () => {
  const values = [4, 8, 6, 5, 3, 7];
  close(mean(values), 5.5);
  close(sd(values), 1.870829);
  const [low, high] = meanCi(values);
  close(low, 3.536686, 1e-4);
  close(high, 7.463314, 1e-4);
});

test('seeded generators are reproducible and roughly standard normal', () => {
  const a = createRng(42);
  const b = createRng(42);
  for (let i = 0; i < 5; i += 1) assert.equal(a(), b());
  const normal = createNormal(createRng(7));
  const sample = Array.from({ length: 20000 }, normal);
  close(mean(sample), 0, 0.03);
  close(sd(sample), 1, 0.03);
});

test('APA formatting of p-values', () => {
  assert.equal(formatP(0.0004), '< .001');
  assert.equal(formatP(0.0342), '= .034');
  assert.equal(formatP(0.5), '= .500');
});
