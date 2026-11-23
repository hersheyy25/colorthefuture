import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Values from '@/components/Values';
import Programs from '@/components/Programs';
import Workshops from '@/components/Workshops';
import Team from '@/components/Team';
import CtaBand from '@/components/CtaBand';
import Volunteer from '@/components/Volunteer';
import Footer from '@/components/Footer';
import { useReveal } from '@/lib/useReveal';

function App() {
  const { ref } = useReveal<HTMLDivElement>();

  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = '5rem';
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-[#fffaf3]">
      <Header />
      <main>
        <Hero />
        <About />
        <Values />
        <Programs />
        <Workshops />
        <Team />
        <CtaBand />
        <Volunteer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
