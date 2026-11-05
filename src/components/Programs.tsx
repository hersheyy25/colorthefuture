import { useState } from 'react';
import { Brush, Pencil, Gift, Building2, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ClayIcon from './ClayIcon';

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

function ProgramCard({
  program,
  isActive,
  onSelect,
}: {
  program: Program;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = program.icon;

  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`clay clay-hover group flex w-full items-start gap-5 rounded-[1.75rem] p-5 text-left ring-0 sm:p-6 ${
        isActive ? 'clay-inset' : ''
      }`}
    >
      <ClayIcon
        icon={Icon}
        color={isActive ? 'coral' : 'brand'}
        size="lg"
        className="shrink-0 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-ink-800">
            {program.title}
          </h3>
          <span className="clay-pill rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-coral-600">
            {program.tag}
          </span>
        </div>

        <p
          className={`grid transition-all duration-500 ease-out ${
            isActive
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <span className="overflow-hidden">
            <span className="mt-3 block text-sm leading-relaxed text-ink-600">
              {program.description}
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
              Get involved
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </span>
        </p>
      </div>
    </button>
  );
}

export default function Programs() {
  const [active, setActive] = useState(0);
  const current = programs[active];

  return (
    <section id="programs" className="relative overflow-hidden py-20 sm:py-28">
      {/* soft clay background blobs */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-coral-100/40 blur-3xl" />

      <div className="container-px relative">
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
          {/* Left: claymorphism image preview that changes on hover */}
          <div className="reveal clay rounded-[2rem] p-4 sm:p-6">
            <div className="clay-inset relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem]">
              {programs.map((p, i) => (
                <img
                  key={p.title}
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
                    active === i
                      ? 'scale-100 opacity-100 blur-0'
                      : 'scale-105 opacity-0 blur-sm'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="clay-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-coral-600">
                  {current.tag}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white drop-shadow-sm">
                  {current.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Right: clay program cards */}
          <div className="reveal flex flex-col justify-center gap-4">
            {programs.map((p, i) => (
              <ProgramCard
                key={p.title}
                program={p}
                isActive={active === i}
                onSelect={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
