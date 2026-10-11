@echo off
cd /d "%~dp0backend"
set DB_USERNAME=root
set /p DB_PASSWORD=Enter your local MySQL root password:
call mvnw.cmd "-Dspring-boot.run.arguments=--server.port=8080" spring-boot:run
set DB_PASSWORD=
pause
