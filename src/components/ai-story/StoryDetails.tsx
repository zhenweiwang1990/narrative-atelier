
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Edit, Save } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import StoryTagsSelector from "@/components/ai-story/StoryTagsSelector";
import { Story } from "@/utils/types";
import CoverPhotoUploader from "./CoverPhotoUploader";

interface StoryDetailsProps {
  story: Story;
  onSave: (updatedStory: Partial<Story>) => void;
}

const StoryDetails: React.FC<StoryDetailsProps> = ({ story, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || "");
  const [author, setAuthor] = useState(story?.author || "");
  const [description, setDescription] = useState(story?.description || "");
  const [coverPhoto, setCoverPhoto] = useState(story?.coverPhoto || "");
  const [protagonistName, setProtagonistName] = useState(story?.protagonistName || "");
  const [protagonistGender, setProtagonistGender] = useState(story?.protagonistGender || "男");
  const [orientation, setOrientation] = useState(story?.orientation || "hetero");
  const [tags, setTags] = useState(story?.tags || []);

  const handleSave = () => {
    onSave({
      title,
      author,
      description,
      coverPhoto,
      protagonistName,
      protagonistGender,
      orientation,
      tags
    });

    setIsEditing(false);
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>剧情详情</CardTitle>
            <CardDescription>基本信息及设置</CardDescription>
          </div>

          {!isEditing ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" /> 保存
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 封面照片 */}
        <div>
          <Label htmlFor="cover-photo">封面照片</Label>
          <div className="mt-2 border rounded-lg overflow-hidden">
            <CoverPhotoUploader 
              coverPhoto={coverPhoto} 
              isEditing={isEditing} 
              onCoverPhotoChange={setCoverPhoto} 
            />
          </div>
        </div>

        {/* 剧情基本信息 */}
        <div className="space-y-4">
          {isEditing ? (
            <>
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
            </>
          ) : (
            <>
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
                  {orientation === 'hetero' && '言情'}
                  {orientation === 'yuri' && '百合'}
                  {orientation === 'yaoi' && '耽美'}
                  {orientation === 'none' && '无'}
                </p>
              </div>
              
              {tags && tags.length > 0 && (
                <div>
                  <Label className="text-muted-foreground">标签</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tags.map(tag => (
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
            </>
          )}
        </div>
        
        {/* 统计信息 */}
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
      </CardContent>
    </Card>
  );
};

export default StoryDetails;
