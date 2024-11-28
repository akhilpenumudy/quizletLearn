import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InfoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">
        How to Export from Quizlet and Import to QuizletApp
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exporting from Quizlet</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>Log in to your Quizlet account.</li>
          <li>Navigate to the study set you want to export.</li>
          <li>Click on the three dots (...) next to the study set title.</li>
          <li>Select "Export" from the dropdown menu.</li>
          <li>Choose "Text" as the export format.</li>
          <li>Click "Export" to download the file.</li>
          <li>Copy the text (Ctrl+A, Ctrl+C).</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Importing to QuizletApp</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>Log in to your QuizletApp account.</li>
          <li>Click on the "Import" button in the sidebar.</li>
          <li>Paste the text (Ctrl+V).</li>
          <li>
            Review the imported questions to ensure everything is correct.
          </li>
          <li>
            Click "Create Set" to add the question set and start the learning
            process!.
          </li>
        </ol>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Make sure your Quizlet export is in the correct format (text).
          </li>
          <li>Large study sets may take a moment to process during import.</li>
          <li>
            If you encounter any issues, please contact our support team:
            <a href="" className="text-blue-500">
              {" "}
              iamNOThelpingyou@gmail.com
            </a>
          </li>
        </ul>
      </section>

      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/import">
            Start Importing Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
