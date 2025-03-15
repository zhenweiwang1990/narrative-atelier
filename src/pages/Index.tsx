import { useState } from "react";
import { useStory } from "@/contexts/StoryContext";
import StoryDetails from "@/components/ai-story/StoryDetails";
import ChaptersList from "@/components/ai-story/ChaptersList";

const Index = () => {
  const { story, setStory } = useStory();

  if (!story) return null;

  const handleStoryUpdate = (updatedStoryData: Partial<typeof story>) => {
    if (!story || !setStory) return;

    setStory({
      ...story,
      ...updatedStoryData
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">剧情概览</h1>
        <p className="text-muted-foreground">
          管理您的互动剧情元素和叙事流程。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 左侧区域：剧情详情 */}
        <StoryDetails 
          story={story} 
          onSave={handleStoryUpdate} 
        />

        {/* 右侧区域：章节管理 */}
        <div className="md:col-span-2">
          <ChaptersList 
            story={story}
            setStory={setStory}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
