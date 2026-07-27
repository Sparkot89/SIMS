// Sistema de actualización de barras de necesidades con API
class NeedsManager {
    constructor() {
        this.needs = [
            'hambre', 'energia', 'diversion', 'social', 
            'higiene', 'mental'
        ];
        this.updateInterval = 500; // Actualizar cada 500ms
        this.apiUrl = window.location.origin + '/api/needs';
        this.init();
    }

    init() {
        // Cargar valores iniciales
        this.loadNeeds();
        
        // Iniciar el loop de actualización
        setInterval(() => this.loadNeeds(), this.updateInterval);
        
        console.log('✅ Sistema de necesidades iniciado (API)');
        console.log('🔌 API URL:', this.apiUrl);
        console.log('📊 Actualizando cada', this.updateInterval, 'ms');
    }

    async loadNeeds() {
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    this.updateAllBars(data.needs);
                }
            }
        } catch (error) {
            console.error('❌ Error al cargar desde API:', error);
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
    async setNeed(needName, value) {
        if (this.needs.includes(needName)) {
            try {
                const response = await fetch(`${this.apiUrl}/${needName}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ value: value })
                });
                
                const data = await response.json();
                if (data.success) {
                    this.updateBar(needName, data.newValue);
                    console.log(`✅ ${needName} establecido a ${data.newValue}%`);
                    return data;
                }
            } catch (error) {
                console.error('❌ Error al establecer necesidad:', error);
            }
        }
    }

    // Método para incrementar/decrementar una necesidad
    async modifyNeed(needName, amount) {
        if (this.needs.includes(needName)) {
            try {
                const response = await fetch(`${this.apiUrl}/${needName}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ change: amount })
                });
                
                const data = await response.json();
                if (data.success) {
                    this.updateBar(needName, data.newValue);
                    const symbol = amount > 0 ? '+' : '';
                    console.log(`✅ ${needName}: ${data.oldValue}% → ${data.newValue}% (${symbol}${amount})`);
                    return data;
                }
            } catch (error) {
                console.error('❌ Error al modificar necesidad:', error);
            }
        }
    }

    // Método para obtener el valor actual de una necesidad
    async getNeed(needName) {
        try {
            const response = await fetch(`${this.apiUrl}/${needName}`);
            const data = await response.json();
            if (data.success) {
                return data.value;
            }
        } catch (error) {
            console.error('❌ Error al obtener necesidad:', error);
        }
    }

    // Método para resetear todas las necesidades
    async resetAll() {
        try {
            const response = await fetch(`${this.apiUrl}/reset/all`, {
                method: 'POST'
            });
            
            const data = await response.json();
            if (data.success) {
                this.loadNeeds();
                console.log('🔄 Todas las necesidades reseteadas al 100%');
                return data;
            }
        } catch (error) {
            console.error('❌ Error al resetear:', error);
        }
    }

    // Método para exportar datos (útil para respaldo)
    async exportData() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            if (data.success) {
                return data.needs;
            }
        } catch (error) {
            console.error('❌ Error al exportar:', error);
        }
    }

    // Método para importar datos
    async importData(needsData) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(needsData)
            });
            
            const data = await response.json();
            if (data.success) {
                this.loadNeeds();
                console.log('📥 Datos importados correctamente');
                return data;
            }
        } catch (error) {
            console.error('❌ Error al importar:', error);
        }
    }
}

// Inicializar el sistema cuando se cargue la página
let needsManager;

window.addEventListener('DOMContentLoaded', () => {
    needsManager = new NeedsManager();
    
    // Exponer funciones globales para uso en consola
    window.setNeed = (need, value) => needsManager.setNeed(need, value);
    window.modifyNeed = (need, amount) => needsManager.modifyNeed(need, amount);
    window.getNeed = (need) => needsManager.getNeed(need);
    window.resetAll = () => needsManager.resetAll();
    window.exportData = () => needsManager.exportData();
    window.importData = (data) => needsManager.importData(data);
    
    console.log('🎮 Sistema SIMS cargado correctamente (API)');
    console.log('💡 Comandos disponibles en consola:');
    console.log('   await setNeed("hambre", 50) - Establecer valor exacto');
    console.log('   await modifyNeed("energia", -10) - Modificar valor');
    console.log('   await getNeed("hambre") - Obtener valor actual');
    console.log('   await resetAll() - Resetear todo al 100%');
    console.log('   await exportData() - Exportar datos');
    console.log('   await importData({...}) - Importar datos');
});