
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Characters from "./pages/Characters";
import Locations from "./pages/Locations";
import Flow from "./pages/Flow";
import GlobalValues from "./pages/GlobalValues";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login"; 
import About from "./pages/About";
import Agreement from "./pages/Agreement";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <Routes>
      {/* Login and static pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/agreement" element={<Agreement />} />
      <Route path="/privacy" element={<Privacy />} />
      
      {/* Main app */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="characters" element={<Characters />} />
        <Route path="locations" element={<Locations />} />
        <Route path="flow" element={<Flow />} />
        <Route path="global-values" element={<GlobalValues />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
