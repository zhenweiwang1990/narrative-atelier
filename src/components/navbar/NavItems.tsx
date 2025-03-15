
import { Link, useLocation } from "react-router-dom";
import { BookText, Users, MapPin, Network, Music } from "lucide-react";

interface NavItemProps {
  path: string;
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavItem = ({ path, name, icon, onClick, isMobile = false }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`flex items-center ${isMobile ? 'px-3 py-2' : 'px-3 py-2'} rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {icon}
      <span className="ml-2">{name}</span>
    </Link>
  );
};

export const useNavItems = () => {
  return [
    { 
      path: "/", 
      name: "Overview", 
      icon: <BookText className="w-5 h-5" /> 
    },
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
      path: "/music",
      name: "Music",
      icon: <Music className="w-5 h-5" />,
    },
    {
      path: "/flow",
      name: "Scene Flow",
      icon: <Network className="w-5 h-5" />,
    },
  ];
};

interface NavItemsProps {
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavItems = ({ onClick, isMobile = false }: NavItemsProps) => {
  const navItems = useNavItems();
  
  return (
    <>
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          path={item.path}
          name={item.name}
          icon={item.icon}
          onClick={onClick}
          isMobile={isMobile}
        />
      ))}
    </>
  );
};
