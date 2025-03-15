
import React from "react";
import { TableRow, TableCell } from "../ui/table";

const EmptyLocationState: React.FC = () => {
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-center h-32 text-muted-foreground"
      >
        未找到地点。添加您的第一个地点以开始。
      </TableCell>
    </TableRow>
  );
};

export default EmptyLocationState;
