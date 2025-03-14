
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  Database
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
import { useStory } from './Layout';

export function AppSidebar() {
  const location = useLocation();
  const { story, handleSave, handleImport } = useStory();
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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
      title: "Global Values",
      icon: Database,
      path: "/global-values"
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

  const handleExport = () => {
    if (!story) return;
    
    // Create a JSON blob and trigger download
    const content = JSON.stringify(story, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${story.title || 'narrative-atelier'}.json`;
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
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link 
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 text-sm py-2",
                      location.pathname === item.path ? "text-primary font-medium" : "text-muted-foreground"
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
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="w-full">
                  <SidebarMenuButton 
                    onClick={handleSave}
                    className="w-full justify-start"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
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
                    <span>Import</span>
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
                    <span>Export</span>
                  </SidebarMenuButton>
                </div>
              </SidebarMenuItem>
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
};
