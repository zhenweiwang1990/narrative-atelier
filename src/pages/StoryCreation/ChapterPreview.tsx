
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStory } from "@/components/Layout";
import { toast } from "sonner";
import ChapterPreview from '@/components/ai-story/chapters/ChapterPreview';

const StoryPreviewPage = () => {
  const navigate = useNavigate();
  const { story, setStory } = useStory();
  const [isConverting, setIsConverting] = useState(false);
  const [chapterContent, setChapterContent] = useState<string>('');
  const [chapterId, setChapterId] = useState<string | null>(null);

  useEffect(() => {
    const storedChapterId = sessionStorage.getItem('previewChapterId');
    if (!storedChapterId || !story) {
      navigate('/');
      return;
    }

    setChapterId(storedChapterId);
    
    const chapter = story.chapters?.find(ch => ch.id === storedChapterId);
    if (chapter) {
      setChapterContent(chapter.markedContent || chapter.mainStoryContent || '');
    } else {
      navigate('/');
    }
  }, [story, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  const handleConvertToJson = async () => {
    if (!chapterId || !story) return;
    
    setIsConverting(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update chapter status as converted
      if (story.chapters) {
        const updatedChapters = story.chapters.map(chapter => 
          chapter.id === chapterId
            ? { ...chapter, isConverted: true }
            : chapter
        );
        
        setStory({
          ...story,
          chapters: updatedChapters
        });
      }
      
      toast.success('章节已成功转换为剧情流程');
      navigate('/flow');
    } catch (error) {
      console.error('转换过程中出错:', error);
      toast.error('转换失败，请重试');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">主线预览</h1>
          <p className="text-muted-foreground">
            预览章节内容转换后的主线剧情效果
          </p>
        </div>
        
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回编辑
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>预览效果</CardTitle>
          <CardDescription>
            以下是转换后的主线剧情展示，确认无误后可以入库制作
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-6 bg-muted/20">
            <ChapterPreview content={chapterContent} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          variant="default" 
          size="lg" 
          onClick={handleConvertToJson}
          disabled={isConverting}
        >
          {isConverting ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              正在转换...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              入库制作
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StoryPreviewPage;
