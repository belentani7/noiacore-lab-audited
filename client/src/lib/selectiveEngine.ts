export interface ClientProfile {
  id: string;
  name: string;
  signature: string;
  reasoning: string;
  solutionTitle: string;
  solutionDescription: string;
  modulesRecommended: string[];
  opticalIllusionFocus: string;
}

export const SCAN_PHASES = [
  "INICIALIZANDO NÚCLEO EN NEGRO ABSOLUTO (#000000)...",
  "ESTABLECIENDO ENLACE DE BAJA LATENCIA CON EL CAMPO DE PERCEPCIÓN...",
  "ANALIZANDO PATRONES DE ATENCIÓN SELECTIVA Y TOLERANCIA AL RUIDO...",
  "VERIFICANDO FIRMA ONTOLÓGICA DEL CLIENTE (EXCEPCIÓN DETECTADA)...",
  "INFORME DE CAMPO GENERADO. SECUENCIA EDITORIAL DISPONIBLE..."
];

export const CLIENT_PROFILES: Record<string, ClientProfile> = {
  architect_strict: {
    id: 'architect_strict',
    name: 'Geometría y Supresión de Ruido',
    signature: 'Estructura ortogonal monovolumen y supresión total de ornamentos.',
    reasoning: 'El análisis de su huella de acceso confirma una exigencia ontológica inusual. El cliente de esta vez no busca plantillas genéricas; exige superficies de negro absoluto, tipografía Space Grotesk e Inter en riguroso gris piedra, y un cálculo matemático de diseño donde el espacio vacío es el elemento principal.',
    solutionTitle: 'Monolito Cognitivo de Alta Precisión',
    solutionDescription: 'Despliegue de un entorno monovolumen con retícula de 12 columnas, eliminación de cromatismos superfluos y sincronización de estados sin latencia perceptible.',
    modulesRecommended: [
      'MÓDULO 01: LENTE GRAVITACIONAL Y HORIZONTE DE SUCESOS',
      'MÓDULO 04: MATRIZ DE AISLAMIENTO ANEXOICO',
      'MÓDULO 08: SUPRESIÓN DE INTERFERENCIAS VISUALES'
    ],
    opticalIllusionFocus: 'Patrones Moiré de alta frecuencia y distorsión espacial de rejilla de Hermann.'
  },
  autonomous_fui: {
    id: 'autonomous_fui',
    name: 'Interfaz Autónoma Sensible al Operador',
    signature: 'Sistemas vivos que anticipan la intención sin instrucción previa.',
    reasoning: 'Su interacción revela una preferencia por interfaces que respiran y responden de forma natural. El sistema reacciona a su pulso mediante partículas adaptativas, adaptando la densidad informativa en tiempo real y generando micro-recompensas de dopamina visual.',
    solutionTitle: 'Núcleo de Percepción Adaptativa y Estela Retiniana',
    solutionDescription: 'Activación de motores de renderizado de partículas sensibles al cursor, persistencia retiniana sutil (afterimage) y ciclos de expectativa-recompensa controlados.',
    modulesRecommended: [
      'MÓDULO 02: TELEMETRÍA VIVA Y OSCILOSCOPIO DE SEÑAL',
      'MÓDULO 06: ESTELA RETINIANA Y EFECTO AFTERIMAGE',
      'MÓDULO 09: NÚCLEO DE ILUSIÓN ÓPTICA DINÁMICA'
    ],
    opticalIllusionFocus: 'Ilusión de movimiento aparente (phi) y parpadeo cromático no uniforme.'
  },
  silent_vault: {
    id: 'silent_vault',
    name: 'Bóveda de Silencio y Aislamiento Absoluto',
    signature: 'Seguridad ontológica y encriptación de metadatos en el cliente.',
    reasoning: 'El perfil detectado opera bajo estricta confidencialidad. Se prioriza el negro absoluto (`#000000`), la ausencia absoluta de elementos ruidosos o llamadas de telemetría externa, y un canal cifrado de transmisión directa.',
    solutionTitle: 'Protocolo de Aislamiento Anecoico y Cifrado Local',
    solutionDescription: 'Arquitectura web sellada con compresión de metadatos, almacenamiento local autónomo y ausencia total de parpadeos o elementos externos.',
    modulesRecommended: [
      'MÓDULO 03: CÁMARA DE SILENCIO ABSOLUTO',
      'MÓDULO 07: BÓVEDA DE METADATOS CIFRADOS',
      'MÓDULO 10: PROTOCOLO DE CIERRE Y AUTODESTRUCCIÓN DE SESIÓN'
    ],
    opticalIllusionFocus: 'Figura-fondo ambigua y estabilidad cromática de baja saturación.'
  }
};
