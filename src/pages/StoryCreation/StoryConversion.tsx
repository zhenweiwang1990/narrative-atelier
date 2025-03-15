
import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStory } from "@/components/Layout";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations?: string[];
  isConverted: boolean;
}

const StoryConversion = () => {
  const navigate = useNavigate();
  const { story, setStory } = useStory();
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    const storedChapters = sessionStorage.getItem('storyChapters');
    if (!storedChapters) {
      toast.error('没有找到章节数据，请返回上一步');
      return;
    }
    
    try {
      const parsedChapters = JSON.parse(storedChapters);
      // 添加 isConverted 字段
      const chaptersWithStatus = parsedChapters.map((chapter: any) => ({
        ...chapter,
        isConverted: false
      }));
      setChapters(chaptersWithStatus);
    } catch (error) {
      console.error('解析章节数据出错:', error);
      toast.error('章节数据解析失败');
    }
  }, []);

  const convertToStory = async (index: number) => {
    setCurrentChapterIndex(index);
    setIsConverting(true);
    
    try {
      // TODO: 实际的服务器调用将章节转换为剧情结构
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 假设转换成功
      const updatedChapters = [...chapters];
      updatedChapters[index].isConverted = true;
      setChapters(updatedChapters);
      
      // 检查是否所有章节都已转换
      const allConverted = updatedChapters.every(chapter => chapter.isConverted);
      if (allConverted) {
        setShowConfirmation(true);
      } else {
        toast.success(`章节 ${index + 1} 转换成功`);
      }
    } catch (error) {
      console.error('转换章节时出错:', error);
      toast.error('转换失败，请重试');
    } finally {
      setIsConverting(false);
    }
  };

  const mergeToStory = () => {
    if (story) {
      // 这里应该将转换后的内容合并到现有故事中
      const updatedStory = { ...story };
      // 实际合并逻辑
      
      setStory(updatedStory);
      toast.success('故事已成功合并');
      setShowConfirmation(false);
      
      // 清除 sessionStorage 中的数据
      sessionStorage.removeItem('storyChapters');
      
      // 重定向到首页
      navigate('/');
    }
  };

  const handlePrevious = () => {
    navigate('/story-creation/interaction-marking');
  };

  if (chapters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p>正在加载章节数据...</p>
        <Button onClick={handlePrevious} className="mt-4">
          返回上一步
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">小说剧情创作 - 步骤 3：剧情转换</h1>
            <Button onClick={() => navigate('/')} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回概览
            </Button>
          </div>
          <p className="text-muted-foreground">
            逐章节转换为交互式剧情结构
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>章节转换</CardTitle>
            <CardDescription>
              每章节都会独立转换为交互式剧情，请逐个转换
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4 pb-4">
                {chapters.map((chapter, index) => (
                  <div 
                    key={chapter.id} 
                    className="p-4 border rounded-md flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-medium">{chapter.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chapter.content.substring(0, 50)}...
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => convertToStory(index)}
                      disabled={isConverting || chapter.isConverted}
                      variant={chapter.isConverted ? "secondary" : "default"}
                    >
                      {chapter.isConverted ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          已转换
                        </>
                      ) : isConverting && currentChapterIndex === index ? (
                        "转换中..."
                      ) : (
                        "转换章节"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={handlePrevious}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回上一步
          </Button>
        </div>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认合并故事</AlertDialogTitle>
            <AlertDialogDescription>
              所有章节已成功转换为交互式剧情。是否将转换后的内容合并到当前故事中？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmation(false)}>取消</AlertDialogCancel>
            <AlertDialogAction onClick={mergeToStory}>确认合并</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StoryConversion;
