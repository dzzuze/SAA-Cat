# SAA Cat — Tandem Widget Trainer

## Project Description

SAA Cat is an interactive SPA designed for practicing programming concepts relevant to technical interviews.  
The application provides a collection of visual, gamified widgets that help users strengthen their knowledge of JavaScript, TypeScript, and core computer science topics through hands-on interaction.

Users can explore topics, complete challenges, and track their learning progress in an engaging and intuitive environment.

---

## Project Name Origin

**SAA Cat** is derived from the first letters of our team members’ names:

- **S** — Sergey
- **A** — Anna
- **A** — Artem

And **Cat**… because cats are cute

The theme adds a light, friendly tone to the learning experience while keeping the educational focus.

---

## Team Members

- **Sergey Sidoryaka**  
  GitHub: https://github.com/sidoryakasergey

- **Artem**  
  GitHub: https://github.com/dzzuze

- **Anna Dzig**  
  GitHub: https://github.com/annaDzig

---

## Project Goals

- Provide an engaging way to practice JS/TS concepts
- Reinforce understanding through interactive widgets
- Simulate interview-style challenges
- Demonstrate clean architecture and TypeScript best practices

---

## Tech Stack

- React
- TypeScript (strict mode)
- Vite
- ESLint + Prettier
- LocalStorage / Mock Data
- Tailwind

---

## Development Timeline

The project is being developed as part of the RS School JS/FE Final Project (Tandem), following an agile, iterative workflow.

---

## Deploy

https://dzzuze.github.io/SAA-Cat/

---

## Run Locally

Follow these steps to run the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/dzzuze/SAA-Cat.git
```

### 2. Navigate to the project folder

```bash
cd SAA-Cat
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment variables

Create a `.env` file in the root of the project and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> These values can be obtained from your Firebase project settings.

### 5. Start the development server

```bash
npm run dev
```

### 6. Open in browser

The app will be available at:

`http://localhost:5173`

## Video for Week 5 Checkpoint

[Video for Week 5 Checkpoint](https://www.youtube.com/watch?v=7-F7fzZgQK8)

---
## Project Board

You can view our project board here:

[ https://our-board-link.com](https://github.com/dzzuze/SAA-Cat/issues?q=is%3Aissue%20state%3Aclosed)

### Board Screenshot
<img width="1244" height="1225" alt="Screenshot 2026-04-06 at 10 29 11" src="https://github.com/user-attachments/assets/72c56608-5ab8-499b-80d5-11204b496607" />

---
##  Best Pull Requests

Here are some of the most meaningful pull requests in the project, each with substantial implementation and constructive code review:

- [Feat/btn-component](https://github.com/dzzuze/SAA-Cat/pull/32)) - Introduced a reusable button component (`ButtonLoading`) and improved form behavior by ensuring proper button types to prevent unintended submissions. Also refined naming conventions (PascalCase) and aligned styling practices. This PR improves consistency, reusability, and overall UX in form interactions.
- [Feat/extend firebase auth features](https://github.com/dzzuze/SAA-Cat/pull/36)) —  Added password reset functionality, integrated toast notifications for user feedback, and introduced a testing setup using Vitest and React Testing Library. This PR improves authentication UX and establishes a foundation for reliable testing and future feature development.
- [Implement Main Page (Landing Page)](https://github.com/dzzuze/SAA-Cat/pull/38) — Implemented the landing page with key sections (Hero, How It Works, Topics) using reusable components and clear structure. This PR establishes the first user entry point, improves UX, and lays the foundation for navigation and future feature expansion.
- [Implement Dark/Light Theme + UI Refactor](https://github.com/dzzuze/SAA-Cat/pull/64) — Introduced a full theming system with light/dark mode, system preference support, and persistent settings, along with a comprehensive UI refactor to replace hardcoded styles with semantic design tokens. This PR significantly improves consistency, accessibility, and maintainability across the entire application.

Each of these PRs includes meaningful discussion, review feedback, and decisions that helped improve the quality of the project.


---

_Learning can be serious and cute at the same time._

---
