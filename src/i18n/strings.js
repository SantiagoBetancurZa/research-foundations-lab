// Interface text. Course content lives in src/content.
const en = {
  appEyebrow: 'Interactive course · 8 modules',
  appTitle: 'Research Foundations Lab',
  appTagline: 'Explore science with Artificial Intelligence.',
  skipToContent: 'Skip to main content',
  languageLabel: 'Language',
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
      'Built by Santiago Betancur Zapata to foster critical and experimental thinking.',
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
      daily_limit: 'You have reached today’s limit of live AI designs. Please try again tomorrow.',
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

const es = {
  appEyebrow: 'Curso interactivo · 8 módulos',
  appTitle: 'Laboratorio de Fundamentos de la Investigación',
  appTagline: 'Explora la ciencia con inteligencia artificial.',
  skipToContent: 'Saltar al contenido principal',
  languageLabel: 'Idioma',
  tabsLabel: 'Secciones del curso',
  common: {
    cardHint: 'Mostrar / ocultar definición',
    revealAll: 'Mostrar todas las definiciones',
    hideAll: 'Ocultar todas las definiciones',
  },
  tabs: {
    method: 'El Método',
    researchTypes: 'Tipos de Investigación',
    instruments: 'Instrumentos',
    concepts: 'Conceptos',
    cases: 'Casos',
    article: 'Artículo',
    simulator: 'Simulador',
    ai: 'Diseñador IA',
  },
  footer: {
    credit:
      'Hecho por Santiago Betancur Zapata para fomentar el pensamiento crítico y experimental.',
    visit: 'Visita:',
  },
  method: {
    title: 'El Proceso Científico',
    intro:
      'Toca cualquier tarjeta para revelar su definición. La secuencia incluye los pasos metodológicos entre la primera idea y la ejecución del estudio.',
  },
  concepts: {
    title: 'El Glosario del Investigador',
    intro: 'Toca cualquier tarjeta para revelar su significado.',
  },
  researchTypes: {
    title: 'Tipos y Enfoques de Investigación',
    intro: 'Descubre los distintos caminos para abordar un problema de investigación.',
  },
  instruments: {
    title: 'Instrumentos de Recolección de Datos',
    intro: 'Las herramientas prácticas que usan los científicos para recolectar datos de la realidad.',
  },
  cases: {
    title: 'Casos de Investigación',
    intro:
      'Usa estos escenarios como punto de partida para practicar preguntas, variables, instrumentos y decisiones metodológicas.',
    level: (level) => `Nivel: ${level}`,
    scenario: 'Situación',
    question: 'Pregunta de investigación',
    design: 'Diseño sugerido',
    analysis: 'Posible análisis',
    variablesTitle: 'Variables y recolección de datos',
    independent: 'Variable independiente',
    dependent: 'Variable dependiente',
    control: 'Variables de control',
    instruments: 'Instrumentos sugeridos',
    bias: 'Posible sesgo o limitación',
    seed: 'Observación inicial sugerida',
    useInAi: 'Llevar este caso al Diseñador IA',
  },
  article: {
    title: 'Estructura Clásica de un Artículo Científico',
    intro:
      'Este es el recorrido tradicional de la escritura académica: cada sección cumple una función distinta, y todas juntas convierten un estudio en un texto que puede publicarse y evaluarse.',
    sequence: 'Secuencia sugerida',
    section: (n) => `Sección ${n}`,
    includes: 'Qué debe incluir',
  },
  simulator: {
    title: 'Simulador Metodológico',
    intro:
      'Elige un caso del curso, toma las decisiones de diseño y ejecuta el estudio. Cada ejecución extrae una nueva muestra aleatoria para que veas cómo varían los resultados, y las estadísticas se calculan de verdad.',
    phases: ['Caso', 'Diseño', 'Ejecución', 'Hallazgos'],
    progress: 'Progreso del simulador',
    selectedCase: 'Caso seleccionado',
    buildDesign: 'Construir el diseño metodológico',
    designTitle: 'Diseño metodológico',
    objective: 'Objetivo',
    sample: 'Muestra',
    procedure: 'Procedimiento',
    designDecisions: 'Tus decisiones de diseño',
    sampleSizeLabel: 'Tamaño de la muestra',
    sampleSizeHelp: 'Las muestras más grandes dan estimaciones más precisas, pero exigen más tiempo y esfuerzo.',
    perGroup: (n) => `${n} por grupo (${n * 2} participantes)`,
    participants: (n) => `${n} participantes`,
    effectLabel: 'Efecto real en la población',
    effectHelp:
      'En la investigación real nadie conoce este valor. Aquí lo eliges tú, para que veas lo que las muestras pueden y no pueden revelar.',
    effects: { none: 'Ninguno', small: 'Pequeño', medium: 'Mediano', large: 'Grande' },
    effectD: (d) => `d de Cohen = ${d}`,
    effectRho: (rho) => `ρ = ${rho}`,
    qualitativeSample:
      'Las muestras cualitativas son pequeñas y se eligen a propósito (muestreo intencional): se busca profundidad y variedad de experiencias, no generalización estadística.',
    designSummary: (sample, effect) => `Muestra: ${sample}. Efecto real: ${effect.toLowerCase()}.`,
    varsTitle: 'Variables, instrumentos y sesgos',
    independent: 'Variable independiente',
    dependent: 'Variable dependiente',
    control: 'Variables de control',
    instruments: 'Instrumentos',
    bias: 'Sesgo o limitación',
    changeCase: 'Cambiar de caso',
    toExecution: 'Ir a la ejecución',
    studyQuestion: 'Pregunta del estudio',
    run: 'Ejecutar simulación',
    running: 'Extrayendo la muestra y calculando las estadísticas…',
    findings: 'Hallazgos simulados',
    sampleNumber: (seed) => `Muestra n.º ${seed}`,
    newSample: 'Extraer una nueva muestra',
    table: { caption: 'Estadísticos descriptivos por grupo', group: 'Grupo', mean: 'Media', sd: 'DE', ci: 'IC 95 %' },
    // Masculine forms: they agree with "efecto" / "tamaño del efecto".
    // insightCorrelation switches them to the feminine for "correlación".
    sizes: {
      negligible: 'despreciable',
      small: 'pequeño',
      medium: 'mediano',
      large: 'grande',
      moderate: 'moderado',
      strong: 'fuerte',
    },
    charts: {
      strip: 'Puntajes individuales con medias de grupo e intervalos de confianza del 95 %',
      stripDesc: (labels, controlMean, treatmentMean) =>
        `${labels[0]}: media ${controlMean}. ${labels[1]}: media ${treatmentMean}.`,
      stripCaption:
        'Cada punto es un estudiante. La línea gruesa es la media del grupo; la barra vertical es su intervalo de confianza del 95 %.',
      scatter: 'Uso del celular antes de dormir y calidad del sueño',
      scatterDesc: (n, r) => `${n} estudiantes; r de Pearson = ${r}.`,
      scatterCaption: 'Cada punto es un estudiante. La línea roja es la recta de tendencia por mínimos cuadrados.',
    },
    results: {
      difference: (diff, low, high) =>
        `Diferencia de medias (segundo grupo − control): ${diff} puntos; IC 95 % [${low}; ${high}].`,
      welch: (t, df, p) => `Prueba t de Welch: t(${df}) = ${t}, p ${p}.`,
      cohen: (d, size) => `Tamaño del efecto: d de Cohen = ${d} (${size}).`,
      correlation: (r, low, high) => `r de Pearson = ${r}; IC 95 % [${low}; ${high}].`,
      correlationTest: (t, df, p) => `t(${df}) = ${t}, p ${p}.`,
      rSquared: (r2, percent) =>
        `r² = ${r2}: el tiempo de uso del celular explica cerca del ${percent} de las diferencias en la calidad del sueño en esta muestra.`,
      significant:
        'p < ,05: estadísticamente significativo. Si no hubiera un efecto real, un resultado tan extremo sería poco común.',
      notSignificant:
        'p ≥ ,05: no es estadísticamente significativo. La variación muestral por sí sola podría producir fácilmente un resultado así, por lo que esta muestra no permite confirmar la hipótesis.',
      correlationWarning:
        'Recuerda: una correlación muestra que dos variables se mueven juntas, no que una sea la causa de la otra.',
      insightTwoGroups: ({ treatment, control, diff, higher, d, size, significant }) =>
        `El grupo “${treatment}” obtuvo en promedio ${diff} puntos ${higher ? 'más' : 'menos'} que el grupo “${control}” (d = ${d}, un efecto ${size}). ${
          significant
            ? 'La diferencia es estadísticamente significativa en esta muestra.'
            : 'La diferencia no es estadísticamente significativa en esta muestra: extrae nuevas muestras o repite el estudio para ver cuánto cambia.'
        }`,
      // `strength` arrives in the masculine (see `sizes`); -o → -a makes it agree with "correlación".
      insightCorrelation: ({ r, strength, negative, significant }) =>
        `La correlación es ${negative ? 'negativa' : 'positiva'} y ${String(strength).replace(/o$/, 'a')} (r = ${r}): ${
          negative
            ? 'los estudiantes que usan el celular por más tiempo tienden a reportar peor sueño.'
            : 'los estudiantes que usan el celular por más tiempo tienden a reportar mejor sueño.'
        } ${significant ? 'Es estadísticamente significativa en esta muestra.' : 'No es estadísticamente significativa en esta muestra.'}`,
    },
    replication: {
      title: '¿Y si 100 equipos de investigación hicieran este mismo estudio?',
      intro:
        'Cada equipo extrae su propia muestra de la misma población. Repetir el estudio muestra cuánto pueden variar los resultados por azar.',
      summary: (k, runs, percent) =>
        `${k} de ${runs} estudios (${percent}) ${Number(k) === 1 ? 'obtuvo' : 'obtuvieron'} p < ,05.`,
      power:
        'Esta proporción es la potencia estadística de tu diseño: la probabilidad de detectar el efecto cuando existe. Regresa, aumenta el tamaño de la muestra y observa cómo crece.',
      falsePositives:
        'Aquí no hay un efecto real y, aun así, cerca del 5 % de los estudios alcanzan p < ,05 por azar: son falsos positivos. Por eso importa la réplica.',
      histDiff: 'Diferencias de medias halladas en los 100 estudios',
      histR: 'Correlaciones halladas en los 100 estudios',
      histDesc: (min, max, truth) => `Las estimaciones van de ${min} a ${max}; el valor real es ${truth}.`,
      markerLabel: 'valor real',
    },
    matrix: {
      caption: 'Participantes que mencionaron cada tema',
      theme: 'Tema',
      of: (count, n) => `${count} de ${n}`,
    },
    reading: 'Lectura metodológica',
    keyInsight: 'Idea clave',
    discussion: 'Posible discusión',
    closing: 'Cierre del estudio',
    limitation: 'Limitación',
    communication: 'Comunicación',
    adjustDesign: 'Ajustar el diseño',
    toAi: 'Llevarlo al Diseñador IA',
    reset: 'Reiniciar simulador',
    replicate: 'Repetir este estudio 100 veces',
  },
  ai: {
    title: 'Diseñador Experimental con IA',
    intro: 'Convierte cualquier pregunta cotidiana en un estudio científico formal.',
    observationLabel: 'Tu observación',
    observationHint: (min, max) =>
      `Describe algo que hayas notado en la vida cotidiana (de ${min} a ${max} caracteres).`,
    placeholder:
      'Ej.: He notado que las hormigas ignoran las migas de pan integral, pero van directo a las de pan blanco…',
    counter: (count, max) => `${count} / ${max} caracteres`,
    startFromCase: 'O empieza desde uno de los casos del curso:',
    generate: 'Generar un Informe Científico Completo',
    generating: 'Aplicando el método científico…',
    unavailableTitle: 'El diseñador con IA en vivo no está activado en esta copia de la aplicación.',
    unavailableText: 'Aun así, puedes explorar un diseño de ejemplo preparado con anticipación para cada caso del curso:',
    sampleBadge: (title) => `Diseño de ejemplo preparado con anticipación para el caso “${title}”.`,
    aiBadge: 'Generado en vivo por IA. Léelo con sentido crítico: es un punto de partida, no una respuesta definitiva.',
    errors: {
      invalid_length: (min, max) => `Escribe entre ${min} y ${max} caracteres.`,
      rate_limited: 'Demasiadas solicitudes en poco tiempo. Espera un minuto e inténtalo de nuevo.',
      daily_limit: 'Llegaste al límite de diseños con IA en vivo de hoy. Vuelve a intentarlo mañana.',
      upstream_busy: 'El servicio de IA está ocupado ahora mismo. Vuelve a intentarlo en unos instantes.',
      blocked:
        'La IA no pudo diseñar un estudio para esta observación. Intenta describir una situación cotidiana y segura.',
      timeout: 'La IA tardó demasiado en responder. Inténtalo de nuevo.',
      generic: 'No fue posible conectar con el laboratorio de IA. Inténtalo de nuevo más tarde.',
    },
    context: 'Contexto de la Investigación',
    methodApplied: 'El Método Aplicado',
    question: 'Pregunta',
    hypothesis: 'Hipótesis',
    experiment: 'Experimento',
    analysis: 'Análisis',
    conclusion: 'Conclusión',
    communication: 'Comunicación',
    ethics: 'Ética',
    variablesTitle: 'Variables y Conceptos',
    independent: 'Variable Independiente',
    independentSub: 'La causa',
    dependent: 'Variable Dependiente',
    dependentSub: 'El efecto',
    control: 'Variables de Control',
    controlSub: 'Lo que se mantiene constante',
    groups: 'Grupos (control vs. experimental)',
    groupsSub: 'Comparación',
    bias: 'Posible Sesgo',
    biasSub: 'Riesgo de error',
    correlation: 'Correlación Sugerida',
    correlationSub: 'Patrón observado',
  },
};

export const STRINGS = { en, es };
