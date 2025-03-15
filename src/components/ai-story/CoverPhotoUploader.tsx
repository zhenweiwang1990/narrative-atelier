
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Camera } from "lucide-react";

interface CoverPhotoUploaderProps {
  coverPhoto: string;
  isEditing: boolean;
  onCoverPhotoChange: (url: string) => void;
}

const CoverPhotoUploader: React.FC<CoverPhotoUploaderProps> = ({
  coverPhoto,
  isEditing,
  onCoverPhotoChange,
}) => {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        onCoverPhotoChange(reader.result as string);
        setShowUrlInput(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverPhotoUrlChange = () => {
    if (coverPhotoUrl) {
      onCoverPhotoChange(coverPhotoUrl);
      setCoverPhotoUrl("");
      setShowUrlInput(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        {coverPhoto ? (
          <div className="relative w-full mb-3">
            <img 
              src={coverPhoto} 
              alt="剧情封面" 
              className="object-cover w-full h-48 rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
              <Button 
                variant="secondary"
                onClick={() => document.getElementById('cover-photo-upload')?.click()}
                className="mr-2"
              >
                <Camera className="h-4 w-4 mr-2" />
                更换
              </Button>
              <Button 
                variant="secondary"
                onClick={() => setShowUrlInput(!showUrlInput)}
              >
                <Image className="h-4 w-4 mr-2" />
                URL
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed rounded-md mb-3">
            <Image className="h-10 w-10 text-muted-foreground mb-2" />
            <Button 
              variant="secondary"
              onClick={() => document.getElementById('cover-photo-upload')?.click()}
              className="mr-2"
            >
              <Camera className="h-4 w-4 mr-2" />
              上传图片
            </Button>
            <Button 
              variant="secondary"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              <Image className="h-4 w-4 mr-2" />
              输入 URL
            </Button>
          </div>
        )}

        <Input
          id="cover-photo-upload"
          type="file"
          accept="image/*"
          onChange={handleCoverPhotoChange}
          className="hidden"
        />

        {showUrlInput && (
          <div className="flex w-full mt-2">
            <Input
              placeholder="输入图片URL"
              value={coverPhotoUrl}
              onChange={(e) => setCoverPhotoUrl(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleCoverPhotoUrlChange} disabled={!coverPhotoUrl}>
              确定
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      {coverPhoto ? (
        <img 
          src={coverPhoto} 
          alt="剧情封面" 
          className="object-cover w-full h-48 rounded-md"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-md">
          <Image className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mt-2">暂无封面照片</p>
        </div>
      )}
    </div>
  );
};

export default CoverPhotoUploader;
