
import React from 'react';
import GlobalValues from '@/components/GlobalValues';
import { useStory } from '@/components/Layout';
import { GlobalValue } from '@/utils/types';

const GlobalValuesPage: React.FC = () => {
  const { story, setStory } = useStory();
  
  const handleGlobalValuesChange = (values: GlobalValue[]) => {
    if (!story) return;
    setStory({
      ...story,
      globalValues: values
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Global Values</h1>
      <p className="text-muted-foreground mb-6">
        Global values can be used to track numerical values across scenes in your story.
        These values can change based on user choices and can affect story progression.
      </p>
      
      <GlobalValues
        values={story?.globalValues || []}
        onChange={handleGlobalValuesChange}
      />
    </div>
  );
};

export default GlobalValuesPage;
