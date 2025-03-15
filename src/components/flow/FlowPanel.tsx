
import React from "react";
import { Panel } from "reactflow";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Eye, LayoutGrid, CheckSquare, XSquare } from "lucide-react";
import { SceneNodeData } from "./flowTypes";
import { Node } from "reactflow";

interface FlowPanelProps {
  selectedNode: Node<SceneNodeData> | null;
  onAddScene: (type?: 'normal' | 'ending' | 'bad-ending') => void;
  onDeleteScene: () => void;
  onPreviewToggle?: () => void;
  onAutoArrange?: () => void;
}

const FlowPanel: React.FC<FlowPanelProps> = ({
  selectedNode,
  onAddScene,
  onDeleteScene,
  onPreviewToggle,
  onAutoArrange,
}) => {
  return (
    <Panel
      position="top-left"
      className="bg-white dark:bg-card p-2 rounded-md shadow-sm flex items-center gap-2 border dark:border-muted"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddScene('normal')}
        className="h-8 text-xs"
      >
        <Plus className="h-4 w-4 mr-1" /> 添加场景
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddScene('ending')}
        className="h-8 text-xs"
      >
        <CheckSquare className="h-4 w-4 mr-1" /> 正常结局
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onAddScene('bad-ending')}
        className="h-8 text-xs"
      >
        <XSquare className="h-4 w-4 mr-1" /> 异常结局
      </Button>

      {selectedNode && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs text-destructive border-destructive hover:bg-destructive/10"
          onClick={onDeleteScene}
        >
          <Trash className="h-4 w-4 mr-1" /> 删除场景
        </Button>
      )}

      {onPreviewToggle && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={onPreviewToggle}
        >
          <Eye className="h-4 w-4 mr-1" /> 显隐预览
        </Button>
      )}

      {onAutoArrange && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={onAutoArrange}
        >
          <LayoutGrid className="h-4 w-4 mr-1" /> 自动排列
        </Button>
      )}
    </Panel>
  );
};

export default FlowPanel;
