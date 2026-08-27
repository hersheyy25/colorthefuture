import { useEffect, useState } from 'react';
import { Menu, X, Palette } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Values', href: '#values' },
  { label: 'Programs', href: '#programs' },
  { label: 'Workshops', href: '#workshops' },
  { label: 'Team', href: '#team' },
  { label: 'Volunteer', href: '#volunteer' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm ring-1 ring-brand-100'
          : 'bg-transparent'
      }`}
    >
      <div className="container-px flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white shadow-md shadow-brand-500/30">
            <Palette className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink-800">
            Color the Future
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-brand-100 hover:text-ink-800"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#workshops" className="btn-primary">
            Join the Fun
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-700 ring-1 ring-brand-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container-px space-y-1 bg-white/95 pb-5 pt-2 backdrop-blur-md">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-ink-700 hover:bg-brand-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#workshops"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 w-full"
          >
            Join the Fun
          </a>
        </div>
      </div>
    </header>
  );
}
