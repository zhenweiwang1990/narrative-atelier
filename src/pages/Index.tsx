
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save, Sparkles, FileText, ArrowRight, Image, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useStory } from "@/components/Layout";
import SimpleIdeaDialog from "@/components/ai-story/SimpleIdeaDialog";
import StoryStats from "@/components/ai-story/StoryStats";

const Index = () => {
  const navigate = useNavigate();
  const { story, setStory } = useStory();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || "");
  const [author, setAuthor] = useState(story?.author || "");
  const [description, setDescription] = useState(story?.description || "");
  const [coverPhoto, setCoverPhoto] = useState(story?.coverPhoto || "");
  
  // AI 对话框状态
  const [showSimpleIdeaDialog, setShowSimpleIdeaDialog] = useState(false);

  const handleSave = () => {
    if (!story || !setStory) return;

    setStory({
      ...story,
      title,
      author,
      description,
      coverPhoto,
    });

    setIsEditing(false);
  };

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!story) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">剧情概览</h1>
        <p className="text-muted-foreground">
          管理您的互动剧情元素和叙事流程。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI 创作功能卡片 */}
        <Card>
          <CardHeader>
            <CardTitle>AI 创作助手</CardTitle>
            <CardDescription>借助 AI 快速创建剧情结构</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start" 
              onClick={() => setShowSimpleIdeaDialog(true)}
            >
              <Sparkles className="h-4 w-4 mr-2" /> 从简单创意创作剧情
            </Button>
            <Button 
              className="w-full justify-start" 
              onClick={() => navigate('/story-creation/text-processing')}
            >
              <FileText className="h-4 w-4 mr-2" /> 从小说创作剧情
              <ArrowRight className="ml-auto h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* 剧情信息卡片 */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 封面照片区域 */}
              <div className="border rounded-lg overflow-hidden">
                {isEditing ? (
                  <div className="flex flex-col items-center justify-center p-6 h-full">
                    {coverPhoto ? (
                      <div className="relative w-full">
                        <img 
                          src={coverPhoto} 
                          alt="剧情封面" 
                          className="object-cover w-full h-48 rounded-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                          <Label 
                            htmlFor="cover-photo-upload"
                            className="cursor-pointer bg-background text-foreground px-3 py-2 rounded-md flex items-center gap-2"
                          >
                            <Camera className="h-4 w-4" />
                            更换封面
                          </Label>
                          <Input
                            id="cover-photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverPhotoChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 w-full border-2 border-dashed rounded-md">
                        <Image className="h-10 w-10 text-muted-foreground mb-2" />
                        <Label 
                          htmlFor="cover-photo-upload" 
                          className="cursor-pointer text-primary"
                        >
                          添加封面照片
                        </Label>
                        <Input
                          id="cover-photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleCoverPhotoChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 h-full">
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
                )}
              </div>

              {/* 剧情信息区域 */}
              <div>
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
                      <p className="mt-1">{story.title}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        作者
                      </h3>
                      <p className="mt-1">{story.author}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        描述
                      </h3>
                      <p className="mt-1 whitespace-pre-wrap">
                        {story.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <StoryStats story={story} />
      </div>

      {/* AI 对话框 */}
      <SimpleIdeaDialog
        isOpen={showSimpleIdeaDialog}
        onClose={() => setShowSimpleIdeaDialog(false)}
        story={story}
        setStory={setStory}
      />
    </div>
  );
};

export default Index;
