
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  Lightbulb, 
  BookOpen, 
  Plus,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { useStory } from "@/components/Layout";
import { generateId } from "@/utils/storage";
import NovelToStoryDialog from "@/components/ai-story/NovelToStoryDialog";
import SimpleIdeaDialog from "@/components/ai-story/SimpleIdeaDialog";

interface CreateStoryOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const CreateStoryOption: React.FC<CreateStoryOptionProps> = ({
  icon,
  title,
  description,
  onClick
}) => {
  return (
    <div 
      className="bg-white dark:bg-card border rounded-lg shadow p-6 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
      onClick={onClick}
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

interface CreateStoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStoryDialog: React.FC<CreateStoryDialogProps> = ({
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();
  const { story, setStory, stories, setStories, createNewStory } = useStory();
  
  const [showNovelDialog, setShowNovelDialog] = useState(false);
  const [showIdeaDialog, setShowIdeaDialog] = useState(false);

  const handleAIOption = () => {
    setShowIdeaDialog(true);
    onClose();
  };

  const handleNovelOption = () => {
    setShowNovelDialog(true);
    onClose();
  };

  const handleDemoOption = () => {
    // Find the Red Dress story in stories array
    const redDressStory = stories.find(s => s.title.includes("红衣如故"));
    
    if (redDressStory) {
      // Set as current story
      setStory(redDressStory);
      
      // Navigate to the flow page
      navigate("/flow");
      toast.success("已加载「红衣如故」示例剧情");
    } else {
      toast.error("无法找到示例剧情");
    }
    
    onClose();
  };

  const handleNewStoryOption = () => {
    // Create a new blank story
    createNewStory("新剧情");
    
    // Navigate to the index page for setting up details
    navigate("/");
    toast.success("已创建新剧情");
    
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl mb-4">选择创建剧情的方式</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
            <CreateStoryOption
              icon={<Lightbulb className="h-8 w-8 text-primary" />}
              title="AI 创意助手"
              description="输入创意提示，AI 将生成剧情框架及第一章内容"
              onClick={handleAIOption}
            />
            
            <CreateStoryOption
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="小说改编"
              description="上传 TXT 小说文件，自动分割章节并改编为交互式剧情"
              onClick={handleNovelOption}
            />
            
            <CreateStoryOption
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              title="查看示例"
              description="直接跳转到「红衣如故」示例剧情，了解功能"
              onClick={handleDemoOption}
            />
            
            <CreateStoryOption
              icon={<Plus className="h-8 w-8 text-primary" />}
              title="空白剧情"
              description="从零开始创建全新剧情，自由发挥创意"
              onClick={handleNewStoryOption}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showNovelDialog && (
        <NovelToStoryDialog
          isOpen={showNovelDialog}
          onClose={() => setShowNovelDialog(false)}
          story={story}
          setStory={story => setStory && setStory(story)}
        />
      )}

      {showIdeaDialog && (
        <SimpleIdeaDialog
          isOpen={showIdeaDialog}
          onClose={() => setShowIdeaDialog(false)}
          story={story}
          setStory={setStory}
        />
      )}
    </>
  );
};

export default CreateStoryDialog;
