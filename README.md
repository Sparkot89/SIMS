# 🎮 SIMS - Sistema de Barras de Necesidades para Streaming

Sistema de overlay para mostrar barras de progreso estilo Los Sims en tus streams. Compatible con OBS Studio, Streamlabs y cualquier software de streaming que soporte Browser Source.

## 📋 Características

- ✨ 8 barras de necesidades personalizables
- 🎨 Diseño moderno con efectos visuales
- 🔄 Actualización en tiempo real con **localStorage**
- 🎯 Fácil de usar con panel de control HTML
- 🖥️ Compatible con OBS Browser Source
- 🌈 Colores dinámicos según el nivel (verde, amarillo, rojo)
- ⚡ Actualización ultra rápida (100ms)
- 💾 Datos persistentes en el navegador

## 🎯 Necesidades Incluidas

| Icono | Necesidad | Descripción |
|-------|-----------|-------------|
| 🍔 | Hambre | Nivel de alimentación |
| ⚡ | Energía | Nivel de energía/descanso |
| 🎮 | Diversión | Nivel de entretenimiento |
| 👥 | Social | Nivel de interacción social |
| 🚿 | Higiene | Nivel de limpieza personal |
| 🚽 | mental | Necesidad de ir al baño |
| 🏠 | Ambiente | Calidad del entorno |
| 🛋️ | Confort | Nivel de comodidad |

## 🚀 Instalación

1. **Descarga o clona este repositorio** en una carpeta de tu PC

2. **Estructura de archivos:**
   ```
   SIMS/
   ├── index.html                    (Overlay principal)
   ├── styles.css                    (Estilos visuales)
   ├── script.js                     (Lógica con localStorage)
   ├── actualizar-localStorage.html  (Panel de control visual) ⭐ NUEVO
   ├── actualizar.ps1                (Script PowerShell)
   ├── modificar.ps1                 (Script PowerShell)
   ├── comer.bat, dormir.bat, etc.   (Comandos rápidos)
   └── README.md                     (Este archivo)
   ```

## 🎬 Configuración en OBS Studio

1. Abre OBS Studio
2. Agrega una nueva fuente → **"Navegador"** (Browser Source)
3. Configura:
   - ✅ Marca "Local file"
   - 📁 Selecciona el archivo `index.html`
   - 📏 Ancho: 500px, Alto: 700px (ajustable)
   - ✅ Marca "Actualizar navegador cuando la escena se activa"
   - ✅ **IMPORTANTE**: Desmarca "Apagar fuente cuando no está visible" para mantener localStorage activo
4. ¡Listo! Las barras aparecerán en tu escena

## 💻 Métodos de Actualización

### ⭐ Método 1: Panel de Control Visual (RECOMENDADO)

Abre `actualizar-localStorage.html` en tu navegador:

- 🎛️ Interfaz gráfica intuitiva
- 📊 Ver valor actual en tiempo real
- 🎮 Botones rápidos (+10, -10, +25, -25, etc.)
- 🔢 Establecer valores exactos (0, 25, 50, 75, 100)
- 🔄 Botón de reset para todo
- ✨ Actualización instantánea

**Este es el método más fácil y recomendado!**

### Método 2: Scripts de PowerShell

```powershell
# Establecer hambre al 50%
.\actualizar.ps1 -need "hambre" -value 50

# Reducir energía en 10%
.\modificar.ps1 -need "energia" -change -10

# Aumentar diversión en 25%
.\modificar.ps1 -need "diversion" -change 25
```

### Método 3: Comandos Rápidos (.bat)

Haz doble clic en:
- `comer.bat` - Aumenta hambre +30%
- `dormir.bat` - Restaura energía al 100%
- `bano.bat` - Restaura mental e higiene al 100%
- `reset.bat` - Resetea todo al 100%

### Método 4: Consola del Navegador

Abre la consola del navegador (F12) en el overlay y ejecuta:

```javascript
// Establecer valor exacto
setNeed("hambre", 50)

// Modificar valor
modifyNeed("energia", -10)

// Obtener valor actual
getNeed("hambre")

// Resetear todo
resetAll()

// Exportar datos (respaldo)
exportData()

// Importar datos
importData({hambre: 75, energia: 50, ...})
```

## 🎨 Personalización

### Cambiar colores

Edita `styles.css` para modificar los colores:

```css
/* Nivel alto (verde) */
.need-bar[data-level="high"] {
    background: linear-gradient(90deg, #00ff88, #00cc66);
}

/* Nivel medio (amarillo) */
.need-bar[data-level="medium"] {
    background: linear-gradient(90deg, #ffdd00, #ffaa00);
}

/* Nivel bajo (rojo) */
.need-bar[data-level="low"] {
    background: linear-gradient(90deg, #ff6600, #ff0000);
}
```

### Cambiar velocidad de actualización

Edita `script.js`:

```javascript
this.updateInterval = 100; // Milisegundos (100 = 0.1 segundos)
```

## 🤖 Integración con Bots de Chat

Para integrar con bots de Twitch/YouTube, puedes:

**Opción A: Ejecutar scripts PowerShell desde el bot**
```javascript
exec('powershell -File actualizar.ps1 -need hambre -value 50