
import React from "react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const PageFooter = () => {
  return (
    <footer className="py-6 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>©2024 Miss AI</span>
            <span className="mx-2">·</span>
            <a 
              href="https://beian.miit.gov.cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary"
            >
              ICP备案 123456789号
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
          
          <div className="flex gap-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
              关于我们
            </Link>
            <Link to="/agreement" className="text-sm text-muted-foreground hover:text-primary">
              用户协议
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
