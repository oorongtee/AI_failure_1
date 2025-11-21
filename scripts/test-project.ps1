# 個人作品集網站 - 全面測試腳本
# 測試整個專案的功能、路由、組件和部署準備

param(
    [string]$TestType = "all",  # all, build, lint, routes, components
    [switch]$Verbose = $false
)

Write-Host "🚀 開始測試個人作品集專案..." -ForegroundColor Cyan
Write-Host "測試類型: $TestType" -ForegroundColor Yellow
Write-Host "=" * 60

$ErrorCount = 0
$WarningCount = 0
$TestResults = @()

# 測試結果記錄函數
function Add-TestResult {
    param(
        [string]$TestName,
        [string]$Status,  # PASS, FAIL, WARN
        [string]$Message = "",
        [string]$Details = ""
    )
    
    $TestResults += [PSCustomObject]@{
        Test = $TestName
        Status = $Status
        Message = $Message
        Details = $Details
        Timestamp = Get-Date -Format "HH:mm:ss"
    }
    
    $color = switch($Status) {
        "PASS" { "Green" }
        "FAIL" { "Red" }
        "WARN" { "Yellow" }
        default { "White" }
    }
    
    Write-Host "[$Status] $TestName" -ForegroundColor $color
    if ($Message) {
        Write-Host "    $Message" -ForegroundColor Gray
    }
    if ($Verbose -and $Details) {
        Write-Host "    詳細: $Details" -ForegroundColor DarkGray
    }
}

# 1. 檢查專案結構
Write-Host "`n📁 測試專案結構..." -ForegroundColor Cyan

$RequiredFiles = @(
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.app.json",
    "tailwind.config.js",
    "index.html",
    "src/main.tsx",
    "src/App.tsx"
)

$RequiredDirs = @(
    "src/components",
    "src/pages",
    "src/design-system",
    "src/utils",
    "src/hooks",
    "docs"
)

foreach ($file in $RequiredFiles) {
    if (Test-Path $file) {
        Add-TestResult "檔案存在: $file" "PASS"
    } else {
        Add-TestResult "檔案遺失: $file" "FAIL"
        $ErrorCount++
    }
}

foreach ($dir in $RequiredDirs) {
    if (Test-Path $dir) {
        $fileCount = (Get-ChildItem $dir -Recurse -File).Count
        Add-TestResult "目錄存在: $dir" "PASS" "$fileCount 個檔案"
    } else {
        Add-TestResult "目錄遺失: $dir" "FAIL"
        $ErrorCount++
    }
}

# 2. 檢查 package.json 依賴
Write-Host "`n📦 測試套件依賴..." -ForegroundColor Cyan

if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    $CoreDeps = @("react", "react-dom", "typescript", "vite")
    $DesignDeps = @("framer-motion", "tailwindcss", "lucide-react")
    
    foreach ($dep in $CoreDeps) {
        if ($packageJson.dependencies.$dep -or $packageJson.devDependencies.$dep) {
            Add-TestResult "核心依賴: $dep" "PASS"
        } else {
            Add-TestResult "缺少核心依賴: $dep" "FAIL"
            $ErrorCount++
        }
    }
    
    foreach ($dep in $DesignDeps) {
        if ($packageJson.dependencies.$dep -or $packageJson.devDependencies.$dep) {
            Add-TestResult "設計依賴: $dep" "PASS"
        } else {
            Add-TestResult "缺少設計依賴: $dep" "WARN"
            $WarningCount++
        }
    }
}

# 3. TypeScript 編譯測試
if ($TestType -eq "all" -or $TestType -eq "build") {
    Write-Host "`n⚙️ 測試 TypeScript 編譯..." -ForegroundColor Cyan
    
    try {
        $tscOutput = npx tsc --noEmit --skipLibCheck 2>&1
        if ($LASTEXITCODE -eq 0) {
            Add-TestResult "TypeScript 編譯" "PASS"
        } else {
            Add-TestResult "TypeScript 編譯" "FAIL" $tscOutput
            $ErrorCount++
        }
    } catch {
        Add-TestResult "TypeScript 編譯" "FAIL" $_.Exception.Message
        $ErrorCount++
    }
}

