import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-narrow py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-lg font-semibold mb-4">Chamarel Healthcare</h3>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Professional domiciliary and community care for adults with mental health needs, learning disabilities, and complex support requirements.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/referrals" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            <li><Link to="/about" className="hover:text-primary-foreground transition-colors">Our Locations</Link></li>
            <li><Link to="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
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
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
        © 2025 by Chamarel Healthcare. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
