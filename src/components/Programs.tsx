import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type Program = {
  title: string;
  description: string;
  image: string;
  alt: string;
  tag: string;
  color: string;
};

const programs: Program[] = [
  {
    title: 'Drawing & Sketching',
    description: 'Trying different drawing techniques that kids may not be familiar with!',
    image: 'https://images.pexels.com/photos/7898475/pexels-photo-7898475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A child drawing in an art workshop',
    tag: 'Start here',
    color: '#f6cbd1',
  },
  {
    title: 'Themed Crafts',
    description: 'From wrapping roses for mothers day to popsicle stick heros for father day, themed crafts are a CTF specialty!',
    image: 'https://images.pexels.com/photos/6157559/pexels-photo-6157559.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A rose for mom!',
    tag: 'Make together',
    color: '#ffe39b',
  },
  {
    title: 'Mini Projects',
    description: 'Little doodles and contributions that make us whole!',
    image: 'https://images.pexels.com/photos/7026051/pexels-photo-7026051.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Children working together on our workshop banner!',
    tag: 'Team efforts',
    color: '#c5e3ed',
  },
  {
    title: 'Volunteer Opportunities',
    description: 'You can mentor a young artist, help set up an event, or or even work for public outreach!',
    image: 'https://images.pexels.com/photos/8042458/pexels-photo-8042458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A volunteer',
    tag: 'Lend a hand',
    color: '#d8efca',
  },
];

function ProgramTab({ program, index, active, onSelect }: { program: Program; index: number; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`group flex w-full items-start gap-4 border-b border-[#ead7c9] py-5 text-left transition-all first:border-t ${active ? 'translate-x-2' : 'hover:translate-x-1'}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-sans text-xs font-extrabold text-[#6c5149]" style={{ backgroundColor: program.color }}>
        0{index + 1}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-3">
          <span className="font-display text-2xl text-[#503f3a]">{program.title}</span>
          <span className="font-sans text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-[#c95168]">{program.tag}</span>
        </span>
        <span className={`grid transition-all duration-300 ${active ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <span className="overflow-hidden font-sans text-sm leading-relaxed text-[#806960]">{program.description}</span>
        </span>
      </span>
      <ArrowRight className={`mt-2 h-5 w-5 shrink-0 text-[#ef7185] transition-transform ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}`} />
    </button>
  );
}

export default function Programs() {
  const [active, setActive] = useState(0);
  const current = programs[active];

  return (
    <section id="programs" className="relative overflow-hidden bg-[#fff0e4] py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-16 top-20 h-72 w-72 rounded-full bg-[#ffe39b]/45 blur-3xl" />
      <div className="container-px relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow reveal">Things we make</span>
            <h2 className="reveal mt-5 section-title">The projects on our table.</h2>
          </div>
          <p className="reveal max-w-sm text-lg text-[#725d55]">Drawing, seasonal crafts, public art, and volunteer projects all start the same way: a table, some supplies, and a reason to begin.</p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="reveal relative mx-auto w-full max-w-lg">
            <span className="tape -left-6 top-10 -rotate-12" />
            <div className="paper-frame rotate-2 p-4 sm:p-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e7f2e4]">
                {programs.map((program, index) => (
                  <img key={program.title} src={program.image} alt={program.alt} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ${active === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`} />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#503f3a]/70 to-transparent p-6 pt-24">
                  <p className="font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-white/80">{current.tag}</p>
                  <h3 className="mt-2 font-display text-3xl text-white">{current.title}</h3>
                </div>
              </div>
            </div>
            <p className="hand-note absolute -bottom-6 -right-3 sm:-right-10">Start with what is in front of you.</p>
          </div>

          <div className="reveal">
            {programs.map((program, index) => (
              <ProgramTab key={program.title} program={program} index={index} active={active === index} onSelect={() => setActive(index)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
