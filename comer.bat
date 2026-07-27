@echo off
REM Comando rápido: Comer (aumenta hambre)
powershell -ExecutionPolicy Bypass -File "%~dp0modificar.ps1" -need "hambre" -change 30