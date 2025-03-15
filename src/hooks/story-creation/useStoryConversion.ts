
import { useState, useEffect } from 'react';
import { useStory } from "@/components/Layout";
import { toast } from "sonner";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations?: string[];
  isConverted: boolean;
}

export function useStoryConversion() {
  const { story, setStory } = useStory();
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    const storedChapters = sessionStorage.getItem('storyChapters');
    if (!storedChapters) {
      toast.error('没有找到章节数据，请返回上一步');
      return;
    }
    
    try {
      const parsedChapters = JSON.parse(storedChapters);
      // 添加 isConverted 字段
      const chaptersWithStatus = parsedChapters.map((chapter: any) => ({
        ...chapter,
        isConverted: false
      }));
      setChapters(chaptersWithStatus);
    } catch (error) {
      console.error('解析章节数据出错:', error);
      toast.error('章节数据解析失败');
    }
  }, []);

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
      
      // 清除 sessionStorage 中的数据
      sessionStorage.removeItem('storyChapters');
    }
  };

  return {
    chapters,
    isConverting,
    currentChapterIndex,
    showConfirmation,
    setShowConfirmation,
    convertToStory,
    mergeToStory,
    hasChapters: chapters.length > 0
  };
}
