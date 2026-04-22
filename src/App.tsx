import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Code, Palette, Globe, Menu, X } from 'lucide-react';
import { cn } from './lib/utils';
import { playHoverSound, playClickSound, playOpenSound } from './lib/audio';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Journal', href: '#journal' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex items-center justify-between px-12 py-8 mix-blend-difference"
      >
        <div className="serif text-2xl font-bold tracking-tighter">NOVA</div>
        
        <div className="flex gap-12 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={playHoverSound}
              className="text-[10px] tracking-[0.3em] font-bold uppercase opacity-60 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <button 
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="text-[10px] tracking-[0.3em] font-bold uppercase px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all"
          >
            Connect
          </button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Trigger */}
      <div className="fixed top-8 right-8 z-[60] md:hidden">
        <button 
          onMouseEnter={playHoverSound}
          onClick={() => {
            setIsOpen(!isOpen);
            playClickSound();
          }}
          className="p-4 glass rounded-full"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="fixed top-8 left-8 z-[60] md:hidden">
         <div className="serif text-xl font-bold">NOVA</div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center md:hidden"
          >
            <div className="absolute inset-0 bg-noise pointer-events-none opacity-10"></div>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={playHoverSound}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setIsOpen(false);
                    playClickSound();
                  }}
                  className="serif text-5xl font-bold uppercase hover:italic transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                onMouseEnter={playHoverSound}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-xs tracking-[0.4em] uppercase font-bold text-white/40 border-b border-white/10 pb-2"
              >
                Start a Conversation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center px-12 overflow-hidden border-b border-white/5">
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full flex flex-col justify-center max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="serif text-huge italic -mb-4 md:-mb-8"
        >
          Nova
        </motion.div>

        <div className="flex flex-col md:flex-row items-baseline md:items-end gap-4 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="serif text-huge font-bold"
          >
            Portfolio
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-6 max-w-[280px]"
          >
            <p className="text-[10px] md:text-xs leading-relaxed opacity-60 tracking-wide uppercase">
              Visual Architect & Interactive Designer. Specializing in minimal digital experiences and high-fidelity brand identities for the modern era.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="serif text-huge outline-text -mt-4 md:-mt-10 ml-12 md:ml-32"
        >
          Experience
        </motion.div>

        {/* Floating Abstract Element */}
        <div className="absolute right-[5%] top-[10%] hidden lg:block w-[320px] h-[480px] bg-white/5 grayscale border border-white/5 shadow-2xl rotate-2">
           <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-[100px] opacity-10 font-bold">01</div>
           <div className="absolute bottom-8 left-8">
             <div className="text-[10px] tracking-[0.2em] uppercase mb-1 opacity-50">Current Focus</div>
             <div className="serif text-3xl">Digital Poetics</div>
           </div>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-12 flex items-center gap-4">
        <div className="w-8 h-[1px] bg-white/20"></div>
        <div className="text-[10px] tracking-[0.2em] opacity-40 uppercase">Scroll to explore</div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  key?: number;
}

