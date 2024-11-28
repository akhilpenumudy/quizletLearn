"use client";

import { useState } from "react";
import QuizletLearn from "@/components/QuizletLearn";

export default function LearnPage() {
  const [questions] = useState(() => {
    if (typeof window !== "undefined") {
      const savedQuestions = localStorage.getItem("formattedQuestions");
      return savedQuestions ? JSON.parse(savedQuestions) : [];
    }
    return [];
  });

  if (questions.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">No questions available</h1>
        <p>Please format some questions first on the home page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Learn Mode</h1>
      <QuizletLearn questions={questions} />
    </div>
  );
}
