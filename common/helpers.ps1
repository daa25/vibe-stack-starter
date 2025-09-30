#!/usr/bin/env pwsh
# Common PowerShell Helpers for VibeStack

function Write-VibeStackHeader {
    param([string]$Service)
    
    Write-Host ""
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Magenta
    Write-Host "║           VibeStack - $Service" -ForegroundColor Magenta -NoNewline
    Write-Host (" " * (25 - $Service.Length)) -NoNewline
    Write-Host "║" -ForegroundColor Magenta
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Magenta
    Write-Host ""
}

function Test-NodeInstalled {
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js not found!" -ForegroundColor Red
        Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
        return $false
    }
    
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green
    return $true
}

function Install-Dependencies {
    param([string]$Path)
    
    if (-not (Test-Path "$Path/node_modules")) {
        Write-Host "📦 Installing dependencies in $Path..." -ForegroundColor Yellow
        Push-Location $Path
        npm install --quiet
        Pop-Location
        Write-Host "✅ Dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✅ Dependencies already installed" -ForegroundColor Green
    }
}

function Initialize-EnvFile {
    param(
        [string]$Path,
        [string]$ExampleFile = ".env.example"
    )
    
    $envPath = Join-Path $Path ".env"
    $examplePath = Join-Path $Path $ExampleFile
    
    if (-not (Test-Path $envPath)) {
        if (Test-Path $examplePath) {
            Write-Host "⚙️  Creating .env from $ExampleFile..." -ForegroundColor Yellow
            Copy-Item $examplePath $envPath
            Write-Host "✅ .env file created - please configure as needed" -ForegroundColor Green
        } else {
            Write-Host "⚠️  No $ExampleFile found" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ .env file exists" -ForegroundColor Green
    }
}

function Test-Port {
    param([int]$Port)
    
    $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    
    if ($connection) {
        Write-Host "⚠️  Port $Port is already in use!" -ForegroundColor Yellow
        Write-Host "   Kill process? (Y/N): " -ForegroundColor Yellow -NoNewline
        $response = Read-Host
        
        if ($response -eq "Y" -or $response -eq "y") {
            $processId = $connection.OwningProcess
            Stop-Process -Id $processId -Force
            Write-Host "✅ Process killed" -ForegroundColor Green
            Start-Sleep -Seconds 1
            return $true
        } else {
            return $false
        }
    }
    
    return $true
}

function Show-ServiceInfo {
    param(
        [string]$Name,
        [int]$Port,
        [string]$Description
    )
    
    Write-Host ""
    Write-Host "🎯 $Name" -ForegroundColor Cyan
    Write-Host "   $Description" -ForegroundColor White
    Write-Host "   http://localhost:$Port" -ForegroundColor Green
}

function Wait-ForKeyPress {
    param([string]$Message = "Press any key to continue...")
    
    Write-Host ""
    Write-Host $Message -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# Export functions
Export-ModuleMember -Function *
