# Batch script to run CogniCart Backend
@echo off
echo.
echo ========================================
echo   CogniCart Backend Server
echo ========================================
echo.

cd /d "%~dp0"

if not exist "pom.xml" (
    echo Error: pom.xml not found!
    echo Please make sure you're in the backend directory.
    pause
    exit /b 1
)

echo Checking for Maven...
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Maven is not installed or not in PATH!
    echo Please install Maven from https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

echo.
echo Building and running the application...
echo.

mvn spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error: Failed to start the application!
    pause
    exit /b 1
)
