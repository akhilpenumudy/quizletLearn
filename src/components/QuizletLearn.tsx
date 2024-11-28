"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import RoundSummary from "./RoundSummary";

interface Question {
  Question: string;
  "Choice A": string;
  "Choice B": string;
  "Choice C": string;
  "Choice D": string;
  Answer: string;
}

interface QuizletLearnProps {
  questions: Question[];
}

const QUESTIONS_PER_ROUND = 5;

export default function QuizletLearn({ questions }: QuizletLearnProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [roundQuestions, setRoundQuestions] = useState<number[]>([]);
  const [masteredQuestions, setMasteredQuestions] = useState<number[]>([]);
  const [pendingQuestions, setPendingQuestions] = useState<number[]>([]);
  const [answeredInRound, setAnsweredInRound] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showingSummary, setShowingSummary] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);

  // Initialize questions on first load
  useEffect(() => {
    const initialPending = Array.from(
      { length: questions.length },
      (_, i) => i
    );
    setPendingQuestions(initialPending);
    startNewRound(initialPending);
  }, [questions]);

  const startNewRound = (availableQuestions: number[]) => {
    // Randomly select questions for this round
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, QUESTIONS_PER_ROUND);

    setRoundQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setAnsweredInRound({});
    setShowingSummary(false);
  };

  const currentQuestion = questions[roundQuestions[currentQuestionIndex]];
  const progress =
    (Object.keys(answeredInRound).length / roundQuestions.length) * 100;

  const handleAnswerClick = (choice: string) => {
    if (isAnswered) return;

    setSelectedAnswer(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQuestion.Answer;
    const questionIndex = roundQuestions[currentQuestionIndex];

    setAnsweredInRound((prev) => ({
      ...prev,
      [questionIndex]: isCorrect,
    }));
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex === roundQuestions.length - 1) {
      // Round is complete, update mastered and pending questions
      const newMastered: number[] = [];
      const newPending: number[] = [];

      roundQuestions.forEach((qIndex) => {
        if (answeredInRound[qIndex]) {
          newMastered.push(qIndex);
        } else {
          newPending.push(qIndex);
        }
      });

      setMasteredQuestions((prev) => [...prev, ...newMastered]);
      setPendingQuestions((prev) => [
        ...prev.filter((q) => !roundQuestions.includes(q)),
        ...newPending,
      ]);
      setShowingSummary(true);
      setCurrentRound((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const getButtonStyle = (choice: string) => {
    if (!isAnswered) return "bg-secondary text-black hover:bg-secondary/80";
    if (choice === currentQuestion.Answer)
      return "bg-green-600 hover:bg-green-500";
    if (choice === selectedAnswer) return "bg-red-600 hover:bg-red-500";
    return "bg-secondary text-black hover:bg-secondary/80";
  };

  if (showingSummary) {
    return (
      <RoundSummary
        allQuestions={questions}
        masteredQuestions={masteredQuestions}
        pendingQuestions={pendingQuestions}
        currentRound={currentRound}
        onStartNextRound={() => {
          if (pendingQuestions.length > 0) {
            startNewRound(pendingQuestions);
          }
        }}
      />
    );
  }

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        Round {currentRound}
      </h2>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {roundQuestions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            Mastered: {masteredQuestions.length} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">{currentQuestion.Question}</h2>

        <div className="grid grid-cols-2 gap-4">
          {(["A", "B", "C", "D"] as const).map((choice) => (
            <Button
              key={choice}
              className={`h-24 whitespace-normal text-left p-4 ${getButtonStyle(
                choice
              )}`}
              onClick={() => handleAnswerClick(choice)}
              disabled={isAnswered}
            >
              {currentQuestion[`Choice ${choice}`]}
            </Button>
          ))}
        </div>

        {isAnswered && (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestionIndex === roundQuestions.length - 1
              ? "Finish Round"
              : "Next Question"}
          </Button>
        )}
      </div>
    </div>
  );
}
