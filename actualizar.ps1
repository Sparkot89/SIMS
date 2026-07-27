# Script de PowerShell para actualizar las barras de necesidades (localStorage)
# Uso: .\actualizar.ps1 -need "hambre" -value 50

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("hambre", "energia", "diversion", "social", "higiene", "focus", "ambiente", "confort")]
    [string]$need,
    
    [Parameter(Mandatory=$true)]
    [ValidateRange(0, 100)]
    [int]$value
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
    const value = $value;
    
    // Obtener datos actuales
    const stored = localStorage.getItem(STORAGE_KEY);
    const needs = stored ? JSON.parse(stored) : {};
    
    // Actualizar valor
    needs[need] = value;
    
    // Guardar
    localStorage.setItem(STORAGE_KEY, JSON.stringify(needs));
    
    // Mostrar resultado
    document.body.innerHTML = '<h1 style="color:green">✅ ' + need + ' actualizado a ' + value + '%</h1>';
    
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
    
    # Abrir en navegador (esto ejecutará el script y actualizará localStorage)
    Start-Process $tempFile
    
    Write-Host "✅ $need actualizado a $value%" -ForegroundColor Green
    Write-Host "💡 Abre actualizar-localStorage.html para control visual" -ForegroundColor Cyan
    
    # Limpiar archivo temporal después de 3 segundos
    Start-Sleep -Seconds 3
    Remove-Item $tempFile -ErrorAction SilentlyContinue
    
} catch {
    Write-Host "❌ Error al actualizar: $_" -ForegroundColor Red
    Write-Host "💡 Alternativa: Abre actualizar-localStorage.html para control manual" -ForegroundColor Yellow
}