#!/usr/bin/env pwsh
# TravelQuest Static Server

Write-Host "✈️  Starting TravelQuest Hub..." -ForegroundColor Cyan

$PORT = 5301

Write-Host "🚀 Serving TravelQuest on http://localhost:$PORT..." -ForegroundColor Green
Write-Host "📝 Note: Using Python's built-in HTTP server" -ForegroundColor Yellow
Write-Host "   Alternatively, use 'npx serve -p $PORT' for production" -ForegroundColor Yellow

# Check if Python is available
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server $PORT
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 -m http.server $PORT
} else {
    Write-Host "❌ Python not found. Installing serve instead..." -ForegroundColor Red
    npm install -g serve
    serve -p $PORT
}
