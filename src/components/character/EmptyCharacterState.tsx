
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";

const EmptyCharacterState: React.FC = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={9}
        className="text-center h-32 text-muted-foreground"
      >
        未找到角色。添加您的第一个角色以开始。
      </TableCell>
    </TableRow>
  );
};

export default EmptyCharacterState;
