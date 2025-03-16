
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { Title, GlobalValue } from '@/utils/types';

interface TitleEvaluatorProps {
  titles: Title[];
  globalValues: GlobalValue[];
}

const TitleEvaluator: React.FC<TitleEvaluatorProps> = ({ titles, globalValues }) => {
  // Evaluate which titles would be unlocked with current values
  const unlockedTitles = titles.filter(title => {
    // If no conditions, title is automatically unlocked
    if (title.conditions.length === 0) return true;
    
    // Check if all conditions are met
    return title.conditions.every(condition => {
      const globalValue = globalValues.find(v => v.id === condition.valueId);
      if (!globalValue) return false;
      
      const value = globalValue.currentValue !== undefined ? 
        globalValue.currentValue : globalValue.initialValue;
      
      switch (condition.operator) {
        case 'gt': return value > condition.targetValue;
        case 'lt': return value < condition.targetValue;
        case 'eq': return value === condition.targetValue;
        case 'gte': return value >= condition.targetValue;
        case 'lte': return value <= condition.targetValue;
        default: return false;
      }
    });
  });

  if (titles.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Award className="h-5 w-5 text-yellow-500" />
        <h3 className="text-sm font-medium">当前可获得的称号</h3>
      </div>
      
      {unlockedTitles.length === 0 ? (
        <div className="text-center py-2 text-xs text-muted-foreground">
          当前没有可以获得的称号。调整全局变量值或修改称号条件。
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {unlockedTitles.map(title => (
            <Badge key={title.id} variant="secondary" className="px-2 py-1">
              {title.name}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TitleEvaluator;
