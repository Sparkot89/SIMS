@echo off
REM Comando rápido: Dormir (restaura energía)
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "energia" -value 100