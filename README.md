# FitLog — Workout Library

## Project Name

**FitLog — Workout Library**

## Short Description

FitLog is a modern workout library and planning application built with **Next.js**. It helps users discover exercises, explore detailed workout information, build a personalized daily workout plan, save exercises for later, and keep track of completed workouts.

The application features a clean, dark-themed fitness interface with a fully responsive design that works smoothly across desktop, tablet, and mobile devices.

## Technologies Used

* **Next.js** — Application framework and routing
* **React** — Component-based UI development
* **TypeScript** — Type-safe development
* **Tailwind CSS** — Responsive and utility-first styling
* **DaisyUI** — Reusable UI components
* **Lucide React** — Modern icon library
* **React Context API** — Workout state management
* **REST API** — Fetching workout and exercise data

## Key Features

1. **Workout Library**
   Browse a collection of workouts with useful information such as muscle groups, equipment, duration, calories burned, difficulty, and ratings.

2. **Detailed Workout Information**
   View individual workout pages with exercise instructions, sets, repetitions, difficulty levels, and other key workout statistics.

3. **Personalized Today's Plan**
   Add exercises to a daily workout plan and manage your routine with a maximum of five exercises at a time.

4. **Save & Track Workouts**
   Save workouts for later and mark completed exercises as done, making it easier to keep track of your workout progress.

5. **Responsive & Interactive Experience**
   Enjoy a responsive interface across desktop, tablet, and mobile, with sorting options, real-time workout statistics, loading states, and toast notifications for important actions.



## Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   └── workout/
│       └── [id]/
│           └── page.tsx
│
├── assets/
│   ├── logo.png
│   └── banner.png
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── WorkoutLibrary.tsx
│   ├── WorkoutLibraryContent.tsx
│   ├── WorkoutCard.tsx
│   └── WorkoutActions.tsx
│
├── context/
│   └── WorkoutContext.tsx
│
└── types/
    └── workout.ts
```

## API

### Workout Library

```text
https://api.abcz.workers.dev/api/fitlog
```

### Workout Details

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

## State Management

FitLog uses React Context API to manage:

* Today's Plan
* Saved workouts
* Completed workouts
* Add/remove actions
* Save/remove actions
* Workout completion state

The application intentionally keeps the workout state in memory, so the state resets when the page is refreshed.

## Run Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Author

Abdur Rashid
