
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  MapPin,
  GitBranch,
  Settings,
  Menu,
  Save,
  Upload,
  Download,
  Database,
  PanelLeft,
  Plus,
  ChevronDown,
  FileEdit,
  Trash2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { useStory } from "./Layout";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { generateId } from "@/utils/storage";

export function AppSidebar() {
  const location = useLocation();
  const { story, setStory, stories, setStories, handleSave, handleImport, createNewStory, deleteStory } = useStory();
  const { state, toggleSidebar } = useSidebar();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState("");
  const [currentStoryId, setCurrentStoryId] = useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const menuItems = [
    {
      title: "剧情",
      icon: BookOpen,
      path: "/",
    },
    {
      title: "角色",
      icon: Users,
      path: "/characters",
    },
    {
      title: "地点",
      icon: MapPin,
      path: "/locations",
    },
    {
      title: "全局变量",
      icon: Database,
      path: "/global-values",
    },
    {
      title: "流程",
      icon: GitBranch,
      path: "/flow",
    },
    {
      title: "设置",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleExport = () => {
    if (!story) return;

    // 创建JSON blob并触发下载
    const content = JSON.stringify(story, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title || "narrative-atelier"}.json`;
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
      <Sidebar>
        <SidebarContent>
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
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>导航</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 text-sm py-2",
                        location.pathname === item.path
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      <SidebarMenuButton className="w-full justify-start">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>操作</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="w-full">
                    <SidebarMenuButton
                      onClick={handleSave}
                      className="w-full justify-start"
                    >
                      <Save className="h-4 w-4" />
                      <span>保存</span>
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div className="w-full">
                    <SidebarMenuButton
                      onClick={triggerImport}
                      className="w-full justify-start"
                    >
                      <Upload className="h-4 w-4" />
                      <span>导入</span>
                    </SidebarMenuButton>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json"
                      className="hidden"
                      onChange={handleImport}
                    />
                  </div>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div className="w-full">
                    <SidebarMenuButton
                      onClick={handleExport}
                      className="w-full justify-start"
                    >
                      <Download className="h-4 w-4" />
                      <span>导出</span>
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
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
      
      {/* 添加侧边栏折叠时的悬浮按钮，放在左下角 */}
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
}
