
import { useState } from 'react';
import { Location } from '@/utils/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface LocationCardProps {
  location: Location;
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
}

const LocationCard = ({ location, onEdit, onDelete }: LocationCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-md truncate">{location.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="h-48 relative overflow-hidden bg-muted">
          {location.background ? (
            <>
              <div className={cn(
                "absolute inset-0 bg-muted animate-pulse",
                imageLoaded ? "hidden" : "block"
              )} />
              <img
                src={location.background}
                alt={location.name}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <MapPin className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {location.description || "No description provided."}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center">
              <span className="text-xs">{location.scenes.length} scenes</span>
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mr-2"
          onClick={() => onEdit(location)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-fit"
          onClick={() => onDelete(location.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
