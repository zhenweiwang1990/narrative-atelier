
import React from "react";
import { cn } from "@/lib/utils";
import { SceneElement } from "@/utils/types";
import { Handle, Position } from "reactflow";
import { MapPin, RotateCcw, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SceneNodeProps {
  data: {
    label: string;
    sceneType: string;
    locationName?: string;
    elements?: SceneElement[];
    revivalPointId?: string;
    nextSceneId?: string;
    hasNextScene?: boolean;
  };
  selected: boolean;
}

const SceneNode = ({ data, selected }: SceneNodeProps) => {
  // Check if this scene is incomplete (normal type without next scene)
  const isIncomplete = data.sceneType === "normal" && !data.hasNextScene;
  
  // 生成元素指示器为颜色块
  const renderElementIndicators = () => {
    if (!data.elements || data.elements.length === 0) return null;

    // 按顺序排序元素
    const sortedElements = [...data.elements].sort((a, b) => a.order - b.order);

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {sortedElements.map((element) => (
          <div
            key={element.id}
            className={cn(
              "w-4 h-4 rounded cursor-pointer hover:ring-2 hover:ring-primary/50",
              element.type === "narration" && "bg-gray-400",
              element.type === "dialogue" && "bg-blue-400",
              element.type === "thought" && "bg-purple-400",
              element.type === "choice" && "bg-amber-400",
              element.type === "qte" && "bg-red-400",
              element.type === "dialogueTask" && "bg-green-400"
            )}
          />
        ))}
      </div>
    );
  };

  const getNodeStyles = () => {
    switch (data.sceneType) {
      case "start":
        return "border-green-500 bg-green-50";
      case "ending":
        return "border-blue-500 bg-blue-50";
      case "bad-ending":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300";
    }
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />

      <div
        className={cn(
          "px-3 py-2 rounded-md border shadow-sm w-48",
          getNodeStyles(),
          selected && "ring-2 ring-primary"
        )}
      >
        <div className="font-medium text-sm relative">
          {data.label}
          
          {isIncomplete && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute -right-1 -top-1 bg-amber-400 rounded-full w-4 h-4 flex items-center justify-center">
                    <AlertCircle className="h-3 w-3 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">未完待续</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {data.locationName && (
          <div className="flex items-center text-[10px] text-muted-foreground mt-1">
            <MapPin className="h-3 w-3 mr-1" /> {data.locationName}
          </div>
        )}

        <div className="text-[10px] text-muted-foreground capitalize mt-1">
          {data.sceneType === "start"
            ? "开始"
            : data.sceneType === "ending"
            ? "结局"
            : data.sceneType === "bad-ending"
            ? "异常结局"
            : "普通"}
        </div>

        {data.sceneType === "bad-ending" && data.revivalPointId && (
          <div className="flex items-center text-[10px] text-red-500 mt-1">
            <RotateCcw className="h-3 w-3 mr-1" /> 复活点
          </div>
        )}

        {renderElementIndicators()}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default SceneNode;
