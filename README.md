# Q-Learn ⚡️

Q-Learn is a free, open-source alternative to Quizlet's learning feature. It helps users learn and master question sets through an adaptive learning algorithm.
<img width="1338" alt="image" src="https://github.com/user-attachments/assets/920ff6fb-1914-4682-af23-12e3fb7a167c">

## Features

### 1. Question Set Management

- **Import Questions**: Easily format and import question sets
- **Community Sets**: Browse and use question sets created by other users
- **Drag-and-Drop Carousel**: Interactive carousel showcasing recent community sets
- **Set Preview**: Detailed view of question sets before starting to learn

### 2. Adaptive Learning System

- **Smart Question Selection**: Questions are presented in rounds, with focus on items that need more practice
- **Mastery Tracking**: Questions are categorized as "mastered" or "pending" based on performance
- **Round-Based Learning**: Questions are grouped into manageable rounds for effective learning
- **Progress Visualization**: Clear visual feedback on learning progress

### 3. User Experience

- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Drag Interactions**: Intuitive touch and mouse drag interactions
- **Real-time Feedback**: Immediate feedback on answer correctness
- **Round Summaries**: Detailed summaries after each learning round

## Data Science Concepts

### 1. Spaced Repetition

The app implements a simplified version of spaced repetition, a learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.

### 2. Adaptive Learning Algorithm

- Questions are selected based on user performance
- Correctly answered questions are moved to "mastered" status
- Incorrect answers keep questions in the learning pool
- Random selection within constraints ensures varied practice

### 3. Learning Analytics

- Tracks question mastery rates
- Monitors user progress across rounds
- Implements performance-based question selection

## Tech Stack

### Frontend
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](#) [![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](#)

### Backend & Database

[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](#)

### State Management

- React Hooks
- Local Storage for session persistence

### Deployment

[![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
