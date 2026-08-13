/*
 * NOIACORE DESIGN SYSTEM REMINDER
 * Movimiento: Dark Sci-Fi / Immersive FUI.
 * Principio: la atmósfera puede ser compleja; la lectura nunca debe serlo.
 * Contrato visual: negro absoluto #000000, púrpura profundo #7C3AED, dos familias tipográficas: Space Grotesk + JetBrains Mono.
 * Layout: editorial asimétrico, módulos numerados, rail lateral y capas orbitales.
 */
import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  Circle,
  Command,
  Cpu,
  Crosshair,
  Database,
  ExternalLink,
  Eye,
  Fingerprint,
  Gauge,
  Grid3X3,
  Layers3,
  Menu,
  MoveRight,
  Orbit,
  PanelTop,
  Play,
  Radio,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal as TerminalIcon,
  X,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { NeuralCanvas } from '@/components/NeuralCanvas';
import { ParallaxAtmosphere } from '@/components/ParallaxAtmosphere';
import { TerminalPanel } from '@/components/TerminalPanel';
import { SoundtrackPlayer } from '@/components/SoundtrackPlayer';
import { NoiacoreCinematicVideo } from '@/components/NoiacoreCinematicVideo';
import { modules, navItems, signalFeed, systemMetrics, type ModuleCategory, type NoiacoreModule } from '@/lib/noiacoreData';

const heroImage = '/manus-storage/noiacore-hero_5f6d0c5f.jpg';
const referenceGrid = '/manus-storage/noiacore-reference-grid_6b1356aa.png';
const referenceDashboard = '/manus-storage/noiacore-reference-dashboard_e8759298.png';
const neuralAtlas = '/manus-storage/noiacore-neural-atlas_bf7dca12.jpg';
const corridorImage = '/manus-storage/noiacore-lab-corridor_16db8691.jpg';
const orbitImage = '/manus-storage/noiacore-orbit_bc01eda1.jpg';
const markImage = '/manus-storage/noiacore-mark_07a65b70.png';

const categories: Array<'ALL' | ModuleCategory> = ['ALL', 'CORE', 'SYSTEMS', 'AGENTS', 'LAB', 'IMPACT'];

function SectionEyebrow({ index, children, tone = 'blue' }: { index: string; children: React.ReactNode; tone?: 'blue' | 'orange' | 'neutral' }) {
  return (
    <div className={`section-eyebrow section-eyebrow--${tone}`}>
      <span className="section-eyebrow__index">{index}</span>
      <span className="section-eyebrow__line" />
      <span>{children}</span>
    </div>
  );
}

function OrbitalMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`orbital-mark ${small ? 'orbital-mark--small' : ''}`} aria-hidden="true">
      <span className="orbital-mark__ring orbital-mark__ring--one" />
      <span className="orbital-mark__ring orbital-mark__ring--two" />
      <span className="orbital-mark__ring orbital-mark__ring--three" />
      <span className="orbital-mark__core" />
    </div>
  );
}

