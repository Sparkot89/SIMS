@echo off
chcp 65001 >nul
echo ============================================
echo   🎮 EJEMPLOS DE COMANDOS - SISTEMA SIMS
echo ============================================
echo.
echo Presiona una tecla para ejecutar cada ejemplo:
echo.
pause

echo.
echo 📊 Ejemplo 1: Establecer hambre al 50%%
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "hambre" -value 50
echo.
pause

echo.
echo 📊 Ejemplo 2: Reducir energía en 20%%
powershell -ExecutionPolicy Bypass -File "%~dp0modificar.ps1" -need "energia" -change -20
echo.
pause

echo.
echo 📊 Ejemplo 3: Aumentar diversión en 30%%
powershell -ExecutionPolicy Bypass -File "%~dp0modificar.ps1" -need "diversion" -change 30
echo.
pause

echo.
echo 📊 Ejemplo 4: Establecer múltiples valores
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "higiene" -value 80
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "focus" -value 90
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "social" -value 60
echo.
pause

echo.
echo ✅ Ejemplos completados!
echo.
pause