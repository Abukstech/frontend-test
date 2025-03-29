
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface NavbarProps {
  onExport: () => void;
}

export const Navbar = ({ onExport }: NavbarProps) => {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">DocuDoodle</h1>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Annotation Tool
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={onExport} 
            className="flex items-center gap-2"
            variant="default"
          >
            <Download size={16} />
            Export PDF
          </Button>
        </div>
      </div>
    </header>
  );
};
