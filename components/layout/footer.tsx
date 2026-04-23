import Link from "next/link";
import { FileText } from "lucide-react";

const links = {
  product: [
    { label: "Templates", href: "/templates" },
    { label: "Resume Builder", href: "/builder" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  resources: [
    { label: "Resume Tips", href: "#resume-tips" },
    { label: "Career Blog", href: "#career-blog" },
    { label: "ATS Guide", href: "#ats-guide" },
  ],
  company: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Contact", href: "#contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-base mb-3">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <FileText className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              ResumeForge
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Minimal, modern resume builder inspired by the best tools.
              Free forever — no watermarks, no paywalls.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-4">Product</h4>
            <ul className="space-y-2.5">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-4">Company</h4>
            <ul className="space-y-2.5">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ResumeForge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Inspired by Novoresume · Enhancv · Overleaf
          </p>
        </div>
      </div>
    </footer>
  );
}
