"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "glass shadow-sm border-b border-slate-200/50" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <Sparkles className="h-6 w-6 text-violet-600" />
            <span className="hidden sm:inline">{SITE_NAME}</span>
            <span className="sm:hidden">CRM</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => item.children && setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
                <Link href={item.href} className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors">
                  {item.label}
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" asChild className="hidden sm:inline-flex bg-violet-600 hover:bg-violet-700">
              <Link href="/quiz">Trouver mon CRM</Link>
            </Button>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden p-2 text-slate-600 hover:text-slate-900">
              {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => !item.children && setIsMobileOpen(false)} className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link key={child.href} href={child.href} onClick={() => setIsMobileOpen(false)} className="block pl-8 py-2 text-sm text-slate-500 hover:text-violet-600">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 px-4">
              <Button asChild className="w-full bg-violet-600 hover:bg-violet-700">
                <Link href="/quiz" onClick={() => setIsMobileOpen(false)}>Trouver mon CRM</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
