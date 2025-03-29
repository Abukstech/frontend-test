// "use client"
// import { useEffect, useState, useRef } from "react"

// interface PDFViewerProps {
//   file: File
// }

// export const PDFViewer = ({ file }: PDFViewerProps) => {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null)
//   const containerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const url = URL.createObjectURL(file)
//     setPdfUrl(url)
    
//     return () => {
//       URL.revokeObjectURL(url)
//     }
//   }, [file])

//   if (!pdfUrl) {
//     return <div className="flex-1 flex items-center justify-center">Loading document...</div>
//   }

//   return (
//     <div ref={containerRef} className="w-full h-full min-h-screen bg-white">
//       <object
//         data={pdfUrl}
//         type="application/pdf"
//         className="w-full h-full min-h-screen"
//       >
//         <p>Unable to display PDF file.</p>
//       </object>
//       <div 
//         className="absolute top-0 left-0 w-full h-full min-h-screen z-10 bg-transparent pointer-events-none" 
//       />
//     </div>
//   )
// }

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
    <div ref={containerRef} className="relative w-full h-full bg-white overflow-auto">
      <iframe 
        src={`${pdfUrl}#toolbar=0&navpanes=0`}
        className="w-full h-full absolute min-h-screen"
        title="PDF Document"
        style={{ minHeight: '100vh' }}
      />
      {/* This transparent overlay allows us to capture clicks while still viewing the PDF */}
      <div 
        className="absolute top-0 left-0 w-full z-10 bg-transparent" 
        style={{ minHeight: '100vh' }}
      />
    </div>
  );
};