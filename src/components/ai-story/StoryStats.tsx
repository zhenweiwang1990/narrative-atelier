
import React from 'react';
import { Story, SceneElement, NarrationElement, DialogueElement, ThoughtElement, ChoiceElement, QteElement, DialogueTaskElement } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StoryStatsProps {
  story: Story;
}

const StoryStats: React.FC<StoryStatsProps> = ({ story }) => {
  // 计算所有元素数量
  const allElements: SceneElement[] = story.scenes.flatMap(scene => 
    scene.elements || []
  );
  
  // 按类型统计元素
  const elementTypeCount = {
    total: allElements.length,
    choice: allElements.filter(e => e.type === 'choice').length,
    qte: allElements.filter(e => e.type === 'qte').length,
    dialogueTask: allElements.filter(e => e.type === 'dialogueTask').length,
  };
  
  // 统计所有文本长度
  const totalTextLength = allElements.reduce((sum, element) => {
    switch (element.type) {
      case 'narration':
        return sum + ((element as NarrationElement).text?.length || 0);
      case 'dialogue':
        return sum + ((element as DialogueElement).text?.length || 0);
      case 'thought':
        return sum + ((element as ThoughtElement).text?.length || 0);
      case 'choice':
        const choiceElem = element as ChoiceElement;
        const choiceText = choiceElem.text?.length || 0;
        const optionsText = choiceElem.options?.reduce((total, opt) => 
          total + (opt.text?.length || 0), 0) || 0;
        return sum + choiceText + optionsText;
      case 'qte':
        return sum + ((element as QteElement).description?.length || 0);
      case 'dialogueTask':
        const dialogueTask = element as DialogueTaskElement;
        return sum + (dialogueTask.goal?.length || 0) + (dialogueTask.openingLine?.length || 0);
      default:
        return sum;
    }
  }, 0);
  
  // 统计结局数量
  const endings = {
    normal: story.scenes.filter(scene => scene.type === 'ending').length,
    bad: story.scenes.filter(scene => scene.type === 'bad-ending').length,
    total: story.scenes.filter(scene => scene.type === 'ending' || scene.type === 'bad-ending').length
  };
  
  // 判断剧情是否完结
  const isCompleted = story.scenes.some(scene => 
    scene.type === 'ending'
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>剧情统计</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总元素数量</span>
              <span className="font-medium">{elementTypeCount.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">总字数</span>
              <span className="font-medium">{totalTextLength}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">选择选项</span>
              <span className="font-medium">{elementTypeCount.choice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">QTE互动</span>
              <span className="font-medium">{elementTypeCount.qte}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">对话任务</span>
              <span className="font-medium">{elementTypeCount.dialogueTask}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">正常结局</span>
              <span className="font-medium">{endings.normal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">异常结局</span>
              <span className="font-medium">{endings.bad}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">故事状态</span>
              <span className={`font-medium ${isCompleted ? 'text-green-600' : 'text-amber-600'}`}>
                {isCompleted ? '已完结' : '未完待续'}
              </span>
            </div>
          </div>
        </div>
        
        {/* 添加额外的基本信息 */}
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-semibold mb-2">基本信息</h3>
          <ul className="space-y-1">
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">场景数量:</span>
              <span className="font-medium">{story.scenes.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">角色数量:</span>
              <span className="font-medium">{story.characters.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">地点数量:</span>
              <span className="font-medium">{story.locations.length}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">全局变量:</span>
              <span className="font-medium">{story.globalValues.length}</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryStats;
