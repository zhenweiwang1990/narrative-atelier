
import React from "react";
import { PanelLeft, Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export const SidebarToggle = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <>
      {/* 侧边栏折叠时的悬浮按钮，放在左下角 */}
      {state === "collapsed" && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 bg-background shadow-md"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
