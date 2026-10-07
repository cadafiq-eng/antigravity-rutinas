/**
 * Antigravity Rutinas PWA - Lógica de Aplicación
 * - Reloj en tiempo real en cabecera
 * - Temporizador / Cronómetro con Web Audio API (100% offline, cero archivos externos)
 * - Filtros dinámicos por Zona y Propósito
 * - Modal con explicación detallada en 3 Fases (Inicio, Ejecución, Final, Errores)
 * - Galería interactiva de infografías en HD
 * - Modo Claro / Oscuro con persistencia en localStorage
 * - Soporte PWA y Service Worker
 */

(function() {
  'use strict';

  const DB = window.EXERCISES_DATABASE;
  if (!DB) {
    console.error('No se encontró EXERCISES_DATABASE');
    return;
  }

  // Estado global de la app
  const state = {
    theme: localStorage.getItem('antigravity_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
    activeTab: 'catalog',
    selectedArea: 'todas',
    selectedPurpose: 'todos',
    searchQuery: '',
    // Temporizador
    timerTotalSeconds: 40,
    timerRemainingSeconds: 40,
    timerRunning: false,
    timerInterval: null,
    audioContext: null,
    // Ejercicio activo en modal
    activeExercise: null,
    // Rutina activa en ejecución
    activeRoutine: null,
    activeRoutineIndex: 0
  };

  // Referencias a elementos del DOM
  const dom = {
    clockDisplay: document.getElementById('liveClockDisplay'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    timerToggleBtn: document.getElementById('timerToggleBtn'),
    timerBar: document.getElementById('timerHeroBar'),
    timerDigits: document.getElementById('timerDigitalDisplay'),
    timerLabel: document.getElementById('timerLabel'),
    timerSublabel: document.getElementById('timerSublabel'),
    timerProgressFill: document.getElementById('timerProgressFill'),
    timerStartBtn: document.getElementById('timerStartBtn'),
    timerResetBtn: document.getElementById('timerResetBtn'),
    timerPlus10Btn: document.getElementById('timerPlus10Btn'),
    timerMinus10Btn: document.getElementById('timerMinus10Btn'),
    timerPresetsContainer: document.getElementById('timerPresetsContainer'),
    
    // Filtros y búsqueda
    searchInput: document.getElementById('exerciseSearchInput'),
    purposeChipsContainer: document.getElementById('purposeChipsContainer'),
    areaChipsContainer: document.getElementById('areaChipsContainer'),
    exerciseGrid: document.getElementById('exerciseGridContainer'),
    exerciseCountBadge: document.getElementById('exerciseCountBadge'),
    
    // Infografías y Rutinas
    infographicsGrid: document.getElementById('infographicsGridContainer'),
    routinesList: document.getElementById('routinesListContainer'),
    
    // Modales
    exerciseModal: document.getElementById('exerciseDetailModal'),
    exerciseModalTitle: document.getElementById('modalExerciseTitle'),
    exerciseModalBadgeGroup: document.getElementById('modalBadgeGroup'),
    exerciseModalFigure: document.getElementById('modalFigureContainer'),
    modalDoseText: document.getElementById('modalDoseText'),
    modalTargetText: document.getElementById('modalTargetText'),
    modalInicioText: document.getElementById('modalInicioText'),
    modalEjecucionText: document.getElementById('modalEjecucionText'),
    modalFinalText: document.getElementById('modalFinalText'),
    modalErroresText: document.getElementById('modalErroresText'),
    modalTimerActionBtn: document.getElementById('modalTimerActionBtn'),
    closeExerciseModalBtn: document.getElementById('closeExerciseModalBtn'),
    
    // Modal Infografía
    infographicModal: document.getElementById('infographicZoomModal'),
    infographicModalTitle: document.getElementById('infographicModalTitle'),
    infographicFullImg: document.getElementById('infographicFullImg'),
    closeInfographicModalBtn: document.getElementById('closeInfographicModalBtn'),
    
    // Navegación dock inferior
    dockBtns: document.querySelectorAll('.dock-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    offlineBanner: document.getElementById('offlineNoticeBanner')
  };

  /* ═══════════════════════════════════════════════════════════════════
     1. TEMA CLARO / OSCURO
     ═══════════════════════════════════════════════════════════════════ */
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('antigravity_theme', theme);
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.textContent = theme === 'light' ? '☀️' : '🌙';
      dom.themeToggleBtn.setAttribute('title', theme === 'light' ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Claro');
    }
  }

  function initTheme() {
    applyTheme(state.theme);
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'light' ? 'dark' : 'light');
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     2. RELOJ EN TIEMPO REAL
     ═══════════════════════════════════════════════════════════════════ */
  function startLiveClock() {
    function updateClock() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      if (dom.clockDisplay) {
        dom.clockDisplay.textContent = `${hours}:${minutes}:${seconds}`;
      }
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════════
     3. AUDIO SINTETIZADO (Web Audio API - Cero Archivos Externos)
     ═══════════════════════════════════════════════════════════════════ */
  function playTone(freq, duration, type = 'sine') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!state.audioContext) {
        state.audioContext = new AudioCtx();
      }
      if (state.audioContext.state === 'suspended') {
        state.audioContext.resume();
      }
      const osc = state.audioContext.createOscillator();
      const gain = state.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, state.audioContext.currentTime);
      gain.gain.setValueAtTime(0.15, state.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, state.audioContext.currentTime + duration);
      osc.connect(gain);
      gain.connect(state.audioContext.destination);
      osc.start();
      osc.stop(state.audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Audio no disponible:', e);
    }
  }

  function beepTick() {
    playTone(880, 0.08, 'triangle');
  }

  function beepDone() {
    playTone(523.25, 0.15, 'sine'); // C5
    setTimeout(() => playTone(659.25, 0.15, 'sine'), 160); // E5
    setTimeout(() => playTone(783.99, 0.35, 'sine'), 320); // G5
    if ('vibrate' in navigator) {
      try { navigator.vibrate([200, 100, 300]); } catch(e) {}
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     4. TEMPORIZADOR Y CRONÓMETRO
     ═══════════════════════════════════════════════════════════════════ */
  function formatSeconds(sec) {
    sec = Math.max(0, Math.floor(sec));
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateTimerUI() {
    if (!dom.timerDigits) return;
    dom.timerDigits.textContent = formatSeconds(state.timerRemainingSeconds);

    if (state.timerTotalSeconds > 0) {
      const pct = Math.max(0, Math.min(100, ((state.timerTotalSeconds - state.timerRemainingSeconds) / state.timerTotalSeconds) * 100));
      dom.timerProgressFill.style.width = `${pct}%`;
    } else {
      dom.timerProgressFill.style.width = '0%';
    }

    if (state.timerRunning) {
      dom.timerDigits.classList.add('active');
      dom.timerDigits.classList.remove('warning');
      if (state.timerRemainingSeconds <= 5 && state.timerRemainingSeconds > 0) {
        dom.timerDigits.classList.add('warning');
      }
      dom.timerStartBtn.innerHTML = '⏸ Pausar';
      dom.timerStartBtn.classList.remove('btn-timer-primary');
      dom.timerStartBtn.classList.add('btn-timer-secondary');
    } else {
      dom.timerDigits.classList.remove('active', 'warning');
      dom.timerStartBtn.innerHTML = '▶ Iniciar';
      dom.timerStartBtn.classList.remove('btn-timer-secondary');
      dom.timerStartBtn.classList.add('btn-timer-primary');
    }
  }

  function startTimer() {
    if (state.timerRunning) return;
    if (state.timerRemainingSeconds <= 0) {
      state.timerRemainingSeconds = state.timerTotalSeconds || 40;
    }
    state.timerRunning = true;
    updateTimerUI();

    state.timerInterval = setInterval(() => {
      state.timerRemainingSeconds--;
      if (state.timerRemainingSeconds <= 3 && state.timerRemainingSeconds > 0) {
        beepTick();
      }
      if (state.timerRemainingSeconds <= 0) {
        stopTimer();
        state.timerRemainingSeconds = 0;
        updateTimerUI();
        beepDone();
        // Si hay rutina activa, avanzar
        if (state.activeRoutine) {
          advanceRoutine();
        }
      } else {
        updateTimerUI();
      }
    }, 1000);
  }

  function pauseTimer() {
    state.timerRunning = false;
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
    updateTimerUI();
  }

  function stopTimer() {
    pauseTimer();
  }

  function resetTimer() {
    pauseTimer();
    state.timerRemainingSeconds = state.timerTotalSeconds;
    updateTimerUI();
  }

  function setTimerDuration(seconds, label = 'Temporizador', sublabel = 'Control de serie / ejercicio') {
    pauseTimer();
    state.timerTotalSeconds = seconds;
    state.timerRemainingSeconds = seconds;
    if (dom.timerLabel) dom.timerLabel.textContent = label;
    if (dom.timerSublabel) dom.timerSublabel.textContent = sublabel;
    
    // Resaltar chip predeterminado si coincide
    document.querySelectorAll('.timer-preset-chip').forEach(chip => {
      const chipSec = parseInt(chip.getAttribute('data-sec'), 10);
      chip.classList.toggle('active', chipSec === seconds);
    });

    updateTimerUI();
    // Asegurar que la barra sea visible
    if (dom.timerBar && dom.timerBar.classList.contains('hidden')) {
      dom.timerBar.classList.remove('hidden');
    }
  }

  function initTimer() {
    const presets = [
      { sec: 20, text: '20s' },
      { sec: 30, text: '30s' },
      { sec: 40, text: '40s' },
      { sec: 60, text: '60s' },
      { sec: 90, text: '90s' },
      { sec: 120, text: '2m' },
      { sec: 300, text: '5m' }
    ];

    if (dom.timerPresetsContainer) {
      dom.timerPresetsContainer.innerHTML = presets.map(p => `
        <button class="timer-preset-chip ${p.sec === 40 ? 'active' : ''}" data-sec="${p.sec}">
          ${p.text}
        </button>
      `).join('');

      dom.timerPresetsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.timer-preset-chip');
        if (chip) {
          const sec = parseInt(chip.getAttribute('data-sec'), 10);
          setTimerDuration(sec, 'Temporizador', `Objetivo: ${chip.textContent}`);
        }
      });
    }

    if (dom.timerStartBtn) {
      dom.timerStartBtn.addEventListener('click', () => {
        if (state.timerRunning) {
          pauseTimer();
        } else {
          startTimer();
        }
      });
    }

    if (dom.timerResetBtn) {
      dom.timerResetBtn.addEventListener('click', resetTimer);
    }

    if (dom.timerPlus10Btn) {
      dom.timerPlus10Btn.addEventListener('click', () => {
        state.timerTotalSeconds += 10;
        state.timerRemainingSeconds += 10;
        updateTimerUI();
      });
    }

    if (dom.timerMinus10Btn) {
      dom.timerMinus10Btn.addEventListener('click', () => {
        if (state.timerRemainingSeconds > 10) {
          state.timerRemainingSeconds -= 10;
          state.timerTotalSeconds = Math.max(10, state.timerTotalSeconds - 10);
          updateTimerUI();
        }
      });
    }

    if (dom.timerToggleBtn) {
      dom.timerToggleBtn.addEventListener('click', () => {
        dom.timerBar.classList.toggle('hidden');
      });
    }

    setTimerDuration(40, 'Temporizador listo', 'Elige un ejercicio o selecciona un preset');
  }

  /* ═══════════════════════════════════════════════════════════════════
     5. RENDER Y FILTRADO DE EJERCICIOS
     ═══════════════════════════════════════════════════════════════════ */
  function initFilters() {
    // Chips de Propósito
    if (dom.purposeChipsContainer) {
      dom.purposeChipsContainer.innerHTML = DB.purposes.map(p => `
        <button class="filter-chip ${p.id === state.selectedPurpose ? 'active' : ''}" data-purpose="${p.id}">
          <span>${p.icon}</span> ${p.label}
        </button>
      `).join('');

      dom.purposeChipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (chip) {
          dom.purposeChipsContainer.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          state.selectedPurpose = chip.getAttribute('data-purpose');
          renderExercises();
        }
      });
    }

    // Chips de Zona Corporal
    if (dom.areaChipsContainer) {
      dom.areaChipsContainer.innerHTML = DB.areas.map(a => `
        <button class="filter-chip ${a.id === state.selectedArea ? 'active' : ''}" data-area="${a.id}">
          <span>${a.icon}</span> ${a.label}
        </button>
      `).join('');

      dom.areaChipsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (chip) {
          dom.areaChipsContainer.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          state.selectedArea = chip.getAttribute('data-area');
          renderExercises();
        }
      });
    }

    // Input de búsqueda con debounce
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        renderExercises();
      });
    }
  }

  function getBadgeClass(purpose) {
    switch(purpose) {
      case 'normal': return 'badge-normal';
      case 'neurodinamico': return 'badge-neuro';
      case 'terapeutico': return 'badge-terap';
      case 'calentamiento': return 'badge-warm';
      case 'estiramiento': return 'badge-stretch';
      default: return 'badge-terap';
    }
  }

  function getPurposeLabel(purpose) {
    const found = DB.purposes.find(p => p.id === purpose);
    return found ? `${found.icon} ${found.label.split('/')[0].trim()}` : purpose;
  }

  function renderExercises() {
    if (!dom.exerciseGrid) return;

    const filtered = DB.exercises.filter(ex => {
      // Filtro de propósito
      const purposeMatch = state.selectedPurpose === 'todos' || ex.purpose === state.selectedPurpose;
      
      // Filtro de zona corporal
      const areaMatch = state.selectedArea === 'todas' || ex.area === state.selectedArea;
      
      // Búsqueda por texto
      const q = state.searchQuery;
      const textMatch = !q || 
        ex.title.toLowerCase().includes(q) ||
        ex.targetMuscles.toLowerCase().includes(q) ||
        ex.phaseInicio.toLowerCase().includes(q) ||
        ex.phaseEjecucion.toLowerCase().includes(q);

      return purposeMatch && areaMatch && textMatch;
    });

    if (dom.exerciseCountBadge) {
      dom.exerciseCountBadge.textContent = `${filtered.length} ejercicio${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      dom.exerciseGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: var(--surface); border-radius: var(--radius-md); border: 1px dashed var(--border);">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">🔍</div>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 6px;">No se encontraron ejercicios</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Prueba seleccionando otra zona, cambiando de propósito o borrando el término de búsqueda.</p>
        </div>
      `;
      return;
    }

    dom.exerciseGrid.innerHTML = filtered.map(ex => {
      const visualContent = ex.image
        ? `<div style="position:relative; width:100%;"><span class="human-fig-badge">👤 Figura Humana Real</span><img src="${ex.image}" alt="${ex.title}" class="ex-human-img" loading="lazy"></div>`
        : DB.generateSvgFigure(ex.svgKind || 'default');
      const badgeCls = getBadgeClass(ex.purpose);
      const purposeLbl = getPurposeLabel(ex.purpose);

      return `
        <article class="exercise-card" data-id="${ex.id}">
          <div class="card-top">
            <div class="card-title-group">
              <h3>${ex.title}</h3>
              <div class="card-tags">
                <span class="badge ${badgeCls}">${purposeLbl}</span>
                <span class="badge" style="background: var(--bg-soft); color: var(--text-muted); border: 1px solid var(--border);">
                  📍 ${ex.area.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div class="exercise-figure-wrapper" onclick="window.appOpenDetail('${ex.id}')" title="Toca para ver técnica y figura completa">
            ${visualContent}
          </div>

          <div class="card-summary-box">
            <strong>Músculos / Objetivo:</strong>
            ${ex.targetMuscles}
          </div>

          <div class="card-dose-row">
            <span>⏱️ <strong>${ex.dose}</strong></span>
            <span>Descanso: ${ex.rest}</span>
          </div>

          <div class="card-actions">
            <button class="btn-card btn-card-pri" onclick="window.appOpenDetail('${ex.id}')">
              📖 Ver Técnica (3 Fases)
            </button>
            <button class="btn-card btn-card-sec" onclick="window.appSetTimerForExercise('${ex.id}')">
              ⏱️ Timer
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ═══════════════════════════════════════════════════════════════════
     6. MODAL DE DETALLE DE TÉCNICA (3 FASES: INICIO - EJECUCIÓN - FINAL)
     ═══════════════════════════════════════════════════════════════════ */
  window.appOpenDetail = function(exerciseId) {
    const ex = DB.exercises.find(item => item.id === exerciseId);
    if (!ex) return;

    state.activeExercise = ex;

    dom.exerciseModalTitle.textContent = ex.title;
    
    // Badges en cabecera
    const badgeCls = getBadgeClass(ex.purpose);
    const purposeLbl = getPurposeLabel(ex.purpose);
    dom.exerciseModalBadgeGroup.innerHTML = `
      <span class="badge ${badgeCls}">${purposeLbl}</span>
      <span class="badge" style="background: var(--bg-soft); color: var(--text-muted); border: 1px solid var(--border);">
        📍 Zona: ${ex.area.toUpperCase()}
      </span>
      <span class="badge" style="background: var(--bg-soft); color: var(--text-muted); border: 1px solid var(--border);">
        Nivel: ${ex.level}
      </span>
    `;

    // Figura: Imagen 3D real si existe, o silueta humana anatómica
    dom.exerciseModalFigure.innerHTML = ex.image
      ? `<div style="position:relative; width:100%; text-align:center;"><span class="human-fig-badge">👤 Figura Humana Real</span><img src="${ex.image}" alt="${ex.title}" class="ex-human-img modal-img" loading="lazy"></div>`
      : DB.generateSvgFigure(ex.svgKind || 'default');

    // Datos generales
    dom.modalDoseText.textContent = ex.dose;
    dom.modalTargetText.textContent = ex.targetMuscles;

    // Las 3 fases detalladas + Errores
    dom.modalInicioText.textContent = ex.phaseInicio;
    dom.modalEjecucionText.textContent = ex.phaseEjecucion;
    dom.modalFinalText.textContent = ex.phaseFinal;
    dom.modalErroresText.textContent = ex.erroresComunes;

    // Configurar botón de timer en modal
    dom.modalTimerActionBtn.onclick = () => {
      window.appSetTimerForExercise(ex.id);
      closeExerciseModal();
    };

    dom.exerciseModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeExerciseModal() {
    dom.exerciseModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.appSetTimerForExercise = function(exerciseId) {
    const ex = DB.exercises.find(item => item.id === exerciseId);
    if (!ex) return;

    // Extraer segundos de la dosis o asignar predeterminado
    let seconds = 40;
    if (ex.dose.includes('segundos') || ex.dose.includes('s ')) {
      const match = ex.dose.match(/(\d+)\s*(segundos|s)/i);
      if (match) seconds = parseInt(match[1], 10);
    } else if (ex.dose.includes('min')) {
      const match = ex.dose.match(/(\d+)\s*min/i);
      if (match) seconds = parseInt(match[1], 10) * 60;
    }

    setTimerDuration(seconds, ex.title, `Dosis sugerida: ${ex.dose} · Descanso: ${ex.rest}`);
    startTimer();

    // Scroll suave hacia la barra del timer si está arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ═══════════════════════════════════════════════════════════════════
     7. GALERÍA DE INFOGRAFÍAS (6 INFOGRAFÍAS EN ALTA DEFINICIÓN)
     ═══════════════════════════════════════════════════════════════════ */
  function renderInfographics() {
    if (!dom.infographicsGrid) return;

    dom.infographicsGrid.innerHTML = DB.infographics.map(info => `
      <article class="info-card">
        <div class="info-thumb-wrap" onclick="window.appOpenInfographic('${info.id}')">
          <img src="${info.file}" alt="${info.title}" class="info-thumb-img" loading="lazy">
          <div class="info-overlay-zoom">
            🔍 Toca para ampliar infografía completa
          </div>
        </div>
        <div class="info-content">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge badge-terap">${info.tag}</span>
            <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">⏱️ ${info.duration}</span>
          </div>
          <h3>${info.title}</h3>
          <p>${info.subtitle}</p>
          <button class="info-btn" onclick="window.appOpenInfographic('${info.id}')">
            🖼️ Abrir Infografía en HD
          </button>
        </div>
      </article>
    `).join('');
  }

  window.appOpenInfographic = function(infoId) {
    const info = DB.infographics.find(i => i.id === infoId);
    if (!info) return;

    dom.infographicModalTitle.textContent = info.title;
    dom.infographicFullImg.src = info.file;
    dom.infographicModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeInfographicModal() {
    dom.infographicModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ═══════════════════════════════════════════════════════════════════
     8. RUTINAS GUIADAS
     ═══════════════════════════════════════════════════════════════════ */
  function renderRoutines() {
    if (!dom.routinesList) return;

    dom.routinesList.innerHTML = DB.routines.map(r => {
      const itemsHtml = r.items.map(exId => {
        const ex = DB.exercises.find(e => e.id === exId);
        return `<span class="routine-item-chip">${ex ? ex.title : exId}</span>`;
      }).join('');

      return `
        <article class="routine-card">
          <div class="routine-header">
            <div>
              <h3>${r.title}</h3>
              <p style="color:var(--text-muted); font-size:0.85rem; margin-top:2px;">${r.description}</p>
            </div>
            <span>⏱️ ${r.duration}</span>
          </div>

          <div class="routine-items-preview">
            ${itemsHtml}
          </div>

          <div style="display:flex; gap:10px; margin-top:6px;">
            <button class="btn-card btn-card-pri" onclick="window.appStartRoutine('${r.id}')" style="flex:1;">
              ▶ Iniciar Rutina Guiada (${r.items.length} ejercicios)
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  window.appStartRoutine = function(routineId) {
    const routine = DB.routines.find(r => r.id === routineId);
    if (!routine || routine.items.length === 0) return;

    state.activeRoutine = routine;
    state.activeRoutineIndex = 0;

    switchTab('catalog');
    executeRoutineStep();
  };

  function executeRoutineStep() {
    if (!state.activeRoutine) return;
    const exId = state.activeRoutine.items[state.activeRoutineIndex];
    const ex = DB.exercises.find(e => e.id === exId);
    if (!ex) return;

    window.appOpenDetail(ex.id);
    window.appSetTimerForExercise(ex.id);

    if (dom.timerSublabel) {
      dom.timerSublabel.textContent = `Rutina: ${state.activeRoutine.title} (Paso ${state.activeRoutineIndex + 1} de ${state.activeRoutine.items.length})`;
    }
  }

  function advanceRoutine() {
    if (!state.activeRoutine) return;
    state.activeRoutineIndex++;
    if (state.activeRoutineIndex < state.activeRoutine.items.length) {
      setTimeout(() => {
        executeRoutineStep();
      }, 2000);
    } else {
      state.activeRoutine = null;
      setTimerDuration(0, '🎉 ¡Rutina Completada!', 'Excelente trabajo. Recuerda hidratarte y descansar.');
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     9. NAVEGACIÓN ENTRE PESTAÑAS (DOCK)
     ═══════════════════════════════════════════════════════════════════ */
  function switchTab(tabId) {
    state.activeTab = tabId;

    dom.tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });

    dom.dockBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initNavigation() {
    dom.dockBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        switchTab(tab);
      });
    });

    // Cerrar modales con botones o clic afuera
    if (dom.closeExerciseModalBtn) {
      dom.closeExerciseModalBtn.addEventListener('click', closeExerciseModal);
    }
    if (dom.exerciseModal) {
      dom.exerciseModal.addEventListener('click', (e) => {
        if (e.target === dom.exerciseModal) closeExerciseModal();
      });
    }

    if (dom.closeInfographicModalBtn) {
      dom.closeInfographicModalBtn.addEventListener('click', closeInfographicModal);
    }
    if (dom.infographicModal) {
      dom.infographicModal.addEventListener('click', (e) => {
        if (e.target === dom.infographicModal) closeInfographicModal();
      });
    }

    // Tecla Escape para cerrar modales
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeExerciseModal();
        closeInfographicModal();
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════
     10. DETECCIÓN OFFLINE Y SERVICE WORKER
     ═══════════════════════════════════════════════════════════════════ */
  function initOfflineDetection() {
    function updateOnlineStatus() {
      if (!dom.offlineBanner) return;
      if (!navigator.onLine) {
        dom.offlineBanner.classList.add('visible');
        dom.offlineBanner.textContent = '📶 Modo sin conexión activado: La app y todas sus figuras siguen funcionando al 100%.';
      } else {
        dom.offlineBanner.classList.remove('visible');
      }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    // Registro del Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
          console.log('Service Worker registrado con éxito:', reg.scope);
        }).catch(err => {
          console.warn('Registro de Service Worker falló:', err);
        });
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════════════
     INICIALIZACIÓN GLOBAL
     ═══════════════════════════════════════════════════════════════════ */
  function init() {
    initTheme();
    startLiveClock();
    initTimer();
    initFilters();
    renderExercises();
    renderInfographics();
    renderRoutines();
    initNavigation();
    initOfflineDetection();
  }

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
