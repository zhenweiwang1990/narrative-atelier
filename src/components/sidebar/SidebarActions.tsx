
import React, { useRef, useState } from "react";
import { Save, Upload, Download, Share2, Tag } from "lucide-react";
import { useStory } from "@/components/Layout";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

export const SidebarActions = () => {
  const { story, handleSave, handleImport, handleExport } = useStory();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const version = "0.1.0"; // 默认版本号
  const navigate = useNavigate();

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
  
  const generateVersionNumber = () => {
    // 生成新版本号（基于当前版本递增）
    const parts = version.split('.');
    const minor = parseInt(parts[2]) + 1;
    return `${parts[0]}.${parts[1]}.${minor}`;
  };
  
  const handlePublish = async () => {
    setPublishDialogOpen(false);
    const newVersion = generateVersionNumber();
    
    toast.promise(
      // 这里会是一个真实的 API 请求
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: `正在发布剧情 v${newVersion}...`,
        success: () => {
          setTimeout(() => {
            // 发布成功后导航到版本历史页面
            navigate('/version-history');
          }, 1000);
          return `剧情 v${newVersion} 发布成功，已提交审核`;
        },
        error: '发布失败，请重试',
      }
    );
    
    // TODO: 调用实际的发布 API
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>操作</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="p-2">
          <div className="grid grid-cols-2 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSaveAction}
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-1"
                >
                  <Save className="h-6 w-6" />
                  <span className="text-xs">保存</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>保存当前剧情</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setPublishDialogOpen(true)}
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-1 bg-primary/5 hover:bg-primary/10 border-primary/20"
                >
                  <Share2 className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium text-primary">发布</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>发布剧情</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={triggerImport}
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-1"
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">导入</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>导入剧情文件</TooltipContent>
            </Tooltip>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center gap-1"
                >
                  <Download className="h-6 w-6" />
                  <span className="text-xs">导出</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>导出剧情文件</TooltipContent>
            </Tooltip>
          </div>
          
          <div className="flex items-center justify-between mt-3 px-2 py-1.5 text-sm">
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground">版本</span>
            </div>
            <Badge variant="outline" className="ml-auto">v{version}</Badge>
          </div>
        </div>
      </SidebarGroupContent>
      
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认发布</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要发布当前剧情吗？发布后将创建一个新的版本 v{generateVersionNumber()}，并提交审核。审核通过后可被其他用户访问。
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
