
import { toast } from "sonner";
import { Chapter, Story } from '@/utils/types';
import { handleAiStoryGeneration } from '@/services/aiStoryServiceClient';

export function useChapterAIProcessing(
  story: Story,
  setStory: (story: Story) => void
) {
  const handleAIProcess = async (chapterId: string): Promise<void> => {
    const chapters = story.chapters || [];
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
  
  const handleMarkingToServer = async (chapterId: string): Promise<void> => {
    const chapters = story.chapters || [];
    const chapter = chapters.find(c => c.id === chapterId);
    
    if (!chapter || !chapter.markedContent && !chapter.mainStoryContent) {
      toast.error('互动标记内容为空，无法处理');
      return;
    }
    
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

  return {
    handleAIProcess,
    handleMarkingToServer
  };
}
