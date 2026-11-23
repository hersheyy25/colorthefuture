import { ArrowRight, Sparkles } from 'lucide-react';

export default function CtaBand() {
  return (
    <section className="bg-[#fffaf3] py-24 sm:py-28">
      <div className="container-px">
        <div className="reveal relative overflow-hidden border border-[#e5a3a4] bg-[#f7a4a7] px-7 py-16 text-center shadow-[9px_10px_0_#e7c3ad] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 dot-divider text-white/20" />
          <Sparkles className="pointer-events-none absolute left-[10%] top-[18%] h-8 w-8 rotate-12 text-white/70" />
          <Sparkles className="pointer-events-none absolute bottom-[18%] right-[10%] h-6 w-6 -rotate-12 text-white/70" />
          <div className="relative mx-auto max-w-2xl">
            <p className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-[#9d4359]">Pick a way to take part</p>
            <h2 className="mt-4 text-4xl text-white sm:text-5xl">Come by, lend a hand, or stay in the loop.</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#fff8f3]">Try a workshop, tell us how you would like to help, or sign up for the next update. Start wherever you are.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3"><a href="#workshops" className="btn bg-[#fffdf8] text-[#c95168] hover:-translate-y-0.5 hover:bg-white">See the workshops <ArrowRight className="h-4 w-4" /></a><a href="#volunteer" className="btn bg-[#c95168] text-white hover:-translate-y-0.5 hover:bg-[#ad435c]">Volunteer with us</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}