function MetricBar({ label, value, color, suffix }: { label: string; value: number; color: string; suffix: string }) {
  return (
    <div className="metric-bar">
      <div className="metric-bar__meta">
        <span>{label}</span>
        <strong>{value}{suffix}</strong>
      </div>
      <div className="metric-bar__track"><span className={`metric-bar__fill metric-bar__fill--${color}`} style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function SignalRow({ time, type, message, tone }: { time: string; type: string; message: string; tone: string }) {
  return (
    <div className="signal-row">
      <span className="signal-row__time">{time}</span>
      <span className={`signal-row__type signal-row__type--${tone}`}>{type}</span>
      <span className="signal-row__message">{message}</span>
      <span className="signal-row__pulse" />
    </div>
  );
}

function ModuleCard({ module, onOpen, featured = false }: { module: NoiacoreModule; onOpen: (module: NoiacoreModule) => void; featured?: boolean }) {
  return (
    <article className={`module-card module-card--${module.tone} ${featured ? 'module-card--featured' : ''}`} onClick={() => onOpen(module)} tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') onOpen(module); }}>
      <div className="module-card__image-wrap">
        <img src={module.image} alt="" className="module-card__image" loading="lazy" onError={(event) => { event.currentTarget.src = referenceDashboard; }} />
        <div className="module-card__image-overlay" />
        <span className="module-card__index">{module.index}</span>
        <span className="module-card__state"><span />{module.signal}</span>
      </div>
      <div className="module-card__body">
        <div className="module-card__meta">
          <span>{module.label}</span>
          <span>{module.category}</span>
        </div>
        <h3>{module.title}</h3>
        <p>{module.statement}</p>
        <div className="module-card__footer">
          <span>{module.metric} <small>{module.metricLabel}</small></span>
          <span className="module-card__arrow"><ArrowUpRight size={16} /></span>
        </div>
      </div>
    </article>
  );
}

function Header({ onTerminal, onMenu, menuOpen }: { onTerminal: () => void; onMenu: () => void; menuOpen: boolean }) {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#top" aria-label="NOIACORE LAB — inicio">
        <div className="site-header__mark"><img src={markImage} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} /><OrbitalMark small /></div>
        <span className="site-header__wordmark">N<span>O</span>IACORE</span>
        <span className="site-header__version">LAB / 4.2.0</span>
      </a>
      <nav className="site-header__nav" aria-label="Navegación principal">
        {navItems.map((item) => <a href={`#${item.id}`} key={item.id}><small>{item.index}</small>{item.label}</a>)}
      </nav>
      <div className="site-header__actions">
        <span className="site-header__status"><span />SYSTEM ONLINE</span>
        <button type="button" className="header-console-button" onClick={onTerminal}><Command size={14} /> <span>CONSOLE</span></button>
        <button type="button" className="header-menu-button" onClick={onMenu} aria-expanded={menuOpen} aria-label="Abrir menú">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose, onTerminal }: { open: boolean; onClose: () => void; onTerminal: () => void }) {
  if (!open) return null;
  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menú móvil">
      <div className="mobile-menu__backdrop" onClick={onClose} />
      <div className="mobile-menu__panel">
        <div className="mobile-menu__top"><span>NAVIGATE / 05</span><button type="button" onClick={onClose} aria-label="Cerrar menú"><X size={18} /></button></div>
        <nav>
          {navItems.map((item) => <a href={`#${item.id}`} key={item.id} onClick={onClose}><span>{item.index}</span>{item.label}<ArrowUpRight size={15} /></a>)}
        </nav>
        <button type="button" className="mobile-menu__console" onClick={onTerminal}><TerminalIcon size={15} />OPEN LOCAL CONSOLE</button>
      </div>
    </div>
  );
}

function HeroSection({ onTerminal, onIntent }: { onTerminal: () => void; onIntent: (value: string) => void }) {
  const [intent, setIntent] = useState('');
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setSignal((value) => (value + 1) % 5), 2400);
    return () => window.clearInterval(interval);
  }, []);

  const submitIntent = (event: React.FormEvent) => {
    event.preventDefault();
    if (!intent.trim()) {
      toast('Escribe una intención para abrir el campo de exploración.');
      return;
    }
    onIntent(intent.trim());
    setIntent('');
  };

  return (
    <section className="hero-section" id="top">
      <div className="hero-section__image" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="hero-section__vignette" />
      <ParallaxAtmosphere />
      <NeuralCanvas density={210} className="hero-section__canvas" />
      <div className="hero-section__grid" />
      <div className="hero-section__coordinates">41°24'12.2"N / 2°10'26.5"E</div>
      <div className="hero-section__vertical-label hero-section__vertical-label--left">OBSERVE / DISTURB / REPEAT</div>
      <div className="hero-section__vertical-label hero-section__vertical-label--right">COGNITIVE SYSTEMS / 2026</div>

      <div className="hero-section__topline"><SectionEyebrow index="00" tone="neutral">INTELLIGENCE LABORATORY</SectionEyebrow><span className="hero-section__topline-status"><span className="signal-dot" />LIVE FIELD / 04:22:18</span></div>
      <div className="hero-section__content">
        <div className="hero-section__pretitle">A SILENT ARCHITECTURE FOR LOUD IDEAS</div>
        <h1><span>NOIA</span><span className="hero-section__title-core">C</span><span>ORE</span></h1>
        <div className="hero-section__subtitle"><span>LAB</span><i /> INTELLIGENCE, DESIGNED TO BECOME EXPERIENCE.</div>
        <div className="hero-section__intent-wrap">
          <div className="hero-section__intent-meta"><span>INPUT / YOUR INTENTION</span><span>ADAPTIVE INTERFACE READY</span></div>
          <form className="hero-intent" onSubmit={submitIntent}>
            <Search size={17} />
            <input value={intent} onChange={(event) => setIntent(event.target.value)} placeholder="What are you trying to change?" aria-label="Tu intención" />
            <button type="submit"><span>OPEN FIELD</span><ArrowUpRight size={16} /></button>
          </form>
          <div className="hero-section__intent-foot"><span>Press enter to initiate a signal</span><button type="button" onClick={onTerminal}><TerminalIcon size={13} />or open terminal</button></div>
        </div>
      </div>
      <div className="hero-section__footer">
        <a href="#lab" className="hero-section__scroll"><span className="hero-section__scroll-icon"><ChevronDown size={14} /></span><span>SCROLL TO ENTER</span></a>
        <div className="hero-section__signal-card"><div className="hero-section__signal-card-top"><span>ACTIVE SIGNAL</span><span>0{signal + 1} / 05</span></div><strong>{signalFeed[signal].message}</strong><div className="hero-section__signal-progress"><span style={{ width: `${(signal + 1) * 20}%` }} /></div></div>
        <div className="hero-section__coordinates hero-section__coordinates--bottom">SCROLL 001 / 005</div>
      </div>
    </section>
  );
}

