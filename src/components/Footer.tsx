
import React from "react";
import { Link } from "react-router-dom";
import { BookText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <BookText className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              Miss AI 剧情编辑器
            </span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              关于我们
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              用户协议
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              隐私政策
            </Link>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:underline">
              ICP备xxxxxxxx号-1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
