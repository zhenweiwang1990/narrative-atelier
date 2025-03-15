
import { useState } from 'react';
import { toast } from "sonner";
import { Story } from '@/utils/types';

export interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations: string[];
  isConverted: boolean;
}

export const useNovelProcessing = (story: Story | null, setStory: (story: Story) => void) => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/plain') {
        toast.error('请上传 txt 格式的文件');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      resetState();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetState = () => {
    setStep(1);
    setChapters([]);
    setFile(null);
    setShowConfirmation(false);
  };

  const processNovel = async () => {
    if (!file) {
      toast.error('请先上传小说文件');
      return;
    }

    setIsProcessing(true);

    try {
      // 模拟文件处理和章节分割
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // 简单按照章节分割内容（实际项目中可能需要更复杂的逻辑）
        const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
        const parts = content.split(chapterRegex);
        
        // 忽略第一部分（通常是空的或者前言）
        const processedChapters = parts.slice(1).map((part, index) => ({
          id: `chapter-${index + 1}`,
          title: `第 ${index + 1} 章`,
          content: part.trim(),
          annotations: [],
          isConverted: false
        }));
        
        setChapters(processedChapters);
        toast.success('小说处理完成，已分为 ' + processedChapters.length + ' 章');
        handleNextStep();
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('处理小说时出错:', error);
      toast.error('处理小说失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChapterContentChange = (index: number, newContent: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].content = newContent;
    setChapters(updatedChapters);
  };

  const regenerateChapter = async (index: number) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)), 
      {
        loading: '正在重新生成章节...',
        success: '章节重新生成成功',
        error: '生成失败，请重试。',
      }
    );
  };

  const convertToStory = async (index: number) => {
    setCurrentChapterIndex(index);
    setIsConverting(true);
    
    try {
      // TODO: 实际的服务器调用将章节转换为剧情结构
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 假设转换成功
      const updatedChapters = [...chapters];
      updatedChapters[index].isConverted = true;
      setChapters(updatedChapters);
      
      // 检查是否所有章节都已转换
      const allConverted = updatedChapters.every(chapter => chapter.isConverted);
      if (allConverted) {
        setShowConfirmation(true);
      } else {
        toast.success(`章节 ${index + 1} 转换成功`);
      }
    } catch (error) {
      console.error('转换章节时出错:', error);
      toast.error('转换失败，请重试');
    } finally {
      setIsConverting(false);
    }
  };

  const mergeToStory = () => {
    if (story) {
      // 这里应该将转换后的内容合并到现有故事中
      const updatedStory = { ...story };
      // 实际合并逻辑
      
      setStory(updatedStory);
      toast.success('故事已成功合并');
      setShowConfirmation(false);
      resetState();
    }
  };

  return {
    step,
    file,
    isProcessing,
    chapters,
    showConfirmation,
    isConverting,
    handleFileChange,
    handleNextStep,
    handlePreviousStep,
    processNovel,
    handleChapterContentChange,
    regenerateChapter,
    convertToStory,
    mergeToStory,
    setShowConfirmation
  };
};
