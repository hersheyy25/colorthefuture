import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

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
        scrolled ? 'border-b border-[#ead7c9] bg-[#fffaf3]/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-px flex h-[76px] items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="Color the Future home">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[#dcffd8] ring-1 ring-[#ccecc8]">
            <img src="/ColorTheFutureLogo.png" alt="" className="h-full w-full object-contain" />
          </span>
          <span className="hidden font-sans text-sm font-extrabold uppercase tracking-[0.12em] text-[#503f3a] sm:inline">
            Color the Future
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-bold text-[#806960] transition-colors hover:bg-[#fff0e4] hover:text-[#c95168]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a href="#workshops" className="btn-primary px-5 py-2.5">
            Find a workshop
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#503f3a] ring-1 ring-[#e7cfc1] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? 'max-h-[520px]' : 'max-h-0'}`}>
        <nav className="container-px space-y-1 border-t border-[#ead7c9] bg-[#fffaf3] pb-5 pt-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-bold text-[#6c5149] hover:bg-[#fff0e4]"
            >
              {link.label}
            </a>
          ))}
          <a href="#workshops" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
            Find a workshop
          </a>
        </nav>
      </div>
    </header>
  );
}
