
import React, { useRef } from "react";
import { Save, Upload, Download } from "lucide-react";
import { useStory } from "@/components/Layout";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { toast } from "sonner";

export const SidebarActions = () => {
  const { story, handleSave, handleImport, handleExport } = useStory();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
