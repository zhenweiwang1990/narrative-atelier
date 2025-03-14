
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookText, 
  Users, 
  MapPin, 
  FlowChart, 
  Edit, 
  Save 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useStory } from '@/components/Layout';
import { Link } from 'react-router-dom';

const Index = () => {
  const { story, setStory } = useStory();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(story?.title || '');
  const [author, setAuthor] = useState(story?.author || '');
  const [description, setDescription] = useState(story?.description || '');

  const handleSave = () => {
    if (!story || !setStory) return;
    
    setStory({
      ...story,
      title,
      author,
      description
    });
    
    setIsEditing(false);
  };

  if (!story) return null;

  // Project statistics
  const stats = [
    { name: 'Characters', value: story.characters.length, icon: <Users className="h-4 w-4" />, path: '/characters' },
    { name: 'Locations', value: story.locations.length, icon: <MapPin className="h-4 w-4" />, path: '/locations' },
    { name: 'Scenes', value: story.scenes.length, icon: <FlowChart className="h-4 w-4" />, path: '/flow' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Story Overview</h1>
        <p className="text-muted-foreground">
          Manage your interactive story elements and narrative flow.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Story Info Card */}
        <Card className="md:col-span-2 h-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Story Details</CardTitle>
                <CardDescription>Basic information about your story</CardDescription>
              </div>
              
              {!isEditing ? (
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input 
                    id="author" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    rows={4}
                    className="mt-1" 
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                  <p className="mt-1">{story.title}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Author</h3>
                  <p className="mt-1">{story.author}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1 whitespace-pre-wrap">{story.description}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Stats and Quick Actions */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 p-2 bg-primary/10 rounded-full">
                        {stat.icon}
                      </div>
                      <span>{stat.name}</span>
                    </div>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/characters">
                  <Users className="h-4 w-4 mr-2" /> Manage Characters
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/locations">
                  <MapPin className="h-4 w-4 mr-2" /> Manage Locations
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/flow">
                  <FlowChart className="h-4 w-4 mr-2" /> Edit Scene Flow
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Activity or Project Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Guide</CardTitle>
          <CardDescription>How to create your interactive story</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  1
                </div>
                <h3 className="font-medium">Create Characters</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Define your protagonist and supporting characters with names, portraits, and backstories.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  2
                </div>
                <h3 className="font-medium">Design Locations</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Create the places where your story unfolds, complete with descriptions and background images.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  3
                </div>
                <h3 className="font-medium">Build Scenes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Design scenes with narration, dialogue, choices, and interactive elements to create your branching narrative.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link to="/characters">
              <BookText className="h-4 w-4 mr-2" /> Start Creating
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