# 4. Vite 構建測試
if ($TestType -eq "all" -or $TestType -eq "build") {
    Write-Host "`n🔨 測試 Vite 構建..." -ForegroundColor Cyan
    
    try {
        $buildOutput = npm run build 2>&1
        if ($LASTEXITCODE -eq 0) {
            Add-TestResult "Vite 構建" "PASS"
            
            # 檢查構建輸出
            if (Test-Path "dist") {
                $distFiles = Get-ChildItem "dist" -Recurse -File
                Add-TestResult "構建輸出" "PASS" "$($distFiles.Count) 個檔案生成"
                
                # 檢查關鍵檔案
                if (Test-Path "dist/index.html") {
                    Add-TestResult "HTML 檔案" "PASS"
                } else {
                    Add-TestResult "HTML 檔案" "FAIL"
                    $ErrorCount++
                }
            }
        } else {
            Add-TestResult "Vite 構建" "FAIL" $buildOutput
            $ErrorCount++
        }
    } catch {
        Add-TestResult "Vite 構建" "FAIL" $_.Exception.Message
        $ErrorCount++
    }
}

# 5. 路由配置測試
if ($TestType -eq "all" -or $TestType -eq "routes") {
    Write-Host "`n🛣️ 測試路由配置..." -ForegroundColor Cyan
    
    if (Test-Path "src/config/routes.js") {
        try {
            # 使用 Node.js 來檢查路由檔案
            $routeTest = @"
const fs = require('fs');
const path = require('path');

// 讀取路由配置
const routesContent = fs.readFileSync('src/config/routes.js', 'utf8');

// 檢查是否有 Portfolio 引用（應該已被移除）
if (routesContent.includes('Portfolio.tsx')) {
    console.log('FAIL: 仍包含已刪除的 Portfolio.tsx 引用');
    process.exit(1);
}

// 檢查路由數量
const routeMatches = routesContent.match(/path:\s*['"][^'"]*['"]/g);
if (routeMatches && routeMatches.length > 5) {
    console.log('PASS: 找到 ' + routeMatches.length + ' 個路由');
} else {
    console.log('WARN: 路由數量較少: ' + (routeMatches ? routeMatches.length : 0));
}

console.log('PASS: 路由配置檢查完成');
"@
            
            $routeTest | Out-File -FilePath "temp_route_test.js" -Encoding utf8
            $routeOutput = node temp_route_test.js 2>&1
            Remove-Item "temp_route_test.js" -Force
            
            if ($routeOutput -contains "FAIL") {
                Add-TestResult "路由配置檢查" "FAIL" $routeOutput
                $ErrorCount++
            } elseif ($routeOutput -contains "WARN") {
                Add-TestResult "路由配置檢查" "WARN" $routeOutput
                $WarningCount++
            } else {
                Add-TestResult "路由配置檢查" "PASS"
            }
        } catch {
            Add-TestResult "路由配置檢查" "FAIL" $_.Exception.Message
            $ErrorCount++
        }
    } else {
        Add-TestResult "路由配置檔案" "FAIL" "routes.js 不存在"
        $ErrorCount++
    }
}

# 6. 設計系統測試
if ($TestType -eq "all" -or $TestType -eq "components") {
    Write-Host "`n🎨 測試設計系統..." -ForegroundColor Cyan
    
    $DesignSystemFiles = @(
        "src/design-system/index.ts",
        "src/design-system/theme.ts",
        "src/design-system/components.tsx",
        "src/design-system/types.ts"
    )
    
    foreach ($file in $DesignSystemFiles) {
        if (Test-Path $file) {
            $content = Get-Content $file -Raw
            
            # 檢查動畫引用錯誤
            if ($content -match "animations\.easings") {
                Add-TestResult "設計系統: $file" "FAIL" "仍包含 animations.easings 引用錯誤"
                $ErrorCount++
            } else {
                Add-TestResult "設計系統: $file" "PASS"
            }
        } else {
            Add-TestResult "設計系統: $file" "FAIL" "檔案不存在"
            $ErrorCount++
        }
    }
}

