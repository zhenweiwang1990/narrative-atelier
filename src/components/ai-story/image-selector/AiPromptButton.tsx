
import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AiPromptButtonProps {
  onPromptGenerated: (generatedPrompt: string) => void;
  disabled?: boolean;
}

const AiPromptButton: React.FC<AiPromptButtonProps> = ({
  onPromptGenerated,
  disabled = false
}) => {
  const handleGeneratePrompt = async () => {
    // Mock implementation - this would call a server API in production
    toast.promise(
      new Promise<string>((resolve) => {
        setTimeout(() => {
          // Mock AI-generated prompts
          const mockPrompts = [
            "一个身穿红色长袍的女巫，站在神秘的魔法森林中",
            "站在高山之巅的武士，背景是日落的天空",
            "一个古老的中式宫殿，周围环绕着樱花树",
            "一位戴着金色面具的神秘人物，站在迷雾笼罩的桥上",
            "身穿盔甲的战士骑着龙飞过山脉"
          ];
          const randomPrompt = mockPrompts[Math.floor(Math.random() * mockPrompts.length)];
          resolve(randomPrompt);
        }, 1000);
      }),
      {
        loading: "生成AI提示词中...",
        success: (prompt) => {
          onPromptGenerated(prompt);
          return "提示词生成成功！";
        },
        error: "生成提示词失败，请重试"
      }
    );
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleGeneratePrompt}
      disabled={disabled}
      title="AI生成提示词"
      className="absolute right-9 top-0"
    >
      <Sparkles className="h-4 w-4" />
    </Button>
  );
};

export default AiPromptButton;
