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
              <p className="font-display text-2xl text-[#8c5946]">Art is for everyone.</p>
            </div>
            <div className="absolute -right-6 -top-8 hidden h-16 w-16 rotate-12 rounded-full bg-[#f6cbd1] sm:block" />
          </div>

          <div>
            <span className="eyebrow reveal">Our why</span>
            <h2 className="reveal mt-5 section-title">Art is how kids learn to dream big.</h2>
            <p className="reveal mt-7 text-lg text-[#725d55]">
              At Color the Future, we believe creativity grows when people have the chance to create. Through hands-on art workshops, community events, and collaborative projects, we inspire kids and families to put down their screens, pick up a paintbrush, and let their imagination shine.
            </p>
            <p className="reveal mt-5 text-lg text-[#725d55]">
              Whether it is trying a new technique, creating alongside friends, or making something they are proud of, every creative moment helps color a brighter future.
            </p>

            <figure className="reveal paper-card relative mt-9 max-w-xl p-6 sm:p-8">
              <Quote className="h-7 w-7 text-[#ef7185]" strokeWidth={1.7} />
              <blockquote className="mt-4 font-display text-2xl leading-snug text-[#674b43]">
                “The cultural and creative industries are among the fastest-growing sectors worldwide, highlighting the increasing value of creativity in today&apos;s world.”
              </blockquote>
              <figcaption className="mt-4 font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-[#a37f72]">— UNESCO</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
