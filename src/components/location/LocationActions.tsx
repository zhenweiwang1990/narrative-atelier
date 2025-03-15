
import React from "react";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Location } from "@/utils/types";

interface LocationActionsProps {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (locationId: string) => void;
}

const LocationActions: React.FC<LocationActionsProps> = ({
  location,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex justify-end">
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
    </div>
  );
};

export default LocationActions;
