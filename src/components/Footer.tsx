import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-narrow py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">Chamarel Healthcare</h3>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Values-led care and support for adults with learning disabilities, autism, and mental health needs across London.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-primary-foreground transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
            <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
            <li><a href="/#get-in-touch" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Instagram" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
      {/* Social strip */}
      <div className="border-t border-primary-foreground/10 mt-12 pt-8">
        <p className="text-center text-sm text-primary-foreground/70 mb-4">Stay connected with Chamarel Healthcare</p>
        <div className="flex justify-center gap-4">
          {[
            { icon: Instagram, label: "Instagram", href: "https://instagram.com/chamarelhealthcare" },
            { icon: Facebook, label: "Facebook", href: "https://facebook.com/chamarelhealthcare" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/chamarelhealthcare" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors text-sm font-medium"
            >
              <s.icon size={16} strokeWidth={1.5} />
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-primary-foreground/50">
        © 2025 Chamarel Healthcare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
