"use client";

import Link from "next/link";
import { useEffect, useState, useRef, TouchEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function Home() {
  const [recentSets, setRecentSets] = useState<QuestionSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchRecentSets() {
      try {
        const { data } = await supabase
          .from("question_sets")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5);

        setRecentSets(data || []);
      } catch (error) {
        console.error("Error fetching recent sets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentSets();
  }, []);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    if ("touches" in e) {
      setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    } else {
      setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    }
    setScrollLeft(currentIndex);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    e.preventDefault();

    const x =
      "touches" in e
        ? e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
        : e.pageX - (carouselRef.current?.offsetLeft || 0);

    const walk = (x - startX) * 2; // * 2 to make it more sensitive
    const newIndex = Math.round(scrollLeft - walk / 200); // 200 is the threshold for sliding

    if (newIndex !== currentIndex) {
      const boundedIndex = Math.max(
        0,
        Math.min(newIndex, recentSets.length - 1)
      );
      setCurrentIndex(boundedIndex);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Welcome to Q-Learn ⚡️</h1>
          <p className="text-muted-foreground text-lg">
            The easiest way to learn anything. Pretty much Quizlet learn but
            free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Import New Questions</h2>
            <p className="text-muted-foreground mb-4">
              Start by importing your question set and let us help you learn
              efficiently
            </p>
            <Link
              href="/formatter"
              className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          <div className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">Existing Sets</h2>
            <p className="text-muted-foreground mb-4">
              Check out the community sets and learn something new!
            </p>
            <Link
              href="/sets"
              className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              View Sets
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-4">🌐 Community Sets:</h2>
          {loading ? (
            <p className="text-muted-foreground">Loading recent sets...</p>
          ) : recentSets.length === 0 ? (
            <p className="text-muted-foreground">
              No recent activity. Start by importing a question set!
            </p>
          ) : (
            <div className="relative">
              <div
                ref={carouselRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleDragStart}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onMouseMove={handleDragMove}
                onTouchStart={handleDragStart}
                onTouchEnd={handleDragEnd}
                onTouchMove={handleDragMove}
              >
                <div
                  className="relative transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: `${recentSets.length * 100}%`,
                    display: "flex",
                  }}
                >
                  {recentSets.map((set, index) => (
                    <div
                      key={set.id}
                      className="w-full flex-shrink-0 px-4"
                      style={{ pointerEvents: isDragging ? "none" : "auto" }}
                    >
                      <Link href={`/sets/${set.id}`}>
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
                              Created{" "}
                              {new Date(set.created_at).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-4">
                {recentSets.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-primary" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
