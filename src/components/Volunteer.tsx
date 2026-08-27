import { useState } from 'react';
import { Heart, CheckCircle2, Loader2, AlertCircle, HandHeart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const interestOptions = [
  'Leading workshops',
  'Mentoring young artists',
  'Event setup & support',
  'Fundraising & outreach',
  'Public art projects',
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Volunteer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function toggleInterest(opt: string) {
    setInterests((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('volunteers').insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      interests: interests.join(', '),
      message: message.trim() || null,
    });
    if (error) {
      setState('error');
      setErrorMsg('Oops, something went wrong. Please try again in a moment.');
      return;
    }
    setState('success');
  }

  return (
    <section id="volunteer" className="py-20 sm:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy + image */}
          <div className="reveal">
            <span className="eyebrow">
              <HandHeart className="h-3.5 w-3.5" />
              Get involved!
            </span>
            <h2 className="mt-5 section-title">
              Share your time, spark a young artist's confidence 🩷
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-600">
              Volunteers are the heart of Color the Future. Whether you're an
              artist, a regular student, or just someone who cares, we have a
              spot for you! Help run a workshop, mentor a young artist, support
              an event, or lend a hand behind the scenes.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl shadow-lg ring-1 ring-brand-100">
              <img
                src="HappyCTF.jpeg"
                alt="Group of hands holding paintbrushes together in a vibrant art workshop"
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="reveal card p-7 sm:p-9">
            {state === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                  <CheckCircle2 className="h-9 w-9 text-brand-600" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink-800">
                  Thank you for signing up!
                </h3>
                <p className="mt-2 max-w-sm text-ink-600">
                  We got your volunteer interest. Our team will reach out soon
                  with opportunities that match what you'd like to do.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-coral-100 text-coral-500">
                    <Heart className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-ink-800">
                    Volunteer with us
                  </h3>
                </div>
                <p className="mt-2 text-sm text-ink-500">
                  Tell us a little about yourself and how you'd like to help.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-ink-700">
                        Full name
                      </span>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jamie Rivera"
                        className="input"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-ink-700">
                        Email
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="input"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-700">
                      Phone <span className="text-ink-400">(optional)</span>
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="input"
                    />
                  </label>

                  <div>
                    <span className="mb-2 block text-sm font-medium text-ink-700">
                      I'm interested in…
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((opt) => {
                        const active = interests.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleInterest(opt)}
                            className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                              active
                                ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                                : 'bg-brand-50 text-ink-600 ring-1 ring-brand-200 hover:bg-brand-100'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-ink-700">
                      Anything else? <span className="text-ink-400">(optional)</span>
                    </span>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your experience or availability…"
                      className="input resize-none"
                    />
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
                        Submitting…
                      </>
                    ) : (
                      'Submit Volunteer Sign-Up'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
