# Avanigadda Navadeep — Personal Portfolio

A professional personal portfolio website built with **HTML5, CSS3, Vanilla JavaScript**, **Spring Boot**, and **MySQL**.

## Project Structure

```
navadeep-portfolio/
├── frontend/          # Static website (HTML, CSS, JS)
├── backend/           # Spring Boot REST API
├── database/          # MySQL schema
├── README.md
└── .gitignore
```

## Features

- Premium dark-themed responsive portfolio
- Sticky navigation with mobile hamburger menu
- Animated hero with rotating role titles
- Education timeline, project cards, interests & hobbies
- Working contact form connected to Spring Boot + MySQL
- CORS configured for development and production
- Ready for free-tier deployment

---

## Quick Start (Windows)

See **[QUICKSTART.md](QUICKSTART.md)** for step-by-step scripts:

```powershell
.\scripts\setup-database.ps1   # one-time MySQL setup
Copy-Item .env.example .env    # set DB_PASSWORD
.\scripts\start-backend.ps1    # terminal 1
.\scripts\start-frontend.ps1   # terminal 2
```

---

## Local Development

### Prerequisites

- **Java 17+**
- **Maven 3.8+**
- **MySQL 8+**
- A local web server for the frontend (e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension)

### Step 1 — Set Up MySQL

1. Start MySQL on your machine.
2. Run the schema script:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `navadeep_portfolio` database and `contact_messages` table.

### Step 2 — Configure Environment Variables

Set these before starting the backend:

**Windows (PowerShell):**
```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/navadeep_portfolio?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_password_here"
```

**macOS / Linux:**
```bash
export DB_URL="jdbc:mysql://localhost:3306/navadeep_portfolio?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
export DB_USERNAME="root"
export DB_PASSWORD="your_password_here"
```

> Never commit passwords. Use environment variables only.

### Step 3 — Start the Backend

```bash
cd backend
mvn spring-boot:run
```

**Windows (paths with spaces):** use the included build script:

```powershell
cd backend
.\build.ps1 spring-boot:run
```

Or build the JAR:

```powershell
.\build.ps1 clean package -DskipTests
java -jar target\portfolio-1.0.0.jar
```

The API runs at `http://localhost:8080`.

Verify health: `GET http://localhost:8080/api/health`

### Step 4 — Start the Frontend

Open the `frontend/` folder with Live Server, or use any static file server:

```bash
# Python 3
cd frontend
python -m http.server 5500
```

Open `http://localhost:5500` in your browser.

### Step 5 — Configure Links

Edit `frontend/js/script.js` — update the `CONFIG` object:

```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:8080',
  GITHUB_URL: 'https://github.com/yourusername',
  LINKEDIN_URL: 'https://linkedin.com/in/yourprofile',
  FIGMA_PROJECT_URL: 'https://figma.com/...',
  WORDPRESS_PROJECT_URL: 'https://...',
  AI_PROJECT_URL: 'https://...'
};
```

Add your profile photo to `frontend/assets/profile.jpg` (or keep the included SVG placeholders until ready) and project images to `frontend/assets/projects/`.

---

## API

### POST /api/contact

Submit a contact message.

**Request:**
```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "message": "Hello Navadeep..."
}
```

**Success (201):**
```json
{
  "success": true,
  "message": "Message sent successfully. Thanks for reaching out!",
  "id": 1
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": {
    "email": "Please enter a valid email address."
  }
}
```

---

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

---

# Deployment

This project is designed for **free-tier** hosting. Free services may have sleep/inactivity periods, monthly limits, bandwidth caps, and database size restrictions. Uptime is not guaranteed 24/7 on free tiers.

## Step 1 — GitHub

Push your code to GitHub (see commands above). Ensure `.env` files and credentials are **not** committed.

## Step 2 — MySQL (Free Database)

Choose a free MySQL provider (availability changes over time; verify current free tiers before deploying):

| Provider | Notes |
|----------|-------|
| [PlanetScale](https://planetscale.com) | MySQL-compatible (check current free tier status) |
| [Railway](https://railway.app) | Offers free credits/month |
| [Aiven](https://aiven.io) | Free trial tiers |
| [FreeSQLDatabase](https://freesqldatabase.com) | Basic free MySQL |

1. Create a MySQL database instance.
2. Run `database/schema.sql` against the remote database.
3. Note the connection URL, username, and password.

## Step 3 — Spring Boot Backend

Deploy the backend to a free Java/Spring Boot host:

| Provider | Notes |
|----------|-------|
| [Render](https://render.com) | Free web service (may sleep after inactivity) |
| [Railway](https://railway.app) | Free credits/month |
| [Fly.io](https://fly.io) | Free allowance |

**Build command:**
```bash
cd backend && mvn clean package -DskipTests
```

**Start command:**
```bash
java -jar target/portfolio-1.0.0.jar
```

## Step 4 — Environment Variables

Set these on your backend hosting platform:

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_URL` | MySQL JDBC connection string | `jdbc:mysql://host:3306/navadeep_portfolio?useSSL=true&serverTimezone=UTC` |
| `DB_USERNAME` | Database username | `your_db_user` |
| `DB_PASSWORD` | Database password | `your_db_password` |
| `CORS_ALLOWED_ORIGINS` | Deployed frontend URL(s), comma-separated | `https://yourname.github.io` |

Never expose database credentials in source code or GitHub.

## Step 5 — Frontend

Deploy static files to a free static host:

| Provider | Notes |
|----------|-------|
| [GitHub Pages](https://pages.github.com) | Free, serves from repo |
| [Netlify](https://netlify.com) | Free tier with drag-and-drop deploy |
| [Cloudflare Pages](https://pages.cloudflare.com) | Free static hosting |
| [Vercel](https://vercel.com) | Free for static sites |

Upload or connect the `frontend/` folder.

## Step 6 — API URL

After deploying the backend, update `frontend/js/script.js`:

```javascript
const CONFIG = {
  API_BASE_URL: 'https://your-backend.onrender.com',
  // ... other URLs
};
```

Redeploy the frontend after this change.

## Step 7 — CORS

Set `CORS_ALLOWED_ORIGINS` on the backend to your **exact** production frontend URL:

```
CORS_ALLOWED_ORIGINS=https://yourname.github.io
```

Do **not** use `*` in production. Only allow your deployed frontend origin.

## Step 8 — Testing

After deployment, verify:

- [ ] Portfolio loads at your public URL
- [ ] GitHub link works (update placeholder URL)
- [ ] LinkedIn link works (update placeholder URL)
- [ ] Project links work (update placeholder URLs)
- [ ] Contact form submits successfully
- [ ] Message appears in MySQL `contact_messages` table
- [ ] Responsive layout on mobile (375px, 768px)
- [ ] No console errors in browser DevTools

---

## Security Notes

- Database credentials are loaded from environment variables only
- Backend validates all contact form input (never trust frontend alone)
- Stack traces are hidden from API responses
- HTML in messages is stored as plain text (not rendered)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Java 17, Spring Boot 3, Spring Web, Spring Data JPA |
| ORM | Hibernate |
| Database | MySQL 8 |
| Build | Maven |

---

© 2026 Avanigadda Navadeep
