
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ColorOption {
  label: string;
  value: string;
}

interface ColorSelectorProps {
  activeColor: string;
  setActiveColor: (color: string) => void;
  colors: ColorOption[];
}

export const ColorSelector = ({ activeColor, setActiveColor, colors }: ColorSelectorProps) => {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {colors.map((color) => (
          <Tooltip key={color.value}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActiveColor(color.value)}
                className={`w-8 h-8 rounded-full ${
                  activeColor === color.value 
                    ? 'ring-2 ring-primary ring-offset-2' 
                    : 'hover:ring-2 hover:ring-muted-foreground/30 hover:ring-offset-1'
                }`}
                style={{ backgroundColor: color.value }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{color.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
