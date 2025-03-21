
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface LocationSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const LocationSearchBar: React.FC<LocationSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="搜索地点..."
        className="pl-9 h-9"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default LocationSearchBar;
