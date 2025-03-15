import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, Users, MapPin, Network, Edit, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useStory } from "@/components/Layout";
import { Link } from "react-router-dom";

const Index = () => {
  const { story, setStory } = useStory();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || "");
  const [author, setAuthor] = useState(story?.author || "");
  const [description, setDescription] = useState(story?.description || "");

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

  // 项目统计数据
  const stats = [
    {
      name: "角色",
      value: story.characters.length,
      icon: <Users className="h-4 w-4" />,
      path: "/characters",
    },
    {
      name: "场景",
      value: story.locations.length,
      icon: <MapPin className="h-4 w-4" />,
      path: "/locations",
    },
    {
      name: "分支",
      value: story.scenes.length,
      icon: <Network className="h-4 w-4" />,
      path: "/flow",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">剧情概览</h1>
        <p className="text-muted-foreground">
          管理您的互动剧情元素和叙事流程。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* 统计和快速操作 */}
        <div className="space-y-6">
          {/* 统计 */}
          <Card>
            <CardHeader>
              <CardTitle>统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="mr-2 p-2 bg-primary/10 rounded-full">
                        {stat.icon}
                      </div>
                      <span>{stat.name}</span>
                    </div>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <Card>
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <Link to="/characters">
                  <Users className="h-4 w-4 mr-2" /> 管理角色
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <Link to="/locations">
                  <MapPin className="h-4 w-4 mr-2" /> 管理场景
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start"
              >
                <Link to="/flow">
                  <Network className="h-4 w-4 mr-2" /> 编辑剧情流程
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 使用指南 */}
      <Card>
        <CardHeader>
          <CardTitle>快速指南</CardTitle>
          <CardDescription>如何创建您的互动剧情</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  1
                </div>
                <h3 className="font-medium">创建角色</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                定义您的主角和配角，设置姓名、肖像和背景剧情。
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  2
                </div>
                <h3 className="font-medium">设计场景</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                创建剧情发生的地点，包括描述和背景图片。
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  3
                </div>
                <h3 className="font-medium">构建分支</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                设计包含旁白、对话、选择和互动元素的场景，创建您的分支叙事。
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/characters">
              <BookText className="h-4 w-4 mr-2" /> 开始创作
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
