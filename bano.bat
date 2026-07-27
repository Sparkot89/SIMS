@echo off
REM Comando rápido: Ir al baño (restaura mental e higiene)
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "mental" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "higiene" -value 100