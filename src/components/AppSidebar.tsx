
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
  Download
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
                  <SidebarMenuButton>
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

        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <button 
                    className="flex items-center gap-3 text-sm py-2 w-full text-left text-muted-foreground"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <button 
                    className="flex items-center gap-3 text-sm py-2 w-full text-left text-muted-foreground"
                    onClick={triggerImport}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Import</span>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept=".json" 
                      className="hidden"
                      onChange={handleImport}
                    />
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <button 
                    className="flex items-center gap-3 text-sm py-2 w-full text-left text-muted-foreground"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </SidebarMenuButton>
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
