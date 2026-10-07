/**
 * Antigravity Rutinas - Base de Datos Maestra de Ejercicios
 * Figuras Anatómicas y Siluetas Humanas Reales (Sin cartoons ni monigotes)
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

  /**
   * Generador de Siluetas Humanas Anatómicas Reales en SVG
   * Modela contornos anatómicos del cuerpo humano (cabeza, torso, deltoides, piernas, glúteos)
   * con flechas de vector biomecánico y sombreado muscular.
   */
  function generateSvgFigure(kind) {
    const bg = '#0f172a';
    const silDark = '#1e3a5f';
    const silActive = '#38bdf8';
    const muscleAccent = '#f59e0b';
    const nervePurple = '#c084fc';

    switch(kind) {
      // SILUETA HUMANA: SENTADILLA / TREN INFERIOR
      case 'squat-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <!-- Silueta en bipedestación (inicio tenue) -->
          <g opacity="0.3">
            <path d="M70 42 C76 42 80 47 80 54 C80 61 76 65 70 65 C64 65 60 61 60 54 C60 47 64 42 70 42 Z" fill="#94a3b8"/>
            <path d="M63 68 C68 66 73 66 78 68 C83 72 84 85 83 105 C83 118 81 126 77 128 C73 130 68 130 64 128 C60 126 58 118 58 105 C57 85 58 72 63 68 Z" fill="#94a3b8"/>
            <path d="M62 128 L60 180 L70 180 L72 128 Z" fill="#94a3b8"/>
            <path d="M72 128 L74 180 L84 180 L82 128 Z" fill="#94a3b8"/>
          </g>
          <!-- Flecha de descenso pélvico -->
          <path d="M90 95 C115 90 135 110 150 120" stroke="${muscleAccent}" stroke-width="3" stroke-linecap="round" fill="none" stroke-dasharray="4 4"/>
          <polygon points="152,114 156,124 145,123" fill="${muscleAccent}"/>
          <!-- Silueta humana en sentadilla profunda anatómica -->
          <g>
            <!-- Cabeza y cuello alineados -->
            <path d="M192 68 C198 68 203 73 203 80 C203 87 198 92 192 92 C186 92 181 87 181 80 C181 73 186 68 192 68 Z" fill="${silActive}"/>
            <!-- Tronco y pecho erguido a 45° con musculatura de espalda -->
            <path d="M185 93 C180 96 172 104 163 115 C155 125 146 135 137 136 C131 137 127 131 132 124 C140 114 150 102 162 94 C170 89 178 88 185 93 Z" fill="${silActive}"/>
            <!-- Brazos extendidos al frente para equilibrio -->
            <path d="M180 98 C195 98 220 95 240 92 C243 92 245 95 242 97 C222 102 198 105 178 105 Z" fill="${silActive}"/>
            <!-- Muslos / Cuádriceps y Glúteos (Área de Trabajo) -->
            <path d="M137 136 C148 136 170 134 195 133 C204 133 210 139 205 145 C190 160 165 158 135 152 C125 149 126 136 137 136 Z" fill="${muscleAccent}"/>
            <!-- Piernas / Pantorrilla hacia talón -->
            <path d="M195 135 C198 145 197 165 190 178 C188 181 185 181 183 178 C180 168 182 152 185 140 Z" fill="${silActive}"/>
            <!-- Pie plano en el suelo (talón firme) -->
            <path d="M178 178 C185 176 198 176 206 179 C207 181 204 183 195 183 L175 183 Z" fill="${silActive}"/>
          </g>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Silueta Humana: Descenso de Cadera y Tronco Neutro</text>
        </svg>`;

      // SILUETA HUMANA: ZANCADA (LUNGE)
      case 'lunge-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <!-- Cabeza y torso erguido vertical -->
          <circle cx="135" cy="52" r="11" fill="${silActive}"/>
          <path d="M130 65 C135 64 140 64 143 66 C147 75 146 100 144 118 C140 120 132 120 128 118 C126 100 126 75 130 65 Z" fill="${silActive}"/>
          <!-- Pierna delantera flexionada a 90° -->
          <path d="M138 116 C150 118 168 122 182 126 C186 128 185 135 180 137 C168 135 150 130 136 126 Z" fill="${muscleAccent}"/>
          <path d="M182 126 C184 138 183 158 182 178 L174 178 C174 158 175 138 178 126 Z" fill="${silActive}"/>
          <rect x="170" y="176" width="22" height="6" rx="2" fill="${silActive}"/>
          <!-- Pierna trasera en ángulo de 90° hacia el suelo -->
          <path d="M130 116 C115 125 100 136 92 145 C88 143 89 136 96 130 C108 120 122 114 130 116 Z" fill="${muscleAccent}"/>
          <path d="M92 145 C92 155 92 168 91 176 L83 176 C83 165 84 152 86 143 Z" fill="${silActive}"/>
          <circle cx="91" cy="176" r="4" fill="${muscleAccent}"/>
          <!-- Vector direccional 90/90 -->
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Zancada Anatómica: 90° Delantera / 90° Trasera</text>
        </svg>`;

      // SILUETA HUMANA: REMO DE ESPALDA CON MOCHILA / CARGA
      case 'row-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <!-- Cabeza alineada con columna a 45° -->
          <circle cx="85" cy="62" r="10" fill="${silActive}"/>
          <!-- Tronco anatómico inclinado recto -->
          <path d="M92 70 C105 76 122 88 142 108 C138 114 130 116 124 112 C108 96 95 84 88 77 Z" fill="${muscleAccent}"/>
          <!-- Piernas semiflexionadas con cadera atrás -->
          <path d="M142 108 C148 116 154 130 156 148 L147 150 C144 134 139 122 135 114 Z" fill="${silActive}"/>
          <path d="M156 148 L152 178 L143 178 L147 150 Z" fill="${silActive}"/>
          <rect x="140" y="176" width="22" height="6" rx="2" fill="${silActive}"/>
          <!-- Brazo jalando con codo arriba pegado a costillas -->
          <path d="M102 78 C115 72 130 68 136 78 C138 88 132 102 126 116 L118 114 C124 100 128 88 126 82 C122 78 112 80 102 85 Z" fill="${silActive}"/>
          <!-- Mochila / Peso en tracción -->
          <rect x="114" y="112" width="26" height="28" rx="5" fill="#64748b" stroke="#94a3b8" stroke-width="1.5"/>
          <path d="M127 75 L127 60" stroke="${muscleAccent}" stroke-width="3" stroke-linecap="round"/>
          <polygon points="127,55 123,65 131,65" fill="${muscleAccent}"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Remo Anatómico: Retracción Escapular y Codo Atrás</text>
        </svg>`;

      // SILUETA HUMANA: PESO MUERTO RUMANO (BISAGRA DE CADERA)
      case 'deadlift-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <circle cx="85" cy="72" r="10" fill="${silActive}"/>
          <!-- Columna neutra como tabla oblicua -->
          <path d="M92 78 C110 86 135 102 155 116 C152 122 144 124 138 120 C120 104 102 90 90 84 Z" fill="${silActive}"/>
          <!-- Glúteo e isquiotibiales en tensión elástica (resaltados) -->
          <path d="M155 116 C164 124 165 142 162 158 C158 160 152 158 152 150 C154 138 150 126 142 120 Z" fill="${muscleAccent}"/>
          <path d="M162 158 L158 178 L150 178 L152 150 Z" fill="${silActive}"/>
          <!-- Brazos colgando perpendiculares con carga pegada a espinillas -->
          <path d="M106 88 L106 145 L98 145 L98 88 Z" fill="${silActive}"/>
          <rect x="92" y="142" width="22" height="24" rx="4" fill="#64748b"/>
          <!-- Flecha de empuje de cadera hacia atrás -->
          <path d="M135 105 C150 95 170 95 185 105" stroke="${muscleAccent}" stroke-width="3" fill="none" stroke-dasharray="3 3"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Bisagra de Cadera: Espalda Neutra y Femorales Tensos</text>
        </svg>`;

      // SILUETA HUMANA: FLEXIONES DE BRAZO / PECHO (PUSH-UPS)
      case 'pushup-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="165" x2="260" y2="165" stroke="#334155" stroke-width="2"/>
          <!-- Cabeza alineada -->
          <circle cx="68" cy="115" r="9" fill="${silActive}"/>
          <!-- Cuerpo completo en plancha recta como tabla -->
          <path d="M75 118 C115 125 165 135 220 152 L218 158 C162 142 112 132 73 125 Z" fill="${silActive}"/>
          <!-- Pectoral y Tríceps activos (codo a 45°) -->
          <path d="M85 122 C92 135 98 148 94 165 L86 165 C88 150 82 138 78 126 Z" fill="${muscleAccent}"/>
          <!-- Pies apoyados en puntas -->
          <circle cx="220" cy="158" r="4" fill="${silActive}"/>
          <!-- Flecha de empuje vertical concéntrico -->
          <path d="M90 148 L90 125" stroke="${muscleAccent}" stroke-width="3" stroke-linecap="round"/>
          <polygon points="90,120 86,130 94,130" fill="${muscleAccent}"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Flexión Humana: Cuerpo en Bloque y Codos a 45°</text>
        </svg>`;

      // SILUETA HUMANA: FONDOS DE TRÍCEPS EN SILLA
      case 'dips-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <!-- Silla de soporte -->
          <rect x="70" y="115" width="45" height="10" rx="2" fill="#475569"/>
          <line x1="72" y1="125" x2="72" y2="180" stroke="#475569" stroke-width="4"/>
          <line x1="110" y1="125" x2="110" y2="180" stroke="#475569" stroke-width="4"/>
          <line x1="72" y1="80" x2="72" y2="125" stroke="#475569" stroke-width="4"/>
          <!-- Silueta en fondo (tríceps 90°) -->
          <circle cx="118" cy="72" r="10" fill="${silActive}"/>
          <path d="M112 85 C116 85 124 85 126 88 C128 102 128 122 126 142 C122 144 116 144 112 142 C110 122 110 102 112 85 Z" fill="${silActive}"/>
          <!-- Brazo flexionado a 90° con manos en asiento -->
          <path d="M114 90 C105 92 98 100 100 110 C102 115 106 115 108 115 L108 120 C100 120 94 115 92 108 C90 96 100 86 112 84 Z" fill="${muscleAccent}"/>
          <!-- Piernas apoyadas adelante -->
          <path d="M126 138 C145 140 165 142 178 145 C180 155 180 170 178 178 L170 178 C172 170 172 156 170 148 C158 146 142 144 126 142 Z" fill="${silActive}"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Fondos: Espalda Pegada a Silla y Tríceps a 90°</text>
        </svg>`;

      // SILUETA HUMANA: CURL DE BÍCEPS CON MOCHILA / PESO
      case 'biceps-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <!-- Atleta de pie erguido -->
          <circle cx="125" cy="48" r="11" fill="${silActive}"/>
          <path d="M118 62 C125 60 135 60 140 64 C144 76 144 105 142 125 C138 127 125 127 120 125 C118 105 118 76 118 62 Z" fill="${silActive}"/>
          <!-- Piernas firmes -->
          <path d="M122 125 L120 178 L128 178 L130 125 Z" fill="${silActive}"/>
          <path d="M132 125 L134 178 L142 178 L140 125 Z" fill="${silActive}"/>
          <!-- Brazo flexionando codo pegado al torso -->
          <path d="M135 70 C138 82 138 96 136 102 C134 104 128 104 128 100 C130 92 130 80 128 72 Z" fill="${silActive}"/>
          <!-- Antebrazo y Bíceps en contracción máxima -->
          <path d="M136 102 C145 92 152 78 152 70 C156 70 158 74 156 82 C150 94 142 106 136 108 Z" fill="${muscleAccent}"/>
          <!-- Carga / Botella en mano -->
          <rect x="146" y="58" width="16" height="20" rx="3" fill="#64748b"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Curl Anatómico: Codos Pegados y Aislamiento de Bíceps</text>
        </svg>`;

      // SILUETA HUMANA: SUPERMAN EN SUELO
      case 'superman-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="165" x2="260" y2="165" stroke="#334155" stroke-width="2"/>
          <!-- Pelvis apoyada en suelo, arco suave hacia arriba en ambos extremos -->
          <path d="M60 115 C85 125 125 145 145 148 C165 145 205 125 230 115 C228 122 195 138 145 152 C95 138 62 122 60 115 Z" fill="${muscleAccent}"/>
          <!-- Cabeza neutra despegada del suelo -->
          <circle cx="80" cy="118" r="9" fill="${silActive}"/>
          <!-- Brazos extendidos en Y hacia adelante -->
          <path d="M88 122 C75 116 60 112 45 108 C46 114 62 120 78 126 Z" fill="${silActive}"/>
          <!-- Piernas extendidas despegadas atrás -->
          <path d="M175 138 C195 132 220 122 245 110 C242 118 215 132 185 142 Z" fill="${silActive}"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Superman: Elongación Axial de Espalda sin Hiperextender</text>
        </svg>`;

      // SILUETA HUMANA: NEURODINÁMICO SLUMP CIÁTICO
      case 'slump-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <!-- Silla de exploración -->
          <rect x="80" y="115" width="55" height="10" rx="2" fill="#475569"/>
          <line x1="85" y1="125" x2="85" y2="180" stroke="#475569" stroke-width="4"/>
          <line x1="130" y1="125" x2="130" y2="180" stroke="#475569" stroke-width="4"/>
          <!-- Persona sentada con cifosis / slump redondeado -->
          <circle cx="102" cy="72" r="10" fill="${nervePurple}"/>
          <!-- Columna relajada en flexión suave -->
          <path d="M98 84 C92 98 94 112 108 122 C116 122 130 122 142 122" stroke="${silActive}" stroke-width="12" stroke-linecap="round" fill="none"/>
          <!-- Pierna extendiéndose en deslizamiento -->
          <path d="M140 122 C165 125 195 130 220 132" stroke="${muscleAccent}" stroke-width="10" stroke-linecap="round" fill="none"/>
          <!-- Pie con dorsiflexión suave -->
          <path d="M220 132 L225 118" stroke="${nervePurple}" stroke-width="6" stroke-linecap="round"/>
          <!-- Línea de recorrido del Nervio Ciático -->
          <path d="M102 85 Q115 110 145 122 T220 132" stroke="${nervePurple}" stroke-width="3" stroke-dasharray="4 4" fill="none"/>
          <text x="140" y="28" fill="#c084fc" font-size="11" font-weight="700" text-anchor="middle">Slump Ciático: Deslizamiento Neural en Balancín</text>
        </svg>`;

      // SILUETA HUMANA: NEURODINÁMICA DE BRAZO / NERVIO MEDIANO
      case 'nerve-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <!-- Cabeza inclinada contralateralmente con rostro anatómico -->
          <circle cx="95" cy="56" r="11" fill="${nervePurple}"/>
          <path d="M90 68 C96 66 104 66 108 70 C112 85 112 115 110 140 L98 140 C94 115 92 85 90 68 Z" fill="${silActive}"/>
          <path d="M98 140 L96 180 L104 180 L106 140 Z" fill="${silActive}"/>
          <!-- Brazo en abducción 90° con codo extendido y muñeca en bandeja -->
          <path d="M108 75 C135 78 170 80 210 82" stroke="${silActive}" stroke-width="10" stroke-linecap="round" fill="none"/>
          <!-- Mano extendida (posición camarero) -->
          <path d="M210 82 L218 68" stroke="${nervePurple}" stroke-width="6" stroke-linecap="round"/>
          <!-- Recorrido del Nervio Mediano desde C5 hasta dedos -->
          <path d="M95 64 Q145 74 212 80" stroke="${nervePurple}" stroke-width="3" stroke-dasharray="4 4" fill="none"/>
          <text x="140" y="28" fill="#c084fc" font-size="11" font-weight="700" text-anchor="middle">Nervio Mediano: Abducción de Brazo con Cuello Coordinado</text>
        </svg>`;

      // SILUETA HUMANA: CUELLO ISOMÉTRICO / ALINEACIÓN CERVICAL
      case 'neck-human':
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <!-- Busto anatómico humano -->
          <path d="M80 180 C90 145 115 130 140 130 C165 130 190 145 200 180 Z" fill="${silDark}" stroke="${silActive}" stroke-width="2"/>
          <!-- Cuello fuerte y alargado -->
          <path d="M132 130 L132 85 L148 85 L148 130 Z" fill="${silActive}"/>
          <!-- Cabeza humana de perfil/frente neutra -->
          <circle cx="140" cy="62" r="18" fill="${silActive}"/>
          <!-- Mano aplicando resistencia isométrica controlada -->
          <path d="M165 62 L158 62" stroke="${muscleAccent}" stroke-width="6" stroke-linecap="round"/>
          <!-- Flechas de vector de fuerza contrapuesta equilibrada -->
          <path d="M185 62 L168 62" stroke="${muscleAccent}" stroke-width="3" stroke-linecap="round"/>
          <polygon points="163,62 173,57 173,67" fill="${muscleAccent}"/>
          <path d="M120 62 L132 62" stroke="${silActive}" stroke-width="3" stroke-linecap="round"/>
          <polygon points="137,62 127,57 127,67" fill="${silActive}"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Isométrico Cervical: Fuerza Contrapuesta sin Movimiento</text>
        </svg>`;

      // SILUETA HUMANA POR DEFECTO: POSTURA ANATÓMICA ERGUIDA
      default:
        return `<svg viewBox="0 0 280 200" class="ex-svg-art" xmlns="http://www.w3.org/2000/svg">
          <rect width="280" height="200" fill="${bg}" rx="12"/>
          <line x1="20" y1="180" x2="260" y2="180" stroke="#334155" stroke-width="2"/>
          <circle cx="140" cy="48" r="12" fill="${silActive}"/>
          <path d="M130 63 C138 60 148 60 152 64 C158 78 156 112 152 130 C146 132 134 132 128 130 C124 112 124 78 130 63 Z" fill="${silActive}"/>
          <path d="M132 130 L130 180 L138 180 L140 130 Z" fill="${silActive}"/>
          <path d="M142 130 L144 180 L152 180 L150 130 Z" fill="${silActive}"/>
          <path d="M126 66 L112 110" stroke="${silActive}" stroke-width="7" stroke-linecap="round"/>
          <path d="M154 66 L168 110" stroke="${silActive}" stroke-width="7" stroke-linecap="round"/>
          <text x="140" y="28" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">Figura Humana: Alineación Postural y Control Motor</text>
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
      image: 'assets/exercises-web/supported-squat-male-v2.jpg',
      svgKind: 'squat-human',
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
      svgKind: 'lunge-human',
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
      svgKind: 'deadlift-human',
      targetMuscles: 'Isquiotibiales (femorales), glúteo mayor, erectores espinales',
      phaseInicio: 'Párate de pie con los pies separados al ancho de las caderas. Sostén las asas de la mochila o mancuernas pegadas a los muslos con ambas manos. Hombros hacia atrás y abajo (retracción escapular activa), pecho alto, y rodillas con una flexión muy ligera (semiflexionadas pero bloqueadas en ese ángulo fijo).',
      phaseEjecucion: 'Inhala y empuja la pelvis directamente hacia atrás como si quisieras tocar una pared detrás de ti con los glúteos. El tronco desciende por flexión de cadera (bisagra), deslizando la carga pegadísima a los muslos y espinillas. Mantén la espalda como una tabla recta. Siente la tensión elástica y el estiramiento en la parte posterior de los muslos hasta justo debajo de la rodilla.',
      phaseFinal: 'Sin redondear la columna ni bajar más de la cuenta, exhala y contrae con firmeza los glúteos y femorales para empujar la pelvis hacia adelante hasta volver a la verticalidad. Termina con el torso perfectamente alineado sin arquear la espalda baja.',
      erroresComunes: 'Doblar las rodillas como si fuera una sentadilla, separar la carga del cuerpo aumentando la palanca lumbar, o mirar hacia arriba quebrando el cuello.'
    },
    {
      id: 'norm-pierna-gemelos',
      title: 'Elevación de Talones para Gemelos (Calf Raises)',
      area: 'piernas',
      purpose: 'normal',
      level: 'Básico a Intermedio',
      dose: '3 series × 15-20 repeticiones',
      rest: '30 segundos',
      image: 'assets/exercises-web/leg-raise.jpg',
      svgKind: 'squat-human',
      targetMuscles: 'Gastrocnemios (gemelos), sóleo y tendón de Aquiles',
      phaseInicio: 'De pie sobre el suelo plano o borde de un escalón firme, pies paralelos al ancho de caderas. Apoya las yemas de los dedos en una pared o respaldo de silla únicamente para equilibrio leve.',
      phaseEjecucion: 'Empuja con la bola de los dedos del pie, elevando los talones lo más alto posible de forma vertical y enérgica en 1 segundo. Mantén la contracción máxima arriba durante 2 segundos completos apretando las pantorrillas.',
      phaseFinal: 'Baja los talones de manera lenta y resistida en 3 segundos hasta sentir un estiramiento suave y seguro en el tendón de Aquiles. Detén el movimiento antes de rebotar y repite.',
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
      svgKind: 'pushup-human',
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
      svgKind: 'dips-human',
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
      svgKind: 'biceps-human',
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
      svgKind: 'dips-human',
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
      image: 'assets/exercises-web/wrist-stretch-v2.jpg',
      svgKind: 'nerve-human',
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
      image: 'assets/exercises-web/wrist-stretch-v2.jpg',
      svgKind: 'nerve-human',
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
      image: 'assets/exercises-web/wrist-stretch-v2.jpg',
      svgKind: 'nerve-human',
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
      image: 'assets/exercises-web/wrist-stretch-v2.jpg',
      svgKind: 'nerve-human',
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
      svgKind: 'neck-human',
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
      svgKind: 'neck-human',
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
      image: 'assets/exercises-web/neck-stretch-male-v2.jpg',
      svgKind: 'neck-human',
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
      image: 'assets/exercises-web/neck-stretch-male-v2.jpg',
      svgKind: 'neck-human',
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
      svgKind: 'row-human',
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
      svgKind: 'row-human',
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
      svgKind: 'superman-human',
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
      svgKind: 'neck-human',
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
      svgKind: 'slump-human',
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
      svgKind: 'slump-human',
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
      image: 'assets/exercises-web/pelvic-tilt.jpg',
      svgKind: 'slump-human',
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
      image: 'assets/exercises-web/open-book-male-v2.jpg',
      svgKind: 'slump-human',
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
      svgKind: 'superman-human',
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
      svgKind: 'superman-human',
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
      svgKind: 'nerve-human',
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
      image: 'assets/exercises-web/neck-stretch-male-v2.jpg',
      svgKind: 'neck-human',
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
      svgKind: 'nerve-human',
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
      svgKind: 'nerve-human',
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
      svgKind: 'nerve-human',
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
      image: 'assets/exercises-web/neck-stretch-male-v2.jpg',
      svgKind: 'neck-human',
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
      svgKind: 'neck-human',
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
      image: 'assets/exercises-web/bridge-male-v2.jpg',
      svgKind: 'squat-human',
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
      image: 'assets/exercises-web/leg-raise.jpg',
      svgKind: 'slump-human',
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
      svgKind: 'superman-human',
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
      image: 'assets/exercises-web/hip-mobility.jpg',
      svgKind: 'squat-human',
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
      image: 'assets/exercises-web/walk-cycle.jpg',
      svgKind: 'squat-human',
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
      svgKind: 'nerve-human',
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
      svgKind: 'deadlift-human',
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
      svgKind: 'lunge-human',
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
      image: 'assets/exercises-web/hip-mobility.jpg',
      svgKind: 'deadlift-human',
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
      image: 'assets/exercises-web/glute-stretch.jpg',
      svgKind: 'slump-human',
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
      image: 'assets/exercises-web/cobra-child.jpg',
      svgKind: 'superman-human',
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
      svgKind: 'nerve-human',
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
      image: 'assets/exercises-web/neck-stretch-male-v2.jpg',
      svgKind: 'neck-human',
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
