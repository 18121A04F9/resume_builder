"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./theme-toggle";
import { FileText, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>ResumeForge</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/templates"
              className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Templates
            </Link>
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/builder"
                  className="ml-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  New Resume
                </Link>
                <div className="ml-2 flex items-center gap-2 pl-2 border-l border-border">
                  {session.user?.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-7 h-7 rounded-full"
                    />
                  )}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="ml-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
            )}
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <Link
                href="/templates"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-2 rounded-md transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Templates
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-2 rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/builder"
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold mt-1"
                    onClick={() => setMobileOpen(false)}
                  >
                    New Resume
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: "/" }); setMobileOpen(false); }}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-semibold mt-1"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
