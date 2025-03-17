
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Wand2 } from "lucide-react";
import ImageStyleGrid, { ImageStyle } from "./ImageStyleGrid";
import AiPromptButton from "./AiPromptButton";

interface AiTabProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  selectedStyle: string | null;
  setSelectedStyle: (styleId: string) => void;
  imageStyles: ImageStyle[];
  isGenerating: boolean;
  handleGenerateImages: () => void;
}

const AiTab: React.FC<AiTabProps> = ({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  imageStyles,
  isGenerating,
  handleGenerateImages
}) => {
  return (
    <div className="space-y-4">
      {/* 风格选择 */}
      <div className="space-y-2">
        <Label>选择风格</Label>
        <ImageStyleGrid 
          styles={imageStyles}
          selectedStyle={selectedStyle}
          onStyleSelect={setSelectedStyle}
        />
      </div>
      
      {/* 提示输入 */}
      <div className="space-y-2">
        <Label htmlFor="ai-prompt">描述你想要的图片</Label>
        <div className="relative">
          <Input 
            id="ai-prompt" 
            placeholder="例如：一个身穿红色长袍的女巫，站在神秘的魔法森林中" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <AiPromptButton 
            onPromptGenerated={setPrompt}
            disabled={isGenerating}
          />
        </div>
      </div>
      
      {/* 生成按钮 */}
      <Button 
        onClick={handleGenerateImages} 
        disabled={!prompt || !selectedStyle || isGenerating}
        className="w-full"
      >
        {isGenerating ? (
          <>
            <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
            生成中...
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4 mr-2" />
            生成图片
          </>
        )}
      </Button>
    </div>
  );
};

export default AiTab;
