
import React, { useMemo, useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Story, 
  SceneElement, 
  ChoiceElement, 
  ChoiceOption, 
  QteElement, 
  DialogueTaskElement,
  ElementOutcome,
  GlobalValue
} from "@/utils/types";
import { getElementContentPreview } from "@/components/elements/ElementHeader";

interface ValueModification {
  sceneId: string;
  sceneTitle: string;
  elementId: string;
  elementIndex: number;
  elementType: string;
  elementTitle: string;
  optionOrOutcome: string;
  outcomeType: 'choice' | 'success' | 'failure';
  valueId: string;
  valueChange: number;
  choiceOptionId?: string;
}

interface GlobalValuesModificationsTableProps {
  story: Story | null;
  onModificationUpdate: (modification: ValueModification) => void;
}

const getElementTypeName = (type: string): string => {
  switch(type) {
    case 'choice': return '选择';
    case 'qte': return '快速反应';
    case 'dialogueTask': return '对话任务';
    default: return type;
  }
};

const GlobalValuesModificationsTable: React.FC<GlobalValuesModificationsTableProps> = ({ 
  story, 
  onModificationUpdate 
}) => {
  // State for tracking edited values
  const [editedValues, setEditedValues] = useState<Record<string, number>>({});
  
  // Process story data to get all value modifications
  const valueModifications = useMemo(() => {
    if (!story) return [];
    
    const modifications: ValueModification[] = [];
    
    story.scenes.forEach(scene => {
      // Sort elements by order
      const sortedElements = [...scene.elements].sort((a, b) => a.order - b.order);
      
      sortedElements.forEach((element, index) => {
        if (element.type === 'choice') {
          const choiceElement = element as ChoiceElement;
          
          choiceElement.options.forEach(option => {
            if (option.valueChanges && option.valueChanges.length > 0) {
              option.valueChanges.forEach(valueChange => {
                modifications.push({
                  sceneId: scene.id,
                  sceneTitle: scene.title,
                  elementId: element.id,
                  elementIndex: index,
                  elementType: element.type,
                  elementTitle: getElementContentPreview(element),
                  optionOrOutcome: option.text,
                  outcomeType: 'choice',
                  valueId: valueChange.valueId,
                  valueChange: valueChange.change,
                  choiceOptionId: option.id
                });
              });
            }
          });
        } else if (element.type === 'qte' || element.type === 'dialogueTask') {
          const outcomeElement = element as QteElement | DialogueTaskElement;
          
          // Process success outcome
          if (outcomeElement.success && outcomeElement.success.valueChanges) {
            outcomeElement.success.valueChanges.forEach(valueChange => {
              modifications.push({
                sceneId: scene.id,
                sceneTitle: scene.title,
                elementId: element.id,
                elementIndex: index,
                elementType: element.type,
                elementTitle: getElementContentPreview(element),
                optionOrOutcome: '成功',
                outcomeType: 'success',
                valueId: valueChange.valueId,
                valueChange: valueChange.change
              });
            });
          }
          
          // Process failure outcome
          if (outcomeElement.failure && outcomeElement.failure.valueChanges) {
            outcomeElement.failure.valueChanges.forEach(valueChange => {
              modifications.push({
                sceneId: scene.id,
                sceneTitle: scene.title,
                elementId: element.id,
                elementIndex: index,
                elementType: element.type,
                elementTitle: getElementContentPreview(element),
                optionOrOutcome: '失败',
                outcomeType: 'failure',
                valueId: valueChange.valueId,
                valueChange: valueChange.change
              });
            });
          }
        }
      });
    });
    
    return modifications;
  }, [story]);
  
  const handleValueChange = (modificationKey: string, modification: ValueModification, newValue: string) => {
    const numericValue = parseInt(newValue) || 0;
    setEditedValues({
      ...editedValues,
      [modificationKey]: numericValue
    });
    
    onModificationUpdate({
      ...modification,
      valueChange: numericValue
    });
  };
  
  const getValueName = (valueId: string): string => {
    if (!story) return valueId;
    const value = story.globalValues.find(v => v.id === valueId);
    return value ? value.name : valueId;
  };
  
  if (!story) return <div className="text-center py-4">尚未加载故事数据</div>;
  
  if (valueModifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        没有找到任何全局变量变更，请在场景元素中添加变量变更
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">场景</TableHead>
            <TableHead className="w-[60px]">序号</TableHead>
            <TableHead className="w-[100px]">元素类型</TableHead>
            <TableHead className="w-[180px]">元素标题</TableHead>
            <TableHead className="w-[180px]">选项/结果</TableHead>
            <TableHead className="w-[120px]">全局变量</TableHead>
            <TableHead className="w-[80px]">变化值</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {valueModifications.map((modification, index) => {
            const modificationKey = `${modification.sceneId}-${modification.elementId}-${modification.valueId}-${modification.outcomeType}-${modification.choiceOptionId || ''}`;
            const displayValue = editedValues[modificationKey] !== undefined 
              ? editedValues[modificationKey] 
              : modification.valueChange;
              
            return (
              <TableRow key={modificationKey}>
                <TableCell className="font-medium">{modification.sceneTitle}</TableCell>
                <TableCell>{modification.elementIndex + 1}</TableCell>
                <TableCell>{getElementTypeName(modification.elementType)}</TableCell>
                <TableCell className="truncate max-w-[180px]">{modification.elementTitle}</TableCell>
                <TableCell className="truncate max-w-[180px]">{modification.optionOrOutcome}</TableCell>
                <TableCell>{getValueName(modification.valueId)}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={displayValue}
                    onChange={(e) => handleValueChange(modificationKey, modification, e.target.value)}
                    className="h-8 w-full text-sm"
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default GlobalValuesModificationsTable;
