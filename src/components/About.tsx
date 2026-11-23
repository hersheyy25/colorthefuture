import { Quote } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#fffaf3] py-24 sm:py-32">
      <div className="container-px">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="reveal relative mx-auto w-full max-w-lg lg:mx-0">
            <span className="tape -right-7 top-10 rotate-12" />
            <div className="photo-frame -rotate-3">
              <img src="/HappyCTF.jpeg" alt="A Color the Future community moment" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
            <div className="note-card absolute -bottom-10 -left-3 rotate-3 px-5 py-4 sm:-left-8">
              <p className="font-display text-2xl text-[#8c5946]">Start with one blank page.</p>
            </div>
            <div className="absolute -right-6 -top-8 hidden h-16 w-16 rotate-12 rounded-full bg-[#f6cbd1] sm:block" />
          </div>

          <div>
            <span className="eyebrow reveal">Why this exists</span>
            <h2 className="reveal mt-5 section-title">Kids should get to make things.</h2>
            <p className="reveal mt-7 text-lg text-[#725d55]">
              Color the Future is a youth-led art initiative. We run hands-on workshops, community events, and collaborative projects for kids and families.
            </p>
            <p className="reveal mt-5 text-lg text-[#725d55]">
              At a workshop, that might mean trying a painting technique, making a seasonal craft, or adding one small piece to a public mural. The finished work matters. So does getting to change your mind halfway through.
            </p>

            <figure className="reveal paper-card relative mt-9 max-w-xl p-6 sm:p-8">
              <Quote className="h-7 w-7 text-[#ef7185]" strokeWidth={1.7} />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-[#674b43]">
                Paint on the table is fine. A half-finished idea is fine too.
              </blockquote>
              <figcaption className="mt-4 font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-[#a37f72]">The messy middle counts too.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
