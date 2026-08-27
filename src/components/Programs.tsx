import { useState } from 'react';
import { Brush, Pencil, Gift, Building2, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FlyingPosters from './FlyingPosters';

type Program = {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
  tag: string;
};

const programs: Program[] = [
  {
    icon: Brush,
    title: 'Painting & Drawing',
    description:
      'Hands-on workshops where kids learn color, line, and technique—and leave with art they are super proud of.',
    image:
      'https://images.pexels.com/photos/7898475/pexels-photo-7898475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A smiling child painting with their hands in an art workshop',
    tag: 'Most loved',
  },
  {
    icon: Gift,
    title: 'Seasonal Crafts',
    description:
      'Family-friendly events celebrating the seasons with leaf printing, pumpkin decorating, and collaborative murals.',
    image:
      'https://images.pexels.com/photos/6157559/pexels-photo-6157559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A child painting with red and blue colors on a paper banner',
    tag: 'All ages',
  },
  {
    icon: Building2,
    title: 'Public Art Projects',
    description:
      'Community murals and collaborative public art that brighten up neighborhoods and give young artists a voice.',
    image:
      'https://images.pexels.com/photos/7026051/pexels-photo-7026051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Three children enjoying a creative painting session surrounded by colorful paints',
    tag: 'Team effort',
  },
  {
    icon: Pencil,
    title: 'Volunteer Opportunities',
    description:
      'Fun ways to give back—lead a workshop, mentor a young artist, or help run a community event.',
    image:
      'https://images.pexels.com/photos/8042458/pexels-photo-8042458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A woman giving a child a high five in a vibrant community setting',
    tag: 'Give back',
  },
];

export default function Programs() {
  const [active, setActive] = useState(0);

  return (
    <section id="programs" className="py-20 sm:py-28">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="eyebrow reveal">What we offer</span>
            <h2 className="reveal mt-5 section-title">
              Programs that spark creativity and connection
            </h2>
          </div>
          <p className="reveal max-w-sm text-base text-ink-600">
            From first-time painters to seasoned young artists, there's a place
            for everyone to create, learn, and grow.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: flying posters */}
          <div
            className="reveal relative h-[480px] overflow-hidden rounded-3xl ring-1 ring-brand-100 shadow-sm sm:h-[560px]"
            aria-hidden="true"
          >
            <FlyingPosters
              items={programs.map((p) => p.image)}
              planeWidth={260}
              planeHeight={340}
              distortion={3}
              scrollEase={0.05}
              cameraFov={45}
              cameraZ={20}
              activeIndex={active}
            />
          </div>

          {/* Right: interactive label + description list */}
          <div className="reveal flex flex-col justify-center">
            <ul className="flex flex-col gap-3">
              {programs.map((p, i) => {
                const Icon = p.icon;
                const isActive = active === i;
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`group flex w-full items-start gap-4 rounded-2xl p-5 text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-white ring-1 ring-brand-200 shadow-md'
                          : 'bg-brand-50/60 ring-1 ring-transparent hover:bg-white hover:ring-brand-100'
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                          isActive
                            ? 'bg-brand-500 text-white'
                            : 'bg-brand-100 text-brand-600'
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-lg font-semibold text-ink-800">
                            {p.title}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide transition-colors duration-300 ${
                              isActive
                                ? 'bg-coral-200 text-coral-700'
                                : 'bg-coral-100 text-coral-500'
                            }`}
                          >
                            {p.tag}
                          </span>
                        </div>

                        <p
                          className={`grid transition-all duration-300 ${
                            isActive
                              ? 'grid-rows-[1fr] opacity-100'
                              : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="mt-2 block text-sm leading-relaxed text-ink-600">
                              {p.description}
                            </span>
                            <a
                              href="#workshops"
                              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                            >
                              Get involved
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </span>
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
