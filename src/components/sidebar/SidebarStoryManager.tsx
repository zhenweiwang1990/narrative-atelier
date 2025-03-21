
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useStory } from "@/components/Layout";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { SidebarStorySelector } from "./SidebarStorySelector";
import CreateStoryDialog from "../story/CreateStoryDialog";

export const SidebarStoryManager = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { story } = useStory();

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
      </SidebarGroupContent>
      
      <CreateStoryDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </SidebarGroup>
  );
};
