// Small, dependency-free statistics toolkit for the simulator (all functions are pure).

/** Seeded pseudo-random generator (mulberry32): same seed, same sequence. */
export function createRng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal values from a uniform generator (Box–Muller). */
export function createNormal(rng) {
  let spare = null;
  return () => {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }
    let u = 0;
    while (u === 0) u = rng();
    const radius = Math.sqrt(-2 * Math.log(u));
    const angle = 2 * Math.PI * rng();
    spare = radius * Math.sin(angle);
    return radius * Math.cos(angle);
  };
}

export const mean = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;

/** Sample variance (n − 1). */
export function variance(values) {
  const m = mean(values);
  return values.reduce((sum, value) => sum + (value - m) ** 2, 0) / (values.length - 1);
}

export const sd = (values) => Math.sqrt(variance(values));

/** ln Γ(x) with the Lanczos approximation. */
export function logGamma(x) {
  const g = 7;
  const c = [
    0.9999999999998099, 676.5203681218851, -1259.1392167224028, 771.3234287776531,
    -176.6150391699918, 12.507343278686905, -0.13857109526572012, 9.984369578019572e-6,
    1.5056327351493116e-7,
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  const z = x - 1;
  let sum = c[0];
  for (let i = 1; i < g + 2; i += 1) sum += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(sum);
}

function betaContinuedFraction(x, a, b) {
  const tiny = 1e-30;
  let c = 1;
  let d = 1 - ((a + b) * x) / (a + 1);
  if (Math.abs(d) < tiny) d = tiny;
  d = 1 / d;
  let result = d;
  for (let m = 1; m <= 300; m += 1) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    result *= d * c;
    aa = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + aa * d;
    if (Math.abs(d) < tiny) d = tiny;
    c = 1 + aa / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const delta = d * c;
    result *= delta;
    if (Math.abs(delta - 1) < 1e-12) break;
  }
  return result;
}

/** Regularized incomplete beta function I_x(a, b). */
export function incompleteBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const front = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x),
  );
  if (x < (a + 1) / (a + b + 2)) return (front * betaContinuedFraction(x, a, b)) / a;
  return 1 - (front * betaContinuedFraction(1 - x, b, a)) / b;
}

/** Cumulative distribution function of Student's t. */
export function tCdf(t, df) {
  const tail = 0.5 * incompleteBeta(df / (df + t * t), df / 2, 0.5);
  return t >= 0 ? 1 - tail : tail;
}

/** Two-tailed p-value for a t statistic. */
export const tTwoTailedP = (t, df) => incompleteBeta(df / (df + t * t), df / 2, 0.5);

/** Inverse of tCdf, found by bisection. */
export function tQuantile(p, df) {
  let low = -1000;
  let high = 1000;
  for (let i = 0; i < 200; i += 1) {
    const middle = (low + high) / 2;
    if (tCdf(middle, df) < p) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

/** 95 % confidence interval of a mean. */
export function meanCi(values, level = 0.95) {
  const n = values.length;
  const margin = (tQuantile(1 - (1 - level) / 2, n - 1) * sd(values)) / Math.sqrt(n);
  const m = mean(values);
  return [m - margin, m + margin];
}

/** Welch's t-test for two independent samples (a − b). */
export function welchTTest(a, b) {
  const va = variance(a) / a.length;
  const vb = variance(b) / b.length;
  const se = Math.sqrt(va + vb);
  const diff = mean(a) - mean(b);
  const t = diff / se;
  const df = (va + vb) ** 2 / (va ** 2 / (a.length - 1) + vb ** 2 / (b.length - 1));
  const margin = tQuantile(0.975, df) * se;
  return { t, df, p: tTwoTailedP(t, df), diff, ci: [diff - margin, diff + margin] };
}

/** Cohen's d with the pooled standard deviation (a − b). */
export function cohensD(a, b) {
  const pooled = Math.sqrt(
    ((a.length - 1) * variance(a) + (b.length - 1) * variance(b)) / (a.length + b.length - 2),
  );
  return (mean(a) - mean(b)) / pooled;
}

/** Pearson correlation with t-test, Fisher-z 95 % CI and least-squares line. */
export function pearson(x, y) {
  const n = x.length;
  const mx = mean(x);
  const my = mean(y);
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i += 1) {
    sxy += (x[i] - mx) * (y[i] - my);
    sxx += (x[i] - mx) ** 2;
    syy += (y[i] - my) ** 2;
  }
  const r = sxy / Math.sqrt(sxx * syy);
  const df = n - 2;
  const t = r * Math.sqrt(df / (1 - r * r));
  const z = Math.atanh(r);
  const margin = 1.959964 / Math.sqrt(n - 3);
  const slope = sxy / sxx;
  return {
    r,
    t,
    df,
    p: tTwoTailedP(t, df),
    ci: [Math.tanh(z - margin), Math.tanh(z + margin)],
    slope,
    intercept: my - slope * mx,
  };
}

/** Conventional labels (Cohen, 1988). */
export function effectSizeLabel(d) {
  const size = Math.abs(d);
  if (size < 0.2) return 'negligible';
  if (size < 0.5) return 'small';
  if (size < 0.8) return 'medium';
  return 'large';
}

export function correlationLabel(r) {
  const size = Math.abs(r);
  if (size < 0.1) return 'negligible';
  if (size < 0.3) return 'small';
  if (size < 0.5) return 'moderate';
  return 'strong';
}

/** APA-style p-value: "< .001" or "= .034". */
export function formatP(p) {
  if (p < 0.001) return '< .001';
  return `= ${p.toFixed(3).replace(/^0/, '')}`;
}
