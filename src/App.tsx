import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import YourNeeds from "./pages/YourNeeds.tsx";
import Careers from "./pages/Careers.tsx";
import Privacy from "./pages/Privacy.tsx";
import Stories from "./pages/Stories.tsx";
import OurHomes from "./pages/OurHomes.tsx";
import NotFound from "./pages/NotFound.tsx";
import Paresh from "./pages/Paresh.tsx";
import NewsletterArchive from "./pages/NewsletterArchive.tsx";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/your-needs" element={<YourNeeds />} />
          <Route path="/your-support" element={<Navigate to="/" replace />} />
          <Route path="/referrals" element={<Navigate to="/" replace />} />
          <Route path="/referral" element={<Navigate to="/" replace />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/community-care" element={<Navigate to="/" replace />} />
          <Route path="/community-care-services" element={<Navigate to="/" replace />} />
          <Route path="/our-homes" element={<OurHomes />} />
          <Route path="/homes" element={<OurHomes />} />
          <Route path="/gallery" element={<Navigate to="/" replace />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/paresh" element={<Paresh />} />
          <Route path="/newsletter" element={<NewsletterArchive />} />
          <Route path="/newsletters" element={<NewsletterArchive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
