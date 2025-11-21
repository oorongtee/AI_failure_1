#!/usr/bin/env pwsh
# 快速測試腳本 - 測試核心功能

Write-Host "🚀 快速測試個人作品集專案..." -ForegroundColor Cyan

# 1. 檢查動畫引用錯誤
Write-Host "`n🔍 檢查動畫引用錯誤..."
$animationErrors = Select-String -Path "src/design-system/index.ts" -Pattern "animations\.easings" -ErrorAction SilentlyContinue
if ($animationErrors) {
    Write-Host "❌ 發現動畫引用錯誤" -ForegroundColor Red
    $animationErrors | ForEach-Object { Write-Host "  Line $($_.LineNumber): $($_.Line.Trim())" -ForegroundColor Red }
} else {
    Write-Host "✅ 動畫引用正常" -ForegroundColor Green
}

# 2. 檢查路由配置
Write-Host "`n🛣️ 檢查路由配置..."
if (Test-Path "src/config/routes.js") {
    $routeContent = Get-Content "src/config/routes.js" -Raw
    if ($routeContent -match "Portfolio\.tsx") {
        Write-Host "❌ 仍包含已刪除的 Portfolio.tsx 引用" -ForegroundColor Red
    } else {
        Write-Host "✅ 路由配置正常" -ForegroundColor Green
    }
} else {
    Write-Host "❌ routes.js 檔案不存在" -ForegroundColor Red
}

# 3. 快速語法檢查
Write-Host "`n📝 快速語法檢查..."
try {
    $result = npx tsc --noEmit --skipLibCheck 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ TypeScript 語法正常" -ForegroundColor Green
    } else {
        Write-Host "❌ TypeScript 語法錯誤:" -ForegroundColor Red
        $result | Select-Object -First 5 | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
    }
} catch {
    Write-Host "⚠️ 無法執行 TypeScript 檢查" -ForegroundColor Yellow
}

# 4. 檢查設計系統
Write-Host "`n🎨 檢查設計系統..."
$designFiles = @("src/design-system/index.ts", "src/design-system/theme.ts", "src/design-system/components.tsx")
$missingFiles = $designFiles | Where-Object { !(Test-Path $_) }
if ($missingFiles) {
    Write-Host "❌ 缺少設計系統檔案:" -ForegroundColor Red
    $missingFiles | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
} else {
    Write-Host "✅ 設計系統檔案完整" -ForegroundColor Green
}

# 5. 檢查開發服務器
Write-Host "`n🌐 檢查開發服務器..."
$serverPorts = 5173..5185
$runningServer = $null
foreach ($port in $serverPorts) {
    $connection = netstat -ano | Select-String ":$port "
    if ($connection) {
        $runningServer = $port
        break
    }
}

if ($runningServer) {
    Write-Host "✅ 開發服務器運行在端口 $runningServer" -ForegroundColor Green
    Write-Host "🌍 訪問地址: http://localhost:$runningServer" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ 沒有檢測到運行中的開發服務器" -ForegroundColor Yellow
    Write-Host "💡 使用 'npm run dev' 啟動開發服務器" -ForegroundColor Gray
}

Write-Host "`n✨ 快速測試完成！" -ForegroundColor Cyan