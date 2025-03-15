
import { Story } from '@/utils/types';
import { toast } from 'sonner';
import { processImportedStory } from './storyOperations';

/**
 * Handles file reading for story import
 */
export const readStoryFile = (
  file: File, 
  existingStories: Story[], 
  onSuccess: (importedStory: Story, updatedStories: Story[]) => void, 
  onError: (message: string) => void
): void => {
  const reader = new FileReader();
  
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target?.result as string);
      const result = processImportedStory(importedData, existingStories);
      
      if (result) {
        const { importedStory, updatedStories } = result;
        onSuccess(importedStory, updatedStories);
        toast.success('导入剧情成功');
      } else {
        onError('导入剧情失败，文件格式错误');
        toast.error('导入剧情失败，文件格式错误');
      }
    } catch (error) {
      console.error('Failed to parse imported story:', error);
      onError('导入剧情失败，文件格式错误');
      toast.error('导入剧情失败，文件格式错误');
    }
  };
  
  reader.onerror = () => {
    onError('读取文件失败');
    toast.error('读取文件失败');
  };
  
  reader.readAsText(file);
};

/**
 * Exports a story as a JSON file for download
 */
export const exportStoryAsFile = (story: Story): void => {
  try {
    // 创建JSON blob并触发下载
    const content = JSON.stringify(story, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title || "narrative-atelier"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('导出剧情成功');
  } catch (error) {
    console.error('Failed to export story:', error);
    toast.error('导出剧情失败');
  }
};
