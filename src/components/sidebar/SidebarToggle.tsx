
import React from "react";
import { PanelLeft, Moon, Sun, Settings, Monitor } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

export const SidebarToggle = () => {
  const { state, toggleSidebar } = useSidebar();
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

  const goToSettings = () => {
    navigate("/settings");
  };

  return (
    <>
      {/* 侧边栏折叠时的悬浮按钮组，放在左下角 */}
      {state === "collapsed" && (
        <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background shadow-md"
                onClick={toggleSidebar}
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">展开侧边栏</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background shadow-md"
                onClick={toggleTheme}
              >
                {getThemeIcon()}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">切换主题</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background shadow-md"
                onClick={goToSettings}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">设置</TooltipContent>
          </Tooltip>
        </div>
      )}
    </>
  );
};
