export interface ClientProfile {
  id: string;
  name: string;
  signature: string;
  reasoning: string;
  solutionTitle: string;
  solutionDescription: string;
  modulesRecommended: string[];
}

export const SCAN_PHASES = [
  "INICIALIZANDO NÚCLEO NEURONAL EN NEGRO ABSOLUTO...",
  "ESTABLECIENDO ENLACE DE BAJA LATENCIA CON EL CLIENTE...",
  "ANALIZANDO PATRONES DE NAVEGACIÓN Y RESISTENCIA AL RUIDO...",
  "VERIFICANDO FIRMA DE IDENTIDAD EN LA RED DE PERCEPCIÓN...",
  "INFORME DE CAMPO GENERADO. ESPERANDO CALIBRACIÓN..."
];

export const CLIENT_PROFILES: Record<string, ClientProfile> = {
  architect_strict: {
    id: 'architect_strict',
    name: 'Arquitectura de Alta Precisión',
    signature: 'Dominio estructural y supresión de redundancia ornamental.',
    reasoning: 'El análisis de su huella de interacción revela una intolerancia absoluta al ruido visual. Su enfoque requiere superficies monovolumen, reducción tipográfica estricta (Space Grotesk + JetBrains Mono) y un sistema que responda con la velocidad de un cálculo matemático puro.',
    solutionTitle: 'Despliegue de Monolito Cognitivo Asimétrico',
    solutionDescription: 'Implementación de un entorno de trabajo silencioso con retícula ortogonal de 12 columnas, gestión de estados sin fricción y supresión total de elementos decorativos no funcionales.',
    modulesRecommended: ['MÓDULO 01: LENTE GRAVITACIONAL', 'MÓDULO 04: MATRIZ DE AISLAMIENTO']
  },
  autonomous_fui: {
    id: 'autonomous_fui',
    name: 'Interfaz Autónoma FUI',
    signature: 'Sistemas vivos que anticipan la intención del operador.',
    reasoning: 'Sus respuestas indican una búsqueda de interfaces que no requieran instrucción. La IA asume el control adaptativo de la densidad informativa, desplegando telemetría solo cuando la complejidad del entorno lo demanda.',
    solutionTitle: 'Núcleo de Percepción Adaptativa en Tiempo Real',
    solutionDescription: 'Activación de motores de renderizado de partículas sensibles al operador, cálculo predictivo de estados y visualización de flujos de datos sin latencia perceptible.',
    modulesRecommended: ['MÓDULO 02: TELEMETRÍA VIVA', 'MÓDULO 07: SINTETIZADOR DE SEÑALES']
  },
  silent_vault: {
    id: 'silent_vault',
    name: 'Bóveda de Silencio Absoluto',
    signature: 'Seguridad ontológica y anulación de interferencias externas.',
    reasoning: 'El perfil detectado corresponde a una entidad que opera bajo estricta confidencialidad y aislamiento acústico/visual. Se prioriza el negro absoluto (`#000000`), la ausencia de animaciones intrusivas y la encriptación de cada consulta en el cliente.',
    solutionTitle: 'Protocolo de Aislamiento Anecoico',
    solutionDescription: 'Arquitectura web sellada con compresión de metadatos, ausencia de telemetría de terceros y un canal cifrado de transmisión directa con el núcleo.',
    modulesRecommended: ['MÓDULO 05: CÁMARA DE ECO', 'MÓDULO 09: PROTOCOLO DE CIERRE']
  }
};
