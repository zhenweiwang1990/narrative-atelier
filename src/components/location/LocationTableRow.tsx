
import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { Location } from "@/utils/types";
import LocationImagePreview from "./LocationImagePreview";
import LocationActions from "./LocationActions";

interface LocationTableRowProps {
  location: Location;
  sceneCount: number;
  onEdit: (location: Location) => void;
  onDelete: (locationId: string) => void;
  onOpenImageSelector: (locationId: string) => void;
}

const LocationTableRow: React.FC<LocationTableRowProps> = ({
  location,
  sceneCount,
  onEdit,
  onDelete,
  onOpenImageSelector,
}) => {
  return (
    <TableRow key={location.id}>
      <TableCell>
        <LocationImagePreview
          background={location.background}
          locationName={location.name}
          locationId={location.id}
          onOpenImageSelector={onOpenImageSelector}
        />
      </TableCell>
      <TableCell className="font-medium">{location.name}</TableCell>
      <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[300px]">
        {location.description}
      </TableCell>
      <TableCell>{sceneCount}</TableCell>
      <TableCell className="text-right">
        <LocationActions
          location={location}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default LocationTableRow;
