
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, Save, FileJson } from "lucide-react";
import ChapterPreview from '@/components/ai-story/chapters/ChapterPreview';
import { toast } from 'sonner';

const ChapterPreviewPage = () => {
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState<any>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 从会话存储中获取章节数据
    const storedChapter = sessionStorage.getItem('previewChapter');
    if (!storedChapter) {
      toast.error('没有找到章节数据，请返回重试');
      navigate('/');
      return;
    }

    try {
      setChapterData(JSON.parse(storedChapter));
    } catch (error) {
      console.error('章节数据解析失败', error);
      toast.error('章节数据解析失败');
      navigate('/');
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleMergeToStory = async () => {
    setLoading(true);
    
    try {
      // TODO: 实际调用服务器将标记内容转换为JSON并合并到剧情中
      // Mock: 假设等待1.5秒模拟服务器处理
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('章节已成功合并到剧情中');
      setShowConfirmDialog(false);
      
      // 清除会话存储中的章节数据
      sessionStorage.removeItem('previewChapter');
      
      // 跳转到流程界面
      navigate('/flow');
    } catch (error) {
      console.error('合并章节失败', error);
      toast.error('合并失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (!chapterData) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p>正在加载章节数据...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">章节预览</h1>
          <p className="text-muted-foreground">
            检查章节内容并决定是否合并到剧情中
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回剧情
          </Button>
          <Button onClick={() => setShowConfirmDialog(true)}>
            <FileJson className="h-4 w-4 mr-2" />
            入库制作
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{chapterData.title || '章节预览'}</CardTitle>
          <CardDescription>
            下面是处理后的互动剧情内容，检查无误后可以合并到剧情中
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-muted/20">
            <ChapterPreview content={chapterData.markedContent || chapterData.mainStoryContent || ''} />
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认合并到剧情</AlertDialogTitle>
            <AlertDialogDescription>
              将该章节合并到剧情中会将内容转换为互动元素并添加到流程中。确定要继续吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleMergeToStory} disabled={loading}>
              {loading ? (
                <>处理中...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  确认合并
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ChapterPreviewPage;
