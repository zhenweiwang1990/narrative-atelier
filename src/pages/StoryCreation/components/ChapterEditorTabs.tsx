
import React from 'react';
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextMarkerContextMenu from "@/components/ai-story/chapters/TextMarkerContextMenu";
import InteractionMarkingGuide from "@/components/ai-story/chapters/InteractionMarkingGuide";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations: string[];
}

interface ChapterEditorTabsProps {
  chapters: ChapterData[];
  onChapterContentChange: (index: number, newContent: string) => void;
  regenerateChapter: (index: number) => Promise<void>;
}

const ChapterEditorTabs: React.FC<ChapterEditorTabsProps> = ({
  chapters,
  onChapterContentChange,
  regenerateChapter
}) => {
  if (chapters.length === 0) {
    return <div>No chapters available</div>;
  }

  return (
    <Tabs defaultValue={chapters[0]?.id}>
      <TabsList className="mb-4 flex flex-wrap h-auto">
        {chapters.map((chapter) => (
          <TabsTrigger key={chapter.id} value={chapter.id} className="mb-1">
            {chapter.title}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {chapters.map((chapter, index) => (
        <TabsContent key={chapter.id} value={chapter.id}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">{chapter.title}</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => regenerateChapter(index)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                重新生成
              </Button>
            </div>
            
            <TextMarkerContextMenu
              value={chapter.content}
              onChange={(newContent) => onChapterContentChange(index, newContent)}
              className="h-[50vh] resize-none"
            />
            
            <InteractionMarkingGuide />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ChapterEditorTabs;
