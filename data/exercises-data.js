/**
 * Antigravity Rutinas - Base de Datos Maestra de Ejercicios
 * Contiene ejercicios para todas las zonas y propósitos solicitados:
 * - Normales: Piernas, Brazo, Antebrazo, Cuello, Espalda
 * - Neurodinámicos: Lumbar, Dorsal, Cuello, Hombros
 * - Terapéuticos, Calentamiento y Vuelta a la Calma
 * Explicación detallada en 3 fases: Inicio, Ejecución, Final y Errores comunes.
 */

(function(global) {
  'use strict';

  const AREAS = [
    { id: 'todas', label: 'Todas las Zonas', icon: '🌐' },
    { id: 'piernas', label: 'Piernas / Tren Inf.', icon: '🦵' },
    { id: 'brazo', label: 'Brazos (Bíceps/Tríceps)', icon: '💪' },
    { id: 'antebrazo', label: 'Antebrazo y Manos', icon: '✋' },
    { id: 'cuello', label: 'Cuello / Cervical', icon: '🧠' },
    { id: 'espalda', label: 'Espalda / Columna', icon: '🔙' },
    { id: 'hombros', label: 'Hombros y Escápulas', icon: '🛡️' },
    { id: 'lumbar', label: 'Zona Lumbar', icon: '🦴' },
    { id: 'dorsal', label: 'Zona Dorsal / Torácica', icon: '🔄' },
    { id: 'core', label: 'Core / Abdomen / Glúteos', icon: '🎯' }
  ];

  const PURPOSES = [
    { id: 'todos', label: 'Todos los Propósitos', icon: '📋' },
    { id: 'normal', label: 'Normal / Fuerza y Tono', icon: '🏋️', color: '#10b981' },
    { id: 'neurodinamico', label: 'Neurodinámico (Nervios)', icon: '⚡', color: '#8b5cf6' },
    { id: 'terapeutico', label: 'Terapéutico / Movilidad', icon: '🩺', color: '#06b6d4' },
    { id: 'calentamiento', label: 'Calentamiento Activo', icon: '🔥', color: '#f59e0b' },
    { id: 'estiramiento', label: 'Estiramientos / Calma', icon: '🧘', color: '#3b82f6' }
  ];

  const INFOGRAPHICS = [
    {
      id: 'info-fullbody-casa',
      title: 'Rutina Full Body en Casa',
      duration: '45 minutos',
      subtitle: 'Equipo mínimo · Resultados reales · Calentamiento, Piernas, Torso, Circuito y Core',
      file: 'assets/infografias/rutina-fullbody-casa.png',
      tag: 'Full Body'
    },
    {
      id: 'info-fullbody-fuerza',
      title: 'Lunes Rutina Full Body Fuerza',
      duration: '45 minutos',
      subtitle: 'Mochila con carga progresiva · Trabajo compuesto de empuje, tracción y piernas',
      file: 'assets/infografias/rutina-fullbody-fuerza.png',
      tag: 'Fuerza'
    },
    {
      id: 'info-terap-inferior',
      title: 'Rutina Terapéutica Región Inferior',
      duration: '45 minutos',
      subtitle: 'Movilidad articular, fuerza controlada y estabilidad lumbo-pélvica y rodillas',
      file: 'assets/infografias/rutina-terapeutica-inferior.png',
      tag: 'Terapéutico'
    },
    {
      id: 'info-terap-superior-ligas',
      title: 'Rutina Terapéutica Región Superior (con ligas)',
      duration: '45 minutos',
      subtitle: 'Control escapular, hombros sanos, cuello sin tensión y resistencia elástica',
      file: 'assets/infografias/rutina-terapeutica-superior-ligas.png',
      tag: 'Terapéutico'
    },
    {
      id: 'info-terap-superior-sinligas',
      title: 'Rutina Terapéutica Región Superior (sin ligas)',
      duration: '45 minutos',
      subtitle: 'Movilidad activa en pared y silla, peso corporal y botellas de agua ligeras',
      file: 'assets/infografias/rutina-terapeutica-superior-sinligas.png',
      tag: 'Terapéutico'
    },
    {
      id: 'info-terap-cuerpocompleto',
      title: 'Rutina Terapéutica Cuerpo Completo (cuidado articular)',
      duration: '45 minutos',
      subtitle: 'Movimiento inteligente de bajo impacto adaptado para proteger articulaciones sensibles',
      file: 'assets/infografias/rutina-terapeutica-cuerpocompleto.png',
      tag: 'Terapéutico'
    }
  ];

  // Helper generador de diagramas vectoriales para figuras de ejercicios
  function generateSvgFigure(kind) {
    const bg = '#0f172a';
    const bodyTone = '#38bdf8';
    const accentTone = '#f59e0b';
    const nerveTone = '#a855f7';
    const jointTone = '#ffffff';

    switch(kind) {
      case 'squat':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <line x1="20" y1="160" x2="220" y2="160" stroke="#334155" stroke-width="3" stroke-dasharray="4 4"/>
          <!-- Figura de pie guía transparente -->
          <circle cx="60" cy="50" r="10" fill="#475569" opacity="0.4"/>
          <line x1="60" y1="60" x2="60" y2="110" stroke="#475569" stroke-width="5" stroke-linecap="round" opacity="0.4"/>
          <line x1="60" y1="110" x2="60" y2="160" stroke="#475569" stroke-width="5" stroke-linecap="round" opacity="0.4"/>
          <!-- Figura en sentadilla activa -->
          <circle cx="160" cy="65" r="12" fill="${bodyTone}"/>
          <!-- Tronco en 45 grados neutro -->
          <line x1="160" y1="77" x2="140" y2="115" stroke="${bodyTone}" stroke-width="8" stroke-linecap="round"/>
          <!-- Muslos horizontales -->
          <line x1="140" y1="115" x2="185" y2="115" stroke="${accentTone}" stroke-width="8" stroke-linecap="round"/>
          <!-- Pantorrillas paralelas al tronco -->
          <line x1="185" y1="115" x2="175" y2="160" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <!-- Pie firme -->
          <line x1="165" y1="160" x2="190" y2="160" stroke="${bodyTone}" stroke-width="5" stroke-linecap="round"/>
          <!-- Brazos al frente equilibrando -->
          <line x1="155" y1="85" x2="195" y2="90" stroke="${bodyTone}" stroke-width="5" stroke-linecap="round"/>
          <!-- Flecha de vector de empuje talones -->
          <path d="M140 135 L140 100" stroke="#10b981" stroke-width="3" marker-end="url(#arrow)" fill="none"/>
          <text x="120" y="28" fill="#94a3b8" font-size="11" text-anchor="middle" font-family="sans-serif">Empuja con talones · Espalda neutra</text>
        </svg>`;

      case 'lunge':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <line x1="20" y1="160" x2="220" y2="160" stroke="#334155" stroke-width="3"/>
          <circle cx="120" cy="45" r="11" fill="${bodyTone}"/>
          <line x1="120" y1="56" x2="120" y2="105" stroke="${bodyTone}" stroke-width="8" stroke-linecap="round"/>
          <!-- Pierna delantera 90 grados -->
          <line x1="120" y1="105" x2="155" y2="115" stroke="${accentTone}" stroke-width="7" stroke-linecap="round"/>
          <line x1="155" y1="115" x2="155" y2="160" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <!-- Pierna trasera 90 grados hacia abajo -->
          <line x1="120" y1="105" x2="80" y2="125" stroke="${accentTone}" stroke-width="7" stroke-linecap="round"/>
          <line x1="80" y1="125" x2="80" y2="155" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <circle cx="80" cy="155" r="4" fill="${jointTone}"/>
          <text x="120" y="26" fill="#94a3b8" font-size="11" text-anchor="middle">Zancada 90° / 90° · Tronco vertical</text>
        </svg>`;

      case 'slump':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <!-- Silla -->
          <line x1="70" y1="120" x2="120" y2="120" stroke="#64748b" stroke-width="5"/>
          <line x1="70" y1="80" x2="70" y2="160" stroke="#64748b" stroke-width="5"/>
          <line x1="115" y1="120" x2="115" y2="160" stroke="#64748b" stroke-width="5"/>
          <line x1="20" y1="160" x2="220" y2="160" stroke="#334155" stroke-width="2"/>
          <!-- Persona sentada -->
          <circle cx="85" cy="70" r="10" fill="${nerveTone}"/>
          <!-- Columna relajada / flexión cervical y dorsal -->
          <path d="M85 80 C80 95 85 110 95 120" stroke="${bodyTone}" stroke-width="7" fill="none" stroke-linecap="round"/>
          <!-- Muslo en silla -->
          <line x1="95" y1="120" x2="135" y2="120" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <!-- Pierna extendiéndose en deslizamiento -->
          <line x1="135" y1="120" x2="180" y2="130" stroke="${accentTone}" stroke-width="6" stroke-linecap="round"/>
          <!-- Pie en dorsiflexión -->
          <line x1="180" y1="130" x2="185" y2="118" stroke="${nerveTone}" stroke-width="5" stroke-linecap="round"/>
          <!-- Línea neural ciática pulsante -->
          <path d="M90 115 Q135 125 180 128" stroke="${nerveTone}" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
          <text x="120" y="26" fill="#c084fc" font-size="11" text-anchor="middle">Slump Ciático · Deslizamiento neural sin dolor</text>
        </svg>`;

      case 'openbook':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <line x1="20" y1="145" x2="220" y2="145" stroke="#334155" stroke-width="3"/>
          <!-- Decúbito lateral -->
          <circle cx="65" cy="125" r="9" fill="${bodyTone}"/>
          <!-- Tronco en suelo -->
          <line x1="74" y1="125" x2="125" y2="125" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <!-- Caderas y rodillas 90° -->
          <line x1="125" y1="125" x2="125" y2="105" stroke="${accentTone}" stroke-width="7" stroke-linecap="round"/>
          <line x1="125" y1="105" x2="155" y2="105" stroke="${accentTone}" stroke-width="6" stroke-linecap="round"/>
          <!-- Brazo abriéndose hacia atrás en arco -->
          <path d="M90 125 C100 80 150 70 175 80" stroke="${nerveTone}" stroke-width="5" stroke-linecap="round" fill="none"/>
          <circle cx="175" cy="80" r="4" fill="${jointTone}"/>
          <!-- Flecha de giro torácico -->
          <path d="M125 90 A 30 30 0 0 1 155 80" stroke="#f59e0b" stroke-width="2" fill="none"/>
          <text x="120" y="26" fill="#38bdf8" font-size="11" text-anchor="middle">Libro Abierto · Rotación Torácica Dorsal</text>
        </svg>`;

      case 'armnerve':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <circle cx="90" cy="55" r="12" fill="${bodyTone}"/>
          <!-- Tronco -->
          <line x1="90" y1="67" x2="90" y2="135" stroke="${bodyTone}" stroke-width="9" stroke-linecap="round"/>
          <!-- Cabeza inclinándose al lado opuesto -->
          <path d="M80 50 Q70 45 75 35" stroke="${nerveTone}" stroke-width="2" fill="none"/>
          <!-- Brazo extendido lateral en 90° con codo y muñeca en extensión -->
          <line x1="90" y1="78" x2="145" y2="82" stroke="${bodyTone}" stroke-width="6" stroke-linecap="round"/>
          <line x1="145" y1="82" x2="195" y2="85" stroke="${accentTone}" stroke-width="6" stroke-linecap="round"/>
          <!-- Mano en bandeja (dorsiflexión) -->
          <line x1="195" y1="85" x2="202" y2="70" stroke="${nerveTone}" stroke-width="5" stroke-linecap="round"/>
          <!-- Trayecto neural -->
          <path d="M90 65 Q145 75 200 80" stroke="${nerveTone}" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
          <text x="120" y="26" fill="#c084fc" font-size="11" text-anchor="middle">Neurodinámica Hombro/Brazo · Nervio Mediano</text>
        </svg>`;

      case 'neck':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <!-- Torso base -->
          <path d="M80 150 C90 120 110 110 120 110 C130 110 150 120 160 150 Z" fill="#1e293b" stroke="${bodyTone}" stroke-width="3"/>
          <!-- Cuello -->
          <line x1="120" y1="110" x2="120" y2="75" stroke="${bodyTone}" stroke-width="12" stroke-linecap="round"/>
          <!-- Cabeza alineada -->
          <circle cx="120" cy="55" r="18" fill="${bodyTone}"/>
          <!-- Flechas de doble sentido de retracción axial -->
          <path d="M120 30 L120 15" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
          <path d="M115 20 L120 12 L125 20" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M142 55 L158 55" stroke="${accentTone}" stroke-width="3" stroke-linecap="round"/>
          <!-- Papada suave / doble mentón -->
          <circle cx="112" cy="62" r="3" fill="${jointTone}"/>
          <text x="120" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Crecimiento axial de coronilla · Mentón neutro</text>
        </svg>`;

      case 'row':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <line x1="20" y1="160" x2="220" y2="160" stroke="#334155" stroke-width="2"/>
          <circle cx="80" cy="55" r="10" fill="${bodyTone}"/>
          <!-- Tronco inclinado a 45° con columna recta -->
          <line x1="80" y1="65" x2="130" y2="105" stroke="${bodyTone}" stroke-width="8" stroke-linecap="round"/>
          <!-- Piernas semiflexionadas -->
          <line x1="130" y1="105" x2="140" y2="135" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <line x1="140" y1="135" x2="135" y2="160" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <!-- Brazo jalando hacia cadera con codo pegado -->
          <line x1="100" y1="80" x2="120" y2="65" stroke="${accentTone}" stroke-width="6" stroke-linecap="round"/>
          <line x1="120" y1="65" x2="115" y2="90" stroke="${accentTone}" stroke-width="6" stroke-linecap="round"/>
          <!-- Carga/mochila -->
          <rect x="105" y="85" width="20" height="20" rx="4" fill="#64748b"/>
          <text x="120" y="26" fill="#38bdf8" font-size="11" text-anchor="middle">Remo Espalda · Conduce con los codos</text>
        </svg>`;

      case 'forearm':
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <!-- Mesa o muslo de apoyo -->
          <rect x="40" y="95" width="160" height="12" rx="4" fill="#334155"/>
          <!-- Antebrazo apoyado plano -->
          <rect x="50" y="80" width="90" height="14" rx="7" fill="${bodyTone}"/>
          <!-- Muñeca al borde y mano flexionando hacia arriba -->
          <circle cx="140" cy="87" r="5" fill="${jointTone}"/>
          <path d="M140 87 L175 65" stroke="${accentTone}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="175" cy="65" r="9" fill="#f59e0b"/>
          <!-- Flecha de flexión/extensión de muñeca -->
          <path d="M165 95 C180 90 185 75 180 60" stroke="#10b981" stroke-width="3" fill="none" stroke-linecap="round"/>
          <text x="120" y="26" fill="#94a3b8" font-size="11" text-anchor="middle">Muñeca aislada · Antebrazo completamente apoyado</text>
        </svg>`;

      default:
        return `<svg viewBox="0 0 240 180" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="240" height="180" fill="${bg}" rx="12"/>
          <circle cx="120" cy="50" r="14" fill="${bodyTone}"/>
          <line x1="120" y1="65" x2="120" y2="125" stroke="${bodyTone}" stroke-width="8" stroke-linecap="round"/>
          <line x1="120" y1="80" x2="80" y2="110" stroke="${bodyTone}" stroke-width="6" stroke-linecap="round"/>
          <line x1="120" y1="80" x2="160" y2="110" stroke="${bodyTone}" stroke-width="6" stroke-linecap="round"/>
          <line x1="120" y1="125" x2="95" y2="165" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <line x1="120" y1="125" x2="145" y2="165" stroke="${bodyTone}" stroke-width="7" stroke-linecap="round"/>
          <text x="120" y="26" fill="#94a3b8" font-size="11" text-anchor="middle">Movimiento Controlado y Fluido</text>
        </svg>`;
    }
  }

  const EXERCISES = [
    // ═══════════════════════════════════════════════════════════════════════
    // NORMALES: PIERNAS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'norm-pierna-sentadilla',
      title: 'Sentadilla con Peso Corporal / Mochila',
      area: 'piernas',
      purpose: 'normal',
      level: 'Básico a Intermedio',
      dose: '3 series × 12-15 repeticiones',
      rest: '45-60 segundos',
      svgKind: 'squat',
      targetMuscles: 'Cuádriceps, glúteos mayor y medio, aductores y core',
      phaseInicio: 'Párate erguido con los pies separados al ancho de los hombros o ligeramente más amplios, con las puntas de los pies rotadas 15° hacia afuera. Si usas mochila, abróchala al pecho para mantener el centro de gravedad pegado al cuerpo. Activa el abdomen inhalando hondo y ensanchando las costillas, con la mirada al frente y la columna larga.',
      phaseEjecucion: 'Inicia el movimiento desbloqueando simultáneamente caderas y rodillas. Desciende como si fueras a sentarte en una silla baja, llevando las caderas hacia atrás y abajo durante 3 segundos. Mantén el pecho orgulloso y las rodillas apuntando exactamente en la misma dirección que el segundo dedo del pie. Desciende hasta que los muslos queden al menos paralelos al suelo (o según tu movilidad sin redondear la espalda).',
      phaseFinal: 'Alcanzada la profundidad máxima, haz una micropausa de 1 segundo sin rebotar. Empuja con fuerza firme y pareja a través de todo el pie (talones y base del dedo gordo) exhalando el aire de forma sostenida para ascender en 1-2 segundos. Concluye arriba apretando brevemente los glúteos sin bloquear bruscamente las rodillas ni hiperextender la pelvis hacia adelante.',
      erroresComunes: 'Juntar las rodillas hacia adentro (valgo de rodilla), despegar los talones del piso, redondear la zona lumbar en el fondo de la sentadilla, o mirar hacia el techo sobrecargando la zona cervical.'
    },
    {
      id: 'norm-pierna-zancada',
      title: 'Zancada Hacia Atrás Controlada (Reverse Lunge)',
      area: 'piernas',
      purpose: 'normal',
      level: 'Intermedio',
      dose: '3 series × 8-10 reps por pierna',
      rest: '45 segundos',
      svgKind: 'lunge',
      targetMuscles: 'Glúteos, cuádriceps, isquiotibiales y estabilizadores de cadera',
      phaseInicio: 'Colócate de pie, con los pies paralelos al ancho de las caderas, manos en la cintura o sosteniendo una mochila al frente. El peso se concentra firmemente en la pierna delantera. Toma aire y activa el cinturón abdominal.',
      phaseEjecucion: 'Da un paso amplio y suave hacia atrás con una pierna, apoyando únicamente la bola del pie trasero. Flexiona ambas rodillas en ángulo de 90° descendiendo en vertical. La rodilla delantera debe permanecer alineada con el tobillo (sin proyectarse exageradamente más allá de los dedos) y la rodilla trasera desciende hasta quedar a 2-3 cm del suelo.',
      phaseFinal: 'Pausa brevemente en la posición baja. Empuja el piso firmemente con el talón de la pierna delantera mientras exhalas, impulsándote de regreso a la posición de inicio en un solo movimiento fluido y controlado. Apoya ambos pies juntos y repite con la misma pierna o alternando según la serie.',
      erroresComunes: 'Dar un paso muy corto que fuerza la rodilla anterior, golpear la rodilla trasera contra el suelo, o balancear el tronco de lado por falta de apoyo del core.'
    },
    {
      id: 'norm-pierna-pm-rumano',
      title: 'Peso Muerto Rumano con Mochila / Carga',
      area: 'piernas',
      purpose: 'normal',
      level: 'Intermedio',
      dose: '3 series × 10-12 repeticiones',
      rest: '60 segundos',
      svgKind: 'row',
      targetMuscles: 'Isquiotibiales (femorales), glúteo mayor, erectores espinales',
      phaseInicio: 'Párate de pie con los pies separados al ancho de las caderas. Sostén las asas de la mochila o mancuernas pegadas a los muslos con ambas manos. Hombros hacia atrás y abajo (retracción escapular activa), pecho alto, y rodillas con una flexión muy ligera (semiflexionadas pero bloqueadas en ese ángulo fijo).',
      phaseEjecucion: 'Inhala y empuja la pelvis directamente hacia atrás como si quisieras tocar una pared detrás de ti con los glúteos. El tronco desciende por flexión de cadera (bisagra), deslizando la carga pegadísima a los muslos y espinillas. Mantén la espalda como una tabla recta. Siente la tensión elástica y el estiramiento en la parte posterior de los muslos hasta justo debajo de la rodilla.',
      phaseFinal: 'Sin redondear la columna ni bajar más de la cuenta, exhala y contrae con firmeza los glúteos y femorales para empujar la pelvis hacia adelante hasta volver a la verticalidad. Termina con el torso perfectamente alineado sin arquear la espalda baja.',
      erroresComunes: 'Doblar las rodillas como si fuera una sentadilla, separar la carga del cuerpo aumentando la palanca lumbar, o mirar hacia arriba quebrando el cuello.'
    },
    {
      id: 'norm-pierna-gemelos',
      title: 'Elevación de Talones a Dos Pies o Unipodal',
      area: 'piernas',
      purpose: 'normal',
      level: 'Básico a Intermedio',
      dose: '3 series × 15-20 repeticiones',
      rest: '30 segundos',
      svgKind: 'squat',
      targetMuscles: 'Gastrocnemios (gemelos), sóleo y tendón de Aquiles',
      phaseInicio: 'De pie sobre el borde de un escalón firme o en el suelo plano, pies alineados al frente. Coloca las yemas de los dedos sobre una pared o respaldo de silla únicamente para equilibrio ligero. Columna erguida.',
      phaseEjecucion: 'Empuja con fuerza a través de la bola de los dedos del pie, elevando los talones lo más alto posible de forma vertical y explosiva en 1 segundo. Mantén la contracción en el punto más alto durante 2 segundos completos apretando las pantorrillas.',
      phaseFinal: 'Baja los talones de manera lenta y controlada en 3 segundos hasta sentir un estiramiento suave y seguro en el tendón de Aquiles. Detén el movimiento antes de rebotar y prepárate para la siguiente repetición.',
      erroresComunes: 'Rebotar rápidamente sin control excéntrico, doblar las rodillas para ayudarse, o desviar el peso hacia los bordes externos del pie en lugar de la base del dedo gordo.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NORMALES: BRAZO (BÍCEPS / TRÍCEPS)
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'norm-brazo-flexiones',
      title: 'Flexiones de Pecho y Tríceps (Suelo o Inclinadas)',
      area: 'brazo',
      purpose: 'normal',
      level: 'Intermedio (adaptable en mesa/pared)',
      dose: '3 series × 8-12 repeticiones',
      rest: '60 segundos',
      svgKind: 'default',
      targetMuscles: 'Pectoral mayor, tríceps braquial, deltoides anterior y core',
      phaseInicio: 'Apoya las manos en el suelo (o sobre una mesa firme para versión más accesible) a un ancho ligeramente mayor que los hombros. Piernas extendidas atrás con los pies juntos apoyados en las puntas. Forma una línea recta impecable desde los tobillos hasta la coronilla, contrayendo glúteos y abdomen.',
      phaseEjecucion: 'Inhala y flexiona los codos en un ángulo de aproximadamente 45° con respecto al torso (forma de flecha, nunca de T abierta). Desciende el pecho en bloque durante 2-3 segundos hasta que quede a 3 cm del suelo o de la mesa. Los hombros se mantienen lejos de las orejas.',
      phaseFinal: 'Sin descansar en el suelo, exhala y empuja con la palma completa contra la superficie, sintiendo la contracción intensa del pecho y los tríceps. Sube en 1 segundo hasta extender los brazos por completo sin bloquear los codos con violencia ni encorvar la parte alta de la espalda.',
      erroresComunes: 'Dejar caer la cadera hacia el piso (hiperextensión lumbar), abrir los codos a 90° estresando los hombros, o adelantar la cabeza para llegar antes al suelo.'
    },
    {
      id: 'norm-brazo-fondos',
      title: 'Fondos de Tríceps en Silla Firme',
      area: 'brazo',
      purpose: 'normal',
      level: 'Intermedio',
      dose: '3 series × 10-12 repeticiones',
      rest: '45 segundos',
      svgKind: 'default',
      targetMuscles: 'Tríceps braquial (las tres cabezas) y estabilizadores escapulares',
      phaseInicio: 'Siéntate en el borde de una silla muy firme y estable. Apoya las palmas de las manos junto a tus caderas con los dedos orientados hacia el frente. Desplaza los glúteos hacia adelante fuera del asiento. Piernas dobladas a 90° (más fácil) o estiradas al frente (más avanzado). Hombros deprimidos y espalda pegada a la silla.',
      phaseEjecucion: 'Inhala y flexiona los codos hacia atrás en línea recta (nunca abiertos a los lados) bajando los glúteos en vertical rozando el borde de la silla. Desciende hasta que los codos formen un ángulo de 90° (no más profundo para proteger la cápsula anterior del hombro).',
      phaseFinal: 'Exhala y empuja con las palmas extendiendo los codos de forma potente pero fluida hasta elevar el torso de regreso a la posición inicial. Al terminar la serie, desliza con calma los glúteos de nuevo sobre el asiento antes de soltar las manos.',
      erroresComunes: 'Separar el cuerpo de la silla hacia adelante cargando en exceso el hombro, encoger los hombros hacia el cuello o bajar más allá de los 90° de flexión de codo.'
    },
    {
      id: 'norm-brazo-curl',
      title: 'Curl de Bíceps con Mochila / Botellas',
      area: 'brazo',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 12-15 repeticiones',
      rest: '45 segundos',
      svgKind: 'armnerve',
      targetMuscles: 'Bíceps braquial, braquial anterior y braquiorradial',
      phaseInicio: 'Párate erguido con los pies al ancho de hombros, rodillas relajadas. Sostén las asas de la mochila o botellas de agua con las palmas mirando hacia el frente (agarre supino). Codos pegados a los costados del tórax y hombros hacia atrás.',
      phaseEjecucion: 'Inhala preparándote y, al exhalar, flexiona los codos elevando la carga hacia el pecho. Los codos deben permanecer como un eje fijo pegados a las costillas sin adelantarse ni balancearse. Aprieta voluntariamente los bíceps en el punto de máxima contracción durante 1 segundo.',
      phaseFinal: 'Inhala mientras bajas la carga de forma lenta y resistida durante 3 segundos hasta estirar los brazos casi por completo (dejando una microflexión de seguridad en los codos). No dejes caer el peso por gravedad.',
      erroresComunes: 'Balancear el torso hacia atrás para ganar impulso (trampa lumbar), despegar los codos de los costados o soltar la bajada sin control excéntrico.'
    },
    {
      id: 'norm-brazo-extension-triceps',
      title: 'Extensión de Tríceps Sobre la Cabeza',
      area: 'brazo',
      purpose: 'normal',
      level: 'Intermedio',
      dose: '3 series × 12 repeticiones',
      rest: '45 segundos',
      svgKind: 'default',
      targetMuscles: 'Porción larga del tríceps braquial',
      phaseInicio: 'Sentado en silla con respaldo recto o de pie con abdomen firme. Sostén una botella de agua o carga moderada con ambas manos por encima de la cabeza, con los brazos estirados verticalmente. Codos orientados hacia el frente, no excesivamente abiertos.',
      phaseEjecucion: 'Inhala y flexiona únicamente los codos, permitiendo que la carga descienda lentamente por detrás de la nuca. Los brazos (húmeros) se mantienen lo más verticales posible. Desciende hasta sentir un estiramiento agradable en la parte posterior del brazo.',
      phaseFinal: 'Exhala y extiende los codos para elevar la carga de nuevo a la vertical sobre la cabeza. Haz una pausa de 1 segundo arriba sintiendo el trabajo del tríceps antes de iniciar la siguiente repetición.',
      erroresComunes: 'Arquear la zona lumbar para compensar falta de movilidad de hombro, abrir excesivamente los codos hacia afuera o golpear la nuca con la carga.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NORMALES: ANTEBRAZO Y MANOS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'norm-antebrazo-flexion',
      title: 'Flexión de Muñeca con Carga Moderada (Flexores)',
      area: 'antebrazo',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 15 repeticiones',
      rest: '30 segundos',
      svgKind: 'forearm',
      targetMuscles: 'Flexor radial y cubital del carpo, flexores profundos de los dedos',
      phaseInicio: 'Siéntate y apoya el antebrazo sobre una mesa o sobre tu propio muslo, de modo que la muñeca y la mano queden colgando fuera del borde con la palma orientada hacia arriba (supinación). Sostén una botella pequeña de agua (0.5 L) o peso liviano.',
      phaseEjecucion: 'Permite que la carga ruede suavemente hacia las yemas de los dedos, extendiendo la muñeca hacia abajo con control. A continuación, cierra los dedos y flexiona la muñeca hacia arriba lo más alto que permita tu rango sin despegar el antebrazo del apoyo.',
      phaseFinal: 'Sostén la contracción máxima arriba durante 1 segundo. Desciende lentamente en 2-3 segundos hasta la posición de estiramiento neutro. Al finalizar la serie, retira la carga con la otra mano con suavidad.',
      erroresComunes: 'Levantar el codo o el antebrazo de la mesa para hacer fuerza con el hombro, usar un peso excesivo que genere dolor en el epicóndilo medial (codo de golfista).'
    },
    {
      id: 'norm-antebrazo-extension',
      title: 'Extensión de Muñeca en Pronación (Extensores)',
      area: 'antebrazo',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 12-15 repeticiones',
      rest: '30 segundos',
      svgKind: 'forearm',
      targetMuscles: 'Extensores radiales y cubital del carpo, extensor común de los dedos',
      phaseInicio: 'Sentado con el antebrazo completamente apoyado en la mesa o muslo, pero esta vez con la palma orientada hacia abajo (pronación). La mano cuelga por el borde sosteniendo una carga muy liviana.',
      phaseEjecucion: 'Comienza con la muñeca flexionada hacia el suelo. Exhala y eleva el dorso de la mano hacia el techo extendiendo la muñeca al máximo de tu rango cómodo. Mantén el antebrazo inmóvil y plano sobre la superficie.',
      phaseFinal: 'Pausa 1 segundo arriba sintiendo el trabajo en la cara dorsal del antebrazo. Desciende de manera muy pausada en 3 segundos resistiendo el peso. Concluye apoyando la carga en la mesa.',
      erroresComunes: 'Utilizar peso alto que fatigue el tendón común extensor (epicondilitis), hacer movimientos rápidos espasmódicos o compensar con el hombro.'
    },
    {
      id: 'norm-antebrazo-pron-sup',
      title: 'Pronación y Supinación con Carga Asimétrica',
      area: 'antebrazo',
      purpose: 'normal',
      level: 'Básico a Terapéutico',
      dose: '2-3 series × 10 giros por lado',
      rest: '30 segundos',
      svgKind: 'forearm',
      targetMuscles: 'Pronador redondo, pronador cuadrado, supinador corto y bíceps',
      phaseInicio: 'Sentado con el codo flexionado a 90° y pegado a la cintura. Toma una botella de agua por la base (de modo que el cuello y la tapa queden hacia arriba como palanca asimétrica) o un palo corto.',
      phaseEjecucion: 'Gira lentamente el antebrazo hacia adentro hasta que la palma mire al suelo (pronación completa controlada en 2 segundos). Luego, gira hacia afuera de manera inversa hasta que la palma mire hacia el techo (supinación completa).',
      phaseFinal: 'Mantén el codo firmemente anclado a 90° sin separarlo de las costillas en ningún momento. Detén el giro suavemente en cada extremo sin forzar la articulación radiocubital distal.',
      erroresComunes: 'Mover el hombro en lugar del antebrazo (hacer abducción de hombro), soltar la carga de golpe por el peso de la palanca o acelerar el movimiento.'
    },
    {
      id: 'norm-antebrazo-agarre',
      title: 'Fuerza de Agarre Isométrico (Toalla / Pelota)',
      area: 'antebrazo',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 15-20 segundos de apriete',
      rest: '30 segundos',
      svgKind: 'forearm',
      targetMuscles: 'Músculos flexores de los dedos, lumbricales e interóseos',
      phaseInicio: 'De pie o sentado con postura erguida. Toma una toalla de manos enrollada firmemente o una pelota blanda de gomaespuma/tenis con la mano completa.',
      phaseEjecucion: 'Aprieta con fuerza progresiva la toalla involucrando los cuatro dedos y el pulgar, pasando del 50% al 80-90% de tu fuerza máxima. Mantén la tensión constante respirando con tranquilidad por la nariz.',
      phaseFinal: 'Cumplidos los 15-20 segundos, abre la mano de manera muy lenta y deliberada, extendiendo todos los dedos por completo durante 5 segundos para oxigenar los tejidos antes de la siguiente serie.',
      erroresComunes: 'Aguantar la respiración (maniobra de Valsalva), encoger el cuello mientras se aprieta, o soltar bruscamente los dedos.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NORMALES: CUELLO
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'norm-cuello-iso-flexion',
      title: 'Isométrico Cervical en Flexión (Frente contra Manos)',
      area: 'cuello',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 8-10 segundos',
      rest: '20 segundos',
      svgKind: 'neck',
      targetMuscles: 'Esternocleidomastoideo, recto anterior de la cabeza y flexores profundos',
      phaseInicio: 'Siéntate en una silla firme con la espalda apoyada, hombros sueltos y mirada al horizonte. Coloca las palmas de ambas manos superpuestas contra tu frente. La cabeza debe estar perfectamente centrada, con el mentón neutro (ni levantado ni pegado al pecho).',
      phaseEjecucion: 'Empuja suavemente con la cabeza hacia adelante contra las manos, mientras que con las manos ejerces exactamente la misma fuerza en sentido opuesto. No debe haber ningún movimiento visible (contracción isométrica pura al 30-50% de intensidad). Respira de forma continua.',
      phaseFinal: 'Al cumplir 10 segundos, reduce la presión de forma gradual en 2 segundos antes de retirar las manos. Nunca quites las manos de golpe. Haz una respiración profunda y relajada antes de la siguiente repetición.',
      erroresComunes: 'Hacer fuerza máxima desmedida que active espasmos, contener la respiración o doblar el cuello hacia el pecho perdiendo la posición neutra.'
    },
    {
      id: 'norm-cuello-iso-extension',
      title: 'Isométrico Cervical en Extensión (Nuca contra Manos)',
      area: 'cuello',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 8-10 segundos',
      rest: '20 segundos',
      svgKind: 'neck',
      targetMuscles: 'Trapecio superior, esplenio de la cabeza, erectores cervicales',
      phaseInicio: 'Sentado erguido, entrelaza los dedos de las manos y apóyalos en la parte posterior de la cabeza (nuca, por encima de la unión cervical). Codos abiertos naturalmente. Columna alargada como si tiraran de tu coronilla hacia arriba.',
      phaseEjecucion: 'Empuja la nuca suavemente hacia atrás contra tus manos mientras las manos resisten con firmeza idéntica. La fuerza debe nacer de la base del cráneo, manteniendo el mentón recogido suavemente (como haciendo una pequeña papada).',
      phaseFinal: 'Mantén la fuerza estable durante 8-10 segundos. Disminuye la intensidad con suavidad antes de liberar las manos y relajar los brazos a los lados. Comprueba que no quede tensión residual.',
      erroresComunes: 'Arquear la zona lumbar para compensar, mirar hacia el techo o empujar con violencia generando dolor de cabeza tensional.'
    },
    {
      id: 'norm-cuello-iso-lateral',
      title: 'Isométrico Cervical Lateral (Sien contra Palma)',
      area: 'cuello',
      purpose: 'normal',
      level: 'Básico',
      dose: '3 series × 8-10 s por lado',
      rest: '20 segundos',
      svgKind: 'neck',
      targetMuscles: 'Escalenos anterior/medio, esternocleidomastoideo lateral',
      phaseInicio: 'Sentado con hombros relajados. Apoya la palma de la mano derecha plana sobre el lado derecho de la cabeza, justo encima de la oreja (en la sien/parietal). El hombro opuesto permanece completamente abajo.',
      phaseEjecucion: 'Intenta inclinar la oreja derecha hacia el hombro derecho mientras tu mano derecha bloquea todo movimiento. Mantén una contracción isométrica limpia y sin balanceo durante 8-10 segundos respirando con calma.',
      phaseFinal: 'Suelta la presión lentamente, baja el brazo derecho, haz una pausa de 5 segundos en el centro y cambia la mano al lado izquierdo para equilibrar ambos costados de la columna cervical.',
      erroresComunes: 'Subir el hombro hacia la oreja para ayudar a la mano, o rotar la cara en lugar de mantener la inclinación lateral pura.'
    },
    {
      id: 'norm-cuello-flexores-prof',
      title: 'Activación de Flexores Profundos Cervicales (Chin-Tuck)',
      area: 'cuello',
      purpose: 'normal',
      level: 'Básico a Terapéutico',
      dose: '2-3 series × 10 repeticiones de 3s',
      rest: '30 segundos',
      svgKind: 'neck',
      targetMuscles: 'Largo del cuello, largo de la cabeza, recto anterior menor',
      phaseInicio: 'Acuéstate boca arriba sobre una colchoneta (o sentado con la espalda y cabeza apoyadas contra una pared). Columna neutra, rodillas dobladas con pies en el suelo. Respira tranquilo.',
      phaseEjecucion: 'Sin levantar la cabeza del suelo ni tensar los músculos grandes de la garganta, desliza suavemente la barbilla hacia atrás y abajo como asintiendo levemente ("doble mentón" o papada sutil). Siente cómo la parte posterior del cuello se alarga y aplana ligeramente contra la superficie.',
      phaseFinal: 'Mantén esa alineación profunda durante 3 segundos. Regresa de manera suave al punto neutro sin permitir que la barbilla se dispare hacia el techo. Repite con ritmo relajado.',
      erroresComunes: 'Apretar los dientes, tensar el esternocleidomastoideo como cuerdas duras al frente, o despegar la nuca bruscamente del suelo.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NORMALES: ESPALDA
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'norm-espalda-remo-mochila',
      title: 'Remo Inclinado con Mochila / Carga a Dos Manos',
      area: 'espalda',
      purpose: 'normal',
      level: 'Intermedio',
      dose: '3 series × 12 repeticiones',
      rest: '60 segundos',
      svgKind: 'row',
      targetMuscles: 'Dorsal ancho, romboides, trapecio medio e inferior, deltoides posterior',
      phaseInicio: 'Párate de pie sosteniendo una mochila pesada por sus asas. Flexiona las rodillas ligeramente e inclina el tronco hacia adelante desde las caderas en un ángulo de 45° a 60°. La espalda debe estar completamente recta, el abdomen firme y los brazos extendidos hacia el suelo con la carga.',
      phaseEjecucion: 'Inhala y, al exhalar, tira de los codos hacia atrás y hacia arriba pegados a los costados, llevando la mochila hacia la parte baja de la caja torácica o el ombligo. Concéntrate en juntar las escápulas (omóplatos) al final del recorrido.',
      phaseFinal: 'Sostén la contracción dorsal arriba durante 1 segundo completo. Desciende la mochila lentamente en 2-3 segundos hasta la extensión completa de brazos sin encorvar los hombros ni redondear la espalda. Al concluir la serie, ponte de pie mediante la fuerza de piernas.',
      erroresComunes: 'Mover el torso arriba y abajo como rebote para subir el peso, encoger los hombros hacia las orejas, o permitir que la zona lumbar se flexione en joroba.'
    },
    {
      id: 'norm-espalda-remo-mesa',
      title: 'Remo Invertido Bajo Mesa Firme (Peso Corporal)',
      area: 'espalda',
      purpose: 'normal',
      level: 'Intermedio a Avanzado',
      dose: '3 series × 8-10 repeticiones',
      rest: '60 segundos',
      svgKind: 'row',
      targetMuscles: 'Dorsal ancho, romboides, trapecio, bíceps y estabilidad del core',
      phaseInicio: 'Asegúrate de que la mesa sea extremadamente firme y pesada. Acuéstate debajo de la mesa mirando hacia arriba, con el pecho directamente debajo del borde. Sujeta el borde de la mesa con ambas manos a una distancia cómoda. Apoya los talones en el suelo con el cuerpo en línea recta como una tabla invertida.',
      phaseEjecucion: 'Exhala, aprieta glúteos y abdomen, y jala con los codos hacia atrás para elevar el pecho hacia la parte inferior de la mesa. Mantén el cuerpo rígido como una tabla desde la cabeza hasta los talones.',
      phaseFinal: 'Toca o acércate al borde con el pecho, pausa 1 segundo apretando la espalda y baja con absoluto control en 3 segundos hasta que los brazos queden extendidos. Desciende con cuidado al suelo al terminar.',
      erroresComunes: 'Quebrar la cadera hacia abajo perdiendo la tabla, doblar el cuello hacia adelante o jalar asimétricamente.'
    },
    {
      id: 'norm-espalda-superman',
      title: 'Superman en Suelo con Control Lumbar',
      area: 'espalda',
      purpose: 'normal',
      level: 'Básico a Intermedio',
      dose: '3 series × 10 reps sostenidas de 3s',
      rest: '45 segundos',
      svgKind: 'default',
      targetMuscles: 'Erectores espinales lumbares y dorsales, glúteos y deltoides posterior',
      phaseInicio: 'Acuéstate boca abajo sobre una colchoneta, con los brazos extendidos hacia adelante (en forma de "Y") y las piernas estiradas al ancho de caderas. Apoya la frente en el suelo con el cuello largo y relajado.',
      phaseEjecucion: 'Inhala activando suavemente el ombligo hacia la columna para proteger las vértebras lumbares. Al exhalar, eleva simultáneamente el pecho, los brazos y las piernas a unos 10-15 cm del suelo. El movimiento debe ser de elongación (crecer hacia adelante y hacia atrás), no de hiperextensión brusca.',
      phaseFinal: 'Mantén la posición elevada durante 3 segundos respirando de manera fluida. Desciende al suelo con delicadeza en 2 segundos. Descansa la frente 1 segundo antes de la siguiente repetición.',
      erroresComunes: 'Arquear el cuello hacia arriba comprimiendo las cervicales, doblar excesivamente las rodillas o elevarse con sacudidas bruscas.'
    },
    {
      id: 'norm-espalda-angeles-pared',
      title: 'Ángeles en Pared y Retracción Escapular Activa',
      area: 'espalda',
      purpose: 'normal',
      level: 'Básico a Postural',
      dose: '3 series × 10-12 repeticiones',
      rest: '30 segundos',
      svgKind: 'default',
      targetMuscles: 'Trapecio inferior, romboides, serrato anterior y rotadores externos',
      phaseInicio: 'Apóyate de pie con la espalda contra una pared lisa, con los pies a 15-20 cm separados de la base. La cabeza, la espalda alta, la zona lumbar y los glúteos deben mantener contacto con la pared. Coloca los brazos en posición de "W" con codos y dorso de las manos tocando la pared.',
      phaseEjecucion: 'Sin perder el contacto de la espalda ni de los brazos con la pared, desliza los brazos lentamente hacia arriba formando una "Y" sobre tu cabeza mientras inhalas. Siente cómo se activan y deslizan los omóplatos.',
      phaseFinal: 'Alcanza el punto más alto posible sin arquear la zona lumbar ni separar los codos. Exhala y desliza los codos de nuevo hacia abajo en 3 segundos, apretando las escápulas hacia la columna y hacia abajo en la "W" final.',
      erroresComunes: 'Despegar la zona lumbar de la pared formando un hueco grande, elevar los hombros hacia las orejas o despegar las muñecas de la pared.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEURODINÁMICOS: ZONA LUMBAR
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'neuro-lumbar-ciatico',
      title: 'Deslizamiento del Nervio Ciático (Slump Slider Sentado)',
      area: 'lumbar',
      purpose: 'neurodinamico',
      level: 'Terapéutico Específico',
      dose: '2-3 series × 8-10 repeticiones suaves',
      rest: '30 segundos',
      svgKind: 'slump',
      targetMuscles: 'Sistema nervioso periférico: Raíces L4-S3, nervio ciático y tibial',
      phaseInicio: 'Siéntate en el borde de una mesa o silla firme con los muslos apoyados y las piernas colgando libres. Coloca las manos entrelazadas detrás de la espalda baja. Deja caer el tronco en una flexión suave y redondeada (postura "slump"), manteniendo la cabeza erguida mirando al frente.',
      phaseEjecucion: 'El movimiento es un deslizamiento coordinado tipo "balancín" (slider): mientras extiendes una rodilla hacia adelante levantando la espinilla y flexionas el tobillo hacia ti (dorsiflexión), extiende el cuello mirando ligeramente hacia arriba. En este instante el nervio se desliza hacia la cabeza sin aumentar la tensión global.',
      phaseFinal: 'A continuación, dobla la rodilla bajando el pie y al mismo tiempo baja la barbilla hacia el pecho mirando abajo. El nervio ahora se desliza en sentido opuesto. Realiza el ciclo a ritmo muy lento (2 segundos en cada dirección). Jamás debes sentir dolor punzante ni calambres; sólo una ligera sensación de movilización.',
      erroresComunes: 'Hacer tensión simultánea (estirar rodilla con cabeza abajo), lo cual aumenta la tensión al máximo (tensioner) en lugar de deslizar (slider); o forzar cuando existe hormigueo agudo.'
    },
    {
      id: 'neuro-lumbar-femoral',
      title: 'Deslizamiento del Nervio Femoral / Crural en Decúbito',
      area: 'lumbar',
      purpose: 'neurodinamico',
      level: 'Terapéutico Específico',
      dose: '2 series × 8 repeticiones por lado',
      rest: '30 segundos',
      svgKind: 'default',
      targetMuscles: 'Raíces L2-L4, nervio femoral / crural y nervio safeno',
      phaseInicio: 'Acuéstate de lado sobre una colchoneta en posición fetal suave (pierna de abajo flexionada a 90° para estabilizar la pelvis). La cabeza descansa cómodamente sobre una almohada o tu brazo inferior.',
      phaseEjecucion: 'Toma el tobillo de la pierna superior con la mano del mismo lado. Mientras llevas suavemente la rodilla hacia atrás en ligera extensión de cadera, flexiona la cabeza hacia adelante acercando la barbilla al pecho. Luego, cuando permitas que la rodilla vuelva adelante, extiende suavemente el cuello hacia atrás.',
      phaseFinal: 'Coordina ambos extremos del nervio para que deslice suavemente a través del canal inguinal y la cara anterior del muslo. Termina soltando el tobillo con lentitud y descansando en posición fetal antes de cambiar de lado.',
      erroresComunes: 'Arquear bruscamente la espalda baja en lugar de mover la cadera, o tirar con fuerza del pie generando un estiramiento agresivo del cuádriceps.'
    },
    {
      id: 'neuro-lumbar-bascula',
      title: 'Báscula Pélvica Rítmica y Movilización Raquídea',
      area: 'lumbar',
      purpose: 'neurodinamico',
      level: 'Básico Terapéutico',
      dose: '2 series × 12 repeticiones rítmicas',
      rest: '20 segundos',
      svgKind: 'default',
      targetMuscles: 'Musculatura lumbo-pélvica, plexo lumbosacro y meninges lumbares',
      phaseInicio: 'Acuéstate boca arriba con las rodillas dobladas y las plantas de los pies bien apoyadas en el suelo al ancho de caderas. Brazos relajados a los lados del cuerpo, palmas hacia arriba.',
      phaseEjecucion: 'Inhala suavemente arqueando un poco la zona lumbar sin despegar los glúteos del piso (anteversión pélvica, pasa una pequeña mano de aire bajo la espalda). Al exhalar, rueda la pelvis hacia atrás aplanando completamente la zona lumbar contra el suelo (retroversión pélvica) contrayendo ligeramente el abdomen y suelo pélvico.',
      phaseFinal: 'Realiza el vaivén de forma rítmica, continua y placentera como un suave masaje para los discos y raíces nerviosas lumbares. Al concluir las 12 repeticiones, mantén la postura neutra durante 10 segundos antes de incorporarte de lado.',
      erroresComunes: 'Levantar los glúteos en puente (no es un puente de glúteos), empujar bruscamente con los pies o aguantar la respiración.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEURODINÁMICOS: ZONA DORSAL / TORÁCICA
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'neuro-dorsal-libro',
      title: '"Libro Abierto" - Deslizamiento Neural Torácico e Intercostal',
      area: 'dorsal',
      purpose: 'neurodinamico',
      level: 'Básico a Intermedio',
      dose: '2-3 series × 8-10 reps por lado',
      rest: '30 segundos',
      svgKind: 'openbook',
      targetMuscles: 'Columna torácica dorsal, nervios intercostales, caja torácica y pectoral',
      phaseInicio: 'Acuéstate de lado sobre una colchoneta, con caderas y rodillas flexionadas a 90° (para bloquear la zona lumbar e impedir que rote). Estira ambos brazos hacia adelante a la altura del pecho, con las palmas juntas como las tapas de un libro cerrado. Coloca un cojín bajo la cabeza.',
      phaseEjecucion: 'Inhala y eleva el brazo superior hacia el techo, siguiéndolo atentamente con la mirada y la cabeza. Continúa rotando el torso hacia el lado opuesto abriendo el brazo hacia el suelo trasero, mientras exhalas lentamente. Mantén las dos rodillas firmemente pegadas entre sí y al piso.',
      phaseFinal: 'Llega al punto de apertura máxima cómoda donde sientas que el pecho y la caja torácica se expanden. Haz una respiración diafragmática completa en esa postura. Inhala y regresa el brazo superior trazando un gran arco hasta cerrar de nuevo las palmas con delicadeza.',
      erroresComunes: 'Separar o levantar la rodilla superior del piso (señal de que la rotación se trasladó a la zona lumbar), girar el brazo sin rotar la cabeza o hacer fuerza balística.'
    },
    {
      id: 'neuro-dorsal-gato-camello',
      title: 'Gato-Camello Segmentario con Coordinación Neural',
      area: 'dorsal',
      purpose: 'neurodinamico',
      level: 'Básico',
      dose: '2 series × 10 ciclos fluidos',
      rest: '30 segundos',
      svgKind: 'default',
      targetMuscles: 'Meninges y médula espinal torácica, fascia toracolumbar',
      phaseInicio: 'Colócate en cuatro puntos de apoyo (cuadrupedia): manos debajo de los hombros y rodillas justo debajo de las caderas. Columna en posición neutra paralela al suelo. Dedos de las manos bien abiertos y cuello alineado.',
      phaseEjecucion: 'Inicia el movimiento desde la pelvis: exhala y empuja el ombligo hacia la columna, redondeando vértebra por vértebra la zona lumbar, luego la dorsal (empujando el suelo con las manos como un gato erizado) y finalmente deja caer la cabeza con la barbilla al pecho. Inhala y deshaz el movimiento en orden inverso: comienza inclinando la pelvis hacia adelante, abre el pecho y levanta la cabeza con suavidad.',
      phaseFinal: 'Muévete como una ola continua sin detenerte rígidamente en los extremos. El objetivo es descompresionar y movilizar el eje neural de toda la espalda. Para finalizar, siéntate con suavidad sobre los talones en posición de descanso.',
      erroresComunes: 'Mover sólo el cuello ignorando la zona dorsal, forzar la hiperextensión cervical o doblar los codos durante la elevación dorsal.'
    },
    {
      id: 'neuro-dorsal-rotacion',
      title: 'Rotación Torácica en Cuadrupedia con Deslizamiento',
      area: 'dorsal',
      purpose: 'neurodinamico',
      level: 'Intermedio',
      dose: '2 series × 8 repeticiones por lado',
      rest: '30 segundos',
      svgKind: 'openbook',
      targetMuscles: 'Rotadores torácicos (multífidos, rotadores), romboides y nervios intercostales',
      phaseInicio: 'En cuadrupedia sobre la colchoneta. Coloca tu mano derecha detrás de la nuca con el codo abierto hacia afuera. La mano izquierda queda firmemente apoyada en el suelo bajo el hombro izquierdo.',
      phaseEjecucion: 'Inhala y gira el codo derecho hacia abajo y hacia adentro, apuntándolo hacia la muñeca izquierda ("enhebrar la aguja"). Al exhalar, empuja con la mano izquierda el suelo y gira el pecho y el codo derecho hacia el techo lo más alto posible sin mover las caderas.',
      phaseFinal: 'Siente la apertura en la zona de las escápulas y costillas dorsales durante 1 segundo arriba. Vuelve a bajar el codo con lentitud. Completa las repeticiones y repite con el brazo izquierdo.',
      erroresComunes: 'Desplazar la pelvis hacia los costados para falsear el rango, tirar de la nuca con la mano en lugar de rotar con el tórax.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEURODINÁMICOS: CUELLO
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'neuro-cuello-plexo',
      title: 'Deslizamiento del Plexo Braquial Cervical (Slider)',
      area: 'cuello',
      purpose: 'neurodinamico',
      level: 'Terapéutico Específico',
      dose: '2 series × 8 repeticiones lentas',
      rest: '30 segundos',
      svgKind: 'armnerve',
      targetMuscles: 'Raíces cervicales C5-T1, troncos del plexo braquial',
      phaseInicio: 'Párate o siéntate con la columna completamente recta y hombros relajados abajo. Separa el brazo derecho hacia el lado a unos 45°-60° del cuerpo, con la palma mirando al frente y el codo relajado.',
      phaseEjecucion: 'Al mismo tiempo que inclinas la cabeza llevando la oreja derecha hacia el hombro derecho (acercando el origen del nervio), extiende suavemente la muñeca derecha hacia atrás con los dedos apuntando al suelo (poniendo tensión distal). A continuación, inclina la cabeza hacia el hombro izquierdo mientras flexionas la muñeca hacia adelante.',
      phaseFinal: 'La coordinación debe ser sincronizada: cuando el cuello se acerca, la mano se aleja; cuando el cuello se aleja, la mano se acerca. Esto crea un deslizamiento puro sin estirar bruscamente las raíces cervicales. Termina bajando el brazo antes de recentrar la cabeza.',
      erroresComunes: 'Sentir hormigueo fuerte y continuar; el ejercicio debe detenerse o reducirse de rango si aparece cualquier sensación eléctrica en los dedos.'
    },
    {
      id: 'neuro-cuello-axial',
      title: 'Deslizamiento Cervical Axial con Inclinación Contralateral',
      area: 'cuello',
      purpose: 'neurodinamico',
      level: 'Básico Terapéutico',
      dose: '2 series × 6-8 reps por lado',
      rest: '30 segundos',
      svgKind: 'neck',
      targetMuscles: 'Canal neural cervical, raíces foraminales, ligamento longitudinal posterior',
      phaseInicio: 'Sentado erguido en silla, manos descansando en los muslos. Imagina un hilo de oro que tira de la cúspide de tu cabeza hacia el techo para alargar al máximo el espacio intervertebral.',
      phaseEjecucion: 'Realiza una retracción cervical suave (chin-tuck / papada moderada). Manteniendo esa longitud axial, inclina la cabeza muy despacio 15°-20° hacia el hombro izquierdo, mientras dejas caer pesadamente el hombro derecho hacia el suelo sintiendo una descompresión suave en el lateral del cuello.',
      phaseFinal: 'Mantén la posición durante 2 segundos respirando con tranquilidad. Regresa despacio al centro con la cabeza alineada y relaja los hombros antes de realizar el lado opuesto.',
      erroresComunes: 'Subir el hombro hacia la oreja, girar la nariz en lugar de inclinar lateralmente o flexionar el tronco de lado.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NEURODINÁMICOS: HOMBROS Y BRAZOS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'neuro-hombro-mediano',
      title: 'Deslizamiento del Nervio Mediano (ULNT1 - Cuna)',
      area: 'hombros',
      purpose: 'neurodinamico',
      level: 'Terapéutico',
      dose: '2 series × 8-10 repeticiones',
      rest: '30 segundos',
      svgKind: 'armnerve',
      targetMuscles: 'Nervio mediano (recorrido anterior del hombro, codo, antebrazo y túnel carpiano)',
      phaseInicio: 'De pie o sentado. Eleva el brazo afectado lateralmente a 90° con respecto al cuerpo, con el codo doblado a 90° y la palma mirando hacia tu oreja (como sosteniendo una bandeja de camarero frente a ti). Hombro deprimido lejos de la oreja.',
      phaseEjecucion: 'Al extender el codo y la muñeca hacia el lateral (llevando los dedos hacia atrás en bandeja), inclina la cabeza hacia el mismo hombro activo. Luego, al doblar el codo y regresar la mano hacia la oreja, lleva la cabeza al centro o inclínala ligeramente al hombro opuesto.',
      phaseFinal: 'Mantén un movimiento continuo, rítmico y sin tirones durante las 8 repeticiones. Al terminar, deja caer el brazo con delicadeza a lo largo del cuerpo y rota suavemente los hombros.',
      erroresComunes: 'Hacer el movimiento con el hombro elevado en tensión, o forzar la extensión de muñeca si se siente ardor en el pulgar e índice.'
    },
    {
      id: 'neuro-hombro-radial',
      title: 'Deslizamiento del Nervio Radial (Depresión y Pronación)',
      area: 'hombros',
      purpose: 'neurodinamico',
      level: 'Terapéutico',
      dose: '2 series × 8 repeticiones',
      rest: '30 segundos',
      svgKind: 'armnerve',
      targetMuscles: 'Nervio radial (cara posterior del brazo, codo externo y dorso de muñeca)',
      phaseInicio: 'De pie, con el brazo al costado del cuerpo. Baja activamente el hombro (depresión escapular) como si quisieras alcanzar el suelo con las yemas de los dedos.',
      phaseEjecucion: 'Gira todo el brazo hacia adentro (rotación interna y pronación máxima, de modo que el dorso de la mano quede mirando al frente). Flexiona la muñeca llevando la palma hacia atrás. Al mismo tiempo, inclina suavemente la cabeza hacia el mismo hombro para proteger el nervio.',
      phaseFinal: 'Siente el suave deslizamiento en la cara externa del codo y antebrazo. Regresa aflojando la muñeca y girando el brazo a posición neutra mientras recentras la cabeza. Repite con lentitud.',
      erroresComunes: 'Encoger el hombro, doblar el codo durante la fase de deslizamiento o realizar rebotes violentos.'
    },
    {
      id: 'neuro-hombro-cubital',
      title: 'Deslizamiento del Nervio Cubital ("Gafas Invertidas")',
      area: 'hombros',
      purpose: 'neurodinamico',
      level: 'Terapéutico',
      dose: '2 series × 8 repeticiones',
      rest: '30 segundos',
      svgKind: 'armnerve',
      targetMuscles: 'Nervio cubital (canal epitrocleo-olecraniano del codo, eminencia hipotenar y meñique)',
      phaseInicio: 'De pie o sentado. Coloca el brazo a 90° de abducción con el codo extendido. Junta la punta del pulgar con el índice formando un círculo ("OK"). Hombro abajo y relajado.',
      phaseEjecucion: 'Flexiona el codo y rota la muñeca llevando ese círculo de dedos directamente sobre tu ojo como si te pusieras unas gafas o un monóculo invertido. Los otros tres dedos quedan apoyados suavemente contra la mejilla o mandíbula. Mientras flexionas el codo, inclina la cabeza ligeramente hacia ese hombro.',
      phaseFinal: 'Al extender el codo hacia afuera, endereza la cabeza. Siente cómo el nervio corre libremente sin quedar atrapado en el túnel del codo. Concluye bajando el brazo lentamente.',
      erroresComunes: 'Forzar el ángulo si aparece sensación de choque eléctrico en el dedo meñique, o presionar los dedos contra la cara.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TERAPÉUTICOS Y MOVILIDAD
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'terap-cervical-suave',
      title: 'Movilización Cervical en 3 Planos Suave',
      area: 'cuello',
      purpose: 'terapeutico',
      level: 'Básico Terapéutico',
      dose: '5 repeticiones lentas por plano',
      rest: '15 segundos',
      svgKind: 'neck',
      targetMuscles: 'Articulaciones facetarias cervicales, musculatura suboccipital y cuello',
      phaseInicio: 'Sentado en silla con respaldo, pies apoyados en el suelo. Brazos descansando sobre los muslos, hombros caídos y columna alargada.',
      phaseEjecucion: 'Plano 1 (Rotación): Gira la cabeza suavemente hacia la derecha mirando sobre el hombro sin forzar, regresa al centro y gira a la izquierda. Plano 2 (Inclinación): Lleva la oreja derecha hacia el hombro derecho, centro, oreja izquierda al hombro izquierdo. Plano 3 (Flexo-extensión corta): Asiente llevando la barbilla al pecho y sube hasta mirar al frente (evitando hiperextender atrás).',
      phaseFinal: 'Cada movimiento debe tomar de 3 a 4 segundos. Si en algún punto sientes mareo o crujido doloroso, reduce el rango inmediatamente al 50%. Concluye con tres respiraciones nasales profundas.',
      erroresComunes: 'Hacer círculos completos violentos (rodar la cabeza hacia atrás comprime las arterias vertebrales), elevar los hombros o apresurar el ritmo.'
    },
    {
      id: 'terap-escapular-retraccion',
      title: 'Retracción y Depresión Escapular en Pared / Silla',
      area: 'hombros',
      purpose: 'terapeutico',
      level: 'Básico',
      dose: '2-3 series × 10 repeticiones de 3s',
      rest: '20 segundos',
      svgKind: 'default',
      targetMuscles: 'Romboides mayor/menor, trapecio medio e inferior, estabilizadores de escápula',
      phaseInicio: 'Sentado o de pie con los brazos relajados a los lados. Clavículas anchas y pecho abierto.',
      phaseEjecucion: 'Lleva los omóplatos primero hacia abajo (depresión) y luego hacia la columna vertebral como si quisieras sujetar un lápiz entre las paletillas. Mantén el cuello completamente libre de tensión.',
      phaseFinal: 'Sostén la retracción durante 3 segundos. Suelta con lentitud y suavidad volviendo a la postura neutra. No empujes los hombros hacia adelante en protracción forzada.',
      erroresComunes: 'Elevar los hombros hacia las orejas usando el trapecio superior en lugar del medio e inferior, o arquear la zona lumbar.'
    },
    {
      id: 'terap-puente-gluteo',
      title: 'Puente de Glúteos Terapéutico con Báscula Previa',
      area: 'core',
      purpose: 'terapeutico',
      level: 'Básico',
      dose: '3 series × 10-12 repeticiones',
      rest: '30 segundos',
      svgKind: 'default',
      targetMuscles: 'Glúteo mayor, isquiotibiales proximales, transverso abdominal',
      phaseInicio: 'Acuéstate boca arriba con rodillas dobladas a 90° y los pies apoyados planos en el suelo al ancho de caderas. Brazos a los lados con las palmas hacia el suelo.',
      phaseEjecucion: 'Haz una retroversión pélvica aplanando la espalda contra el suelo. Exhala y empuja con los talones para levantar las caderas hasta formar una línea diagonal recta desde las rodillas hasta los hombros. Aprieta fuertemente los glúteos en la cúspide.',
      phaseFinal: 'Mantén 2 segundos arriba sin arquear la espalda baja con los músculos lumbares. Desciende lentamente vértebra por vértebra tocando primero la espalda media, luego la baja y finalmente el sacro.',
      erroresComunes: 'Hiperextender la columna arqueando la cintura para subir más alto, empujar con las puntas de los pies o abrir las rodillas descontroladamente.'
    },
    {
      id: 'terap-core-deadbug',
      title: 'Dead Bug Controlado con Apoyo Lumbar',
      area: 'core',
      purpose: 'terapeutico',
      level: 'Intermedio Terapéutico',
      dose: '3 series × 6-8 repeticiones por lado',
      rest: '30 segundos',
      svgKind: 'default',
      targetMuscles: 'Transverso del abdomen, oblicuos internos/externos, flexores de cadera',
      phaseInicio: 'Acuéstate boca arriba. Eleva los brazos verticales hacia el techo y las rodillas dobladas a 90° (posición de mesa). La zona lumbar debe permanecer totalmente pegada al suelo durante todo el ejercicio sin despegarse un solo milímetro.',
      phaseEjecucion: 'Inhala hondo. Al exhalar de manera prolongada por la boca, extiende simultáneamente el brazo derecho hacia atrás por encima de la cabeza y la pierna izquierda hacia adelante en diagonal, bajándolos con control hacia el suelo.',
      phaseFinal: 'Baja solo hasta donde puedas mantener la espalda baja pegada al piso. Regresa con calma al centro inhalando y repite con el brazo izquierdo y la pierna derecha.',
      erroresComunes: 'Permitir que la espalda baja se curve despegándose del suelo, acelerar el movimiento sin control respiratorio o arquear las costillas.'
    },
    {
      id: 'terap-core-birddog',
      title: 'Bird-Dog en Cuadrupedia con Espalda Neutra',
      area: 'core',
      purpose: 'terapeutico',
      level: 'Básico a Intermedio',
      dose: '3 series × 8 repeticiones por lado',
      rest: '30 segundos',
      svgKind: 'default',
      targetMuscles: 'Multífidos lumbares, glúteo mayor, deltoides posterior, core profundo',
      phaseInicio: 'En cuadrupedia sobre colchoneta, manos debajo de hombros y rodillas bajo caderas. Columna neutra como una mesa horizontal y abdomen activo.',
      phaseEjecucion: 'Al exhalar, extiende simultáneamente el brazo derecho hacia adelante a la altura de la oreja y la pierna izquierda hacia atrás a la altura de la cadera. Estírate en longitud, no hacia arriba.',
      phaseFinal: 'Mantén la posición 2 segundos manteniendo la pelvis perfectamente horizontal (sin girar la cadera de lado). Regresa la mano y rodilla al suelo con suavidad y repite con el lado contrario.',
      erroresComunes: 'Rotar la pelvis levantando la cadera hacia un lado, elevar la pierna demasiado arqueando la zona lumbar, o dejar caer la cabeza.'
    },
    {
      id: 'terap-tobillo-bomba',
      title: 'Bomba Venosa de Tobillos y Piernas',
      area: 'piernas',
      purpose: 'terapeutico',
      level: 'Básico',
      dose: '2 series × 20 repeticiones rítmicas',
      rest: '15 segundos',
      svgKind: 'squat',
      targetMuscles: 'Bomba muscular gemelar-sóleo, retorno venoso profundo y movilidad de tobillo',
      phaseInicio: 'Sentado cómodamente o acostado boca arriba con las piernas estiradas o ligeramente elevadas sobre un cojín.',
      phaseEjecucion: 'Flexiona con fuerza ambos tobillos llevando las puntas de los pies hacia las espinillas (dorsiflexión). Inmediatamente después, apunta con los dedos hacia adelante estirando los empeines (flexión plantar).',
      phaseFinal: 'Mantén un ritmo alegre y constante de bombeo muscular (1 segundo por fase). Siente cómo se activa la circulación sanguínea en las pantorrillas y tobillos.',
      erroresComunes: 'Hacer movimientos diminutos sin rango articular, o contener la respiración.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CALENTAMIENTO Y ACTIVACIÓN
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'calent-marcha',
      title: 'Marcha en el Sitio con Braceo Activo',
      area: 'piernas',
      purpose: 'calentamiento',
      level: 'Básico',
      dose: '1-2 minutos continuos',
      rest: 'Sin pausa directa',
      svgKind: 'default',
      targetMuscles: 'Activación cardiovascular global, flexores de cadera, gemelos y hombros',
      phaseInicio: 'De pie con postura alta, hombros abajo y mirada al frente. Pies separados al ancho de caderas.',
      phaseEjecucion: 'Comienza a marchar en el sitio levantando las rodillas de forma alterna a una altura cómoda (nivel medio de muslo). Acompaña el movimiento con un braceo fluido cruzado (brazo derecho adelante con rodilla izquierda).',
      phaseFinal: 'Aumenta progresivamente el ritmo en los últimos 30 segundos sin golpear el suelo con fuerza, aterrizando suavemente en la punta y luego en el talón. Reduce el paso gradualmente antes de parar.',
      erroresComunes: 'Aterrizar con impacto duro sobre los talones, encorvar la espalda o marchar con los brazos rígidos.'
    },
    {
      id: 'calent-circulos-brazos',
      title: 'Círculos Progresivos de Brazos en Cruz',
      area: 'hombros',
      purpose: 'calentamiento',
      level: 'Básico',
      dose: '40 segundos (20s adelante + 20s atrás)',
      rest: '15 segundos',
      svgKind: 'armnerve',
      targetMuscles: 'Manguito rotador, deltoides anterior, medio y posterior, trapecio',
      phaseInicio: 'Párate con pies firmes al ancho de hombros. Extiende ambos brazos en cruz a los lados a la altura de los hombros con las palmas mirando hacia abajo.',
      phaseEjecucion: 'Dibuja círculos pequeños y controlados con las manos hacia adelante durante 10 segundos, aumentando gradualmente el diámetro a círculos medianos durante otros 10 segundos. Cambia de sentido girando hacia atrás.',
      phaseFinal: 'Mantén los hombros relajados y abajo durante todo el giro. Desciende los brazos con calma a los lados y sacude suavemente las manos para soltar.',
      erroresComunes: 'Subir los hombros hacia las orejas por fatiga, o arquear la zona lumbar para mantener los brazos arriba.'
    },
    {
      id: 'calent-bisagra-cadera',
      title: 'Bisagra de Cadera sin Carga (Good Mornings)',
      area: 'espalda',
      purpose: 'calentamiento',
      level: 'Básico',
      dose: '10-12 repeticiones lentas',
      rest: '15 segundos',
      svgKind: 'row',
      targetMuscles: 'Activación de glúteos, isquiotibiales y erectores espinales',
      phaseInicio: 'De pie con pies paralelos al ancho de caderas. Manos cruzadas sobre el pecho o colocadas en las caderas. Rodillas desbloqueadas (microflexión fija).',
      phaseEjecucion: 'Empuja las caderas hacia atrás como si tocaras una pared imaginaria con los glúteos mientras inhalas. El torso se inclina hacia adelante manteniendo la columna neutra y recta como una tabla.',
      phaseFinal: 'Al sentir el estiramiento en la parte posterior de los muslos, exhala y empuja los glúteos hacia adelante para volver a la posición erguida inicial.',
      erroresComunes: 'Doblar las rodillas como sentadilla o redondear la espalda en joroba.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VUELTA A LA CALMA Y ESTIRAMIENTOS
    // ═══════════════════════════════════════════════════════════════════════
    {
      id: 'estir-cuadriceps',
      title: 'Estiramiento Suave de Cuádriceps',
      area: 'piernas',
      purpose: 'estiramiento',
      level: 'Básico',
      dose: '30-40 segundos por pierna',
      rest: '10 segundos',
      svgKind: 'lunge',
      targetMuscles: 'Cuádriceps femoral (recto anterior) y psoas ilíaco',
      phaseInicio: 'De pie junto a una pared o silla firme para mantener el equilibrio con una mano. Postura erguida y mirada al frente.',
      phaseEjecucion: 'Flexiona una rodilla llevando el talón hacia el glúteo y sujeta el empeine o tobillo con la mano del mismo lado. Junta ambas rodillas en paralelo y mantén la pelvis neutra con suave retroversión.',
      phaseFinal: 'Siente el estiramiento en la cara anterior del muslo. Respira hondo y relajado. Cumplido el tiempo, suelta el tobillo con delicadeza sin soltarlo de golpe y cambia de pierna.',
      erroresComunes: 'Arquear la zona lumbar hacia adelante, separar la rodilla hacia afuera o tirar con fuerza excesiva del pie.'
    },
    {
      id: 'estir-isquiotibiales',
      title: 'Estiramiento Suave de Isquiotibiales en Suelo / Silla',
      area: 'piernas',
      purpose: 'estiramiento',
      level: 'Básico',
      dose: '30-40 segundos por pierna',
      rest: '10 segundos',
      svgKind: 'default',
      targetMuscles: 'Isquiotibiales (bíceps femoral, semitendinoso, semimembranoso)',
      phaseInicio: 'Sentado en el borde de una silla, extiende una pierna hacia adelante con el talón apoyado en el suelo y los dedos apuntando al techo. La otra pierna doblada a 90° con pie firme.',
      phaseEjecucion: 'Con la espalda bien recta y el pecho alto, inclina el torso hacia adelante desde la articulación de la cadera (sin doblar la cintura ni encorvarte) hasta sentir un estiramiento agradable en la parte posterior del muslo extendido.',
      phaseFinal: 'Sostén la postura respirando con calma por la nariz. Vuelve lentamente a la verticalidad y cambia de pierna con suavidad.',
      erroresComunes: 'Querer tocarse la punta del pie redondeando la espalda y doblando el cuello, perdiendo el estiramiento en los isquiotibiales.'
    },
    {
      id: 'estir-gluteos-piramidal',
      title: 'Estiramiento de Glúteos y Piramidal (Figura 4)',
      area: 'core',
      purpose: 'estiramiento',
      level: 'Básico a Intermedio',
      dose: '30-40 segundos por pierna',
      rest: '15 segundos',
      svgKind: 'default',
      targetMuscles: 'Glúteo medio, piramidal de la pelvis y rotadores profundos de cadera',
      phaseInicio: 'Acuéstate boca arriba sobre la colchoneta con ambas rodillas flexionadas y pies en el suelo. Cruza el tobillo derecho sobre el muslo/rodilla izquierda formando el número "4".',
      phaseEjecucion: 'Pasa las manos por detrás del muslo izquierdo y acércalo suavemente hacia tu pecho. La cabeza y los hombros deben descansar relajados sobre el suelo.',
      phaseFinal: 'Siente la liberación profunda en la nalga y cadera derecha. Respira 4 veces de forma lenta y profunda. Desciende el pie izquierdo con control, descruza el tobillo y realiza el lado opuesto.',
      erroresComunes: 'Levantar la cabeza o tensionar los hombros para alcanzar el muslo (usa una toalla como apoyo si no alcanzas con las manos).'
    },
    {
      id: 'estir-cobra-mahometano',
      title: 'Secuencia Cobra Suave a Postura del Niño (Mahometano)',
      area: 'espalda',
      purpose: 'estiramiento',
      level: 'Básico',
      dose: '3-4 transiciones lentas de 30s',
      rest: 'Sin pausa',
      svgKind: 'default',
      targetMuscles: 'Abdomen, psoas, fascia toracolumbar, dorsales y glúteos',
      phaseInicio: 'Acuéstate boca abajo sobre la colchoneta con las manos apoyadas debajo de los hombros.',
      phaseEjecucion: 'Fase 1 (Cobra suave): Inhala y empuja con las manos extendiendo los codos de forma parcial (esfinge o cobra baja) abriendo el pecho hacia el frente sin forzar las lumbares. Fase 2 (Niño/Mahometano): Al exhalar, empuja con las manos hacia atrás llevando los glúteos a descansar sobre los talones, con los brazos estirados al frente y la frente apoyada en el suelo.',
      phaseFinal: 'Permanece en la postura del niño respirando profundamente hacia la espalda baja durante 30 segundos, sintiendo cómo se alarga y relaja toda la columna.',
      erroresComunes: 'Hacer una hiperextensión lumbar exagerada en la cobra o encoger los hombros hacia el cuello.'
    },
    {
      id: 'estir-pecho-pared',
      title: 'Estiramiento Pectoral y Anterior de Hombro en Pared',
      area: 'hombros',
      purpose: 'estiramiento',
      level: 'Básico',
      dose: '30 segundos por lado',
      rest: '10 segundos',
      svgKind: 'default',
      targetMuscles: 'Pectoral mayor y menor, deltoides anterior y bíceps proximal',
      phaseInicio: 'De pie junto a una pared o marco de puerta. Apoya el antebrazo y la palma de la mano derecha planos contra la pared con el codo a la altura del hombro en 90°.',
      phaseEjecucion: 'Da un pequeño paso adelante con la pierna del mismo lado y gira suavemente el tronco hacia la izquierda (alejándote de la pared) hasta sentir el estiramiento en la parte anterior del pecho y hombro.',
      phaseFinal: 'Sostén la tensión suave sin dolor. Exhala lentamente. Regresa el tronco al centro antes de retirar el brazo de la pared y repite con el brazo izquierdo.',
      erroresComunes: 'Girar bruscamente o arquear la espalda baja en lugar de rotar con delicadeza.'
    },
    {
      id: 'estir-cuello-trapecio',
      title: 'Estiramiento Lateral de Cuello y Trapecio Superior',
      area: 'cuello',
      purpose: 'estiramiento',
      level: 'Básico',
      dose: '30 segundos por lado',
      rest: '10 segundos',
      svgKind: 'neck',
      targetMuscles: 'Trapecio superior, elevador de la escápula y escalenos',
      phaseInicio: 'Sentado en silla con la espalda recta. Apoya la mano izquierda debajo del muslo izquierdo o del asiento para fijar el hombro hacia abajo.',
      phaseEjecucion: 'Inclina suavemente la oreja derecha hacia el hombro derecho. Coloca la mano derecha sobre la cabeza aplicando únicamente el peso del brazo (sin tirar con fuerza) para acentuar con suavidad el estiramiento.',
      phaseFinal: 'Mantén la posición respirando despacio durante 30 segundos. Retira la mano de la cabeza primero y regresa la cabeza al centro muy despacio con su propia fuerza. Repite hacia el lado izquierdo.',
      erroresComunes: 'Tirar de la cabeza con fuerza bruta o dejar que el hombro contrario se eleve.'
    }
  ];

  // Rutinas preestablecidas guiadas
  const ROUTINES = [
    {
      id: 'rutina-neurodinamica',
      title: 'Rutina Neurodinámica Completa',
      purpose: 'neurodinamico',
      duration: '20 min',
      description: 'Movilización neural suave de nervio ciático, femoral, plexo cervical, nervio mediano, radial y cubital.',
      items: [
        'calent-marcha',
        'neuro-dorsal-gato-camello',
        'neuro-lumbar-ciatico',
        'neuro-lumbar-femoral',
        'neuro-dorsal-libro',
        'neuro-cuello-plexo',
        'neuro-hombro-mediano',
        'neuro-hombro-radial',
        'neuro-hombro-cubital',
        'estir-cobra-mahometano'
      ]
    },
    {
      id: 'rutina-fuerza-completa',
      title: 'Rutina Normal de Fuerza y Tono',
      purpose: 'normal',
      duration: '35 min',
      description: 'Acondicionamiento muscular completo: Piernas, Brazo, Antebrazo, Cuello y Espalda sin equipamiento complejo.',
      items: [
        'calent-marcha',
        'calent-bisagra-cadera',
        'norm-pierna-sentadilla',
        'norm-pierna-zancada',
        'norm-pierna-pm-rumano',
        'norm-brazo-flexiones',
        'norm-espalda-remo-mochila',
        'norm-brazo-fondos',
        'norm-brazo-curl',
        'norm-antebrazo-flexion',
        'norm-antebrazo-extension',
        'norm-cuello-iso-flexion',
        'norm-cuello-iso-extension',
        'norm-espalda-angeles-pared',
        'estir-cuadriceps',
        'estir-pecho-pared'
      ]
    },
    {
      id: 'rutina-terap-inferior',
      title: 'Rutina Terapéutica Región Inferior',
      purpose: 'terapeutico',
      duration: '25 min',
      description: 'Movilidad de cadera, rodillas y tobillos con estabilidad lumbo-pélvica y bomba venosa.',
      items: [
        'terap-tobillo-bomba',
        'terap-puente-gluteo',
        'norm-pierna-gemelos',
        'neuro-lumbar-bascula',
        'neuro-lumbar-ciatico',
        'terap-core-deadbug',
        'estir-gluteos-piramidal',
        'estir-isquiotibiales'
      ]
    },
    {
      id: 'rutina-terap-superior',
      title: 'Rutina Terapéutica Región Superior',
      purpose: 'terapeutico',
      duration: '25 min',
      description: 'Alivio de cuello, hombros y escápulas, movilidad torácica y fuerza postural.',
      items: [
        'calent-circulos-brazos',
        'terap-cervical-suave',
        'terap-escapular-retraccion',
        'norm-espalda-angeles-pared',
        'neuro-dorsal-libro',
        'neuro-cuello-axial',
        'norm-cuello-flexores-prof',
        'estir-pecho-pared',
        'estir-cuello-trapecio'
      ]
    },
    {
      id: 'rutina-pausa-activa',
      title: 'Pausa Activa de 5 Minutos (Laboral)',
      purpose: 'terapeutico',
      duration: '5 min',
      description: 'Ideal para personas que trabajan sentadas: alivia cuello, muñecas, espalda y reactiva la circulación.',
      items: [
        'terap-cervical-suave',
        'norm-antebrazo-pron-sup',
        'terap-escapular-retraccion',
        'terap-tobillo-bomba',
        'estir-cuello-trapecio'
      ]
    }
  ];

  // Exportar a espacio global
  global.EXERCISES_DATABASE = {
    areas: AREAS,
    purposes: PURPOSES,
    infographics: INFOGRAPHICS,
    exercises: EXERCISES,
    routines: ROUTINES,
    generateSvgFigure: generateSvgFigure
  };

})(typeof window !== 'undefined' ? window : this);
