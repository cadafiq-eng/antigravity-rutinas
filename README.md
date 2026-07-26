# Antigravity — Rutinas Terapéuticas

App web progresiva (PWA) de programa terapéutico de ejercicio con ciclo de 2 semanas, representación visual equilibrada de hombres y mujeres, descripciones y dosis claras, reproducción de video con marcadores personalizables, timer en cada ejercicio, detección automática de semana A/B y guías ilustradas para los ejercicios sin video.

## Uso
Accede mediante GitHub Pages. La app puede instalarse desde el navegador y, después de la primera visita, la interfaz y las rutinas quedan disponibles sin conexión. Los videos se mantienen en línea para evitar descargas grandes.

Los videos se reproducen desde Google Drive. Para uso con videos locales, ejecutar servidor local:
```
python -m http.server 8080
```

> Para que la instalación y el modo sin conexión funcionen, abre la app mediante HTTPS o un servidor local; no abras el archivo HTML directamente.
