'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BarChart3 } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore Charts' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-text-primary">
          <BarChart3 className="h-6 w-6 text-accent-blue" />
          <span className="text-lg font-bold tracking-tight">
            WTF Happened<span className="text-accent-blue">?</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-1 text-text-secondary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border sm:hidden animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
