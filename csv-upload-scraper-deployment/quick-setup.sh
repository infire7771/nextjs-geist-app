#!/bin/bash

echo "CSV Upload & Scraper - Quick Setup Script"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create uploads directory with proper permissions
echo "📁 Setting up uploads directory..."
mkdir -p uploads
chmod 755 uploads

echo "✅ Uploads directory ready"

# Build the application
echo "🔨 Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Application built successfully"

echo ""
echo "🎉 Setup complete! Your CSV Upload & Scraper is ready."
echo ""
echo "To start the application:"
echo "  Production: npm start"
echo "  Development: npm run dev"
echo ""
echo "The application will be available at:"
echo "  http://localhost:3000"
echo ""
echo "Features:"
echo "  ✅ Upload CSV files"
echo "  ✅ View and manage files"
echo "  ✅ Process data row by row"
echo "  ✅ API endpoints for automation"
