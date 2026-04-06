# Self-Assessment

**PR with self-assessment:** _PR_LINK_

## Deploy

https://dzzuze.github.io/SAA-Cat/

---

## Personal Features Score

| Category         | Feature / Description                                                         | PR / Code Link | Points |
| ---------------- | ----------------------------------------------------------------------------- | -------------- | ------ |
| Frameworks       | React (SPA built with React + Vite)                                           |                | +5     |
| Architecture     | State Manager (Zustand used via auth/global state)                            |                | +10    |
| Architecture     | API Layer (separation of Firebase logic from UI via helpers)                  |                | +10    |
| Architecture     | Design Patterns (modular structure, config-driven UI, separation of concerns) |                | +10    |
| Backend & Data   | BaaS Auth (Firebase Auth integration via AuthProvider)                        |                | +15    |
| Backend & Data   | BaaS CRUD (reading/writing lessons + quiz + progress from Firestore)          |                | +15    |
| UI & Interaction | Theme Switcher (dark/light/system with persistence)                           |                | +10    |
| UI & Interaction | Responsive layout (Landing, Lessons, Quiz)                                    |                | +5     |
| Quality          | Unit Tests (Header tests with Vitest + RTL)                                   |                | +10    |
| My Components    | Rich UI Screen: Landing Page (Hero, How It Works, Topics)                     |                | +20    |
| My Components    | Rich UI Screen: LessonsPage (lesson list + ordering + navigation entry)       |                | +20    |
| My Components    | Rich UI Screen: LessonPage (Markdown + completion + navigation logic)         |                | +20    |
| My Components    | Rich UI Screen: Profile Page (progress grouping + UI refactor)                |                | +20    |
| My Components    | Rich UI Screen: QuizPage (questions, navigation, score, result screen)        |                | +20    |
| My Components    | Complex Component: Lessons Flow (routing + Firebase sync + navigation logic)  |                | +25    |
| My Components    | Complex Component: Quiz System (state, scoring, Firebase data flow)           |                | +25    |

| **Total** | **240+ (capped to 250)** |

---

## Description of My Work

During this project I was mainly responsible for the frontend architecture and user experience.

At the beginning I focused on understanding the task and defining a clean structure for the application. I started with routing and quickly realized that simple routing would not scale once authentication is added. Because of that, I refactored it into layout-based routing using React Router, separating public, protected, and guest-only flows.

After that I worked on the Main Page. Before writing code, I created the layout in Figma and defined sections like Hero, How It Works, and Topics. I implemented each section as a separate component and created reusable components like Button and TopicCard. I also separated data from UI into configuration files.

The biggest part of my work was implementing the learning flow. Initially, topics and lessons were mixed together, which made navigation complicated. I analyzed the problem and proposed separating dashboard logic from learning flow. This led to creating LessonsPage and LessonPage.

I implemented:

- lesson ordering
- navigation between lessons
- completion logic
- saving progress in Firebase
- restoring progress after reload

Later I implemented the quiz system. I designed a separate Firebase structure for quizzes and questions, created helper functions, and built QuizPage with navigation, answer selection, scoring, and result screen. I also integrated quizzes into the Main Page via a promo section.

Another important part was the theme system. I implemented dark/light mode with system preference detection and persistence, making sure it works correctly with Tailwind.

I also improved the Profile Page by grouping completed lessons by topic and moving logic into a separate component.

Overall, I focused on building a structured, scalable frontend while avoiding overengineering.

---

## My 2 Main Feature Components

### 1. Lessons Flow (LessonsPage + LessonPage)

**What it does:**

- Displays lessons inside a topic
- Controls navigation between lessons
- Tracks completion state
- Saves progress in Firebase
- Restores progress on reload

**Why it is complex:**

- Combines routing, UI, and backend
- Requires synchronization with Firebase
- Needs stable navigation logic
- Must not break dashboard functionality

---

### 2. Quiz System (QuizPage + Firebase integration)

**What it does:**

- Loads quiz data from Firebase
- Displays questions with navigation
- Handles answer selection
- Calculates score
- Shows result with explanations
- Supports restart

**Why it is complex:**

- Requires state management across multiple steps
- Works with dynamic data from Firebase
- Includes scoring logic and UI states
- Needs clean separation between data and UI

---

## Challenges and How I Solved Them

### Routing complexity

Routing became complicated after adding authentication.

→ Refactored to layout-based routing.

---

### Lessons structure

Topics and lessons were mixed.

→ Separated them and introduced new route structure.

---

### Progress persistence

Progress was not restored after reload.

→ Stored progress in Firebase and restored it on load.

---

### Firebase data structure (Quiz)

Needed scalable structure for quizzes.

→ Split quizzes and questions into separate collections.

---

### UI consistency

Initial UI looked inconsistent.

→ Refactored layout, grouping, and spacing.

---

## What I Learned

- How to design frontend architecture
- How to connect routing with application logic
- How to integrate Firebase into UI
- How to structure scalable components
- How to refactor when initial decisions don’t scale

Also gained experience working in a team with changing requirements and communication challenges.

---

## What I Would Improve

- Define data structure earlier
- Align architecture decisions earlier in the team
- Add more tests
- Introduce design system earlier

---

## Conclusion

My main contribution:

- frontend architecture and routing
- landing page and UI structure
- lessons flow and progress logic
- quiz system
- theme system
- overall user experience

I focused on making the application not only functional, but also structured, scalable, and easy to understand.
