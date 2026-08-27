import { ArrowRight } from 'lucide-react';

export default function CtaBand() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-px">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-400 via-brand-500 to-coral-300 px-7 py-14 text-center shadow-2xl shadow-brand-500/20 sm:px-12 sm:py-20">
          {/* decorative dots */}
          <div className="pointer-events-none absolute inset-0 dot-divider text-white/10" />
          <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <span className="pointer-events-none absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-coral-100/30 blur-2xl" />
          {/* whimsical floating dots */}
          <span className="pointer-events-none absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-white/40 animate-bounce-soft" />
          <span className="pointer-events-none absolute right-[15%] bottom-[20%] h-2.5 w-2.5 rounded-full bg-white/30 animate-bounce-soft [animation-delay:1.5s]" />

          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Help us paint a brighter future
            </h2>
            <p className="mt-5 text-lg text-white/90">
              Join a workshop, volunteer your time, or subscribe for updates.
              There's a place for everyone at Color the Future!
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#workshops"
                className="btn inline-flex bg-white text-brand-700 hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Join the Fun
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#volunteer"
                className="btn inline-flex bg-white/15 text-white ring-1 ring-white/40 backdrop-blur hover:bg-white/25 hover:-translate-y-0.5"
              >
                Become a Volunteer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
