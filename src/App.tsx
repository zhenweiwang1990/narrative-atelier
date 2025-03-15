
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
import About from "./pages/About";
import Agreement from "./pages/Agreement";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import ChapterPreview from "./pages/StoryCreation/ChapterPreview";

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
            <Route path="/story-creation/text-processing" element={<Layout><TextProcessing /></Layout>} />
            <Route path="/story-creation/interaction-marking" element={<Layout><InteractionMarking /></Layout>} />
            <Route path="/story-creation/conversion" element={<Layout><StoryConversion /></Layout>} />
            <Route path="/story-creation/preview" element={<Layout><ChapterPreview /></Layout>} />
            <Route path="/about" element={<About />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
