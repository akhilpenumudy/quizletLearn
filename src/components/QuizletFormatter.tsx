"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
  const [setName, setSetName] = useState("");
  const [subject, setSubject] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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

  const saveQuestionSet = async () => {
    if (!setName.trim()) {
      setError("Please provide a name for your question set");
      return;
    }

    setIsSaving(true);
    try {
      const { data, error: saveError } = await supabase
        .from("question_sets")
        .insert([
          {
            name: setName.trim(),
            subject: subject.trim() || null,
            questions: formattedQuestions,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (saveError) throw saveError;

      // Store in localStorage for the learn page
      localStorage.setItem(
        "formattedQuestions",
        JSON.stringify(formattedQuestions)
      );

      // Navigate to learn page
      router.push("/learn");
    } catch (err: any) {
      setError(err.message || "Failed to save question set");
    } finally {
      setIsSaving(false);
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
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-md">{error}</div>
      )}

      {formattedQuestions.length > 0 && (
        <>
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold">Save Your Question Set</h3>
            <div className="space-y-2">
              <Input
                placeholder="Question Set Name (required)"
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
                required
              />
              <Input
                placeholder="Subject (optional)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <Button
                onClick={saveQuestionSet}
                disabled={isSaving || !setName.trim()}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSaving ? "Saving..." : "Save & Start Learning"}
              </Button>
            </div>
          </div>

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
        </>
      )}
    </div>
  );
}
