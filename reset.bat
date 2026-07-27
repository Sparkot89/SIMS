@echo off
REM Comando rápido: Resetear todas las barras al 100%
echo Reseteando todas las necesidades al 100%%...
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "hambre" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "energia" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "diversion" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "social" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "higiene" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "mental" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "ambiente" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "confort" -value 100
echo.
echo ✅ Todas las necesidades reseteadas al 100%%
pause