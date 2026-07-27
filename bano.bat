@echo off
REM Comando rápido: Ir al baño (restaura focus e higiene)
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "focus" -value 100
powershell -ExecutionPolicy Bypass -File "%~dp0actualizar.ps1" -need "higiene" -value 100