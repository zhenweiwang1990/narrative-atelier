
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useInteractionMarking } from "@/hooks/story-creation/useInteractionMarking";
import InteractionMarkingHeader from "./components/InteractionMarkingHeader";
import ChapterEditorTabs from "./components/ChapterEditorTabs";
import InteractionMarkingNav from "./components/InteractionMarkingNav";

const InteractionMarking = () => {
  const {
    chapters,
    handleChapterContentChange,
    regenerateChapter,
    handlePrevious,
    handleNext
  } = useInteractionMarking();

  if (chapters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p>正在加载章节数据...</p>
        <Button onClick={handlePrevious} className="mt-4">
          返回上一步
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <InteractionMarkingHeader />

      <Card>
        <CardHeader>
          <CardTitle>章节编辑</CardTitle>
          <CardDescription>
            在文本中添加交互标记，系统将自动识别并转换为互动元素
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChapterEditorTabs 
            chapters={chapters} 
            onChapterContentChange={handleChapterContentChange}
            regenerateChapter={regenerateChapter}
          />
        </CardContent>
      </Card>

      <InteractionMarkingNav 
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />
    </div>
  );
};

export default InteractionMarking;
