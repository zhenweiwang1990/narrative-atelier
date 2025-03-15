import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookText,
  Users,
  MapPin,
  Network,
  Download,
  Upload,
  Save,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Story } from "@/utils/types";
import { exportStory, saveStory } from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";

interface NavbarProps {
  story: Story | null;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

const Navbar = ({ story, onImport, onSave }: NavbarProps) => {
  const location = useLocation();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

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

  const navItems = [
    { path: "/", name: "Overview", icon: <BookText className="w-5 h-5" /> },
    {
      path: "/characters",
      name: "Characters",
      icon: <Users className="w-5 h-5" />,
    },
    {
      path: "/locations",
      name: "Locations",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      path: "/flow",
      name: "Scene Flow",
      icon: <Network className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <BookText className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              Miss AI 剧情编辑器
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <label htmlFor="import-file">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                asChild
              >
                <div>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </div>
              </Button>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={onImport}
                className="hidden"
              />
            </label>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-2 animate-fade-in">
            <div className="flex flex-col space-y-1 pb-3 border-b">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-accent"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3">
              <label htmlFor="mobile-import-file" className="flex-1 mr-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center"
                  asChild
                >
                  <div>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </div>
                </Button>
                <input
                  id="mobile-import-file"
                  type="file"
                  accept=".json"
                  onChange={onImport}
                  className="hidden"
                />
              </label>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 mr-2 flex items-center justify-center"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1 flex items-center justify-center"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
