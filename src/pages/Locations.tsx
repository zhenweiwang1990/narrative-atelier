
import { useState } from 'react';
import { useStory } from '@/components/Layout';
import LocationCard from '@/components/LocationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Location } from '@/utils/types';
import { generateId } from '@/utils/storage';
import { Plus, MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Locations = () => {
  const { story, setStory } = useStory();
  const { toast } = useToast();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  
  // Open dialog to add a new location
  const openAddDialog = () => {
    setEditingLocation(null);
    setName('');
    setImage('');
    setDescription('');
    setDialogOpen(true);
  };
  
  // Open dialog to edit a location
  const openEditDialog = (location: Location) => {
    setEditingLocation(location);
    setName(location.name);
    setImage(location.image || '');
    setDescription(location.description);
    setDialogOpen(true);
  };
  
  // Close dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!story || !setStory) return;
    
    if (editingLocation) {
      // Edit existing location
      const updatedLocations = story.locations.map(l => 
        l.id === editingLocation.id 
          ? { 
              ...l, 
              name, 
              image: image || undefined, 
              description 
            } 
          : l
      );
      
      setStory({
        ...story,
        locations: updatedLocations
      });
      
      toast({
        title: "Location updated",
        description: `${name} has been updated successfully.`
      });
    } else {
      // Add new location
      const newLocation: Location = {
        id: generateId('location'),
        name,
        image: image || undefined,
        description
      };
      
      setStory({
        ...story,
        locations: [...story.locations, newLocation]
      });
      
      toast({
        title: "Location added",
        description: `${name} has been added to your story.`
      });
    }
    
    closeDialog();
  };
  
  // Delete a location
  const handleDelete = (id: string) => {
    if (!story || !setStory) return;
    
    const locationToDelete = story.locations.find(l => l.id === id);
    if (!locationToDelete) return;
    
    // Check if this location is used in any scenes
    let isUsed = false;
    story.scenes.forEach(scene => {
      if (scene.locationId === id) {
        isUsed = true;
      }
    });
    
    if (isUsed) {
      toast({
        title: "Cannot delete location",
        description: "This location is used in one or more scenes. Please update those scenes first.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedLocations = story.locations.filter(l => l.id !== id);
    
    setStory({
      ...story,
      locations: updatedLocations
    });
    
    toast({
      title: "Location deleted",
      description: `${locationToDelete.name} has been removed from your story.`
    });
  };
  
  if (!story) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
          <p className="text-muted-foreground">
            Manage the locations in your interactive story.
          </p>
        </div>
        
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Location
        </Button>
      </div>
      
      {story.locations.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <MapPin className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">No Locations Yet</h3>
          <p className="text-muted-foreground mb-4">
            Add locations where your story takes place.
          </p>
          <Button onClick={openAddDialog} variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add First Location
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {story.locations.map(location => (
            <LocationCard
              key={location.id}
              location={location}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      {/* Location Edit/Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </DialogTitle>
              <DialogDescription>
                {editingLocation
                  ? 'Update the details of your location.'
                  : 'Fill in the details to create a new location.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Location name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe this location..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingLocation ? 'Save Changes' : 'Add Location'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Locations;
