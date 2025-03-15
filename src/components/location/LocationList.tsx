
import React from "react";
import { Location } from "@/utils/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash2, Image } from "lucide-react";

interface LocationListProps {
  locations: Location[];
  getSceneCount: (locationId: string) => number;
  onEdit: (location: Location) => void;
  onDelete: (locationId: string) => void;
  onOpenImageSelector: (locationId: string) => void;
}

const LocationList: React.FC<LocationListProps> = ({
  locations,
  getSceneCount,
  onEdit,
  onDelete,
  onOpenImageSelector
}) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>背景图片</TableHead>
            <TableHead>名称</TableHead>
            <TableHead className="hidden md:table-cell">描述</TableHead>
            <TableHead>场景数量</TableHead>
            <TableHead className="text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-32 text-muted-foreground"
              >
                未找到地点。添加您的第一个地点以开始。
              </TableCell>
            </TableRow>
          ) : (
            locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {location.background ? (
                      <div className="relative h-16 w-24 rounded overflow-hidden">
                        <img
                          src={location.background}
                          alt={location.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-24 rounded bg-muted flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenImageSelector(location.id)}
                      className="h-8"
                    >
                      <Image className="h-4 w-4 mr-1" />
                      设置背景
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{location.name}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[300px]">
                  {location.description}
                </TableCell>
                <TableCell>{getSceneCount(location.id)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(location)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(location.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LocationList;
