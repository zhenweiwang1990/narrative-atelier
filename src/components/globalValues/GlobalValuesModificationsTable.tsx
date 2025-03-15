
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead
} from "@/components/ui/table";
import { GlobalValuesModificationsTableProps } from "./types";
import { useModificationsTable } from "./useModificationsTable";
import ModificationTableRow from "./ModificationTableRow";
import EmptyModificationsState from "./EmptyModificationsState";

const GlobalValuesModificationsTable: React.FC<GlobalValuesModificationsTableProps> = ({ 
  story, 
  onModificationUpdate 
}) => {
  const {
    valueModifications,
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
          {valueModifications.map((modification) => (
            <ModificationTableRow
              key={`${modification.sceneId}-${modification.elementId}-${modification.valueId}-${modification.outcomeType}-${modification.choiceOptionId || ''}`}
              modification={modification}
              editedValue={getDisplayValue(modification)}
              story={story}
              onValueChange={handleValueChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GlobalValuesModificationsTable;
