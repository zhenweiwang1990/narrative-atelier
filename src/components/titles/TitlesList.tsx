import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Award } from 'lucide-react';
import { Title, GlobalValue } from '@/utils/types';
import { generateId } from '@/utils/storage';
import TitleConditionsEditor from './TitleConditionsEditor';

interface TitlesListProps {
  titles: Title[];
  globalValues: GlobalValue[];
  onChange: (titles: Title[]) => void;
}

const titleCardColors = [
  'bg-blue-50 border-blue-200',
  'bg-green-50 border-green-200',
  'bg-purple-50 border-purple-200',
  'bg-amber-50 border-amber-200',
  'bg-rose-50 border-rose-200',
  'bg-teal-50 border-teal-200',
  'bg-indigo-50 border-indigo-200',
  'bg-orange-50 border-orange-200',
];

const TitlesList: React.FC<TitlesListProps> = ({ titles, globalValues, onChange }) => {
  const addTitle = () => {
    const newTitle: Title = {
      id: generateId('title'),
      name: `称号 ${titles.length + 1}`,
      description: '',
      conditions: []
    };
    onChange([...titles, newTitle]);
  };

  const updateTitle = (id: string, updates: Partial<Title>) => {
    const updatedTitles = titles.map(title => 
      title.id === id ? { ...title, ...updates } : title
    );
    onChange(updatedTitles);
  };

  const updateTitleConditions = (titleId: string, conditions: Title['conditions']) => {
    const updatedTitles = titles.map(title => 
      title.id === titleId ? { ...title, conditions } : title
    );
    onChange(updatedTitles);
  };

  const removeTitle = (id: string) => {
    onChange(titles.filter(title => title.id !== id));
  };

  const getTitleCardColor = (index: number): string => {
    return titleCardColors[index % titleCardColors.length];
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">称号管理</h3>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addTitle}
          className="h-8 text-xs flex items-center"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> 添加称号
        </Button>
      </div>

      {titles.length === 0 ? (
        <div className="text-center py-4 text-sm text-muted-foreground border rounded-md p-6">
          尚未定义称号。添加一个称号来奖励玩家的游戏结果。
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {titles.map((title, index) => (
            <Card 
              key={title.id} 
              className={`p-4 w-[350px] mb-2 ${getTitleCardColor(index)}`}
            >
              <div className="flex gap-2 items-start mb-3">
                <div className="flex-1">
                  <Label htmlFor={`title-name-${title.id}`} className="text-xs">称号名称</Label>
                  <Input
                    id={`title-name-${title.id}`}
                    value={title.name}
                    onChange={(e) => updateTitle(title.id, { name: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="pt-5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTitle(title.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-3">
                <Label htmlFor={`title-desc-${title.id}`} className="text-xs">称号描述</Label>
                <Input
                  id={`title-desc-${title.id}`}
                  value={title.description || ''}
                  onChange={(e) => updateTitle(title.id, { description: e.target.value })}
                  className="h-8 text-sm"
                  placeholder="描述这个称号代表什么..."
                />
              </div>
              
              <TitleConditionsEditor
                titleId={title.id}
                conditions={title.conditions}
                globalValues={globalValues}
                onChange={(conditions) => updateTitleConditions(title.id, conditions)}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitlesList;