const ProjectCard = ({ title, category, image, id, description, tech }: ProjectCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalImageLoaded, setIsModalImageLoaded] = useState(false);

  return (
    <>
      <motion.div
        layoutId={`card-${id}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: id * 0.1 }}
        onMouseEnter={playHoverSound}
        onClick={() => {
          setIsModalOpen(true);
          playOpenSound();
        }}
        className="group cursor-pointer border-b border-white/10 pb-8 last:border-b-0"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 group">
          <div className="order-2 md:order-1">
            <span className="text-[10px] tracking-[0.2em] opacity-40 uppercase mb-2 block font-bold">0{id} // Project</span>
            <h3 className="serif text-4xl md:text-6xl font-light group-hover:italic group-hover:translate-x-4 transition-all duration-500 uppercase">{title}</h3>
            <p className="text-[10px] tracking-widest opacity-40 uppercase mt-2">{category}</p>
          </div>
          <motion.div 
            layoutId={`image-${id}`}
            className="order-1 md:order-2 w-full md:w-64 aspect-video md:aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative bg-white/5"
          >
            {!isLoaded && (
              <div className="absolute inset-0 animate-pulse bg-white/10" />
            )}
            <img
              src={image}
              alt={title}
              onLoad={() => setIsLoaded(true)}
              className={cn(
                "w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-700",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                playClickSound();
              }}
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
            />
            
            <motion.div
              layoutId={`card-${id}`}
              className="relative w-full max-w-5xl glass rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <motion.div layoutId={`image-${id}`} className="aspect-[4/5] bg-brand-gray relative">
                   {!isModalImageLoaded && (
                     <div className="absolute inset-0 animate-pulse bg-white/5" />
                   )}
                   <img 
                    src={image} 
                    alt={title} 
                    onLoad={() => setIsModalImageLoaded(true)}
                    className={cn(
                      "w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000",
                      isModalImageLoaded ? "opacity-100" : "opacity-0"
                    )} 
                   />
                </motion.div>
                
                <div className="p-8 md:p-16 flex flex-col h-full">
                  <button 
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      setIsModalOpen(false);
                      playClickSound();
                    }}
                    className="self-end mb-8 opacity-40 hover:opacity-100 transition-opacity uppercase tracking-[0.3em] text-[10px] flex items-center gap-2"
                  >
                    <X size={16} /> Close
                  </button>
                  
                  <div className="mt-auto">
                    <span className="text-[10px] tracking-[0.3em] font-bold opacity-40 uppercase mb-4 block">Case Study // 0{id}</span>
                    <h2 className="serif text-5xl md:text-7xl font-bold uppercase mb-8 leading-tight">{title}</h2>
                    
                    <div className="space-y-8">
                       <div>
                         <h4 className="text-[10px] tracking-[0.3em] font-bold opacity-20 uppercase mb-3">Description</h4>
                         <p className="text-sm md:text-base opacity-60 leading-relaxed uppercase tracking-wider">{description}</p>
                       </div>
                       
                       <div>
                         <h4 className="text-[10px] tracking-[0.3em] font-bold opacity-20 uppercase mb-3">Technologies</h4>
                         <div className="flex flex-wrap gap-3">
                           {tech.map((t) => (
                             <span key={t} className="text-[10px] px-3 py-1 border border-white/10 rounded-full opacity-40 uppercase tracking-widest">{t}</span>
                           ))}
                         </div>
                       </div>

                       <div className="flex gap-8 pt-4">
                          <button className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 group hover:text-white transition-colors">
                             Live Site <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </button>
                          <button className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 group hover:text-white transition-colors">
                             Source Code <Github size={14} />
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const Work = () => {
  const projects = [
    { 
      id: 1, 
      title: "Lumina Dashboard", 
      category: "Web Application", 
      image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=800",
      description: "A high-performance analytics dashboard designed for complex data visualization and real-time monitoring.",
      tech: ["React", "TypeScript", "D3.js", "Tailwind"]
    },
    { 
      id: 2, 
      title: "Zenith Identity", 
      category: "Brand Design", 
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      description: "A complete brand overhaul for a modern tech firm, including logo design, typography and digital guidelines.",
      tech: ["Adobe Suite", "Figma", "Motion Docs"]
    },
    { 
      id: 3, 
      title: "Aura Commerce", 
      category: "E-Commerce", 
      image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=800",
      description: "Next-gen shopping experience focusing on fluid transitions and minimal friction in the user journey.",
      tech: ["Next.js", "Stripe", "Framer Motion"]
    },
    { 
      id: 4, 
      title: "Nexus Platform", 
      category: "SaaS", 
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: "Unified productivity tool for distributed teams, simplifying complex resource management into intuitive UI.",
      tech: ["Architecture", "Go", "Vue", "Postgres"]
    }
  ];

  const categories = ['All', 'Web Application', 'Brand Design', 'E-Commerce', 'SaaS'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="py-32 px-12 max-w-7xl mx-auto border-b border-white/5">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-8">
        <div>
          <span className="text-[10px] opacity-40 uppercase tracking-[0.3em] mb-4 block font-bold">Selected Projects</span>
          <h2 className="serif text-5xl md:text-8xl font-bold tracking-tight">CRAFTED WORKS</h2>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[10px] tracking-[0.2em] font-bold uppercase transition-all pb-1 border-b-2",
                activeCategory === cat ? "border-brand-light opacity-100" : "border-transparent opacity-30 hover:opacity-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="flex flex-col gap-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => (
            <ProjectCard 
              key={p.id} 
              {...p}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const Experience = () => {
  const exp = [
    { year: "2023 - Present", role: "Design Lead", company: "Aether Labs", desc: "Leading the design system and core product experience for next-gen AI tools." },
    { year: "2021 - 2023", role: "Senior Developer", company: "Vortex Interactive", desc: "Built performant, high-interaction web animations and specialized UI components." },
    { year: "2019 - 2021", role: "Product Designer", company: "Bloom Creative", desc: "Designed award-winning interfaces for global brands and creative agencies." }
  ];

  return (
    <section id="experience" className="py-32 relative overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
           <span className="text-[10px] opacity-40 uppercase tracking-[0.3em] mb-4 block font-bold">The Journey</span>
           <h2 className="serif text-5xl md:text-8xl font-bold tracking-tight mb-8">TIMELINE</h2>
           <p className="text-[10px] tracking-widest opacity-60 uppercase max-w-xs leading-relaxed">
             A legacy of digital craftsmanship and relentless pursuit of aesthetic perfection.
           </p>
        </div>

        <div className="flex flex-col gap-16">
          {exp.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <div className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-4">
                {item.year}
              </div>
              <div>
                <h3 className="serif text-4xl font-bold mb-2 group-hover:italic transition-all uppercase">{item.role}</h3>
                <p className="text-[10px] tracking-widest opacity-30 uppercase mb-6">{item.company}</p>
                <p className="text-xs text-white/50 leading-relaxed max-w-md uppercase tracking-wide">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const interests = ["Analog Photography", "Brutalist Architecture", "Jazz Theory", "Generative Art", "Minimalism", "Typography"];
  const techSkills = ["React / Next.js", "TypeScript", "Framer Motion", "D3.js / WebGL", "UI/UX Design", "Creative Coding"];

  return (
    <section id="about" className="py-32 px-12 max-w-7xl mx-auto border-b border-white/5 overflow-hidden">
      <div className="flex flex-col gap-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] bg-white/5 overflow-hidden group"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
              alt="Portrait"
              className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-brand-dark/20 mix-blend-multiply" />
            <div className="absolute top-8 right-8 vertical-text text-[10px] tracking-[0.5em] uppercase font-bold opacity-30 group-hover:opacity-100 transition-opacity">
              Persistence of Vision
            </div>
          </motion.div>

          <div className="space-y-12">
            <div>
              <span className="text-[10px] opacity-40 uppercase tracking-[0.3em] mb-4 block font-bold">The Architect</span>
              <h2 className="serif text-5xl md:text-8xl font-bold tracking-tight mb-8">NOVA <br /> <span className="italic font-light">ESTHER</span></h2>
              <p className="text-sm md:text-lg opacity-60 leading-relaxed uppercase tracking-wider max-w-xl">
                A visual architect and interactive designer based in the intersection of digital poetics and functional precision. I create high-fidelity experiences that bridge the gap between human emotion and technical complexity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
               <div>
                  <h4 className="text-[10px] tracking-[0.3em] font-bold opacity-30 uppercase mb-6">Expertise</h4>
                  <ul className="space-y-3">
                    {techSkills.map(skill => (
                      <li key={skill} className="text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-white/20" /> {skill}
                      </li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h4 className="text-[10px] tracking-[0.3em] font-bold opacity-30 uppercase mb-6">Interests</h4>
                  <ul className="space-y-3">
                    {interests.map(interest => (
                      <li key={interest} className="text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-2 italic">
                        <div className="w-1 h-1 rounded-full bg-white/20" /> {interest}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-32 px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <span className="text-[10px] opacity-40 uppercase tracking-[0.3em] mb-4 block font-bold">Contact</span>
          <h2 className="serif text-5xl md:text-8xl font-bold tracking-tight mb-8">
            LET'S <br />
            TALK.
          </h2>
          <div className="flex gap-8">
            <motion.a whileHover={{ opacity: 0.5 }} href="#" className="text-xs uppercase tracking-widest font-bold">Mail</motion.a>
            <motion.a whileHover={{ opacity: 0.5 }} href="#" className="text-xs uppercase tracking-widest font-bold">Github</motion.a>
            <motion.a whileHover={{ opacity: 0.5 }} href="#" className="text-xs uppercase tracking-widest font-bold">Linkedin</motion.a>
          </div>
        </div>

        <div className="flex flex-col justify-end space-y-12">
           <p className="text-[10px] tracking-widest opacity-40 uppercase leading-relaxed max-w-xs">
             Currently available for select freelance opportunities and global digital collaborations. Tokyo // Remote.
           </p>
           <a href="mailto:hello@nova.design" className="serif text-3xl md:text-5xl font-light hover:italic transition-all overflow-hidden border-b border-white/20 pb-4 inline-block italic">
             HELLO@NOVA.DESIGN
           </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-32 border-t border-white/5 pt-8 text-[9px] tracking-[0.4em] uppercase font-bold">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="opacity-40 hover:opacity-100 transition-opacity cursor-default mb-4 md:mb-0"
          >
            © 2026 NOVA STUDIO. <span className="serif italic font-normal lowercase tracking-normal text-xs ml-1">Persistence of Vision.</span>
          </motion.div>
          <div className="flex gap-8 opacity-40">
             {['Archive', 'Index', 'Twitter', 'Instagram'].map((item, i) => (
               <motion.a 
                key={item}
                href="#" 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                className="hover:text-white transition-colors"
               >
                 {item}
               </motion.a>
             ))}
          </div>
      </div>
    </footer>
  );
};

const Expertise = () => {
  const skills = [
    { title: "Visual Design", icon: <Palette size={32} />, desc: "Minimal digital experiences and high-fidelity brand identities." },
    { title: "Core Engineering", icon: <Code size={32} />, desc: "Responsive, performant and highly scalable technical solutions." },
    { title: "Brand Strategy", icon: <Globe size={32} />, desc: "Modern era positioning and narrative crafting for innovators." }
  ];

  return (
    <section className="py-32 px-12 max-w-7xl mx-auto border-b border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {skills.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10 }}
            className="group"
          >
            <div className="text-white/20 mb-8 transition-colors group-hover:text-white">
              {s.icon}
            </div>
            <h3 className="serif text-3xl font-bold mb-4 uppercase">{s.title}</h3>
            <p className="text-[10px] tracking-widest opacity-40 uppercase leading-relaxed max-w-[200px]">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest('button') || 
        !!target.closest('a') || 
        !!target.closest('.group')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 pointer-events-none z-[999] hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[999] hidden md:block"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative bg-brand-dark overflow-hidden cursor-none">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Noise Overlay */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-0"></div>
      
      {/* Side Rail */}
      <div className="fixed right-0 top-0 h-full w-12 md:w-24 border-l border-white/5 flex items-center justify-center z-40 hidden md:flex">
        <div className="vertical-text text-[10px] tracking-[0.5em] uppercase opacity-20 whitespace-nowrap">
          Interactive Experience // Portfolio 2026
        </div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Work />
        <About />
        <Expertise />
        <Experience />
        
        {/* Animated Marquee */}
        <section className="py-24 overflow-hidden border-b border-white/5">
           <div className="flex overflow-hidden group select-none py-4">
              <div className="flex gap-20 animate-marquee whitespace-nowrap group-hover:pause">
                 {[1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex gap-20 items-center">
                    <span className="serif text-8xl font-black text-white/5 uppercase">Architecture</span>
                    <span className="serif text-8xl font-black outline-text uppercase">Interaction</span>
                    <span className="serif text-8xl font-black text-white/5 uppercase">Design</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
