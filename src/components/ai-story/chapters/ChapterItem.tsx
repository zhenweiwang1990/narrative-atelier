
import React from 'react';
import { Chapter } from '@/utils/types';
import { Check, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RefreshCw, Save } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ChapterItemProps {
  chapter: Chapter;
  onChapterChange: (chapterId: string, field: keyof Chapter, value: string) => void;
  onAIProcess: (chapterId: string) => Promise<void>;
  onMarkingToServer: (chapterId: string) => Promise<void>;
}

const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  onChapterChange,
  onAIProcess,
  onMarkingToServer
}) => {
  return (
    <AccordionItem
      key={chapter.id}
      value={chapter.id}
      className="border rounded-md overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-2 hover:no-underline">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <span className="font-medium">
              <Input 
                value={chapter.title || '无标题章节'} 
                onChange={(e) => onChapterChange(chapter.id, 'title', e.target.value)}
                className="w-40 h-7 p-2 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={(e) => e.stopPropagation()}
              />
            </span>
            {chapter.isConverted && (
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full dark:bg-green-800 dark:text-green-100">
                已转换
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {chapter.isProcessed ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4">
        <Tabs defaultValue="original">
          <TabsList className="mb-4">
            <TabsTrigger value="original">原文</TabsTrigger>
            <TabsTrigger value="mainStory" disabled={!chapter.isProcessed}>文本剧情</TabsTrigger>
            <TabsTrigger value="interaction" disabled={!chapter.isProcessed}>互动标记</TabsTrigger>
            <TabsTrigger value="preview" disabled={!chapter.isProcessed}>预览</TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="space-y-4">
            <Textarea
              rows={10}
              value={chapter.originalContent}
              onChange={(e) => onChapterChange(chapter.id, 'originalContent', e.target.value)}
              className="w-full resize-none"
              placeholder="输入章节内容..."
            />

            <div className="flex justify-end">
              <Button 
                onClick={() => onAIProcess(chapter.id)}
                disabled={!chapter.originalContent}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                AI文本处理
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="mainStory" className="space-y-4">
            <Textarea
              rows={10}
              value={chapter.mainStoryContent || ''}
              onChange={(e) => onChapterChange(chapter.id, 'mainStoryContent', e.target.value)}
              className="w-full resize-none"
              placeholder="AI 处理后的主线剧情会显示在这里..."
            />
          </TabsContent>

          <TabsContent value="interaction" className="space-y-4">
            <InteractionMarkingGuide />
            
            <Textarea
              rows={10}
              value={chapter.markedContent || chapter.mainStoryContent || ''}
              onChange={(e) => onChapterChange(chapter.id, 'markedContent', e.target.value)}
              className="w-full resize-none"
              placeholder="在这里添加互动标记..."
            />

            <div className="flex justify-end">
              <Button 
                onClick={() => onMarkingToServer(chapter.id)}
                disabled={!chapter.markedContent && !chapter.mainStoryContent}
              >
                <Save className="h-4 w-4 mr-2" />
                标记入库
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="border rounded-md p-4 bg-muted/20">
              <ChapterPreview content={chapter.markedContent || chapter.mainStoryContent || ''} />
            </div>
          </TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};

const InteractionMarkingGuide = () => (
  <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md mb-2">
    <p className="font-medium mb-1">标注格式：</p>
    <p>- 分隔场景：{"<-s->"}</p>
    <p>- 选项：文本末尾使用 {"<<选项1||选项2>>"}</p>
    <p>- QTE：使用 {"<<QTE1 START>>"} 和 {"<<QTE1 END>>"} 包围QTE内容</p>
    <p>- 对话任务：使用 {"<<DialogueTask START>>"} 和 {"<<DialogueTask END>>"} 包围对话任务内容</p>
  </div>
);

const ChapterPreview: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return <p className="text-muted-foreground text-center p-4">没有内容可预览</p>;
  
  // Split content by scenes
  const scenes = content.split('<-s->');
  
  return (
    <div className="space-y-6">
      {scenes.map((scene, index) => {
        // Check for special formats
        const isQte = scene.includes('<<QTE') && scene.includes('START>>') && scene.includes('END>>');
        const isDialogueTask = scene.includes('<<DialogueTask START>>') && scene.includes('<<DialogueTask END>>');
        const hasChoices = scene.includes('<<') && scene.includes('>>') && !isQte && !isDialogueTask;
        
        // Remove the special markers for display
        let cleanContent = scene
          .replace(/<<QTE\d+ START>>/g, '')
          .replace(/<<QTE\d+ END>>/g, '')
          .replace(/<<DialogueTask START>>/g, '')
          .replace(/<<DialogueTask END>>/g, '');
        
        // Extract choices if they exist
        let choices: string[] = [];
        if (hasChoices) {
          const match = cleanContent.match(/(.+)<<(.+?)>>/);
          if (match) {
            cleanContent = match[1]; // Text before choices
            choices = match[2].split('||'); // Split choices
          }
        }
        
        return (
          <div key={index} className={`p-3 rounded-md ${getSceneClass(scene, isQte, isDialogueTask)}`}>
            {/* Main content with markdown-like formatting */}
            <div className="whitespace-pre-wrap mb-3" dangerouslySetInnerHTML={{ __html: formatMarkdown(cleanContent) }} />
            
            {/* Display choices if they exist */}
            {hasChoices && choices.length > 0 && (
              <div className="mt-2 space-y-2">
                <p className="text-sm font-medium">选择：</p>
                <div className="flex flex-wrap gap-2">
                  {choices.map((choice, idx) => (
                    <Button key={idx} variant="outline" size="sm" className="text-xs">
                      {choice}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* QTE indicator */}
            {isQte && (
              <div className="mt-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-2 py-1 rounded text-xs inline-block">
                QTE 快速反应事件
              </div>
            )}
            
            {/* Dialogue Task indicator */}
            {isDialogueTask && (
              <div className="mt-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs inline-block">
                对话任务
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const getSceneClass = (scene: string, isQte: boolean, isDialogueTask: boolean) => {
  if (isQte) return 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800';
  if (isDialogueTask) return 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800';
  if (scene.includes('## 对话')) return 'bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800';
  if (scene.includes('## 旁白')) return 'bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800';
  return 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
};

const formatMarkdown = (text: string) => {
  // Format headings
  let formatted = text.replace(/## (.+)/g, '<h3 class="text-md font-bold mb-2">$1</h3>');
  
  // Format paragraphs (add line breaks)
  formatted = formatted.replace(/\n\n/g, '<br><br>');
  
  // Format character dialogue
  formatted = formatted.replace(/([^:]+)："(.+)"/g, 
    '<span class="font-medium text-purple-700 dark:text-purple-300">$1</span>："<span>$2</span>"');
  
  return formatted;
};

export default ChapterItem;
