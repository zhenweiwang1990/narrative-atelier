
import { useStory } from "@/context/StoryContext";
import { StoryWrapper } from "@/components/layout/StoryWrapper";
import {
  StoryDetailsCard,
  StatsCard,
  QuickActionsCard,
  StoryGuideCard
} from "@/components/dashboard";

const Index = () => {
  const { story, setStory } = useStory();

  const handleUpdateStory = (updatedStory: Partial<typeof story>) => {
    if (!story || !setStory) return;

    setStory({
      ...story,
      ...updatedStory,
    });
  };

  return (
    <StoryWrapper>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">剧情概览</h1>
          <p className="text-muted-foreground">
            管理您的互动剧情元素和叙事流程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 剧情信息卡片 */}
          <StoryDetailsCard story={story} onUpdateStory={handleUpdateStory} />

          {/* 统计和快速操作 */}
          <div className="space-y-6">
            {/* 统计 */}
            <StatsCard story={story} />

            {/* 快速操作 */}
            <QuickActionsCard />
          </div>
        </div>

        {/* 使用指南 */}
        <StoryGuideCard />
      </div>
    </StoryWrapper>
  );
};

export default Index;
