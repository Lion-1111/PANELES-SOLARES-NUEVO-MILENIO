import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Sun, Phone, MapPin, Clock, Shield, Zap,
  Menu, X, MessageCircle, ChevronRight,
  CheckCircle, ChevronLeft, Play, Maximize2,
} from 'lucide-react'

/** Dismiss the HTML skeleton overlay once React mounts */
function useDismissSkeleton() {
  useEffect(() => {
    const el = document.getElementById('hero-skeleton')
    if (!el) return
    el.classList.add('hidden')
    const timer = setTimeout(() => el.remove(), 500)
    return () => clearTimeout(timer)
  }, [])
}

/** Returns a ref that fires once when the element enters the viewport */
function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: '200px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [inView])
  return { ref, inView }
}

const PHONE = '+52 33 1125 9093'
const PHONE_RAW = '523311259093'
const WA_URL = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent('Hola, quisiera una cotización gratuita de paneles solares.')}`

const HERO_SLIDES = [
  'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1600',
]

const NAV = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Beneficios', href: '#beneficios' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Contacto', href: '#contacto' },
]

const PRODUCTS = [
  {
    tag: 'Más popular',
    name: 'Paneles Solares Residenciales',
    desc: 'Genera tu propia electricidad desde el techo. Sistemas de 2 kW a 15 kW adaptados al consumo real de tu hogar.',
    features: [
      'Paneles monocristalinos (21 %+ eficiencia)',
      'Inversor incluido',
      'Monitoreo en tiempo real',
      'Instalación en 1–2 días',
      'Gestión con CFE para interconexión',
    ],
    img: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: true,
  },

  {
    tag: 'Sin apagones',
    name: 'Sistema con Batería de Respaldo',
    desc: 'Almacena la energía de tus paneles y úsala de noche o en cortes de luz. Autonomía personalizable desde 5 kWh.',
    features: [
      'Baterías LiFePO4 (+3 000 ciclos)',
      'Compatible con instalaciones existentes',
      'Gestión inteligente de carga',
      'Para interiores o exteriores',
      'Monitoreo remoto incluido',
    ],
    img: 'https://images.pexels.com/photos/8853494/pexels-photo-8853494.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: false,
  },
  {
    tag: 'Para negocios',
    name: 'Sistemas Comerciales e Industriales',
    desc: 'Reduce costos operativos de tu empresa. Diseño a medida para locales, bodegas, hoteles y clínicas.',
    features: [
      'Diseño personalizado por demanda',
      'Paneles en techo, parking o suelo',
      'ROI en 3–5 años',
      'Incentivos fiscales y financiamiento',
      'Mantenimiento preventivo incluido',
    ],
    img: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlight: false,
  },
]

const BENEFITS = [
  { icon: Zap, num: '01', title: 'Ahorra desde el día 1', desc: 'La mayoría recupera su inversión en menos de 4 años.' },
  { icon: Sun, num: '02', title: 'Precio de fábrica', desc: 'Sin distribuidores. El ahorro va directo a tu bolsillo.' },
  { icon: Shield, num: '03', title: 'Garantía incluida', desc: 'En equipo e instalación. Si algo falla, lo resolvemos sin costos.' },
  { icon: Phone, num: '04', title: 'Servicio local', desc: 'Equipo local, respuesta rápida y seguimiento real posventa.' },
]

const HOURS = [
  { day: 'Lunes – Viernes', range: '9:00 AM – 7:00 PM', open: true },
  { day: 'Sábado', range: '9:00 AM – 3:00 PM', open: true },
  { day: 'Domingo', range: 'Cerrado', open: false },
]

const ZONES = [
  { name: 'Guadalajara', desc: 'Centro, Chapalita, Providencia, Oblatos…' },
  { name: 'Zapopan', desc: 'Andares, Jardines, Santa Anita, Colomos…' },
  { name: 'Tlaquepaque', desc: 'San Pedro, El Álamo, Las Pintas…' },
  { name: 'Tonalá', desc: 'Tonalá Centro, San Antonio, Los Jazmines…' },
]

/* ══════════════════════ RESPONSIVE STYLES ══════════════════════ */
const CSS = `
  :root { --pad: 16px; --section: 64px; }
  @media (min-width: 640px)  { :root { --pad: 24px; } }
  @media (min-width: 1024px) { :root { --pad: 32px; --section: 112px; } }

  .desktop-nav  { display: none !important; }
  .mobile-toggle { display: flex !important; }
  .hero-stats   { grid-template-columns: 1fr 1fr; gap: 20px 32px; }
  .bflex        { flex-direction: column; }
  .bflex > *    { position: static !important; }
  .cov-grid     { grid-template-columns: 1fr; }
  .hours-card   { padding: 14px 18px; }
  .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
  .cta-btns     { flex-direction: column; }
  .cta-btns a   { justify-content: center; }

  /* Premium Design Additions */
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #fff;
    color: var(--ink);
    font-size: 14px;
    transition: all 0.2s ease;
  }
  .form-input:focus {
    outline: none;
    border-color: var(--amber);
    box-shadow: 0 0 0 3px rgba(192, 123, 26, 0.15);
  }

  .nav-link {
    position: relative;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.25s ease;
    text-decoration: none;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--amber);
    transition: all 0.25s ease;
    transform: translateX(-50%);
  }
  .nav-link:hover::after {
    width: 100%;
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 20px 50px rgba(192, 123, 26, 0.15); }
    50% { box-shadow: 0 20px 70px rgba(192, 123, 26, 0.28); }
  }

  .cinema-glow {
    animation: pulse-glow 6s infinite ease-in-out;
  }

  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: marquee 18s linear infinite;
    will-change: transform;
  }
  .marquee-track:hover {
    animation-play-state: paused;
  }
  .marquee-card {
    flex-shrink: 0;
    width: 260px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.25s, background 0.25s, transform 0.25s;
  }
  .marquee-card:hover {
    border-color: rgba(192,123,26,0.5);
    background: rgba(255,255,255,0.07);
    transform: translateY(-4px);
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none !important;
  }
  .hide-scrollbar {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }

  .galeria-grid {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 20px;
  }
  .galeria-card {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: 280px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  @media (min-width: 860px) {
    .desktop-nav   { display: flex !important; }
    .mobile-toggle { display: none !important; }
    .hero-stats    { grid-template-columns: repeat(4, auto); }
    .bflex         { flex-direction: row; }
    .cov-grid      { grid-template-columns: 1fr 1fr; }
    .footer-inner  { flex-direction: row; align-items: center; }
    .cta-btns      { flex-direction: row; }
    .cta-btns a    { justify-content: flex-start; }

    .galeria-grid {
      overflow-x: visible;
      scroll-snap-type: none;
      padding-bottom: 0;
    }
    .galeria-card {
      width: calc(25% - 15px);
      flex-grow: 1;
    }
  }
`

/* ══════════════════════ NAVBAR ══════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const textColor = scrolled ? 'var(--ink-3)' : 'rgba(255,255,255,0.82)'
  const textHover = scrolled ? 'var(--ink)' : '#fff'

  return (
    <header style={{
      position: 'fixed', inset: '0 0 auto 0', zIndex: 200,
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.28s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '0 var(--pad)',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="#inicio" style={{
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>
          <img
            src="/logo-transparente.png?v=3"
            alt="Nuevo Milenio Paneles Solares"
            style={{
              height: 52, width: 'auto', display: 'block',
              mixBlendMode: scrolled ? 'normal' : 'multiply',
              filter: scrolled ? 'none' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))',
              transition: 'filter 0.28s',
            }}
          />
        </a>

        {/* Desktop */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={{ color: textColor }}
              onMouseEnter={e => e.currentTarget.style.color = textHover}
              onMouseLeave={e => e.currentTarget.style.color = textColor}
            >{l.label}</a>
          ))}
        </nav>
        <a href={WA_URL} target="_blank" rel="noreferrer" className="desktop-nav"
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'var(--amber)', color: '#fff', fontSize: 13, fontWeight: 600,
            padding: '9px 18px', borderRadius: 6, transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(192, 123, 26, 0.2)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber-dark)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.transform = 'none' }}
        >
          <MessageCircle size={14} /> Cotización gratis
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(o => !o)} className="mobile-toggle"
          style={{ color: scrolled ? 'var(--ink)' : '#fff', padding: 4, display: 'flex', alignItems: 'center' }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid var(--line)', padding: '16px var(--pad) 24px' }}>
          {NAV.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '13px 0',
              fontSize: 16, fontWeight: 500, color: 'var(--ink-2)',
              borderBottom: '1px solid var(--line)',
            }}>{l.label}</a>
          ))}
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 18,
            background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 15,
            padding: '14px', borderRadius: 8,
          }}>
            <MessageCircle size={17} /> Cotización gratis por WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

/* ══════════════════════ HERO ══════════════════════ */
function Hero() {
  const [slide, setSlide] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setSlide(s => (s + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <section id="inicio" style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {HERO_SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? 'Instalación de paneles solares en Guadalajara' : 'Paneles solares residenciales'}
          /* Only eagerly load & prioritize the first slide */
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'low'}
          decoding={i === 0 ? 'sync' : 'async'}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 35%',
            opacity: slide === i ? 1 : 0,
            transform: slide === i ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 1.4s ease, transform 6s ease-out',
          }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(10,10,8,0.45) 0%, rgba(10,10,8,0.75) 100%)' }} />

      <div style={{
        position: 'relative', zIndex: 1, width: '100%',
        maxWidth: 1200, margin: '0 auto', padding: 'calc(64px + var(--pad)) var(--pad) 72px',
      }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: 18, animation: 'fadeUp 0.45s ease both',
        }}>
          Guadalajara · Zapopan · Tlaquepaque · Tonalá
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(36px, 8vw, 76px)', color: '#fff',
          lineHeight: 1.06, letterSpacing: '-1.5px', maxWidth: 640,
          marginBottom: 20, animation: 'fadeUp 0.5s 0.06s ease both',
        }}>
          Energía solar.<br />Ahorro real.
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 19px)', color: 'rgba(255,255,255,0.70)',
          maxWidth: 460, lineHeight: 1.7, marginBottom: 36,
          animation: 'fadeUp 0.5s 0.12s ease both',
        }}>
          Instalamos paneles solares con garantía total. Precio de fábrica y financiamiento disponible.
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          animation: 'fadeUp 0.5s 0.18s ease both',
        }}>
          <a href={WA_URL} target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 9,
            background: '#25D366', color: '#fff', fontWeight: 600,
            fontSize: 15, padding: '13px 24px', borderRadius: 7,
            boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.9)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.3)' }}
          >
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a href="#contacto" style={{
            display: 'flex', alignItems: 'center', gap: 9,
            background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 600,
            fontSize: 15, padding: '13px 24px', borderRadius: 7,
            border: '1px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'none' }}
          >
            <Zap size={17} /> Cotizar Ahora
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero-stats" style={{
          display: 'grid', marginTop: 52, paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.14)',
          animation: 'fadeIn 0.7s 0.3s ease both',
        }}>
          {[
            ['Hasta 98 %', 'ahorro en electricidad'],
            ['Garantía total', 'en equipo e instalación'],
            ['Financiamiento', 'disponible a tu medida'],
            ['Precio', 'directo de fábrica'],
          ].map(([val, label]) => (
            <div key={label}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(17px,3vw,22px)', color: '#fff', letterSpacing: '-0.3px' }}>{val}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', marginTop: 3 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ PRODUCTS CAROUSEL ══════════════════════ */
function Products() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollTo = useCallback((idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' })
    setActive(idx)
  }, [])

  const prev = () => scrollTo(Math.max(0, active - 1))
  const next = () => scrollTo(Math.min(PRODUCTS.length - 1, active + 1))

  // Sync dots on native scroll (touch)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const cards = Array.from(track.children) as HTMLElement[]
        let closest = 0, minDist = Infinity
        cards.forEach((c, i) => {
          const dist = Math.abs(c.offsetLeft - track.scrollLeft - 16)
          if (dist < minDist) { minDist = dist; closest = i }
        })
        setActive(closest)
      }, 80)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => { track.removeEventListener('scroll', onScroll); clearTimeout(timer) }
  }, [])

  return (
    <section id="productos" style={{ padding: 'var(--section) 0', background: '#fff', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 var(--pad)', marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 10 }}>
              Catálogo
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(26px,5vw,42px)', color: 'var(--ink)',
              lineHeight: 1.1, letterSpacing: '-0.6px',
            }}>Lo que instalamos</h2>
          </div>
          {/* Arrow controls — visible on ≥860 */}
          <div className="desktop-nav" style={{ display: 'flex', gap: 8 }}>
            <ArrowBtn dir="prev" onClick={prev} disabled={active === 0} />
            <ArrowBtn dir="next" onClick={next} disabled={active === PRODUCTS.length - 1} />
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="no-scrollbar"
        style={{
          display: 'flex', gap: 16,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          padding: '0 var(--pad) 4px',
          cursor: 'grab',
        }}
        onMouseDown={e => { e.currentTarget.style.cursor = 'grabbing' }}
        onMouseUp={e => { e.currentTarget.style.cursor = 'grab' }}
        onMouseLeave={e => { e.currentTarget.style.cursor = 'grab' }}
      >
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.name} product={p} index={i} total={PRODUCTS.length} />
        ))}
        {/* Trailing spacer so last card doesn't cut off */}
        <div style={{ minWidth: 4, flexShrink: 0 }} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24, padding: '0 var(--pad)' }}>
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: active === i ? 20 : 7, height: 7, borderRadius: 4,
              background: active === i ? 'var(--amber)' : 'var(--bg-3)',
              transition: 'width 0.25s, background 0.25s',
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}

function ArrowBtn({ dir, onClick, disabled }: { dir: 'prev' | 'next', onClick: () => void, disabled: boolean }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 8,
      border: '1px solid var(--line)', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: disabled ? 'var(--ink-4)' : 'var(--ink)',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'background 0.15s, border-color 0.15s',
    }}
      onMouseEnter={e => { if (!disabled) { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--ink-4)' } }}
      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'var(--line)' }}
    >
      {dir === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  )
}

function ProductCard({ product: p, index, total }: { product: typeof PRODUCTS[0], index: number, total: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        scrollSnapAlign: 'start',
        flexShrink: 0,
        // 85 vw on mobile, fixed 300px on larger screens
        width: 'min(85vw, 300px)',
        background: '#fff',
        border: p.highlight ? '2px solid var(--amber)' : '1px solid var(--line)',
        borderRadius: 14, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered
          ? (p.highlight ? '0 20px 40px rgba(192, 123, 26, 0.15)' : 'var(--shadow-lg)')
          : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Image */}
      <div style={{ height: 180, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
        <img src={p.img} alt={p.name} loading={index < 2 ? 'eager' : 'lazy'}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: p.highlight ? 'var(--amber)' : 'rgba(12,12,10,0.65)',
          color: '#fff', fontSize: 10, fontWeight: 700,
          letterSpacing: '0.8px', textTransform: 'uppercase',
          padding: '4px 9px', borderRadius: 4,
        }}>{p.tag}</span>
        <span style={{
          position: 'absolute', bottom: 10, right: 12,
          fontSize: 10, color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
        }}>{index + 1} / {total}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16,
          color: 'var(--ink)', marginBottom: 8, lineHeight: 1.3,
        }}>{p.name}</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>

        <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20, flex: 1 }}>
          {p.features.map(f => (
            <li key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <CheckCircle size={13} color="var(--amber)" style={{ flexShrink: 0, marginTop: 3 }} />
              <span style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{f}</span>
            </li>
          ))}
        </ul>

        <a href={WA_URL} target="_blank" rel="noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '11px 14px', borderRadius: 8,
          background: 'var(--bg-2)', border: '1px solid var(--line)',
          fontSize: 13, fontWeight: 600, color: 'var(--ink)',
          transition: 'background 0.15s, border-color 0.15s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--amber-light)'; e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--amber-dark)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-2)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink)' }}
        >
          Cotizar <ChevronRight size={14} />
        </a>
      </div>
    </div>
  )
}

/* ══════════════════════ VIDEO PROJECT ══════════════════════ */
function ProjectVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = containerRef.current
    const video = videoRef.current
    if (!el || !video) return

    let userInteracted = false

    const handleUserInteraction = () => {
      if (userInteracted) return
      userInteracted = true
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.play().catch(e => console.warn('Play after interaction failed:', e))
      }
      cleanupListeners()
    }

    const cleanupListeners = () => {
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('touchstart', handleUserInteraction)
      window.removeEventListener('keydown', handleUserInteraction)
      window.removeEventListener('mousedown', handleUserInteraction)
    }

    const addListeners = () => {
      window.addEventListener('click', handleUserInteraction, { once: true, passive: true })
      window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true })
      window.addEventListener('keydown', handleUserInteraction, { once: true, passive: true })
      window.addEventListener('mousedown', handleUserInteraction, { once: true, passive: true })
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (videoRef.current) {
        if (entry.isIntersecting) {
          // Attempt to play unmuted first (if user has already interacted)
          videoRef.current.muted = false
          videoRef.current.play()
            .then(() => {
              // Successfully played unmuted
            })
            .catch(() => {
              // Autoplay with sound blocked. Play muted instead.
              if (videoRef.current) {
                videoRef.current.muted = true
                videoRef.current.play()
                  .then(() => {
                    // Muted autoplay succeeded. Listen for first interaction to unmute.
                    addListeners()
                  })
                  .catch(err => console.warn('Muted autoplay also failed:', err))
              }
            })
        } else {
          videoRef.current.pause()
          cleanupListeners()
        }
      }
    }, { threshold: 0.3 })

    obs.observe(el)

    return () => {
      obs.disconnect()
      cleanupListeners()
    }
  }, [])

  return (
    <section style={{ padding: 'var(--section) var(--pad)', background: 'var(--ink)', color: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40, maxWidth: 680, margin: '0 auto 40px' }}>
          <p style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
            color: 'var(--amber)', marginBottom: 12,
          }}>
            Nuestro Trabajo en Acción
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: 'clamp(28px, 5vw, 44px)', color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.6px', marginBottom: 16,
          }}>
            Calidad garantizada,<br />paso a paso.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Conoce cómo nuestros expertos instalan cada sistema cuidando hasta el mínimo detalle. Tu inversión está en las mejores manos.
          </p>
        </div>

        <div
          ref={containerRef}
          className="cinema-glow"
          style={{
            position: 'relative',
            borderRadius: 20, overflow: 'hidden',
            border: '2px solid rgba(192, 123, 26, 0.4)',
            maxWidth: 960, margin: '0 auto',
            background: '#000', minHeight: 320,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.3s ease',
          }}
        >
          <video
            ref={videoRef}
            src="/pagina web panel solar.mp4"
            loop controls playsInline
            preload="metadata"
            style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ BENEFITS ══════════════════════ */
function Benefits() {
  return (
    <section id="beneficios" style={{ padding: 'var(--section) var(--pad)', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="bflex" style={{ display: 'flex', gap: 56, alignItems: 'flex-start' }}>

          {/* Left */}
          <div style={{ flex: '0 0 auto', maxWidth: 380 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 12 }}>
              Por qué nosotros
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(26px,4vw,40px)', color: 'var(--ink)',
              lineHeight: 1.1, letterSpacing: '-0.6px', marginBottom: 16,
            }}>
              Sin letra chica.<br />Sin sorpresas.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: 28 }}>
              Empresa local con experiencia en la zona metropolitana de Guadalajara. Vendemos, instalamos y damos soporte.
            </p>
            <a href={WA_URL} target="_blank" rel="noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--amber)', color: '#fff',
              fontWeight: 600, fontSize: 14, padding: '12px 22px', borderRadius: 7,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}
            >
              <MessageCircle size={16} /> Escríbenos ahora
            </a>
          </div>

          {/* Right */}
          <div style={{ flex: 1, minWidth: 0, paddingBottom: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
            {BENEFITS.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.num} style={{
                  display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
                  padding: '20px 16px',
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 14,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(192, 123, 26, 0.15)',
                  }}>
                    <Icon size={18} color="var(--amber)" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ NUESTRA GALERÍA ══════════════════════ */
const GALERIA_ITEMS = [
  {
    type: 'video',
    src: '/proyecto-video.mp4',
    title: 'Equipo en Acción',
    desc: 'Video real de nuestro equipo técnico instalando y fijando estructuras de aluminio y paneles solares.',
    tag: 'Instalación',
  },
  {
    type: 'image',
    src: '/7a459e23e081ce5d6eeb5a54b6cbcea0.jpg',
    title: 'Proyecto Residencial',
    desc: 'Instalación residencial terminada y conectada, maximizando el espacio de captación solar en Zapopan.',
    tag: 'Residencial',
  },
  {
    type: 'image',
    src: '/f813f69594b0514e613e5cd68c4b783f.jpg',
    title: 'Detalle e Inversor',
    desc: 'Cableado estructurado y protecciones contra descargas eléctricas al lado de un inversor inteligente.',
    tag: 'Seguridad',
  },
  {
    type: 'image',
    src: '/4e1cc7391bcdb10ac0dc7bc8c4d0aefe.jpg',
    title: 'Proyecto Comercial',
    desc: 'Instalación comercial a gran escala diseñada para reducir los costos de electricidad en horarios pico.',
    tag: 'Comercial',
  },
]
// Duplicate for seamless infinite loop
const GALERIA_LOOP = [...GALERIA_ITEMS, ...GALERIA_ITEMS]

function NuestraGaleria() {
  const [selectedItem, setSelectedItem] = useState<typeof GALERIA_ITEMS[0] | null>(null)

  return (
    <section id="galeria" style={{ padding: 'var(--section) var(--pad)', background: 'var(--ink)', color: '#fff', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: 40 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase',
          color: 'var(--amber)', marginBottom: 12,
        }}>
          Evidencia Real de Trabajo
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(28px, 5vw, 44px)', color: '#fff',
          lineHeight: 1.1, letterSpacing: '-0.6px', marginBottom: 16,
        }}>
          Galería de Proyectos
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto' }}>
          Mira a nuestro equipo trabajando y la calidad de nuestras instalaciones. Haz clic para ampliar.
        </p>
      </div>

      {/* Infinite Marquee — full bleed, no padding on sides so it feels cinematic */}
      <div style={{ overflow: 'hidden', padding: '4px 0 24px' }}>
        <div className="marquee-track">
          {GALERIA_LOOP.map((item, i) => (
            <div
              key={`${item.title}-${i}`}
              onClick={() => setSelectedItem(GALERIA_ITEMS[i % GALERIA_ITEMS.length])}
              className="marquee-card"
            >
              {/* Thumbnail */}
              <div style={{ height: 160, background: '#000', position: 'relative', overflow: 'hidden' }}>
                {item.type === 'video' ? (
                  <>
                    <video
                      src={item.src}
                      muted
                      loop
                      playsInline
                      preload="none"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.25)',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'var(--amber)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(192,123,26,0.4)',
                      }}>
                        <Play size={16} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <span style={{
                  position: 'absolute', top: 10, left: 10,
                  background: 'rgba(0,0,0,0.65)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff', fontSize: 9, fontWeight: 700,
                  padding: '3px 7px', borderRadius: 4, textTransform: 'uppercase',
                }}>
                  {item.tag}
                </span>
                <div style={{
                  position: 'absolute', bottom: 10, right: 10,
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Maximize2 size={11} color="#fff" />
                </div>
              </div>
              {/* Caption */}
              <div style={{ padding: '14px 16px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(10,10,8,0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16,
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            style={{
              background: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 800,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              animation: 'fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {selectedItem.tag}
              </span>
              <button
                onClick={() => setSelectedItem(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Media Content */}
            <div style={{ background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '55vh', overflow: 'hidden' }}>
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain' }}
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  style={{ width: '100%', maxHeight: '55vh', objectFit: 'contain' }}
                />
              )}
            </div>

            {/* Details Footer */}
            <div style={{ padding: '24px 28px', background: '#181818' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 8 }}>
                {selectedItem.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                {selectedItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

/* ══════════════════════ ENCUÉNTRANOS (Cobertura + Horario + Contacto fusionados) ══════════════════════ */
/* ══════════════════════ ENCUÉNTRANOS & CONTACTO (Tabbed Layout) ══════════════════════ */
function EncuentraNos({ openPrivacy, openTerms }: { openPrivacy: () => void; openTerms: () => void }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapVisible, setMapVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'mapa' | 'cobertura' | 'horario'>('mapa')

  // States for Professional Solar Form
  const [tipo, setTipo] = useState('')
  const [consumo, setConsumo] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setMapVisible(true); obs.disconnect() } }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [activeTab]) // Re-run when tab switches to map

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!consent) { setError('Debes aceptar el aviso de privacidad.'); return }
    if (!tipo || !consumo) { setError('Por favor selecciona el tipo de inmueble y tu consumo.'); return }
    if (!phone.trim()) { setError('El teléfono es obligatorio.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      const text = `Hola, solicito una propuesta técnica sin costo.\n\n*Datos del Proyecto:*\n- Tipo: ${tipo}\n- Recibo bimestral: ${consumo}\n\n*Contacto:*\n- Nombre: ${name}\n- Teléfono: ${phone}`
      window.open(`https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`, '_blank')
    }, 900)
  }

  return (
    <section id="contacto" style={{ padding: 'calc(var(--section) * 0.8) var(--pad)', background: 'linear-gradient(to bottom, #fff, #f9f9f9)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 10 }}>
            MILENIO Paneles Solares
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(28px,6vw,46px)', color: 'var(--ink)', lineHeight: 1.1, letterSpacing: '-0.8px' }}>
            Descubre tu Ahorro
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-3)', marginTop: 12, maxWidth: 600, margin: '12px auto 0' }}>
            Obtén una propuesta técnica y financiera gratuita. Instala hoy y deja de pagar recibos caros a CFE.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
          
          {/* LEFT: Professional Solar Form */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: '32px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.04)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, background: 'var(--amber-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={32} color="var(--amber)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--ink)', marginBottom: 10 }}>¡Solicitud Recibida!</h3>
                <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 24 }}>Estamos procesando tu información. Te abriremos una conversación en WhatsApp para entregarte tu propuesta técnica.</p>
                <button onClick={() => setSubmitted(false)} style={{ background: 'none', border: 'none', color: 'var(--amber)', fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}>Nueva solicitud</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ marginBottom: 4 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--ink)', marginBottom: 4 }}>Cotizador Rápido</h3>
                  <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>Completa el formulario y recibe tu proyección de ahorro.</p>
                </div>

                {error && <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 8, color: '#b91c1c', fontSize: 13 }}>{error}</div>}

                {/* Solar Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 6 }}>¿Dónde instalarás los paneles? <span style={{ color: 'var(--amber)' }}>*</span></label>
                    <select className="form-input" required value={tipo} onChange={e => setTipo(e.target.value)} style={{ padding: '14px 16px', appearance: 'auto' }}>
                      <option value="">Selecciona una opción...</option>
                      <option value="Casa Habitacion">Casa Habitación</option>
                      <option value="Negocio Comercial">Negocio Comercial</option>
                      <option value="Industria / Bodega">Industria / Bodega</option>
                    </select>
                  </div>
                  
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 6 }}>Recibo de luz bimestral <span style={{ color: 'var(--amber)' }}>*</span></label>
                    <select className="form-input" required value={consumo} onChange={e => setConsumo(e.target.value)} style={{ padding: '14px 16px', appearance: 'auto' }}>
                      <option value="">Aproximado en pesos...</option>
                      <option value="Menos de $1,500">Menos de $1,500 MXN</option>
                      <option value="$1,500 a $3,500">$1,500 a $3,500 MXN</option>
                      <option value="$3,500 a $6,000">$3,500 a $6,000 MXN</option>
                      <option value="Más de $6,000">Más de $6,000 MXN</option>
                    </select>
                  </div>
                </div>

                {/* Contact Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 6 }}>Nombre <span style={{ color: 'var(--amber)' }}>*</span></label>
                    <input type="text" required placeholder="Juan Pérez" className="form-input" value={name} onChange={e => setName(e.target.value)} style={{ padding: '14px 16px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 6 }}>WhatsApp <span style={{ color: 'var(--amber)' }}>*</span></label>
                    <input type="tel" required placeholder="33 1234 5678" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} style={{ padding: '14px 16px' }} />
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginTop: 8, padding: '4px 0' }}>
                  <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} style={{ marginTop: 3, accentColor: 'var(--amber)', width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>
                    Acepto el{' '}
                    <button type="button" onClick={openPrivacy} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--amber)', fontWeight: 600, fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>Aviso de Privacidad</button>
                    {' '}y autorizo ser contactado con mi cotización.
                  </span>
                </label>

                <button type="submit" disabled={loading} style={{ background: 'var(--amber)', color: '#fff', fontWeight: 800, fontSize: 15, padding: '16px', borderRadius: 10, border: 'none', cursor: loading ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8, transition: 'all 0.25s', boxShadow: '0 6px 20px rgba(192, 123, 26, 0.25)' }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--amber-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.transform = 'none' } }}
                >
                  {loading ? 'Generando Propuesta...' : <><span>Obtener Propuesta Gratuita</span><Zap size={18} fill="#fff" /></>}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Tabbed Information Display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            
            {/* Tabs Navigation */}
            <div style={{ display: 'flex', background: 'var(--bg-2)', borderRadius: 12, padding: 6, gap: 6, border: '1px solid var(--line)' }}>
              {[
                { id: 'mapa', icon: MapPin, label: 'Mapa' },
                { id: 'cobertura', icon: Shield, label: 'Cobertura' },
                { id: 'horario', icon: Clock, label: 'Horario' }
              ].map(tab => {
                const isActive = activeTab === tab.id
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      flex: 1, padding: '12px 0', borderRadius: 8, border: 'none',
                      background: isActive ? '#fff' : 'transparent',
                      color: isActive ? 'var(--amber)' : 'var(--ink-3)',
                      fontWeight: isActive ? 700 : 600, fontSize: 13, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: isActive ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={16} color={isActive ? "var(--amber)" : "var(--ink-4)"} />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tabs Content */}
            <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', height: 420, position: 'relative' }}>
              
              {/* MAPA TAB */}
              <div style={{ display: activeTab === 'mapa' ? 'block' : 'none', width: '100%', height: '100%' }} ref={mapRef}>
                {mapVisible ? (
                  <iframe
                    title="Zona de Cobertura"
                    src="https://maps.google.com/maps?q=Guadalajara+Jalisco+Mexico&output=embed&z=11&hl=es"
                    width="100%" height="100%"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0ede6' }}>
                    <MapPin size={32} color="var(--amber)" />
                  </div>
                )}
              </div>

              {/* COBERTURA TAB */}
              <div style={{ display: activeTab === 'cobertura' ? 'block' : 'none', padding: '32px', height: '100%', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>Zona Metropolitana</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24, lineHeight: 1.6 }}>Llegamos a tu domicilio sin costo de viáticos para evaluaciones técnicas.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {ZONES.map((z, i) => (
                    <div key={z.name} style={{ display: 'flex', gap: 14, paddingBottom: 16, borderBottom: i < ZONES.length - 1 ? '1px solid var(--line)' : 'none' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MapPin size={16} color="var(--amber)" />
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{z.name}</p>
                        <p style={{ fontSize: 13, color: 'var(--ink-4)', lineHeight: 1.4 }}>{z.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HORARIO TAB */}
              <div style={{ display: activeTab === 'horario' ? 'flex' : 'none', flexDirection: 'column', padding: '32px', height: '100%', overflowY: 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>Horario de Atención</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24, lineHeight: 1.6 }}>Soporte técnico y atención comercial en los siguientes horarios.</p>
                <div style={{ background: 'var(--bg-2)', borderRadius: 12, border: '1px solid var(--line)', padding: '0 20px' }}>
                  {HOURS.map((h, i) => (
                    <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderBottom: i < HOURS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                      <span style={{ fontSize: 15, color: 'var(--ink-2)', fontWeight: 600 }}>{h.day}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: h.open ? 'var(--ink)' : 'var(--ink-4)' }}>{h.range}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 24, textAlign: 'center' }}>
                   <p style={{ fontSize: 13, color: 'var(--ink-4)' }}>Para emergencias de mantenimiento, comunícate por WhatsApp.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════ LEGAL CONTENT ══════════════════════ */
const PRIVACY_CONTENT = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p><strong>Última actualización: Julio 2026</strong></p>
    <p>En <strong>Nuevo Milenio Paneles Solares</strong> (en adelante "Nosotros" o "La Empresa"), con domicilio en Guadalajara, Jalisco, México, estamos comprometidos con la protección y confidencialidad de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>1. Datos Personales que Recabamos</h4>
    <p>Los datos que recopilamos a través de nuestro sitio web y formulario de contacto incluyen:</p>
    <ul style={{ paddingLeft: 20 }}>
      <li>Nombre completo</li>
      <li>Número de teléfono (WhatsApp o móvil)</li>
      <li>Dirección de correo electrónico</li>
      <li>Detalles de tu consumo eléctrico o ubicación del inmueble (para realizar cotizaciones)</li>
    </ul>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>2. Finalidad del Tratamiento de Datos</h4>
    <p>Tus datos serán utilizados única y exclusivamente para los siguientes fines:</p>
    <ul style={{ paddingLeft: 20 }}>
      <li>Elaborar y enviarte cotizaciones gratuitas de sistemas de paneles solares.</li>
      <li>Agendar visitas técnicas de evaluación en tu domicilio.</li>
      <li>Establecer contacto directo vía telefónica, correo o WhatsApp para dar seguimiento a tu solicitud.</li>
      <li>Cumplir con procesos administrativos y facturación en caso de contratación.</li>
    </ul>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>3. Seguridad y Confidencialidad</h4>
    <p>Implementamos medidas de seguridad técnicas, físicas y administrativas para salvaguardar tu información. Toda la información enviada mediante nuestro formulario web está encriptada y protegida con protocolos SSL, impidiendo que terceros no autorizados tengan acceso a ella.</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>4. Transferencia de Datos</h4>
    <p>Te garantizamos que tus datos personales <strong>no serán vendidos, transferidos ni compartidos</strong> con terceras empresas ni socios comerciales sin tu consentimiento explícito, salvo requerimiento de autoridad competente de conformidad con la ley.</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>5. Derechos ARCO</h4>
    <p>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte (Derechos ARCO) al uso de tus datos personales. Para ejercer cualquiera de estos derechos, puedes enviar una solicitud a nuestro WhatsApp 33 1125 9093 o contactarnos a través de los medios publicados en este sitio.</p>
  </div>
)

const TERMS_CONTENT = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <p><strong>Última actualización: Julio 2026</strong></p>
    <p>Bienvenido al sitio web oficial de <strong>Nuevo Milenio Paneles Solares</strong>. Al usar nuestro sitio, solicitar cotizaciones o contratar nuestros servicios de instalación, aceptas estar sujeto a los siguientes Términos y Condiciones:</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>1. Cotizaciones y Visitas Técnicas</h4>
    <p>Todas las cotizaciones preliminares generadas a través del sitio web son gratuitas y de carácter informativo. Están sujetas a confirmación final mediante una visita técnica en el inmueble para evaluar el tipo de techo, orientación solar, espacio útil y estado de la instalación eléctrica.</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>2. Proyecciones de Ahorro</h4>
    <p>Las estimaciones de ahorro energético que proporcionamos son proyecciones calculadas en base a tu historial de consumo promedio reflejado en tu recibo de CFE. Las variaciones climáticas anuales, el cambio en los hábitos de consumo de energía del usuario y posibles ajustes tarifarios de CFE pueden influir en el ahorro neto real.</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>3. Garantía del Sistema</h4>
    <p>Nuevo Milenio otorga una garantía por escrito de <strong>5 años</strong> que cubre defectos de instalación y el correcto funcionamiento del equipo suministrado. Los paneles solares monocristalinos cuentan además con garantías de rendimiento de fábrica provistas por sus respectivos fabricantes (generalmente hasta 25 años sobre el 80% de eficiencia).</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>4. Limitación de Responsabilidad</h4>
    <p>La Empresa se compromete a realizar todas las instalaciones conforme a la normativa vigente de la Comisión Federal de Electricidad (CFE) y las normas oficiales aplicables. No nos hacemos responsables de interrupciones del servicio o afectaciones causadas por fallas en la red general de CFE, fenómenos meteorológicos extremos o modificaciones no autorizadas al sistema por personal ajeno a la empresa.</p>
    <h4 style={{ fontWeight: 700, color: 'var(--ink)', marginTop: 8 }}>5. Modificaciones</h4>
    <p>Nos reservamos el derecho de modificar o actualizar estos términos de uso y las especificaciones de nuestros servicios en cualquier momento, reflejándose los cambios correspondientes en este sitio web de manera inmediata.</p>
  </div>
)

/* ══════════════════════ LEGAL MODAL COMPONENT ══════════════════════ */
interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', width: '100%', maxWidth: 640,
          maxHeight: '85vh', borderRadius: 16, display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          animation: 'fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--ink)' }}>
            {title}
          </h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 4, display: 'flex', alignItems: 'center', color: 'var(--ink-3)',
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: 24, overflowY: 'auto', flex: 1,
          fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6,
        }}>
          {content}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px', borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-2)',
        }}>
          <button onClick={onClose} style={{
            background: 'var(--ink)', color: '#fff', fontWeight: 600,
            fontSize: 13, padding: '10px 20px', borderRadius: 8,
            border: 'none', cursor: 'pointer',
          }}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════ CONTACT ══════════════════════ */
function Contact({ openPrivacy, openTerms }: { openPrivacy: () => void; openTerms: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) {
      setError('Por favor, ingresa tu nombre y teléfono.')
      return
    }
    if (!consent) {
      setError('Debes aceptar el Aviso de Privacidad y los Términos.')
      return
    }
    setError('')
    setLoading(true)

    // Simulate api request
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)

      const text = `Hola, mi nombre es ${name}. Solicito una cotización de paneles solares.\nTeléfono: ${phone}\nCorreo: ${email || 'No proporcionado'}\nMensaje: ${message || 'No proporcionado'}`
      const waUrl = `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(text)}`
      window.open(waUrl, '_blank')
    }, 1200)
  }

  return (
    <section id="contacto" style={{ padding: 'var(--section) var(--pad)', background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center' }}>
          {/* Left Column - Information & Trust */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 14 }}>
              Contacto & Asesoría
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(28px, 4.5vw, 44px)', color: 'var(--ink)',
              lineHeight: 1.15, letterSpacing: '-1px', marginBottom: 20,
            }}>
              Tu cotización es gratis.<br />Sin compromiso.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: 32 }}>
              Completa el formulario y uno de nuestros ingenieros expertos en Guadalajara evaluará tu caso para ofrecerte el mejor sistema de ahorro a tu medida.
            </p>

            {/* Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={16} color="var(--amber)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>Cifrado SSL de 256 bits</h4>
                  <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>Tus datos personales están 100% protegidos y son estrictamente confidenciales.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Zap size={16} color="var(--amber)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>Propuesta en menos de 2 horas</h4>
                  <p style={{ fontSize: 12, color: 'var(--ink-3)' }}>Recibe un estudio preliminar de ahorro rápido por correo o WhatsApp.</p>
                </div>
              </div>
            </div>

            {/* Direct buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href={WA_URL} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 14,
                padding: '12px 22px', borderRadius: 8, transition: 'filter 0.2s',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
              }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.9)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'none'}
              >
                <MessageCircle size={16} /> WhatsApp Directo
              </a>
              <a href={`tel:${PHONE_RAW}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--bg-2)', color: 'var(--ink)', fontWeight: 600, fontSize: 14,
                padding: '12px 22px', borderRadius: 8, border: '1px solid var(--line)',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-2)'}
              >
                <Phone size={16} /> Llamar ahora
              </a>
            </div>
          </div>

          {/* Right Column - Premium Form Card */}
          <div style={{
            background: 'var(--bg-2)', border: '1px solid var(--line)',
            borderRadius: 16, padding: '32px 28px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', background: 'var(--amber-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                }}>
                  <CheckCircle size={32} color="var(--amber)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--ink)', marginBottom: 8 }}>
                  ¡Solicitud Enviada!
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 20 }}>
                  Hemos recibido tus datos de forma segura. Te abriremos una conversación en WhatsApp para coordinar tu propuesta de inmediato.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: 'none', border: 'none', color: 'var(--amber)',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--ink)', marginBottom: 4 }}>
                  Solicita tu Estudio de Ahorro
                </h3>
                <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 8 }}>
                  Déjanos tus datos y te contactaremos a la brevedad.
                </p>

                {error && (
                  <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: 6, color: '#b91c1c', fontSize: 13, fontWeight: 500 }}>
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="form-name" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>
                    Nombre completo <span style={{ color: 'var(--amber)' }}>*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    className="form-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="form-phone" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>
                    Número de teléfono <span style={{ color: 'var(--amber)' }}>*</span>
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    placeholder="Ej. 33 1234 5678"
                    className="form-input"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="form-email" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>
                    Correo electrónico <span style={{ fontSize: 10, color: 'var(--ink-4)', fontWeight: 400 }}>(Opcional)</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    placeholder="Ej. juan@correo.com"
                    className="form-input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="form-msg" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>
                    Mensaje / Detalles de consumo <span style={{ fontSize: 10, color: 'var(--ink-4)', fontWeight: 400 }}>(Opcional)</span>
                  </label>
                  <textarea
                    id="form-msg"
                    rows={3}
                    placeholder="Ej. Mi recibo CFE sale en $3,000 pesos..."
                    className="form-input"
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                {/* Consent Checkbox */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 4 }}>
                  <input
                    id="form-consent"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={e => setConsent(e.target.checked)}
                    style={{ marginTop: 3, cursor: 'pointer', width: 15, height: 15, accentColor: 'var(--amber)' }}
                  />
                  <label htmlFor="form-consent" style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.5, cursor: 'pointer', userSelect: 'none' }}>
                    Acepto el{' '}
                    <button type="button" onClick={openPrivacy} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--amber)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                      Aviso de Privacidad
                    </button>{' '}
                    y los{' '}
                    <button type="button" onClick={openTerms} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--amber)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
                      Términos y Condiciones
                    </button>
                    . <span style={{ color: 'var(--amber)' }}>*</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: 'var(--amber)', color: '#fff', fontWeight: 700,
                    fontSize: 14, padding: '14px', borderRadius: 8, border: 'none',
                    cursor: loading ? 'default' : 'pointer', marginTop: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 12px rgba(192, 123, 26, 0.2)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'var(--amber-dark)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(192, 123, 26, 0.3)' } }}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = 'var(--amber)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(192, 123, 26, 0.2)' } }}
                >
                  {loading ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <span>Solicitar Cotización Segura</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

/* ══════════════════════ FOOTER ══════════════════════ */
function Footer({ openPrivacy, openTerms }: { openPrivacy: () => void; openTerms: () => void }) {
  return (
    <footer style={{ background: 'var(--ink)', color: 'rgba(255,255,255,0.42)', padding: '32px var(--pad)' }}>
      <div className="footer-inner" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, background: 'var(--amber)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sun size={16} color="#fff" strokeWidth={2.2} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#fff' }}>
            MILENIO <span style={{ color: 'var(--amber)' }}>PANELES SOLARES</span>
          </span>
        </div>

        <p style={{ fontSize: 12 }}>Paneles Solares · Guadalajara, Jalisco</p>

        <div style={{ display: 'flex', gap: 16, fontSize: 13, flexWrap: 'wrap' }}>
          <button onClick={openPrivacy} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >Aviso de Privacidad</button>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <button onClick={openTerms} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >Términos y Condiciones</button>
        </div>

        <a href={`tel:${PHONE_RAW}`} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
        >
          <Phone size={13} /> {PHONE}
        </a>
      </div>
    </footer>
  )
}

