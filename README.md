# IGNITE° — Production Digital Studio Platform

Ignite° is an independent digital product engineering and design studio platform. This repository contains the cinematic React 19 frontend application and the production-ready FastAPI backend with PostgreSQL persistence, multi-layer spam defense, and email notifications.

---

## 1. Project Overview

- **Frontend**: React 19, TypeScript, Vite 8, GSAP 3, Lenis smooth scrolling, CSS custom properties, and responsive editorial layout.
- **Backend**: Python 3.12+, FastAPI, SQLAlchemy 2.x, Pydantic v2, Alembic, psycopg3.
- **Database**: PostgreSQL (production & local) with in-memory SQLite support for unit testing.
- **Email Delivery**: Resend provider abstraction with local console fallback.
- **Security & Anti-Abuse**: Honeypot traps, form-completion timing thresholds, salted SHA-256 IP hashing, sliding-window rate limiting, and duplicate submission interception.

---

## 2. Architecture

```text
C:\D\Startup\
├── src/                         # React Frontend Application
│   ├── components/              # Layout, UI components, motion wrappers
│   ├── config/                  # Brand and centralized projectOptions.ts
│   ├── data/                    # Articles, capabilities, projects, team
│   ├── hooks/                   # useCursor, usePageMeta, useScrollProgress
│   ├── lib/                     # api.ts (HTTP client), analytics.ts (tracking stub)
│   ├── pages/                   # Contact, Quote wizard, Home, Services, Work, etc.
│   └── router.tsx               # Client-side routing with deep link fallback
├── backend/                     # Production FastAPI Backend
│   ├── alembic/                 # Database migrations (env.py, versions/)
│   ├── app/
│   │   ├── api/routes/          # health.py, contact.py, quote.py, projects.py, etc.
│   │   ├── core/                # config.py, database.py, logging.py, security.py
│   │   ├── models/              # contact.py, quote.py (SQLAlchemy 2.x models)
│   │   ├── repositories/        # contact_repository.py, quote_repository.py
│   │   ├── schemas/             # contact.py, quote.py, common.py, health.py
│   │   ├── services/            # email_service.py, lead_service.py, spam_service.py
│   │   ├── utils/               # request_meta.py, sanitization.py
│   │   └── main.py              # Application entrypoint & CORS middleware
│   ├── tests/                   # Pytest test suite (14 passing tests)
│   ├── Dockerfile               # Multi-stage python:3.12-slim container
│   ├── requirements.txt         # Pinned production dependencies
│   ├── alembic.ini              # Alembic migration configuration
│   └── .env.example             # Backend environment template
├── public/                      # Static assets, robots.txt, sitemap.xml
├── vercel.json                  # Vercel SPA routing rewrite rules
├── .env.example                 # Frontend environment template
└── package.json                 # Node dependencies & build scripts
```

---

## 3. Database Schema

### Table: `contact_submissions`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` (PK) | Unique lead identifier |
| `name` | `VARCHAR(100)` | Client full name |
| `email` | `VARCHAR(255)` (Indexed) | Normalized work email |
| `company` | `VARCHAR(150)` | Organization / venture |
| `phone` | `VARCHAR(50)` | Optional phone |
| `project_type` | `VARCHAR(100)` | Web Application, SaaS, AI, etc. |
| `budget_range` | `VARCHAR(100)` | Selected budget tier |
| `timeline` | `VARCHAR(100)` | Deployment milestone |
| `message` | `TEXT` | Project context |
| `status` | `VARCHAR(50)` (Indexed) | `new`, `reviewed`, `contacted`, `closed`, `spam` |
| `source` | `VARCHAR(50)` | Default: `website_contact` |
| `ip_hash` | `VARCHAR(64)` (Indexed) | Salted SHA-256 IP hash (no plain IP stored) |
| `user_agent` | `VARCHAR(500)` | Client browser telemetry |
| `referrer` | `VARCHAR(500)` | Traffic referral source |
| `utm_*` | `VARCHAR(100)` | Campaign parameters (`source`, `medium`, `campaign`) |
| `created_at` | `TIMESTAMPTZ` | Submission timestamp |
| `updated_at` | `TIMESTAMPTZ` | Last status modification |

