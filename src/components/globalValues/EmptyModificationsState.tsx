
import React from "react";

interface EmptyModificationsStateProps {
  hasStory: boolean;
}

const EmptyModificationsState: React.FC<EmptyModificationsStateProps> = ({ hasStory }) => {
  if (!hasStory) {
    return <div className="text-center py-4">尚未加载故事数据</div>;
  }
  
  return (
    <div className="text-center py-8 text-muted-foreground">
      没有找到任何全局变量变更，请在场景元素中添加变量变更
    </div>
  );
};

export default EmptyModificationsState;
