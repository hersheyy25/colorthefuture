import { ArrowRight, Sparkles, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="soft-wash relative overflow-hidden pt-32 sm:pt-40 lg:pt-48">
      <div className="pointer-events-none absolute -left-16 top-28 h-32 w-32 rounded-full bg-[#f8b5bd]/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-12 h-56 w-56 rounded-full bg-[#ffe39b]/35 blur-3xl" />
      <Star className="pointer-events-none absolute left-[8%] top-[24%] hidden h-7 w-7 rotate-12 text-[#ef9b99] lg:block" fill="currentColor" />
      <Sparkles className="pointer-events-none absolute right-[9%] top-[20%] hidden h-8 w-8 text-[#dbb04d] lg:block" />

      <div className="container-px relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="max-w-xl animate-fade-up">
            <p className="eyebrow">
              <span className="h-2 w-2 rounded-full bg-[#f05b78]" />
              A youth-led art initiative
            </p>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[5.5rem]">
              Keeping <span className="text-[#ef5c7a]">imagination</span> alive.
            </h1>
            <p className="mt-7 max-w-lg font-sans text-lg text-[#725d55] sm:text-xl">
              We bring kids, teens, and families together for drawing, seasonal crafts, and mini creative projects.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#workshops" className="btn-primary">
                See the workshops
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#volunteer" className="btn-ghost">Volunteer with us</a>
            </div>
            <p className="mt-6 font-display text-lg text-[#a16e61]">Free workshops, events, and projects for kids!</p>
          </div>

          <div className="relative mx-auto w-full max-w-[550px] animate-fade-in [animation-delay:200ms]">
            <div className="paper-frame relative mx-auto max-w-[390px] rotate-2 p-4 sm:p-5">
              <span className="tape -left-8 top-8 -rotate-12" />
              <img src="/ColorTheFutureLogo.png" alt="Color the Future logo" className="w-full bg-[#dcffd8]" />
              <p className="mt-4 text-center font-display text-2xl text-[#c95168]">Draw, build, try again.</p>
            </div>
            <div className="photo-frame absolute -bottom-8 -right-2 w-44 -rotate-6 sm:-right-8 sm:w-52">
              <img src="/CTFCover.jpg" alt="Colorful artwork and art supplies" className="aspect-[4/5] w-full object-cover" loading="eager" />
            </div>
            <div className="note-card absolute -bottom-10 left-0 hidden rotate-3 px-5 py-4 sm:block">
              <p className="font-display text-xl text-[#8c5946]">No perfect sketch required.</p>
            </div>
            <span className="paint-swatch absolute -right-4 top-10 h-7 w-7 bg-[#f05b78] sm:-right-8" />
            <span className="paint-swatch absolute bottom-16 left-0 h-5 w-5 bg-[#f2cb65]" />
          </div>
        </div>
      </div>

      <div className="mt-28 border-y border-[#ead7c9] bg-[#fffdf8]/70 py-5">
        <div className="container-px flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-[#9a796c] sm:justify-between">
          <span>Drawing</span>
          <span>Seasonal crafts</span>
          <span>Public art</span>
          <span>Collaborative projects</span>
        </div>
      </div>
    </section>
  );
}
