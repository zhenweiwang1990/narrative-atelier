
import React from "react";
import { Menu, Moon, Sun, Settings } from "lucide-react";
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
    setTheme(theme === "dark" ? "light" : "dark");
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
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">切换主题</TooltipContent>
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