function TelemetryStrip() {
  return (
    <section className="telemetry-strip" aria-label="Telemetría del sistema">
      <div className="telemetry-strip__inner">
        <div className="telemetry-intro"><div className="telemetry-intro__label"><Activity size={14} />SYSTEM TELEMETRY</div><p>The core is not a product.<br /><em>It is a way of seeing.</em></p></div>
        <div className="telemetry-plot" aria-label="Gráfico de señal en vivo">
          <div className="telemetry-plot__header"><span>RUNTIME / V4.2.0 OMEGA</span><span>SYNCED 99.98%</span></div>
          <div className="telemetry-plot__waves"><span className="telemetry-plot__wave telemetry-plot__wave--one" /><span className="telemetry-plot__wave telemetry-plot__wave--two" /><span className="telemetry-plot__wave telemetry-plot__wave--three" /></div>
          <div className="telemetry-plot__footer"><span>FREQUENCY 144HZ</span><span>THROUGHPUT 1.28K</span><span>LATENCY 0.03MS</span></div>
        </div>
        <div className="telemetry-metrics">{systemMetrics.slice(0, 3).map((metric) => <MetricBar key={metric.label} {...metric} />)}</div>
      </div>
    </section>
  );
}

function SignalFeed() {
  return (
    <section className="signal-feed-section">
      <div className="signal-feed-section__heading"><SectionEyebrow index="01" tone="orange">SIGNAL FEED</SectionEyebrow><span className="signal-feed-section__live"><Radio size={13} />LIVE / 05 ACTIVE SIGNALS</span></div>
      <div className="signal-feed-section__rows">{signalFeed.map((signal) => <SignalRow key={signal.time} {...signal} />)}</div>
    </section>
  );
}

function LabIntro() {
  return (
    <section className="lab-intro" id="lab">
      <div className="lab-intro__side"><span className="lab-intro__side-label">LAB / 01</span><span className="lab-intro__side-line" /><span className="lab-intro__side-label lab-intro__side-label--muted">A PLACE FOR THE UNPROVEN</span></div>
      <div className="lab-intro__main">
        <SectionEyebrow index="02" tone="blue">THE NOIA CORE METHOD</SectionEyebrow>
        <h2>Diseñamos la zona<br /><em>entre la intención</em><br />y el impacto.</h2>
        <div className="lab-intro__copy"><p>NOIACORE es un laboratorio independiente de sistemas inteligentes, dirección creativa y experiencias que se comportan como organismos. No vendemos interfaces. <strong>Construimos el campo en el que una idea puede volverse inevitable.</strong></p><a href="#manifesto" className="text-link">Read the manifesto <ArrowUpRight size={14} /></a></div>
      </div>
      <div className="lab-intro__aside"><div className="lab-intro__orb"><OrbitalMark /><span className="lab-intro__orb-label">CORE / 00</span></div><span className="lab-intro__aside-caption">A SYSTEM THAT<br />OBSERVES BACK.</span></div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className="architecture-section" id="systems">
      <div className="architecture-section__visual"><img src={corridorImage} alt="Pasillo de laboratorio oscuro con una figura ante un núcleo luminoso" loading="lazy" onError={(event) => { event.currentTarget.src = referenceDashboard; }} /><div className="architecture-section__visual-overlay" /><div className="architecture-section__visual-label"><span>ARCHITECTURE / 06</span><strong>THE INVISIBLE<br />MACHINE</strong><span className="architecture-section__visual-coordinates">37.7749° N / 122.4194° W</span></div><div className="architecture-section__visual-crosshair"><Crosshair size={28} /></div></div>
      <div className="architecture-section__copy"><SectionEyebrow index="03" tone="blue">SYSTEM ARCHITECTURE</SectionEyebrow><h2>Complexity<br /><em>with a pulse.</em></h2><p>La tecnología más sofisticada no necesita parecerlo. Cada capa del sistema debe saber por qué existe, qué protege y cuándo debe desaparecer.</p><div className="architecture-section__stack">{['INTENTION', 'PERCEPTION', 'DECISION', 'EXPRESSION'].map((layer, index) => <div className="architecture-layer" key={layer}><span>0{index + 1}</span><strong>{layer}</strong><i /><small>{index === 0 ? 'human input / context' : index === 1 ? 'pattern recognition' : index === 2 ? 'adaptive intelligence' : 'experience output'}</small></div>)}</div><a className="button-ghost" href="#projects">Explore the architecture <ArrowRight size={15} /></a></div>
    </section>
  );
}

