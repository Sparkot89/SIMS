# 🚀 Desplegar SIMS en Render

Guía completa para desplegar el sistema SIMS en Render.com

## 📋 Requisitos Previos

1. Cuenta en [Render.com](https://render.com) (gratis)
2. Repositorio en GitHub con el proyecto
3. Node.js instalado localmente (para pruebas)

## 🎯 Paso a Paso

### 1. Preparar el Repositorio

Asegúrate de que tu repositorio tenga estos archivos:

```
SIMS/
├── package.json          # Configuración de Node.js
├── server.js             # Servidor Express
├── render.yaml           # Configuración de Render
├── .gitignore            # Archivos ignorados
├── public/               # Archivos estáticos
│   ├── index.html        # Overlay principal
│   ├── control.html      # Panel de control
│   ├── styles.css        # Estilos
│   └── script.js         # Lógica del frontend
└── README-RENDER.md      # Este archivo
```

### 2. Subir a GitHub

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar archivos
git add .

# Commit
git commit -m "Preparar proyecto para Render"

# Conectar con GitHub
git remote add origin https://github.com/TU-USUARIO/SIMS.git

# Subir
git push -u origin main
```

### 3. Desplegar en Render

#### Opción A: Usando render.yaml (Recomendado)

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Click en **"New +"** → **"Blueprint"**
3. Conecta tu repositorio de GitHub
4. Render detectará automáticamente el `render.yaml`
5. Click en **"Apply"**
6. ¡Espera unos minutos y listo!

#### Opción B: Configuración Manual

1. Ve a [dashboard.render.com](https://dashboard.render.com)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Name**: `sims-overlay`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Click en **"Create Web Service"**

### 4. Acceder a tu Aplicación

Una vez desplegado, Render te dará una URL como:

```
https://sims-overlay.onrender.com
```

- **Overlay**: `https://sims-overlay.onrender.com/`
- **Panel de Control**: `https://sims-overlay.onrender.com/control`
- **API**: `https://sims-overlay.onrender.com/api/needs`

## 🎮 Usar en OBS

### Configuración en OBS Studio

1. Agrega una fuente → **"Navegador"** (Browser Source)
2. En URL, pega: `https://TU-APP.onrender.com/`
3. Configura:
   - Ancho: 500px
   - Alto: 700px
   - ✅ Marca "Actualizar navegador cuando la escena se activa"
4. ¡Listo!

### Controlar desde el Panel Web

1. Abre en tu navegador: `https://TU-APP.onrender.com/control`
2. Usa los controles para modificar las barras
3. Los cambios se reflejan en tiempo real en OBS

## 🔌 Usar la API

### Endpoints Disponibles

#### Obtener todas las necesidades
```bash
GET https://TU-APP.onrender.com/api/needs
```

#### Establecer una necesidad
```bash
POST https://TU-APP.onrender.com/api/needs/hambre
Content-Type: application/json

{
  "value": 50
}
```

#### Modificar una necesidad
```bash
PATCH https://TU-APP.onrender.com/api/needs/energia
Content-Type: application/json

{
  "change": -10
}
```

#### Resetear todo
```bash
POST https://TU-APP.onrender.com/api/needs/reset/all
```

### Ejemplo con cURL

```bash
# Establecer hambre al 75%
curl -X POST https://TU-APP.onrender.com/api/needs/hambre \
  -H "Content-Type: application/json"