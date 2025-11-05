#!/bin/bash

# Deployment script for TDI Vendor Management System
# This script builds and deploys the application to production

set -e  # Exit on any error

echo "🚀 Starting deployment of TDI Vendor Management System..."

# Build the frontend
echo "🏗️  Building frontend application..."
npm run build

# Build the backend
echo "⚙️  Building backend application..."
npm run backend:build

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Please create one before running the application."
    echo "📋 Creating a sample .env file for reference..."
    cat > .env << EOF
# Server Configuration
PORT=4000
FRONTEND_URL=http://localhost:4500

# Database Configuration
DB_HOST=192.168.100.115
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=456456
DB_NAME=tendertrader

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:4500,http://192.168.100.115:4500,https://vendor1.mpurwadi.site,https://vendors.mpurwadi.site
EOF
    echo "📝 Sample .env file created. Please update with your actual values!"
else
    echo "✅ Found .env file"
fi

# Install production dependencies only
echo "📦 Installing production dependencies..."
npm ci --only=production

echo "✅ Build and preparation completed successfully!"
echo ""
echo "🚀 To start the application in production:"
echo "   For backend: npm run backend"
echo "   Frontend will be served from the dist/ folder (use a web server like nginx)"
echo ""
echo "🔧 For PM2 deployment (if installed):"
echo "   pm2 start server/server.ts --name vms-backend"
echo ""
echo "📝 Make sure your PostgreSQL database is running and accessible"