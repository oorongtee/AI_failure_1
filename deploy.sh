#!/bin/bash

# 3D Interactive Portfolio - Deployment Script
# This script provides multiple deployment options

echo "🚀 3D Interactive Portfolio Deployment Script"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Function to build the project
build_project() {
    echo "📦 Building project..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
    echo "✅ Build successful!"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "🔵 Deploying to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo "📥 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Deploy to Vercel
    if [ "$1" == "production" ]; then
        vercel --prod
    else
        vercel
    fi
    
    echo "✅ Vercel deployment complete!"
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🟢 Deploying to Netlify..."
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
        echo "📥 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # Build first
    build_project
    
    # Deploy to Netlify
    if [ "$1" == "production" ]; then
        netlify deploy --prod --dir=dist
    else
        netlify deploy --dir=dist
    fi
    
    echo "✅ Netlify deployment complete!"
}

# Function to setup GitHub Pages deployment
setup_github_pages() {
    echo "🐙 Setting up GitHub Pages deployment..."
    
    # Create .github/workflows directory
    mkdir -p .github/workflows
    
    # Create GitHub Actions workflow
    cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install --legacy-peer-deps
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
EOF
    
    echo "✅ GitHub Pages workflow created!"
    echo "📝 Don't forget to enable GitHub Pages in your repository settings!"
}

# Function to show environment setup
show_env_setup() {
    echo "🔧 Environment Variables Setup"
    echo "============================="
    echo ""
    echo "Create a .env.local file with the following variables:"
    echo ""
    cat << 'EOF'
# API Configuration
VITE_API_BASE_URL=https://api.yourservice.com
VITE_OPENAI_API_KEY=your_openai_key

# Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Features
VITE_ENABLE_3D=true
VITE_ENABLE_AI_FEATURES=true
EOF
}

# Function to run local preview
preview_local() {
    echo "👁️ Building and previewing locally..."
    build_project
    npm run preview
}

# Function to analyze bundle
analyze_bundle() {
    echo "📊 Analyzing bundle size..."
    build_project
    
    # Install bundle analyzer if not present
    if ! npm list --depth=0 | grep -q "rollup-plugin-visualizer"; then
        echo "📥 Installing bundle analyzer..."
        npm install --save-dev rollup-plugin-visualizer
    fi
    
    echo "Bundle analysis will open in your browser..."
}

# Main menu
show_menu() {
    echo ""
    echo "Choose deployment option:"
    echo "1) Deploy to Vercel (preview)"
    echo "2) Deploy to Vercel (production)"
    echo "3) Deploy to Netlify (preview)"
    echo "4) Deploy to Netlify (production)"
    echo "5) Setup GitHub Pages"
    echo "6) Preview locally"
    echo "7) Show environment setup"
    echo "8) Analyze bundle size"
    echo "9) Exit"
    echo ""
}

# Main script logic
while true; do
    show_menu
    read -p "Enter your choice (1-9): " choice
    
    case $choice in
        1)
            deploy_vercel "preview"
            ;;
        2)
            deploy_vercel "production"
            ;;
        3)
            deploy_netlify "preview"
            ;;
        4)
            deploy_netlify "production"
            ;;
        5)
            setup_github_pages
            ;;
        6)
            preview_local
            ;;
        7)
            show_env_setup
            ;;
        8)
            analyze_bundle
            ;;
        9)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done