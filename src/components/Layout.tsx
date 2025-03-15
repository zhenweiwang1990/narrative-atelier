
import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "./ui/toaster";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Footer } from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar 
            story={null} 
            onImport={() => {}} 
            onSave={() => {}} 
          />
          <main className="flex-1">
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
