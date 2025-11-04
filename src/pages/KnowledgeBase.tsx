import { Card } from "@/components/ui/card";
import { FileText, Database, MessageSquare, TrendingUp } from "lucide-react";

const KnowledgeBase = () => {
  const stats = [
    {
      label: "Total Documents",
      value: "25",
      change: "+3 this week",
      icon: FileText,
      color: "from-primary to-primary-glow",
    },
    {
      label: "Total Chunks",
      value: "1,234",
      change: "+156 this week",
      icon: Database,
      color: "from-secondary to-accent",
    },
    {
      label: "Total Chats",
      value: "89",
      change: "+12 this week",
      icon: MessageSquare,
      color: "from-accent to-primary-glow",
    },
    {
      label: "Storage Used",
      value: "142 MB",
      change: "23% of limit",
      icon: TrendingUp,
      color: "from-success to-secondary",
    },
  ];

  const topTopics = [
    { topic: "Machine Learning", queries: 45 },
    { topic: "Neural Networks", queries: 38 },
    { topic: "Data Processing", queries: 32 },
    { topic: "Deep Learning", queries: 28 },
    { topic: "AI Ethics", queries: 21 },
  ];

  const recentActivity = [
    {
      action: "Document uploaded",
      item: "AI_Introduction.pdf",
      time: "2 hours ago",
    },
    {
      action: "Chat session",
      item: "Questions about neural networks",
      time: "3 hours ago",
    },
    {
      action: "Document uploaded",
      item: "ML_Foundations.docx",
      time: "1 day ago",
    },
    {
      action: "Chat session",
      item: "Deep learning discussion",
      time: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Knowledge Base Overview</h1>
          <p className="text-muted-foreground">
            Monitor your AI knowledge base statistics and activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.label}
                className="p-6 gradient-card border-border/50 shadow-md hover:shadow-lg transition-smooth"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Topics */}
          <Card className="p-6 gradient-card border-border/50 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Most Queried Topics</h2>
            <div className="space-y-3">
              {topTopics.map((item, idx) => (
                <div key={item.topic} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.topic}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-primary"
                          style={{ width: `${(item.queries / 45) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.queries}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 gradient-card border-border/50 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.item}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
