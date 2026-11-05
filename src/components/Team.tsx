import { useState } from 'react';
import { Users, ArrowLeft, Info } from 'lucide-react';
import ClayIcon from './ClayIcon';

type Member = {
  name: string;
  role: string;
  description: string;
  image: string;
};

const team: Member[] = [
  {
    name: 'Hershey Patel',
    role: 'Founder',
    description:
      "Hi! I'm a current junior, and I love art and drawing. I have a HUGE passion for creativity and self expression, which led me to start Color the Future! I enjoy teaching and inspiring youth to explore their own creativity and confidence throughout art. In the future, I plan to pursue a career in computer science, where I can use innovation and problem-solving to make an impact in new and meaningful ways!",
    image: 'hersheyctfpic.jpg',
  },
  {
    name: 'Aanya Srivastava',
    role: 'Operations & Finance Lead',
    description:
      'Description here. Share a sentence or two about this person, what they do for Color the Future, and what excites them about making art accessible to every kid.',
    image:
      'https://images.pexels.com/photos/8535182/pexels-photo-8535182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Moksha Sri Dasari',
    role: 'Creative Director',
    description:
      'Description here. Share a sentence or two about this person, what they do for Color the Future, and what excites them about making art accessible to every kid.',
    image:
      'https://images.pexels.com/photos/6966346/pexels-photo-6966346.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Sahithi Danthuluri',
    role: 'Outreach & Communications Lead',
    description:
      'Description here. Share a sentence or two about this person, what they do for Color the Future, and what excites them about making art accessible to every kid.',
    image:
      'https://images.pexels.com/photos/8382387/pexels-photo-8382387.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

function TeamCard({ member }: { member: Member }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="reveal" style={{ height: '420px' }}>
    <div className={`flip-card ${flipped ? 'flipped' : ''}`} style={{ height: '100%' }}>
      <div className="flip-card-inner">
        {/* Front: photo fills the card */}
        <div className="flip-card-front">
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="group relative h-full w-full overflow-hidden rounded-[1.75rem] bg-coral-100 text-left shadow-lg ring-1 ring-coral-200"
            aria-label={`Flip to read ${member.name}'s bio`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-coral-200/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-coral-300/90 via-coral-200/40 to-coral-100/10" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="font-display text-xl font-semibold text-ink-800">
                {member.name}
              </h3>
              <p className="text-sm font-medium text-coral-600">{member.role}</p>
            </div>
            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-coral-500 shadow-sm backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-white">
              <Info className="h-4 w-4" />
            </span>
          </button>
        </div>

        {/* Back: description */}
        <div className="flip-card-back">
          <div className="flex h-full flex-col rounded-[1.75rem] bg-coral-100 p-6 shadow-lg ring-1 ring-coral-200">
            <div className="flex items-center gap-3">
              <img
                src={member.image}
                alt={member.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-coral-300"
                loading="lazy"
              />
              <div>
                <h3 className="font-display text-lg font-semibold text-ink-800">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-coral-600">{member.role}</p>
              </div>
            </div>
            <p className="mt-4 flex-1 overflow-y-auto text-sm leading-relaxed text-ink-600">
              {member.description}
            </p>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="btn-ghost mt-4 self-start"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="bg-brand-50/40 py-20 sm:py-28">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow reveal">
            <ClayIcon icon={Users} color="coral" size="sm" iconClassName="h-3.5 w-3.5" />
            The folks behind it all
          </span>
          <h2 className="reveal mt-5 section-title">Meet the team</h2>
          <p className="reveal mt-5 text-lg text-ink-600">
            Color the Future is run by young people who believe art changes
            lives. Click a card to flip it and read their story.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        <p className="reveal mt-8 text-center text-sm text-ink-400">
          Want to join the team?{' '}
          <a href="#volunteer" className="font-semibold text-brand-600 hover:text-brand-700">
            See volunteer opportunities
          </a>
        </p>
      </div>
    </section>
  );
}
