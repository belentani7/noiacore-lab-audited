/* NOIACORE Design Reminder: El contenido debe sentirse como una consola editorial de investigación, no como un dashboard genérico. */
export type ModuleCategory = 'CORE' | 'SYSTEMS' | 'AGENTS' | 'LAB' | 'IMPACT';

export type NoiacoreModule = {
  id: string;
  index: string;
  title: string;
  label: string;
  category: ModuleCategory;
  statement: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  tone: 'blue' | 'orange' | 'white';
  tags: string[];
  signal: string;
};

export const modules: NoiacoreModule[] = [
  {
    id: 'silencio',
    index: '01',
    title: 'Silencio',
    label: 'ORIGEN',
    category: 'CORE',
    statement: 'Todo comienza en lo que aún no se ve.',
    description: 'Diseñamos condiciones de atención para que una idea pueda emerger antes de ser nombrada. El silencio no es una ausencia: es el primer material del sistema.',
    metric: '0.03',
    metricLabel: 'ms / latencia perceptiva',
    image: '/manus-storage/noiacore-hero_5f6d0c5f.jpg',
    tone: 'blue',
    tags: ['atención', 'umbral', 'ritual'],
    signal: 'WAITING_FOR_SIGNAL',
  },
  {
    id: 'percepcion',
    index: '02',
    title: 'Percepción',
    label: 'LECTURA',
    category: 'LAB',
    statement: 'El sistema observa. Lo invisible se revela.',
    description: 'Convertimos el comportamiento en una superficie sensible. Cada gesto, pausa y desviación se traduce en una señal que permite adaptar la experiencia sin interrumpirla.',
    metric: '98.7',
    metricLabel: '% / resolución de señal',
    image: '/manus-storage/noiacore-orbit_bc01eda1.jpg',
    tone: 'blue',
    tags: ['visión', 'ritmo', 'respuesta'],
    signal: 'SIGNAL_LOCKED',
  },
  {
    id: 'curiosidad',
    index: '03',
    title: 'Curiosidad',
    label: 'PREGUNTA',
    category: 'AGENTS',
    statement: 'Una pregunta abre el camino.',
    description: 'Los agentes no buscan completar una tarea: buscan encontrar la próxima pregunta correcta. Así creamos exploraciones que se sienten personales, abiertas y precisas.',
    metric: '12.4k',
    metricLabel: 'nodos / hipótesis activas',
    image: '/manus-storage/noiacore-neural-atlas_bf7dca12.jpg',
    tone: 'orange',
    tags: ['agentes', 'hipótesis', 'búsqueda'],
    signal: 'QUERY_EXPANDING',
  },
  {
    id: 'hipotesis',
    index: '04',
    title: 'Hipótesis',
    label: 'INTENCIÓN',
    category: 'AGENTS',
    statement: 'Entendemos la intención antes del gesto.',
    description: 'Arquitecturas de inteligencia que trabajan entre contexto y posibilidad. Una hipótesis no predice el futuro; lo hace visible para poder diseñarlo.',
    metric: '3.2x',
    metricLabel: 'factor / claridad de decisión',
    image: '/manus-storage/noiacore-reference-dashboard_e8759298.png',
    tone: 'orange',
    tags: ['contexto', 'predicción', 'criterio'],
    signal: 'MODEL_CALIBRATED',
  },
  {
    id: 'adaptacion',
    index: '05',
    title: 'Adaptación',
    label: 'RESPUESTA',
    category: 'SYSTEMS',
    statement: 'El sistema se moldea a lo que necesitas.',
    description: 'Interfaces líquidas que cambian de densidad sin perder identidad. El usuario no aprende la máquina: la máquina aprende a acompañar al usuario.',
    metric: '91',
    metricLabel: '% / plasticidad de interfaz',
    image: '/manus-storage/noiacore-reference-grid_6b1356aa.png',
    tone: 'blue',
    tags: ['fluidez', 'contexto', 'sistema'],
    signal: 'ADAPTIVE_MODE_ON',
  },
  {
    id: 'sistemas',
    index: '06',
    title: 'Sistemas',
    label: 'ARQUITECTURA',
    category: 'SYSTEMS',
    statement: 'La arquitectura invisible sostiene el resultado.',
    description: 'Infraestructura, código y datos reunidos en una misma lógica. Diseñamos sistemas que parecen sencillos porque cada complejidad ya ha encontrado su lugar.',
    metric: '256',
    metricLabel: 'procesos / núcleo distribuido',
    image: '/manus-storage/noiacore-lab-corridor_16db8691.jpg',
    tone: 'white',
    tags: ['infraestructura', 'código', 'escala'],
    signal: 'RUNTIME_STABLE',
  },
  {
    id: 'laboratorio',
    index: '07',
    title: 'Laboratorio',
    label: 'ENSAYO',
    category: 'LAB',
    statement: 'Donde las ideas se convierten en experimentos.',
    description: 'Un entorno para probar futuros antes de comprometernos con ellos. Prototipamos narrativas, herramientas y comportamientos en ciclos cortos y observables.',
    metric: '44',
    metricLabel: 'experimentos / ciclo actual',
    image: '/manus-storage/noiacore-lab-corridor_16db8691.jpg',
    tone: 'white',
    tags: ['prototipo', 'ensayo', 'feedback'],
    signal: 'LABORATORY_OPEN',
  },
  {
    id: 'creacion',
    index: '08',
    title: 'Creación',
    label: 'GÉNESIS',
    category: 'IMPACT',
    statement: 'Construimos juntos lo que todavía no existe.',
    description: 'El diseño es una práctica de coautoría. Las herramientas abren posibilidades; la imaginación decide qué merece convertirse en un sistema.',
    metric: '∞',
    metricLabel: 'posibilidades / campo abierto',
    image: '/manus-storage/noiacore-orbit_bc01eda1.jpg',
    tone: 'orange',
    tags: ['coautoría', 'visión', 'futuro'],
    signal: 'GENERATIVE_FIELD',
  },
  {
    id: 'propuesta',
    index: '09',
    title: 'Propuesta',
    label: 'DIRECCIÓN',
    category: 'IMPACT',
    statement: 'La solución hecha a la medida de tu intención.',
    description: 'Alineamos estrategia, comportamiento y tecnología en una propuesta que puede explicar su valor sin perder su misterio.',
    metric: '17',
    metricLabel: 'criterios / síntesis de decisión',
    image: '/manus-storage/noiacore-neural-atlas_bf7dca12.jpg',
    tone: 'blue',
    tags: ['estrategia', 'síntesis', 'dirección'],
    signal: 'PROPOSAL_READY',
  },
  {
    id: 'impacto',
    index: '10',
    title: 'Impacto',
    label: 'RESONANCIA',
    category: 'IMPACT',
    statement: 'Tecnología que mueve. Personas que transforman.',
    description: 'Medimos el impacto no solo por lo que el sistema hace, sino por lo que permite que otros hagan después. El resultado debe continuar cuando la interfaz desaparece.',
    metric: '4.8x',
    metricLabel: 'resonancia / objetivo compartido',
    image: '/manus-storage/noiacore-hero_5f6d0c5f.jpg',
    tone: 'orange',
    tags: ['resonancia', 'cambio', 'legado'],
    signal: 'IMPACT_PROPAGATING',
  },
];

