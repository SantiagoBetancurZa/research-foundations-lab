// Example designs prepared in advance for the four cases. The AI Designer shows them when the
// live AI service is not configured, so the feature can always be explored. Same shape as the
// JSON returned by /api/design.
const en = {
  'music-concentration': {
    summary:
      'Some students seem to concentrate less when they read academic texts while listening to music with lyrics. The observation suggests that lyrics may compete with reading for the same verbal attention, which would lower comprehension.',
    method: {
      question:
        'Does listening to music with lyrics while reading lower scores on a short reading-comprehension test compared with reading in silence?',
      hypothesis:
        'If students read with music with lyrics, their average comprehension score will be lower than that of students who read in silence.',
      experiment:
        'Randomly assign 48 students to two groups of 24. Both read the same 800-word text for 15 minutes in the same room and time slot; one group hears songs with lyrics through headphones at a fixed volume, the other wears headphones in silence. Then everyone answers the same 10-item comprehension test.',
      analysis:
        'Compare the mean score and standard deviation of each group, plot the individual scores, and use an independent-samples t-test with an effect size (Cohen’s d) to judge whether the difference is larger than chance variation.',
      conclusion:
        'If the music group scores clearly lower, the hypothesis is supported for short reading tasks; if not, there is no evidence of an effect in this context. Either way, the result applies to this task and population, not to every study situation.',
      communication:
        'Share a short report with a dot plot of the scores, a table of means and standard deviations and the test result, followed by practical advice about study environments.',
      ethics:
        'Ask for informed consent, let students stop at any time, keep the volume at a safe level and store the scores anonymously.',
    },
    concepts: {
      independentVariable: 'Reading condition: music with lyrics vs. silence.',
      dependentVariable: 'Score on the 10-item comprehension test (0–100).',
      controlVariables: 'Same text, time limit, room, time of day, headphones and volume.',
      controlGroup: 'Students who read in silence while wearing headphones.',
      experimentalGroup: 'Students who read while listening to music with lyrics.',
      possibleBias:
        'Students who usually study with music may be less affected; fatigue or prior knowledge of the topic could also change the scores. Random assignment helps balance these factors.',
      correlation:
        'A negative relationship is expected: the presence of lyrics would go with lower comprehension, but only the controlled comparison can show cause and effect.',
    },
  },
  'ai-drafts': {
    summary:
      'Some students write more structured first drafts when an AI assistant helps them organize their ideas, but not all of them feel that they learn more. The observation combines a measurable outcome (draft quality) with a perception (learning), so it suits a mixed-methods study.',
    method: {
      question:
        'Does using an AI assistant during planning improve the structure of a first academic draft, and how do students experience that support?',
      hypothesis:
        'Drafts planned with an AI assistant will score higher on structure and clarity, while students will report mixed feelings about their own learning and autonomy.',
      experiment:
        'Divide 36 students into two equivalent groups with the same topic, length and time. One group may use an AI assistant only for planning; the other plans on paper. Two teachers who do not know the groups grade every draft with the same rubric, and 8 students from each group take part in a short interview.',
      analysis:
        'Compare the average rubric scores with a t-test and an effect size; code the interviews into themes (speed, dependence, confidence) and connect both kinds of evidence in a joint display.',
      conclusion:
        'The study can show whether AI planning improves structure and how students feel about it. A higher score would not prove deeper learning, which should be measured separately.',
      communication:
        'Present a chart of the rubric scores next to short anonymous quotes, and finish with guidelines for responsible AI use in writing courses.',
      ethics:
        'Explain the purpose, obtain consent, make it clear that grades do not depend on the group, and anonymize drafts and interview transcripts.',
    },
    concepts: {
      independentVariable: 'Use of an AI assistant during planning (yes or no).',
      dependentVariable:
        'Rubric score for structure, clarity and coherence, plus the perceived learning described in the interviews.',
      controlVariables: 'Same topic, instructions, length, writing time and rubric.',
      controlGroup: 'Students who plan their draft without AI.',
      experimentalGroup: 'Students who plan their draft with an AI assistant.',
      possibleBias:
        'Prior writing skill, previous experience with AI and graders who know which group a draft comes from. Blind grading and balanced groups reduce these risks.',
      correlation:
        'AI use may go together with better structure, but students who are already organized might use AI more, so the comparison must be controlled.',
    },
  },
  'phone-sleep': {
    summary:
      'Students who use their phones late at night say they sleep worse and feel tired in morning classes. Because a researcher cannot ethically control students’ nights, the observation points to a descriptive, correlational study.',
    method: {
      question:
        'Is there a relationship between the minutes students spend on their phones before sleeping and their self-reported sleep quality?',
      hypothesis:
        'Students who spend more time on their phones in the hour before sleeping will report lower sleep quality.',
      experiment:
        'Survey 64 students from the same cohort for one week. Each morning they record their phone minutes before sleeping (ideally from the phone’s screen-time report) and rate their sleep quality on a scale from 0 to 10.',
      analysis:
        'Draw a scatter plot, calculate Pearson’s correlation coefficient r with its confidence interval, and compare the share of students with fair or poor sleep among heavy and light night-time users.',
      conclusion:
        'A negative correlation would show that more screen time goes with worse sleep, but it would not prove that the phone causes it: stress, workload or caffeine could explain both.',
      communication:
        'Publish a scatter plot with the trend line, a frequency table and a clear warning that correlation does not mean causation, plus sleep-hygiene tips.',
      ethics:
        'Use anonymous answers, ask only for the data that is needed, and share sleep-health resources with every participant.',
    },
    concepts: {
      independentVariable: 'Minutes of phone use before sleeping (observed, not manipulated).',
      dependentVariable: 'Self-reported sleep quality (0–10 scale).',
      controlVariables: 'Same cohort, same week, same survey and the same time of day for answering.',
      controlGroup: 'There is no control group; light users serve as a point of comparison.',
      experimentalGroup: 'There is no experimental group, because the study only observes existing habits.',
      possibleBias:
        'Memory errors, under-reporting of screen time and other habits that affect sleep (stress, caffeine, workload).',
      correlation:
        'A moderate negative correlation is expected: as phone minutes increase, sleep quality tends to decrease.',
    },
  },
  'online-forums': {
    summary:
      'In online courses, some students find the forums very useful while others take little part because they see no clear benefit. Understanding these experiences calls for a qualitative study that listens to how students describe the forums.',
    method: {
      question:
        'How do students with different levels of participation describe the contribution of online forums to their learning?',
      hypothesis:
        'Qualitative studies usually work with guiding assumptions instead of testable hypotheses: students are expected to value forums when the interaction feels safe and meaningful.',
      experiment:
        'Select 16 students from the same course with high, medium and low participation. Hold semi-structured interviews and one focus group with the same guiding questions, and review their participation logs.',
      analysis:
        'Transcribe the conversations, code them line by line, group the codes into themes (clarity, social learning, barriers) and compare the themes of active students and readers.',
      conclusion:
        'The results describe what makes a forum valuable for these students; they are not meant to be generalized statistically, but they can guide better forum design.',
      communication:
        'Write a report organized by themes with anonymous quotes, and include practical recommendations for teachers who moderate forums.',
      ethics:
        'Obtain consent to record, use pseudonyms, and make sure that taking part has no effect on grades.',
    },
    concepts: {
      independentVariable:
        'Not manipulated; the study compares observed participation profiles (active students vs. readers).',
      dependentVariable:
        'How students describe their learning, the usefulness of the forum and their sense of community.',
      controlVariables: 'Same course, cohort, period and interview guide for everyone.',
      controlGroup: 'No control group; the profiles are compared with each other.',
      experimentalGroup: 'No experimental group; the study explores experiences.',
      possibleBias:
        'Social desirability (saying what the teacher wants to hear) and the researcher’s own expectations during coding. A second coder and an audit trail reduce them.',
      correlation:
        'Not the goal: the study looks for meanings and patterns, not numerical relationships.',
    },
  },
};

