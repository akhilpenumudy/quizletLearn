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
