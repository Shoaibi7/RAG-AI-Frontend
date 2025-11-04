import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Trash2, Search, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ChatSession {
  id: string;
  title: string;
  messageCount: number;
  createdAt: string;
  lastMessage: string;
}

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Questions about AI fundamentals",
      messageCount: 12,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      lastMessage: "Can you explain neural networks in simple terms?",
    },
    {
      id: "2",
      title: "Machine learning algorithms discussion",
      messageCount: 8,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      lastMessage: "What's the difference between supervised and unsupervised learning?",
    },
    {
      id: "3",
      title: "Deep learning architectures",
      messageCount: 15,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      lastMessage: "Explain convolutional neural networks",
    },
    {
      id: "4",
      title: "Data preprocessing techniques",
      messageCount: 6,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      lastMessage: "How do I handle missing values in my dataset?",
    },
  ]);

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast.success("Chat session deleted");
  };

  const handleOpenSession = (id: string) => {
    toast.success("Loading chat session...");
    navigate("/");
  };

  const filteredSessions = sessions.filter(
    (session) =>
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Chat History</h1>
          <p className="text-muted-foreground">
            Review and manage your previous conversations
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chat history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl"
          />
        </div>

        {/* Sessions List */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {searchQuery
                ? "No chat sessions match your search"
                : "No chat history yet. Start a conversation to see it here!"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <Card
                key={session.id}
                className="p-4 gradient-card border-border/50 hover:border-primary/50 transition-smooth cursor-pointer hover:shadow-lg"
                onClick={() => handleOpenSession(session.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                      <MessageSquare className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{session.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(session.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                      {session.lastMessage}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{session.messageCount} messages</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(session.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
