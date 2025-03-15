
// This is a stub for the AI story generation service client
// It will be replaced with actual implementation when connecting to the backend

import { toast } from "sonner";
import { Story } from "@/utils/types";

interface AiStoryGenerationOptions {
  prompt: string;
  type: "branch" | "ending";
  elementId?: string;
  story: Story;
  onSuccess?: () => void;
}

interface AiGenerationResult {
  success: boolean;
  chapters?: Array<{
    title: string;
    content: string;
  }>;
  error?: string;
}

// Mock function to handle AI story generation
export const handleAiStoryGeneration = async (options: AiStoryGenerationOptions): Promise<AiGenerationResult> => {
  const { prompt, type, elementId, story, onSuccess } = options;
  
  // In a real implementation, this would call the backend API
  console.log(`AI Story Generation Request:`, {
    prompt,
    type,
    elementId,
    storyId: story.id
  });
  
  // Mock success after a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For demonstration, return a mock success result with sample formatted chapters
  const result: AiGenerationResult = {
    success: true,
    chapters: [
      {
        title: "噩梦惊醒",
        content: `## 旁白
你又开始做噩梦了，眼前是无尽的黑暗。极致的痛涌上身躯，仿佛无数尖锐细小的刀片剜入骨缝。  
这疼痛从四肢百骸一直蔓延到心口，你却完全无法动弹，也无法叫喊。  

<-s->

## 对话
成喜："姑娘，姑娘是不是做噩梦了？"  
成喜："衣服都湿透了，姑娘先脱了换一身干的吧，不然会着凉的。"  

<-s->

## 旁白
噩梦的痛像余韵一样还留在你的身体里，你一动不动。  
成喜替你换上了干净衣衫，看到你毫无反应的模样，心里越发慌乱。  
她该怎么办？<<去找大夫||继续照顾你>>

<-s->

<<QTE1 START>>
## 旁白
一阵尖锐的声音突然从窗外传来。你感觉到有危险逼近，必须立刻做出反应！
<<QTE1 END>>

<-s->

<<DialogueTask START>>
## 对话任务
目标：说服成喜不要离开
成喜心烦意乱，想要离开，你必须找到正确的话语挽留她。
<<DialogueTask END>>`
      },
      {
        title: "雪泉弓",
        content: `## 旁白
你的眼珠终于轻轻动了动，你慢慢下榻，走到旁边的木架前，把目光落在那把雪泉弓上。  
这把黑亮的弓用绝佳的柘木打造，弓身光滑，触手微凉。  

<-s->

## 主角漼时宜行动指令
拿起雪泉弓

<-s->

## 旁白
你双手捧起雪泉弓，缓缓拉动弓弦，微微的颤动让寂静的空气中发出一声细响。你抬起头，目光定定地注视着前方，仿佛黑夜中隐忍的兽，带着几分倔强的倨傲。  
什么选择？<<离开房间||继续沉思>>`
      }
    ]
  };
  
  if (result.success && onSuccess) {
    onSuccess();
  }
  
  return result;
};

// Parse the AI-generated content with special markers
export const parseAiGeneratedContent = (content: string) => {
  // Split content by scene separator
  const scenes = content.split('<-s->').map(scene => scene.trim());
  
  // Process each scene for choices, QTE, and dialogue tasks
  const processedScenes = scenes.map(scene => {
    // Handle choices (format: text<<option1||option2>>)
    const choicePattern = /(.+)<<(.+?)>>/;
    const choiceMatch = scene.match(choicePattern);
    
    // Handle QTE sections
    const qteStartPattern = /<<QTE\d+ START>>/;
    const qteEndPattern = /<<QTE\d+ END>>/;
    const hasQte = qteStartPattern.test(scene) && qteEndPattern.test(scene);
    
    // Handle Dialogue Task sections
    const dialogueTaskStartPattern = /<<DialogueTask START>>/;
    const dialogueTaskEndPattern = /<<DialogueTask END>>/;
    const hasDialogueTask = dialogueTaskStartPattern.test(scene) && dialogueTaskEndPattern.test(scene);
    
    return {
      content: scene,
      hasChoice: !!choiceMatch,
      choices: choiceMatch ? choiceMatch[2].split('||') : [],
      hasQte,
      hasDialogueTask
    };
  });
  
  return processedScenes;
};
