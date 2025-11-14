"use client";
import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LANGUAGE_OPTIONS } from "@/lib/languages";
import {
  IconAlertCircle,
  IconArrowRight,
  IconLoader,
} from "@tabler/icons-react";
import CodeEditor from "@/components/code-editor";
import ExecutionFlowVisualization from "@/components/execution-flow-visualization";

export default function Home() {
  const [code, setCode] = useState(`const x = 2;
const y = x + 3;
console.log(y);`);
  const [language, setLanguage] = useState("javascript");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const explanationRef = useRef(null);

  useEffect(() => {
    if (result && explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const handleAnalyze = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze code");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setError("Unable to analyze code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
            <IconAlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-destructive-foreground text-sm">
                Error
              </p>
              <p className="text-sm text-destructive-foreground/80">{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Code Editor Section */}
          <div className="w-full">
            <Card className="lg:col-span-2 shadow-sm border-border/50">
              <CardHeader>
                <CardTitle>Code Input</CardTitle>
                <CardDescription>
                  Enter your code below for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    Select Programming Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map((lang) => (
                        <SelectItem
                          key={lang.value}
                          value={lang.value}
                          className="cursor-pointer"
                        >
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <CodeEditor
                  value={code}
                  onChange={setCode}
                  language={language}
                />

                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !code.trim()}
                  className="w-full h-11 font-medium cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <IconLoader className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Code
                      <IconArrowRight className="h-4 w-4 animate-caret-blink" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Explanation Section */}
          {result && (
            <Card ref={explanationRef} className="shadow-sm border-border/50">
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>
                  Detailed explanation of your code&apos;s logic and execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={result.explanation}
                  readOnly
                  className="min-h-32 resize-none bg-muted/50"
                />
              </CardContent>
            </Card>
          )}

          {/* Execution Flow Section */}
          {result && result.steps && result.steps.length > 0 && (
            <Card className="shadow-sm border-border/50">
              <CardHeader>
                <CardTitle>Execution Flow Visualization</CardTitle>
                <CardDescription>
                  Step-by-step visual breakdown of code execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-border/50 rounded-lg overflow-hidden">
                  <ExecutionFlowVisualization steps={result.steps} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