export const navItems = [
  { id: 'lab', label: 'LAB', index: '01' },
  { id: 'systems', label: 'SYSTEMS', index: '02' },
  { id: 'projects', label: 'PROJECTS', index: '03' },
  { id: 'manifesto', label: 'MANIFESTO', index: '04' },
  { id: 'contact', label: 'CONTACT', index: '05' },
];

export const signalFeed = [
  { time: '00:04:22', type: 'CORE', message: 'Apertura de canal sensorial · latencia estable', tone: 'blue' },
  { time: '00:03:57', type: 'LAB', message: 'Nuevo patrón detectado en la red de percepción', tone: 'orange' },
  { time: '00:03:11', type: 'SYSTEMS', message: 'Nodo 14 sincronizado con la matriz principal', tone: 'blue' },
  { time: '00:02:45', type: 'AGENTS', message: 'Hipótesis en expansión · 12.4k conexiones', tone: 'white' },
  { time: '00:01:28', type: 'IMPACT', message: 'Resonancia superando el umbral previsto', tone: 'orange' },
];

export const systemMetrics = [
  { label: 'MEMORIA', value: 98, color: 'blue', suffix: '%' },
  { label: 'APRENDIZAJE', value: 73, color: 'violet', suffix: '%' },
  { label: 'ADAPTACIÓN', value: 91, color: 'green', suffix: '%' },
  { label: 'CREATIVIDAD', value: 87, color: 'orange', suffix: '%' },
];

export const commandResponses: Record<string, string[]> = {
  help: ['COMMAND INDEX READY', 'status    inspect runtime health', 'scan      reveal active signals', 'matrix    enter cognitive field', 'manifest  print the core principle', 'clear     reset local console'],
  status: ['ALL SYSTEMS NOMINAL', 'core_integrity  99.98%', 'signal_latency   0.03ms', 'active_nodes     1,284', 'runtime          v4.2.0 / OMEGA'],
  scan: ['SCANNING THE FIELD...', 'signal_01  PERCEPTION / LOCKED', 'signal_02  CURIOSITY / EXPANDING', 'signal_03  IMPACT / PROPAGATING'],
  matrix: ['COGNITIVE FIELD OPEN', 'You are inside the interface.', 'Move slowly. Let the system observe the gap between intention and action.'],
  manifest: ['CORE IS INVISIBLE.', 'IMPACT IS INEVITABLE.', 'WE ARCHITECT THE SPACE BETWEEN THEM.'],
};
