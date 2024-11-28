import QuizletFormatter from "@/components/QuizletFormatter";

export default function FormatterPage() {
  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Import your questions</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Check out the info button for more details now how to add your quizlet
          deck.
        </p>
        <QuizletFormatter />
      </div>
    </main>
  );
}
