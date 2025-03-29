
import { 
  Highlighter, 
  Underline, 
  MessageSquare, 
  Signature, 
  MousePointer 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ColorSelector } from "./ColorSelector";
import { cn } from "@/lib/utils";

interface ToolbarSectionProps {
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
}

export const ToolbarSection = ({ 
  activeTool, 
  setActiveTool, 
  activeColor, 
  setActiveColor 
}: ToolbarSectionProps) => {
  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "highlight", icon: Highlighter, label: "Highlight Text" },
    { id: "underline", icon: Underline, label: "Underline Text" },
    { id: "comment", icon: MessageSquare, label: "Add Comment" },
    { id: "signature", icon: Signature, label: "Add Signature" },
  ];

  return (
    <aside className="w-16 border-r flex flex-col items-center py-4 bg-background">
      <TooltipProvider>
        <div className="flex flex-col gap-2 items-center">
          {tools.map((tool) => (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  className={cn(
                    "p-2 rounded-md transition-colors hover:bg-accent",
                    "text-foreground",
                    activeTool === tool.id && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                >
                  <tool.icon size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {(activeTool === "highlight" || activeTool === "underline" || activeTool === "comment") && (
        <>
          <Separator className="my-4 w-8" />
          <ColorSelector 
            activeColor={activeColor} 
            setActiveColor={setActiveColor} 
            colors={[
              { label: "Yellow", value: "#FFEB3B" },
              { label: "Green", value: "#4CAF50" },
              { label: "Blue", value: "#2196F3" },
              { label: "Pink", value: "#E91E63" },
            ]}
          />
        </>
      )}
    </aside>
  );
};
