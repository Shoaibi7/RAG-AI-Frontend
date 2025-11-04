import { FileText, FileCheck, FileX, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentCardProps {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  status: "processing" | "ready" | "failed";
  uploadedAt: string;
  chunkCount?: number;
  onDelete: (id: string) => void;
}

export function DocumentCard({
  id,
  filename,
  fileType,
  fileSize,
  status,
  uploadedAt,
  chunkCount,
  onDelete,
}: DocumentCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getStatusIcon = () => {
    switch (status) {
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "ready":
        return <FileCheck className="h-4 w-4 text-success" />;
      case "failed":
        return <FileX className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "processing":
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Processing</Badge>;
      case "ready":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Ready</Badge>;
      case "failed":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
    }
  };

  return (
    <Card className="p-4 gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <FileText className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{filename}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground uppercase">{fileType}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{formatFileSize(fileSize)}</span>
              </div>
            </div>
            {getStatusBadge()}
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {getStatusIcon()}
            <span>{new Date(uploadedAt).toLocaleDateString()}</span>
            {chunkCount && status === "ready" && (
              <>
                <span>•</span>
                <span>{chunkCount} chunks</span>
              </>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive transition-smooth"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
