// 專案測試腳本 - Node.js 版本
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 開始測試個人作品集專案...\n');

let passCount = 0;
let failCount = 0;
let warnCount = 0;

function testResult(name, status, message = '') {
    const symbols = { PASS: '✅', FAIL: '❌', WARN: '⚠️' };
    console.log(`${symbols[status]} ${name}${message ? `: ${message}` : ''}`);
    
    if (status === 'PASS') passCount++;
    else if (status === 'FAIL') failCount++;
    else if (status === 'WARN') warnCount++;
}

// 1. 檢查核心檔案
console.log('📁 檢查專案結構...');
const coreFiles = [
    'package.json',
    'vite.config.ts', 
    'src/main.tsx',
    'src/App.tsx',
    'src/design-system/index.ts',
    'src/config/routes.js'
];

coreFiles.forEach(file => {
    if (fs.existsSync(file)) {
        testResult(`核心檔案: ${file}`, 'PASS');
    } else {
        testResult(`核心檔案: ${file}`, 'FAIL', '檔案不存在');
    }
});

// 2. 檢查動畫引用錯誤
console.log('\n🎨 檢查設計系統...');
try {
    const designSystemContent = fs.readFileSync('src/design-system/index.ts', 'utf8');
    if (designSystemContent.includes('animations.easings')) {
        testResult('動畫引用檢查', 'FAIL', '仍包含 animations.easings 錯誤引用');
    } else {
        testResult('動畫引用檢查', 'PASS');
    }
} catch (error) {
    testResult('動畫引用檢查', 'FAIL', error.message);
}

// 3. 檢查路由配置
console.log('\n🛣️ 檢查路由配置...');
try {
    const routesContent = fs.readFileSync('src/config/routes.js', 'utf8');
    if (routesContent.includes('Portfolio.tsx')) {
        testResult('Portfolio 路由檢查', 'FAIL', '仍包含已刪除的 Portfolio.tsx 引用');
    } else {
        testResult('Portfolio 路由檢查', 'PASS');
    }
    
    // 檢查路由數量
    const routeMatches = routesContent.match(/path:\s*['"][^'"]*['"]/g);
    const routeCount = routeMatches ? routeMatches.length : 0;
    if (routeCount >= 8) {
        testResult('路由數量檢查', 'PASS', `找到 ${routeCount} 個路由`);
    } else {
        testResult('路由數量檢查', 'WARN', `只有 ${routeCount} 個路由`);
    }
} catch (error) {
    testResult('路由配置檢查', 'FAIL', error.message);
}

// 4. 檢查組件結構
console.log('\n🧩 檢查組件結構...');
const componentDirs = [
    'src/components/Modules',
    'src/pages',
    'src/layout'
];

componentDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir, { recursive: true })
            .filter(file => file.endsWith('.tsx') || file.endsWith('.jsx'));
        testResult(`組件目錄: ${dir}`, 'PASS', `${files.length} 個組件檔案`);
    } else {
        testResult(`組件目錄: ${dir}`, 'FAIL', '目錄不存在');
    }
});

// 5. TypeScript 編譯檢查
console.log('\n⚙️ 檢查 TypeScript 編譯...');
try {
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' });
    testResult('TypeScript 編譯', 'PASS');
} catch (error) {
    const errorOutput = error.stdout ? error.stdout.toString() : error.message;
    const errorLines = errorOutput.split('\n').filter(line => line.trim()).slice(0, 3);
    testResult('TypeScript 編譯', 'FAIL', errorLines.join('; '));
}

// 6. 檢查設計系統檔案完整性
console.log('\n🎭 檢查設計系統完整性...');
const designSystemFiles = [
    'src/design-system/index.ts',
    'src/design-system/theme.ts', 
    'src/design-system/components.tsx',
    'src/design-system/types.ts'
];

designSystemFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const size = fs.statSync(file).size;
        if (size > 500) {
            testResult(`設計系統: ${path.basename(file)}`, 'PASS', `${size} bytes`);
        } else {
            testResult(`設計系統: ${path.basename(file)}`, 'WARN', `檔案過小: ${size} bytes`);
        }
    } else {
        testResult(`設計系統: ${path.basename(file)}`, 'FAIL', '檔案不存在');
    }
});

// 7. 文檔檢查
console.log('\n📚 檢查文檔...');
const docFiles = ['README.md', 'docs/INDEX.md'];
docFiles.forEach(file => {
    if (fs.existsSync(file)) {
        testResult(`文檔: ${path.basename(file)}`, 'PASS');
    } else {
        testResult(`文檔: ${path.basename(file)}`, 'WARN', '檔案不存在');
    }
});

// 總結報告
console.log('\n📊 測試總結');
console.log('='.repeat(50));
console.log(`✅ 通過: ${passCount}`);
console.log(`❌ 失敗: ${failCount}`);
console.log(`⚠️ 警告: ${warnCount}`);
console.log(`總計: ${passCount + failCount + warnCount}`);

// 建議
console.log('\n💡 建議:');
if (failCount === 0 && warnCount === 0) {
    console.log('🎉 專案狀態完美！可以安全部署。');
} else if (failCount === 0) {
    console.log('👍 核心功能正常，建議處理警告項目。');
} else {
    console.log('🚨 需要修復失敗項目後才能部署。');
}

// 快速啟動指令
console.log('\n🚀 常用指令:');
console.log('  開發服務器: npm run dev');
console.log('  構建專案: npm run build');
console.log('  預覽構建: npm run preview');

process.exit(failCount > 0 ? 1 : 0);