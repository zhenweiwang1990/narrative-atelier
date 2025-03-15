
import { useState } from 'react';
import { toast } from "sonner";
import { Story, Chapter } from '@/utils/types';
import { handleAiStoryGeneration } from '@/services/aiStoryServiceClient';

export function useChapterFileUpload(
  story: Story,
  setStory: (story: Story) => void
) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/plain') {
        toast.error('请上传 txt 格式的文件');
        return;
      }
      setFile(selectedFile);
    }
  };
  
  const processNovelFile = async (): Promise<void> => {
    if (!file) {
      toast.error('请先上传小说文件');
      return;
    }

    setIsProcessing(true);
    const chapters = story.chapters || [];

    try {
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        
        try {
          // 调用AI服务进行处理，而不是简单分割
          const result = await handleAiStoryGeneration({
            prompt: "将以下小说内容处理为多个章节，并添加互动标记",
            type: "branch",
            story: story,
          });
          
          if (result.success && result.chapters) {
            // 使用AI返回的章节数据
            const processedChapters = result.chapters.map((chapter, index) => ({
              id: `chapter-${Date.now()}-${index}`,
              title: chapter.title || `第 ${chapters.length + index + 1} 章`,
              originalContent: content.substring(index * Math.floor(content.length / result.chapters!.length), 
                                              (index + 1) * Math.floor(content.length / result.chapters!.length)),
              mainStoryContent: chapter.content,
              isProcessed: true,
              isConverted: false
            }));
            
            // 添加新章节到现有章节列表
            setStory({
              ...story,
              chapters: [...chapters, ...processedChapters]
            });
            
            toast.success(`成功导入并处理 ${processedChapters.length} 个章节`);
          } else {
            // 简单按照章节分割内容（作为备选方案）
            const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
            const parts = content.split(chapterRegex);
            
            // 忽略第一部分（通常是空的或者前言）
            const fallbackChapters = parts.slice(1).map((part, index) => ({
              id: `chapter-${Date.now()}-${index}`,
              title: `第 ${chapters.length + index + 1} 章`,
              originalContent: part.trim(),
              isProcessed: false,
              isConverted: false
            }));
            
            // 添加新章节到现有章节列表
            setStory({
              ...story,
              chapters: [...chapters, ...fallbackChapters]
            });
            
            toast.success(`成功导入 ${fallbackChapters.length} 个章节`);
          }
          
          setFile(null);
        } catch (error) {
          console.error('AI处理小说时出错:', error);
          toast.error('AI处理小说失败，使用基础分章');
          
          // 简单按照章节分割内容作为备选
          const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
          const parts = content.split(chapterRegex);
          
          const fallbackChapters = parts.slice(1).map((part, index) => ({
            id: `chapter-${Date.now()}-${index}`,
            title: `第 ${chapters.length + index + 1} 章`,
            originalContent: part.trim(),
            isProcessed: false,
            isConverted: false
          }));
          
          setStory({
            ...story,
            chapters: [...chapters, ...fallbackChapters]
          });
          
          toast.success(`成功导入 ${fallbackChapters.length} 个章节`);
          setFile(null);
        }
      };
      
      reader.readAsText(file);
    } catch (error) {
      console.error('处理小说时出错:', error);
      toast.error('处理小说失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    file,
    isProcessing,
    handleFileUpload,
    processNovelFile
  };
}
