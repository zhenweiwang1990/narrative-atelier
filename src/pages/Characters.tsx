
import React, { useState } from 'react';
import { useStory } from '@/components/Layout';
import CharacterCard from '@/components/CharacterCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Edit, Trash2, User } from 'lucide-react';
import { Character, CharacterGender, CharacterRole } from '@/utils/types';
import { generateId } from '@/utils/storage';

const Characters = () => {
  const { story, setStory } = useStory();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    gender: 'male',
    role: 'supporting',
    bio: '',
    portrait: '',
    fullBody: ''
  });

  // Get selected character for editing
  const selectedCharacter = story?.characters.find(c => c.id === selectedCharacterId) || null;

  // Filter characters based on search query
  const filteredCharacters = story?.characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    character.bio.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Open dialog for creating a character
  const handleOpenCreateDialog = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      gender: 'male',
      role: 'supporting',
      bio: '',
      portrait: '',
      fullBody: ''
    });
    setIsDialogOpen(true);
  };

  // Open dialog for editing a character
  const handleOpenEditDialog = (character: Character) => {
    setIsEditMode(true);
    setSelectedCharacterId(character.id);
    setFormData({
      name: character.name,
      gender: character.gender,
      role: character.role,
      bio: character.bio,
      portrait: character.portrait || '',
      fullBody: character.fullBody || ''
    });
    setIsDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle character creation or update
  const handleSaveCharacter = () => {
    if (!story || !setStory) return;

    if (isEditMode && selectedCharacterId) {
      // Update existing character
      const updatedCharacters = story.characters.map(character => {
        if (character.id === selectedCharacterId) {
          return {
            ...character,
            ...formData
          } as Character;
        }
        return character;
      });

      setStory({
        ...story,
        characters: updatedCharacters
      });
    } else {
      // Create new character
      const newCharacter: Character = {
        id: generateId('character'),
        name: formData.name || 'New Character',
        gender: formData.gender as CharacterGender || 'male',
        role: formData.role as CharacterRole || 'supporting',
        bio: formData.bio || '',
        portrait: formData.portrait || undefined,
        fullBody: formData.fullBody || undefined
      };

      setStory({
        ...story,
        characters: [...story.characters, newCharacter]
      });
    }

    setIsDialogOpen(false);
  };

  // Handle character deletion
  const handleDeleteCharacter = (characterId: string) => {
    if (!story || !setStory) return;

    setStory({
      ...story,
      characters: story.characters.filter(character => character.id !== characterId)
    });
  };

  if (!story) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Characters</h1>
          <p className="text-sm text-muted-foreground">
            Manage your story's characters and their attributes.
          </p>
        </div>

        <Button size="sm" onClick={handleOpenCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Character
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search characters..."
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
              <TableHead>Role</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="hidden md:table-cell">Bio</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCharacters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                  No characters found. Add your first character to get started.
                </TableCell>
              </TableRow>
            ) : (
              filteredCharacters.map(character => (
                <TableRow key={character.id}>
                  <TableCell>
                    {character.portrait ? (
                      <img
                        src={character.portrait}
                        alt={character.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{character.name}</TableCell>
                  <TableCell className="capitalize">{character.role}</TableCell>
                  <TableCell className="capitalize">{character.gender}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[300px]">
                    {character.bio}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEditDialog(character)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCharacter(character.id)}
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
            <DialogTitle>{isEditMode ? 'Edit Character' : 'Create Character'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
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
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleSelectChange('role', value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="protagonist">Protagonist</SelectItem>
                    <SelectItem value="supporting">Supporting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="portrait">Portrait URL</Label>
                <Input
                  id="portrait"
                  name="portrait"
                  value={formData.portrait}
                  onChange={handleInputChange}
                  placeholder="https://example.com/portrait.jpg"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullBody">Full Body Image URL</Label>
              <Input
                id="fullBody"
                name="fullBody"
                value={formData.fullBody}
                onChange={handleInputChange}
                placeholder="https://example.com/full-body.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Character background and personality..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={handleSaveCharacter}>
              {isEditMode ? 'Update Character' : 'Create Character'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Characters;
