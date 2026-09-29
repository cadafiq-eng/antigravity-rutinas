# Antigravity — App PWA de Rutinas y Ejercicios

Aplicación Web Progresiva (PWA) de rutinas de ejercicio terapéuticas, neurodinámicas y de fuerza, con figuras anatómicas ilustrativas, explicación técnica detallada en 3 fases (**Inicio**, **Ejecución**, **Final y Retorno**), reloj en tiempo real, temporizador interactivo y modo Claro/Oscuro.

Diseñada **sin dependencias externas** (vanilla HTML5, CSS3 y JavaScript ES6+), 100% en **español** y con soporte completo **offline** para despliegue inmediato en **GitHub Pages**, **Vercel** o uso local.

---

## 🚀 Características Principales

1. **Catálogo Maestro de Ejercicios**:
   - **Normales**:
     - *Piernas*: Sentadilla con peso corporal/mochila, zancada hacia atrás, peso muerto rumano, elevación de talones (gemelos).
     - *Brazos*: Flexiones de brazos (suelo/mesa), fondos de tríceps en silla, curl de bíceps con mochila/botellas, extensión vertical de tríceps.
     - *Antebrazo y Manos*: Flexión de muñeca con carga suave, extensión de muñeca en pronación, pronación y supinación con botella, fuerza de agarre isométrica.
     - *Cuello*: Fortalecimiento isométrico cervical en flexión, extensión, inclinación lateral y flexores profundos (*chin-tuck*).
     - *Espalda*: Remo inclinado con mochila, remo invertido bajo mesa firme, superman con control lumbar, retracción escapular y ángeles en pared, bisagra de cadera.
   - **Neurodinámicos**:
     - *Zona Lumbar*: Deslizamiento neural del nervio ciático (*Slump slider* sentado), deslizamiento del nervio femoral/crural en decúbito, báscula pélvica rítmica.
     - *Zona Dorsal*: "Libro abierto" (deslizamiento neural torácico e intercostal), gato-camello segmentario coordinado, rotación torácica con apertura.
     - *Cuello*: Deslizamiento del plexo braquial cervical, deslizamiento cervical axial con inclinación contralateral.
     - *Hombros*: Deslizamiento del nervio mediano (ULNT1 cuna), deslizamiento del nervio radial, deslizamiento del nervio cubital (*gafas invertidas*).
   - **Terapéuticos, Calentamiento y Vuelta a la Calma**:
     - Movilidad cervical suave, puente de glúteos, dead bug, bird-dog, bomba venosa de tobillo, estiramientos de cuádriceps, isquiotibiales, piramidal y postura del niño (mahometano).

2. **Explicación Rigurosa en 3 Fases**:
   - 🟢 **Posición Inicial (Inicio)**: Colocación exacta, alineación de columna, apoyos y respiración previa.
   - 🟡 **Ejecución (Desarrollo y Tempo)**: Recorrido, velocidad excéntrica/concéntrica, activación muscular y respiración.
   - 🔴 **Posición Final y Retorno Seguro**: Desaceleración controlada, retorno seguro sin rebotes y cómo desmontar la postura al concluir la serie.
   - ⚠️ **Errores comunes y qué evitar**.

3. **Herramientas de Sesión Integradas**:
   - **Reloj Digital en Vivo**: Hora local (HH:MM:SS) visible en la cabecera.
   - **Temporizador / Cronómetro**: Barra de progreso, display digital grande, presets rápidos (20s, 30s, 40s, 60s, 90s, 2m, 5m), botones `+10s`/`-10s` y sonidos sintetizados con **Web Audio API** (sin necesidad de archivos de audio externos, 100% offline).

4. **Accesibilidad y Personalización**:
   - Modo Oscuro 🌙 y Modo Claro ☀️ con persistencia automática en `localStorage`.
   - Diseño adaptable a móviles, tabletas y ordenadores (dock de navegación inferior estilo app nativa en móviles).

5. **Galería de Infografías en HD**:
   - Visualización interactiva y zoom a pantalla completa de las 6 infografías oficiales del programa (`assets/infografias/`).

---

## 📂 Estructura del Proyecto

```text
├── index.html                   # Página principal PWA (punto de entrada)
├── style.css                    # Estilos responsivos y temas Claro/Oscuro
├── app.js                       # Lógica de la app, reloj, temporizador y filtros
├── manifest.json                # Manifiesto PWA para instalación como app
├── sw.js                        # Service Worker para funcionamiento 100% offline
├── icon-192.png                 # Icono PWA para dispositivos móviles (192px)
├── icon-512.png                 # Icono PWA para pantalla de inicio (512px)
├── data/
│   └── exercises-data.js        # Base de datos de ejercicios, 3 fases y rutinas
└── assets/
    └── infografias/             # Infografías originales en alta definición
```

---

## 🌐 ¿Cómo desplegar en GitHub Pages y Vercel?

> **Sí, la versión offline es exactamente la misma que se despliega en GitHub Pages o Vercel.**
> Utiliza rutas relativas (`./`), por lo que no requiere ningún servidor backend ni compiladores (Node.js).

### Despliegue en GitHub Pages:
1. Haz un commit y sube estos archivos a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "App PWA Antigravity Rutinas completa"
   git push origin main
   ```
2. En GitHub, ve a **Settings** → **Pages**.
3. En **Branch**, selecciona `main` y la carpeta `/ (root)`.
4. Haz clic en **Save**. En 1 o 2 minutos tu aplicación estará disponible en `https://<tu-usuario>.github.io/<nombre-repo>/`.

### Despliegue en Vercel:
1. Conecta tu repositorio de GitHub en [vercel.com](https://vercel.com).
2. Como es un proyecto web estático sin compiladores (Framework Preset: **Other** o **Static HTML**), haz clic en **Deploy**.
3. Estará publicado en segundos en un subdominio `.vercel.app` con certificado SSL automático (imprescindible para la instalación PWA).

### Uso Local sin Conexión:
Puedes simplemente hacer doble clic en `index.html` o abrirlo en cualquier navegador (Chrome, Edge, Safari, Firefox).
