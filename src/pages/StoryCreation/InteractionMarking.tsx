
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ListChecks, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextMarkerContextMenu from "@/components/ai-story/chapters/TextMarkerContextMenu";

interface ChapterData {
  id: string;
  title: string;
  content: string;
  annotations: string[];
}

const InteractionMarking = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  
  useEffect(() => {
    const storedChapters = sessionStorage.getItem('storyChapters');
    if (!storedChapters) {
      toast.error('没有找到章节数据，请返回上一步');
      return;
    }
    
    try {
      const parsedChapters = JSON.parse(storedChapters);
      // 添加 annotations 数组
      const chaptersWithAnnotations = parsedChapters.map((chapter: any) => ({
        ...chapter,
        annotations: []
      }));
      setChapters(chaptersWithAnnotations);
    } catch (error) {
      console.error('解析章节数据出错:', error);
      toast.error('章节数据解析失败');
    }
  }, []);

  const handleChapterContentChange = (index: number, newContent: string) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].content = newContent;
    setChapters(updatedChapters);
    
    // 更新 sessionStorage
    sessionStorage.setItem('storyChapters', JSON.stringify(updatedChapters));
  };

  const regenerateChapter = async (index: number) => {
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)), 
      {
        loading: '正在重新生成章节...',
        success: '章节重新生成成功',
        error: '生成失败，请重试。',
      }
    );
  };

  const handlePrevious = () => {
    navigate('/story-creation/text-processing');
  };

  const handleNext = () => {
    navigate('/story-creation/conversion');
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
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">小说剧情创作 - 步骤 2：互动标记</h1>
          <Button onClick={() => navigate('/')} variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回概览
          </Button>
        </div>
        <p className="text-muted-foreground">
          编辑章节内容，添加选项、QTE和对话任务标记
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>章节编辑</CardTitle>
          <CardDescription>
            在文本中添加交互标记，系统将自动识别并转换为互动元素
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={chapters[0]?.id}>
            <TabsList className="mb-4 flex flex-wrap h-auto">
              {chapters.map((chapter) => (
                <TabsTrigger key={chapter.id} value={chapter.id} className="mb-1">
                  {chapter.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {chapters.map((chapter, index) => (
              <TabsContent key={chapter.id} value={chapter.id}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium">{chapter.title}</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => regenerateChapter(index)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      重新生成
                    </Button>
                  </div>
                  
                  <TextMarkerContextMenu
                    value={chapter.content}
                    onChange={(newContent) => handleChapterContentChange(index, newContent)}
                    className="h-[50vh] resize-none"
                  />
                  
                  <div className="text-xs text-muted-foreground p-3 bg-muted/20 rounded-md">
                    <p className="font-medium mb-1">标注格式：</p>
                    <p>- 分隔场景：{"<-s->"}</p>
                    <p>- 选项：文本末尾使用 {"<<选项1||选项2>>"}</p>
                    <p>- QTE：使用 {"<<QTE1 START>>"} 和 {"<<QTE1 END>>"} 包围QTE内容</p>
                    <p>- 对话任务：使用 {"<<DialogueTask START>>"} 和 {"<<DialogueTask END>>"} 包围对话任务内容</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
        
        <Button 
          onClick={handleNext}
        >
          下一步：剧情转换
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InteractionMarking;
