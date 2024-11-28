"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FormattedQuestion {
  Question: string;
  "Choice A": string;
  "Choice B": string;
  "Choice C": string;
  "Choice D": string;
  Answer: string;
}

export default function QuizletFormatter() {
  const router = useRouter();
  const [rawText, setRawText] = useState("");
  const [formattedQuestions, setFormattedQuestions] = useState<
    FormattedQuestion[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatQuestions = async () => {
    if (!rawText.trim()) {
      setError("Please enter some questions to format");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/format-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rawText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to format questions");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No questions were formatted successfully");
      }

      setFormattedQuestions(data);
      localStorage.setItem("formattedQuestions", JSON.stringify(data));
    } catch (err: any) {
      setError(
        err.message ||
          "An error occurred while formatting the questions. Please try again."
      );
      console.error("Formatting error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        placeholder="Paste your raw Quizlet questions here..."
        className="w-full h-64 mb-4"
      />
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={formatQuestions}
          disabled={isLoading}
          className="sm:w-auto"
        >
          {isLoading ? "Formatting..." : "Format Questions"}
        </Button>

        {formattedQuestions.length > 0 && (
          <Button
            onClick={() => router.push("/learn")}
            className="sm:w-auto bg-green-600 hover:bg-green-700"
          >
            Proceed to Learn
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
      )}

      {formattedQuestions.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Question</TableHead>
                <TableHead>Choice A</TableHead>
                <TableHead>Choice B</TableHead>
                <TableHead>Choice C</TableHead>
                <TableHead>Choice D</TableHead>
                <TableHead>Answer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedQuestions.map((q, i) => (
                <TableRow key={i}>
                  <TableCell className="whitespace-pre-wrap">
                    {q.Question}
                  </TableCell>
                  <TableCell>{q["Choice A"]}</TableCell>
                  <TableCell>{q["Choice B"]}</TableCell>
                  <TableCell>{q["Choice C"]}</TableCell>
                  <TableCell>{q["Choice D"]}</TableCell>
                  <TableCell>{q.Answer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
