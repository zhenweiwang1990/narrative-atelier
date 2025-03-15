
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Save, Sparkles, BookText, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useStory } from "@/components/Layout";
import SimpleIdeaDialog from "@/components/ai-story/SimpleIdeaDialog";
import NovelToStoryDialog from "@/components/ai-story/NovelToStoryDialog";
import StoryStats from "@/components/ai-story/StoryStats";
import StoryPreview from "@/components/ai-story/StoryPreview";

const Index = () => {
  const { story, setStory } = useStory();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || "");
  const [author, setAuthor] = useState(story?.author || "");
  const [description, setDescription] = useState(story?.description || "");
  
  // AI 对话框状态
  const [showSimpleIdeaDialog, setShowSimpleIdeaDialog] = useState(false);
  const [showNovelDialog, setShowNovelDialog] = useState(false);

  const handleSave = () => {
    if (!story || !setStory) return;

    setStory({
      ...story,
      title,
      author,
      description,
    });

    setIsEditing(false);
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
              onClick={() => setShowNovelDialog(true)}
            >
              <BookText className="h-4 w-4 mr-2" /> 从小说创作剧情
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
          </CardContent>
        </Card>

        {/* 统计信息 */}
        <StoryStats story={story} />

        {/* 剧情预览 */}
        <StoryPreview 
          story={story}
          isEditing={isEditing}
          title={title}
          author={author}
          description={description}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setDescription={setDescription}
        />
      </div>

      {/* AI 对话框 */}
      <SimpleIdeaDialog
        isOpen={showSimpleIdeaDialog}
        onClose={() => setShowSimpleIdeaDialog(false)}
        story={story}
        setStory={setStory}
      />

      <NovelToStoryDialog
        isOpen={showNovelDialog}
        onClose={() => setShowNovelDialog(false)}
        story={story}
        setStory={setStory}
      />
    </div>
  );
};

export default Index;
