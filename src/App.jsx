import { useState } from 'react';
import {
  Search,
  HelpCircle,
  Lightbulb,
  TestTube,
  LineChart,
  CheckSquare,
  Share2,
  BookOpen,
  FlaskConical,
  Layers,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Bot,
  ClipboardList,
  Info,
  Calculator,
  MessageCircle,
  GitMerge,
  Target,
  Eye,
  Clipboard,
  Mic,
  Users,
  Microscope,
} from 'lucide-react';

// --- DATOS: METODO CIENTIFICO ---
const methodSteps = [
  {
    id: 1,
    title: 'Observacion',
    icon: Search,
    desc: 'Notar un fenomeno en el mundo natural que despierta curiosidad. Ejemplo: "Las plantas de mi ventana crecen hacia la luz".',
  },
  {
    id: 2,
    title: 'Pregunta',
    icon: HelpCircle,
    desc: 'Formular una pregunta clara y medible basada en la observacion. Ejemplo: "¿El color de la luz afecta la velocidad de crecimiento de una planta?".',
  },
  {
    id: 3,
    title: 'Hipotesis',
    icon: Lightbulb,
    desc: 'Proponer una explicacion o prediccion tentativa y comprobable. Ejemplo: "Si las plantas reciben luz azul, entonces creceran mas rapido que con luz roja".',
  },
  {
    id: 4,
    title: 'Experimentacion',
    icon: TestTube,
    desc: 'Disenar y realizar pruebas controladas para validar o refutar la hipotesis. Implica definir variables y grupos.',
  },
  {
    id: 5,
    title: 'Analisis',
    icon: LineChart,
    desc: 'Recopilar los datos del experimento, organizarlos (graficos, tablas) y buscar patrones matematicos o estadisticos.',
  },
  {
    id: 6,
    title: 'Conclusion',
    icon: CheckSquare,
    desc: 'Interpretar los datos para decidir si apoyan o rechazan la hipotesis inicial. Se reconocen tambien las limitaciones del estudio.',
  },
  {
    id: 7,
    title: 'Comunicacion',
    icon: Share2,
    desc: 'Compartir los resultados a traves de articulos o conferencias (revision por pares) para que otros puedan replicar el estudio.',
  },
];

const scientificProcessSteps = [
  methodSteps[0],
  methodSteps[1],
  {
    id: 3,
    title: 'Revision Bibliografica',
    icon: BookOpen,
    desc: 'Explorar antecedentes, teorias y estudios previos para entender que se sabe ya sobre el problema y donde esta el vacio de investigacion.',
  },
  {
    id: 4,
    title: 'Objetivo',
    icon: Target,
    desc: 'Definir con precision que se quiere lograr o comprobar con el estudio. El objetivo orienta todo el diseno metodologico.',
  },
  {
    ...methodSteps[2],
    id: 5,
  },
  {
    id: 6,
    title: 'Diseno Metodologico',
    icon: ClipboardList,
    desc: 'Precisar variables, muestra, instrumentos, procedimiento y forma de analisis antes de ejecutar el estudio.',
  },
  {
    ...methodSteps[3],
    id: 7,
  },
  {
    ...methodSteps[4],
    id: 8,
  },
  {
    ...methodSteps[5],
    id: 9,
  },
  {
    ...methodSteps[6],
    id: 10,
  },
];

// --- DATOS: CONCEPTOS CLAVE ---
const concepts = [
  {
    term: 'Variable Independiente',
    definition:
      'La condicion que el investigador manipula o cambia intencionalmente (ej. cantidad de agua). Es la causa.',
    color: 'bg-blue-100 border-blue-400',
  },
  {
    term: 'Variable Dependiente',
    definition:
      'Lo que se mide o se observa en respuesta a los cambios. Su valor depende de la variable independiente (ej. altura de la planta). Es el efecto.',
    color: 'bg-green-100 border-green-400',
  },
  {
    term: 'Variables de Control',
    definition:
      'Factores que se mantienen constantes para asegurar que el experimento sea justo y que solo la variable independiente cause el efecto.',
    color: 'bg-yellow-100 border-yellow-400',
  },
  {
    term: 'Grupo de Control',
    definition:
      'Un grupo en el experimento que no recibe el tratamiento o variable experimental. Sirve como punto de referencia para comparar.',
    color: 'bg-purple-100 border-purple-400',
  },
  {
    term: 'Sesgo (Bias)',
    definition:
      'Cualquier factor o preferencia sistematica que desvia los resultados de la verdad. Un buen diseno intenta minimizarlo.',
    color: 'bg-red-100 border-red-400',
  },
  {
    term: 'Correlacion vs. Causalidad',
    definition:
      'Que dos cosas ocurran juntas (correlacion) no significa que una cause la otra (causalidad). Se necesita un experimento controlado para probar la causalidad.',
    color: 'bg-indigo-100 border-indigo-400',
  },
];

// --- DATOS: METODOS E INSTRUMENTOS ---
const researchMethodsTypes = [
  {
    term: 'Cuantitativo',
    icon: Calculator,
    definition:
      'Se basa en la recoleccion y analisis de datos numericos. Busca medir fenomenos, usar estadisticas y probar hipotesis estructuradas.',
    color: 'bg-blue-100 border-blue-400',
    bgDark: 'bg-blue-600 border-blue-700',
  },
  {
    term: 'Cualitativo',
    icon: MessageCircle,
    definition:
      'Explora significados, experiencias y contextos. Usa datos no numericos (textos, discursos, observaciones) para comprender fenomenos en profundidad.',
    color: 'bg-rose-100 border-rose-400',
    bgDark: 'bg-rose-600 border-rose-700',
  },
  {
    term: 'Mixto',
    icon: GitMerge,
    definition:
      'Combina elementos cuantitativos y cualitativos en un mismo estudio para obtener una vision mas completa y robusta del problema investigado.',
    color: 'bg-purple-100 border-purple-400',
    bgDark: 'bg-purple-600 border-purple-700',
  },
  {
    term: 'Experimental',
    icon: Target,
    definition:
      'Manipula intencionalmente una variable independiente bajo condiciones estrictamente controladas para observar el efecto en una variable dependiente.',
    color: 'bg-emerald-100 border-emerald-400',
    bgDark: 'bg-emerald-600 border-emerald-700',
  },
  {
    term: 'Descriptivo u Observacional',
    icon: Eye,
    definition:
      'Se limita a observar y describir las caracteristicas de un grupo, situacion o fenomeno, sin manipular ninguna variable.',
    color: 'bg-amber-100 border-amber-400',
    bgDark: 'bg-amber-600 border-amber-700',
  },
];

