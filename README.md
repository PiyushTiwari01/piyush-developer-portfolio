# Piyush Tiwari — Developer Portfolio

A polished React + Vite portfolio with a Python FastAPI contact API, ready to run locally and deploy to Render.

## Included
- Responsive dark portfolio UI with project cards, skills, experience, contact form, and downloadable resume
- React + Vite frontend
- FastAPI backend for contact form submissions (validated; logs messages to server output)
- Render Blueprint (`render.yaml`) for deploying frontend and backend
- Replaceable sample resume PDF and project links

## Run locally

### 1. Backend (Python)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\\Scripts\\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173).

The frontend uses `VITE_API_URL` for the API base URL. Without it, the contact form targets `http://localhost:8000`.

## Deploy on Render

1. Push this folder to a GitHub repository.
2. In Render, choose **New + → Blueprint** and select the repository.
3. Render reads `render.yaml` and creates a Python API service plus a static React site.
4. Once the API is live, copy its URL, then set `VITE_API_URL` on the frontend service to that URL (no trailing slash), and trigger a new frontend deploy.
5. Update the `resume.pdf` file in `frontend/public/` with your real resume before sharing the site.
6. Edit contact details and project links in `frontend/src/data.js`.

## Important customizations before sharing
- In `frontend/src/data.js`, update the email, LinkedIn, GitHub, and project/demo URLs.
- Replace `frontend/public/resume.pdf` with your real resume PDF. The included file is only a placeholder and must be replaced.
- The contact API currently validates and logs submissions; it does not email you. Add an email provider or database if you want persistent contact messages.
- Update the project descriptions so they accurately reflect what you built and what is publicly available.

## Tech stack
React, Vite, CSS, Python, FastAPI, Pydantic, Uvicorn.
