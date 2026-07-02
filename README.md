# Candidate360 🚀

Candidate360 is an AI-powered recruiting platform designed for resume screening, ATS (Applicant Tracking System) optimization, LinkedIn profile syncing, and candidate ranking.

---

## 🛠️ Tech Stack

* **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion
* **Backend:** FastAPI + Python 3.x + Uvicorn
* **Database & Auth:** Firebase Authentication & Realtime Database
* **AI/ML:** HuggingFace Hub & Transformers, Sentence-Transformers (for semantic profile mapping), Scikit-Learn (for similarity scoring & TF-IDF), LangChain (for agent orchestration), and vector embeddings for multi-agent candidate evaluation
* **Data Integration:** Apify API (LinkedIn Profile Scraper)

---

## 📁 Repository Structure

```text
├── ai_models/          # AI prompt configurations (e.g. recruiter_prompt.txt)
├── backend/            # Python FastAPI backend application
│   ├── app/
│   │   ├── ai/         # AI models and embeddings utility
│   │   ├── api/        # API route handlers (Resume analysis, LinkedIn sync)
│   │   ├── parsers/    # Document parsing utilities
│   │   └── config.py   # Dotenv configuration manager
│   └── requirements.txt
├── frontend/           # React SPA frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── contexts/   # App state and Auth contexts
│   │   ├── firebase/   # Firebase service initialization
│   │   └── pages/      # Router pages (Login, Dashboard, SkillGap, Settings)
│   └── package.json
├── scripts/            # Helper scripts (DB seeding, report generation)
├── .env.example        # Environment variable template
├── package.json        # Workspace configuration script
└── README.md           # Documentation
```

---

## ⚙️ Configuration (.env)

The project is configured to use a **single, unified `.env` file** at the root of the workspace. Vite reads from this file for the frontend, and Python's `dotenv` loads it for the backend.

### Set up the `.env` file:
1. Copy the example template:
   ```bash
   cp .env.example .env
   ```
2. Populate the required variables:
   ```env
   VITE_API_BASE_URL=http://localhost:8000

   # Paste your Apify API Token (Optional, for LinkedIn profile scraping):
   APIFY_API_TOKEN=your_apify_token

   # Paste your Gemini API Key (Required for Resume Optimizer):
   GEMINI_API_KEY=your_gemini_api_key

   # Paste your Firebase Credentials (Required for authentication and database):
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18 or higher)
* Python 3.10+
* npm

### 1. Installation
Install all backend and frontend dependencies from the root directory:

**Frontend Dependencies:**
```bash
npm install
```

**Backend Dependencies:**
```bash
pip install -r requirements.txt
```

---

### 2. Running the Application

#### Start the Backend (FastAPI):
Change directory to `backend` and start the server:
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```
The API documentation will be available at `http://localhost:8000/docs`.

#### Start the Frontend (React + Vite):
Run the dev script from the root directory:
```bash
npm run dev
```
The client application will run at `http://localhost:5173`.

---

## ✨ Features

* **Resume Optimizer:** Analyzes resume PDFs using Gemini 2.5 Flash, providing direct ATS feedback, highlights, and actionable improvements.
* **LinkedIn Sync:** Automatically pulls work experience, skills, and summary from a candidate's LinkedIn URL via Apify.
* **Dashboard & Rankings:** Intuitive visualization of candidate rankings, skills match analysis, and hiring pipelines.
* **Firebase Auth:** Secure sign-in and account registration for recruiters.