### Table: `quote_requests`
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` (PK) | Unique brief identifier |
| `services` | `JSON` / `JSONB` | Array of selected services |
| `project_stage` | `VARCHAR(100)` | `Idea`, `Requirements ready`, etc. |
| `priorities` | `JSON` / `JSONB` | Array of core technical priorities |
| `budget_range` | `VARCHAR(100)` | Selected budget tier |
| `timeline` | `VARCHAR(100)` | Target timeline |
| `name` | `VARCHAR(100)` | Client name |
| `email` | `VARCHAR(255)` (Indexed) | Client email |
| `company` | `VARCHAR(150)` | Organization |
| `phone` | `VARCHAR(50)` | Optional phone |
| `project_description` | `TEXT` | Additional architectural context |
| `status` | `VARCHAR(50)` (Indexed) | `new`, `reviewed`, `contacted`, `closed`, `spam` |
| `source` | `VARCHAR(50)` | Default: `website_quote` |
| `ip_hash` | `VARCHAR(64)` | Salted SHA-256 IP hash |
| `created_at` / `updated_at`| `TIMESTAMPTZ` | Timestamps |

---

## 4. Setup & Local Development

### Prerequisites
- Node.js 18+ & npm
- Python 3.11+
- PostgreSQL server running locally (or remote connection)

### Backend Setup
```bash
cd backend

# 1. Create and activate virtual environment
python -m venv .venv

# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env

# 4. Run database migrations
alembic upgrade head

# 5. Start development API server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at `http://127.0.0.1:8000`.  
Swagger documentation is accessible at `http://127.0.0.1:8000/docs`.

### Frontend Setup
```bash
# In project root (C:\D\Startup)
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 5. Environment Variables

### Frontend (`.env`)
```ini
VITE_API_BASE_URL=http://localhost:8000
VITE_SITE_URL=http://localhost:5173
```

### Backend (`backend/.env`)
```ini
APP_ENV=development
DEBUG=true
DATABASE_URL=postgresql+psycopg://postgres:root@localhost:5432/ignite_db
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
EMAIL_PROVIDER=console            # Switch to 'resend' in production
RESEND_API_KEY=                   # Required if EMAIL_PROVIDER=resend
FROM_EMAIL=Ignite° Studio <inquiries@ignite-studio.com>
LEAD_NOTIFICATION_EMAIL=founders@ignite-studio.com
IP_HASH_SECRET=your-random-cryptographic-salt-key
```

---

## 6. Form Submission & Email Flow

1. **User Submits Form / Quote**:
   - Client validates fields and captures start-time duration.
   - Client sends payload via centralized `src/lib/api.ts` with 15s `AbortController` timeout.
2. **Server Spam & Rate Limit Filter**:
   - Verifies hidden honeypot (`website_url`). If filled, silently quarantines lead as spam.
   - Checks client submission elapsed time (< 1.5s flagged as bot).
   - Enforces sliding-window rate limit (5 attempts per 10 minutes per hashed IP).
   - Reconciles duplicate submissions within 120 seconds.
3. **Database Lead Persistence**:
   - Writes submission to PostgreSQL with UUID and telemetry.
4. **Email Dispatch (Asynchronous & Resilient)**:
   - Internal notification email dispatched to `LEAD_NOTIFICATION_EMAIL`.
   - Acknowledgement email dispatched to user's address with Reference ID.
   - **Crucial**: Any email delivery interruption logs cleanly without failing the database lead.
5. **Client Feedback**:
   - Frontend transitions to success card displaying unique `REFERENCE ID`.
   - Quote draft is cleared from `sessionStorage`.

---

## 7. Testing & Build Commands

### Backend Tests
```bash
cd backend
.venv\Scripts\pytest -v
```
*(14 passing tests covering health, valid/invalid payloads, honeypot mitigation, duplicate submissions, and rate limiting)*

### Frontend Verification
```bash
npm run lint         # Runs oxlint (0 errors, 0 warnings)
npx tsc -b           # Strict TypeScript type check
npm run build        # Production bundle to dist/
```

---

## 8. Deployment Architecture

- **Frontend Hosting**: Deploy root repository to **Vercel**.
  - `vercel.json` provides automated deep-link rewrite to `/index.html` for React Router paths (`/services`, `/work`, `/work/:slug`, `/about`, `/contact`, `/quote`, `/insights`).
  - Set `VITE_API_BASE_URL` to your production backend URL.
- **Backend Hosting**: Deploy `backend/` to **Render** or **Railway**.
  - Docker deployment using `backend/Dockerfile` or native Python runner:
    `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
  - Connect managed PostgreSQL instance (e.g., Neon, Supabase, Render Postgres, AWS RDS).
  - Add production environment variables (`DATABASE_URL`, `RESEND_API_KEY`, `IP_HASH_SECRET`, `CORS_ORIGINS`).
