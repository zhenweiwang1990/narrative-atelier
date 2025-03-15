
import { useToast } from "@/components/ui/use-toast";
import { Story } from "@/utils/types";
import { exportStory } from "@/utils/storage";
import { NavbarBrand } from "./navbar/NavbarBrand";
import { NavItems } from "./navbar/NavItems";
import { MobileMenu } from "./navbar/MobileMenu";
import { ActionButtons } from "./navbar/ActionButtons";

interface NavbarProps {
  story: Story | null;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const Navbar = ({ story, onImport, onSave }: NavbarProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    if (story) {
      exportStory(story);
      toast({
        title: "Story exported",
        description: `${story.title} has been exported as JSON file.`,
      });
    } else {
      toast({
        title: "Export failed",
        description: "No story to export.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    onSave();
    toast({
      title: "Story saved",
      description: "Your story has been saved locally.",
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <NavbarBrand />
          
          <MobileMenu 
            story={story} 
            onImport={onImport} 
            onSave={handleSave} 
            onExport={handleExport} 
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavItems />
          </div>

          {/* Action Buttons */}
          <ActionButtons 
            story={story} 
            onImport={onImport} 
            onSave={handleSave} 
            onExport={handleExport} 
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
