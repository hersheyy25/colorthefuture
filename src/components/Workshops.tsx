import { useState } from 'react';
import { Phone, CheckCircle2, Loader2, AlertCircle, CalendarHeart } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ClayIcon from './ClayIcon';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const collage = [
  {
    src: 'https://images.pexels.com/photos/7869798/pexels-photo-7869798.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Kids crafting with paper and glue in a creative workshop',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/6941450/pexels-photo-6941450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Two children working on colorful paper art cutouts',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/8467274/pexels-photo-8467274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Two children showcasing colorful paintings in an art classroom',
    span: '',
  },
];

export default function Workshops() {
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('workshop_signups').insert({
      phone: phone.trim(),
    });
    if (error) {
      setState('error');
      setErrorMsg('Oops, something went wrong. Please try again in a moment.');
      return;
    }
    setState('success');
  }

  return (
    <section id="workshops" className="py-20 sm:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sign-up card */}
          <div className="reveal order-2 lg:order-1">
            <span className="eyebrow">
              <ClayIcon icon={CalendarHeart} color="coral" size="sm" iconClassName="h-3.5 w-3.5" />
              Workshops
            </span>
            <h2 className="mt-5 section-title">
              Get a text when the next workshop opens
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">
              We host free and low-cost community art workshops all year
              round: painting, drawing, seasonal crafts, and public art. Pop in
              your number and we'll text you the next time we're running one.
            </p>

            <div className="mt-8 rounded-3xl bg-white p-7 ring-1 ring-brand-100 shadow-sm sm:p-8">
              {state === 'success' ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <ClayIcon icon={CheckCircle2} color="brand" size="xl" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink-800">
                    You're on the list!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-ink-600">
                    We'll text you the details the next time we host a workshop.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setState('idle');
                      setPhone('');
                    }}
                    className="btn-ghost mt-5"
                  >
                    Add another number
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-700">
                      Your phone number
                    </span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="input pl-10"
                      />
                    </div>
                  </label>

                  {state === 'error' && (
                    <p className="flex items-center gap-2 text-sm font-medium text-coral-600">
                      <AlertCircle className="h-4 w-4" />
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="btn-primary w-full disabled:opacity-70"
                  >
                    {state === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      'Notify Me'
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-400">
                    We'll only text you about upcoming workshops. Pinky promise.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Collage */}
          <div className="reveal order-1 lg:order-2">
            <div className="grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[170px] sm:gap-4">
              {collage.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-100 ${img.span}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Decorative tile */}
              <div className="flex flex-col items-center justify-center rounded-2xl bg-coral-300 p-4 text-center text-white shadow-sm">
                <p className="font-display text-lg font-semibold leading-tight">
                  Price = Free!
                </p>
                <p className="mt-1 text-xs text-white/80">All ages welcome</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
