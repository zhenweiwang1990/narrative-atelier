
import React from "react";
import { 
  User, 
  Settings, 
  LogOut, 
  Info, 
  FileText, 
  ShieldCheck 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  // Mock user data - would come from auth context in a real app
  const user = {
    name: "张小明",
    email: "zhang@example.com",
    avatar: "/placeholder.svg"
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 flex items-center space-x-3">
        <Avatar className="h-10 w-10 border border-border">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </div>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>个人设置</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to="/profile">
                <SidebarMenuButton>
                  <User className="h-4 w-4" />
                  <span>个人信息</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to="/settings">
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>账号设置</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => alert("已退出登录")}>
                <LogOut className="h-4 w-4" />
                <span>退出登录</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator className="mt-4" />

      <SidebarGroup>
        <SidebarGroupLabel>文档</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link to="/about">
                <SidebarMenuButton>
                  <Info className="h-4 w-4" />
                  <span>关于我们</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to="/terms">
                <SidebarMenuButton>
                  <FileText className="h-4 w-4" />
                  <span>用户协议</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link to="/privacy">
                <SidebarMenuButton>
                  <ShieldCheck className="h-4 w-4" />
                  <span>隐私政策</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
};
