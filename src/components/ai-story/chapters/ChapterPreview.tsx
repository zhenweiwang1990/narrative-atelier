
import React from 'react';
import { Button } from "@/components/ui/button";

interface ChapterPreviewProps {
  content: string;
}

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

const ChapterPreview: React.FC<ChapterPreviewProps> = ({ content }) => {
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

export default ChapterPreview;
