# Script de PowerShell para modificar (incrementar/decrementar) las barras de necesidades (localStorage)
# Uso: .\modificar.ps1 -need "hambre" -change -10

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("hambre", "energia", "diversion", "social", "higiene", "mental", "ambiente", "confort")]
    [string]$need,
    
    [Parameter(Mandatory=$true)]
    [int]$change
)

# Crear archivo HTML temporal para ejecutar JavaScript
$tempHtml = @"
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body>
<script>
    const STORAGE_KEY = 'sims_needs';
    const need = '$need';
    const change = $change;
    
    // Obtener datos actuales
    const stored = localStorage.getItem(STORAGE_KEY);
    const needs = stored ? JSON.parse(stored) : {};
    
    // Obtener valor actual
    const currentValue = needs[need] || 100;
    
    // Calcular nuevo valor
    let newValue = currentValue + change;
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;
    
    // Actualizar valor
    needs[need] = newValue;
    
    // Guardar
    localStorage.setItem(STORAGE_KEY, JSON.stringify(needs));
    
    // Mostrar resultado
    const symbol = change > 0 ? '+' : '';
    document.body.innerHTML = '<h1 style="color:green">✅ ' + need + ': ' + currentValue + '% → ' + newValue + '% (' + symbol + change + ')</h1>';
    
    // Cerrar después de 1 segundo
    setTimeout(() => window.close(), 1000);
</script>
</body>
</html>
"@

try {
    # Guardar HTML temporal
    $tempFile = [System.IO.Path]::GetTempFileName() + ".html"
    $tempHtml | Out-File -FilePath $tempFile -Encoding UTF8
    
    # Abrir en navegador
    Start-Process $tempFile
    
    $changeSymbol = if ($change -gt 0) { "+" } else { "" }
    Write-Host "✅ $need modificado: $changeSymbol$change%" -ForegroundColor Green
    Write-Host "💡 Abre actualizar-localStorage.html para control visual" -ForegroundColor Cyan
    
    # Limpiar archivo temporal después de 3 segundos
    Start-Sleep -Seconds 3
    Remove-Item $tempFile -ErrorAction SilentlyContinue
    
} catch {
    Write-Host "❌ Error al modificar: $_" -ForegroundColor Red
    Write-Host "💡 Alternativa: Abre actualizar-localStorage.html para control manual" -ForegroundColor Yellow
}