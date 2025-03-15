
import React from "react";
import { Edit } from "lucide-react";

const SceneEditHint: React.FC = () => {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
      <Edit className="h-3 w-3" />
      <span>在图表中设置场景连接，或切换到内容选项卡。</span>
    </div>
  );
};

export default SceneEditHint;
