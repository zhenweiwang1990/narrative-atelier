
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Library,
  Plus,
  BookOpen,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { UserStory } from "@/hooks/auth/types";
import { toast } from "@/components/ui/use-toast";

interface SidebarStoriesProps {
  userStories?: UserStory[];
  currentStorySlug?: string | null;
  onCreateStory?: () => Promise<UserStory | null>;
}

export const SidebarStories: React.FC<SidebarStoriesProps> = ({
  userStories = [],
  currentStorySlug,
  onCreateStory,
}) => {
  const navigate = useNavigate();

  const handleCreateStory = async () => {
    if (onCreateStory) {
      try {
        const newStory = await onCreateStory();
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
    <SidebarGroup>
      <SidebarGroupLabel>我的剧情</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              to="/my-stories"
              className={cn(
                "flex items-center gap-3 text-sm py-2",
                location.pathname === "/my-stories"
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              <SidebarMenuButton className="w-full justify-start">
                <Library className="h-4 w-4" />
                <span>全部剧情</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
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
  );
};
