
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
    
    // Check that result is not null and is an object with a success property before accessing it
    if (result && typeof result === 'object' && 'success' in result) {
      // Now TypeScript knows result is not null inside this block
      if (result.success && onSuccess) {
        onSuccess();
      }
    }
    
    return result;
  } catch (error) {
    console.error("AI story generation error:", error);
    toast.error("生成故事时出错");
    return { success: false, message: "生成失败" };
  }
};