function ProjectsSection({ onOpen }: { onOpen: (module: NoiacoreModule) => void }) {
  const [activeCategory, setActiveCategory] = useState<'ALL' | ModuleCategory>('ALL');
  const filtered = useMemo(() => activeCategory === 'ALL' ? modules : modules.filter((module) => module.category === activeCategory), [activeCategory]);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-section__header"><div><SectionEyebrow index="04" tone="orange">THE MODULES</SectionEyebrow><h2>Ten ways to<br /><em>move the field.</em></h2></div><div className="projects-section__header-aside"><p>Una colección viva de principios, herramientas y experimentos. Abre un módulo para entrar en su lógica interna.</p><span>10 / 10 MODULES ONLINE</span></div></div>
      <div className="projects-section__filter" role="tablist" aria-label="Filtrar módulos">{categories.map((category) => <button type="button" role="tab" aria-selected={activeCategory === category} key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'is-active' : ''}>{category}<span>{category === 'ALL' ? '10' : modules.filter((module) => module.category === category).length.toString().padStart(2, '0')}</span></button>)}</div>
      <div className="projects-section__grid">{filtered.map((module, index) => <ModuleCard key={module.id} module={module} onOpen={onOpen} featured={index === 0 && activeCategory === 'ALL'} />)}</div>
      <div className="projects-section__footer"><span>SCROLL / DISCOVER / RETURN</span><div className="projects-section__footer-line" /><span>FIELD STATUS: EXPANDING</span></div>
    </section>
  );
}

function ReferenceWall() {
  return (
    <section className="reference-wall" aria-labelledby="reference-wall-title">
      <div className="reference-wall__heading"><SectionEyebrow index="05" tone="neutral">VISUAL MEMORY</SectionEyebrow><h2 id="reference-wall-title">The interface<br /><em>remembers.</em></h2><p>Una capa de archivo visual inspirada en los materiales aportados: el sistema estudia imágenes, las deconstruye y las convierte en ritmo.</p></div>
      <div className="reference-wall__mosaic"><figure className="reference-wall__figure reference-wall__figure--large"><img src={referenceGrid} alt="Referencia visual aportada: catálogo modular de NOIACORE LAB" loading="lazy" /><figcaption><span>USER REFERENCE / 01</span><span>GRID / MEMORY</span></figcaption></figure><figure className="reference-wall__figure reference-wall__figure--small"><img src={referenceDashboard} alt="Referencia visual aportada: dashboard inmersivo de NOIACORE LAB" loading="lazy" /><figcaption><span>USER REFERENCE / 02</span><span>HUD / SYSTEMS</span></figcaption></figure><div className="reference-wall__quote"><span>“</span><p>La interfaz no debe explicar el futuro. Debe hacer que el usuario lo sienta antes de poder nombrarlo.</p><small>— NOIA CORE FIELD NOTE / 04</small></div></div>
    </section>
  );
}

