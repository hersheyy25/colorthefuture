import { Quote } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="reveal relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-brand-100">
              <img
                src="https://images.pexels.com/photos/8467265/pexels-photo-8467265.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Young students participating in an art class guided by their teacher"
                className="aspect-[5/4] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand-600 px-6 py-5 text-white shadow-xl sm:block">
              <p className="font-display text-2xl font-semibold">Est. 2025</p>
              <p className="text-sm text-brand-100">By kids, for kids</p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <span className="eyebrow reveal">Our Why</span>
            <h2 className="reveal mt-5 section-title">
              Art isn't just a hobby, it's how kids learn to dream BIG.
            </h2>
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-600">
              At Color the Future, we believe creativity grows when people have the chance to create. Through fun, hands-on art workshops, community events, and collaborative projects, we inspire kids and families to put down their screens, pick up a paintbrush, and let their imagination shine. Whether it's trying a new art technique, creating alongside friends, or simply making something they're proud of, we're here to show that art is for everyone and that every creative moment helps color a brighter future.
.
            </p>
            <p className="reveal mt-4 text-lg leading-relaxed text-ink-600">
              From painting and drawing to seasonal crafts and public art, we
              create spaces where creativity can flourish; where the next
              generation learns they can make the world a little brighter.
            </p>

            <figure className="reveal mt-8 rounded-2xl bg-coral-50 p-6 ring-1 ring-coral-100">
              <Quote className="h-6 w-6 text-coral-400" />
              <blockquote className="mt-3 font-display text-xl font-medium leading-snug text-ink-700">
                "The cultural and creative industries are among the fastest-growing sectors worldwide, highlighting the increasing value of creativity in today's world."
              </blockquote>
              <figcaption className="mt-3 text-sm font-medium text-ink-500">
                — UNESCO
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