# 7. 組件測試
if ($TestType -eq "all" -or $TestType -eq "components") {
    Write-Host "`n🧩 測試組件結構..." -ForegroundColor Cyan
    
    $ComponentDirs = @(
        "src/components/Modules",
        "src/pages",
        "src/layout"
    )
    
    foreach ($dir in $ComponentDirs) {
        if (Test-Path $dir) {
            $componentFiles = Get-ChildItem $dir -Recurse -Name "*.tsx", "*.jsx"
            if ($componentFiles.Count -gt 0) {
                Add-TestResult "組件目錄: $dir" "PASS" "$($componentFiles.Count) 個組件"
            } else {
                Add-TestResult "組件目錄: $dir" "WARN" "沒有找到組件檔案"
                $WarningCount++
            }
        } else {
            Add-TestResult "組件目錄: $dir" "FAIL" "目錄不存在"
            $ErrorCount++
        }
    }
}

# 8. 文檔測試
Write-Host "`n📚 測試文檔結構..." -ForegroundColor Cyan

$DocFiles = @(
    "README.md",
    "docs/INDEX.md",
    "docs/PROJECT_SUMMARY.md"
)

foreach ($file in $DocFiles) {
    if (Test-Path $file) {
        $size = (Get-Item $file).Length
        if ($size -gt 100) {
            Add-TestResult "文檔: $file" "PASS" "$size bytes"
        } else {
            Add-TestResult "文檔: $file" "WARN" "檔案過小: $size bytes"
            $WarningCount++
        }
    } else {
        Add-TestResult "文檔: $file" "FAIL" "檔案不存在"
        $ErrorCount++
    }
}

# 9. 開發服務器測試
Write-Host "`n🌐 測試開發服務器..." -ForegroundColor Cyan

# 檢查是否有服務器在運行
$serverRunning = netstat -ano | Select-String ":(5173|5174|5175|5176|5177|5178|5179|5180|5181|5182)"
if ($serverRunning) {
    Add-TestResult "開發服務器" "PASS" "服務器正在運行"
} else {
    Add-TestResult "開發服務器" "WARN" "沒有檢測到運行中的開發服務器"
    $WarningCount++
}

# 10. 生成測試報告
Write-Host "`n📊 測試報告" -ForegroundColor Cyan
Write-Host "=" * 60

$PassCount = ($TestResults | Where-Object { $_.Status -eq "PASS" }).Count
$FailCount = ($TestResults | Where-Object { $_.Status -eq "FAIL" }).Count
$WarnCount = ($TestResults | Where-Object { $_.Status -eq "WARN" }).Count

Write-Host "✅ 通過測試: $PassCount" -ForegroundColor Green
Write-Host "❌ 失敗測試: $FailCount" -ForegroundColor Red
Write-Host "⚠️  警告: $WarnCount" -ForegroundColor Yellow
Write-Host "總計測試: $($TestResults.Count)"

# 關鍵問題摘要
if ($FailCount -gt 0) {
    Write-Host "`n🔴 關鍵問題:" -ForegroundColor Red
    $TestResults | Where-Object { $_.Status -eq "FAIL" } | ForEach-Object {
        Write-Host "  • $($_.Test): $($_.Message)" -ForegroundColor Red
    }
}

if ($WarnCount -gt 0) {
    Write-Host "`n🟡 需要注意:" -ForegroundColor Yellow
    $TestResults | Where-Object { $_.Status -eq "WARN" } | ForEach-Object {
        Write-Host "  • $($_.Test): $($_.Message)" -ForegroundColor Yellow
    }
}

# 建議
Write-Host "`n💡 建議:" -ForegroundColor Cyan
if ($FailCount -eq 0 -and $WarnCount -eq 0) {
    Write-Host "  🎉 專案狀態良好！可以進行部署。" -ForegroundColor Green
} elseif ($FailCount -eq 0) {
    Write-Host "  👍 核心功能正常，建議處理警告項目後部署。" -ForegroundColor Yellow
} else {
    Write-Host "  🚨 需要修復關鍵問題後才能安全部署。" -ForegroundColor Red
}

# 保存詳細報告
$ReportPath = "test-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
$TestResults | ConvertTo-Json -Depth 3 | Out-File $ReportPath -Encoding utf8
Write-Host "`n📝 詳細報告已保存至: $ReportPath" -ForegroundColor Gray

# 返回結果
if ($FailCount -gt 0) {
    exit 1
} else {
    exit 0
}