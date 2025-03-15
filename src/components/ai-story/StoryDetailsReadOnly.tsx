
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Story } from "@/utils/types";
import CoverPhotoUploader from "./CoverPhotoUploader";

interface StoryDetailsReadOnlyProps {
  story: Story;
}

const StoryDetailsReadOnly: React.FC<StoryDetailsReadOnlyProps> = ({ story }) => {
  // Function to get UI style label
  const getUiStyleLabel = (style?: string) => {
    switch (style) {
      case 'traditional': return '古装剧风';
      case 'scifi': return '科幻风';
      case 'romance': return '甜宠风';
      case 'modern': return '现代风';
      case 'fantasy': return '奇幻风';
      default: return '未设置';
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Photo */}
      <div>
        <Label htmlFor="cover-photo">封面照片</Label>
        <div className="mt-2 border rounded-lg overflow-hidden">
          <CoverPhotoUploader 
            coverPhoto={story.coverPhoto} 
            isEditing={false} 
            onChange={() => {}} 
            aspectRatio={9/16}
          />
        </div>
      </div>

      {/* Story Information */}
      <div className="space-y-4">
        <div>
          <Label className="text-muted-foreground">标题</Label>
          <p className="mt-1 font-medium">{story.title}</p>
        </div>

        <div>
          <Label className="text-muted-foreground">作者</Label>
          <p className="mt-1">{story.author}</p>
        </div>
        
        {story.protagonistName && (
          <div>
            <Label className="text-muted-foreground">主角</Label>
            <p className="mt-1">{story.protagonistName} ({story.protagonistGender || '未设置'})</p>
          </div>
        )}
        
        <div>
          <Label className="text-muted-foreground">性向</Label>
          <p className="mt-1">
            {story.orientation === 'hetero' && '言情'}
            {story.orientation === 'yuri' && '百合'}
            {story.orientation === 'yaoi' && '耽美'}
            {story.orientation === 'none' && '无'}
          </p>
        </div>
        
        <div>
          <Label className="text-muted-foreground">UI 风格</Label>
          <p className="mt-1">{getUiStyleLabel(story.uiStyle)}</p>
        </div>
        
        {story.tags && story.tags.length > 0 && (
          <div>
            <Label className="text-muted-foreground">标签</Label>
            <div className="flex flex-wrap gap-1 mt-1">
              {story.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label className="text-muted-foreground">描述</Label>
          <p className="mt-1 whitespace-pre-wrap text-sm">
            {story.description}
          </p>
        </div>
      </div>
      
      {/* Statistics Info */}
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold mb-2">剧情统计</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">场景数量:</span>
            <span className="font-medium">{story.scenes.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">角色数量:</span>
            <span className="font-medium">{story.characters.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">地点数量:</span>
            <span className="font-medium">{story.locations.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">全局变量:</span>
            <span className="font-medium">{story.globalValues.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">章节数量:</span>
            <span className="font-medium">{story.chapters?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsReadOnly;
