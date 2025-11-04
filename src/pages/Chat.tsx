import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { MessageInput } from "@/components/MessageInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Array<{
    document_name: string;
    content: string;
    page_number?: number;
    relevance_score: number;
  }>;
  timestamp: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const simulateStreamingResponse = async (userMessage: string) => {
    setIsStreaming(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const responses = [
      {
        content:
          "Based on the documents you've uploaded, I can see that there are several key points about artificial intelligence and machine learning. The documents discuss neural networks, deep learning architectures, and their applications in various domains.",
        sources: [
          {
            document_name: "AI_Introduction.pdf",
            content: "Neural networks are computing systems inspired by biological neural networks...",
            page_number: 3,
            relevance_score: 0.95,
          },
          {
            document_name: "ML_Foundations.docx",
            content: "Deep learning is a subset of machine learning that uses multiple layers...",
            page_number: 12,
            relevance_score: 0.88,
          },
        ],
      },
      {
        content:
          "I found relevant information about your query. The key concepts include supervised learning, unsupervised learning, and reinforcement learning. Each approach has its own use cases and applications.",
        sources: [
          {
            document_name: "Learning_Methods.pdf",
            content: "Supervised learning uses labeled data to train models...",
            page_number: 7,
            relevance_score: 0.92,
          },
        ],
      },
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: response.content,
      sources: response.sources,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsStreaming(false);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    simulateStreamingResponse(content);
  };

  const handleNewChat = () => {
    setMessages([]);
    toast.success("Started new chat");
  };

  const handleClearChat = () => {
    if (messages.length > 0) {
      setMessages([]);
      toast.success("Chat cleared");
    }
  };

  const handleRegenerate = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages]
        .reverse()
        .find((m) => m.role === "user");
      if (lastUserMessage) {
        toast.success("Regenerating response...");
        simulateStreamingResponse(lastUserMessage.content);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-xl font-semibold">Chat with Your Documents</h1>
            <p className="text-sm text-muted-foreground">
              Ask questions and get answers from your knowledge base
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleNewChat} className="gap-2 rounded-xl">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              disabled={messages.length === 0}
              className="gap-2 rounded-xl"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto gradient-subtle"
      >
        <div className="container max-w-4xl mx-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow mb-6">
                <svg
                  className="h-10 w-10 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Start a Conversation</h2>
              <p className="text-muted-foreground max-w-md">
                Ask questions about your documents and get intelligent answers with source
                citations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-2xl">
                {[
                  "Summarize the key points",
                  "What are the main topics?",
                  "Explain this concept",
                  "Find specific information",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="p-4 text-left rounded-xl border border-border hover:border-primary bg-card hover:bg-card/80 transition-smooth"
                  >
                    <p className="font-medium text-sm">{prompt}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  sources={message.sources}
                  timestamp={message.timestamp}
                  onRegenerate={message.role === "assistant" ? handleRegenerate : undefined}
                  onFeedback={(type) => console.log("Feedback:", type)}
                />
              ))}
              {isStreaming && <TypingIndicator />}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <MessageInput
        onSendMessage={handleSendMessage}
        isStreaming={isStreaming}
        onStopStreaming={() => setIsStreaming(false)}
      />
    </div>
  );
};

export default Chat;
