"use client"
import { useEffect, useRef, useState } from "react";



import { useToast } from "./ui/use-toast";
import { ExportButton } from "@/document/ExportPdf";
import { AnnotationHandler } from "@/document/AnnotationHandler";
import { AnnotationsLayer } from "@/document/AnnotationsLayer";
import { PDFViewer } from "@/document/PDFViewer";
import { AnnotationComment, SignatureAnnotation, TextAnnotation } from "@/types/annotation";

interface DocumentViewerProps {
  file: File;
  activeTool: string | null;
  activeColor: string;
}

export const DocumentViewer = ({ file, activeTool, activeColor }: DocumentViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [comments, setComments] = useState<AnnotationComment[]>([]);
  const [textAnnotations, setTextAnnotations] = useState<TextAnnotation[]>([]);
  const [showSignatureCanvas, setShowSignatureCanvas] = useState(false);
  const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
  const [signatures, setSignatures] = useState<SignatureAnnotation[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Create a URL for the PDF file
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    
    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleDocumentClick = (e: React.MouseEvent) => {
    if (!containerRef.current || !activeTool) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (activeTool === "comment") {
      const newComment = {
        id: `comment-${Date.now()}`,
        position: { x, y },
        content: ""
      };
      setComments([...comments, newComment]);
      toast({
        title: "Comment added",
        description: "Click on the comment icon to add your note.",
        duration: 2000,
      });
    } else if (activeTool === "signature") {
      setSignaturePosition({ x, y });
      setShowSignatureCanvas(true);
    } else if (activeTool === "highlight" || activeTool === "underline") {
      // For highlighting and underlining, we'll simulate selecting text by creating a small rectangle
      // In a real implementation, you would get the actual text selection from the PDF
      const newAnnotation: TextAnnotation = {
        id: `text-annotation-${Date.now()}`,
        type: activeTool as "highlight" | "underline", // Explicitly cast as the union type
        position: { x, y },
        width: 150, // Simulated width for demo purposes
        height: 20, // Simulated height for demo purposes
        color: activeColor
      };
      setTextAnnotations([...textAnnotations, newAnnotation]);
      toast({
        title: `Text ${activeTool === "highlight" ? "highlighted" : "underlined"}`,
        description: `Text has been ${activeTool === "highlight" ? "highlighted" : "underlined"} successfully.`,
        duration: 2000,
      });
    }
  };

  const handleCommentSave = (id: string, content: string) => {
    setComments(
      comments.map(comment => 
        comment.id === id ? { ...comment, content } : comment
      )
    );
  };

  const handleCommentDelete = (id: string) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleTextAnnotationDelete = (id: string) => {
    setTextAnnotations(textAnnotations.filter(annotation => annotation.id !== id));
  };

  const handleSignatureSave = (signatureDataUrl: string) => {
    const newSignature = {
      id: `signature-${Date.now()}`,
      dataUrl: signatureDataUrl,
      position: signaturePosition
    };
    setSignatures([...signatures, newSignature]);
    setShowSignatureCanvas(false);
    toast({
      title: "Signature added",
      description: "Your signature has been placed on the document.",
      duration: 2000,
    });
  };

  if (!pdfUrl) {
    return <div className="flex-1 flex items-center justify-center">Loading document...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex justify-end">
        <ExportButton pdfUrl={pdfUrl} fileName={file.name} />
      </div>
      <div 
        ref={containerRef}
        className="pdf-container relative flex-1 border border-gray-200 rounded-md overflow-auto"
        onClick={handleDocumentClick}
        style={{ minHeight: '600px' }}
      >
        <PDFViewer file={file} />
        
        <AnnotationsLayer 
          comments={comments}
          textAnnotations={textAnnotations}
          signatures={signatures}
          onCommentSave={handleCommentSave}
          onCommentDelete={handleCommentDelete}
          onTextAnnotationDelete={handleTextAnnotationDelete}
        />
        
        <AnnotationHandler 
          showSignatureCanvas={showSignatureCanvas}
          signaturePosition={signaturePosition}
          onSignatureSave={handleSignatureSave}
          onSignatureCancel={() => setShowSignatureCanvas(false)}
        />
      </div>
    </div>
  );
};