const researchInstruments = [
  {
    term: 'Encuestas y Cuestionarios',
    icon: Clipboard,
    definition:
      'Series de preguntas estructuradas disenadas para recolectar grandes volumenes de datos numericos o categoricos rapidamente.',
    color: 'bg-sky-100 border-sky-400',
    bgDark: 'bg-sky-600 border-sky-700',
  },
  {
    term: 'Entrevistas',
    icon: Mic,
    definition:
      'Conversaciones dirigidas por el investigador (estructuradas o abiertas) para profundizar en las respuestas y percepciones de un individuo.',
    color: 'bg-fuchsia-100 border-fuchsia-400',
    bgDark: 'bg-fuchsia-600 border-fuchsia-700',
  },
  {
    term: 'Grupos Focales',
    icon: Users,
    definition:
      'Discusiones grupales moderadas que permiten observar como interactuan los participantes y construyen opiniones colectivas.',
    color: 'bg-orange-100 border-orange-400',
    bgDark: 'bg-orange-600 border-orange-700',
  },
  {
    term: 'Guia de Observacion',
    icon: Eye,
    definition:
      'Formato estructurado o diario de campo usado por el investigador para registrar sistematicamente lo que ocurre en un entorno real.',
    color: 'bg-teal-100 border-teal-400',
    bgDark: 'bg-teal-600 border-teal-700',
  },
  {
    term: 'Equipos de Laboratorio',
    icon: Microscope,
    definition:
      'Instrumentos fisicos y tecnologicos (microscopios, sensores, software analitico) usados para medir variables con alta precision empirica.',
    color: 'bg-indigo-100 border-indigo-400',
    bgDark: 'bg-indigo-600 border-indigo-700',
  },
];

// --- DATOS: CASOS DE INVESTIGACION ---
const researchCases = [
  {
    id: 'musica-concentracion',
    area: 'Educacion',
    method: 'Experimental',
    level: 'Basico',
    title: 'Musica con letra y concentracion',
    hook: 'Ideal para practicar variables, grupos y comparacion de resultados en clase.',
    scenario:
      'Un docente nota que varios estudiantes dicen estudiar mejor con musica, pero durante las lecturas evaluadas parecen distraerse cuando suenan canciones con letra.',
    question:
      '¿Escuchar musica con letra disminuye el rendimiento en una actividad corta de comprension lectora frente al silencio?',
    design:
      'Asignar al azar a dos grupos, usar el mismo texto y el mismo tiempo, y comparar el puntaje promedio obtenido por cada grupo.',
    analysis:
      'Se pueden calcular promedios, dispersion y una comparacion simple entre grupos para ver si hay diferencias consistentes.',
    variables: {
      independent: 'Condicion de estudio: silencio o musica con letra.',
      dependent: 'Puntaje en la prueba de comprension lectora.',
      control:
        'Mismo salon, mismo texto, mismo tiempo, mismo nivel de dificultad y mismo horario.',
    },
    instruments: 'Prueba corta de comprension, cronometro y hoja de registro de puntajes.',
    bias:
      'Preferencias musicales previas, cansancio de los participantes o diferencias iniciales en habito lector.',
    seedObservation:
      'He notado que algunos estudiantes parecen concentrarse menos cuando realizan una lectura academica con musica con letra que cuando la hacen en silencio.',
  },
  {
    id: 'uso-ia-borradores',
    area: 'Escritura academica',
    method: 'Mixto',
    level: 'Intermedio',
    title: 'Uso de IA y calidad del primer borrador',
    hook: 'Permite debatir ventajas, limites y sesgos del apoyo tecnologico en investigacion.',
    scenario:
      'En un curso universitario, algunos estudiantes usan asistentes de IA para organizar ideas antes de escribir, mientras otros prefieren empezar desde cero.',
    question:
      '¿El uso de un asistente de IA mejora la estructura inicial de un borrador academico y como perciben los estudiantes ese apoyo?',
    design:
      'Comparar borradores de dos grupos con una rubrica comun y complementar con entrevistas breves sobre percepcion de utilidad, autonomia y confianza.',
    analysis:
      'Cruzar resultados numericos de la rubrica con testimonios cualitativos para identificar patrones de mejora y tensiones eticas o metodologicas.',
    variables: {
      independent: 'Uso o no uso del asistente de IA durante la planeacion del texto.',
      dependent: 'Calidad del borrador segun rubrica de estructura, claridad y coherencia.',
      control:
        'Mismo tema, misma extension objetivo, mismo tiempo de elaboracion y misma consigna.',
    },
    instruments:
      'Rubrica de evaluacion, entrevista semiestructurada y diario breve de proceso por estudiante.',
    bias:
      'Experiencia previa con IA, diferencias en escritura inicial y sesgo del evaluador si conoce el grupo.',
    seedObservation:
      'He observado que algunos estudiantes producen borradores mas estructurados cuando usan un asistente de IA para ordenar ideas, aunque no todos sienten que eso mejore realmente su aprendizaje.',
  },
  {
    id: 'celular-sueno',
    area: 'Bienestar estudiantil',
    method: 'Descriptivo',
    level: 'Basico',
    title: 'Uso nocturno del celular y calidad del sueno',
    hook: 'Un buen ejemplo para diferenciar correlacion de causalidad sin intervenir la conducta.',
    scenario:
      'En un grupo de estudiantes universitarios se comenta que quienes usan el celular hasta tarde llegan mas cansados y con menor atencion a clase.',
    question:
      '¿Existe relacion entre el tiempo de uso del celular antes de dormir y la calidad de sueno reportada por los estudiantes?',
    design:
      'Aplicar una encuesta de habitos nocturnos y una escala de calidad de sueno para describir tendencias y posibles asociaciones.',
    analysis:
      'Organizar frecuencias, cruces de variables y graficos que permitan observar si hay una asociacion consistente entre ambos factores.',
    variables: {
      independent: 'Tiempo de uso del celular en la hora previa a dormir.',
      dependent: 'Calidad de sueno autopercibida o puntaje en escala breve.',
      control:
        'Edad aproximada del grupo, periodo academico y recoleccion en una misma semana.',
    },
    instruments:
      'Encuesta digital, escala breve de calidad del sueno y tabla de consolidacion de datos.',
    bias:
      'Respuestas inexactas por memoria, subregistro del tiempo real de pantalla y otras rutinas que afectan el descanso.',
    seedObservation:
      'He notado que varios estudiantes que usan el celular hasta muy tarde reportan dormir peor y sentirse mas cansados durante las clases de la manana.',
  },
  {
    id: 'foros-virtuales',
    area: 'Educacion virtual',
    method: 'Cualitativo',
    level: 'Intermedio',
    title: 'Participacion en foros y aprendizaje percibido',
    hook: 'Sirve para explorar experiencias, discursos y dinamicas de interaccion en entornos virtuales.',
    scenario:
      'En un curso virtual, algunos estudiantes participan activamente en los foros y otros solo leen. El docente quiere entender que valor pedagogico perciben unos y otros.',
    question:
      '¿Como describen los estudiantes el aporte de los foros virtuales a su comprension de los contenidos del curso?',
    design:
      'Realizar entrevistas o grupos focales con estudiantes de distintos niveles de participacion y analizar sus relatos buscando categorias emergentes.',
    analysis:
      'Codificar respuestas, identificar temas recurrentes y comparar percepciones entre estudiantes activos y observadores.',
    variables: {
      independent: 'No aplica como manipulacion; interesa el nivel de participacion observado.',
      dependent: 'Percepcion del aprendizaje, utilidad y sentido de comunidad academica.',
      control:
        'Mismo curso, misma cohorte, mismo periodo y preguntas guia equivalentes para todos.',
    },
    instruments:
      'Entrevistas semiestructuradas, grupo focal y registro de participacion en la plataforma.',
    bias:
      'Deseabilidad social en las respuestas o interpretacion sesgada del investigador durante la codificacion.',
    seedObservation:
      'He observado que en los cursos virtuales algunos estudiantes consideran muy utiles los foros para aprender, mientras otros sienten que participan poco porque no perciben un beneficio claro.',
  },
];

