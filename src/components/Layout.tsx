import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialSidebar from "./SocialSidebar";
import AccreditationStrip from "./AccreditationStrip";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <SocialSidebar />
    <main className="flex-1">{children}</main>
    <AccreditationStrip />
    <Footer />
  </div>
);

export default Layout;
