// Interface text. Course content lives in src/content.
const en = {
  appTitle: 'Research Foundations Lab',
  appTagline: 'Explore science with Artificial Intelligence.',
  skipToContent: 'Skip to main content',
  tabsLabel: 'Course sections',
  common: {
    cardHint: 'Show / hide definition',
    revealAll: 'Show all definitions',
    hideAll: 'Hide all definitions',
  },
  tabs: {
    method: 'The Method',
    researchTypes: 'Research Types',
    instruments: 'Instruments',
    concepts: 'Concepts',
    cases: 'Cases',
    article: 'Article',
    simulator: 'Simulator',
    ai: 'AI Designer',
  },
  footer: {
    credit:
      'Educational tool designed by Professor Santiago Betancur Zapata to foster critical and experimental thinking.',
    visit: 'Visit:',
  },
  method: {
    title: 'The Scientific Process',
    intro:
      'Tap any card to reveal its definition. The sequence includes the methodological steps between the first idea and carrying out the study.',
  },
  concepts: {
    title: 'The Researcher’s Glossary',
    intro: 'Tap any card to reveal its meaning.',
  },
  researchTypes: {
    title: 'Research Types and Approaches',
    intro: 'Discover the different paths for tackling a research problem.',
  },
  instruments: {
    title: 'Data Collection Instruments',
    intro: 'The practical tools scientists use to gather data from reality.',
  },
  cases: {
    title: 'Research Cases',
    intro:
      'Use these scenarios as a starting point to practice questions, variables, instruments and methodological decisions.',
    level: (level) => `Level: ${level}`,
    scenario: 'Situation',
    question: 'Research question',
    design: 'Suggested design',
    analysis: 'Possible analysis',
    variablesTitle: 'Variables and data collection',
    independent: 'Independent variable',
    dependent: 'Dependent variable',
    control: 'Control variables',
    instruments: 'Suggested instruments',
    bias: 'Possible bias or limitation',
    seed: 'Suggested starting observation',
    useInAi: 'Take this case to the AI Designer',
  },
  article: {
    title: 'Classic Structure of a Scientific Article',
    intro:
      'This is the traditional path of academic writing: each section has a different job, and together they turn a study into a text that can be published and evaluated.',
    sequence: 'Suggested sequence',
    section: (n) => `Section ${n}`,
    includes: 'What it should include',
  },
  simulator: {
    title: 'Methodological Simulator',
    intro:
      'Choose a course case, make the design decisions and run the study. Every run draws a new random sample, so you can see how results vary, and statistics are calculated for real.',
    phases: ['Case', 'Design', 'Execution', 'Findings'],
    progress: 'Simulator progress',
    selectedCase: 'Selected case',
    buildDesign: 'Build the methodological design',
    designTitle: 'Methodological design',
    objective: 'Objective',
    sample: 'Sample',
    procedure: 'Procedure',
    designDecisions: 'Your design decisions',
    sampleSizeLabel: 'Sample size',
    sampleSizeHelp: 'Larger samples give more precise estimates, but they cost more time and effort.',
    perGroup: (n) => `${n} per group (${n * 2} participants)`,
    participants: (n) => `${n} participants`,
    effectLabel: 'True effect in the population',
    effectHelp:
      'In real research nobody knows this value. Here you choose it, so you can see what samples can and cannot reveal.',
    effects: { none: 'None', small: 'Small', medium: 'Medium', large: 'Large' },
    effectD: (d) => `Cohen’s d = ${d}`,
    effectRho: (rho) => `ρ = ${rho}`,
    qualitativeSample:
      'Qualitative samples are small and chosen on purpose (purposive sampling): the goal is depth and variety of experiences, not statistical generalization.',
    designSummary: (sample, effect) => `Sample: ${sample}. True effect: ${effect.toLowerCase()}.`,
    varsTitle: 'Variables, instruments and bias',
    independent: 'Independent variable',
    dependent: 'Dependent variable',
    control: 'Control variables',
    instruments: 'Instruments',
    bias: 'Bias or limitation',
    changeCase: 'Change case',
    toExecution: 'Go to execution',
    studyQuestion: 'Study question',
    run: 'Run simulation',
    running: 'Drawing the sample and calculating the statistics…',
    findings: 'Simulated findings',
    sampleNumber: (seed) => `Sample #${seed}`,
    newSample: 'Draw a new sample',
    table: { caption: 'Descriptive statistics by group', group: 'Group', mean: 'Mean', sd: 'SD', ci: '95% CI' },
    sizes: {
      negligible: 'negligible',
      small: 'small',
      medium: 'medium',
      large: 'large',
      moderate: 'moderate',
      strong: 'strong',
    },
    charts: {
      strip: 'Individual scores with group means and 95% confidence intervals',
      stripDesc: (labels, controlMean, treatmentMean) =>
        `${labels[0]}: mean ${controlMean}. ${labels[1]}: mean ${treatmentMean}.`,
      stripCaption:
        'Each dot is one student. The thick line is the group mean; the vertical bar is its 95% confidence interval.',
      scatter: 'Phone use before sleeping and sleep quality',
      scatterDesc: (n, r) => `${n} students; Pearson’s r = ${r}.`,
      scatterCaption: 'Each dot is one student. The red line is the least-squares trend line.',
    },
    results: {
      difference: (diff, low, high) =>
        `Difference in means (second group − control): ${diff} points; 95% CI [${low}; ${high}].`,
      welch: (t, df, p) => `Welch’s t(${df}) = ${t}, p ${p}.`,
      cohen: (d, size) => `Effect size: Cohen’s d = ${d} (${size}).`,
      correlation: (r, low, high) => `Pearson’s r = ${r}; 95% CI [${low}; ${high}].`,
      correlationTest: (t, df, p) => `t(${df}) = ${t}, p ${p}.`,
      rSquared: (r2, percent) =>
        `r² = ${r2}: phone time accounts for about ${percent} of the differences in sleep quality in this sample.`,
      significant:
        'p < .05: statistically significant. If there were no real effect, a result this extreme would be unusual.',
      notSignificant:
        'p ≥ .05: not statistically significant. Sampling variation alone could easily produce a result like this, so this sample cannot confirm the hypothesis.',
      correlationWarning:
        'Remember: a correlation shows that two variables move together, not that one causes the other.',
      insightTwoGroups: ({ treatment, control, diff, higher, d, size, significant }) =>
        `The group “${treatment}” scored ${diff} points ${higher ? 'higher' : 'lower'} on average than the group “${control}” (d = ${d}, a ${size} effect). ${
          significant
            ? 'The difference is statistically significant in this sample.'
            : 'The difference is not statistically significant in this sample: draw new samples or repeat the study to see how much it changes.'
        }`,
      insightCorrelation: ({ r, strength, negative, significant }) =>
        `The correlation is ${negative ? 'negative' : 'positive'} and ${strength} (r = ${r}): ${
          negative
            ? 'students who use their phones longer tend to report worse sleep.'
            : 'students who use their phones longer tend to report better sleep.'
        } ${significant ? 'It is statistically significant in this sample.' : 'It is not statistically significant in this sample.'}`,
    },
    replication: {
      title: 'What if 100 research teams ran this same study?',
      intro:
        'Every team draws its own sample from the same population. Repeating the study shows how much results can vary by chance.',
      summary: (k, runs, percent) => `${k} of ${runs} studies (${percent}) found p < .05.`,
      power:
        'This share is the statistical power of your design: the chance of detecting the effect when it exists. Go back, increase the sample size and watch it grow.',
      falsePositives:
        'There is no real effect here, yet about 5% of studies still reach p < .05 by chance: these are false positives. That is why replication matters.',
      histDiff: 'Differences in means found by the 100 studies',
      histR: 'Correlations found by the 100 studies',
      histDesc: (min, max, truth) => `Estimates range from ${min} to ${max}; the true value is ${truth}.`,
      markerLabel: 'true value',
    },
    matrix: {
      caption: 'Participants who mentioned each theme',
      theme: 'Theme',
      of: (count, n) => `${count} of ${n}`,
    },
    reading: 'Methodological reading',
    keyInsight: 'Key insight',
    discussion: 'Possible discussion',
    closing: 'Closing the study',
    limitation: 'Limitation',
    communication: 'Communication',
    adjustDesign: 'Adjust design',
    toAi: 'Take it to the AI Designer',
    reset: 'Restart simulator',
    replicate: 'Repeat this study 100 times',
  },
  ai: {
    title: 'AI Experimental Designer',
    intro: 'Turn any everyday question into a formal scientific study.',
    observationLabel: 'Your observation',
    observationHint: (min, max) =>
      `Describe something you have noticed in everyday life (${min} to ${max} characters).`,
    placeholder:
      'E.g., I have noticed that ants ignore whole-wheat bread crumbs but go straight for white bread crumbs…',
    counter: (count, max) => `${count} / ${max} characters`,
    startFromCase: 'Or start from one of the course cases:',
    generate: 'Generate a Full Scientific Report',
    generating: 'Applying the scientific method…',
    unavailableTitle: 'The live AI designer is not switched on in this copy of the app.',
    unavailableText: 'You can still explore an example design prepared in advance for each course case:',
    sampleBadge: (title) => `Example design prepared in advance for the case “${title}”.`,
    aiBadge: 'Generated live by AI. Read it critically: it is a starting point, not a final answer.',
    errors: {
      invalid_length: (min, max) => `Please write between ${min} and ${max} characters.`,
      rate_limited: 'Too many requests in a short time. Please wait a minute and try again.',
      upstream_busy: 'The AI service is busy right now. Please try again in a moment.',
      blocked:
        'The AI could not design a study for this observation. Try describing a safe, everyday situation.',
      timeout: 'The AI took too long to answer. Please try again.',
      generic: 'Could not reach the AI lab. Please try again soon.',
    },
    context: 'Research Context',
    methodApplied: 'The Method Applied',
    question: 'Question',
    hypothesis: 'Hypothesis',
    experiment: 'Experiment',
    analysis: 'Analysis',
    conclusion: 'Conclusion',
    communication: 'Communication',
    ethics: 'Ethics',
    variablesTitle: 'Variables and Concepts',
    independent: 'Independent Variable',
    independentSub: 'The cause',
    dependent: 'Dependent Variable',
    dependentSub: 'The effect',
    control: 'Control Variables',
    controlSub: 'What stays constant',
    groups: 'Groups (control vs. experimental)',
    groupsSub: 'Comparison',
    bias: 'Possible Bias',
    biasSub: 'Risk of error',
    correlation: 'Suggested Correlation',
    correlationSub: 'Observed pattern',
  },
};

export const STRINGS = { en };
