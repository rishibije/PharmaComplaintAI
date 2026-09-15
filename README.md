# PharmaComplaint AI

AI-powered Pharmaceutical Customer Complaint Management System built using React, FastAPI, LangGraph, Groq, and PostgreSQL.

The system accepts pharmaceutical customer complaints through text or PDF/TXT files and uses AI to extract, analyze, classify, and manage complaint information.

## Features

* Complaint text input
* PDF/TXT complaint upload
* AI-powered complaint information extraction
* Complaint completeness checking
* Risk level assessment
* Severity and priority classification
* AI-generated complaint summary
* Root cause analysis
* Duplicate complaint detection
* CAPA recommendations
* Complaint history stored in PostgreSQL

## Technology Stack

### Frontend

* React
* Vite
* Redux Toolkit
* React Redux
* Lucide React
* CSS
* Google Inter Font

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Uvicorn

### AI

* LangGraph
* LangChain
* Groq
* Gemma 2 9B IT

### Document Processing

* PyPDF

## System Workflow

```text
Customer Complaint
       |
       v
React Frontend
       |
       v
FastAPI Backend
       |
       v
LangGraph Workflow
       |
       +--> Complaint Extraction
       |
       +--> Completeness Check
       |
       +--> Risk Assessment
       |
       +--> AI Summary
       |
       +--> Root Cause Analysis
       |
       +--> CAPA Recommendation
       |
       v
Duplicate Detection
       |
       v
PostgreSQL Database
       |
       v
Complaint History
```

## LangGraph Workflow

```text
START
  |
  v
Extract Complaint
  |
  v
Check Completeness
  |
  v
Assess Risk
  |
  v
Generate Summary
  |
  v
Analyze Root Cause
  |
  v
Recommend CAPA
  |
  v
END
```

## Project Structure

```text
PharmaComplaintAI/
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   ├── graph.py
│   │   │   ├── llm.py
│   │   │   ├── prompts.py
│   │   │   └── duplicate.py
│   │   ├── api/
│   │   │   └── complaints.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   └── models.py
│   ├── create\_tables.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Installation

### Prerequisites

* Python 3.10+
* Node.js
* PostgreSQL
* Git

### Backend Setup

```powershell
cd backend
python -m venv venv
.\\venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
```

### Environment Variables

Create `backend/.env`:

```env
GROQ\_API\_KEY=your\_groq\_api\_key\_here
DATABASE\_URL=postgresql+psycopg://postgres:your\_password@localhost:5432/pharma\_complaints
```

Do not commit `.env` to GitHub. A `.env.example` template is included.

### Database Setup

Create a PostgreSQL database named:

```text
pharma\_complaints
```

Then run:

```powershell
python create\_tables.py
```

### Start Backend

```powershell
uvicorn app.main:app --reload --port 8001
```

Backend: `http://127.0.0.1:8001`

FastAPI docs: `http://127.0.0.1:8001/docs`

### Frontend Setup

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## How to Use

### Complaint Text

1. Open the React application.
2. Enter a pharmaceutical customer complaint.
3. Click **Analyze Complaint**.
4. The complaint is sent to FastAPI.
5. LangGraph processes the complaint.
6. AI analysis is displayed.
7. The complaint is stored in PostgreSQL.

### PDF/TXT Complaint

1. Upload a PDF or TXT complaint document.
2. Click **Analyze Complaint**.
3. FastAPI extracts the document text.
4. The extracted text is passed to LangGraph.
5. AI analysis is performed.
6. The result is stored in PostgreSQL.
7. The complaint appears in Complaint History.

## AI Analysis

### Complaint Extraction

Extracts structured information including customer, product, strength, batch number, manufacturing date, expiry date, complaint type, complaint date, and description.

### Completeness Check

Provides a completeness score, missing information, and sufficiency status.

### Risk Assessment

Provides risk level, severity, priority, and risk reasoning.

### AI Summary

Generates a concise complaint summary and recommended next action.

### Root Cause Analysis

Generates potential root causes and investigation areas. These are investigation hypotheses, not confirmed manufacturing failures.

### Duplicate Complaint Detection

Compares the new complaint with previously analyzed complaints using product name, batch number, complaint type, and description, then calculates a similarity score.

### CAPA Recommendation

Generates AI-assisted corrective actions, preventive actions, suggested owners, and target completion recommendations.

### Complaint History

Previously analyzed complaints are stored in PostgreSQL and displayed in the Complaint History section.

## API Endpoints

### Analyze Complaint

```text
POST /api/complaints/analyze
```

Accepts complaint text or PDF/TXT files.

### Complaint History

```text
GET /api/complaints/
```

Returns previously analyzed complaints stored in PostgreSQL.

## AI Model

The application uses Groq with:

```text
gemma2-9b-it
```

LangChain connects the application to Groq, while LangGraph organizes the multi-step complaint analysis workflow.

The model temperature is set to `0` for more consistent analysis.

## Data Flow

```text
User
 |
 v
React UI
 |
 v
Redux State
 |
 v
FastAPI
 |
 +---- PDF/TXT Text Extraction
 |
 v
LangGraph
 |
 +---- Extract Complaint
 +---- Check Completeness
 +---- Assess Risk
 +---- Generate Summary
 +---- Analyze Root Cause
 +---- Recommend CAPA
 |
 v
Duplicate Detection
 |
 v
PostgreSQL
 |
 v
React UI
 |
 v
Complaint History
```

## Security

Sensitive configuration is kept outside the repository.

The following are excluded using `.gitignore`:

```text
.env
venv/
.venv/
node\_modules/
```

API keys and database credentials should never be committed to the repository.

## Future Improvements

* OCR support for scanned complaint documents
* Email complaint ingestion
* Image-based complaint analysis
* Authentication and role-based access
* Embedding-based duplicate detection
* Complaint analytics dashboard
* Human approval workflow for AI recommendations
* Audit trail
* Cloud deployment
* Advanced pharmaceutical quality workflows

## Project Purpose

PharmaComplaint AI demonstrates how generative AI and workflow orchestration can assist pharmaceutical customer complaint management.

The system converts unstructured customer complaints into structured information and provides AI-assisted analysis for complaint quality and investigation workflows.

AI-generated risk assessments, root causes, summaries, and CAPA recommendations are intended to support human investigation and decision-making rather than replace qualified quality personnel.

## Author

**Rishi Bije**



