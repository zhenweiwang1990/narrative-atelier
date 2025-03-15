
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

  return (
    <SidebarGroup>
      <SidebarGroupLabel>导航</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
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
  );
};
