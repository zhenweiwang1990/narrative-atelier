
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Story } from "@/utils/types";

interface StoryDetailsCardProps {
  story: Story | null;
  onUpdateStory: (updatedStory: Partial<Story>) => void;
}

export const StoryDetailsCard = ({ story, onUpdateStory }: StoryDetailsCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || "");
  const [author, setAuthor] = useState(story?.author || "");
  const [description, setDescription] = useState(story?.description || "");

  const handleSave = () => {
    onUpdateStory({
      title,
      author,
      description,
    });
    setIsEditing(false);
  };

  return (
    <Card className="md:col-span-2 h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>剧情详情</CardTitle>
            <CardDescription>关于您剧情的基本信息</CardDescription>
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

      <CardContent>
        {isEditing ? (
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
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                标题
              </h3>
              <p className="mt-1">{story?.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                作者
              </h3>
              <p className="mt-1">{story?.author}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                描述
              </h3>
              <p className="mt-1 whitespace-pre-wrap">
                {story?.description}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
