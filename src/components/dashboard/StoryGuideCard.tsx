
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";

export const StoryGuideCard = () => {
  return (
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
  );
};
