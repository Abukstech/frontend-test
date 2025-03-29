"use client"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ExportButtonProps {
  pdfUrl: string | null;
  fileName: string;
}

export const ExportButton = ({ pdfUrl, fileName }: ExportButtonProps) => {
  const { toast } = useToast();

  const handleExportPdf = () => {
    if (!pdfUrl) return;
    
    // In a real implementation, this would merge the annotations with the PDF
    toast({
      title: "PDF Export",
      description: "The annotated PDF has been prepared for download.",
      duration: 2000,
    });
    
    // Simulate download delay
    setTimeout(() => {
      // Create a download link
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `annotated-${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <Button 
      onClick={handleExportPdf}
      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
    >
      Export PDF
    </Button>
  );
};