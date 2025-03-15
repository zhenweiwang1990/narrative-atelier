
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStory } from '@/hooks/auth/types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Edit, Trash2, Image, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface StoryCardProps {
  story: UserStory;
  userId: string;
  onEdit: (story: UserStory) => void;
  onDelete: (storyId: string) => void;
  refreshStories: () => Promise<void>;
}

export const StoryCard: React.FC<StoryCardProps> = ({ 
  story, 
  userId, 
  onEdit, 
  onDelete, 
  refreshStories 
}) => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenStory = (slug: string) => {
    navigate(`/editor/${slug}`);
  };

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    setIsUploading(true);
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `cover_${story.id}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `story_covers/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('story_covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicURLData } = supabase.storage
        .from('story_covers')
        .getPublicUrl(filePath);

      // Update story with cover image URL
      const { error: updateError } = await supabase
        .from('stories')
        .update({ cover_image: publicURLData.publicUrl })
        .eq('id', story.id)
        .eq('user_id', userId);

      if (updateError) throw updateError;

      await refreshStories();
      toast({
        title: "封面已更新",
        description: "剧情封面图片已成功更新"
      });
    } catch (error: any) {
      console.error('Error uploading cover image:', error);
      toast({
        title: "上传失败",
        description: error.message || "无法上传封面图片",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col">
      <div 
        className="h-40 bg-gray-100 relative flex items-center justify-center overflow-hidden"
        style={story.cover_image ? {
          backgroundImage: `url(${story.cover_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        {!story.cover_image && (
          <BookOpen className="h-12 w-12 text-gray-400" />
        )}
        <div className="absolute top-2 right-2">
          <input
            type="file"
            id={`cover-upload-${story.id}`}
            className="hidden"
            accept="image/*"
            onChange={handleCoverImageUpload}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => document.getElementById(`cover-upload-${story.id}`)?.click()}
            disabled={isUploading}
            className="opacity-80 hover:opacity-100"
          >
            <Image className="h-4 w-4 mr-1" />
            {isUploading ? '上传中...' : '设置封面'}
          </Button>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>
          {story.author ? `作者: ${story.author}` : '未设置作者'}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {story.description || '暂无描述'}
        </p>
        <div className="text-xs text-muted-foreground mt-2">
          上次更新: {new Date(story.updated_at).toLocaleString('zh-CN')}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(story)}>
          <Edit className="h-4 w-4 mr-1" />
          编辑信息
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete(story.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => handleOpenStory(story.slug as string)}
          >
            <BookOpen className="h-4 w-4 mr-1" />
            打开
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
