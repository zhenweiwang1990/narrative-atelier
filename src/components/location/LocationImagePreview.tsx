
import React from "react";
import { Image } from "lucide-react";

interface LocationImagePreviewProps {
  background?: string;
  locationName: string;
  locationId: string;
  onOpenImageSelector: (locationId: string) => void;
}

const LocationImagePreview: React.FC<LocationImagePreviewProps> = ({
  background,
  locationName,
  locationId,
  onOpenImageSelector,
}) => {
  return (
    <div className="flex items-center gap-2">
      {background ? (
        <div className="relative h-16 w-24 rounded overflow-hidden">
          <img
            src={background}
            alt={locationName}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="h-16 w-24 rounded bg-muted flex items-center justify-center">
          <Image className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <button
        className="h-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
        onClick={() => onOpenImageSelector(locationId)}
      >
        <Image className="h-4 w-4 mr-1" />
        设置背景
      </button>
    </div>
  );
};

export default LocationImagePreview;
