
import React from "react";
import FlowEditor from "@/components/flow/FlowEditor";
import { SceneType } from "@/utils/types";

interface FlowContentProps {
  onSceneSelect: (sceneId: string) => void;
  onPreviewToggle: () => void;
  onAddSceneWithType: (type?: SceneType) => void;
}

const FlowContent: React.FC<FlowContentProps> = ({
  onSceneSelect,
  onPreviewToggle,
  onAddSceneWithType
}) => {
  return (
    <div className="h-full w-full">
      <div className="border rounded-md overflow-hidden h-full">
        <FlowEditor
          onSceneSelect={onSceneSelect}
          onPreviewToggle={onPreviewToggle}
          onAddSceneWithType={onAddSceneWithType}
        />
      </div>
    </div>
  );
};

export default FlowContent;
