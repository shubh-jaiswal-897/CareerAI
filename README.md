# CareerAI - AI-Based Personalized Career Guidance App

CareerAI is a premium, glassmorphism dark-themed **React + Tailwind CSS** frontend paired with a high-performance **Python FastAPI** backend. It provides students and job seekers with personalized career guidance.

## Key Features

1. **Goal Roadmap Generator**: Enter a career goal and current skills to get a tailored, multi-phase study plan powered by Gemini AI.
2. **Smart Resume Reviewer**: Upload your resume in PDF format. The backend parses it using PyMuPDF and the AI evaluates it on ATS compatibility, structural formatting, and visual layout.
3. **AI Career Coach**: Interactive chat interface preloaded with quick coaching prompts. The coach is context-aware!
4. **MongoDB Persistence**: User logins, registrations, and resume analyses are saved directly to MongoDB.

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18+ for the frontend.
- **Python**: Version 3.10+ for the backend.
- **MongoDB**: A running instance (local or Atlas cluster).

### Installation & Setup

1. Install Frontend dependencies:
   ```bash
   npm install
   ```

2. Install Backend dependencies:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\Activate
   pip install -r requirements.txt
   cd ..
   ```

3. Set up your environment variables in `.env` (Frontend) and `backend/.env` (Backend):
   ```env
   # Backend .env
   MONGODB_URI=mongodb://localhost:27017
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

### Running the Application

To run both the **Vite React Frontend** and the **FastAPI Backend** concurrently from the root directory, use:
```bash
npm run dev
```

- **Frontend**: Runs at [http://localhost:3000](http://localhost:3000)
- **Backend Server**: Runs at [http://localhost:8000](http://localhost:8000)

### AI Prompts
CareerAI relies on specifically engineered prompts to get strict JSON responses from Gemini API. Examples include:
- *Resume Parser*: "You are an expert ATS and Resume Reviewer... Return the output STRICTLY in JSON format matching this schema..."
- *Roadmap Builder*: "You are an expert Career Advisor. Create a step-by-step learning roadmap... Return the output STRICTLY in JSON format..."

---

## Open Design Workspace Integration

We have cloned the **Open Design** (by `nexu-io`) repository into the `open-design/` folder in this workspace.

### What is Open Design?
Open Design is a local-first, open-source workspace that turns coding agents (like Gemini, Cursor, or Claude Code) into a layout and mockup engine.

### How to Run Open Design
1. Open a new terminal window.
2. Navigate to the `open-design` folder:
   ```bash
   cd open-design
   ```
3. Enable `corepack` and install dependencies:
   ```bash
   corepack enable
   pnpm install
   ```
4. Run the Open Design development server:
   ```bash
   pnpm tools-dev
   ```
5. Open your browser and navigate to the local portal (usually [http://localhost:7456](http://localhost:7456)) to design your mockups, wireframes, and code prototypes.

npm run dev
# or: yarn dev / pnpm dev
