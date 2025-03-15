
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead,
  TableCell
} from "@/components/ui/table";
import { GlobalValuesModificationsTableProps } from "./types";
import { useModificationsTable } from "./useModificationsTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import EmptyModificationsState from "./EmptyModificationsState";
import { getElementTypeName, getValueName } from "./tableUtils";
import { getElementColorClass, getElementTypeLabel } from "../flow/editor/ElementTypeUtils";

const GlobalValuesModificationsTable: React.FC<GlobalValuesModificationsTableProps> = ({ 
  story, 
  onModificationUpdate 
}) => {
  const {
    allPossibleOptions,
    groupedModifications,
    handleValueChange,
    handleAddValueChange,
    handleRemoveValueChange,
    getDisplayValue,
    isEmpty
  } = useModificationsTable(story, onModificationUpdate);
  
  if (!story) {
    return <EmptyModificationsState hasStory={false} />;
  }
  
  if (isEmpty) {
    return <EmptyModificationsState hasStory={true} />;
  }
  
  // Group all possible options by element key
  const elementGroups: Record<string, any[]> = {};
  
  allPossibleOptions.forEach(option => {
    if (!option.sceneId || !option.elementId) return;
    
    const elementKey = `${option.sceneId}-${option.elementId}`;
    if (!elementGroups[elementKey]) {
      elementGroups[elementKey] = [];
    }
    
    elementGroups[elementKey].push(option);
  });
  
  return (
    <div className="rounded-md border overflow-x-auto w-full">
      <Table className="text-xs">
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="py-1 px-2">场景</TableHead>
            <TableHead className="py-1 px-2">序号</TableHead>
            <TableHead className="py-1 px-2">元素标题</TableHead>
            <TableHead className="py-1 px-2">选项/结果</TableHead>
            <TableHead className="py-1 px-2">全局变量调整</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(elementGroups).map(([elementKey, options]) => {
            if (!options.length) return null;
            // Get the first option to access element info
            const firstOption = options[0];
            const elementRowKey = `element-${elementKey}`;
            
            return (
              <React.Fragment key={elementRowKey}>
                {/* Element row */}
                <TableRow className="bg-muted/20">
                  <TableCell className="font-medium py-1 px-2">{firstOption.sceneTitle}</TableCell>
                  <TableCell className="py-1 px-2">{firstOption.elementIndex + 1}</TableCell>
                  <TableCell className="py-1 px-2">
                    <div className="flex items-center gap-1">
                      <div 
                        className={`w-5 h-5 rounded flex items-center justify-center text-white text-xs font-medium ${getElementColorClass(firstOption.elementType || '')}`}
                      >
                        {getElementTypeLabel(firstOption.elementType || '')}
                      </div>
                      <span className="text-xs truncate max-w-[200px]">{firstOption.elementTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                
                {/* Option/Outcome rows */}
                {options.map((option) => {
                  const outcomeType = option.outcomeType as 'choice' | 'success' | 'failure';
                  const optionKey = outcomeType === 'choice' && option.choiceOptionId 
                    ? option.choiceOptionId 
                    : `${option.elementId}-${outcomeType}`;
                  
                  const optionRowKey = `${elementRowKey}-option-${optionKey}`;
                  
                  // Get modifications for this option/outcome
                  const modifications = groupedModifications[elementKey]?.subgroups[optionKey]?.items || [];
                  
                  return (
                    <TableRow key={optionRowKey} className="hover:bg-muted/10">
                      <TableCell className="border-l-2 border-l-primary/20 py-1 px-2"></TableCell>
                      <TableCell className="py-1 px-2"></TableCell>
                      <TableCell className="py-1 px-2"></TableCell>
                      <TableCell className="font-medium py-1 px-2">
                        {outcomeType === 'choice' ? (
                          <span className="text-xs">{option.optionOrOutcome}</span>
                        ) : (
                          <Badge 
                            variant={outcomeType === 'success' ? 'default' : 'destructive'}
                            className="text-xs py-0 px-1"
                          >
                            {option.optionOrOutcome}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-1 px-2">
                        <div className="flex flex-wrap gap-1 items-center">
                          {modifications.map((modification) => {
                            const value = getDisplayValue(modification);
                            const isPositive = value > 0;
                            const isNegative = value < 0;
                            
                            return (
                              <div 
                                key={`value-${modification.valueId}`} 
                                className={`flex items-center border rounded-sm px-1 py-1 ${
                                  isPositive ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800' : 
                                  isNegative ? 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800' : 
                                  'bg-background dark:bg-muted/30'
                                }`}
                              >
                                <span className="text-xs mr-1">
                                  {getValueName(story, modification.valueId)}:
                                </span>
                                <Input
                                  type="number"
                                  value={value}
                                  onChange={(e) => handleValueChange(modification, e.target.value)}
                                  className={`h-5 w-12 text-xs inline-block px-1 ${
                                    isPositive ? 'text-green-600 dark:text-green-400' : 
                                    isNegative ? 'text-red-600 dark:text-red-400' : ''
                                  }`}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveValueChange(modification)}
                                  className="h-5 w-5 ml-1 text-muted-foreground hover:text-destructive"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            )
                          })}
                          
                          {story.globalValues.length > modifications.length && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddValueChange(
                                option.sceneId || '',
                                option.elementId || '',
                                option.elementIndex || 0,
                                option.elementType || '',
                                option.elementTitle || '',
                                option.sceneTitle || '',
                                outcomeType,
                                option.optionOrOutcome || '',
                                option.choiceOptionId
                              )}
                              className="h-5 rounded-sm bg-muted/20"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              <span className="text-xs">添加变量</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default GlobalValuesModificationsTable;
