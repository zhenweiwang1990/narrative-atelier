
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UrlTab from "./image-selector/UrlTab";
import UploadTab from "./image-selector/UploadTab";
import AiTab from "./image-selector/AiTab";
import MediaLibraryTab from "./image-selector/MediaLibraryTab";
import AiResultsView from "./image-selector/AiResultsView";
import LightboxDialog from "./image-selector/LightboxDialog";
import { IMAGE_STYLES } from "./image-selector/constants";

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
  const [showAiResults, setShowAiResults] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
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
      setShowAiResults(true);
    }, 2000);
  };
  
  const handleRegenerateImages = () => {
    setSelectedGeneratedImage(null);
    setShowAiResults(false);
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
  
  const handleOpenLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
  };
  
  const handleCloseLightbox = () => {
    setLightboxImage(null);
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
    setShowAiResults(false);
    setLightboxImage(null);
  };
  
  return (
    <>
      <Dialog 
        open={open} 
        onOpenChange={(newOpen) => {
          if (!newOpen) {
            resetDialogState();
          }
          onOpenChange(newOpen);
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          {activeTab === "ai" && showAiResults ? (
            <AiResultsView
              generatedImages={generatedImages}
              selectedGeneratedImage={selectedGeneratedImage}
              onSelectImage={handleSelectGeneratedImage}
              onOpenLightbox={handleOpenLightbox}
              onRegenerateImages={handleRegenerateImages}
              onConfirmImage={handleConfirmGeneratedImage}
              aspectRatio={aspectRatio}
            />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="url">输入网址</TabsTrigger>
                <TabsTrigger value="upload">上传图片</TabsTrigger>
                <TabsTrigger value="ai">AI生成</TabsTrigger>
                <TabsTrigger value="library">素材库</TabsTrigger>
              </TabsList>
              
              <TabsContent value="url">
                <UrlTab
                  urlInput={urlInput}
                  setUrlInput={setUrlInput}
                  handleUrlConfirm={handleUrlConfirm}
                  aspectRatio={aspectRatio}
                />
              </TabsContent>
              
              <TabsContent value="upload">
                <UploadTab
                  filePreview={filePreview}
                  handleFileChange={handleFileChange}
                  handleFileUpload={handleFileUpload}
                  aspectRatio={aspectRatio}
                />
              </TabsContent>
              
              <TabsContent value="ai">
                <AiTab
                  prompt={prompt}
                  setPrompt={setPrompt}
                  selectedStyle={selectedStyle}
                  setSelectedStyle={setSelectedStyle}
                  imageStyles={IMAGE_STYLES}
                  isGenerating={isGenerating}
                  handleGenerateImages={handleGenerateImages}
                />
              </TabsContent>
              
              <TabsContent value="library">
                <MediaLibraryTab
                  onImageSelected={onImageSelected}
                  aspectRatio={aspectRatio}
                />
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      <LightboxDialog
        imageUrl={lightboxImage}
        onClose={handleCloseLightbox}
      />
    </>
  );
};

export default ImageSelectorDialog;
