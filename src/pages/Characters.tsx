
import { useState } from 'react';
import { useStory } from '@/components/Layout';
import CharacterCard from '@/components/CharacterCard';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Character, CharacterGender, CharacterRole } from '@/utils/types';
import { generateId } from '@/utils/storage';
import { Plus, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Characters = () => {
  const { story, setStory } = useStory();
  const { toast } = useToast();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [gender, setGender] = useState<CharacterGender>('other');
  const [role, setRole] = useState<CharacterRole>('supporting');
  const [portrait, setPortrait] = useState('');
  const [fullBody, setFullBody] = useState('');
  const [bio, setBio] = useState('');
  
  // Open dialog to add a new character
  const openAddDialog = () => {
    setEditingCharacter(null);
    setName('');
    setGender('other');
    setRole('supporting');
    setPortrait('');
    setFullBody('');
    setBio('');
    setDialogOpen(true);
  };
  
  // Open dialog to edit a character
  const openEditDialog = (character: Character) => {
    setEditingCharacter(character);
    setName(character.name);
    setGender(character.gender);
    setRole(character.role);
    setPortrait(character.portrait || '');
    setFullBody(character.fullBody || '');
    setBio(character.bio);
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
    
    // Check if we're trying to add another protagonist
    const hasProtagonist = story.characters.some(
      c => c.role === 'protagonist' && (!editingCharacter || c.id !== editingCharacter.id)
    );
    
    if (role === 'protagonist' && hasProtagonist) {
      toast({
        title: "Cannot add another protagonist",
        description: "A story can only have one protagonist. Please change the role or edit the existing protagonist.",
        variant: "destructive"
      });
      return;
    }
    
    if (editingCharacter) {
      // Edit existing character
      const updatedCharacters = story.characters.map(c => 
        c.id === editingCharacter.id 
          ? { 
              ...c, 
              name, 
              gender, 
              role, 
              portrait: portrait || undefined, 
              fullBody: fullBody || undefined, 
              bio 
            } 
          : c
      );
      
      setStory({
        ...story,
        characters: updatedCharacters
      });
      
      toast({
        title: "Character updated",
        description: `${name} has been updated successfully.`
      });
    } else {
      // Add new character
      const newCharacter: Character = {
        id: generateId('character'),
        name,
        gender,
        role,
        portrait: portrait || undefined,
        fullBody: fullBody || undefined,
        bio
      };
      
      setStory({
        ...story,
        characters: [...story.characters, newCharacter]
      });
      
      toast({
        title: "Character added",
        description: `${name} has been added to your story.`
      });
    }
    
    closeDialog();
  };
  
  // Delete a character
  const handleDelete = (id: string) => {
    if (!story || !setStory) return;
    
    const characterToDelete = story.characters.find(c => c.id === id);
    if (!characterToDelete) return;
    
    // Check if this character is used in any scene elements
    let isUsed = false;
    story.scenes.forEach(scene => {
      scene.elements.forEach(element => {
        if (
          (element.type === 'dialogue' || element.type === 'thought') && 
          element.characterId === id
        ) {
          isUsed = true;
        } else if (element.type === 'dialogueTask' && element.targetCharacterId === id) {
          isUsed = true;
        }
      });
    });
    
    if (isUsed) {
      toast({
        title: "Cannot delete character",
        description: "This character is used in scene elements. Please remove all references to this character first.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCharacters = story.characters.filter(c => c.id !== id);
    
    setStory({
      ...story,
      characters: updatedCharacters
    });
    
    toast({
      title: "Character deleted",
      description: `${characterToDelete.name} has been removed from your story.`
    });
  };
  
  if (!story) return null;
  
  const protagonistExists = story.characters.some(c => c.role === 'protagonist');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Characters</h1>
          <p className="text-muted-foreground">
            Manage the characters in your interactive story.
          </p>
        </div>
        
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Character
        </Button>
      </div>
      
      {!protagonistExists && (
        <Alert variant="default" className="bg-amber-50 text-amber-600 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your story doesn't have a protagonist yet. Consider adding one.
          </AlertDescription>
        </Alert>
      )}
      
      {story.characters.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <User className="h-10 w-10 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-1">No Characters Yet</h3>
          <p className="text-muted-foreground mb-4">
            Add characters to your story to get started.
          </p>
          <Button onClick={openAddDialog} variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add First Character
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {story.characters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      
      {/* Character Edit/Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {editingCharacter ? 'Edit Character' : 'Add New Character'}
              </DialogTitle>
              <DialogDescription>
                {editingCharacter
                  ? 'Update the details of your character.'
                  : 'Fill in the details to create a new character.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Character name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-right">Gender</Label>
                  <RadioGroup 
                    value={gender} 
                    onValueChange={(value) => setGender(value as CharacterGender)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-right">Role</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value) => setRole(value as CharacterRole)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="protagonist" 
                      id="protagonist" 
                      disabled={role !== 'protagonist' && protagonistExists && !editingCharacter?.role}
                    />
                    <Label htmlFor="protagonist">Protagonist</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="supporting" id="supporting" />
                    <Label htmlFor="supporting">Supporting</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portrait" className="text-right">
                    Portrait Image URL
                  </Label>
                  <Input
                    id="portrait"
                    placeholder="https://example.com/image.jpg"
                    value={portrait}
                    onChange={(e) => setPortrait(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fullBody" className="text-right">
                    Full Body Image URL
                  </Label>
                  <Input
                    id="fullBody"
                    placeholder="https://example.com/image.jpg"
                    value={fullBody}
                    onChange={(e) => setFullBody(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-right">
                  Biography
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Character background and description..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCharacter ? 'Save Changes' : 'Add Character'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Characters;
