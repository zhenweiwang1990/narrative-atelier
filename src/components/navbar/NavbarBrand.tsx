
import { BookText } from "lucide-react";

export const NavbarBrand = () => {
  return (
    <div className="flex items-center space-x-2">
      <BookText className="h-6 w-6 text-primary" />
      <span className="text-xl font-semibold tracking-tight">
        Miss AI 剧情编辑器
      </span>
    </div>
  );
};
