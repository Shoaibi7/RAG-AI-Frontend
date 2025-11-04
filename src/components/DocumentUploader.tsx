import { useCallback, useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
}

interface DocumentUploaderProps {
  onUploadComplete: (files: File[]) => void;
}

export function DocumentUploader({ onUploadComplete }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);

  const acceptedFormats = ".pdf,.docx,.txt,.md,.csv";
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const validateFile = (file: File): boolean => {
    if (file.size > maxFileSize) {
      toast.error(`${file.name} is too large. Max size is 10MB.`);
      return false;
    }
    return true;
  };

  const simulateUpload = (uploadFile: UploadFile) => {
    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((f) => {
          if (f.id === uploadFile.id && f.progress < 100) {
            const newProgress = Math.min(f.progress + 10, 100);
            const newStatus = newProgress === 100 ? "complete" : "uploading";
            return { ...f, progress: newProgress, status: newStatus };
          }
          return f;
        })
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      toast.success(`${uploadFile.file.name} uploaded successfully`);
    }, 2000);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const newUploadFiles: UploadFile[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
        const uploadFile: UploadFile = {
          id: Math.random().toString(36),
          file,
          progress: 0,
          status: "pending",
        };
        newUploadFiles.push(uploadFile);
      }
    });

    if (validFiles.length > 0) {
      setUploadFiles((prev) => [...prev, ...newUploadFiles]);
      newUploadFiles.forEach(simulateUpload);
      setTimeout(() => {
        onUploadComplete(validFiles);
      }, 2500);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-smooth ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center transition-smooth ${
            isDragging ? "gradient-primary" : "bg-muted"
          }`}>
            <Upload className={`h-8 w-8 ${isDragging ? "text-primary-foreground" : "text-muted-foreground"}`} />
          </div>

          <div>
            <p className="text-lg font-medium">Drop your documents here</p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse files
            </p>
          </div>

          <input
            type="file"
            id="file-upload"
            multiple
            accept={acceptedFormats}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
          <Button asChild variant="outline" className="rounded-xl">
            <label htmlFor="file-upload" className="cursor-pointer">
              Browse Files
            </label>
          </Button>

          <p className="text-xs text-muted-foreground">
            Supported formats: PDF, DOCX, TXT, MD, CSV (Max 10MB per file)
          </p>
        </div>
      </div>

      {uploadFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Uploading Files</h3>
          {uploadFiles.map((uploadFile) => (
            <div
              key={uploadFile.id}
              className="p-3 rounded-lg border border-border bg-card"
            >
              <div className="flex items-center gap-3 mb-2">
                <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm flex-1 truncate">{uploadFile.file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFile(uploadFile.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Progress value={uploadFile.progress} className="h-1" />
              <p className="text-xs text-muted-foreground mt-1">
                {uploadFile.status === "complete"
                  ? "Complete"
                  : uploadFile.status === "uploading"
                  ? `${uploadFile.progress}%`
                  : "Pending..."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
