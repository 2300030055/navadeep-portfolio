# Deploy — Avanigadda Navadeep Portfolio

Your links are configured. Follow these steps to go live.

## Your Links (configured)

| Item | URL |
|------|-----|
| GitHub | https://github.com/2300030055 |
| LinkedIn | https://www.linkedin.com/in/avanigadda-navadeep-7a46b4301/ |
| Figma Project | [View prototype](https://www.figma.com/proto/5jQKX8hJAKXoBCFDAKSDcG/Untitled?t=3mneARXk3BhsvBbL-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=6-33) |
| WordPress Project | https://webappsklsac.wordpress.com/ |
| AI Smart Agriculture | https://udify.app/chat/OioTzjVue8VPxWQm |

---

## Step 1 — Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `navadeep-portfolio`
3. Set to **Public** (required for free GitHub Pages)
4. Do **NOT** add README, .gitignore, or license (already in project)
5. Click **Create repository**

## Step 2 — Push Code

```powershell
cd "d:\MY PORTOLIO"
git remote add origin https://github.com/2300030055/navadeep-portfolio.git
git push -u origin main
```

If remote already exists:
```powershell
git push -u origin main
```

## Step 3 — Enable GitHub Pages (Frontend)

1. Open https://github.com/2300030055/navadeep-portfolio/settings/pages
2. Under **Build and deployment** → Source: **GitHub Actions**
3. The workflow `.github/workflows/deploy-frontend.yml` runs automatically on push
4. After 1–2 minutes, your site will be live at:

   **https://2300030055.github.io/navadeep-portfolio/**

## Step 4 — Deploy Backend (Render — Free Tier)

GitHub hosts the frontend only. The Spring Boot API needs a separate free host.

1. Go to https://render.com and sign in with GitHub
2. Click **New +** → **Blueprint**
3. Connect repo `2300030055/navadeep-portfolio`
4. Render reads `render.yaml` automatically
5. Set environment variables:

| Variable | Value |
|----------|-------|
| `DB_URL` | Your MySQL JDBC URL (from PlanetScale, Railway, or Aiven free tier) |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `CORS_ALLOWED_ORIGINS` | `https://2300030055.github.io` |

6. Deploy — note your backend URL, e.g. `https://navadeep-portfolio-api.onrender.com`

## Step 5 — Connect Frontend to Backend

Edit `frontend/js/script.js`:

```javascript
const CONFIG = {
  API_BASE_URL: 'https://navadeep-portfolio-api.onrender.com',
  // ... rest stays the same
};
```

Commit and push:
```powershell
git add frontend/js/script.js
git commit -m "Set production API URL"
git push
```

GitHub Actions will redeploy the frontend automatically.

## Step 6 — MySQL Database (Free)

Create a free MySQL database and run `database/schema.sql`:

- [PlanetScale](https://planetscale.com) — check current free tier
- [Railway](https://railway.app) — free credits/month
- [Aiven](https://aiven.io) — free trial

---

## Test Checklist

- [ ] https://2300030055.github.io/navadeep-portfolio/ loads
- [ ] GitHub link opens https://github.com/2300030055
- [ ] LinkedIn link works
- [ ] Figma, WordPress, AI project buttons work
- [ ] Contact form sends message (after backend + DB are live)

---

## Free Tier Notes

- **GitHub Pages**: Free, may have bandwidth limits
- **Render**: Free tier sleeps after 15 min inactivity (first request may be slow)
- **MySQL free tiers**: May have storage/connection limits
