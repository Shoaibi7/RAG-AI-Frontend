import { useState, useRef, useEffect } from "react";
import { Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isStreaming?: boolean;
  onStopStreaming?: () => void;
  disabled?: boolean;
}

export function MessageInput({
  onSendMessage,
  isStreaming = false,
  onStopStreaming,
  disabled = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled && !isStreaming) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container max-w-4xl mx-auto p-4">
        <div className="relative flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your documents..."
            disabled={disabled || isStreaming}
            className="min-h-[52px] max-h-[200px] resize-none pr-12 rounded-2xl border-2 focus:border-primary transition-smooth"
            rows={1}
          />
          {isStreaming ? (
            <Button
              size="icon"
              onClick={onStopStreaming}
              className="absolute right-2 bottom-2 h-9 w-9 rounded-xl bg-destructive hover:bg-destructive/90 shadow-md"
            >
              <StopCircle className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!message.trim() || disabled}
              className="absolute right-2 bottom-2 h-9 w-9 rounded-xl gradient-primary hover:opacity-90 shadow-glow disabled:opacity-50 disabled:shadow-none transition-smooth"
            >
              <Send className="h-5 w-5" />
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
