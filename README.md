# Menú hamburguesa

Cinco formas de animar la transición del botón hamburguesa de ≡ a ✕, documentadas
y listas para copiar y pegar. Cada técnica se muestra en una galería interactiva
y, debajo, en una sección con tabs que explica el gesto y viene con su código
(HTML / CSS / JS) autocontenido.

**Ver en vivo:** https://manuelfernandezdg.github.io/menuHamburguesa/

## Técnicas

| Técnica | Comportamiento |
|---|---|
| Rotate + fade | La línea central desaparece; las laterales rotan ±45°. |
| Rebote + rotate | Cruc centrada con easing de overshoot: las laterales rebotan al encastrar. |
| SVG path morph | Los paths se redibujan de ≡ a ✕ vía transición de la propiedad CSS `d`. |
| Bisagra izquierda | Cruc asimétrica: las laterales pivotan desde el extremo izquierdo. |
| Spin 180° | El icono completo gira medio círculo mientras se transforma. |

## Estructura

```
menuHamburguesa/
├── index.html              # Hero + galería + sección documentada con tabs
├── css/estilos.css         # @layer reset/tokens/base/components + BEM doc
├── js/app.js               # Vanilla JS: toggles de demo + botón Copiar
├── assets/img/logo.jpg
├── favicon.ico / favicon-16x16.png / favicon-32x32.png / apple-touch-icon.png
├── AGENTS.md
└── README.md
```

La página tiene una **galería** de las 5 técnicas (escaneo rápido) y, debajo,
**una sección documentada con tabs** (patrón de kerningExplorer): un tab por
técnica, cada uno con introducción, demo en vivo, explicación y tres bloques de
código (HTML / CSS / JS) autocontenidos y copiables.
