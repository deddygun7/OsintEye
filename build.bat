@echo off
chcp 65001 >nul
color 0A
echo.
echo ========================================
echo OSINT Eye - Desktop Builder
echo ========================================
echo.
echo Checking for Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found!
    echo.
    echo Downloading Node.js v18.17.0...
    powershell -Command "$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile '%TEMP%\node-installer.msi'"
    echo.
    echo Installing Node.js...
    start /wait msiexec /i "%TEMP%\node-installer.msi" /quiet
    del "%TEMP%\node-installer.msi"
    echo [OK] Node.js installed successfully!
) else (
    echo [OK] Node.js found:
    node --version
)
echo.
echo Installing npm dependencies...
echo This may take 2-3 minutes...
echo.
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)
echo.
echo [OK] Dependencies installed!
echo.
echo Building Electron application...
echo This may take 5-10 minutes...
echo.
call npm run electron-build
if errorlevel 1 (
    echo.
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo.
echo ========================================
echo [SUCCESS] Build completed!
echo ========================================
echo.
echo Your .exe files are ready in the 'dist' folder:
echo   - OSINT Eye Setup 1.0.0.exe (installer)
echo   - OSINT Eye 1.0.0.exe (portable)
echo.
echo Press any key to open the dist folder...
pause
if exist "%CD%\dist" (
    start "" "%CD%\dist"
) else (
    echo [ERROR] dist folder not found!
    pause
)
exit /b 0
