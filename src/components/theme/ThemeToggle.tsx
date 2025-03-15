
import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="px-2 py-2">
      <div className="flex flex-col items-start gap-2">
        <p className="text-xs text-sidebar-foreground/70 font-medium ml-2">主题模式</p>
        <ToggleGroup 
          type="single" 
          value={theme}
          onValueChange={(value) => {
            if (value) setTheme(value);
          }}
          className="w-full justify-around border rounded-md bg-sidebar-accent p-1"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="light" 
                size="sm"
                className="rounded-md h-8 w-8 data-[state=on]:bg-sidebar-accent-foreground data-[state=on]:text-sidebar-accent"
              >
                <Sun className="h-4 w-4" />
                <span className="sr-only">亮色模式</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="top">亮色模式</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="dark" 
                size="sm"
                className="rounded-md h-8 w-8 data-[state=on]:bg-sidebar-accent-foreground data-[state=on]:text-sidebar-accent"
              >
                <Moon className="h-4 w-4" />
                <span className="sr-only">暗色模式</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="top">暗色模式</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem 
                value="system" 
                size="sm"
                className="rounded-md h-8 w-8 data-[state=on]:bg-sidebar-accent-foreground data-[state=on]:text-sidebar-accent"
              >
                <Monitor className="h-4 w-4" />
                <span className="sr-only">跟随系统</span>
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent side="top">跟随系统</TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>
    </div>
  );
}
