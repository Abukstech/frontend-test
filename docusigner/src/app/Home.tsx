"use client"
import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { DocumentViewer } from "@/components/DocumentViewer";
import { ToolbarSection } from "@/components/ToolbarSection";
import { Navbar } from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string>("#FFEB3B");
  const { toast } = useToast();

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    toast({
      title: "Document uploaded",
      description: `${uploadedFile.name} has been successfully loaded.`,
      duration: 3000,
    });
  };

  const handleExport = () => {
    // We'll delegate the export functionality to the DocumentViewer component
    // which has access to all the annotations
    toast({
      title: "Preparing export",
      description: "Your document is being prepared for export. Use the export button in the document viewer.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar onExport={handleExport} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar with tools */}
        <ToolbarSection 
          activeTool={activeTool} 
          setActiveTool={setActiveTool}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        
        {/* Main content area */}
        <main className="flex-1 p-4 overflow-hidden">
          {file ? (
            <DocumentViewer 
              file={file} 
              activeTool={activeTool}
              activeColor={activeColor}
            />
          ) : (
            <FileUpload onFileUpload={handleFileUpload} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
