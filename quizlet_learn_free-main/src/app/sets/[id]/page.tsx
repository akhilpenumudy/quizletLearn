"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface QuestionSet {
  id: string;
  name: string;
  subject: string | null;
  created_at: string;
  questions: {
    Question: string;
    "Choice A": string;
    "Choice B": string;
    "Choice C": string;
    "Choice D": string;
    Answer: string;
  }[];
}

export default function SetPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [set, setSet] = useState<QuestionSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchSet() {
      try {
        const { data, error: fetchError } = await supabase
          .from("question_sets")
          .select("*")
          .eq("id", resolvedParams.id)
          .single();

        if (!isMounted) return;

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setSet(data);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSet();

    return () => {
      isMounted = false;
    };
  }, [resolvedParams.id]);

  const handleStartLearning = () => {
    if (set?.questions) {
      localStorage.setItem("formattedQuestions", JSON.stringify(set.questions));
      router.push("/learn");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">Loading set...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!set) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">Set not found</div>
      </div>
    );
  }

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{set.name}</h1>
          {set.subject && (
            <p className="text-lg text-muted-foreground mb-4">{set.subject}</p>
          )}
          <div className="flex gap-4 items-center">
            <Button
              onClick={handleStartLearning}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Learning
            </Button>
            <p className="text-sm text-muted-foreground">
              Created {new Date(set.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg">
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
              {set.questions.map((q, i) => (
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
      </div>
    </main>
  );
}