const articleSections = [
  {
    id: 'titulo',
    title: 'Titulo',
    icon: Target,
    summary: 'Claro, especifico y representativo del estudio.',
    includes:
      'Debe anticipar con precision el tema, la variable o fenomeno central y, cuando aporte claridad, la poblacion o el contexto.',
  },
  {
    id: 'resumen',
    title: 'Resumen (Abstract)',
    icon: ClipboardList,
    summary: 'Sintesis breve del objetivo, el metodo, los resultados y las conclusiones.',
    includes:
      'Puede redactarse en un solo bloque o de forma estructurada con subtitulos segun la revista o la guia academica.',
  },
  {
    id: 'palabras-clave',
    title: 'Palabras clave (Keywords)',
    icon: Search,
    summary: 'Entre 3 y 6 terminos que facilitan la indexacion del articulo.',
    includes:
      'Conviene seleccionar conceptos nucleares del estudio, disciplina, tecnica o poblacion, evitando terminos demasiado generales.',
  },
  {
    id: 'introduccion',
    title: 'Introduccion',
    icon: BookOpen,
    summary:
      'Presenta el contexto, el problema de investigacion, el estado del arte y el objetivo o la hipotesis.',
    includes:
      'Aqui se justifica por que el estudio importa, que vacio aborda y que pregunta concreta busca responder.',
  },
  {
    id: 'metodologia',
    title: 'Metodologia (Methods)',
    icon: TestTube,
    summary:
      'Expone el diseño, la muestra, los instrumentos, los procedimientos y la estrategia de analisis.',
    includes:
      'Debe ofrecer suficiente detalle para que otro investigador comprenda como se produjo la evidencia y pueda evaluar su rigor.',
  },
  {
    id: 'resultados',
    title: 'Resultados (Results)',
    icon: LineChart,
    summary: 'Presenta los hallazgos del estudio sin una interpretacion extensa.',
    includes:
      'Se apoya en tablas, figuras, porcentajes, categorias o citas clave, segun el enfoque metodologico empleado.',
  },
  {
    id: 'discusion',
    title: 'Discusion (Discussion)',
    icon: MessageCircle,
    summary:
      'Interpreta los resultados, los compara con la literatura y examina sus implicaciones.',
    includes:
      'Es el espacio para explicar que significan los hallazgos, en que coinciden o divergen con otros estudios y que aportan al campo.',
  },
  {
    id: 'conclusiones',
    title: 'Conclusiones (Conclusions)',
    icon: CheckSquare,
    summary:
      'Responde al objetivo del estudio y destaca aportes, limitaciones y posibles lineas futuras.',
    includes:
      'No repite toda la discusion: cierra el argumento central y deja claro el valor real del trabajo realizado.',
  },
  {
    id: 'referencias',
    title: 'Referencias (References)',
    icon: Share2,
    summary: 'Reune las fuentes citadas en el formato solicitado por la disciplina o la revista.',
    includes:
      'Puede seguir normas como APA, Vancouver u otras, pero siempre debe mantener consistencia y trazabilidad bibliografica.',
  },
];

