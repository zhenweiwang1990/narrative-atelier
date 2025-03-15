
import React from "react";
import { Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  SidebarStoryManager,
  SidebarNavigation, 
  SidebarActions,
  SidebarToggle 
} from "./sidebar";

export function AppSidebar() {
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarStoryManager />
          <SidebarNavigation />
          <SidebarActions />
        </SidebarContent>
        <div className="p-3 mt-auto border-t">
          <SidebarTrigger>
            <button className="w-full flex items-center justify-between text-xs text-muted-foreground p-2 rounded-md hover:bg-muted">
              <span>切换侧边栏</span>
              <Menu className="h-4 w-4" />
            </button>
          </SidebarTrigger>
        </div>
      </Sidebar>
      
      <SidebarToggle />
    </>
  );
}
