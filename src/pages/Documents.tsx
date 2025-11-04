import { useState } from "react";
import { DocumentCard } from "@/components/DocumentCard";
import { DocumentUploader } from "@/components/DocumentUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  status: "processing" | "ready" | "failed";
  uploadedAt: string;
  chunkCount?: number;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      filename: "AI_Introduction.pdf",
      fileType: "pdf",
      fileSize: 2048000,
      status: "ready",
      uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      chunkCount: 45,
    },
    {
      id: "2",
      filename: "ML_Foundations.docx",
      fileType: "docx",
      fileSize: 1536000,
      status: "ready",
      uploadedAt: new Date(Date.now() - 172800000).toISOString(),
      chunkCount: 32,
    },
    {
      id: "3",
      filename: "Learning_Methods.pdf",
      fileType: "pdf",
      fileSize: 3072000,
      status: "processing",
      uploadedAt: new Date().toISOString(),
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleUploadComplete = (files: File[]) => {
    const newDocuments: Document[] = files.map((file) => ({
      id: Math.random().toString(36),
      filename: file.name,
      fileType: file.name.split(".").pop() || "unknown",
      fileSize: file.size,
      status: "processing",
      uploadedAt: new Date().toISOString(),
    }));

    setDocuments((prev) => [...newDocuments, ...prev]);

    // Simulate processing completion
    setTimeout(() => {
      setDocuments((prev) =>
        prev.map((doc) => {
          if (newDocuments.find((nd) => nd.id === doc.id)) {
            return {
              ...doc,
              status: "ready",
              chunkCount: Math.floor(Math.random() * 50) + 10,
            };
          }
          return doc;
        })
      );
    }, 3000);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    toast.success("Document deleted");
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen gradient-subtle">
      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Document Management</h1>
          <p className="text-muted-foreground">
            Upload and manage your knowledge base documents
          </p>
        </div>

        {/* Upload Section */}
        <div className="gradient-card p-6 rounded-xl border border-border/50 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Upload New Documents</h2>
          <DocumentUploader onUploadComplete={handleUploadComplete} />
        </div>

        {/* Documents List */}
        <div className="gradient-card p-6 rounded-xl border border-border/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Documents</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 rounded-xl"
                />
              </div>
              <div className="flex rounded-xl border border-border overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No documents match your search"
                  : "No documents uploaded yet. Upload your first document above!"}
              </p>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-3"
              }
            >
              {filteredDocuments.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  id={doc.id}
                  filename={doc.filename}
                  fileType={doc.fileType}
                  fileSize={doc.fileSize}
                  status={doc.status}
                  uploadedAt={doc.uploadedAt}
                  chunkCount={doc.chunkCount}
                  onDelete={handleDeleteDocument}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Total Documents",
              value: documents.length,
              color: "from-primary to-primary-glow",
            },
            {
              label: "Ready",
              value: documents.filter((d) => d.status === "ready").length,
              color: "from-success to-accent",
            },
            {
              label: "Processing",
              value: documents.filter((d) => d.status === "processing").length,
              color: "from-secondary to-accent",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="gradient-card p-6 rounded-xl border border-border/50 shadow-md"
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
