"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface QuestionSet {
  id: string;
  name: string;
  subject: string | null;
  created_at: string;
  questions: any[];
}

export default function SetsPage() {
  const [sets, setSets] = useState<QuestionSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSets() {
      try {
        const { data, error } = await supabase
          .from("question_sets")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSets(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSets();
  }, []);

  if (loading) return <div className="p-8">Loading sets...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <main className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Browse Question Sets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets.map((set) => (
            <Link key={set.id} href={`/sets/${set.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle>{set.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {set.subject || "No subject"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {set.questions.length} questions
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Created {new Date(set.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {sets.length === 0 && (
          <div className="text-center text-muted-foreground">
            No question sets found. Be the first to create one!
          </div>
        )}
      </div>
    </main>
  );
}
