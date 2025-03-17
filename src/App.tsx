
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import GlobalValues from "./pages/GlobalValues";
import Flow from "./pages/Flow";
import Settings from "./pages/Settings";
import TextProcessing from "./pages/StoryCreation/TextProcessing";
import InteractionMarking from "./pages/StoryCreation/InteractionMarking";
import StoryConversion from "./pages/StoryCreation/StoryConversion";
import Music from "./pages/Music";
import Popup from "./pages/Popup";
import VersionHistory from "./pages/VersionHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/characters" element={<Layout><Characters /></Layout>} />
            <Route path="/locations" element={<Layout><Locations /></Layout>} />
            <Route path="/global-values" element={<Layout><GlobalValues /></Layout>} />
            <Route path="/flow" element={<Layout><Flow /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/version-history" element={<Layout><VersionHistory /></Layout>} />
            <Route
              path="/story-creation/text-processing"
              element={<Layout><TextProcessing /></Layout>}
            />
            <Route
              path="/story-creation/interaction-marking"
              element={<Layout><InteractionMarking /></Layout>}
            />
            <Route
              path="/story-creation/conversion"
              element={<Layout><StoryConversion /></Layout>}
            />
            <Route path="/music" element={<Layout><Music /></Layout>} />
            <Route path="/popup" element={<Popup />} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
