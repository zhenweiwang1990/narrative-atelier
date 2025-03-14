
import React from 'react';

const EmptyElementsState: React.FC = () => {
  return (
    <div className="text-center py-6 bg-muted/30 rounded-lg border border-dashed">
      <p className="text-sm text-muted-foreground">暂无元素。添加您的第一个场景元素。</p>
    </div>
  );
};

export default EmptyElementsState;
