
import { useState } from 'react';
import { Chapter, Story } from '@/utils/types';
import { toast } from "sonner";
import { handleAiStoryGeneration } from '@/services/aiStoryServiceClient';

export function useChaptersManagement(story: Story, setStory: (story: Story) => void) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [showMergeConfirm, setShowMergeConfirm] = useState(false);
  
  // Initialize chapters if they don't exist
  const chapters = story.chapters || [];
  
  const handleAddChapter = () => {
    const newChapter: Chapter = {
      id: `chapter-${Date.now()}`,
      title: `第 ${chapters.length + 1} 章`,
      originalContent: '',
      isProcessed: false,
      isConverted: false
    };
    
    setStory({
      ...story,
      chapters: [...chapters, newChapter]
    });
    
    setSelectedChapterId(newChapter.id);
  };
  
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
  
  const processNovelFile = async () => {
    if (!file) {
      toast.error('请先上传小说文件');
      return;
    }

    setIsProcessing(true);

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
  
  const handleChapterChange = (chapterId: string, field: keyof Chapter, value: string) => {
    const updatedChapters = chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, [field]: value } 
        : chapter
    );
    
    setStory({
      ...story,
      chapters: updatedChapters
    });
  };
  
  // Modified to return void instead of Promise<string|number>
  const handleAIProcess = async (chapterId: string): Promise<void> => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.originalContent) {
      toast.error('该章节内容为空，无法处理');
      return;
    }
    
    await toast.promise(
      (async () => {
        try {
          const result = await handleAiStoryGeneration({
            prompt: `处理以下小说内容，添加场景、对话、选项、QTE和对话任务标记:\n${chapter.originalContent.substring(0, 500)}...`,
            type: "branch",
            story: story,
          });
          
          if (result.success && result.chapters && result.chapters.length > 0) {
            // 获取AI处理后的内容
            const processedContent = result.chapters[0].content;
            
            const updatedChapters = chapters.map(c => 
              c.id === chapterId 
                ? { ...c, mainStoryContent: processedContent, isProcessed: true } 
                : c
            );
            
            setStory({
              ...story,
              chapters: updatedChapters
            });
          } else {
            throw new Error('AI处理返回无效数据');
          }
        } catch (error) {
          console.error('AI处理章节时出错:', error);
          throw error;
        }
      })(),
      {
        loading: 'AI 正在处理章节内容...',
        success: '处理完成！',
        error: '处理失败，请重试',
      }
    );
  };
  
  // Modified to return void instead of Promise<string|number>
  const handleMarkingToServer = async (chapterId: string): Promise<void> => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.markedContent && !chapter.mainStoryContent) {
      toast.error('互动标记内容为空，无法处理');
      return;
    }
    
    const contentToConvert = chapter.markedContent || chapter.mainStoryContent;
    
    await toast.promise(
      (async () => {
        try {
          // 模拟服务器处理时间
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const updatedChapters = chapters.map(c => 
            c.id === chapterId 
              ? { ...c, isConverted: true } 
              : c
          );
          
          setStory({
            ...story,
            chapters: updatedChapters
          });
          
          setShowMergeConfirm(true);
        } catch (error) {
          console.error('转换互动标记时出错:', error);
          throw error;
        }
      })(),
      {
        loading: 'AI 正在转换互动标记...',
        success: '转换完成！',
        error: '转换失败，请重试',
      }
    );
  };
  
  const handleMergeToStory = () => {
    toast.success('已成功将章节内容合并到剧情流程中');
    setShowMergeConfirm(false);
  };

  return {
    file,
    isProcessing,
    selectedChapterId,
    showMergeConfirm,
    chapters,
    setSelectedChapterId,
    setShowMergeConfirm,
    handleAddChapter,
    handleFileUpload,
    processNovelFile,
    handleChapterChange,
    handleAIProcess,
    handleMarkingToServer,
    handleMergeToStory
  };
}
