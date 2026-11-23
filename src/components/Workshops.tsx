import { useState } from 'react';
import { Phone, CheckCircle2, Loader2, AlertCircle, CalendarHeart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const collage = [
  { src: '/CTFCover.jpg', alt: 'Colorful artwork and art supplies', span: 'sm:col-span-2 sm:row-span-2' },
  { src: '/HappyCTF.jpeg', alt: 'A Color the Future community moment', span: '' },
  { src: '/hersheyctfpic.jpg', alt: 'A member of the Color the Future community', span: '' },
];

export default function Workshops() {
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('workshop_signups').insert({ phone: phone.trim() });
    if (error) {
      setState('error');
      setErrorMsg('Oops, something went wrong. Please try again in a moment.');
      return;
    }
    setState('success');
  }

  return (
    <section id="workshops" className="bg-[#fffaf3] py-24 sm:py-32">
      <div className="container-px">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <div className="reveal order-2 lg:order-1">
            <span className="eyebrow"><CalendarHeart className="h-4 w-4" strokeWidth={1.8} /> Workshops</span>
            <h2 className="mt-5 section-title">Want the next workshop date?</h2>
            <p className="mt-6 max-w-xl text-lg text-[#725d55]">We host free and low-cost workshops throughout the year, with painting, drawing, seasonal crafts, and public art on the table. Leave your number and we will text you when the next one is ready.</p>

            <div className="paper-card mt-9 p-7 sm:p-9">
              {state === 'success' ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-[#6caa68]" strokeWidth={1.5} />
                  <h3 className="mt-5 text-3xl">You are on the workshop list.</h3>
                  <p className="mt-2 max-w-sm text-sm text-[#806960]">We will send the details when the next workshop is announced.</p>
                  <button type="button" onClick={() => { setState('idle'); setPhone(''); }} className="btn-ghost mt-5">Add another number</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-2 block text-sm font-extrabold text-[#6c5149]">Your phone number</span>
                    <span className="relative block">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a37f72]" />
                      <input type="tel" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 123-4567" className="input pl-10" />
                    </span>
                  </label>
                  {state === 'error' && <p className="flex items-center gap-2 text-sm font-bold text-[#c95168]"><AlertCircle className="h-4 w-4" />{errorMsg}</p>}
                  <button type="submit" disabled={state === 'submitting'} className="btn-primary w-full disabled:opacity-70">
                    {state === 'submitting' ? <><Loader2 className="h-4 w-4 animate-spin" />Saving…</> : 'Text me the next date'}
                  </button>
                  <p className="text-center text-xs text-[#a37f72]">Only upcoming workshop texts. Nothing else.</p>
                </form>
              )}
            </div>
          </div>

          <div className="reveal order-1 lg:order-2">
            <div className="grid auto-rows-[140px] grid-cols-2 gap-4 sm:auto-rows-[180px]">
              {collage.map((image, index) => (
                <div key={image.src} className={`photo-frame ${index === 0 ? '-rotate-2' : index === 1 ? 'rotate-3' : '-rotate-3'} ${image.span}`}>
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                </div>
              ))}
              <div className="note-card flex flex-col items-center justify-center p-4 text-center">
                <p className="font-display text-2xl text-[#8c5946]">Free + low-cost</p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#a37f72]">Kids, teens, and families</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
