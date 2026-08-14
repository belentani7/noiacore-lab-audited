/*
 * NOIACORE FACTORY / ESCAPE ROOM — 15 CONCONNECTED TOOLS & AGENTS
 * Cada herramienta ofrece material denso para varios minutos de exploración,
 * conectadas entre sí mediante ManusCore y la Mente de la Máquina.
 */

export interface ToolDef {
  id: string;
  name: string;
  icon: string;
  category: 'core' | 'dev' | 'office' | 'ai' | 'security' | 'creative';
  description: string;
  initialState?: any;
}

export const FACTORY_TOOLS: ToolDef[] = [
  {
    id: 'manuscore',
    name: 'ManusCore OS',
    icon: '',
    category: 'core',
    description: 'Kernel central de telemetría, monitoreo de nodos y orquestación de la fábrica.'
  },
  {
    id: 'claude_code',
    name: 'Claude Code // Noiacore Edition',
    icon: '',
    category: 'dev',
    description: 'Entorno de desarrollo asistido por IA para auditoría de código del núcleo.'
  },
  {
    id: 'powershell',
    name: 'NoiaPowerShell v7.4',
    icon: '',
    category: 'dev',
    description: 'Consola de comandos de sistema para diagnóstico de servidores y parches de red.'
  },
  {
    id: 'word',
    name: 'NoiaWriter // Manifiesto v2',
    icon: '',
    category: 'office',
    description: 'Procesador de textos con documentos confidenciales sobre el origen del núcleo.'
  },
  {
    id: 'excel',
    name: 'NoiaSheets // Nómina y Empleados',
    icon: '',
    category: 'office',
    description: 'Plantilla de control de personal y métricas de rendimiento de la fábrica.'
  },
  {
    id: 'photoshop',
    name: 'NoiaShop // Editor de Capas',
    icon: '',
    category: 'creative',
    description: 'Estudio de manipulación de texturas y ajuste cromático de la retícula.'
  },
  {
    id: 'dalle',
    name: 'NoiaDALL-E // Generador Visual',
    icon: '',
    category: 'creative',
    description: 'Generador de patrones visuales y estímulos fotorrealistas para el cliente.'
  },
  {
    id: 'noiaclaw',
    name: 'NoiaClaw // Agente Cangrejo Azul',
    icon: '',
    category: 'ai',
    description: 'Agente autónomo con avatar de cangrejo azul muy oscuro (#050b14) para rastreo de anomalías.'
  },
  {
    id: 'machine_mind',
    name: 'Mente de la Máquina // Shaders 3D',
    icon: '',
    category: 'core',
    description: 'Visualizador en vivo de shaders conexionistas y flujos neuronales de la IA.'
  },
  {
    id: 'terminal_ai',
    name: 'Manus AI // Consultor Central',
    icon: '',
    category: 'ai',
    description: 'Asistente general de razonamiento lógico y resolución del escape room.'
  },
  {
    id: 'vault_sec',
    name: 'SecureVault // Cifrado AES-256',
    icon: '',
    category: 'security',
    description: 'Caja fuerte de credenciales, llaves privadas y tokens de acceso maestro.'
  },
  {
    id: 'audio_lab',
    name: 'Resonance // Sintetizador Frecuencial',
    icon: '',
    category: 'creative',
    description: 'Generador de frecuencias binaurales y ruido blanco para calibración ambiental.'
  },
  {
    id: 'network_map',
    name: 'Topology // Topología de Red',
    icon: '',
    category: 'security',
    description: 'Mapa interactivo de nodos activos, firewalls y rutas de escape de la fábrica.'
  },
  {
    id: 'inspector',
    name: 'DOM Inspector // Depurador de Realidad',
    icon: '',
    category: 'dev',
    description: 'Inspección de elementos en tiempo real y alteración de variables de entorno.'
  },
  {
    id: 'escape_puzzle',
    name: 'Escape Sequence // Terminal Final',
    icon: '',
    category: 'core',
    description: 'Secuencia de desencriptación para abrir la puerta principal de la fábrica.'
  }
];
