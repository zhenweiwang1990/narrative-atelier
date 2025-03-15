
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ValueModification } from "./types";
import { getElementTypeName, getValueName } from "./tableUtils";
import { Story } from "@/utils/types";

interface ModificationTableRowProps {
  modification: ValueModification;
  editedValue: number;
  story: Story | null;
  onValueChange: (modification: ValueModification, newValue: string) => void;
}

const ModificationTableRow: React.FC<ModificationTableRowProps> = ({
  modification,
  editedValue,
  story,
  onValueChange
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{modification.sceneTitle}</TableCell>
      <TableCell>{modification.elementIndex + 1}</TableCell>
      <TableCell>{getElementTypeName(modification.elementType)}</TableCell>
      <TableCell className="truncate max-w-[180px]">{modification.elementTitle}</TableCell>
      <TableCell className="truncate max-w-[180px]">{modification.optionOrOutcome}</TableCell>
      <TableCell>{getValueName(story, modification.valueId)}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={editedValue}
          onChange={(e) => onValueChange(modification, e.target.value)}
          className="h-8 w-full text-sm"
        />
      </TableCell>
    </TableRow>
  );
};

export default ModificationTableRow;
