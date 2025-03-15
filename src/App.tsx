
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/Layout";
import { StoryContext } from "./contexts/StoryContext";
import { useStoryManagement } from "./hooks/useStoryManagement";

// Pages
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import Flow from "./pages/Flow";
import GlobalValues from "./pages/GlobalValues";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Story creation
import TextProcessing from "./pages/StoryCreation/TextProcessing";
import InteractionMarking from "./pages/StoryCreation/InteractionMarking";
import StoryConversion from "./pages/StoryCreation/StoryConversion";
import FlowLoadingState from "./components/flow/FlowLoadingState";

function App() {
  // Use the story management hook to get story data and functions
  const storyManagement = useStoryManagement();
  const { loading, error } = storyManagement;

  // Mock authentication status - in a real app, this would check if the user is logged in
  const isAuthenticated = true;

  // If story is loading, show loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FlowLoadingState error={error} />
      </div>
    );
  }

  return (
    <StoryContext.Provider value={storyManagement}>
      <Router>
        <Layout>
          <Routes>
            {/* Auth routes - accessible without authentication */}
            <Route path="/login" element={<Login />} />
            
            {/* Static pages */}
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Main app routes - require authentication */}
            <Route path="/" element={<Index />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/flow" element={<Flow />} />
            <Route path="/global-values" element={<GlobalValues />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Story creation */}
            <Route path="/story-creation/text-processing" element={<TextProcessing />} />
            <Route path="/story-creation/interaction-marking" element={<InteractionMarking />} />
            <Route path="/story-creation/conversion" element={<StoryConversion />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </StoryContext.Provider>
  );
}

export default App;
