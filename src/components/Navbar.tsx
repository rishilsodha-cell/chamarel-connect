import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const mobileLinks = [
  { label: "Home", path: "/" },
  { label: "Your Needs", path: "/your-needs" },
  { label: "Your Support", path: "/your-support" },
  { label: "Life at Chamarel", path: "/gallery" },
  { label: "Stories", path: "/stories" },
  { label: "About Us", path: "/about" },
  { label: "Community Care Services", path: "/community-care-services" },
  { label: "Make a Referral", path: "/referral" },
  { label: "Careers", path: "/careers" },
  { label: "Contact Us", path: "/#contact" },
];

const desktopLinks = [
  { label: "Your Needs", path: "/your-needs" },
  { label: "Your Support", path: "/your-support" },
  { label: "Community Care", path: "/community-care-services" },
  { label: "Referral", path: "/referral" },
  { label: "About Us", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Stories", path: "/stories" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path.startsWith("/#")) return false;
    return location.pathname === path;
  };

  const handleClick = (path: string) => {
    setOpen(false);
    if (path === "/#contact") {
      if (location.pathname === "/") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex flex-col">
          <div className="text-lg md:text-[22px] leading-tight">
            <span className="font-bold" style={{ color: "#00706B" }}>Chamarel</span>{" "}
            <span className="font-normal" style={{ color: "#2D2D2D" }}>Healthcare</span>
          </div>
          <div className="h-0.5 w-9 mt-1 rounded-full" style={{ backgroundColor: "#00706B" }} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {desktopLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleClick(link.path)}
              className={`text-xs font-medium tracking-wide uppercase transition-opacity duration-200 relative group ${
                isActive(link.path)
                  ? "text-primary opacity-100"
                  : "text-foreground/70 hover:text-foreground hover:opacity-100"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-transform duration-200 origin-left ${
                  isActive(link.path) ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="xl:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="xl:hidden overflow-hidden bg-white"
          >
            <div className="flex flex-col">
              {mobileLinks.map((link, i) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleClick(link.path)}
                  className="text-lg font-medium py-4 px-6"
                  style={{
                    color: "#2D2D2D",
                    borderLeft: "3px solid #00706B",
                    borderBottom: i < mobileLinks.length - 1 ? "1px solid #EEEEEE" : "none",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
