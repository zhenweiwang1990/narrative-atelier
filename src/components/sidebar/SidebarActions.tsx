
import React from "react";
import {
  Save,
  Upload,
  Download,
  LogOut,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface SidebarActionsProps {
  onSave: () => void;
  onImport: () => void;
  onExport: () => void;
  handleImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  user: any;
}

export const SidebarActions: React.FC<SidebarActionsProps> = ({
  onSave,
  onImport,
  onExport,
  handleImport,
  fileInputRef,
  user,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "已退出登录",
      description: "您已成功退出登录",
    });
    navigate("/auth");
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>操作</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full">
              <SidebarMenuButton
                onClick={onSave}
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
                onClick={onImport}
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
                onClick={onExport}
                className="w-full justify-start"
              >
                <Download className="h-4 w-4" />
                <span>导出</span>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
          {user && (
            <SidebarMenuItem>
              <div className="w-full">
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full justify-start text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span>退出登录</span>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
