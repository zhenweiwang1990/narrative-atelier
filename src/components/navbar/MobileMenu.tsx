
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Story } from "@/utils/types";
import { NavItems } from "./NavItems";
import { ActionButtons } from "./ActionButtons";

interface MobileMenuProps {
  story: Story | null;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onExport: () => void;
}

export const MobileMenuToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export const MobileMenu = ({ story, onImport, onSave, onExport }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <MobileMenuToggle isOpen={isOpen} onClick={toggleMenu} />
      
      {isOpen && (
        <div className="md:hidden py-2 animate-fade-in">
          <div className="flex flex-col space-y-1 pb-3 border-b">
            <NavItems onClick={closeMenu} isMobile />
          </div>
          <ActionButtons 
            story={story} 
            onImport={onImport} 
            onSave={onSave} 
            onExport={onExport}
            isMobile
          />
        </div>
      )}
    </>
  );
};
