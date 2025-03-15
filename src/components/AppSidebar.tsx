import React from "react";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Menu, PanelLeft } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import { useStory } from "./Layout";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarActions } from "./sidebar/SidebarActions";
import { SidebarStories } from "./sidebar/SidebarStories";
import { SidebarCollapseButton } from "./sidebar/SidebarCollapseButton";

export function AppSidebar() {
  const location = useLocation();
  const { story, handleSave, handleImport } = useStory();
  const { state, toggleSidebar } = useSidebar();
  const { user, userStories, addNewStory, currentStorySlug } = useAuth();

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (!story) return;

    // 创建JSON blob并触发下载
    const content = JSON.stringify(story, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title || "Miss AI 剧情编辑器"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          {user && (
            <SidebarStories
              userStories={userStories}
              currentStorySlug={currentStorySlug}
              onCreateStory={addNewStory}
            />
          )}

          <SidebarNavigation
            currentStorySlug={currentStorySlug}
            currentPath={location.pathname}
          />

          <SidebarActions
            onSave={handleSave}
            onImport={triggerImport}
            onExport={handleExport}
            fileInputRef={fileInputRef}
            handleImport={handleImport}
            user={user}
          />
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

      <SidebarCollapseButton
        sidebarState={state}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
}
