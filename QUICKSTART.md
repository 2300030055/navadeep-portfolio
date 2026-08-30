# Navadeep Portfolio — Startup Scripts

## 1. Set up the database (one time)

```powershell
.\scripts\setup-database.ps1
```

Enter your MySQL root password when prompted.

## 2. Configure backend credentials

```powershell
Copy-Item .env.example .env
# Edit .env and set DB_PASSWORD to your MySQL password
```

## 3. Start backend

```powershell
.\scripts\start-backend.ps1
```

API: http://localhost:8080/api/health

## 4. Start frontend (new terminal)

```powershell
.\scripts\start-frontend.ps1
```

Site: http://localhost:5500

## Replace placeholder images

Swap SVG placeholders in `frontend/index.html` with your JPG files:
- `assets/profile.jpg`
- `assets/projects/*.jpg`

## Update links

Edit `frontend/js/script.js` → `CONFIG` object.
