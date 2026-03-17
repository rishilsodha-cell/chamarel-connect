import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import YourNeeds from "./pages/YourNeeds.tsx";
import YourSupport from "./pages/YourSupport.tsx";
import Referrals from "./pages/Referrals.tsx";
import ReferralPage from "./pages/ReferralPage.tsx";
import Careers from "./pages/Careers.tsx";
import Privacy from "./pages/Privacy.tsx";
import CommunityCare from "./pages/CommunityCare.tsx";
import CommunityCarePage from "./pages/CommunityCarePage.tsx";
import Gallery from "./pages/Gallery.tsx";
import Stories from "./pages/Stories.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/your-needs" element={<YourNeeds />} />
          <Route path="/your-support" element={<YourSupport />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/community-care" element={<CommunityCare />} />
          <Route path="/community-care-services" element={<CommunityCarePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
