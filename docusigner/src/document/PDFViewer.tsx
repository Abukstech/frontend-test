"use client"
import { useEffect, useState, useRef } from "react";

interface PDFViewerProps {
  file: File;
}

export const PDFViewer = ({ file }: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a URL for the PDF file
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    
    // Clean up the URL when the component unmounts
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!pdfUrl) {
    return <div className="flex-1 flex items-center justify-center">Loading document...</div>;
  }

  return (
    <div ref={containerRef} className="relative w-full h-full bg-white">
      <iframe 
        src={`${pdfUrl}#toolbar=0&navpanes=0`}
        className="w-full h-full absolute top-0 left-0 pointer-events-none"
        title="PDF Document"
      />
      {/* This transparent overlay allows us to capture clicks while still viewing the PDF */}
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-transparent" />
    </div>
  );
};