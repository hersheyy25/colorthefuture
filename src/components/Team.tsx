import { useState } from 'react';
import { Users, ArrowLeft, Info } from 'lucide-react';

type Member = { name: string; role: string; description: string; image: string };

const team: Member[] = [
  { name: 'Hershey Patel', role: 'Founder', description: "Hi! I'm a current junior, and I love art and drawing. I have a HUGE passion for creativity and self expression, which led me to start Color the Future! I enjoy teaching and inspiring youth to explore their own creativity and confidence throughout art. In the future, I plan to pursue a career in computer science, where I can use innovation and problem-solving to make an impact in new and meaningful ways!", image: '/hersheyctfpic.jpg' },
  { name: 'Aanya Srivastava', role: 'Operations & Finance Lead', description: 'Description here. Share a sentence or two about this person, what they do for Color the Future, and what excites them about making art accessible to every kid.', image: 'https://images.pexels.com/photos/8535182/pexels-photo-8535182.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Moksha Sri Dasari', role: 'Creative Director', description: 'Description here. Share a sentence or two about this person, what they do for Color the Future, and what excites them about making art accessible to every kid.', image: 'https://images.pexels.com/photos/6966346/pexels-photo-6966346.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
  { name: 'Sahithi Danthuluri', role: 'Outreach & Communications Lead', description: 'Description here. Share a sentence or two about this person, what they do for Color the Future, and what excites them about making art accessible to every kid.', image: 'https://images.pexels.com/photos/8382387/pexels-photo-8382387.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
];

function TeamCard({ member }: { member: Member }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="reveal" style={{ height: '420px' }}>
      <div className={`flip-card h-full ${flipped ? 'flipped' : ''}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <button type="button" onClick={() => setFlipped(true)} className="group relative h-full w-full overflow-hidden border-8 border-[#fffdf8] bg-[#f6cbd1] text-left shadow-[7px_9px_0_rgba(213,177,155,0.35)]" aria-label={`Flip to read ${member.name}'s bio`}>
              <img src={member.image} alt={member.name} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#503f3a]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5"><h3 className="text-2xl text-white">{member.name}</h3><p className="mt-1 font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-white/85">{member.role}</p></div>
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#fffdf8]/90 text-[#c95168] transition group-hover:scale-110"><Info className="h-4 w-4" /></span>
            </button>
          </div>
          <div className="flip-card-back">
            <div className="flex h-full flex-col border border-[#e7cfc1] bg-[#fff0e4] p-6 shadow-[7px_9px_0_rgba(213,177,155,0.3)]">
              <div className="flex items-center gap-3"><img src={member.image} alt={member.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-[#f0a3a3]" loading="lazy" /><div><h3 className="text-xl">{member.name}</h3><p className="font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-[#c95168]">{member.role}</p></div></div>
              <p className="mt-5 flex-1 overflow-y-auto text-sm leading-relaxed text-[#806960]">{member.description}</p>
              <button type="button" onClick={() => setFlipped(false)} className="btn-ghost mt-4 self-start"><ArrowLeft className="h-4 w-4" />Back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="bg-[#f4eaf0] py-24 sm:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center"><span className="eyebrow reveal"><Users className="h-4 w-4" strokeWidth={1.8} /> The folks behind it all</span><h2 className="reveal mt-5 section-title">Meet the team.</h2><p className="reveal mt-5 text-lg text-[#725d55]">Color the Future is run by young people who believe art changes lives. Click a portrait to read their story.</p></div>
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">{team.map((member) => <TeamCard key={member.name} member={member} />)}</div>
        <p className="reveal mt-10 text-center text-sm text-[#a37f72]">Want to join the team? <a href="#volunteer" className="font-extrabold text-[#c95168] hover:text-[#a83f57]">See volunteer opportunities</a></p>
      </div>
    </section>
  );
}
