// Spanish course content. Keys match the ids in structure.js.
const es = {
  processSteps: {
    observation: {
      title: 'Observación',
      desc: 'Notar un fenómeno en el mundo natural que despierta curiosidad. Ejemplo: “Las plantas de mi ventana crecen hacia la luz”.',
    },
    question: {
      title: 'Pregunta',
      desc: 'Formular una pregunta clara y medible basada en la observación. Ejemplo: “¿El color de la luz afecta la velocidad de crecimiento de una planta?”.',
    },
    'literature-review': {
      title: 'Revisión Bibliográfica',
      desc: 'Explorar antecedentes, teorías y estudios previos para entender qué se sabe ya sobre el problema y dónde está el vacío de investigación.',
    },
    objective: {
      title: 'Objetivo',
      desc: 'Definir con precisión qué se quiere lograr o comprobar con el estudio. El objetivo orienta todo el diseño metodológico.',
    },
    hypothesis: {
      title: 'Hipótesis',
      desc: 'Proponer una explicación o predicción tentativa y comprobable. Ejemplo: “Si las plantas reciben luz azul, entonces crecerán más rápido que con luz roja”.',
    },
    'methodological-design': {
      title: 'Diseño Metodológico',
      desc: 'Precisar variables, muestra, instrumentos, procedimiento y forma de análisis antes de ejecutar el estudio.',
    },
    experimentation: {
      title: 'Experimentación',
      desc: 'Diseñar y realizar pruebas controladas para validar o refutar la hipótesis. Implica definir variables y grupos.',
    },
    analysis: {
      title: 'Análisis',
      desc: 'Recopilar los datos del experimento, organizarlos (gráficos, tablas) y buscar patrones matemáticos o estadísticos.',
    },
    conclusion: {
      title: 'Conclusión',
      desc: 'Interpretar los datos para decidir si apoyan o rechazan la hipótesis inicial. Se reconocen también las limitaciones del estudio.',
    },
    communication: {
      title: 'Comunicación',
      desc: 'Compartir los resultados a través de artículos o conferencias (revisión por pares) para que otros puedan replicar el estudio.',
    },
  },

  concepts: {
    'independent-variable': {
      term: 'Variable Independiente',
      definition:
        'La condición que el investigador manipula o cambia intencionalmente (ej. cantidad de agua). Es la causa.',
    },
    'dependent-variable': {
      term: 'Variable Dependiente',
      definition:
        'Lo que se mide o se observa en respuesta a los cambios. Su valor depende de la variable independiente (ej. altura de la planta). Es el efecto.',
    },
    'control-variables': {
      term: 'Variables de Control',
      definition:
        'Factores que se mantienen constantes para asegurar que el experimento sea justo y que solo la variable independiente cause el efecto.',
    },
    'control-group': {
      term: 'Grupo de Control',
      definition:
        'Un grupo en el experimento que no recibe el tratamiento o variable experimental. Sirve como punto de referencia para comparar.',
    },
    bias: {
      term: 'Sesgo (Bias)',
      definition:
        'Cualquier factor o preferencia sistemática que desvía los resultados de la verdad. Un buen diseño intenta minimizarlo.',
    },
    'correlation-causation': {
      term: 'Correlación vs. Causalidad',
      definition:
        'Que dos cosas ocurran juntas (correlación) no significa que una cause la otra (causalidad). Se necesita un experimento controlado para probar la causalidad.',
    },
  },

  researchTypes: {
    quantitative: {
      term: 'Cuantitativo',
      definition:
        'Se basa en la recolección y análisis de datos numéricos. Busca medir fenómenos, usar estadísticas y probar hipótesis estructuradas.',
    },
    qualitative: {
      term: 'Cualitativo',
      definition:
        'Explora significados, experiencias y contextos. Usa datos no numéricos (textos, discursos, observaciones) para comprender fenómenos en profundidad.',
    },
    mixed: {
      term: 'Mixto',
      definition:
        'Combina elementos cuantitativos y cualitativos en un mismo estudio para obtener una visión más completa y robusta del problema investigado.',
    },
    experimental: {
      term: 'Experimental',
      definition:
        'Manipula intencionalmente una variable independiente bajo condiciones estrictamente controladas para observar el efecto en una variable dependiente.',
    },
    descriptive: {
      term: 'Descriptivo u Observacional',
      definition:
        'Se limita a observar y describir las características de un grupo, situación o fenómeno, sin manipular ninguna variable.',
    },
  },

  instruments: {
    surveys: {
      term: 'Encuestas y Cuestionarios',
      definition:
        'Series de preguntas estructuradas diseñadas para recolectar grandes volúmenes de datos numéricos o categóricos rápidamente.',
    },
    interviews: {
      term: 'Entrevistas',
      definition:
        'Conversaciones dirigidas por el investigador (estructuradas o abiertas) para profundizar en las respuestas y percepciones de un individuo.',
    },
    'focus-groups': {
      term: 'Grupos Focales',
      definition:
        'Discusiones grupales moderadas que permiten observar cómo interactúan los participantes y construyen opiniones colectivas.',
    },
    'observation-guide': {
      term: 'Guía de Observación',
      definition:
        'Formato estructurado o diario de campo usado por el investigador para registrar sistemáticamente lo que ocurre en un entorno real.',
    },
    'lab-equipment': {
      term: 'Equipos de Laboratorio',
      definition:
        'Instrumentos físicos y tecnológicos (microscopios, sensores, software analítico) usados para medir variables con alta precisión empírica.',
    },
  },

  cases: {
    'music-concentration': {
      area: 'Educación',
      method: 'Experimental',
      level: 'Básico',
      title: 'Música con letra y concentración',
      hook: 'Ideal para practicar variables, grupos y comparación de resultados en clase.',
      scenario:
        'Un docente nota que varios estudiantes dicen estudiar mejor con música, pero durante las lecturas evaluadas parecen distraerse cuando suenan canciones con letra.',
      question:
        '¿Escuchar música con letra disminuye el rendimiento en una actividad corta de comprensión lectora frente al silencio?',
      design:
        'Asignar al azar a los estudiantes a dos grupos, usar el mismo texto y el mismo tiempo, y comparar el puntaje promedio obtenido por cada grupo.',
      analysis:
        'Se pueden calcular promedios, dispersión y una comparación simple entre grupos para ver si hay diferencias consistentes.',
      variables: {
        independent: 'Condición de estudio: silencio o música con letra.',
        dependent: 'Puntaje en la prueba de comprensión lectora.',
        control:
          'Mismo salón, mismo texto, mismo tiempo, mismo nivel de dificultad y mismo horario.',
      },
      instruments: 'Prueba corta de comprensión, cronómetro y hoja de registro de puntajes.',
      bias: 'Preferencias musicales previas, cansancio de los participantes o diferencias iniciales en hábito lector.',
      seedObservation:
        'He notado que algunos estudiantes parecen concentrarse menos cuando realizan una lectura académica con música con letra que cuando la hacen en silencio.',
    },
    'ai-drafts': {
      area: 'Escritura académica',
      method: 'Mixto',
      level: 'Intermedio',
      title: 'Uso de IA y calidad del primer borrador',
      hook: 'Permite debatir ventajas, límites y sesgos del apoyo tecnológico en investigación.',
      scenario:
        'En un curso universitario, algunos estudiantes usan asistentes de IA para organizar ideas antes de escribir, mientras otros prefieren empezar desde cero.',
      question:
        '¿El uso de un asistente de IA mejora la estructura inicial de un borrador académico y cómo perciben los estudiantes ese apoyo?',
      design:
        'Comparar borradores de dos grupos con una rúbrica común y complementar con entrevistas breves sobre percepción de utilidad, autonomía y confianza.',
      analysis:
        'Cruzar resultados numéricos de la rúbrica con testimonios cualitativos para identificar patrones de mejora y tensiones éticas o metodológicas.',
      variables: {
        independent: 'Uso o no uso del asistente de IA durante la planeación del texto.',
        dependent: 'Calidad del borrador según rúbrica de estructura, claridad y coherencia.',
        control:
          'Mismo tema, misma extensión objetivo, mismo tiempo de elaboración y misma consigna.',
      },
      instruments:
        'Rúbrica de evaluación, entrevista semiestructurada y diario breve de proceso por estudiante.',
      bias: 'Experiencia previa con IA, diferencias en escritura inicial y sesgo del evaluador si conoce el grupo.',
      seedObservation:
        'He observado que algunos estudiantes producen borradores más estructurados cuando usan un asistente de IA para ordenar ideas, aunque no todos sienten que eso mejore realmente su aprendizaje.',
    },
    'phone-sleep': {
      area: 'Bienestar estudiantil',
      method: 'Descriptivo',
      level: 'Básico',
      title: 'Uso nocturno del celular y calidad del sueño',
      hook: 'Un buen ejemplo para diferenciar correlación de causalidad sin intervenir la conducta.',
      scenario:
        'En un grupo de estudiantes universitarios se comenta que quienes usan el celular hasta tarde llegan más cansados y con menor atención a clase.',
      question:
        '¿Existe relación entre el tiempo de uso del celular antes de dormir y la calidad de sueño reportada por los estudiantes?',
      design:
        'Aplicar una encuesta de hábitos nocturnos y una escala de calidad de sueño para describir tendencias y posibles asociaciones.',
      analysis:
        'Organizar frecuencias, cruces de variables y gráficos que permitan observar si hay una asociación consistente entre ambos factores.',
      variables: {
        independent: 'Tiempo de uso del celular en la hora previa a dormir.',
        dependent: 'Calidad de sueño autopercibida o puntaje en escala breve.',
        control: 'Edad aproximada del grupo, periodo académico y recolección en una misma semana.',
      },
      instruments:
        'Encuesta digital, escala breve de calidad del sueño y tabla de consolidación de datos.',
      bias: 'Respuestas inexactas por memoria, subregistro del tiempo real de pantalla y otras rutinas que afectan el descanso.',
      seedObservation:
        'He notado que varios estudiantes que usan el celular hasta muy tarde reportan dormir peor y sentirse más cansados durante las clases de la mañana.',
    },
    'online-forums': {
      area: 'Educación virtual',
      method: 'Cualitativo',
      level: 'Intermedio',
      title: 'Participación en foros y aprendizaje percibido',
      hook: 'Sirve para explorar experiencias, discursos y dinámicas de interacción en entornos virtuales.',
      scenario:
        'En un curso virtual, algunos estudiantes participan activamente en los foros y otros solo leen. El docente quiere entender qué valor pedagógico perciben unos y otros.',
      question:
        '¿Cómo describen los estudiantes el aporte de los foros virtuales a su comprensión de los contenidos del curso?',
      design:
        'Realizar entrevistas o grupos focales con estudiantes de distintos niveles de participación y analizar sus relatos buscando categorías emergentes.',
      analysis:
        'Codificar respuestas, identificar temas recurrentes y comparar percepciones entre estudiantes activos y observadores.',
      variables: {
        independent: 'No aplica como manipulación; interesa el nivel de participación observado.',
        dependent: 'Percepción del aprendizaje, utilidad y sentido de comunidad académica.',
        control:
          'Mismo curso, misma cohorte, mismo periodo y preguntas guía equivalentes para todos.',
      },
      instruments:
        'Entrevistas semiestructuradas, grupo focal y registro de participación en la plataforma.',
      bias: 'Deseabilidad social en las respuestas o interpretación sesgada del investigador durante la codificación.',
      seedObservation:
        'He observado que en los cursos virtuales algunos estudiantes consideran muy útiles los foros para aprender, mientras otros sienten que participan poco porque no perciben un beneficio claro.',
    },
  },

  articleSections: {
    title: {
      title: 'Título',
      summary: 'Claro, específico y representativo del estudio.',
      includes:
        'Debe anticipar con precisión el tema, la variable o fenómeno central y, cuando aporte claridad, la población o el contexto.',
    },
    abstract: {
      title: 'Resumen (Abstract)',
      summary: 'Síntesis breve del objetivo, el método, los resultados y las conclusiones.',
      includes:
        'Puede redactarse en un solo bloque o de forma estructurada con subtítulos según la revista o la guía académica.',
    },
    keywords: {
      title: 'Palabras clave (Keywords)',
      summary: 'Entre 3 y 6 términos que facilitan la indexación del artículo.',
      includes:
        'Conviene seleccionar conceptos nucleares del estudio, disciplina, técnica o población, evitando términos demasiado generales.',
    },
    introduction: {
      title: 'Introducción',
      summary:
        'Presenta el contexto, el problema de investigación, el estado del arte y el objetivo o la hipótesis.',
      includes:
        'Aquí se justifica por qué el estudio importa, qué vacío aborda y qué pregunta concreta busca responder.',
    },
    methods: {
      title: 'Metodología (Methods)',
      summary:
        'Expone el diseño, la muestra, los instrumentos, los procedimientos y la estrategia de análisis.',
      includes:
        'Debe ofrecer suficiente detalle para que otro investigador comprenda cómo se produjo la evidencia y pueda evaluar su rigor.',
    },
    results: {
      title: 'Resultados (Results)',
      summary: 'Presenta los hallazgos del estudio sin una interpretación extensa.',
      includes:
        'Se apoya en tablas, figuras, porcentajes, categorías o citas clave, según el enfoque metodológico empleado.',
    },
    discussion: {
      title: 'Discusión (Discussion)',
      summary:
        'Interpreta los resultados, los compara con la literatura y examina sus implicaciones.',
      includes:
        'Es el espacio para explicar qué significan los hallazgos, en qué coinciden o divergen con otros estudios y qué aportan al campo.',
    },
    conclusions: {
      title: 'Conclusiones (Conclusions)',
      summary:
        'Responde al objetivo del estudio y destaca aportes, limitaciones y posibles líneas futuras.',
      includes:
        'No repite toda la discusión: cierra el argumento central y deja claro el valor real del trabajo realizado.',
    },
    references: {
      title: 'Referencias (References)',
      summary: 'Reúne las fuentes citadas en el formato solicitado por la disciplina o la revista.',
      includes:
        'Puede seguir normas como APA, Vancouver u otras, pero siempre debe mantener consistencia y trazabilidad bibliográfica.',
    },
  },
  simulator: {
    'music-concentration': {
      objective:
        'Comparar el rendimiento en comprensión lectora entre estudiantes que leen en silencio y estudiantes que leen con música con letra.',
      focusLabel: 'Hipótesis de trabajo',
      focus:
        'Si los estudiantes leen con música con letra, entonces su puntaje promedio será menor que en la condición de silencio.',
      sample: (n) =>
        `${n * 2} estudiantes asignados al azar a un grupo control y a un grupo experimental (${n} en cada uno).`,
      procedure: 'Ambos grupos leen el mismo texto durante 15 minutos y luego responden una prueba de 10 ítems.',
      executionLabel: 'Simular un experimento controlado',
      executionText:
        'Cada ejecución extrae una nueva muestra aleatoria de estudiantes, aplica la lectura y la prueba, y registra los puntajes.',
      groups: ['Silencio (control)', 'Música con letra'],
      metric: 'Puntaje de comprensión (0–100)',
      discussion:
        'Si la diferencia se mantiene en nuevas muestras, el resultado es coherente con la idea de que la letra compite por la atención durante la lectura. Conviene comparar el tamaño del efecto con estudios previos antes de sacar conclusiones.',
      limitation:
        'Cada ejecución representa una sola sesión corta con estudiantes simulados; no permite saber si el efecto perdura en el tiempo o aparece en otras tareas.',
      communication:
        'Reportar las medias, las desviaciones estándar, la prueba t, el tamaño del efecto y un gráfico de puntos como este, además de una breve discusión sobre los distractores atencionales.',
    },
    'ai-drafts': {
      objective:
        'Evaluar si el uso guiado de IA mejora la calidad de un primer borrador académico y explorar cómo perciben los estudiantes ese apoyo.',
      focusLabel: 'Supuesto de trabajo',
      focus:
        'El apoyo de la IA puede mejorar la estructura inicial del texto, aunque no garantiza mayor autonomía ni argumentos más profundos.',
      sample: (n) =>
        `${n * 2} estudiantes divididos en dos grupos equivalentes (${n} en cada uno) con la misma consigna de escritura.`,
      procedure:
        'Se comparan los puntajes de la rúbrica en el primer borrador y luego se recogen las percepciones mediante entrevistas breves.',
      executionLabel: 'Simular un estudio de métodos mixtos',
      executionText:
        'Cada ejecución extrae una nueva muestra de borradores, los califica con la rúbrica y reúne los temas de las entrevistas.',
      groups: ['Sin IA (control)', 'Con IA'],
      metric: 'Puntaje de la rúbrica (0–100)',
      secondaryTitle: 'Componente cualitativo: lo que dicen las entrevistas (ilustrativo)',
      secondaryFindings: [
        'La mejora fue más visible en la organización y la claridad inicial que en la originalidad de los argumentos.',
        'La mayoría de los estudiantes afirmó que la IA los ayudó a empezar el borrador más rápido.',
        'Algunos estudiantes también expresaron preocupación por depender demasiado de sugerencias externas.',
      ],
      discussion:
        'Los números muestran cuánto cambia la estructura; las entrevistas explican por qué y a qué costo. Un puntaje más alto en la rúbrica no prueba un aprendizaje más profundo, por lo que ambos componentes deben leerse juntos.',
      limitation:
        'La simulación solo evalúa el primer borrador; no mide las revisiones posteriores ni la profundidad conceptual final.',
      communication:
        'Reportar el gráfico de la rúbrica y los resultados de la prueba junto con citas breves de las entrevistas, para mostrar el valor del enfoque mixto.',
    },
    'phone-sleep': {
      objective:
        'Describir la relación entre el uso del celular antes de dormir y la calidad del sueño reportada por los estudiantes.',
      focusLabel: 'Pregunta guía',
      focus:
        'El objetivo es averiguar si existe una asociación consistente, sin afirmar causalidad, porque no se manipula nada experimentalmente.',
      sample: (n) =>
        `${n} estudiantes de la misma cohorte que respondieron una encuesta sobre hábitos nocturnos y calidad del sueño.`,
      procedure:
        'Se grafican y se correlacionan los minutos de uso del celular y los puntajes de calidad del sueño, y se calcula la proporción de usuarios intensivos y de quienes duermen mal.',
      executionLabel: 'Simular un estudio descriptivo',
      executionText:
        'Cada ejecución encuesta a una nueva muestra aleatoria de estudiantes y registra sus minutos de uso del celular y la calidad de su sueño.',
      xLabel: 'Uso del celular antes de dormir (minutos)',
      yLabel: 'Calidad del sueño (0–10)',
      heavyUse: 'Uso > 60 min antes de dormir',
      poorSleep: 'Sueño regular o malo (puntaje < 5)',
      discussion:
        'El patrón es coherente con la literatura sobre higiene del sueño, pero sigue siendo una correlación, no una prueba de causalidad: el estrés, la carga académica o la cafeína podrían explicar ambas cosas.',
      limitation:
        'Los datos son autorreportados y pueden verse afectados por la memoria, la percepción subjetiva u otros hábitos nocturnos.',
      communication:
        'Presentarlo con un diagrama de dispersión, una tabla de frecuencias y una advertencia explícita sobre correlación versus causalidad.',
    },
    'online-forums': {
      objective:
        'Comprender cómo perciben los estudiantes el aporte de los foros virtuales a su aprendizaje y qué barreras para participar reconocen.',
      focusLabel: 'Enfoque analítico',
      focus:
        'Se busca identificar categorías emergentes sobre utilidad, comunidad académica y obstáculos para la participación.',
      sample: (n) =>
        `${n * 2} estudiantes elegidos intencionalmente del mismo curso virtual: ${n} participantes activos y ${n} lectores.`,
      procedure:
        'Se analizan las entrevistas y los registros de participación para identificar temas recurrentes y contrastes entre perfiles.',
      executionLabel: 'Simular un estudio cualitativo',
      executionText: 'Codificación de entrevistas, notas de grupos focales y registros de participación del curso.',
      profiles: ['Participantes activos', 'Lectores'],
      themes: [
        {
          title: 'Claridad conceptual',
          detail:
            'Los estudiantes sienten que escribir en el foro los obliga a organizar sus ideas y a revisar el contenido con más cuidado.',
        },
        {
          title: 'Aprendizaje social',
          detail:
            'Leer las respuestas de otras personas amplía las perspectivas y revela preguntas que no se habían planteado.',
        },
        {
          title: 'Barreras para participar',
          detail:
            'Aparecen el miedo a equivocarse, la sensación de exposición pública y la falta de tiempo para aportar con calma.',
        },
      ],
      countsNote:
        'Los conteos solo muestran qué tan extendido está cada tema en esta muestra pequeña e intencional. El análisis cualitativo no usa valores p: su fortaleza es el significado de lo que dicen los participantes.',
      keyInsight:
        'El valor pedagógico del foro depende menos de la cantidad de mensajes que de la calidad de la interacción y de sentir seguridad para participar.',
      discussion:
        'Los hallazgos muestran que el foro funciona como un espacio de construcción colectiva del conocimiento, pero requiere mediación docente y normas que generen confianza.',
      limitation:
        'La simulación se basa en una sola cohorte y no puede generalizarse a todos los cursos virtuales.',
      communication:
        'El mejor producto es un informe organizado por categorías, con citas textuales y una síntesis final de las implicaciones pedagógicas.',
    },
  },
};

export default es;
