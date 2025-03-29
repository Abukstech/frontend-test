
import { useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentPopoverProps {
  id: string;
  position: { x: number; y: number };
  initialContent: string;
  onSave: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export const CommentPopover = ({
  id,
  position,
  initialContent,
  onSave,
  onDelete,
}: CommentPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleSave = () => {
    onSave(id, content);
    setOpen(false);
  };

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-yellow-100 border-yellow-400 hover:bg-yellow-200"
          >
            <MessageSquare size={14} className="text-yellow-600" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <div className="font-medium">Comment</div>
            <Textarea
              placeholder="Add your comment here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-between pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(id)}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
              <Button size="sm" onClick={handleSave}>Save Comment</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