const simulatorScenarios = {
  'musica-concentracion': {
    objective:
      'Comparar el rendimiento en comprension lectora entre estudiantes que leen en silencio y estudiantes que leen con musica con letra.',
    focusLabel: 'Hipotesis de trabajo',
    focus:
      'Si la lectura se realiza con musica con letra, entonces el puntaje promedio sera menor que en la condicion de silencio.',
    sample:
      '48 estudiantes asignados aleatoriamente a un grupo control y un grupo experimental.',
    procedure:
      'Ambos grupos leen el mismo texto durante 15 minutos y luego responden una prueba de 10 items.',
    executionLabel: 'Simular experimento controlado',
    executionText:
      'Se estan aplicando la lectura, la prueba de comprension y el registro de puntajes.',
    resultMode: 'comparison',
    metricLabel: 'Puntaje promedio sobre 100',
    bars: [
      { label: 'Control: silencio', value: 82, color: 'bg-slate-400' },
      { label: 'Experimental: musica con letra', value: 68, color: 'bg-indigo-500' },
    ],
    keyInsight:
      'El grupo control supero por 14 puntos al grupo experimental, lo que sugiere un efecto negativo de la musica con letra en esta tarea breve.',
    discussion:
      'Los hallazgos apoyan la hipotesis y son coherentes con la idea de que la letra compite por recursos atencionales durante la lectura.',
    limitation:
      'La simulacion representa una sola sesion corta; no permite afirmar si el efecto se mantiene a largo plazo.',
    communication:
      'Se puede comunicar con un grafico de barras, una tabla de puntajes y una breve discusion sobre distractores atencionales.',
  },
  'uso-ia-borradores': {
    objective:
      'Evaluar si el uso orientado de IA mejora la calidad del primer borrador academico y explorar como perciben los estudiantes ese apoyo.',
    focusLabel: 'Supuesto de trabajo',
    focus:
      'El apoyo de IA puede mejorar la estructura inicial del texto, aunque no garantiza mayor autonomia ni mejor argumentacion profunda.',
    sample:
      '36 estudiantes divididos en dos grupos equivalentes con la misma consigna de escritura.',
    procedure:
      'Se compara la rubrica del primer borrador y luego se recogen percepciones mediante entrevistas breves.',
    executionLabel: 'Simular estudio mixto',
    executionText:
      'Se estan procesando rubricas de evaluacion y testimonios cualitativos de los participantes.',
    resultMode: 'mixed',
    metricLabel: 'Puntaje promedio de rubrica sobre 100',
    bars: [
      { label: 'Sin IA', value: 72, color: 'bg-slate-400' },
      { label: 'Con IA', value: 84, color: 'bg-emerald-500' },
    ],
    secondaryFindings: [
      'La mejora fue mas visible en organizacion y claridad inicial que en originalidad argumentativa.',
      'La mayoria reporto que la IA ayudo a comenzar mas rapido el borrador.',
      'Tambien aparecio inquietud sobre depender demasiado de sugerencias externas.',
    ],
    keyInsight:
      'El grupo con apoyo de IA obtuvo 12 puntos mas en la primera version, pero el beneficio se concentro en estructura y arranque del texto.',
    discussion:
      'El resultado sugiere utilidad metodologica para la planeacion, aunque el aprendizaje autonomo sigue dependiendo del criterio del estudiante.',
    limitation:
      'La simulacion solo valora el primer borrador; no mide revision posterior ni profundidad conceptual final.',
    communication:
      'Conviene reportar el grafico de rubrica junto con citas breves de entrevistas para mostrar el valor del enfoque mixto.',
  },
  'celular-sueno': {
    objective:
      'Describir la relacion entre el tiempo de uso del celular antes de dormir y la calidad de sueno reportada por estudiantes.',
    focusLabel: 'Pregunta orientadora',
    focus:
      'Interesa identificar si existe una asociacion consistente, sin afirmar causalidad porque no hay manipulacion experimental.',
    sample:
      '64 estudiantes de una misma cohorte que respondieron una encuesta de habitos nocturnos y calidad de sueno.',
    procedure:
      'Se consolidan frecuencias, cruces de variables y patrones de asociacion entre tiempo de pantalla y descanso autopercibido.',
    executionLabel: 'Simular estudio descriptivo',
    executionText:
      'Se estan consolidando encuestas, tablas de frecuencia y patrones de asociacion.',
    resultMode: 'association',
    stats: [
      { label: 'Uso > 60 min antes de dormir', value: '62%' },
      { label: 'Sueno regular o malo', value: '58%' },
      { label: 'Patron observado', value: 'Asociacion positiva moderada' },
    ],
    keyInsight:
      'A mayor tiempo de uso nocturno del celular, peor calidad de sueno reportada por una parte importante del grupo.',
    discussion:
      'El patron es consistente con la literatura sobre higiene del sueno, pero sigue siendo una correlacion y no una prueba causal.',
    limitation:
      'Los datos son autorreportados y pueden estar afectados por memoria, percepcion subjetiva u otros habitos nocturnos.',
    communication:
      'Se presenta bien con tablas de frecuencia, grafico comparativo y una advertencia explicita sobre correlacion versus causalidad.',
  },
  'foros-virtuales': {
    objective:
      'Comprender como perciben los estudiantes el aporte de los foros virtuales a su aprendizaje y que barreras reconocen para participar.',
    focusLabel: 'Foco analitico',
    focus:
      'Se busca identificar categorias emergentes sobre utilidad, comunidad academica y obstaculos de participacion.',
    sample:
      '16 estudiantes seleccionados con distintos niveles de participacion en un mismo curso virtual.',
    procedure:
      'Se analizan entrevistas y registros de participacion para identificar temas recurrentes y contrastes entre perfiles.',
    executionLabel: 'Simular estudio cualitativo',
    executionText:
      'Se estan codificando entrevistas, notas de grupo focal y registros de participacion del curso.',
    resultMode: 'themes',
    themes: [
      {
        title: 'Claridad conceptual',
        detail:
          'Los estudiantes perciben que escribir en el foro les obliga a ordenar ideas y revisar mejor los contenidos.',
      },
      {
        title: 'Aprendizaje social',
        detail:
          'Leer respuestas de otros amplifica perspectivas y permite detectar dudas que uno no habia formulado.',
      },
      {
        title: 'Barreras de participacion',
        detail:
          'Aparecen miedo a equivocarse, sensacion de exposicion publica y falta de tiempo para intervenir con calma.',
      },
    ],
    keyInsight:
      'El valor pedagogico del foro depende menos de la cantidad de mensajes y mas de la calidad de la interaccion y la seguridad para participar.',
    discussion:
      'Los hallazgos muestran que el foro funciona como espacio de construccion colectiva, pero requiere mediacion docente y reglas de confianza.',
    limitation:
      'La simulacion se basa en una sola cohorte y no permite generalizar a todos los cursos virtuales.',
    communication:
      'La mejor salida es un reporte por categorias con citas textuales y una sintesis final de implicaciones pedagogicas.',
  },
};

// --- COMPONENTES ---

