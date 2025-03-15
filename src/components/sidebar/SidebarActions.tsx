
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

export const SidebarActions = () => {
  const { story, handleSave, handleImport } = useStory();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
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
  );
};
