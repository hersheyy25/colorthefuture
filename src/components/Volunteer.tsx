import { useState } from 'react';
import { Heart, CheckCircle2, Loader2, AlertCircle, HandHeart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const interestOptions = ['Leading workshops', 'Mentoring young artists', 'Event setup & support', 'Fundraising & outreach', 'Public art projects'];type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Volunteer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function toggleInterest(option: string) {
    setInterests((current) => current.includes(option) ? current.filter((item) => item !== option) : [...current, option]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');
    const { error } = await supabase.from('volunteers').insert({ name: name.trim(), email: email.trim(), phone: phone.trim() || null, interests: interests.join(', '), message: message.trim() || null });
    if (error) {
      setState('error');
      setErrorMsg('That did not go through, please try again!');
      return;
    }
    setState('success');
  }

  return (
    <section id="volunteer" className="bg-[#fff0e4] py-24 sm:py-32">
      <div className="container-px">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="reveal">
            <span className="eyebrow"><HandHeart className="h-4 w-4" strokeWidth={1.8} /> Ways to help</span>
            <h2 className="mt-5 section-title">Help with a workshop, a project, or the details in between.</h2>
            <p className="mt-7 max-w-xl text-lg text-[#725d55]">You can lead a workshop, mentor a young artist, help with event setup, support outreach, or join a public art project. Choose one on the form, or tell us where you would be most useful.</p>
            <div className="photo-frame relative mt-9 rotate-2 max-w-lg">
              <span className="tape -right-7 top-8 rotate-12" />
              <img src="/HappyCTF.jpeg" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            </div>
          </div>

          <div className="reveal paper-card p-7 sm:p-9">
            {state === 'success' ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-[#6caa68]" strokeWidth={1.5} />
                <h3 className="mt-5 text-3xl">Thanks for offering your time!</h3>
                <p className="mt-2 max-w-sm text-[#806960]">We will be in touch with what comes next soon!</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3"><Heart className="h-6 w-6 text-[#ef7185]" fill="currentColor" strokeWidth={1.5} /><h3 className="text-3xl">What would you like to help with?</h3></div>
                <p className="mt-2 text-sm text-[#806960]">A few details will help us find the right project for you:</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block"><span className="mb-2 block text-sm font-extrabold text-[#6c5149]">Full name</span><input type="text" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Jamie Rivera" className="input" /></label>
                    <label className="block"><span className="mb-2 block text-sm font-extrabold text-[#6c5149]">Email (No school emails please!)</span><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="input" /></label>
                  </div>
                  <label className="block"><span className="mb-2 block text-sm font-extrabold text-[#6c5149]">Phone <span className="font-normal text-[#a37f72]">(optional!)</span></span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(555) 123-4567" className="input" /></label>
                  <div><span className="mb-2 block text-sm font-extrabold text-[#6c5149]">I&apos;m interested in…</span><div className="flex flex-wrap gap-2">{interestOptions.map((option) => { const active = interests.includes(option); return <button key={option} type="button" onClick={() => toggleInterest(option)} className={`rounded-full px-3.5 py-2 text-sm font-bold transition ${active ? 'bg-[#f05b78] text-white' : 'bg-[#fffaf3] text-[#806960] ring-1 ring-[#ead7c9] hover:bg-white'}`}>{option}</button>; })}</div></div>
                  <label className="block"><span className="mb-2 block text-sm font-extrabold text-[#6c5149]">Anything else? <span className="font-normal text-[#a37f72]">(optional!)</span></span><textarea rows={3} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us about your experience or availability…" className="input resize-none" /></label>
                  {state === 'error' && <p className="flex items-center gap-2 text-sm font-bold text-[#c95168]"><AlertCircle className="h-4 w-4" />{errorMsg}</p>}
                  <button type="submit" disabled={state === 'submitting'} className="btn-primary w-full disabled:opacity-70">{state === 'submitting' ? <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</> : 'Send my volunteer details'}</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
