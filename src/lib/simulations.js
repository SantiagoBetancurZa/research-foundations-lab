// Data generators for the four simulator cases. Every run is reproducible from its seed.
import {
  cohensD,
  createNormal,
  createRng,
  mean,
  meanCi,
  pearson,
  sd,
  welchTTest,
} from './stats.js';

export const EFFECT_LEVELS = ['none', 'small', 'medium', 'large'];

// Conventional benchmark sizes (Cohen, 1988): d for group differences, ρ for correlations.
const D_BY_LEVEL = { none: 0, small: 0.2, medium: 0.5, large: 0.8 };
const RHO_BY_LEVEL = { none: 0, small: -0.1, medium: -0.3, large: -0.5 };

export const SIMULATIONS = {
  'music-concentration': {
    kind: 'two-groups',
    sampleSize: { default: 24, min: 6, max: 100, step: 2 },
    defaultEffect: 'large',
    firstSeed: 1,
    // Silence (control) vs. music with lyrics: lyrics are expected to lower the score.
    baseline: 76,
    spread: 12,
    direction: -1,
    range: [0, 100],
  },
  'ai-drafts': {
    kind: 'two-groups',
    sampleSize: { default: 18, min: 6, max: 100, step: 2 },
    defaultEffect: 'large',
    firstSeed: 7,
    // Without AI (control) vs. with AI: AI support is expected to raise the rubric score.
    baseline: 70,
    spread: 10,
    direction: 1,
    range: [0, 100],
  },
  'phone-sleep': {
    kind: 'correlation',
    sampleSize: { default: 64, min: 10, max: 300, step: 2 },
    defaultEffect: 'medium',
    firstSeed: 5,
    minutes: { mean: 55, spread: 25, max: 150 },
    sleep: { mean: 6.2, spread: 1.8 },
  },
  'online-forums': {
    kind: 'themes',
    sampleSize: { default: 8 },
    firstSeed: 1,
    // Probability that a participant of each profile (active, reader) mentions each theme.
    mentionRates: [
      [0.75, 0.45],
      [0.7, 0.6],
      [0.3, 0.8],
    ],
  },
};

export const effectValue = (caseId, level) =>
  SIMULATIONS[caseId].kind === 'correlation' ? RHO_BY_LEVEL[level] : D_BY_LEVEL[level];

const clamp = (value, [low, high]) => Math.min(high, Math.max(low, value));

function twoGroups(config, n, level, seed) {
  const normal = createNormal(createRng(seed));
  const shift = config.direction * D_BY_LEVEL[level] * config.spread;
  const draw = (center) =>
    Array.from({ length: n }, () => Math.round(clamp(center + config.spread * normal(), config.range)));
  const control = draw(config.baseline);
  const treatment = draw(config.baseline + shift);
  const describe = (values) => ({ values, n, mean: mean(values), sd: sd(values), ci: meanCi(values) });
  return {
    kind: 'two-groups',
    seed,
    groups: [describe(control), describe(treatment)],
    test: welchTTest(treatment, control),
    d: cohensD(treatment, control),
    trueDifference: shift,
  };
}

function correlation(config, n, level, seed) {
  const normal = createNormal(createRng(seed));
  const rho = RHO_BY_LEVEL[level];
  const x = [];
  const y = [];
  for (let i = 0; i < n; i += 1) {
    const zx = normal();
    const zy = rho * zx + Math.sqrt(1 - rho * rho) * normal();
    x.push(Math.round(clamp(config.minutes.mean + config.minutes.spread * zx, [0, config.minutes.max])));
    y.push(Math.round(clamp(config.sleep.mean + config.sleep.spread * zy, [0, 10]) * 10) / 10);
  }
  const share = (predicate) => x.filter((_, i) => predicate(i)).length / n;
  return {
    kind: 'correlation',
    seed,
    n,
    x,
    y,
    ...pearson(x, y),
    heavyUseShare: share((i) => x[i] > 60),
    poorSleepShare: share((i) => y[i] < 5),
    trueRho: rho,
  };
}

function themes(config, n, seed) {
  const rng = createRng(seed);
  const count = (rate) => Array.from({ length: n }, () => (rng() < rate ? 1 : 0)).reduce((a, b) => a + b, 0);
  return {
    kind: 'themes',
    seed,
    perProfile: n,
    counts: config.mentionRates.map(([active, reader]) => [count(active), count(reader)]),
  };
}

/** Runs one simulated study. */
export function runSimulation(caseId, { n, level, seed }) {
  const config = SIMULATIONS[caseId];
  if (config.kind === 'two-groups') return twoGroups(config, n, level, seed);
  if (config.kind === 'correlation') return correlation(config, n, level, seed);
  return themes(config, config.sampleSize.default, seed);
}

/** Repeats the same study many times to show how often it reaches p < .05 (empirical power). */
export function replicate(caseId, { n, level, runs = 100, firstSeed = 1000 }) {
  const estimates = [];
  let significant = 0;
  for (let i = 0; i < runs; i += 1) {
    const result = runSimulation(caseId, { n, level, seed: firstSeed + i });
    const estimate = result.kind === 'two-groups' ? result.test.diff : result.r;
    const p = result.kind === 'two-groups' ? result.test.p : result.p;
    estimates.push(estimate);
    if (p < 0.05) significant += 1;
  }
  return { runs, significant, estimates };
}
