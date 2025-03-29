
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === "application/pdf") {
        onFileUpload(file);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div 
        {...getRootProps()} 
        className={`dropzone w-full max-w-2xl p-8 border-2 border-dashed rounded-lg transition-colors duration-200 ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/30 hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-secondary rounded-full">
            <FileText size={40} className="text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Upload your document</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop your PDF file here, or click to browse
            </p>
            <Button className="flex items-center gap-2">
              <Upload size={16} />
              Browse Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
