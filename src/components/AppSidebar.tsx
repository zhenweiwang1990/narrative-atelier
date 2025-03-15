
import React from "react";
import { Link } from "react-router-dom";
import { Menu, BookText } from "lucide-react";
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
  SidebarToggle,
  UserProfile
} from "./sidebar";
import { ThemeToggle } from "./theme/ThemeToggle";

export function AppSidebar() {
  return (
    <>
      <Sidebar>
        <SidebarContent>
          {/* Logo and brand name at the top */}
          <div className="p-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <BookText className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold tracking-tight">
                Miss AI 剧情编辑器
              </span>
            </Link>
          </div>
          <SidebarSeparator className="mb-4" />

          <SidebarStoryManager />
          <SidebarNavigation />
          <SidebarActions />
          
          {/* Push user profile to the bottom */}
          <div className="mt-auto">
            <SidebarSeparator className="mb-4" />
            <ThemeToggle />
            <SidebarSeparator className="my-4" />
            <UserProfile />
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
