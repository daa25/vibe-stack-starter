#!/usr/bin/env pwsh
# VibeLink Server Startup Script

Write-Host "🏠 Starting VibeLink Server..." -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚙️  Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Please configure your .env file with webhook URL if needed" -ForegroundColor Yellow
}

# Start server
Write-Host "🚀 Launching VibeLink API on port 5102..." -ForegroundColor Green
npm start
