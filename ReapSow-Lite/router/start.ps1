#!/usr/bin/env pwsh
# ReapSow-Lite Server Startup Script

Write-Host "🧮 Starting ReapSow-Lite Server..." -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚙️  Creating .env from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Please configure your .env file with Stripe keys if needed" -ForegroundColor Yellow
}

# Start server
Write-Host "🚀 Launching ReapSow-Lite API on port 5201..." -ForegroundColor Green
npm start
