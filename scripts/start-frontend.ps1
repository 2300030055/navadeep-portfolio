$ErrorActionPreference = "Stop"

$frontendDir = Join-Path (Split-Path $PSScriptRoot -Parent) "frontend"

Write-Host "Starting frontend at http://localhost:5500 ..."
Set-Location $frontendDir
python -m http.server 5500
