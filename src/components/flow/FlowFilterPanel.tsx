
import React from "react";
import { Panel } from "reactflow";
import { Button } from "@/components/ui/button";
import { Filter, CheckSquare, XSquare, PlusSquare } from "lucide-react";
import { SceneFilterOption } from "./FlowEditor";

interface FlowFilterPanelProps {
  filterOption: SceneFilterOption;
  onFilterChange: (option: SceneFilterOption) => void;
}

const FlowFilterPanel: React.FC<FlowFilterPanelProps> = ({
  filterOption,
  onFilterChange
}) => {
  return (
    <Panel
      position="top-right"
      className="bg-white p-2 rounded-md shadow-sm flex items-center gap-2"
    >
      <div className="flex items-center mr-1">
        <Filter className="h-4 w-4 mr-1 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">筛选:</span>
      </div>

      <Button
        variant={filterOption === 'all' ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange('all')}
        className="h-8 text-xs"
      >
        <PlusSquare className="h-4 w-4 mr-1" /> 全部场景
      </Button>

      <Button
        variant={filterOption === 'endings' ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange('endings')}
        className="h-8 text-xs"
      >
        <CheckSquare className="h-4 w-4 mr-1" /> 只显示结局
      </Button>

      <Button
        variant={filterOption === 'incomplete' ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange('incomplete')}
        className="h-8 text-xs"
      >
        <XSquare className="h-4 w-4 mr-1" /> 只显示未完待续
      </Button>
    </Panel>
  );
};

export default FlowFilterPanel;
