$ErrorActionPreference = "Stop"

$mysqlExe = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$schemaFile = Join-Path (Split-Path $PSScriptRoot -Parent) "database\schema.sql"

if (-not (Test-Path $mysqlExe)) {
    Write-Host "MySQL not found at: $mysqlExe"
    Write-Host "Install MySQL 8 or update the path in this script."
    exit 1
}

$password = Read-Host "Enter MySQL root password" -AsSecureString
$plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

Write-Host "Creating database and tables..."
& $mysqlExe -u root -p$plainPassword -e "SOURCE $($schemaFile -replace '\\', '/')"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database setup complete!" -ForegroundColor Green
} else {
    Write-Host "Database setup failed. Check your password and try again." -ForegroundColor Red
    exit 1
}
