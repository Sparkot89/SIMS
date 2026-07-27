// Sistema de actualización de barras de necesidades usando localStorage
class NeedsManager {
    constructor() {
        this.needs = [
            'hambre', 'energia', 'diversion', 'social', 
            'higiene', 'mental', 'ambiente', 'confort'
        ];
        this.storageKey = 'sims_needs';
        this.updateInterval = 100; // Actualizar cada 100ms para mayor respuesta
        this.init();
    }

    init() {
        // Inicializar valores por defecto si no existen
        this.initializeDefaultValues();
        
        // Cargar y mostrar valores iniciales
        this.loadNeeds();
        
        // Iniciar el loop de actualización
        setInterval(() => this.loadNeeds(), this.updateInterval);
        
        console.log('✅ Sistema de necesidades iniciado (localStorage)');
        console.log('📊 Actualizando cada', this.updateInterval, 'ms');
    }

    initializeDefaultValues() {
        const stored = localStorage.getItem(this.storageKey);
        if (!stored) {
            const defaultNeeds = {};
            this.needs.forEach(need => {
                defaultNeeds[need] = 100;
            });
            this.saveNeeds(defaultNeeds);
            console.log('🔧 Valores iniciales creados');
        }
    }

    loadNeeds() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const needsData = JSON.parse(stored);
                this.updateAllBars(needsData);
            }
        } catch (error) {
            console.error('❌ Error al cargar desde localStorage:', error);
        }
    }

    saveNeeds(needsData) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(needsData));
        } catch (error) {
            console.error('❌ Error al guardar en localStorage:', error);
        }
    }

    updateAllBars(needsData) {
        this.needs.forEach(need => {
            if (needsData[need] !== undefined) {
                this.updateBar(need, needsData[need]);
            }
        });
    }

    updateBar(needName, value) {
        // Asegurar que el valor esté entre 0 y 100
        value = Math.max(0, Math.min(100, value));
        
        const bar = document.getElementById(`bar-${needName}`);
        const valueText = document.getElementById(`value-${needName}`);
        
        if (bar && valueText) {
            // Actualizar el ancho de la barra
            bar.style.width = value + '%';
            
            // Actualizar el texto del valor
            valueText.textContent = Math.round(value) + '%';
            
            // Actualizar el color según el nivel
            if (value >= 70) {
                bar.setAttribute('data-level', 'high');
            } else if (value >= 30) {
                bar.setAttribute('data-level', 'medium');
            } else {
                bar.setAttribute('data-level', 'low');
            }
        }
    }

    // Método para actualizar una necesidad específica
    setNeed(needName, value) {
        if (this.needs.includes(needName)) {
            const stored = localStorage.getItem(this.storageKey);
            const needsData = stored ? JSON.parse(stored) : {};
            needsData[needName] = Math.max(0, Math.min(100, value));
            this.saveNeeds(needsData);
            this.updateBar(needName, needsData[needName]);
            console.log(`✅ ${needName} establecido a ${needsData[needName]}%`);
        }
    }

    // Método para incrementar/decrementar una necesidad
    modifyNeed(needName, amount) {
        if (this.needs.includes(needName)) {
            const stored = localStorage.getItem(this.storageKey);
            const needsData = stored ? JSON.parse(stored) : {};
            const currentValue = needsData[needName] || 100;
            const newValue = Math.max(0, Math.min(100, currentValue + amount));
            needsData[needName] = newValue;
            this.saveNeeds(needsData);
            this.updateBar(needName, newValue);
            const symbol = amount > 0 ? '+' : '';
            console.log(`✅ ${needName}: ${currentValue}% → ${newValue}% (${symbol}${amount})`);
        }
    }

    // Método para obtener el valor actual de una necesidad
    getNeed(needName) {
        const stored = localStorage.getItem(this.storageKey);
        const needsData = stored ? JSON.parse(stored) : {};
        return needsData[needName] || 100;
    }

    // Método para resetear todas las necesidades
    resetAll() {
        const needsData = {};
        this.needs.forEach(need => {
            needsData[need] = 100;
        });
        this.saveNeeds(needsData);
        this.loadNeeds();
        console.log('🔄 Todas las necesidades reseteadas al 100%');
    }

    // Método para exportar datos (útil para respaldo)
    exportData() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    // Método para importar datos
    importData(needsData) {
        this.saveNeeds(needsData);
        this.loadNeeds();
        console.log('📥 Datos importados correctamente');
    }
}

// Inicializar el sistema cuando se cargue la página
let needsManager;

window.addEventListener('DOMContentLoaded', () => {
    needsManager = new NeedsManager();
    
    // Exponer funciones globales para uso en consola y comandos externos
    window.setNeed = (need, value) => needsManager.setNeed(need, value);
    window.modifyNeed = (need, amount) => needsManager.modifyNeed(need, amount);
    window.getNeed = (need) => needsManager.getNeed(need);
    window.resetAll = () => needsManager.resetAll();
    window.exportData = () => needsManager.exportData();
    window.importData = (data) => needsManager.importData(data);
    
    console.log('🎮 Sistema SIMS cargado correctamente (localStorage)');
    console.log('💡 Comandos disponibles en consola:');
    console.log('   setNeed("hambre", 50) - Establecer valor exacto');
    console.log('   modifyNeed("energia", -10) - Modificar valor');
    console.log('   getNeed("hambre") - Obtener valor actual');
    console.log('   resetAll() - Resetear todo al 100%');
    console.log('   exportData() - Exportar datos');
    console.log('   importData({...}) - Importar datos');
});

// Escuchar cambios en localStorage desde otras pestañas/ventanas
window.addEventListener('storage', (e) => {
    if (e.key === needsManager.storageKey) {
        needsManager.loadNeeds();
        console.log('🔄 Datos actualizados desde otra fuente');
    }
});