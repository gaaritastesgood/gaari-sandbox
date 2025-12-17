# Gaari Sandbox

This repository is a **sandbox application** used for exploring product ideas and validating assumptions. It currently contains a **frontend UI** built with React, but it is intended to support **backend development as well**.

The goal of the repo is to provide a shared space where UI and backend work can evolve together during early experimentation.

---

## Scope

### Current

* Frontend UI built with React, Vite, and TypeScript
* Basic routing, components, and example pages
* UI experimentation and layout testing

### Intended / Future

* Backend services (API, data access, business logic)
* Integration between frontend and backend
* End-to-end feature prototyping

At the moment, **only the UI is implemented**. Backend code has not been added yet.

---

## Tech Stack (current)

* **Vite** – development server and build tool
* **React** – UI framework
* **TypeScript** – static typing
* **shadcn/ui** – component library
* **React Router** – routing
* **Recharts** – charts

---

## Project Structure (current)

```text
src/
├── components/        # Reusable UI components
├── pages/             # Route-level pages
├── types/             # Shared TypeScript types
├── lib/               # Utilities and helpers
├── App.tsx            # App routes and layout
└── main.tsx           # Application entry point
```

If backend code is added, the structure will be extended (for example, with a `server/` or `api/` directory).

---

## Getting Started

### Requirements

* Node.js 18+
* npm (or pnpm)

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The local development URL will be printed by Vite (typically `http://localhost:5173`).

---

## Notes

* This repo is a sandbox, not a production system
* Structure and conventions may change as backend work is added
* The emphasis is on clarity and iteration rather than completeness

---

Internal sandbox repository
