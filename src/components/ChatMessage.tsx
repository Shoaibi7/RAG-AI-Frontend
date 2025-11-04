import { Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface Source {
  document_name: string;
  content: string;
  page_number?: number;
  relevance_score: number;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  timestamp?: string;
  onRegenerate?: () => void;
  onFeedback?: (type: "positive" | "negative") => void;
}

export function ChatMessage({
  role,
  content,
  sources,
  timestamp,
  onRegenerate,
  onFeedback,
}: ChatMessageProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type);
    onFeedback?.(type);
    toast.success(`Feedback recorded: ${type}`);
  };

  return (
    <div className={`flex gap-4 ${role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
      {role === "assistant" && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      )}

      <div className={`flex flex-col gap-2 max-w-[80%] ${role === "user" ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl transition-smooth ${
            role === "user"
              ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-md"
              : "gradient-card text-card-foreground shadow-md border border-border/50"
          }`}
        >
          <p className="whitespace-pre-wrap break-words leading-relaxed">{content}</p>
        </div>

        {role === "assistant" && (
          <>
            {sources && sources.length > 0 && (
              <div className="flex flex-col gap-2 w-full">
                <p className="text-xs text-muted-foreground font-medium">Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {sources.map((source, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-xs transition-smooth hover:bg-muted cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{source.document_name}</span>
                        {source.page_number && (
                          <span className="text-muted-foreground">p. {source.page_number}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={handleCopy}
              >
                <Copy className="h-3 w-3" />
              </Button>

              {onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={onRegenerate}
                >
                  <RotateCcw className="h-3 w-3" />
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                className={`h-7 px-2 ${feedback === "positive" ? "text-success" : ""}`}
                onClick={() => handleFeedback("positive")}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`h-7 px-2 ${feedback === "negative" ? "text-destructive" : ""}`}
                onClick={() => handleFeedback("negative")}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>

              {timestamp && (
                <span className="text-xs text-muted-foreground ml-2">{timestamp}</span>
              )}
            </div>
          </>
        )}
      </div>

      {role === "user" && (
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}
