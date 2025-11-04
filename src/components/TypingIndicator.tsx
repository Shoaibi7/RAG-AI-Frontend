import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-4 animate-fade-in">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
          <Bot className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>

      <div className="px-4 py-3 rounded-2xl gradient-card shadow-md border border-border/50">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
}