// Spanish versions (same keys as `en`).
const es = {
  'music-concentration': {
    summary:
      'Algunos estudiantes parecen concentrarse menos cuando leen textos académicos mientras escuchan música con letra. La observación sugiere que la letra podría competir con la lectura por la misma atención verbal, lo que reduciría la comprensión.',
    method: {
      question:
        '¿Escuchar música con letra mientras se lee disminuye los puntajes en una prueba corta de comprensión lectora, en comparación con leer en silencio?',
      hypothesis:
        'Si los estudiantes leen con música con letra, su puntaje promedio de comprensión será menor que el de los estudiantes que leen en silencio.',
      experiment:
        'Asignar al azar a 48 estudiantes a dos grupos de 24. Ambos grupos leen el mismo texto de 800 palabras durante 15 minutos, en el mismo salón y horario; uno escucha canciones con letra a través de audífonos, a un volumen fijo, y el otro lleva audífonos en silencio. Luego, todos responden la misma prueba de comprensión de 10 ítems.',
      analysis:
        'Comparar el puntaje promedio y la desviación estándar de cada grupo, graficar los puntajes individuales y aplicar una prueba t para muestras independientes, junto con el tamaño del efecto (d de Cohen), a fin de valorar si la diferencia supera la variación esperable por azar.',
      conclusion:
        'Si el grupo con música obtiene puntajes claramente más bajos, la hipótesis queda respaldada para tareas de lectura breves; de lo contrario, no hay evidencia de un efecto en este contexto. En cualquier caso, el resultado se aplica a esta tarea y a esta población, no a cualquier situación de estudio.',
      communication:
        'Compartir un informe breve con un gráfico de puntos de los puntajes individuales, una tabla de medias y desviaciones estándar y el resultado de la prueba, seguido de recomendaciones prácticas sobre los ambientes de estudio.',
      ethics:
        'Solicitar el consentimiento informado, permitir que los estudiantes se retiren en cualquier momento, mantener el volumen en un nivel seguro y guardar los puntajes de forma anónima.',
    },
    concepts: {
      independentVariable: 'Condición de lectura: música con letra vs. silencio.',
      dependentVariable: 'Puntaje en la prueba de comprensión de 10 ítems (0–100).',
      controlVariables: 'Mismo texto, tiempo límite, salón, horario, audífonos y volumen.',
      controlGroup: 'Estudiantes que leen en silencio con los audífonos puestos.',
      experimentalGroup: 'Estudiantes que leen mientras escuchan música con letra.',
      possibleBias:
        'Los estudiantes que suelen estudiar con música podrían verse menos afectados; el cansancio o el conocimiento previo del tema también podrían alterar los puntajes. La asignación aleatoria ayuda a equilibrar estos factores.',
      correlation:
        'Se espera una relación negativa: la presencia de letra iría acompañada de una menor comprensión, pero solo la comparación controlada puede mostrar una relación de causa y efecto.',
    },
  },
  'ai-drafts': {
    summary:
      'Algunos estudiantes escriben primeros borradores más estructurados cuando un asistente de IA los ayuda a organizar sus ideas, pero no todos sienten que aprenden más. La observación combina un resultado medible (la calidad del borrador) con una percepción (el aprendizaje), por lo que se ajusta bien a un estudio de métodos mixtos.',
    method: {
      question:
        '¿El uso de un asistente de IA durante la planeación mejora la estructura de un primer borrador académico, y cómo viven los estudiantes ese apoyo?',
      hypothesis:
        'Los borradores planeados con un asistente de IA obtendrán puntajes más altos en estructura y claridad, mientras que los estudiantes expresarán sentimientos encontrados sobre su propio aprendizaje y su autonomía.',
      experiment:
        'Dividir a 36 estudiantes en dos grupos equivalentes, con el mismo tema, la misma extensión y el mismo tiempo. Un grupo puede usar un asistente de IA solo para planear; el otro planea en papel. Dos docentes que no saben a qué grupo pertenece cada texto califican todos los borradores con la misma rúbrica, y 8 estudiantes de cada grupo participan en una entrevista breve.',
      analysis:
        'Comparar los puntajes promedio de la rúbrica con una prueba t y un tamaño del efecto; codificar las entrevistas en temas (rapidez, dependencia, confianza) y conectar ambos tipos de evidencia en una presentación conjunta (joint display).',
      conclusion:
        'El estudio puede mostrar si planear con IA mejora la estructura y cómo lo perciben los estudiantes. Un puntaje más alto no demostraría un aprendizaje más profundo, que debería medirse por separado.',
      communication:
        'Presentar un gráfico de los puntajes de la rúbrica junto a citas breves y anónimas, y cerrar con pautas para un uso responsable de la IA en los cursos de escritura.',
      ethics:
        'Explicar el propósito, obtener el consentimiento informado, dejar claro que las calificaciones no dependen del grupo y anonimizar los borradores y las transcripciones de las entrevistas.',
    },
    concepts: {
      independentVariable: 'Uso de un asistente de IA durante la planeación (sí o no).',
      dependentVariable:
        'Puntaje de la rúbrica en estructura, claridad y coherencia, además del aprendizaje percibido que se describe en las entrevistas.',
      controlVariables: 'Mismo tema, consigna, extensión, tiempo de escritura y rúbrica.',
      controlGroup: 'Estudiantes que planean su borrador sin IA.',
      experimentalGroup: 'Estudiantes que planean su borrador con un asistente de IA.',
      possibleBias:
        'La habilidad previa de escritura, la experiencia anterior con IA y que los evaluadores sepan de qué grupo proviene cada borrador. La calificación a ciegas y los grupos equilibrados reducen estos riesgos.',
      correlation:
        'El uso de IA puede ir de la mano con una mejor estructura, pero los estudiantes que ya son organizados podrían usar más la IA, por lo que la comparación debe estar controlada.',
    },
  },
  'phone-sleep': {
    summary:
      'Los estudiantes que usan el celular hasta tarde en la noche dicen dormir peor y sentirse cansados en las clases de la mañana. Como un investigador no puede controlar éticamente las noches de los estudiantes, la observación apunta a un estudio descriptivo y correlacional.',
    method: {
      question:
        '¿Existe relación entre los minutos que los estudiantes pasan en el celular antes de dormir y la calidad de sueño que ellos mismos reportan?',
      hypothesis:
        'Los estudiantes que pasan más tiempo en el celular durante la hora previa a dormir reportarán una menor calidad de sueño.',
      experiment:
        'Encuestar durante una semana a 64 estudiantes de la misma cohorte. Cada mañana registran los minutos de uso del celular antes de dormir (idealmente, a partir del reporte de tiempo de pantalla del propio celular) y califican la calidad de su sueño en una escala de 0 a 10.',
      analysis:
        'Elaborar un diagrama de dispersión, calcular el coeficiente de correlación de Pearson (r) con su intervalo de confianza y comparar la proporción de estudiantes con sueño regular o malo entre quienes usan mucho y poco el celular en la noche.',
      conclusion:
        'Una correlación negativa mostraría que más tiempo de pantalla va de la mano con un peor sueño, pero no demostraría que el celular sea la causa: el estrés, la carga académica o la cafeína podrían explicar ambas cosas.',
      communication:
        'Publicar un diagrama de dispersión con la línea de tendencia, una tabla de frecuencias y una advertencia clara de que correlación no implica causalidad, además de consejos de higiene del sueño.',
      ethics:
        'Usar respuestas anónimas, pedir solo los datos necesarios y compartir recursos sobre la salud del sueño con todos los participantes.',
    },
    concepts: {
      independentVariable: 'Minutos de uso del celular antes de dormir (observados, no manipulados).',
      dependentVariable: 'Calidad de sueño autorreportada (escala de 0 a 10).',
      controlVariables:
        'Misma cohorte, misma semana, misma encuesta y el mismo momento del día para responder.',
      controlGroup:
        'No hay grupo de control; quienes usan poco el celular sirven como punto de comparación.',
      experimentalGroup:
        'No hay grupo experimental, porque el estudio solo observa hábitos ya existentes.',
      possibleBias:
        'Errores de memoria, subregistro del tiempo de pantalla y otros hábitos que afectan el sueño (estrés, cafeína, carga académica).',
      correlation:
        'Se espera una correlación negativa moderada: a medida que aumentan los minutos de uso del celular, la calidad del sueño tiende a disminuir.',
    },
  },
  'online-forums': {
    summary:
      'En los cursos virtuales, algunos estudiantes consideran muy útiles los foros, mientras que otros participan poco porque no ven un beneficio claro. Comprender estas experiencias requiere un estudio cualitativo que escuche cómo los estudiantes describen los foros.',
    method: {
      question:
        '¿Cómo describen los estudiantes con distintos niveles de participación el aporte de los foros virtuales a su aprendizaje?',
      hypothesis:
        'Los estudios cualitativos suelen trabajar con supuestos orientadores en lugar de hipótesis comprobables: se espera que los estudiantes valoren los foros cuando la interacción les resulta segura y significativa.',
      experiment:
        'Seleccionar a 16 estudiantes del mismo curso con participación alta, media y baja. Realizar entrevistas semiestructuradas y un grupo focal con las mismas preguntas guía, y revisar sus registros de participación.',
      analysis:
        'Transcribir las conversaciones, codificarlas línea por línea, agrupar los códigos en temas (claridad, aprendizaje social, barreras) y comparar los temas de los estudiantes activos con los de quienes solo leen.',
      conclusion:
        'Los resultados describen qué hace valioso un foro para estos estudiantes; no pretenden generalizarse estadísticamente, pero pueden orientar un mejor diseño de los foros.',
      communication:
        'Redactar un informe organizado por temas, con citas anónimas, e incluir recomendaciones prácticas para los docentes que moderan foros.',
      ethics:
        'Obtener el consentimiento informado para grabar, usar seudónimos y garantizar que participar no tenga ningún efecto en las calificaciones.',
    },
    concepts: {
      independentVariable:
        'No se manipula; el estudio compara perfiles de participación observados (estudiantes activos vs. quienes solo leen).',
      dependentVariable:
        'Cómo describen los estudiantes su aprendizaje, la utilidad del foro y su sentido de comunidad.',
      controlVariables: 'Mismo curso, cohorte, periodo y guion de entrevista para todos.',
      controlGroup: 'No hay grupo de control; los perfiles se comparan entre sí.',
      experimentalGroup: 'No hay grupo experimental; el estudio explora experiencias.',
      possibleBias:
        'La deseabilidad social (decir lo que el docente quiere oír) y las propias expectativas del investigador durante la codificación. Un segundo codificador y un registro de auditoría (audit trail) ayudan a reducir estos sesgos.',
      correlation:
        'No es el objetivo: el estudio busca significados y patrones, no relaciones numéricas.',
    },
  },
};

const SAMPLE_DESIGNS = { en, es };

export function getSampleDesign(lang, caseId) {
  return (SAMPLE_DESIGNS[lang] ?? SAMPLE_DESIGNS.en)[caseId] ?? SAMPLE_DESIGNS.en[caseId] ?? null;
}
