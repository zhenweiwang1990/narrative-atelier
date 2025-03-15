
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/global-values" element={<GlobalValues />} />
              <Route path="/flow" element={<Flow />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/story-creation/text-processing" element={<TextProcessing />} />
              <Route path="/story-creation/interaction-marking" element={<InteractionMarking />} />
              <Route path="/story-creation/conversion" element={<StoryConversion />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
