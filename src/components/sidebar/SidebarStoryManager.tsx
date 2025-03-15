
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useStory } from "@/components/Layout";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarStorySelector } from "./SidebarStorySelector";
import { Badge } from "@/components/ui/badge";

export const SidebarStoryManager = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { story } = useStory();

  // 获取关键统计信息
  const characterCount = story?.characters?.length || 0;
  const locationCount = story?.locations?.length || 0;
  const sceneCount = story?.scenes?.length || 0;
  const globalValueCount = story?.globalValues?.length || 0;

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between items-center">
        <span>当前剧情</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarStorySelector />

        {story && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between px-2 py-1 bg-muted/20 rounded-md">
              <span>角色</span>
              <Badge variant="outline" className="ml-1">{characterCount}</Badge>
            </div>
            <div className="flex items-center justify-between px-2 py-1 bg-muted/20 rounded-md">
              <span>地点</span>
              <Badge variant="outline" className="ml-1">{locationCount}</Badge>
            </div>
            <div className="flex items-center justify-between px-2 py-1 bg-muted/20 rounded-md">
              <span>场景</span>
              <Badge variant="outline" className="ml-1">{sceneCount}</Badge>
            </div>
            <div className="flex items-center justify-between px-2 py-1 bg-muted/20 rounded-md">
              <span>变量</span>
              <Badge variant="outline" className="ml-1">{globalValueCount}</Badge>
            </div>
          </div>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
