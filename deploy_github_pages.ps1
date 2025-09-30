#!/usr/bin/env pwsh
# Deploy VibeStack to GitHub Pages

param(
    [Parameter(Mandatory=$true)]
    [string]$Owner,
    
    [Parameter(Mandatory=$true)]
    [string]$Repo,
    
    [Parameter(Mandatory=$false)]
    [string]$Domain = ""
)

Write-Host "🚀 VibeStack GitHub Pages Deployment" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Check if remote exists
$remoteUrl = "https://github.com/$Owner/$Repo.git"
$existingRemote = git remote get-url origin 2>$null

if ($existingRemote) {
    Write-Host "🔗 Remote already configured: $existingRemote" -ForegroundColor Cyan
} else {
    Write-Host "🔗 Adding remote: $remoteUrl" -ForegroundColor Yellow
    git remote add origin $remoteUrl
}

# Stage all files
Write-Host "📝 Staging files..." -ForegroundColor Yellow
git add .

# Commit
$commitMessage = "Deploy VibeStack - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host "💾 Committing: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host ""
Write-Host "✅ Repository pushed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Go to: https://github.com/$Owner/$Repo/settings/pages" -ForegroundColor White
Write-Host "   2. Under 'Source', select 'Deploy from branch'" -ForegroundColor White
Write-Host "   3. Select 'main' branch and '/ (root)' folder" -ForegroundColor White
Write-Host "   4. Click 'Save'" -ForegroundColor White

if ($Domain) {
    Write-Host ""
    Write-Host "🌐 Custom Domain Setup:" -ForegroundColor Cyan
    Write-Host "   1. Create a CNAME file with your domain: $Domain" -ForegroundColor White
    Write-Host "   2. Add DNS record: CNAME -> $Owner.github.io" -ForegroundColor White
    Write-Host "   3. Configure custom domain in GitHub Pages settings" -ForegroundColor White
    
    # Create CNAME file
    Write-Host ""
    Write-Host "📄 Creating CNAME file..." -ForegroundColor Yellow
    Set-Content -Path "CNAME" -Value $Domain
    git add CNAME
    git commit -m "Add custom domain: $Domain"
    git push
}

Write-Host ""
Write-Host "🎉 Deployment complete!" -ForegroundColor Green
Write-Host "   Your site will be live at: https://$Owner.github.io/$Repo" -ForegroundColor White
if ($Domain) {
    Write-Host "   Custom domain (after DNS): https://$Domain" -ForegroundColor White
}
