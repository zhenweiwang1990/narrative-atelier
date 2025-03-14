
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, Image } from 'lucide-react';
import { Location } from '@/utils/types';
import { generateId } from '@/utils/storage';

const Locations = () => {
  const { story, setStory } = useStory();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Location>>({
    name: '',
    description: '',
    background: '',
    scenes: []
  });

  // Get selected location for editing
  const selectedLocation = story?.locations.find(l => l.id === selectedLocationId) || null;

  // Filter locations based on search query
  const filteredLocations = story?.locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Open dialog for creating a location
  const handleOpenCreateDialog = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      description: '',
      background: '',
      scenes: []
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing a location
  const handleOpenEditDialog = (location: Location) => {
    setIsEditMode(true);
    setSelectedLocationId(location.id);
    setFormData({
      name: location.name,
      description: location.description,
      background: location.background || '',
      scenes: location.scenes
    });
    setIsDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle location creation or update
  const handleSaveLocation = () => {
    if (!story || !setStory) return;

    if (isEditMode && selectedLocationId) {
      // Update existing location
      const updatedLocations = story.locations.map(location => {
        if (location.id === selectedLocationId) {
          return {
            ...location,
            name: formData.name || location.name,
            description: formData.description || location.description,
            background: formData.background || location.background
          };
        }
        return location;
      });

      setStory({
        ...story,
        locations: updatedLocations
      });
    } else {
      // Create new location
      const newLocation: Location = {
        id: generateId('location'),
        name: formData.name || 'New Location',
        description: formData.description || '',
        background: formData.background || undefined,
        scenes: []
      };

      setStory({
        ...story,
        locations: [...story.locations, newLocation]
      });
    }

    setIsDialogOpen(false);
  };

  // Handle location deletion
  const handleDeleteLocation = (locationId: string) => {
    if (!story || !setStory) return;

    // Check if location is used in any scenes
    const isUsed = story.scenes.some(scene => scene.locationId === locationId);

    if (isUsed) {
      // TODO: Show warning toast
      alert("Can't delete this location as it's used in one or more scenes. Please update those scenes first.");
      return;
    }

    setStory({
      ...story,
      locations: story.locations.filter(location => location.id !== locationId)
    });
  };

  // Count scenes that use this location
  const getSceneCount = (locationId: string) => {
    if (!story) return 0;
    return story.scenes.filter(scene => scene.locationId === locationId).length;
  };

  if (!story) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Locations</h1>
          <p className="text-sm text-muted-foreground">
            Manage your story's locations and their backgrounds.
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Location
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search locations..."
            className="pl-9 h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Scenes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  No locations found. Add your first location to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredLocations.map(location => (
                <TableRow key={location.id}>
                  <TableCell>
                    {location.background ? (
                      <img
                        src={location.background}
                        alt={location.name}
                        className="h-8 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="h-8 w-12 rounded bg-muted flex items-center justify-center">
                        <Image className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
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
                      onClick={() => handleOpenEditDialog(location)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteLocation(location.id)}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Location' : 'Create Location'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="background">Background Image URL</Label>
              <Input
                id="background"
                name="background"
                value={formData.background}
                onChange={handleInputChange}
                placeholder="https://example.com/background.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe this location..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={handleSaveLocation}>
              {isEditMode ? 'Update Location' : 'Create Location'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Locations;
