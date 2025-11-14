import { IconCode } from "@tabler/icons-react";

export default function Header() {
  return (
    <div className="border-b border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <IconCode className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ZeroGuru</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-powered code analysis and execution flow visualization
        </p>
      </div>
    </div>
  );
}
