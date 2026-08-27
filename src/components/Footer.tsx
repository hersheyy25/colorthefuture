import { useState } from 'react';
import { Palette, Mail, MapPin, Instagram, Facebook, Twitter, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('newsletter').insert({
      email: email.trim(),
    });
    if (error) {
      if (error.code === '23505') {
        setState('success');
        return;
      }
      setState('error');
      setErrorMsg('Oops! Something went wrong; please try again in a moment! :)');
      return;
    }
    setState('success');
  }

  return (
    <footer className="relative overflow-hidden bg-ink-800 text-ink-300">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-coral-400/15 blur-3xl" />

      <div className="container-px relative py-16 sm:py-20">
        {/* Newsletter CTA */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
                <Palette className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                Color the Future
              </span>
            </a>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-400">
              A youth-led community initiative working on inspiring the future generation to be creative. Free and low-cost workshops, creative events, and volunteer
              opportunities that build confidence and community.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-300 ring-1 ring-white/10"
              >
                <Instagram className="h-5 w-5" />
              </span>
              <span
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-ink-300 ring-1 ring-white/10"
              >
                <Facebook className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 sm:p-9">
            <h3 className="font-display text-xl font-semibold text-white">
              Stay in the loop!
            </h3>
            <p className="mt-2 text-sm text-ink-400">
              Get notified about new workshops, community events, and ways to
              help. No spam, just colorful updates. :)
            </p>

            {state === 'success' ? (
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-brand-500/15 px-4 py-3.5 ring-1 ring-brand-400/30">
                <CheckCircle2 className="h-5 w-5 text-brand-400" />
                <p className="text-sm font-medium text-brand-200">
                  You're subscribed! Watch your inbox for colorful updates.
                </p>
              </div>
            ) : (
              <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border-0 bg-ink-700 px-4 py-3 text-sm text-white placeholder:text-ink-500 ring-1 ring-white/10 transition focus:outline-none focus:ring-2 focus:ring-brand-400"
                  />
                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="btn-primary shrink-0 disabled:opacity-70"
                  >
                    {state === 'submitting' ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                {state === 'error' && (
                  <p className="flex items-center gap-2 text-sm font-medium text-coral-400">
                    <AlertCircle className="h-4 w-4" />
                    {errorMsg}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Links + contact */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'About', href: '#about' },
                { label: 'Our Values', href: '#values' },
                { label: 'Programs', href: '#programs' },
                { label: 'Workshops', href: '#workshops' },
                { label: 'Meet the Team', href: '#team' },
                { label: 'Volunteer', href: '#volunteer' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-ink-400 transition hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Programs
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Painting', 'Drawing', 'Seasonal Crafts', 'Public Art', 'Volunteer Days'].map(
                (p) => (
                  <li key={p}>
                    <a href="#programs" className="text-ink-400 transition hover:text-white">
                      {p}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5 text-ink-400">
                <Mail className="h-4 w-4 text-brand-400" />
                <a href="mailto:colorthefuturfrisco@gmail.com" className="hover:text-white">
                  colorthefuturefrisco@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-ink-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-400" />
                <span>Frisco</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Color the Future. A youth-led community initiative.</p>
          <p>Making the world a brighter, more colorful, place. One young artist at a time 🩷</p>
        </div>
      </div>
    </footer>
  );
}