function AgentsSection() {
  return (
    <section className="agents-section" id="agents">
      <div className="agents-section__image"><img src={neuralAtlas} alt="Perfil humano formado por partículas y conexiones neuronales" loading="lazy" onError={(event) => { event.currentTarget.src = referenceGrid; }} /><div className="agents-section__image-overlay" /><span className="agents-section__image-label">AGENTS / PERCEPTION FIELD</span></div>
      <div className="agents-section__copy"><SectionEyebrow index="06" tone="orange">AUTONOMOUS AGENTS</SectionEyebrow><h2>Questions are<br /><em>the interface.</em></h2><p>Los agentes que diseñamos no sustituyen el criterio humano. Lo amplifican. Observan el contexto, abren posibilidades y hacen visible la siguiente decisión.</p><div className="agents-section__stats"><div><strong>12.4K</strong><span>ACTIVE NODES</span></div><div><strong>0.03</strong><span>MS RESPONSE</span></div><div><strong>99.8%</strong><span>CONTEXT LOCK</span></div></div><button className="button-solid" type="button" onClick={() => toast('Agent field unlocked. Explore the modules to continue.')}>Open agent field <ArrowUpRight size={16} /></button></div>
    </section>
  );
}

function ManifestoSection() {
  const statements = ['WE OBSERVE BEFORE WE BUILD.', 'WE MAKE COMPLEXITY FEEL INEVITABLE.', 'WE DESIGN FOR THE MOMENT AFTER THE CLICK.', 'WE LEAVE SPACE FOR THE UNEXPECTED.'];
  return (
    <section className="manifesto-section" id="manifesto">
      <NeuralCanvas density={90} className="manifesto-section__canvas" />
      <div className="manifesto-section__inner"><SectionEyebrow index="07" tone="blue">THE MANIFESTO</SectionEyebrow><div className="manifesto-section__heading"><span>NOIA / CORE / 2026</span><h2>Intelligence<br /><em>should feel alive.</em></h2></div><div className="manifesto-section__statements">{statements.map((statement, index) => <div className="manifesto-statement" key={statement}><span>0{index + 1}</span><p>{statement}</p><ArrowUpRight size={18} /></div>)}</div><div className="manifesto-section__bottom"><span>THE CORE IS INVISIBLE.</span><span>THE IMPACT IS INEVITABLE.</span></div></div>
    </section>
  );
}

function ContactSection({ onTerminal }: { onTerminal: () => void }) {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__top"><SectionEyebrow index="08" tone="orange">NEXT TRANSMISSION</SectionEyebrow><span className="contact-section__status"><span />AVAILABLE FOR SELECTIVE COLLABORATIONS</span></div>
      <div className="contact-section__main"><div><h2>What are you<br /><em>ready to make inevitable?</em></h2><p>Cuéntanos qué está intentando cambiar tu sistema. El primer contacto no es un formulario: es una señal.</p></div><div className="contact-section__actions"><a className="button-solid button-solid--large" href="mailto:hello@noiacore.lab">Initiate collaboration <ArrowUpRight size={17} /></a><button className="button-ghost" type="button" onClick={onTerminal}><TerminalIcon size={15} /> Enter the console</button></div></div>
      <div className="contact-section__orbital"><OrbitalMark /><span>OPEN CHANNEL / 2026</span></div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer"><div className="site-footer__top"><div className="site-footer__identity"><div className="site-footer__mark"><OrbitalMark small /></div><span className="site-header__wordmark">N<span>O</span>IACORE</span><p>Intelligence, designed to become experience.</p></div><div className="site-footer__links"><div><span>EXPLORE</span><a href="#lab">The method</a><a href="#projects">The modules</a><a href="#manifesto">The manifesto</a></div><div><span>CONNECT</span><a href="mailto:hello@noiacore.lab">Email channel</a><a href="#contact">Collaboration</a><a href="#top">Back to top</a></div><div><span>LEGAL</span><a href="#contact">Privacy field</a><a href="#contact">Terms of signal</a></div></div></div><div className="site-footer__bottom"><span>© NOIACORE LAB / 2026</span><span>BUILT FOR MINDS THAT THINK DIFFERENTLY</span><span>41°24'12.2"N / 2°10'26.5"E</span></div></footer>
  );
}

