
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  MapPin,
  GitBranch,
  Settings,
  HelpCircle,
  Database,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

interface SidebarNavigationProps {
  currentStorySlug?: string | null;
  currentPath: string;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  currentStorySlug,
  currentPath,
}) => {
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

  return (
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
                  currentPath === item.path ||
                  currentPath === `/editor/${currentStorySlug}${item.path}`
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
  );
};
