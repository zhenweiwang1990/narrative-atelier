
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  MapPin,
  GitBranch,
  Settings,
  Database,
  Music,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export const SidebarNavigation = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "剧情概览",
      icon: BookOpen,
      path: "/",
    },
    {
      title: "场景流程",
      icon: GitBranch,
      path: "/flow",
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
      title: "音乐",
      icon: Music,
      path: "/music",
    },
    {
      title: "全局变量",
      icon: Database,
      path: "/global-values",
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="sidebar-text">导航</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 text-sm py-2 sidebar-text",
                  location.pathname === item.path
                    ? "text-primary font-medium"
                    : ""
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
