
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
import LocationTableRow from "./LocationTableRow";
import EmptyLocationState from "./EmptyLocationState";

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
            <EmptyLocationState />
          ) : (
            locations.map((location) => (
              <LocationTableRow
                key={location.id}
                location={location}
                sceneCount={getSceneCount(location.id)}
                onEdit={onEdit}
                onDelete={onDelete}
                onOpenImageSelector={onOpenImageSelector}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LocationList;
