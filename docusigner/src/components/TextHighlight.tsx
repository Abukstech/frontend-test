import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TextAnnotation {
  id: string;
  type: "highlight" | "underline";
  position: { x: number; y: number };
  width: number;
  height: number;
  color: string;
}

interface TextHighlightProps {
  annotation: TextAnnotation;
  onDelete: (id: string) => void;
}

export const TextHighlight = ({ annotation, onDelete }: TextHighlightProps) => {
  const { id, type, position, width, height, color } = annotation;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      className="absolute group pointer-events-auto"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 25,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        style={{
          backgroundColor: type === "highlight" ? `${color}80` : "transparent",
          borderBottom: type === "underline" ? `2px solid ${color}` : "none",
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <Button
        variant="outline"
        size="icon"
        className="absolute -top-8 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white"
        onClick={handleDelete}
      >
        <Trash2 size={12} className="text-destructive" />
      </Button>
    </div>
  );
};
