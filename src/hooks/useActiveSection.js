import { useEffect, useState } from 'react';
import { navigation } from '../data/portfolio.js';

export default function useActiveSection() {
  const [state, setState] = useState({ active: 'home', scrolled: false });
  useEffect(() => {
    const sections = navigation.map(({id}) => document.getElementById(id)).filter(Boolean);
    let frame = 0;
    const measure = () => {
      frame = 0;
      let active = 'home';
      const marker = Math.max(110, window.innerHeight * .3);
      for (const section of sections) if (section.getBoundingClientRect().top <= marker) active = section.id;
      const scrolled = window.scrollY > 16;
      setState((previous) => previous.active === active && previous.scrolled === scrolled ? previous : {active, scrolled});
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    schedule();
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  return state;
}
