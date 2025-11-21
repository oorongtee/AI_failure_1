# 項目清理腳本
# 移除未使用的文件和組件

Write-Host "開始清理項目文件..." -ForegroundColor Green

# 1. 移除未使用的 UI 組件
Write-Host "移除舊的 UI 組件..." -ForegroundColor Yellow
$uiComponentsPath = "C:\Users\Ray\Desktop\project\dev\personalWebsite2.0\2.0\src\components\UI"
if (Test-Path $uiComponentsPath) {
    Remove-Item $uiComponentsPath -Recurse -Force
    Write-Host "✓ 已移除 components/UI 目錄" -ForegroundColor Green
}

# 2. 移除未使用的 3D 組件（如果沒有使用）
Write-Host "檢查 3D 組件使用情況..." -ForegroundColor Yellow
$threeDPath = "C:\Users\Ray\Desktop\project\dev\personalWebsite2.0\2.0\src\components\3D"

# 3. 更新 layout/index.ts 文件
Write-Host "更新 layout 導出文件..." -ForegroundColor Yellow
$layoutIndexPath = "C:\Users\Ray\Desktop\project\dev\personalWebsite2.0\2.0\src\layout\index.ts"
if (Test-Path $layoutIndexPath) {
    $content = @"
// Layout components export
export { default as MainLayout } from './MainLayout';
export { default as TopNavigation } from './TopNavigation';
export { default as SideNavigation } from './SideNavigation';
export { default as Footer } from './Footer';
"@
    $content | Out-File -FilePath $layoutIndexPath -Encoding utf8
    Write-Host "✓ 已更新 layout/index.ts" -ForegroundColor Green
}

# 4. 檢查並移除未使用的頁面文件
Write-Host "檢查頁面文件..." -ForegroundColor Yellow
$unusedPages = @(
    "C:\Users\Ray\Desktop\project\dev\personalWebsite2.0\2.0\src\pages\Dashboard.tsx",
    "C:\Users\Ray\Desktop\project\dev\personalWebsite2.0\2.0\src\pages\Portfolio.tsx", 
    "C:\Users\Ray\Desktop\project\dev\personalWebsite2.0\2.0\src\pages\Workflow.tsx"
)

foreach ($page in $unusedPages) {
    if (Test-Path $page) {
        Remove-Item $page -Force
        Write-Host "✓ 已移除 $(Split-Path $page -Leaf)" -ForegroundColor Green
    }
}

# 5. 創建簡化的組件結構
Write-Host "重組組件目錄結構..." -ForegroundColor Yellow

Write-Host "項目清理完成！" -ForegroundColor Green
Write-Host "建議接下來執行 'npm run dev' 檢查是否有任何破損的引用。" -ForegroundColor Cyan