import { useState } from 'react';
import { Palette, Unlock, Users, Sparkle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import OptionWheel from './OptionWheel';
import ClayIcon, { type ClayColor } from './ClayIcon';

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
  color: ClayColor;
};

const values: Value[] = [
  {
    icon: Palette,
    title: 'Creativity',
    description:
      "Letting kids' imaginations run wild and explore every color, shape, and idea.",
    color: 'brand',
  },
  {
    icon: Unlock,
    title: 'Accessibility',
    description:
      'Breaking down barriers so every kid can join in, no matter what.',
    color: 'coral',
  },
  {
    icon: Users,
    title: 'Community',
    description:
      'Bringing people together to make stuff, share laughs, and feel like they belong.',
    color: 'sky',
  },
  {
    icon: Sparkle,
    title: 'Impact',
    description:
      'Using art to help kids feel confident, kind, and ready to make a difference.',
    color: 'butter',
  },
];

export default function Values() {
  const [selected, setSelected] = useState(0);
  const current = values[selected];

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

            <div className="mt-8 clay-soft flex items-start gap-4 rounded-3xl p-6">
              <ClayIcon icon={current.icon} color={current.color} size="lg" className="shrink-0" />
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
