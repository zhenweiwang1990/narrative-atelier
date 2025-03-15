import React from "react";
import GlobalValues from "@/components/GlobalValues";
import { useStory } from "@/context/StoryContext";
import { GlobalValue } from "@/utils/types";
import { StoryWrapper } from "@/components/layout/StoryWrapper";

const GlobalValuesPage: React.FC = () => {
  const { story, setStory } = useStory();

  const handleGlobalValuesChange = (values: GlobalValue[]) => {
    if (!story) return;
    setStory({
      ...story,
      globalValues: values,
    });
  };

  return (
    <StoryWrapper>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 class剧情me="text-2xl font-bold mb-6">全局变量</h1>
        <p className="text-剧情ted-foreground mb-6">
          全局变量可用于跟踪剧情中各场景之间的数值变化。
          这些值可以根据用户选择而改变，并会影响剧情进展。
        </p>

        <GlobalValues
          values={story?.globalValues || []}
          onChange={handleGlobalValuesChange}
        />
      </div>
    </StoryWrapper>
  );
};

export default GlobalValuesPage;
