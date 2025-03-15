
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
import Help from "./pages/Help";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import MyStories from "./pages/MyStories";
import { AuthProvider } from "./hooks/auth";
import { useAuth } from "./hooks/auth";

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
            <Route path="/my-stories" element={
              <ProtectedRoute>
                <Layout>
                  <MyStories />
                </Layout>
              </ProtectedRoute>
            } />
            
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
            <Route path="/editor/:slug/help" element={
              <ProtectedRoute>
                <Layout>
                  <Help />
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
            <Route path="/" element={<Navigate to="/my-stories" replace />} />
            <Route path="/characters" element={
              <ProtectedRoute>
                <Layout>
                  <Characters />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/locations" element={
              <ProtectedRoute>
                <Layout>
                  <Locations />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/global-values" element={
              <ProtectedRoute>
                <Layout>
                  <GlobalValues />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/flow" element={
              <ProtectedRoute>
                <Layout>
                  <Flow />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Layout>
                  <Help />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppWithAuth;
