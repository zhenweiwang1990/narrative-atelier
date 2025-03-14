
import { useState } from 'react';
import { Character } from '@/utils/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

const CharacterCard = ({ character, onEdit, onDelete }: CharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="text-md flex items-center justify-between">
          <span className="truncate">{character.name}</span>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full", 
            character.role === 'protagonist' 
              ? "bg-primary/10 text-primary" 
              : "bg-muted text-muted-foreground"
          )}>
            {character.role === 'protagonist' ? '主角' : '配角'}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden bg-muted">
          {character.portrait ? (
            <>
              <div className={cn(
                "absolute inset-0 bg-muted animate-pulse",
                imageLoaded ? "hidden" : "block"
              )} />
              <img
                src={character.portrait}
                alt={character.name}
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={handleImageLoad}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <User className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs text-muted-foreground">性别：</span>
            <span className="text-xs capitalize">{character.gender === 'male' ? '男' : character.gender === 'female' ? '女' : '其他'}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {character.bio || "暂无角色简介。"}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mr-2"
          onClick={() => onEdit(character)}
        >
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-fit"
          onClick={() => onDelete(character.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
