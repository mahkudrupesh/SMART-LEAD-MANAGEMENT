# Smart Lead Management Automation CRM

A simple, modern, presentation-ready MERN CRM with a Kanban board, lead CRUD, MongoDB Atlas integration, and n8n webhook automation.

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Axios, React Router DOM
- Backend: Node.js, Express, MongoDB Atlas, Mongoose, dotenv, cors, Axios
- Automation: n8n webhook integration

## Project Structure

```text
smart-lead-management/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── ...
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── README.md
```

## 1) Installation Commands

From the workspace root:

```bash
cd smart-lead-management
```

### Backend dependencies

```bash
cd server
npm install express mongoose dotenv cors axios
npm install -D nodemon
```

### Frontend dependencies

```bash
cd ../client
npm install
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

Note: This project already includes prepared config files, so these commands are mainly for first-time setup and reinstall scenarios.

## 2) Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/crm?retryWrites=true&w=majority
N8N_WEBHOOK_URL=http://localhost:5678/webhook/create-lead
CLIENT_URL=http://localhost:5173
```

## 3) MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a cluster.
2. Create a database user (username/password).
3. In **Network Access**, allow your current IP (or `0.0.0.0/0` for demo use only).
4. Copy your connection string and replace `MONGO_URI` in `server/.env`.
5. Keep database name as `crm` (or any custom DB name in the URI).

Connection logic is implemented in `server/config/db.js`:

```js
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
```

## 4) n8n Webhook Setup

1. Run n8n locally (default: `http://localhost:5678`).
2. Create a workflow with a **Webhook** trigger:
   - Path: `create-lead`
   - Method: `POST`
3. Add any action nodes you want (Email, Slack, Google Sheets, etc.).
4. Activate workflow.
5. Ensure `N8N_WEBHOOK_URL=http://localhost:5678/webhook/create-lead`.

When lead creation API is called, backend:
1. Saves lead in MongoDB Atlas
2. Triggers n8n webhook automatically

## 5) Run Instructions

Open two terminals.

### Terminal 1 - Backend

```bash
cd smart-lead-management/server
npm run dev
```

Expected:
- `MongoDB Connected`
- `Server running on port 5000`

### Terminal 2 - Frontend

```bash
cd smart-lead-management/client
npm run dev
```

Open the shown Vite URL (usually `http://localhost:5173`).

## 6) API Endpoints

Base URL: `http://localhost:5000/api/leads`

- `POST /create` - Create lead + trigger n8n webhook
- `GET /` - Get all leads
- `PUT /:id` - Update lead
- `DELETE /:id` - Delete lead

### Sample JSON payload

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@acme.com",
  "company": "Acme Pvt Ltd",
  "status": "New",
  "assignedTo": "Riya"
}
```

## 7) API Testing Steps (Postman)

1. **Create lead**
   - `POST http://localhost:5000/api/leads/create`
   - Body: JSON payload above
2. **Get leads**
   - `GET http://localhost:5000/api/leads`
3. **Update lead**
   - `PUT http://localhost:5000/api/leads/:id`
   - Body example: `{ "status": "In Progress" }`
4. **Delete lead**
   - `DELETE http://localhost:5000/api/leads/:id`

## 8) Presentation Flow (Week-1)

1. Show modern login UI
2. Login and land on dashboard
3. Show stats cards
4. Open create lead modal and submit
5. Show lead appearing on Kanban board
6. Change lead status from one column to another
7. Mention backend API + MongoDB Atlas save
8. Show n8n workflow execution for automation

## 9) Scripts

### Server (`server/package.json`)
- `npm run dev` - Start with nodemon
- `npm start` - Start production server

### Client (`client/package.json`)
- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

---

This project is intentionally kept simple and clean for a strong internship demo while still reflecting professional SaaS-style architecture and UI.
