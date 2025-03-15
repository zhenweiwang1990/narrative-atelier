
import React, { useRef, useState } from "react";
import { Save, Upload, Download, Share2, Tag } from "lucide-react";
import { useStory } from "@/contexts/StoryContext";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

export const SidebarActions = () => {
  const { story, handleSave, handleImport, handleExport } = useStory();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const version = "0.1.0"; // 默认版本号

  const triggerImport = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveAction = async () => {
    try {
      await handleSave();
    } catch (error) {
      console.error('Save action failed:', error);
      // Toast is already handled in the hook
    }
  };
  
  const handlePublish = async () => {
    setPublishDialogOpen(false);
    
    toast.promise(
      // 这里会是一个真实的 API 请求
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: '正在发布剧情...',
        success: '剧情发布成功',
        error: '发布失败，请重试',
      }
    );
    
    // TODO: 调用实际的发布 API
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>操作</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full">
              <SidebarMenuButton
                onClick={handleSaveAction}
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
          
          <SidebarSeparator className="my-2" />
          
          <SidebarMenuItem>
            <div className="w-full">
              <SidebarMenuButton
                onClick={() => setPublishDialogOpen(true)}
                className="w-full justify-start"
              >
                <Share2 className="h-4 w-4" />
                <span>发布</span>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <div className="w-full flex items-center justify-between px-2 py-1.5 text-sm">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">版本</span>
              </div>
              <Badge variant="outline" className="ml-auto">v{version}</Badge>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
      
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认发布</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要发布当前剧情吗？发布后将创建一个新的版本，并可以被其他用户访问。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handlePublish}>
              确认发布
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarGroup>
  );
};
