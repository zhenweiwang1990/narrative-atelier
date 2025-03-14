
import React from "react";
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
  LogOut,
  HelpCircle,
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { story, handleSave, handleImport } = useStory();
  const { state, toggleSidebar } = useSidebar();
  const { user, userStories, addNewStory, currentStorySlug } = useAuth();

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
      title: "帮助",
      icon: HelpCircle,
      path: "/help",
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "已退出登录",
      description: "您已成功退出登录",
    });
    navigate("/auth");
  };

  const handleCreateStory = async () => {
    if (addNewStory) {
      try {
        const newStory = await addNewStory();
        if (newStory?.slug) {
          navigate(`/editor/${newStory.slug}`);
        }
      } catch (error) {
        console.error("创建剧情失败:", error);
        toast({
          title: "创建失败",
          description: "无法创建新剧情，请稍后重试",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          {user && (
            <SidebarGroup>
              <SidebarGroupLabel>我的剧情</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <div className="w-full">
                      <SidebarMenuButton
                        onClick={handleCreateStory}
                        className="w-full justify-start"
                      >
                        <Plus className="h-4 w-4" />
                        <span>创建新剧情</span>
                      </SidebarMenuButton>
                    </div>
                  </SidebarMenuItem>
                  
                  {userStories?.map((userStory) => (
                    <SidebarMenuItem key={userStory.id}>
                      <Link
                        to={`/editor/${userStory.slug}`}
                        className={cn(
                          "flex items-center gap-3 text-sm py-2",
                          currentStorySlug === userStory.slug
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        <SidebarMenuButton className="w-full justify-start">
                          <BookOpen className="h-4 w-4" />
                          <span>{userStory.title}</span>
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          <SidebarGroup>
            <SidebarGroupLabel>导航</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <Link
                      to={currentStorySlug ? `/editor/${currentStorySlug}${item.path}` : item.path}
                      className={cn(
                        "flex items-center gap-3 text-sm py-2",
                        location.pathname === item.path ||
                        location.pathname === `/editor/${currentStorySlug}${item.path}`
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
      
      {/* 修改悬浮按钮位置至左下角 */}
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
    </>
  );
}
