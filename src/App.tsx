
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import GlobalValues from "./pages/GlobalValues";
import Flow from "./pages/Flow";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import { AuthProvider } from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">正在加载...</h2>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppWithAuth = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Editor routes with slug */}
            <Route path="/editor/:slug" element={
              <ProtectedRoute>
                <Layout>
                  <Index />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/editor/:slug/characters" element={
              <ProtectedRoute>
                <Layout>
                  <Characters />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/editor/:slug/locations" element={
              <ProtectedRoute>
                <Layout>
                  <Locations />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/editor/:slug/global-values" element={
              <ProtectedRoute>
                <Layout>
                  <GlobalValues />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/editor/:slug/flow" element={
              <ProtectedRoute>
                <Layout>
                  <Flow />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/editor/:slug/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Root routes - redirect to auth if not logged in */}
            <Route path="/" element={
              <Layout>
                <Index />
              </Layout>
            } />
            <Route path="/characters" element={
              <Layout>
                <Characters />
              </Layout>
            } />
            <Route path="/locations" element={
              <Layout>
                <Locations />
              </Layout>
            } />
            <Route path="/global-values" element={
              <Layout>
                <GlobalValues />
              </Layout>
            } />
            <Route path="/flow" element={
              <Layout>
                <Flow />
              </Layout>
            } />
            <Route path="/settings" element={
              <Layout>
                <Settings />
              </Layout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppWithAuth;
