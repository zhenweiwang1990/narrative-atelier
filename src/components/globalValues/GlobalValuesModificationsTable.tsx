
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GlobalValuesModificationsTable: React.FC<GlobalValuesModificationsTableProps> = ({ 
  story, 
  onModificationUpdate 
}) => {
  const {
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
  
  if (isEmpty && Object.keys(groupedModifications).length === 0) {
    return <EmptyModificationsState hasStory={true} />;
  }
  
  return (
    <div className="rounded-md border overflow-x-auto w-full">
      <Table className="text-xs">
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="py-2 px-2">场景</TableHead>
            <TableHead className="py-2 px-2">序号</TableHead>
            <TableHead className="py-2 px-2">元素标题</TableHead>
            <TableHead className="py-2 px-2">选项/结果</TableHead>
            <TableHead className="py-2 px-2">全局变量调整</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedModifications).map(([elementKey, elementGroup]) => {
            // Get the first modification in the group to access element info
            const firstMod = elementGroup.items[0] || Object.values(elementGroup.subgroups)[0]?.items[0];
            if (!firstMod) return null;
            
            const elementRowKey = `element-${elementKey}`;
            
            return (
              <React.Fragment key={elementRowKey}>
                {/* Element row */}
                <TableRow className="bg-muted/20">
                  <TableCell className="font-medium py-2 px-2">{firstMod.sceneTitle}</TableCell>
                  <TableCell className="py-2 px-2">{firstMod.elementIndex + 1}</TableCell>
                  <TableCell className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs py-0 px-1">
                        {getElementTypeName(firstMod.elementType)}
                      </Badge>
                      <span className="text-xs truncate max-w-[200px]">{firstMod.elementTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                
                {/* Option/Outcome rows */}
                {Object.entries(elementGroup.subgroups).map(([optionKey, optionGroup]) => {
                  const optionRowKey = `${elementRowKey}-option-${optionKey}`;
                  const firstOptionMod = optionGroup.items[0] || {
                    ...firstMod,
                    optionOrOutcome: optionKey.includes('success') ? '成功' : 
                                     optionKey.includes('failure') ? '失败' : optionKey
                  };
                  
                  return (
                    <TableRow key={optionRowKey} className="hover:bg-muted/10">
                      <TableCell className="border-l-2 border-l-primary/20 py-2 px-2"></TableCell>
                      <TableCell className="py-2 px-2"></TableCell>
                      <TableCell className="py-2 px-2"></TableCell>
                      <TableCell className="font-medium py-2 px-2">
                        {firstOptionMod.outcomeType === 'choice' ? (
                          <span className="text-xs">{firstOptionMod.optionOrOutcome}</span>
                        ) : (
                          <Badge 
                            variant={firstOptionMod.outcomeType === 'success' ? 'default' : 'destructive'}
                            className="text-xs py-0 px-1"
                          >
                            {firstOptionMod.optionOrOutcome}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-2 px-2">
                        <div className="flex flex-wrap gap-1 items-center">
                          {optionGroup.items.map((modification) => (
                            <div 
                              key={`value-${modification.valueId}`} 
                              className="flex items-center border rounded-sm px-1 py-1 bg-background"
                            >
                              <span className="text-xs mr-1">
                                {getValueName(story, modification.valueId)}:
                              </span>
                              <Input
                                type="number"
                                value={getDisplayValue(modification)}
                                onChange={(e) => handleValueChange(modification, e.target.value)}
                                className="h-5 w-12 text-xs inline-block px-1"
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
                          ))}
                          
                          {story.globalValues.length > optionGroup.items.length && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleAddValueChange(
                                firstOptionMod.sceneId,
                                firstOptionMod.elementId,
                                firstOptionMod.elementIndex,
                                firstOptionMod.elementType,
                                firstOptionMod.elementTitle,
                                firstOptionMod.sceneTitle,
                                firstOptionMod.outcomeType,
                                firstOptionMod.optionOrOutcome,
                                firstOptionMod.choiceOptionId
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
