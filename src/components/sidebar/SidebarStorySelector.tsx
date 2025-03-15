
import React, { useState } from "react";
import { FileEdit, Trash2, ChevronDown } from "lucide-react";
import { useStory } from "@/contexts/StoryContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const SidebarStorySelector = () => {
  const { story, setStory, stories, setStories, handleSave, createNewStory, deleteStory } = useStory();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState("");

  const handleCreateStory = () => {
    if (newStoryTitle.trim()) {
      createNewStory(newStoryTitle.trim());
      setNewStoryTitle("");
      setIsCreateDialogOpen(false);
    }
  };

  const handleRenameStory = () => {
    if (newStoryTitle.trim() && story) {
      const updatedStory = { ...story, title: newStoryTitle.trim() };
      setStory(updatedStory);
      
      // Update in stories array
      if (stories) {
        const updatedStories = stories.map(s => 
          s.id === updatedStory.id ? updatedStory : s
        );
        setStories(updatedStories);
      }
      
      handleSave();
      setNewStoryTitle("");
      setIsRenameDialogOpen(false);
    }
  };

  const openRenameDialog = () => {
    if (story) {
      setNewStoryTitle(story.title);
      setIsRenameDialogOpen(true);
    }
  };

  const handleStoryChange = (storyId: string) => {
    if (stories) {
      const selectedStory = stories.find(s => s.id === storyId);
      if (selectedStory) {
        setStory(selectedStory);
      }
    }
  };

  const handleDeleteStory = () => {
    if (story) {
      deleteStory(story.id);
    }
  };

  return (
    <>
      <div className="mb-2 flex items-center">
        <Select
          value={story?.id}
          onValueChange={handleStoryChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="选择剧情" />
          </SelectTrigger>
          <SelectContent>
            {stories?.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-1">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={openRenameDialog}>
              <FileEdit className="h-4 w-4 mr-2" />
              <span>重命名</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={handleDeleteStory}
              disabled={stories?.length === 1}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>删除</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 创建新剧情的对话框 */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>创建新剧情</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="输入剧情名称"
              value={newStoryTitle}
              onChange={(e) => setNewStoryTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreateStory}>
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 重命名剧情的对话框 */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>重命名剧情</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="输入新名称"
              value={newStoryTitle}
              onChange={(e) => setNewStoryTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRenameStory}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
