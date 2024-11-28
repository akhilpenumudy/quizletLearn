import { Button } from "@/components/ui/button";

interface Question {
  Question: string;
  "Choice A": string;
  "Choice B": string;
  "Choice C": string;
  "Choice D": string;
  Answer: string;
}

interface RoundSummaryProps {
  allQuestions: Question[];
  masteredQuestions: number[];
  pendingQuestions: number[];
  currentRound: number;
  onStartNextRound: () => void;
}

export default function RoundSummary({
  allQuestions,
  masteredQuestions,
  pendingQuestions,
  currentRound,
  onStartNextRound,
}: RoundSummaryProps) {
  const isComplete = pendingQuestions.length === 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          Round {currentRound - 1} Complete
        </h2>
        <p className="text-muted-foreground mt-1">
          {!isComplete
            ? `Get ready for Round ${currentRound}!`
            : "All rounds complete!"}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            Mastered Questions ({masteredQuestions.length})
          </h3>
          <div className="space-y-2">
            {masteredQuestions.map((index) => (
              <div
                key={index}
                className="p-3 bg-green-50 border border-green-200 rounded-md"
              >
                {allQuestions[index].Question}
              </div>
            ))}
          </div>
        </div>

        {pendingQuestions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-orange-600 mb-2">
              Questions for Round {currentRound} ({pendingQuestions.length})
            </h3>
            <div className="space-y-2">
              {pendingQuestions.map((index) => (
                <div
                  key={index}
                  className="p-3 bg-orange-50 border border-orange-200 rounded-md"
                >
                  {allQuestions[index].Question}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!isComplete ? (
            <Button
              onClick={onStartNextRound}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Start Round {currentRound}
            </Button>
          ) : (
            <>
              <Button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Back to Home
              </Button>
              <Button
                onClick={onStartNextRound}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Practice Again 🔄
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
