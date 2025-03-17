
import { useState } from 'react';
import { toast } from 'sonner';

export function useChapterTabs() {
  const [activeTab, setActiveTab] = useState("step1");
  const [isProcessingPreview, setIsProcessingPreview] = useState(false);
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);

  // 处理预览主线按钮
  const handlePreviewMainStory = async () => {
    try {
      setIsProcessingPreview(true);
      // TODO: 实际调用服务器处理互动标记内容并转换为JSON
      toast.loading("正在处理互动标记...");
      
      // Mock: 假设等待1秒模拟服务器处理
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("处理完成，跳转到主线入库阶段");
      
      // 直接切换到第四个Tab而不是跳转页面
      setActiveTab("step4");
    } catch (error) {
      console.error('预览主线失败', error);
      toast.error('预览失败，请重试');
    } finally {
      setIsProcessingPreview(false);
    }
  };

  // 处理入库制作按钮
  const handleMarkingToServerClick = () => {
    setShowProcessingDialog(true);
  };
  
  return {
    activeTab,
    setActiveTab,
    isProcessingPreview,
    showProcessingDialog,
    setShowProcessingDialog,
    handlePreviewMainStory,
    handleMarkingToServerClick
  };
}
