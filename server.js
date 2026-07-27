const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Almacenamiento en memoria de las necesidades (en producción podrías usar una base de datos)
let needs = {
  hambre: 100,
  energia: 100,
  diversion: 100,
  social: 100,
  higiene: 100,
  mental: 100
};

// Ruta principal - servir el overlay
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para el panel de control
app.get('/control', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

// API: Obtener todas las necesidades
app.get('/api/needs', (req, res) => {
  res.json({ 
    success: true, 
    needs: needs,
    timestamp: new Date().toISOString()
  });
});

// API: Obtener una necesidad específica
app.get('/api/needs/:need', (req, res) => {
  const { need } = req.params;
  
  if (needs.hasOwnProperty(need)) {
    res.json({ 
      success: true, 
      need: need,
      value: needs[need]
    });
  } else {
    res.status(404).json({ 
      success: false, 
      error: 'Necesidad no encontrada' 
    });
  }
});

// API: Establecer valor de una necesidad
app.post('/api/needs/:need', (req, res) => {
  const { need } = req.params;
  const { value } = req.body;
  
  if (!needs.hasOwnProperty(need)) {
    return res.status(404).json({ 
      success: false, 
      error: 'Necesidad no encontrada' 
    });
  }
  
  if (typeof value !== 'number' || value < 0 || value > 100) {
    return res.status(400).json({ 
      success: false, 
      error: 'El valor debe ser un número entre 0 y 100' 
    });
  }
  
  const oldValue = needs[need];
  needs[need] = value;
  
  res.json({ 
    success: true, 
    need: need,
    oldValue: oldValue,
    newValue: value
  });
});

// API: Modificar (incrementar/decrementar) una necesidad
app.patch('/api/needs/:need', (req, res) => {
  const { need } = req.params;
  const { change } = req.body;
  
  if (!needs.hasOwnProperty(need)) {
    return res.status(404).json({ 
      success: false, 
      error: 'Necesidad no encontrada' 
    });
  }
  
  if (typeof change !== 'number') {
    return res.status(400).json({ 
      success: false, 
      error: 'El cambio debe ser un número' 
    });
  }
  
  const oldValue = needs[need];
  needs[need] = Math.max(0, Math.min(100, oldValue + change));
  
  res.json({ 
    success: true, 
    need: need,
    oldValue: oldValue,
    newValue: needs[need],
    change: change
  });
});

// API: Resetear todas las necesidades
app.post('/api/needs/reset/all', (req, res) => {
  Object.keys(needs).forEach(need => {
    needs[need] = 100;
  });
  
  res.json({ 
    success: true, 
    message: 'Todas las necesidades reseteadas al 100%',
    needs: needs
  });
});

// API: Establecer múltiples necesidades a la vez
app.post('/api/needs', (req, res) => {
  const updates = req.body;
  const results = {};
  
  Object.keys(updates).forEach(need => {
    if (needs.hasOwnProperty(need)) {
      const value = Math.max(0, Math.min(100, updates[need]));
      needs[need] = value;
      results[need] = value;
    }
  });
  
  res.json({ 
    success: true, 
    updated: results 
  });
});

// Health check para Render
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

app.get('/actualizar-necesidad', (req, res) => {
    const necesidad = req.query.necesidad; // Recibe "hambre", "energia", "diversion", etc.
    const valor = req.query.valor;         // Recibe el número (ej: "20")

    // Validación de que existan los datos y el valor sea un número
    if (!necesidad || !valor || isNaN(valor)) {
        return res.send('⚠️ Uso correcto: !necesidad [nombre] [número]. Ejemplo: !necesidad hambre 50');
    }

    // Aquí manejas la lógica de tu aplicación para actualizar el estado correcto
    // Ejemplo:
    needs[necesidad] = Math.max(0, Math.min(100, parseInt(valor)));

    // Respuesta en texto plano que leerá Nightbot en el chat
    res.send(`✅ Se ha actualizado la necesidad de [${necesidad}] al ${valor}%.`);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🎮 Servidor SIMS iniciado en puerto ${PORT}`);
  console.log(`📊 Overlay: http://localhost:${PORT}/`);
  console.log(`🎛️ Panel de control: http://localhost:${PORT}/control`);
  console.log(`🔌 API: http://localhost:${PORT}/api/needs`);
});

