
import React from "react";
import { Menu, Moon, Sun, Settings, Monitor } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
  SidebarSeparator,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  SidebarStoryManager,
  SidebarNavigation, 
  SidebarActions,
  SidebarToggle 
} from "./sidebar";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const getThemeIcon = () => {
    if (theme === "dark") return <Sun className="h-4 w-4" />;
    if (theme === "light") return <Monitor className="h-4 w-4" />;
    return <Moon className="h-4 w-4" />;
  };

  const getThemeTooltip = () => {
    if (theme === "dark") return "切换到亮色";
    if (theme === "light") return "切换到跟随系统";
    return "切换到暗色";
  };

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
              M
            </div>
            <span className="text-lg font-semibold">Miss AI</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarStoryManager />
          <SidebarNavigation />
          <SidebarActions />
        </SidebarContent>
        
        <div className="p-3 border-t">
          <div className="flex items-center justify-between">
            <SidebarTrigger>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground p-2 rounded-md hover:bg-muted">
                <span>收起侧边栏</span>
                <Menu className="h-4 w-4" />
              </button>
            </SidebarTrigger>
            
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={toggleTheme}
                  >
                    {getThemeIcon()}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">{getThemeTooltip()}</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={goToSettings}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">设置</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </Sidebar>
      
      <SidebarToggle />
    </>
  );
}
