
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Story } from '@/utils/types';
import { Card } from "@/components/ui/card";
import ChapterPreview from './chapters/ChapterPreview';

interface SimpleIdeaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  story: Story | null;
  setStory: (story: Story) => void;
}

const SimpleIdeaDialog: React.FC<SimpleIdeaDialogProps> = ({
  isOpen,
  onClose,
  story,
  setStory
}) => {
  const [ideaText, setIdeaText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async () => {
    if (!ideaText.trim()) {
      toast.error('请输入您的创意');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: 实际的服务器调用
      // 暂时使用模拟响应，等待 2 秒模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 假设我们收到了生成的内容
      const mockGeneratedContent = `
## 旁白
这是一个根据创意自动生成的故事开头。

## 对话
主角："我终于找到了这个神秘的地方。"

## 旁白
周围的环境看起来很陌生，似乎蕴含着无限可能。

<-s->

## 旁白
主角小心翼翼地向前走去，不知道前方等待着什么。

## 对话
神秘人："欢迎来到命运的十字路口。"

## 对话
主角："你是谁？这是哪里？"

## 对话
神秘人："这些问题的答案取决于你接下来的选择。"

<-s->

## 旁白
主角面临一个重要的选择。

<<选择继续前进||转身离开||询问更多信息>>
      `;
      
      setGeneratedContent(mockGeneratedContent);
      setShowPreview(true);
    } catch (error) {
      console.error('生成故事时出错:', error);
      toast.error('生成故事失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveChapter = () => {
    if (!story) return;
    
    // 创建新章节
    const newChapter = {
      id: `chapter-${Date.now()}`,
      title: `由创意生成的章节: ${ideaText.substring(0, 20)}...`,
      originalContent: generatedContent,
      isProcessed: false,
      isConverted: false
    };
    
    // 更新故事，添加新章节
    const updatedStory = {
      ...story,
      chapters: [...(story.chapters || []), newChapter]
    };
    
    setStory(updatedStory);
    toast.success('新章节已添加到故事中');
    resetDialog();
  };

  const resetDialog = () => {
    setIdeaText('');
    setGeneratedContent('');
    setShowPreview(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>从简单创意创作剧情</DialogTitle>
          <DialogDescription>
            请输入您的剧情创意，AI 将为您创作一个新章节
          </DialogDescription>
        </DialogHeader>
        
        {!showPreview ? (
          <div className="my-4">
            <Textarea
              placeholder="例如：一个普通高中生意外获得了穿越时空的能力，但每次使用都会消耗自己的寿命..."
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
        ) : (
          <div className="my-4">
            <h3 className="text-md font-medium mb-2">生成的章节预览：</h3>
            <Card className="p-4 max-h-[400px] overflow-y-auto">
              <ChapterPreview content={generatedContent} />
            </Card>
          </div>
        )}
        
        <DialogFooter>
          {!showPreview ? (
            <>
              <Button variant="outline" onClick={onClose}>取消</Button>
              <Button onClick={handleSubmit} disabled={isSubmitting || !ideaText.trim()}>
                {isSubmitting ? '生成中...' : '生成章节'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={resetDialog}>取消</Button>
              <Button variant="default" onClick={handleSaveChapter}>
                保存章节
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SimpleIdeaDialog;
