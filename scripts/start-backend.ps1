$ErrorActionPreference = "Stop"

$rootDir = Split-Path $PSScriptRoot -Parent
$backendDir = Join-Path $rootDir "backend"
$envFile = Join-Path $rootDir ".env"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#=]+?)\s*=\s*(.+?)\s*$') {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
    Write-Host "Loaded environment from .env"
} else {
    Write-Host "No .env file found. Using defaults (DB_PASSWORD must be set)."
    Write-Host "Copy .env.example to .env and set DB_PASSWORD."
    $env:DB_URL = "jdbc:mysql://localhost:3306/navadeep_portfolio?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
    $env:DB_USERNAME = "root"
    if (-not $env:DB_PASSWORD) {
        $securePass = Read-Host "Enter MySQL root password" -AsSecureString
        $env:DB_PASSWORD = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
            [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass)
        )
    }
}

$env:CORS_ALLOWED_ORIGINS = "http://localhost:5500,http://127.0.0.1:5500"

Write-Host "Starting Spring Boot backend on http://localhost:8080 ..."
Set-Location $backendDir
& (Join-Path $backendDir "build.ps1") spring-boot:run
