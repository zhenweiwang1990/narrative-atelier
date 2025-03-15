
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Upload, ExternalLink } from "lucide-react";
import { uploadMusic } from "@/utils/soundEffects";
import { toast } from "sonner";

interface BackgroundMusicSelectorProps {
  backgroundMusic?: {
    url: string;
    name: string;
    isUploaded: boolean;
  };
  updateBackgroundMusic: (music: { url: string; name: string; isUploaded: boolean }) => void;
}

const BackgroundMusicSelector: React.FC<BackgroundMusicSelectorProps> = ({
  backgroundMusic,
  updateBackgroundMusic
}) => {
  const [urlInput, setUrlInput] = useState(backgroundMusic?.url || "");
  const [nameInput, setNameInput] = useState(backgroundMusic?.name || "");
  const [uploading, setUploading] = useState(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      toast.error("请输入有效的音乐URL");
      return;
    }

    const musicName = nameInput.trim() || "背景音乐";
    updateBackgroundMusic({
      url: urlInput,
      name: musicName,
      isUploaded: false
    });
    
    toast.success("背景音乐已更新");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is audio
    if (!file.type.startsWith("audio/")) {
      toast.error("请上传音频文件");
      return;
    }
    
    setUploading(true);
    
    try {
      const result = await uploadMusic(file);
      updateBackgroundMusic({
        url: result.url,
        name: result.name,
        isUploaded: true
      });
      toast.success("音乐上传成功");
    } catch (error) {
      toast.error("上传失败，请重试");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="backgroundMusic">背景音乐</Label>
        {backgroundMusic?.url && (
          <div className="flex items-center space-x-2">
            <audio
              controls
              src={backgroundMusic.url}
              className="h-8 w-40"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(backgroundMusic.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="url" className="text-xs">
            <ExternalLink className="h-3 w-3 mr-1" /> URL 链接
          </TabsTrigger>
          <TabsTrigger value="upload" className="text-xs">
            <Upload className="h-3 w-3 mr-1" /> 上传文件
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-2 mt-2">
          <form onSubmit={handleUrlSubmit} className="space-y-2">
            <Input
              id="musicUrl"
              placeholder="输入音乐URL"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <Input
              id="musicName"
              placeholder="音乐名称（可选）"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <Button type="submit" size="sm" className="w-full">
              <Music className="h-4 w-4 mr-2" /> 设置音乐
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="upload" className="mt-2">
          <div className="border border-dashed rounded-md p-4 text-center">
            <Label 
              htmlFor="musicUpload" 
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <span className="text-sm font-medium">点击上传音乐文件</span>
              <span className="text-xs text-muted-foreground mt-1">
                支持 MP3, WAV, OGG 格式
              </span>
            </Label>
            <Input
              id="musicUpload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            {uploading && (
              <div className="mt-2 text-sm text-muted-foreground">
                上传中，请稍候...
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundMusicSelector;
