# Build script for Windows (handles paths with spaces)
$ErrorActionPreference = "Stop"

$backendDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$wrapperJar = Join-Path $backendDir ".mvn\wrapper\maven-wrapper.jar"
$pomFile = Join-Path $backendDir "pom.xml"

if (-not (Test-Path $wrapperJar)) {
    Write-Host "Downloading Maven Wrapper..."
    Invoke-WebRequest -Uri "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar" -OutFile $wrapperJar
}

$mavenArgs = @(
    "-Dmaven.multiModuleProjectDirectory=$backendDir",
    "-classpath", $wrapperJar,
    "org.apache.maven.wrapper.MavenWrapperMain",
    "-f", $pomFile
) + $args

& java @mavenArgs
