
import React from "react";
import { Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { 
  SidebarStoryManager,
  SidebarNavigation, 
  SidebarActions,
  SidebarToggle 
} from "./sidebar";
import { ThemeToggle } from "./theme/ThemeToggle";

export function AppSidebar() {
  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarStoryManager />
          <SidebarNavigation />
          <SidebarActions />
          <div className="mt-auto">
            <SidebarSeparator />
            <ThemeToggle />
          </div>
        </SidebarContent>
        <div className="p-3 border-t">
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
