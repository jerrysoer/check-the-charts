import { BarChart3, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-text-secondary">
            <BarChart3 className="h-5 w-5 text-accent-blue" />
            <span className="text-sm font-medium">
              Check the Charts
            </span>
            <span className="text-sm">— A Data Literacy Project</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <Link href="/explore" className="hover:text-text-primary transition-colors">
              Charts
            </Link>
            <Link href="/about" className="hover:text-text-primary transition-colors">
              About
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              Open Source
            </a>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          No ads. No paywall. Built for education. MIT License.
        </p>
      </div>
    </footer>
  );
}
