
import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "./ui/toaster";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Footer } from "./Footer";
import { useStory } from "@/contexts/StoryContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { story, handleImport, handleSave } = useStory();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar 
            story={story} 
            onImport={handleImport} 
            onSave={handleSave} 
          />
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
