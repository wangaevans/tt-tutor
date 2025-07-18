import React from "react";
import { Trophy, Target, TrendingUp, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Stats } from "@/lib/types";

interface TestSummaryProps {
  isVisible: boolean;
  isTimedTest: boolean;
  stats: Stats;
  testDuration?: number;
  onRetry: () => void;
  onClose: () => void;
}

export const TestSummary = ({
  isVisible,
  isTimedTest,
  stats,
  testDuration,
  onRetry,
  onClose,
}: TestSummaryProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return "text-green-600";
    if (accuracy >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getWPMColor = (wpm: number) => {
    if (wpm >= 60) return "text-green-600";
    if (wpm >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog
      open={isVisible}
      onOpenChange={() => {
        // Do nothing - prevent closing on outside click
      }}
    >
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        <DialogClose
          onClick={onClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-primary" />
            <span>Test Summary</span>
            <Badge variant="outline" className="ml-auto">
              {isTimedTest ? "Timed Test" : "Text-based Test"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-1">
                <span className={getWPMColor(stats.wpm)}>{stats.wpm}</span>
              </div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-1">
                <span className={getAccuracyColor(stats.accuracy)}>
                  {Math.max(0, stats.accuracy)}%
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-1 text-red-600">
                {stats.errors}
              </div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold mb-1 text-blue-600">
                {formatTime(stats.timeElapsed)}
              </div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4" />
                Performance Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Characters Typed:</span>
                  <span className="font-mono">{stats.charactersTyped}</span>
                </div>
                <div className="flex justify-between">
                  <span>Correct Characters:</span>
                  <span className="font-mono text-green-600">
                    {stats.correctChars}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Incorrect Characters:</span>
                  <span className="font-mono text-red-600">
                    {stats.incorrectChars}
                  </span>
                </div>
                {isTimedTest && testDuration && (
                  <div className="flex justify-between">
                    <span>Test Duration:</span>
                    <span className="font-mono">
                      {formatTime(testDuration)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analysis
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Average Speed:</span>
                  <span className="font-mono">
                    {stats.timeElapsed > 0
                      ? Math.round(
                          stats.charactersTyped / 5 / (stats.timeElapsed / 60)
                        )
                      : 0}{" "}
                    WPM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Error Rate:</span>
                  <span className="font-mono text-red-600">
                    {stats.charactersTyped > 0
                      ? Math.round(
                          (stats.incorrectChars / stats.charactersTyped) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Characters per Second:</span>
                  <span className="font-mono">
                    {stats.timeElapsed > 0
                      ? (stats.charactersTyped / stats.timeElapsed).toFixed(1)
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button onClick={onRetry} className="px-6 py-2" size="lg">
              Retry Test
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
