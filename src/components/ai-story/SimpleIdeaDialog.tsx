
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
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Story } from '@/utils/types';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

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
      
      // 假设我们收到了一个新的故事
      if (story) {
        const mockGeneratedStory: Story = {
          ...story,
          title: `由 AI 创作的剧情: ${ideaText.substring(0, 20)}...`,
          description: ideaText,
          // 其他字段保持不变
        };
        
        setGeneratedStory(mockGeneratedStory);
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error('生成故事时出错:', error);
      toast.error('生成故事失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirm = () => {
    if (generatedStory) {
      setStory(generatedStory);
      toast.success('新剧情已合并');
    }
    setShowConfirmation(false);
    setGeneratedStory(null);
    onClose();
    setIdeaText('');
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setGeneratedStory(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>从简单创意创作剧情</DialogTitle>
            <DialogDescription>
              请输入您的剧情创意，AI 将为您创作一个完整的剧情结构
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
            <Textarea
              placeholder="例如：一个普通高中生意外获得了穿越时空的能力，但每次使用都会消耗自己的寿命..."
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              rows={8}
              className="resize-none"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>取消</Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !ideaText.trim()}>
              {isSubmitting ? '生成中...' : '生成剧情'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认替换当前剧情</AlertDialogTitle>
            <AlertDialogDescription>
              AI 已根据您的创意生成了新剧情。替换当前剧情将会覆盖现有内容，确定要继续吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>确认替换</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SimpleIdeaDialog;
