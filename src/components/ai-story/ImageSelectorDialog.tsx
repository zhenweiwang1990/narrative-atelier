
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Check, Image as ImageIcon, RefreshCcw, Upload, Wand2 } from "lucide-react";

interface ImageStyle {
  id: string;
  name: string;
  previewUrl: string;
}

const IMAGE_STYLES: ImageStyle[] = [
  { id: "portrait", name: "人像摄影", previewUrl: "https://via.placeholder.com/100x100?text=人像摄影" },
  { id: "movie", name: "电影写真", previewUrl: "https://via.placeholder.com/100x100?text=电影写真" },
  { id: "chinese", name: "中国风", previewUrl: "https://via.placeholder.com/100x100?text=中国风" },
  { id: "anime", name: "动漫", previewUrl: "https://via.placeholder.com/100x100?text=动漫" },
  { id: "3d", name: "3D", previewUrl: "https://via.placeholder.com/100x100?text=3D" },
  { id: "cyberpunk", name: "赛博朋克", previewUrl: "https://via.placeholder.com/100x100?text=赛博朋克" },
  { id: "cg", name: "CG动画", previewUrl: "https://via.placeholder.com/100x100?text=CG动画" },
  { id: "ink", name: "水墨画", previewUrl: "https://via.placeholder.com/100x100?text=水墨画" },
  { id: "cartoon", name: "卡通", previewUrl: "https://via.placeholder.com/100x100?text=卡通" },
  { id: "landscape", name: "风景", previewUrl: "https://via.placeholder.com/100x100?text=风景" },
  { id: "hk-anime", name: "港风动漫", previewUrl: "https://via.placeholder.com/100x100?text=港风动漫" },
  { id: "pixel", name: "像素风", previewUrl: "https://via.placeholder.com/100x100?text=像素风" },
  { id: "figure", name: "手办", previewUrl: "https://via.placeholder.com/100x100?text=手办" },
  { id: "anime2", name: "二次元", previewUrl: "https://via.placeholder.com/100x100?text=二次元" },
];

interface ImageSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageSelected: (imageUrl: string) => void;
  aspectRatio?: number; // Default is 9/16
  title?: string;
}

const ImageSelectorDialog: React.FC<ImageSelectorDialogProps> = ({
  open,
  onOpenChange,
  onImageSelected,
  aspectRatio = 9/16,
  title = "选择图片"
}) => {
  const [activeTab, setActiveTab] = useState<string>("url");
  const [urlInput, setUrlInput] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  // AI generation states
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedGeneratedImage, setSelectedGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const handleUrlConfirm = () => {
    if (urlInput.trim()) {
      onImageSelected(urlInput);
      onOpenChange(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFilePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFileUpload = () => {
    if (filePreview) {
      // TODO: Implement actual file upload to server
      // For now, just pass the data URL
      onImageSelected(filePreview);
      onOpenChange(false);
    }
  };
  
  const handleGenerateImages = () => {
    if (!prompt || !selectedStyle) return;
    
    setIsGenerating(true);
    
    // TODO: Implement actual AI image generation API call
    // For demo purposes, we'll simulate generation with placeholders
    setTimeout(() => {
      setGeneratedImages([
        `https://via.placeholder.com/400x${Math.round(400/aspectRatio)}?text=AI生成图1`,
        `https://via.placeholder.com/400x${Math.round(400/aspectRatio)}?text=AI生成图2`,
        `https://via.placeholder.com/400x${Math.round(400/aspectRatio)}?text=AI生成图3`,
        `https://via.placeholder.com/400x${Math.round(400/aspectRatio)}?text=AI生成图4`
      ]);
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleRegenerateImages = () => {
    setSelectedGeneratedImage(null);
    handleGenerateImages();
  };
  
  const handleSelectGeneratedImage = (imageUrl: string) => {
    setSelectedGeneratedImage(imageUrl);
  };
  
  const handleConfirmGeneratedImage = () => {
    if (selectedGeneratedImage) {
      onImageSelected(selectedGeneratedImage);
      onOpenChange(false);
    }
  };
  
  const resetDialogState = () => {
    setUrlInput("");
    setSelectedFile(null);
    setFilePreview(null);
    setPrompt("");
    setSelectedStyle(null);
    setGeneratedImages([]);
    setSelectedGeneratedImage(null);
    setIsGenerating(false);
  };
  
  return (
    <Dialog 
      open={open} 
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          resetDialogState();
        }
        onOpenChange(newOpen);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="url">输入网址</TabsTrigger>
            <TabsTrigger value="upload">上传图片</TabsTrigger>
            <TabsTrigger value="ai">AI生成</TabsTrigger>
          </TabsList>
          
          {/* URL Tab */}
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-url">图片URL</Label>
              <Input 
                id="image-url" 
                placeholder="https://example.com/image.jpg" 
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
            
            {urlInput && (
              <div className="border rounded-md overflow-hidden">
                <AspectRatio ratio={aspectRatio}>
                  <img 
                    src={urlInput} 
                    alt="预览" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x600?text=加载失败";
                    }}
                  />
                </AspectRatio>
              </div>
            )}
            
            <DialogFooter>
              <Button onClick={handleUrlConfirm} disabled={!urlInput.trim()}>确认</Button>
            </DialogFooter>
          </TabsContent>
          
          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">上传图片</Label>
              <div className="grid w-full items-center gap-1.5">
                <label 
                  htmlFor="image-upload" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">点击上传</span> 或拖放图片
                    </p>
                  </div>
                  <input 
                    id="image-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            
            {filePreview && (
              <div className="border rounded-md overflow-hidden">
                <AspectRatio ratio={aspectRatio}>
                  <img 
                    src={filePreview} 
                    alt="预览" 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
            )}
            
            <DialogFooter>
              <Button onClick={handleFileUpload} disabled={!filePreview}>上传</Button>
            </DialogFooter>
          </TabsContent>
          
          {/* AI Generation Tab */}
          <TabsContent value="ai" className="space-y-4">
            {/* Style Selection */}
            <div className="space-y-2">
              <Label>选择风格</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {IMAGE_STYLES.map((style) => (
                  <div 
                    key={style.id}
                    className={`relative cursor-pointer rounded-md overflow-hidden transition-all ${
                      selectedStyle === style.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <AspectRatio ratio={1}>
                      <img 
                        src={style.previewUrl} 
                        alt={style.name} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white font-medium">{style.name}</span>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Prompt Input */}
            <div className="space-y-2">
              <Label htmlFor="ai-prompt">描述你想要的图片</Label>
              <Input 
                id="ai-prompt" 
                placeholder="例如：一个身穿红色长袍的女巫，站在神秘的魔法森林中" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            {/* Generate Button */}
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
            
            {/* Generated Images */}
            {generatedImages.length > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {generatedImages.map((imageUrl, index) => (
                    <div 
                      key={index}
                      className={`relative cursor-pointer rounded-md overflow-hidden transition-all ${
                        selectedGeneratedImage === imageUrl ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleSelectGeneratedImage(imageUrl)}
                    >
                      <AspectRatio ratio={aspectRatio}>
                        <img 
                          src={imageUrl} 
                          alt={`生成图${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                      {selectedGeneratedImage === imageUrl && (
                        <div className="absolute top-1 right-1 bg-primary rounded-full p-0.5">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={handleRegenerateImages}
                    disabled={isGenerating}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    重新生成
                  </Button>
                  
                  <Button 
                    onClick={handleConfirmGeneratedImage}
                    disabled={!selectedGeneratedImage}
                  >
                    使用选中图片
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ImageSelectorDialog;
