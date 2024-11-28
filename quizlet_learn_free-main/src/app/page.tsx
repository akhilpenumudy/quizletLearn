import Link from "next/link";

export default function Home() {
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
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <p className="text-muted-foreground mb-4">
              Track your learning journey and review past question sets
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
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">
            No recent activity. Start by importing a question set!
          </p>
        </div>
      </div>
    </main>
  );
}
