
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Users, 
  MapPin, 
  GitBranch, 
  Settings, 
  Menu 
} from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Story",
      icon: BookOpen,
      path: "/"
    },
    {
      title: "Characters",
      icon: Users,
      path: "/characters"
    },
    {
      title: "Locations",
      icon: MapPin,
      path: "/locations"
    },
    {
      title: "Flow",
      icon: GitBranch,
      path: "/flow"
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 text-sm py-2",
                        location.pathname === item.path ? "text-primary font-medium" : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-3 mt-auto border-t">
        <SidebarTrigger>
          <button className="w-full flex items-center justify-between text-xs text-muted-foreground p-2 rounded-md hover:bg-muted">
            <span>Toggle Sidebar</span>
            <Menu className="h-4 w-4" />
          </button>
        </SidebarTrigger>
      </div>
    </Sidebar>
  );
}
