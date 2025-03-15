
import { useState } from 'react';
import { Chapter, Story } from '@/utils/types';
import { toast } from "sonner";

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
      // 模拟文件处理和章节分割
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 读取文件内容
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        
        // 简单按照章节分割内容
        const chapterRegex = /第[一二三四五六七八九十百千万]+章|\d+\./g;
        const parts = content.split(chapterRegex);
        
        // 忽略第一部分（通常是空的或者前言）
        const processedChapters = parts.slice(1).map((part, index) => ({
          id: `chapter-${Date.now()}-${index}`,
          title: `第 ${chapters.length + index + 1} 章`,
          originalContent: part.trim(),
          isProcessed: false,
          isConverted: false
        }));
        
        // 添加新章节到现有章节列表
        setStory({
          ...story,
          chapters: [...chapters, ...processedChapters]
        });
        
        toast.success(`成功导入 ${processedChapters.length} 个章节`);
        setFile(null);
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
  
  const handleAIProcess = async (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.originalContent) {
      toast.error('该章节内容为空，无法处理');
      return;
    }
    
    return toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          // 模拟 AI 处理
          const processedContent = `这是 AI 处理后的主线剧情内容。\n\n${chapter.originalContent.substring(0, 100)}...\n\n这里是处理后的剧情内容示例。`;
          
          const updatedChapters = chapters.map(c => 
            c.id === chapterId 
              ? { ...c, mainStoryContent: processedContent, isProcessed: true } 
              : c
          );
          
          setStory({
            ...story,
            chapters: updatedChapters
          });
          
          resolve();
        }, 1500);
      }),
      {
        loading: 'AI 正在处理章节内容...',
        success: '处理完成！',
        error: '处理失败，请重试',
      }
    );
  };
  
  const handleMarkingToServer = async (chapterId: string) => {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter || !chapter.markedContent) {
      toast.error('互动标记内容为空，无法处理');
      return;
    }
    
    return toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
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
          resolve();
        }, 1500);
      }),
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
