
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
import EmptyModificationsState from "./EmptyModificationsState";
import { getElementTypeName, getValueName } from "./tableUtils";

const GlobalValuesModificationsTable: React.FC<GlobalValuesModificationsTableProps> = ({ 
  story, 
  onModificationUpdate 
}) => {
  const {
    groupedModifications,
    handleValueChange,
    getDisplayValue,
    isEmpty
  } = useModificationsTable(story, onModificationUpdate);
  
  if (!story) {
    return <EmptyModificationsState hasStory={false} />;
  }
  
  if (isEmpty) {
    return <EmptyModificationsState hasStory={true} />;
  }
  
  return (
    <div className="rounded-md border overflow-x-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">场景</TableHead>
            <TableHead className="w-[60px]">序号</TableHead>
            <TableHead className="w-[100px]">元素类型</TableHead>
            <TableHead className="w-[180px]">元素标题</TableHead>
            <TableHead className="w-[180px]">选项/结果</TableHead>
            <TableHead className="w-[400px]">全局变量调整</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedModifications).map(([elementKey, elementGroup]) => {
            // Get the first modification in the group to access element info
            const firstMod = elementGroup.items[0];
            const elementRowKey = `element-${elementKey}`;
            
            return (
              <React.Fragment key={elementRowKey}>
                {/* Element row */}
                <TableRow className="bg-muted/30">
                  <TableCell className="font-medium">{firstMod.sceneTitle}</TableCell>
                  <TableCell>{firstMod.elementIndex + 1}</TableCell>
                  <TableCell>{getElementTypeName(firstMod.elementType)}</TableCell>
                  <TableCell className="truncate max-w-[180px]">{firstMod.elementTitle}</TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                
                {/* Option/Outcome rows */}
                {Object.entries(elementGroup.subgroups).map(([optionKey, optionGroup]) => {
                  const optionRowKey = `${elementRowKey}-option-${optionKey}`;
                  const firstOptionMod = optionGroup.items[0];
                  
                  return (
                    <TableRow key={optionRowKey}>
                      <TableCell className="border-l-4 border-l-primary/20"></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="font-medium">
                        {firstOptionMod.outcomeType === 'choice' ? (
                          <span>{firstOptionMod.optionOrOutcome}</span>
                        ) : (
                          <Badge 
                            variant={firstOptionMod.outcomeType === 'success' ? 'default' : 'destructive'}
                            className="font-semibold"
                          >
                            {firstOptionMod.optionOrOutcome}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {optionGroup.items.map((modification) => (
                            <div 
                              key={`value-${modification.valueId}`} 
                              className="flex items-center border rounded-md px-2 py-1 bg-background"
                            >
                              <span className="text-sm mr-2">
                                {getValueName(story, modification.valueId)}:
                              </span>
                              <Input
                                type="number"
                                value={getDisplayValue(modification)}
                                onChange={(e) => handleValueChange(modification, e.target.value)}
                                className="h-6 w-16 text-sm inline-block"
                              />
                            </div>
                          ))}
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
