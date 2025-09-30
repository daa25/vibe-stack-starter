#!/usr/bin/env pwsh
# VibeStack - Start All Funnels

Write-Host "🎯 VibeStack Launcher" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta

# Function to start service in new window
function Start-Service {
    param(
        [string]$Name,
        [string]$Path,
        [string]$Script
    )
    
    Write-Host "🚀 Starting $Name..." -ForegroundColor Green
    
    if (Test-Path $Path) {
        Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$Path'; .\$Script"
    } else {
        Write-Host "⚠️  $Name path not found: $Path" -ForegroundColor Yellow
    }
}

# Start all services
Start-Service -Name "VibeLink" -Path "VibeLink/server" -Script "start.ps1"
Start-Sleep -Seconds 2

Start-Service -Name "ReapSow-Lite" -Path "ReapSow-Lite/router" -Script "start.ps1"
Start-Sleep -Seconds 2

Start-Service -Name "TravelQuest" -Path "TravelQuest" -Script "serve.ps1"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "✅ All services launched!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Service URLs:" -ForegroundColor Cyan
Write-Host "   VibeLink API:     http://localhost:5102" -ForegroundColor White
Write-Host "   ReapSow-Lite API: http://localhost:5201" -ForegroundColor White
Write-Host "   TravelQuest Hub:  http://localhost:5301" -ForegroundColor White
Write-Host ""
Write-Host "📝 Check each service window for logs" -ForegroundColor Yellow
Write-Host "   Press Ctrl+C in each window to stop services" -ForegroundColor Yellow
