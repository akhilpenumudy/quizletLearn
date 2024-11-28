import QuizletFormatter from "@/components/QuizletFormatter";

export default function FormatterPage() {
  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Question Formatter</h1>
        <QuizletFormatter />
      </div>
    </main>
  );
}