/* ══════════════════════ WhatsApp FAB ══════════════════════ */
function WhatsAppFAB() {
  return (
    <a href={WA_URL} target="_blank" rel="noreferrer"
      title="WhatsApp"
      style={{
        position: 'fixed', bottom: 20, right: 20, zIndex: 999,
        width: 52, height: 52, borderRadius: '50%',
        background: '#25D366', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
    >
      <MessageCircle size={24} />
    </a>
  )
}

/* ══════════════════════ APP ══════════════════════ */
export default function SolarLanding() {
  // Dismiss the HTML loading skeleton immediately on first paint
  useDismissSkeleton()

  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [termsOpen, setTermsOpen] = useState(false)

  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main>
        <Hero />
        <ProjectVideo />
        <Products />
        <Benefits />
        <NuestraGaleria />
        <EncuentraNos openPrivacy={() => setPrivacyOpen(true)} openTerms={() => setTermsOpen(true)} />
      </main>
      <Footer openPrivacy={() => setPrivacyOpen(true)} openTerms={() => setTermsOpen(true)} />
      <WhatsAppFAB />

      <LegalModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Aviso de Privacidad"
        content={PRIVACY_CONTENT}
      />
      <LegalModal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Términos y Condiciones"
        content={TERMS_CONTENT}
      />
    </>
  )
}
