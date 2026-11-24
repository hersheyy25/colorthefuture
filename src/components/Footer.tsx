import { useState } from 'react';
import { Mail, MapPin, Instagram, Facebook, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
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
    const { error } = await supabase.from('newsletter').insert({ email: email.trim() });
    if (error) {
      if (error.code === '23505') { setState('success'); return; }
      setState('error');
      setErrorMsg('That did not go through. Please try again.');
      return;
    }
    setState('success');
  }

  return (
    <footer className="relative overflow-hidden bg-[#503f3a] text-[#ead7c9]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f7a4a7]/15 blur-3xl" />
      <div className="container-px relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <a href="#top" className="inline-flex items-center gap-3"><span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-[#dcffd8]"><img src="/ColorTheFutureLogo.png" alt="Color the Future logo" className="h-full w-full object-contain" /></span><span className="font-sans text-sm font-extrabold uppercase tracking-[0.12em] text-white">Color the Future</span></a>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#c4aaa0]">A youth-led art initiative in Frisco with free workshops, creative events, and ways to volunteer.</p>
            <div className="mt-7 flex items-center gap-4 text-[#f7c1c1]"><Instagram className="h-5 w-5" /><Facebook className="h-5 w-5" /></div>
          </div>

          <div className="border border-[#765d54] bg-[#5c4741] p-7 sm:p-9">
            <h3 className="text-3xl text-white">Stay in the loop.</h3>
            <p className="mt-2 text-sm text-[#c4aaa0]">Get the next workshop date, community event news, and occasional ways to help.</p>
            {state === 'success' ? <div className="mt-5 flex items-center gap-3 border border-[#7eae76] bg-[#6caa68]/15 px-4 py-3.5"><CheckCircle2 className="h-5 w-5 text-[#b9e3ad]" /><p className="text-sm font-bold text-[#d7f1cf]">You&apos;re subscribed! We&apos;ll send the next update to your inbox.</p></div> : <form className="mt-5 space-y-3" onSubmit={handleSubmit}><div className="flex flex-col gap-3 sm:flex-row"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border-0 bg-[#503f3a] px-4 py-3 text-sm text-white placeholder:text-[#a88f86] ring-1 ring-[#806960] focus:outline-none focus:ring-2 focus:ring-[#f7a4a7]" /><button type="submit" disabled={state === 'submitting'} className="btn-primary shrink-0 disabled:opacity-70">{state === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}</button></div>{state === 'error' && <p className="flex items-center gap-2 text-sm font-bold text-[#f7b9b9]"><AlertCircle className="h-4 w-4" />{errorMsg}</p>}</form>}
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-[#765d54] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div><h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-white">Explore</h4><ul className="mt-4 space-y-2.5 text-sm text-[#c4aaa0]">{[{ label: 'About', href: '#about' }, { label: 'Our values', href: '#values' }, { label: 'Programs', href: '#programs' }, { label: 'Workshops', href: '#workshops' }, { label: 'Meet the team', href: '#team' }, { label: 'Volunteer', href: '#volunteer' }].map((link) => <li key={link.href}><a href={link.href} className="transition hover:text-white">{link.label}</a></li>)}</ul></div>
          <div><h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-white">Programs</h4><ul className="mt-4 space-y-2.5 text-sm text-[#c4aaa0]">{['Drawing', 'Seasonal crafts', 'Public art', 'Volunteer days'].map((program) => <li key={program}><a href="#programs" className="transition hover:text-white">{program}</a></li>)}</ul></div>
          <div className="sm:col-span-2"><h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-white">Get in touch</h4><ul className="mt-4 space-y-3 text-sm text-[#c4aaa0]"><li className="flex items-center gap-3"><Mail className="h-4 w-4 text-[#f7a4a7]" /><a href="mailto:colorthefuturefrisco@gmail.com" className="hover:text-white">colorthefuturefrisco@gmail.com</a></li><li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-[#f2cb65]" /><span>Frisco</span></li></ul></div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#765d54] pt-8 text-xs text-[#a88f86] sm:flex-row"><p>© {new Date().getFullYear()} Color the Future. A youth-led community initiative.</p><p>Color the Future is based in Frisco.</p></div>
      </div>
    </footer>
  );
}
