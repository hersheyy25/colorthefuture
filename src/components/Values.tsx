import { useState } from 'react';
import { Palette, Unlock, Users, Sparkle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import OptionWheel from './OptionWheel';

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  bg: string;
};

const values: Value[] = [
  {
    icon: Palette,
    title: 'Creativity',
    description:
      "Letting kids' imaginations run wild and explore every color, shape, and idea.",
    accent: 'text-brand-600',
    bg: 'bg-brand-100',
  },
  {
    icon: Unlock,
    title: 'Accessibility',
    description:
      'Breaking down barriers so every kid can join in, no matter what.',
    accent: 'text-coral-600',
    bg: 'bg-coral-100',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Bringing people together to make stuff, share laughs, and feel like they belong.',
    accent: 'text-sky-600',
    bg: 'bg-sky-100',
  },
  {
    icon: Sparkle,
    title: 'Impact',
    description:
      'Using art to help kids feel confident, kind, and ready to make a difference.',
    accent: 'text-butter-600',
    bg: 'bg-butter-100',
  },
];

export default function Values() {
  const [selected, setSelected] = useState(0);
  const current = values[selected];
  const Icon = current.icon;

  return (
    <section id="values" className="bg-white py-20 sm:py-28">
      <div className="container-px">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + active value description */}
          <div className="reveal">
            <span className="eyebrow">What we stand for</span>
            <h2 className="mt-5 section-title">
              Four things we care about a whole lot
            </h2>
            <p className="mt-5 text-lg text-ink-600">
              These are the values that shape every workshop, event, and
              high-five we give out. Spin the wheel to explore each one.
            </p>

            <div className="mt-8 flex items-start gap-4 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${current.bg} ring-1 ring-brand-100`}
              >
                <Icon className={`h-7 w-7 ${current.accent}`} strokeWidth={2} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold text-ink-800">
                  {current.title}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-ink-600">
                  {current.description}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm font-medium text-ink-400">
              Scroll, drag, or use arrow keys to spin the wheel.
            </p>
          </div>

          {/* Right: OptionWheel */}
          <div className="reveal">
            <div className="relative h-[420px] rounded-[2rem] bg-gradient-to-br from-brand-50 to-brand-100 ring-1 ring-brand-100">
              <OptionWheel
                items={values.map((v) => v.title)}
                defaultSelected={0}
                textColor="#94a392"
                activeColor="#426042"
                side="left"
                fontSize={2.5}
                spacing={1.6}
                curve={1}
                tilt={8}
                blur={1.5}
                fade={0.3}
                smoothing={200}
                inset={60}
                loop={false}
                draggable
                onChange={(index) => setSelected(index)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
