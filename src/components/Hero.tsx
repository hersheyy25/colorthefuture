import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Ballpit from './Ballpit';
import ClayIcon from './ClayIcon';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-44">
      {/* Ballpit background — light greens & pinks */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          position: 'absolute',
          overflow: 'hidden',
          minHeight: '600px',
          maxHeight: '800px',
          width: '100%',
        }}
      >
        <Ballpit
          count={120}
          gravity={0.5}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          minSize={0.4}
          maxSize={0.9}
          size0={1.2}
          colors={[
            0xb3d9b3,
            0x9ad49a,
            0xc8e6c9,
            0xf4c2c2,
            0xf7b4b4,
            0xf9d5d5,
            0xe8a0a0,
          ]}
          ambientColor={0xffffff}
          ambientIntensity={1.2}
          lightIntensity={200}
        />
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-grid-faint" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-20 h-72 w-72 rounded-full bg-brand-200/60 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute right-0 top-40 -z-20 h-80 w-80 rounded-full bg-coral-100/60 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="pointer-events-none absolute -right-16 -top-10 -z-20 h-64 w-64 rounded-full bg-butter-100/50 blur-3xl animate-blob [animation-delay:8s]" />

      {/* Floating whimsical shapes */}
      <span className="pointer-events-none absolute left-[8%] top-[20%] hidden text-brand-300 lg:block">
        <Star className="h-6 w-6 fill-brand-300 animate-bounce-soft" />
      </span>
      <span className="pointer-events-none absolute right-[12%] top-[15%] hidden text-coral-300 lg:block">
        <Sparkles className="h-7 w-7 animate-wiggle" />
      </span>
      <span className="pointer-events-none absolute bottom-[30%] left-[5%] hidden text-butter-300 lg:block">
        <Star className="h-5 w-5 fill-butter-300 animate-bounce-soft [animation-delay:1s]" />
      </span>

      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <ClayIcon icon={Sparkles} color="coral" size="sm" iconClassName="h-3.5 w-3.5" />
              Youth-led &amp; heart-powered!
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-800 sm:text-5xl lg:text-6xl">
              Keeping Imagination{' '}
              <span className="relative whitespace-nowrap text-brand-600">
                alive
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9C40 3 160 3 198 7"
                    stroke="#ecb3a3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
              Color the Future is all about giving kids a place to get messy,
              make something they're proud of, and feel like they belong. Free
              and low-cost workshops, creative events, and lots of chances to
              just…create!
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#workshops" className="btn-primary">
                Join the Fun!
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#volunteer" className="btn-ghost">
                Volunteer With Us 
              </a>
              <button type="button" className="btn-ghost">
                Follow Along :)
              </button>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-[2.5rem] shadow-2xl shadow-ink-900/10 ring-1 ring-brand-100">
                <img
                  src="CTFCover.jpg"
                  alt="Amazing Artwork"
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Static info cards */}
              <div className="absolute -left-4 top-10 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-brand-100 sm:block">
                <p className="text-sm font-bold text-ink-800">Totally free</p>
                <p className="text-xs text-ink-500">No cost, no worries!</p>
              </div>

              <div className="absolute -bottom-4 -right-3 hidden rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-brand-100 sm:block">
                <p className="text-sm font-bold text-ink-800">All ages welcome</p>
                <p className="text-xs text-ink-500">Kids, teens &amp; families</p>
              </div>

              {/* Paint dot accents */}
              <span className="absolute -right-6 top-1/3 h-5 w-5 rounded-full bg-coral-200 shadow-lg" />
              <span className="absolute -left-8 bottom-16 h-4 w-4 rounded-full bg-butter-200 shadow-lg" />
              <span className="absolute right-10 -top-3 h-3 w-3 rounded-full bg-brand-300 shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-20 border-y border-brand-100 bg-white/60 py-4">
        <div className="container-px flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-bold text-ink-500">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-400" /> Painting
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-coral-300" /> Drawing
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-butter-300" /> Seasonal Crafts
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-300" /> Public Art
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-500" /> Collaborative Projects
          </span>
        </div>
      </div>
    </section>
  );
}
