
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations: string[];
}

export function useInteractionMarking() {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  
  useEffect(() => {
    const storedChapters = sessionStorage.getItem('storyChapters');
    if (!storedChapters) {
      toast.error('没有找到章节数据，请返回上一步');
      return;
    }
    
    try {
      const parsedChapters = JSON.parse(storedChapters);
      // 添加 annotations 数组
      const chaptersWithAnnotations = parsedChapters.map((chapter: any) => ({
        ...chapter,
        annotations: []
      }));
      setChapters(chaptersWithAnnotations);
    } catch (error) {
      console.error('解析章节数据出错:', error);
      toast.error('章节数据解析失败');
    }
  }, []);

  const handleChapterContentChange = (index: number, newContent: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].content = newContent;
    setChapters(updatedChapters);
    
    // 更新 sessionStorage
    sessionStorage.setItem('storyChapters', JSON.stringify(updatedChapters));
  };

  const regenerateChapter = async (index: number) => {
    return toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)), 
      {
        loading: '正在重新生成章节...',
        success: '章节重新生成成功',
        error: '生成失败，请重试。',
      }
    );
  };

  const handlePrevious = () => {
    navigate('/story-creation/text-processing');
  };

  const handleNext = () => {
    navigate('/story-creation/conversion');
  };

  return {
    chapters,
    handleChapterContentChange,
    regenerateChapter,
    handlePrevious,
    handleNext
  };
}
