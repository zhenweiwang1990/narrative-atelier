
import React from "react";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarCollapseButtonProps {
  sidebarState: "expanded" | "collapsed";
  toggleSidebar: () => void;
}

export const SidebarCollapseButton: React.FC<SidebarCollapseButtonProps> = ({
  sidebarState,
  toggleSidebar,
}) => {
  if (sidebarState === "collapsed") {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 bg-background shadow-md"
        onClick={toggleSidebar}
      >
        <PanelLeft className="h-4 w-4" />
      </Button>
    );
  }
  
  return null;
};
