
import { toast } from "sonner";
import { generateAiStory, AiStoryGenerationRequest } from "./aiStoryService";
import { Story } from "@/utils/types";

export const handleAiStoryGeneration = async ({
  prompt,
  type,
  elementId,
  outcomeType,
  optionId,
  convergenceSceneId,
  endingType,
  story,
  onSuccess
}: {
  prompt: string;
  type: "branch" | "ending";
  elementId?: string;
  outcomeType?: "success" | "failure";
  optionId?: string;
  convergenceSceneId?: string;
  endingType?: "normal" | "bad";
  story: Story;
  onSuccess?: () => void;
}) => {
  try {
    const request: AiStoryGenerationRequest = {
      prompt,
      type,
      elementId: elementId || "",
      outcomeType,
      optionId,
      convergenceSceneId,
      story
    };

    const toastPromise = toast.promise(
      generateAiStory(request),
      {
        loading: type === 'branch' ? '正在生成支线...' : '正在生成结局...',
        success: () => type === 'branch' ? 'AI 支线生成成功！' : 'AI 结局生成成功！',
        error: '生成失败，请重试。'
      }
    );

    // Get the result from the promise
    const result = await toastPromise;
    
    // Proper null and type checking
    if (result) {
      // First check if result is an object with success property
      if (typeof result === 'object' && result !== null && 'success' in result) {
        // Now TypeScript knows result has a success property
        const typedResult = result as { success: boolean; message: string };
        if (typedResult.success && onSuccess) {
          onSuccess();
        }
        return typedResult;
      }
      
      // If result exists but doesn't have the right structure
      return { success: false, message: "响应格式不正确" };
    }
    
    return { success: false, message: "无响应" };
  } catch (error) {
    console.error("AI story generation error:", error);
    toast.error("生成故事时出错");
    return { success: false, message: "生成失败" };
  }
};
