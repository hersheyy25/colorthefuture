import { useState } from 'react';
import OptionWheel from '@/components/OptionWheel';

type Value = {
  title: string;
  description: string;
  color: string;
};

const values: Value[] = [
  { title: 'Creativity', description: "Letting kids' imaginations run wild and explore every color, shape, and idea.", color: '#d8efca' },
  { title: 'Accessibility', description: 'Breaking down barriers so every kid can join in, no matter what.', color: '#f6cbd1' },
  { title: 'Community', description: 'Bringing people together to make stuff, share laughs, and feel like they belong.', color: '#c5e3ed' },
  { title: 'Impact', description: 'Using art to help kids feel confident, kind, and ready to make a difference.', color: '#ffe39b' },
];

export default function Values() {
  const [selected, setSelected] = useState(0);
  const current = values[selected];

  return (
    <section id="values" className="paper-grid py-24 sm:py-32">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="reveal">
            <span className="eyebrow">What we stand for</span>
            <h2 className="mt-5 section-title">Four things we care about a whole lot.</h2>
            <p className="mt-6 max-w-xl text-lg text-[#725d55]">These are the values that shape every workshop, event, and high-five. Explore them like pages in a sketchbook.</p>
            <div className="paper-card mt-9 flex items-start gap-5 p-6 sm:p-8" style={{ borderTop: `8px solid ${current.color}` }}>
              <span className="mt-1 h-5 w-5 shrink-0 rounded-full" style={{ backgroundColor: current.color }} />
              <div>
                <h3 className="text-3xl">{current.title}</h3>
                <p className="mt-2 text-base text-[#806960]">{current.description}</p>
              </div>
            </div>
            <p className="mt-5 font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-[#a37f72]">Scroll, drag, or use arrow keys to explore.</p>
          </div>

          <div className="reveal relative">
            <span className="tape -right-3 top-8 rotate-12" />
            <div className="paper-card relative h-[420px] overflow-hidden bg-[#fffdf8]">
              <div className="absolute left-6 top-6 font-display text-2xl text-[#c95168]">Our little compass</div>
              <OptionWheel
                items={values.map((value) => value.title)}
                defaultSelected={0}
                textColor="#c6a99e"
                activeColor="#c95168"
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
              <span className="absolute bottom-6 right-7 rotate-6 font-display text-lg text-[#a37f72]">keep exploring →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
