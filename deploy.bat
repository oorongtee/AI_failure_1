@echo off
REM 3D Interactive Portfolio - Windows Deployment Script
REM This script provides multiple deployment options for Windows users

echo 🚀 3D Interactive Portfolio Deployment Script
echo ==============================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

:menu
echo.
echo Choose deployment option:
echo 1) Deploy to Vercel (preview)
echo 2) Deploy to Vercel (production)
echo 3) Deploy to Netlify (preview)
echo 4) Deploy to Netlify (production)
echo 5) Setup GitHub Pages
echo 6) Preview locally
echo 7) Show environment setup
echo 8) Install dependencies
echo 9) Exit
echo.

set /p choice="Enter your choice (1-9): "

if "%choice%"=="1" goto vercel_preview
if "%choice%"=="2" goto vercel_production
if "%choice%"=="3" goto netlify_preview
if "%choice%"=="4" goto netlify_production
if "%choice%"=="5" goto github_pages
if "%choice%"=="6" goto preview_local
if "%choice%"=="7" goto env_setup
if "%choice%"=="8" goto install_deps
if "%choice%"=="9" goto exit
echo ❌ Invalid option. Please try again.
goto menu

:build_project
echo 📦 Building project...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed!
    pause
    exit /b 1
)
echo ✅ Build successful!
goto :eof

:vercel_preview
echo 🔵 Deploying to Vercel (preview)...
where vercel >nul 2>nul
if errorlevel 1 (
    echo 📥 Installing Vercel CLI...
    call npm install -g vercel
)
call vercel
echo ✅ Vercel preview deployment complete!
pause
goto menu

:vercel_production
echo 🔵 Deploying to Vercel (production)...
where vercel >nul 2>nul
if errorlevel 1 (
    echo 📥 Installing Vercel CLI...
    call npm install -g vercel
)
call vercel --prod
echo ✅ Vercel production deployment complete!
pause
goto menu

:netlify_preview
echo 🟢 Deploying to Netlify (preview)...
where netlify >nul 2>nul
if errorlevel 1 (
    echo 📥 Installing Netlify CLI...
    call npm install -g netlify-cli
)
call :build_project
call netlify deploy --dir=dist
echo ✅ Netlify preview deployment complete!
pause
goto menu

:netlify_production
echo 🟢 Deploying to Netlify (production)...
where netlify >nul 2>nul
if errorlevel 1 (
    echo 📥 Installing Netlify CLI...
    call npm install -g netlify-cli
)
call :build_project
call netlify deploy --prod --dir=dist
echo ✅ Netlify production deployment complete!
pause
goto menu

:github_pages
echo 🐙 Setting up GitHub Pages deployment...
if not exist ".github" mkdir .github
if not exist ".github\workflows" mkdir .github\workflows

echo name: Deploy to GitHub Pages> .github\workflows\deploy.yml
echo.>> .github\workflows\deploy.yml
echo on:>> .github\workflows\deploy.yml
echo   push:>> .github\workflows\deploy.yml
echo     branches: [ main ]>> .github\workflows\deploy.yml
echo.>> .github\workflows\deploy.yml
echo jobs:>> .github\workflows\deploy.yml
echo   deploy:>> .github\workflows\deploy.yml
echo     runs-on: ubuntu-latest>> .github\workflows\deploy.yml
echo     steps:>> .github\workflows\deploy.yml
echo       - name: Checkout>> .github\workflows\deploy.yml
echo         uses: actions/checkout@v4>> .github\workflows\deploy.yml
echo       - name: Setup Node.js>> .github\workflows\deploy.yml
echo         uses: actions/setup-node@v4>> .github\workflows\deploy.yml
echo         with:>> .github\workflows\deploy.yml
echo           node-version: '18'>> .github\workflows\deploy.yml
echo       - name: Install dependencies>> .github\workflows\deploy.yml
echo         run: npm install --legacy-peer-deps>> .github\workflows\deploy.yml
echo       - name: Build>> .github\workflows\deploy.yml
echo         run: npm run build>> .github\workflows\deploy.yml
echo       - name: Deploy to GitHub Pages>> .github\workflows\deploy.yml
echo         uses: peaceiris/actions-gh-pages@v3>> .github\workflows\deploy.yml
echo         with:>> .github\workflows\deploy.yml
echo           github_token: ${{ secrets.GITHUB_TOKEN }}>> .github\workflows\deploy.yml
echo           publish_dir: ./dist>> .github\workflows\deploy.yml

echo ✅ GitHub Pages workflow created!
echo 📝 Don't forget to enable GitHub Pages in your repository settings!
pause
goto menu

:preview_local
echo 👁️ Building and previewing locally...
call :build_project
call npm run preview
pause
goto menu

:env_setup
echo 🔧 Environment Variables Setup
echo =============================
echo.
echo Create a .env.local file with the following variables:
echo.
echo # API Configuration
echo VITE_API_BASE_URL=https://api.yourservice.com
echo VITE_OPENAI_API_KEY=your_openai_key
echo.
echo # Analytics
echo VITE_GA_TRACKING_ID=G-XXXXXXXXXX
echo.
echo # Features
echo VITE_ENABLE_3D=true
echo VITE_ENABLE_AI_FEATURES=true
pause
goto menu

:install_deps
echo 📥 Installing dependencies...
call npm install --legacy-peer-deps
echo ✅ Dependencies installed!
pause
goto menu

:exit
echo 👋 Goodbye!
pause
exit /b 0