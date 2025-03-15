
import React from 'react';
import { Story } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface StoryPreviewProps {
  story: Story;
  isEditing: boolean;
  title: string;
  author: string;
  description: string;
  setTitle: (title: string) => void;
  setAuthor: (author: string) => void;
  setDescription: (description: string) => void;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({
  story,
  isEditing,
  title,
  author,
  description,
  setTitle,
  setAuthor,
  setDescription
}) => {
  return (
    <Card className="md:col-span-2 h-full">
      <CardHeader>
        <CardTitle>剧情详情预览</CardTitle>
      </CardHeader>
      <CardContent className="prose max-w-none">
        <div className="rounded-lg bg-card p-6 shadow-sm border">
          <h1 className="text-3xl font-bold mb-2">{isEditing ? title : story.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-sm text-muted-foreground mr-2">作者:</span>
            <span className="font-medium">{isEditing ? author : story.author}</span>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">剧情简介</h3>
            <p className="whitespace-pre-wrap">{isEditing ? description : story.description}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">基本信息</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><span className="text-muted-foreground">场景数量:</span> {story.scenes.length}</li>
              <li><span className="text-muted-foreground">角色数量:</span> {story.characters.length}</li>
              <li><span className="text-muted-foreground">地点数量:</span> {story.locations.length}</li>
              <li><span className="text-muted-foreground">全局变量:</span> {story.globalValues.length}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryPreview;
