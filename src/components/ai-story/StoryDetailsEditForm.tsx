
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StoryTagsSelector from "@/components/ai-story/StoryTagsSelector";
import { Story } from "@/utils/types";
import CoverPhotoUploader from "./CoverPhotoUploader";

interface StoryDetailsEditFormProps {
  story: Story;
  title: string;
  setTitle: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  coverPhoto: string;
  setCoverPhoto: (value: string) => void;
  protagonistName: string;
  setProtagonistName: (value: string) => void;
  protagonistGender: string;
  setProtagonistGender: (value: string) => void;
  orientation: string;
  setOrientation: (value: "hetero" | "yuri" | "yaoi" | "none") => void;
  tags: string[];
  setTags: (value: string[]) => void;
}

const StoryDetailsEditForm: React.FC<StoryDetailsEditFormProps> = ({
  story,
  title,
  setTitle,
  author,
  setAuthor,
  description,
  setDescription,
  coverPhoto,
  setCoverPhoto,
  protagonistName,
  setProtagonistName,
  protagonistGender,
  setProtagonistGender,
  orientation,
  setOrientation,
  tags,
  setTags
}) => {
  return (
    <div className="space-y-6">
      {/* Cover Photo */}
      <div>
        <Label htmlFor="cover-photo">封面照片</Label>
        <div className="mt-2 border rounded-lg overflow-hidden">
          <CoverPhotoUploader 
            coverPhoto={coverPhoto} 
            isEditing={true} 
            onChange={setCoverPhoto} 
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="author">作者</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="protagonist">主角姓名</Label>
          <Input
            id="protagonist"
            value={protagonistName}
            onChange={(e) => setProtagonistName(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label>主角性别</Label>
          <RadioGroup 
            value={protagonistGender} 
            onValueChange={setProtagonistGender}
            className="flex space-x-4 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="男" id="male" />
              <Label htmlFor="male" className="cursor-pointer">男</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="女" id="female" />
              <Label htmlFor="female" className="cursor-pointer">女</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="orientation">剧情性向</Label>
          <Select 
            value={orientation} 
            onValueChange={(value: "hetero" | "yuri" | "yaoi" | "none") => setOrientation(value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="选择剧情性向" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hetero">言情</SelectItem>
              <SelectItem value="yuri">百合</SelectItem>
              <SelectItem value="yaoi">耽美</SelectItem>
              <SelectItem value="none">无</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>剧情标签</Label>
          <div className="mt-1">
            <StoryTagsSelector 
              selectedTags={tags} 
              onChange={setTags} 
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">描述</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsEditForm;