function ModuleModal({ module, onClose }: { module: NoiacoreModule; onClose: () => void }) {
  return (
    <div className="module-modal" role="dialog" aria-modal="true" aria-labelledby="module-modal-title">
      <div className="module-modal__backdrop" onClick={onClose} />
      <div className="module-modal__panel">
        <button type="button" className="module-modal__close" onClick={onClose} aria-label="Cerrar módulo"><X size={18} /></button>
        <div className="module-modal__media"><img src={module.image} alt="" /><div className="module-modal__media-overlay" /><span>{module.index} / {module.category}</span></div>
        <div className="module-modal__content"><SectionEyebrow index={module.index} tone={module.tone === 'orange' ? 'orange' : 'blue'}>{module.label}</SectionEyebrow><h2 id="module-modal-title">{module.title}<em>{module.signal}</em></h2><p>{module.description}</p><div className="module-modal__tags">{module.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><div className="module-modal__metric"><span>LIVE METRIC</span><strong>{module.metric}</strong><small>{module.metricLabel}</small></div><button type="button" className="button-solid" onClick={() => { toast(`${module.title.toUpperCase()} / sequence initiated`); onClose(); }}>Initiate sequence <ArrowUpRight size={16} /></button></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<NoiacoreModule | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [systemPulse, setSystemPulse] = useState(0);
  const [cinematicOpen, setCinematicOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0);
    };
    const timer = window.setInterval(() => setSystemPulse((value) => (value + 1) % 100), 1300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.clearInterval(timer); };
  }, []);

  const handleIntent = (value: string) => {
    toast(`FIELD OPEN / processing “${value}”`);
    window.setTimeout(() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }), 280);
  };

  return (
    <div className="noiacore-app">
      <div className="noise-layer" aria-hidden="true" />
      <div className="scanline-layer" aria-hidden="true" />
      <SoundtrackPlayer />
      <button type="button" onClick={() => setCinematicOpen(true)} className="cinematic-launch fixed bottom-6 left-6 z-40 border border-white/20 bg-black/70 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-white/80 backdrop-blur-md transition hover:border-[#C4B5FD]/60 hover:text-white" aria-label="Abrir preview cinematográfico">VIEW CINEMATIC / 30S</button>
      <div className="scroll-rail" aria-hidden="true"><span style={{ height: `${Math.max(scrollProgress, 3)}%` }} /><small>{String(scrollProgress).padStart(3, '0')}</small></div>
      <Header onTerminal={() => setTerminalOpen(true)} onMenu={() => setMenuOpen((open) => !open)} menuOpen={menuOpen} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onTerminal={() => { setMenuOpen(false); setTerminalOpen(true); }} />
      <main>
        <HeroSection onTerminal={() => setTerminalOpen(true)} onIntent={handleIntent} />
        <TelemetryStrip />
        <SignalFeed />
        <LabIntro />
        <ArchitectureSection />
        <ProjectsSection onOpen={setSelectedModule} />
        <ReferenceWall />
        <AgentsSection />
        <section className="runtime-section"><div className="runtime-section__heading"><SectionEyebrow index="09" tone="neutral">RUNTIME / SYSTEM OBSERVATION</SectionEyebrow><span>NODE HEALTH / {String(systemPulse).padStart(2, '0')}%</span></div><div className="runtime-section__grid"><div className="runtime-card runtime-card--large"><div className="runtime-card__top"><span><Gauge size={15} /> THROUGHPUT</span><strong>1,284<span> nodes</span></strong></div><div className="runtime-card__bars">{Array.from({ length: 42 }, (_, index) => <span key={index} style={{ height: `${20 + ((index * 17) % 75)}%`, animationDelay: `${index * 0.03}s` }} />)}</div><div className="runtime-card__bottom"><span>LIVE FIELD</span><span>144 FPS</span><span>0.03MS LATENCY</span></div></div><div className="runtime-card runtime-card--image"><img src={orbitImage} alt="Anillo orbital azul sobre una superficie reflectante" loading="lazy" onError={(event) => { event.currentTarget.src = referenceDashboard; }} /><div><span>CORE / ORBIT</span><strong>Field is stable.</strong></div></div><div className="runtime-card runtime-card--code"><div className="runtime-card__code-head"><span><span className="code-dot code-dot--blue" /> <span className="code-dot code-dot--orange" /> <span className="code-dot code-dot--white" /></span><span>core.observe.ts</span></div><pre><code>{`const intention = observe(context)\nconst signal = core.translate(intention)\n\nif (signal.ready) {\n  experience.open(signal)\n}`}</code></pre><span className="runtime-card__code-status"><Check size={13} /> compiled / 0 errors</span></div></div></section>
        <ManifestoSection />
        <ContactSection onTerminal={() => setTerminalOpen(true)} />
      </main>
      <Footer />
      {terminalOpen && <TerminalPanel onClose={() => setTerminalOpen(false)} />}
      {selectedModule && <ModuleModal module={selectedModule} onClose={() => setSelectedModule(null)} />}
      {cinematicOpen && <NoiacoreCinematicVideo onClose={() => setCinematicOpen(false)} />}
    </div>
  );
}