const TabButton = ({ active, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 rounded-t-lg px-4 py-3 font-medium transition-colors ${
      active
        ? 'border-t-2 border-indigo-600 bg-white text-indigo-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
    type="button"
  >
    <Icon size={20} />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const FlipCard = ({ frontContent, backContent, frontColor, backColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group h-72 w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div
          className={`absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] ${frontColor}`}
        >
          {frontContent}
        </div>
        <div
          className={`absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${backColor}`}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
};

const ScientificMethodTab = () => (
  <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">El Proceso Cientifico</h2>
    <p className="mb-8 text-center text-gray-500">
      Toca cualquier tarjeta para revelar su definicion. Ahora incluye los pasos
      metodologicos que faltaban entre la idea inicial y la ejecucion del estudio.
    </p>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {scientificProcessSteps.map((step) => {
        const Icon = step.icon;
        return (
          <FlipCard
            key={step.id}
            frontColor="flex flex-col items-center justify-center border-2 border-indigo-100 bg-indigo-50 p-6 text-center shadow-sm hover:shadow-md"
            backColor="flex flex-col items-center justify-center overflow-y-auto border-2 border-indigo-700 bg-indigo-600 p-6 text-center shadow-md"
            frontContent={
              <>
                <div className="mb-4 rounded-full bg-white p-4 text-indigo-600 shadow-sm">
                  <Icon size={32} />
                </div>
                <h3 className="mb-2 text-xl font-extrabold text-gray-900">
                  {String(step.id).padStart(2, '0')}. {step.title}
                </h3>
              </>
            }
            backContent={
              <div className="flex h-full flex-col justify-center">
                <h3 className="mb-3 border-b border-indigo-400 pb-2 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-indigo-50">{step.desc}</p>
              </div>
            }
          />
        );
      })}
    </div>
  </div>
);

const ConceptsTab = () => (
  <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">Glosario del Investigador</h2>
    <p className="mb-8 text-center text-gray-500">
      Toca cualquier tarjeta para revelar su significado.
    </p>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {concepts.map((concept) => (
        <FlipCard
          key={concept.term}
          frontColor={`${concept.color} flex flex-col items-center justify-center border-2 p-6 text-center shadow-sm hover:shadow-md`}
          backColor="flex flex-col items-center justify-center overflow-y-auto border-2 border-gray-200 bg-white p-6 text-center shadow-sm"
          frontContent={<h3 className="text-xl font-bold text-gray-900">{concept.term}</h3>}
          backContent={
            <div className="flex h-full flex-col justify-center">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-400">
                {concept.term}
              </h3>
              <p className="text-base leading-relaxed text-gray-800">{concept.definition}</p>
            </div>
          }
        />
      ))}
    </div>
  </div>
);

const MethodsTypesTab = () => (
  <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
      Tipos y Enfoques de Investigacion
    </h2>
    <p className="mb-8 text-center text-gray-500">
      Descubre los distintos caminos para abordar un problema de investigacion.
    </p>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {researchMethodsTypes.map((method) => {
        const Icon = method.icon;
        return (
          <FlipCard
            key={method.term}
            frontColor={`${method.color} flex flex-col items-center justify-center border-2 p-6 text-center shadow-sm hover:shadow-md`}
            backColor={`${method.bgDark} flex flex-col items-center justify-center overflow-y-auto border-2 p-6 text-center shadow-lg`}
            frontContent={
              <>
                <div className="mb-4 rounded-full bg-white/70 p-4 text-gray-800 shadow-sm">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{method.term}</h3>
              </>
            }
            backContent={
              <div className="flex h-full flex-col justify-center">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-white/80">
                  {method.term}
                </h3>
                <p className="text-base font-medium leading-relaxed text-white">
                  {method.definition}
                </p>
              </div>
            }
          />
        );
      })}
    </div>
  </div>
);

const InstrumentsTab = () => (
  <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
      Instrumentos de Recoleccion
    </h2>
    <p className="mb-8 text-center text-gray-500">
      Las herramientas practicas que los cientificos usan para extraer datos de la realidad.
    </p>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {researchInstruments.map((instrument) => {
        const Icon = instrument.icon;
        return (
          <FlipCard
            key={instrument.term}
            frontColor={`${instrument.color} flex flex-col items-center justify-center border-2 p-6 text-center shadow-sm hover:shadow-md`}
            backColor="flex flex-col items-center justify-center overflow-y-auto border-2 border-gray-200 bg-white p-6 text-center shadow-lg"
            frontContent={
              <>
                <div className="mb-4 rounded-full bg-white/80 p-4 text-gray-700 shadow-sm">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{instrument.term}</h3>
              </>
            }
            backContent={
              <div className="flex h-full flex-col justify-center">
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-gray-400">
                  {instrument.term}
                </h3>
                <p className="text-base font-medium leading-relaxed text-gray-800">
                  {instrument.definition}
                </p>
              </div>
            }
          />
        );
      })}
    </div>
  </div>
);

const CaseInfoCard = ({ icon: Icon, label, text }) => (
  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-200">
      <Icon size={18} />
      <span>{label}</span>
    </div>
    <p className="text-sm leading-relaxed text-slate-100">{text}</p>
  </div>
);

const VariableCard = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="text-sm leading-relaxed text-slate-700">{value}</p>
  </div>
);

const CasesTab = ({ onUseCase }) => {
  const [selectedCaseId, setSelectedCaseId] = useState(researchCases[0].id);
  const selectedCase =
    researchCases.find((researchCase) => researchCase.id === selectedCaseId) ?? researchCases[0];

  return (
    <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Casos de Investigacion</h2>
        <p className="mx-auto max-w-3xl text-gray-500">
          Usa estos escenarios como punto de partida para practicar preguntas, variables,
          instrumentos y decisiones metodologicas sin alterar el contenido ya existente del curso.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px,1fr]">
        <div className="space-y-3">
          {researchCases.map((researchCase) => (
            <button
              key={researchCase.id}
              type="button"
              onClick={() => setSelectedCaseId(researchCase.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                researchCase.id === selectedCaseId
                  ? 'border-indigo-300 bg-indigo-50 shadow-md shadow-indigo-100'
                  : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'
              }`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
                  {researchCase.area}
                </span>
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                  {researchCase.method}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{researchCase.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{researchCase.hook}</p>
            </button>
          ))}
        </div>

        <div key={selectedCase.id} className="animate-fade-in-up rounded-3xl bg-slate-900 p-6 text-white shadow-2xl md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
                {selectedCase.area}
              </p>
              <h3 className="text-2xl font-bold md:text-3xl">{selectedCase.title}</h3>
            </div>
            <span className="inline-flex w-fit rounded-full border border-indigo-300/30 bg-indigo-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
              Nivel {selectedCase.level}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CaseInfoCard icon={Eye} label="Situacion" text={selectedCase.scenario} />
            <CaseInfoCard icon={HelpCircle} label="Pregunta de investigacion" text={selectedCase.question} />
            <CaseInfoCard icon={TestTube} label="Diseno sugerido" text={selectedCase.design} />
            <CaseInfoCard icon={LineChart} label="Analisis posible" text={selectedCase.analysis} />
          </div>

          <div className="mt-6 rounded-3xl bg-white p-5 text-slate-900 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList size={20} className="text-indigo-600" />
              <h4 className="text-lg font-bold">Variables y recoleccion</h4>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <VariableCard label="Variable independiente" value={selectedCase.variables.independent} />
              <VariableCard label="Variable dependiente" value={selectedCase.variables.dependent} />
              <VariableCard label="Variables de control" value={selectedCase.variables.control} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <VariableCard label="Instrumentos sugeridos" value={selectedCase.instruments} />
              <VariableCard label="Sesgo o limitacion posible" value={selectedCase.bias} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              Observacion inicial sugerida
            </p>
            <p className="text-sm leading-relaxed text-emerald-50">{selectedCase.seedObservation}</p>
          </div>

          <button
            type="button"
            onClick={() => onUseCase(selectedCase.seedObservation)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-400"
          >
            Llevar este caso al Diseñador con IA
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ArticleStructureTab = () => (
  <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
    <div className="mb-8 text-center">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        Estructura clasica de un articulo cientifico
      </h2>
      <p className="mx-auto max-w-3xl text-gray-500">
        Esta es la ruta tradicional de escritura academica: cada seccion cumple una funcion
        distinta y juntas convierten un estudio en un texto publicable y evaluable.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px,1fr]">
      <aside className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
          Secuencia sugerida
        </p>
        <div className="space-y-3">
          {articleSections.map((section, index) => (
            <div
              key={section.id}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3"
            >
              <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-400/20 text-xs font-bold text-indigo-100">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{section.title}</p>
                <p className="text-xs leading-relaxed text-slate-300">{section.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {articleSections.map((section, index) => {
          const Icon = section.icon;

          return (
            <article
              key={section.id}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-white p-3 text-indigo-600 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                      Seccion {index + 1}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-slate-700">{section.summary}</p>

              <div className="rounded-2xl border border-indigo-100 bg-white p-4">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-500">
                  Que debe incluir
                </p>
                <p className="text-sm leading-relaxed text-slate-700">{section.includes}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </div>
);

const SimulatorTabLegacy = () => {
  const [step, setStep] = useState(1);
  const [lightColor, setLightColor] = useState(null);
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const runExperiment = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const plantA = 10;
      let plantB = 0;
      if (lightColor === 'Roja') plantB = 14;
      if (lightColor === 'Azul') plantB = 18;
      if (lightColor === 'Verde') plantB = 6;
      setResults({ control: plantA, experimental: plantB });
      setAnalyzing(false);
      setStep(3);
    }, 1500);
  };

  const reset = () => {
    setStep(1);
    setLightColor(null);
    setResults(null);
  };

  return (
    <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Simulador de Experimentos</h2>
          <p className="mt-2 text-gray-600">
            Investiga como afecta el color de la luz al crecimiento de una planta.
          </p>
        </div>
        <div className="mb-8 flex items-center justify-center space-x-4 text-sm font-medium">
          <div className={`rounded-full px-4 py-2 ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            1. Diseño
          </div>
          <div className={`h-1 w-8 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`rounded-full px-4 py-2 ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2. Ejecucion
          </div>
          <div className={`h-1 w-8 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`rounded-full px-4 py-2 ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            3. Analisis
          </div>
        </div>
        {step === 1 && (
          <div className="animate-fade-in-up rounded-xl border border-blue-100 bg-blue-50 p-6">
            <h3 className="mb-4 text-xl font-bold">Paso 1: Define tus variables</h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <span className="font-semibold text-gray-700">Variable Dependiente:</span> Altura de la planta (cm).
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <span className="font-semibold text-gray-700">Grupo de Control:</span> Plantas bajo luz blanca.
              </div>
              <div className="rounded-lg border border-blue-300 bg-white p-4 ring-2 ring-blue-100">
                <span className="mb-2 block font-semibold text-gray-800">Variable Independiente:</span>
                <div className="flex gap-4">
                  {['Roja', 'Azul', 'Verde'].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setLightColor(color)}
                      className={`flex-1 rounded-lg border-2 px-4 py-3 font-bold transition-all ${
                        lightColor === color
                          ? color === 'Roja'
                            ? 'border-red-500 bg-red-100 text-red-700'
                            : color === 'Azul'
                              ? 'border-blue-500 bg-blue-100 text-blue-700'
                              : 'border-green-500 bg-green-100 text-green-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              disabled={!lightColor}
              onClick={() => setStep(2)}
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-bold text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-400"
            >
              Continuar <ArrowRight size={20} />
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="animate-fade-in-up rounded-xl border border-purple-100 bg-purple-50 p-8 text-center">
            <FlaskConical
              size={64}
              className={`mx-auto mb-6 text-purple-600 ${analyzing ? 'animate-bounce' : ''}`}
            />
            <h3 className="mb-2 text-2xl font-bold">Laboratorio en marcha</h3>
            {!analyzing ? (
              <button
                onClick={runExperiment}
                type="button"
                className="mx-auto flex items-center justify-center gap-3 rounded-xl bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-purple-700"
              >
                <Play size={24} /> Iniciar
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
              </div>
            )}
          </div>
        )}
        {step === 3 && results && (
          <div className="animate-fade-in-up rounded-xl border border-emerald-100 bg-emerald-50 p-6">
            <h3 className="mb-6 text-center text-xl font-bold">Resultados</h3>
            <div className="relative mb-6 flex h-64 items-end justify-around rounded-xl border border-emerald-200 bg-white p-6">
              <div className="z-10 flex w-1/3 flex-col items-center">
                <span className="mb-2 font-bold text-gray-700">{results.control} cm</span>
                <div
                  className="w-24 rounded-t-md bg-gray-400"
                  style={{ height: `${(results.control / 20) * 100}%` }}
                ></div>
                <span className="mt-4 text-sm font-semibold">Control</span>
              </div>
              <div className="z-10 flex w-1/3 flex-col items-center">
                <span className="mb-2 font-bold text-emerald-700">{results.experimental} cm</span>
                <div
                  className={`w-24 rounded-t-md ${
                    lightColor === 'Roja'
                      ? 'bg-red-500'
                      : lightColor === 'Azul'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                  }`}
                  style={{ height: `${(results.experimental / 20) * 100}%` }}
                ></div>
                <span className="mt-4 text-sm font-semibold">Exp ({lightColor})</span>
              </div>
            </div>
            <button
              onClick={reset}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 py-3 font-bold text-white"
            >
              <RotateCcw size={20} /> Reiniciar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

void SimulatorTabLegacy;

const SimulatorTab = ({ onUseCase = () => {} }) => {
  const [step, setStep] = useState(1);
  const [selectedScenarioId, setSelectedScenarioId] = useState(researchCases[0]?.id ?? '');
  const [running, setRunning] = useState(false);

  const selectedCase =
    researchCases.find((researchCase) => researchCase.id === selectedScenarioId) ?? researchCases[0];
  const selectedSimulation = simulatorScenarios[selectedScenarioId];

  const selectScenario = (scenarioId) => {
    setSelectedScenarioId(scenarioId);
    setRunning(false);
  };

  const runSimulation = () => {
    if (!selectedSimulation) return;
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setStep(4);
    }, 1600);
  };

  const resetSimulation = () => {
    setStep(1);
    setRunning(false);
    setSelectedScenarioId(researchCases[0]?.id ?? '');
  };

  const renderResults = () => {
    if (!selectedSimulation) return null;

    if (selectedSimulation.resultMode === 'association') {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {selectedSimulation.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm"
            >
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      );
    }

    if (selectedSimulation.resultMode === 'themes') {
      return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {selectedSimulation.themes.map((theme) => (
            <div
              key={theme.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-indigo-500">
                Categoria emergente
              </p>
              <h4 className="mb-2 text-lg font-bold text-slate-900">{theme.title}</h4>
              <p className="text-sm leading-relaxed text-slate-700">{theme.detail}</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selectedSimulation.bars.map((bar) => (
            <div
              key={bar.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-700">{bar.label}</p>
                <span className="text-xl font-bold text-slate-900">{bar.value}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
              </div>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                {selectedSimulation.metricLabel}
              </p>
            </div>
          ))}
        </div>

        {selectedSimulation.secondaryFindings && (
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              Hallazgos complementarios
            </p>
            <div className="space-y-3">
              {selectedSimulation.secondaryFindings.map((finding) => (
                <div
                  key={finding}
                  className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700"
                >
                  {finding}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Simulador Metodologico</h2>
          <p className="mx-auto mt-2 max-w-3xl text-gray-600">
            Ahora el simulador trabaja con los mismos casos, variables, enfoques e
            instrumentos que aparecen en el resto del curso.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          {[
            { index: 1, label: 'Caso' },
            { index: 2, label: 'Diseno' },
            { index: 3, label: 'Ejecucion' },
            { index: 4, label: 'Hallazgos' },
          ].map((phase) => (
            <div
              key={phase.label}
              className={`rounded-full px-4 py-2 ${
                step >= phase.index ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {phase.index}. {phase.label}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in-up space-y-6">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {researchCases.map((researchCase) => (
                <button
                  key={researchCase.id}
                  type="button"
                  onClick={() => selectScenario(researchCase.id)}
                  className={`rounded-3xl border p-5 text-left transition-all ${
                    researchCase.id === selectedScenarioId
                      ? 'border-indigo-300 bg-indigo-50 shadow-md shadow-indigo-100'
                      : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                      {researchCase.method}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-600">
                      {researchCase.area}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{researchCase.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-slate-600">
                    {researchCase.scenario}
                  </p>
                  <p className="text-sm font-medium text-indigo-700">{researchCase.hook}</p>
                </button>
              ))}
            </div>

            {selectedCase && selectedSimulation && (
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
                  Caso seleccionado
                </p>
                <h3 className="mb-3 text-2xl font-bold">{selectedCase.title}</h3>
                <p className="text-sm leading-relaxed text-slate-200">{selectedCase.question}</p>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-400"
                >
                  Construir diseno metodologico
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && selectedCase && selectedSimulation && (
          <div className="animate-fade-in-up space-y-6">
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-2xl md:p-8">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-indigo-200">
                    Diseno metodologico
                  </p>
                  <h3 className="text-2xl font-bold md:text-3xl">{selectedCase.title}</h3>
                </div>
                <span className="inline-flex w-fit rounded-full border border-indigo-300/30 bg-indigo-400/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
                  {selectedCase.method}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CaseInfoCard icon={Target} label="Objetivo" text={selectedSimulation.objective} />
                <CaseInfoCard
                  icon={Lightbulb}
                  label={selectedSimulation.focusLabel}
                  text={selectedSimulation.focus}
                />
                <CaseInfoCard icon={Users} label="Muestra" text={selectedSimulation.sample} />
                <CaseInfoCard
                  icon={ClipboardList}
                  label="Procedimiento"
                  text={selectedSimulation.procedure}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Layers size={22} className="text-indigo-600" />
                <h4 className="text-lg font-bold text-slate-900">Variables, instrumentos y sesgo</h4>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <VariableCard
                  label="Variable independiente"
                  value={selectedCase.variables.independent}
                />
                <VariableCard
                  label="Variable dependiente"
                  value={selectedCase.variables.dependent}
                />
                <VariableCard
                  label="Variables de control"
                  value={selectedCase.variables.control}
                />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <VariableCard label="Instrumentos" value={selectedCase.instruments} />
                <VariableCard label="Sesgo o limitacion" value={selectedCase.bias} />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RotateCcw size={18} />
                Cambiar caso
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Pasar a ejecucion
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && selectedCase && selectedSimulation && (
          <div className="animate-fade-in-up rounded-3xl border border-purple-100 bg-purple-50 p-8 text-center">
            <FlaskConical
              size={68}
              className={`mx-auto mb-6 text-purple-600 ${running ? 'animate-bounce' : ''}`}
            />
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-purple-500">
              {selectedCase.method}
            </p>
            <h3 className="mb-3 text-2xl font-bold text-slate-900">
              {selectedSimulation.executionLabel}
            </h3>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600">
              {selectedSimulation.executionText}
            </p>

            <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/60 bg-white/80 p-4 text-left shadow-sm">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                Pregunta del estudio
              </p>
              <p className="text-sm leading-relaxed text-slate-700">{selectedCase.question}</p>
            </div>

            {!running ? (
              <button
                type="button"
                onClick={runSimulation}
                className="mx-auto mt-8 flex items-center justify-center gap-3 rounded-xl bg-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-purple-700"
              >
                <Play size={22} />
                Ejecutar simulacion
              </button>
            ) : (
              <div className="mt-8 flex flex-col items-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
                <p className="mt-4 text-sm font-medium text-slate-600">
                  Organizando datos y preparando hallazgos...
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && selectedCase && selectedSimulation && (
          <div className="animate-fade-in-up space-y-6">
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-700">
                    Hallazgos simulados
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCase.title}</h3>
                </div>
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700 shadow-sm">
                  {selectedCase.method}
                </span>
              </div>

              {renderResults()}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-indigo-200">
                  Lectura metodologica
                </p>
                <div className="space-y-4 text-sm leading-relaxed text-slate-200">
                  <div>
                    <p className="mb-1 font-semibold text-white">Insight principal</p>
                    <p>{selectedSimulation.keyInsight}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-white">Discusion posible</p>
                    <p>{selectedSimulation.discussion}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                  Cierre del estudio
                </p>
                <div className="space-y-4 text-sm leading-relaxed text-slate-700">
                  <div>
                    <p className="mb-1 font-semibold text-slate-900">Limitacion</p>
                    <p>{selectedSimulation.limitation}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-semibold text-slate-900">Comunicacion</p>
                    <p>{selectedSimulation.communication}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <RotateCcw size={18} />
                Ajustar diseno
              </button>
              <button
                type="button"
                onClick={() => onUseCase(selectedCase.seedObservation)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
              >
                Llevar al Disenador con IA
                <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={resetSimulation}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white transition-colors hover:bg-slate-800"
              >
                <RotateCcw size={18} />
                Reiniciar simulador
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ConceptItem = ({ label, val, sub }) => (
  <div className="border-b border-gray-700 pb-3">
    <div className="mb-1 flex items-end justify-between">
      <span className="text-sm font-bold uppercase tracking-tight text-indigo-400">{label}</span>
      <span className="font-mono text-[10px] italic text-gray-500">{sub}</span>
    </div>
    <p className="text-sm text-gray-300">{val}</p>
  </div>
);

const AiDesignerTab = ({ observation, onObservationChange }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!observation.trim()) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      setError('Configura VITE_GEMINI_API_KEY para usar el Diseñador con IA.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = `Eres un experto metodologo cientifico. Analiza la observacion del usuario y genera un diseño experimental exhaustivo.
    Responde UNICAMENTE en formato JSON valido con estas claves:
    - resumen: Un parrafo resumiendo la observacion del usuario.
    - metodo: Un objeto con: pregunta, hipotesis, experimentacion, analisis_posible, conclusion_posible, comunicacion_posible.
    - conceptos: Un objeto con: variable_independiente, variable_dependiente, variables_control, grupo_control, grupo_experimental, sesgo_posible, correlacion_potencial.
    Asegurate de que los textos sean educativos y claros en espanol.`;

    const payload = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ parts: [{ text: `Observacion del usuario: ${observation}` }] }],
      generationConfig: { responseMimeType: 'application/json' },
    };

    const fetchWithRetry = async (retries = 5) => {
      for (let index = 0; index < retries; index += 1) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('API Error');
          return await response.json();
        } catch (fetchError) {
          if (index === retries - 1) throw fetchError;
          await new Promise((resolve) => {
            setTimeout(resolve, 1000 * 2 ** index);
          });
        }
      }

      return null;
    };

    try {
      const data = await fetchWithRetry();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response');
      const normalizedText = text.replace(/```json|```/g, '').trim();
      setResult(JSON.parse(normalizedText));
    } catch {
      setError('No se pudo conectar con el laboratorio de IA. Reintenta pronto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-b-lg rounded-tr-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-in-up mb-8 text-center">
          <Bot size={48} className="mx-auto mb-4 text-indigo-600" />
          <h2 className="text-2xl font-bold text-gray-800">Diseñador Experimental con IA</h2>
          <p className="mt-2 text-gray-600">
            Convierte cualquier duda cotidiana en un estudio cientifico formal.
          </p>
        </div>

        <div className="mb-8 rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-inner">
          <textarea
            className="w-full resize-none rounded-lg border border-gray-300 p-4 shadow-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500"
            rows="3"
            placeholder="Ej: He notado que las hormigas ignoran las migas de pan integral pero van directo a las de pan blanco..."
            value={observation}
            onChange={(event) => {
              setError('');
              setResult(null);
              onObservationChange(event.target.value);
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !observation.trim()}
            type="button"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? 'Procesando metodo cientifico...' : 'Generar Informe Cientifico Completo'}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-3 text-center text-red-700">{error}</div>
        )}

        {result && (
          <div className="animate-fade-in-up space-y-8 pb-10">
            <section className="rounded-2xl border-l-4 border-indigo-500 bg-white p-6 shadow-sm">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-gray-800">
                <ClipboardList size={20} className="text-indigo-500" />
                Contexto de la Investigacion
              </h3>
              <p className="leading-relaxed text-gray-700 italic">{result.resumen}</p>
            </section>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <Layers size={24} className="text-indigo-600" /> El Metodo Aplicado
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    label: 'Pregunta',
                    val: result.metodo.pregunta,
                    icon: HelpCircle,
                    color: 'text-blue-600',
                  },
                  {
                    label: 'Hipotesis',
                    val: result.metodo.hipotesis,
                    icon: Lightbulb,
                    color: 'text-yellow-600',
                  },
                  {
                    label: 'Experimento',
                    val: result.metodo.experimentacion,
                    icon: TestTube,
                    color: 'text-purple-600',
                  },
                  {
                    label: 'Analisis',
                    val: result.metodo.analisis_posible,
                    icon: LineChart,
                    color: 'text-emerald-600',
                  },
                  {
                    label: 'Conclusion',
                    val: result.metodo.conclusion_posible,
                    icon: CheckSquare,
                    color: 'text-red-600',
                  },
                  {
                    label: 'Comunicacion',
                    val: result.metodo.comunicacion_posible,
                    icon: Share2,
                    color: 'text-indigo-600',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-indigo-200"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <item.icon size={18} className={item.color} />
                      <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-8 text-white shadow-2xl">
              <div className="absolute right-0 top-0 p-8 opacity-10">
                <Info size={120} />
              </div>
              <h3 className="relative z-10 mb-6 flex items-center gap-2 text-2xl font-bold">
                <BookOpen size={28} className="text-indigo-400" /> Analisis de Variables y Conceptos
              </h3>

              <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <ConceptItem
                    label="Variable Independiente"
                    val={result.conceptos.variable_independiente}
                    sub="La Causa"
                  />
                  <ConceptItem
                    label="Variable Dependiente"
                    val={result.conceptos.variable_dependiente}
                    sub="El Efecto"
                  />
                  <ConceptItem
                    label="Variables de Control"
                    val={result.conceptos.variables_control}
                    sub="Lo Constante"
                  />
                </div>
                <div className="space-y-4">
                  <ConceptItem
                    label="Grupos (Control/Exp)"
                    val={`${result.conceptos.grupo_control} vs ${result.conceptos.grupo_experimental}`}
                    sub="Comparativa"
                  />
                  <ConceptItem
                    label="Posible Sesgo"
                    val={result.conceptos.sesgo_posible}
                    sub="Riesgo de Error"
                  />
                  <ConceptItem
                    label="Correlacion Sugerida"
                    val={result.conceptos.correlacion_potencial}
                    sub="Patron Observado"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('method');
  const [aiObservation, setAiObservation] = useState('');

  const openCaseInAiDesigner = (seedObservation) => {
    setAiObservation(seedObservation);
    setActiveTab('ai-designer');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans md:p-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="animate-pulse rounded-2xl bg-indigo-600 p-4 text-white shadow-lg">
            <FlaskConical size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Fundamentos de la Investigacion
            </h1>
            <p className="mt-1 text-lg text-gray-600">
              Explora la ciencia con Inteligencia Artificial.
            </p>
          </div>
        </header>

        <div className="hide-scrollbar flex overflow-x-auto border-b border-gray-200">
          <TabButton
            active={activeTab === 'method'}
            onClick={() => setActiveTab('method')}
            icon={Layers}
            label="El Metodo"
          />
          <TabButton
            active={activeTab === 'methods-types'}
            onClick={() => setActiveTab('methods-types')}
            icon={Target}
            label="Tipos de Metodos"
          />
          <TabButton
            active={activeTab === 'instruments'}
            onClick={() => setActiveTab('instruments')}
            icon={Microscope}
            label="Instrumentos"
          />
          <TabButton
            active={activeTab === 'concepts'}
            onClick={() => setActiveTab('concepts')}
            icon={BookOpen}
            label="Conceptos"
          />
          <TabButton
            active={activeTab === 'cases'}
            onClick={() => setActiveTab('cases')}
            icon={ClipboardList}
            label="Casos"
          />
          <TabButton
            active={activeTab === 'article-structure'}
            onClick={() => setActiveTab('article-structure')}
            icon={BookOpen}
            label="Articulo"
          />
          <TabButton
            active={activeTab === 'simulator'}
            onClick={() => setActiveTab('simulator')}
            icon={TestTube}
            label="Simulador"
          />
          <TabButton
            active={activeTab === 'ai-designer'}
            onClick={() => setActiveTab('ai-designer')}
            icon={Sparkles}
            label="Diseñador con IA"
          />
        </div>

        <div className="overflow-hidden rounded-b-xl rounded-tr-xl shadow-xl">
          {activeTab === 'method' && <ScientificMethodTab />}
          {activeTab === 'methods-types' && <MethodsTypesTab />}
          {activeTab === 'instruments' && <InstrumentsTab />}
          {activeTab === 'concepts' && <ConceptsTab />}
          {activeTab === 'cases' && <CasesTab onUseCase={openCaseInAiDesigner} />}
          {activeTab === 'article-structure' && <ArticleStructureTab />}
          {activeTab === 'simulator' && <SimulatorTab onUseCase={openCaseInAiDesigner} />}
          {activeTab === 'ai-designer' && (
            <AiDesignerTab
              observation={aiObservation}
              onObservationChange={setAiObservation}
            />
          )}
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          <p>
            Herramienta educativa diseñada por el profesor Santiago Betancur Zapata para
            fomentar el pensamiento critico y experimental.
          </p>
          <p className="mt-2">
            Visita:{' '}
            <a
              href="https://santiagobetancur.site"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-indigo-500 transition-colors hover:text-indigo-600"
            >
              santiagobetancur.site
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}