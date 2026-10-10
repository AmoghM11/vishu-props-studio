import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, Star, Phone, MapPin, Clock, ArrowRight, ArrowUpRight, Baby, Heart, Users, Camera,
  Cake, Sparkles, Building2, Gift, ChevronLeft, ChevronRight, Shirt, CalendarCheck, Images,
  Wallet, Video, BookOpen, Palette, ShieldCheck, Upload, Check, Loader2, Navigation, Quote,
} from 'lucide-react'
import GALLERY from './gallery.json'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────── Content (from Justdial, magicpin, Instagram) ─────────────────────────── */

const img = (id, size = 'full') => `/img/${size}/vps-${String(id).padStart(3, '0')}.webp`

const PHONES = {
  vidyaranyapura: { label: '98452 29105', tel: '+919845229105', wa: '919845229105' },
  vijaynagar: { label: '98453 19105', tel: '+919845319105', wa: '919845319105' },
  general: { label: '88809 99105', tel: '+918880999105' },
}
const INSTAGRAM = 'https://www.instagram.com/vishupropsstudio/'
const FACEBOOK = 'https://www.facebook.com/p/Vishu-Prop-Studio-61563375611543/'
const WA_DEFAULT = `https://wa.me/${PHONES.vidyaranyapura.wa}?text=${encodeURIComponent('Hi Vishu Props Studio, I would like to book a photoshoot.')}`

const NAV = [
  { href: '#themes', label: 'Themes' },
  { href: '#services', label: 'Shoots' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#studios', label: 'Studios' },
  { href: '#reviews', label: 'Reviews' },
]

const THEMES = [
  { id: 7, name: 'Little Krishna' },
  { id: 13, name: 'Ravi Varma' },
  { id: 60, name: 'Seaside Sailor' },
  { id: 196, name: 'Moonlight Newborn' },
  { id: 26, name: 'Vintage Music Room' },
  { id: 65, name: 'Milk & Citrus Bath' },
  { id: 129, name: 'Pretty in Pink' },
  { id: 217, name: 'Peacock Nest' },
]

const SERVICES = [
  { icon: Heart, title: 'Maternity Shoot', text: 'Solo and family maternity portraits in flowing gowns, sarees and styled sets — including the Ravi Varma theme.', img: 147, tag: 'Most loved' },
  { icon: Baby, title: 'Newborn Shoot', text: 'Calm, unhurried sessions with wraps, nests and dreamy props — your baby handled with great care and love.', img: 169 },
  { icon: Sparkles, title: 'Toddler & 1st Year', text: 'Milestone shoots for six months to the first birthday, with costumes provided for every theme.', img: 22 },
  { icon: Cake, title: 'Pre-Birthday & Cake Smash', text: '“One”, “Two” and half-birthday setups with balloons, cakes and toys, ready before the party.', img: 154 },
  { icon: Users, title: 'Family Portraits', text: 'Parents, grandparents and siblings together — from the royal throne set to the vintage window.', img: 168 },
  { icon: Camera, title: 'Model & Fashion Shoot', text: 'Portfolio and fashion shoots using our backdrops, lighting and 2,500 sq ft of set space.', img: 87 },
  { icon: Building2, title: 'Studio & Props Rental', text: 'Rent the studio space and props for your own shoot. 150+ themes ready to use.', img: 304 },
  { icon: Gift, title: 'Event Coverage', text: 'Wedding, engagement and birthday photography with albums and videography.', img: 316 },
]

const PRICES = [
  { title: 'Wedding Photography', range: '₹25,000 – ₹30,000', text: 'Full-day coverage. Posed portraits and candid moments, with albums, digital galleries and pre-wedding options.' },
  { title: 'Engagement Photography', range: '₹12,000 – ₹15,000', text: 'Authentic moments between couples in natural or styled settings, delivered as a curated, edited gallery.' },
  { title: 'Birthday Photography', range: '₹10,000 – ₹15,000', text: 'From children’s parties to milestone celebrations, indoors or outdoors, with a quick turnaround.' },
]

const REVIEWS = [
  { name: 'Hema Reddy', when: '3 months ago', text: 'I genuinely loved the output — every frame came out so beautifully. A special thanks to Rio sir for being so patient throughout and making us feel completely comfortable. And one more special thanks to the makeup artist who made us very comfortable.' },
  { name: 'Chetan Sharma', when: '4 months ago', text: 'We did my wife’s pregnancy photoshoot here. We chose the Ravi Varma theme along with a groom-style shoot, and both turned out beautifully. They have a wide variety of props, which really helped bring the concepts to life. Highly recommended for maternity photoshoots!' },
  { name: 'Pooja Suvarna', when: '8 months ago', text: 'The team was extremely professional, patient and friendly. They have a wide range of unique and creative props and costumes. The studio atmosphere was very homely — they handled my baby with great care and love, making us feel relaxed and confident.' },
  { name: 'Suhas Manu', when: '2 months ago', text: 'We had an amazing experience with the photoshoot for our daughter! The photos came out absolutely beautiful and captured her personality perfectly. Thank you for creating such wonderful memories for us.' },
  { name: 'CS Aishwarya Hegde', when: '6 months ago', text: 'We visited the new Vijaynagar branch for my one-year-old son’s photoshoot and did 5 different themes. All the props were very good, and suitable costumes were provided for every theme. We are very happy with the service.' },
  { name: 'Naveen H P', when: '4 months ago', text: 'We did a maternity photoshoot and had a wonderful experience. The photographer is very friendly and patient throughout the entire shoot. I recommend this studio for maternity and baby photography.' },
]

const STUDIOS = [
  {
    key: 'vidyaranyapura',
    name: 'Vidyaranyapura',
    sub: 'Nanjappa Circle · Thindlu',
    address: '1A, Lakshmi Amma Complex, Nanjappa Circle, opposite Reliance, Kodigehalli–Thindlu Main Road, Thindlu, Bengaluru 560097',
    maps: 'https://www.google.com/maps/search/?api=1&query=Vishu+Props+Studio+Nanjappa+Circle+Thindlu+Bengaluru',
    img: 304,
    note: 'Our 2,500 sq ft flagship studio — 150+ themes and a full prop store.',
  },
  {
    key: 'vijaynagar',
    name: 'Vijaynagar',
    sub: 'Prashanth Nagar · New branch',
    address: '1st Main Road, Syndicate Bank Colony, Govindaraja Nagar Ward, Prashanth Nagar, Vijayanagar, Bengaluru 560079',
    maps: 'https://www.google.com/maps?q=12.9819548,77.5313654',
    img: 292,
    note: 'Our newer West Bangalore branch for baby, pre-birthday and maternity shoots.',
  },
]

const CATS = [
  { key: 'all', label: 'All' },
  { key: 'maternity', label: 'Maternity' },
  { key: 'newborn', label: 'Newborn' },
  { key: 'baby', label: 'Baby & Toddler' },
  { key: 'family', label: 'Family & Couples' },
  { key: 'studio', label: 'The Studio' },
]

/* ─────────────────────────── Small helpers ─────────────────────────── */

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.22 8.23zm4.51-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A21 21 0 0 0 14.3 4.3c-2.28 0-3.8 1.39-3.8 3.94V10.5H8v3h2.5V21h3z" />
    </svg>
  )
}
function Sparkle({ className = '', style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 0c.6 5.6 2.4 8.4 12 12-9.6 3.6-11.4 6.4-12 12-.6-5.6-2.4-8.4-12-12C9.6 8.4 11.4 5.6 12 0z" fill="currentColor" />
    </svg>
  )
}
function Stars({ n = 5, className = 'h-4 w-4' }) {
  return (
    <span className="inline-flex gap-0.5 text-gold" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => <Star key={i} className={className} fill="currentColor" strokeWidth={0} />)}
    </span>
  )
}

/* Magnetic pull for primary CTAs — fine pointers only */
function Magnetic({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced() || !window.matchMedia('(pointer: fine)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
    const move = (e) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22)
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3)
    }
    const leave = () => { xTo(0); yTo(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [])
  return <span ref={ref} className="magnetic-btn inline-flex">{children}</span>
}

function SectionHead({ label, title, flourish, text, center = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`} data-reveal>
      <p className="label">{label}</p>
      <h2 className="display-lg mt-4">
        {title} {flourish && <span className="flourish">{flourish}</span>}
      </h2>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  )
}

/* ─────────────────────────── 1 · Navbar ─────────────────────────── */

function Logo({ light = false }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Vishu Props Studio — home">
      <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-plum text-gold-soft shadow-soft">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path d="M20 6a11 11 0 1 0 6 19.6A9 9 0 0 1 20 6z" fill="currentColor" />
          <path d="M23 8l.9 2.1 2.1.9-2.1.9L23 14l-.9-2.1-2.1-.9 2.1-.9z" fill="#B48A4E" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-bold tracking-tight ${light ? 'text-ivory' : 'text-ink'}`}>Vishu Props</span>
        <span className={`mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.28em] ${light ? 'text-gold-soft/80' : 'text-gold-deep'}`}>Studio · Bangalore</span>
      </span>
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-300 ${scrolled ? 'glass shadow-soft' : 'border border-transparent'}`}
      >
        <Logo />
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="rounded-full px-4 py-2.5 text-[0.92rem] font-medium text-ink/80 transition-colors hover:bg-plum-soft hover:text-plum">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={`tel:${PHONES.vidyaranyapura.tel}`} className="hidden items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-ink/80 hover:text-plum md:inline-flex">
            <Phone className="h-4 w-4" /> {PHONES.vidyaranyapura.label}
          </a>
          <a href="#book" className="btn btn-primary hidden !min-h-[44px] !px-5 text-sm sm:inline-flex">Book a shoot</a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white/80 lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile sheet — slides from the right, dismisses to the right */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ivory p-6 shadow-lift transition-transform duration-[420ms] ease-[cubic-bezier(.32,.72,0,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="mt-10 space-y-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a onClick={() => setOpen(false)} href={n.href} className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-semibold tracking-tight hover:bg-plum-soft">
                  {n.label} <ArrowRight className="h-5 w-5 text-gold" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3">
            <a onClick={() => setOpen(false)} href="#book" className="btn btn-primary w-full">Book a shoot</a>
            <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn btn-ghost w-full"><WhatsAppIcon className="h-5 w-5 text-[#1f9d55]" /> WhatsApp us</a>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─────────────────────────── 2 · Hero ─────────────────────────── */

function Hero() {
  const root = useRef(null)
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.h-anim', { y: 32, opacity: 0, duration: 0.95, stagger: 0.08 })
        .from('.h-img', { y: 40, opacity: 0, scale: 0.96, duration: 1.1, stagger: 0.12 }, 0.15)
        .from('.h-chip', { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.7)
      gsap.to('.h-parallax', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={root} className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[100dvh] lg:pb-24">
      {/* soft backdrop washes */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-plum-soft blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gold-soft blur-3xl" />
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-70" />

      {/* floating sparkles, top-right */}
      <div aria-hidden="true" className="pointer-events-none absolute right-6 top-24 hidden h-40 w-56 sm:block">
        {[[10, 20, 14, 0], [70, 8, 10, 0.8], [130, 40, 18, 1.6], [180, 4, 9, 0.4], [96, 80, 12, 2.1], [40, 110, 8, 1.2]].map(([x, y, s, d], i) => (
          <Sparkle key={i} className={`twinkle absolute ${i % 2 ? 'text-plum/50' : 'text-gold'}`} style={{ left: x, top: y, width: s, height: s, '--delay': `${d}s`, '--dur': `${2.6 + i * 0.4}s` }} />
        ))}
      </div>

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <p className="h-anim label inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-2">
            <span className="status-dot h-2 w-2 rounded-full bg-[#228b54]" /> Maternity · Newborn · Toddler · 1st Year
          </p>
          <h1 className="h-anim display-xl mt-6">
            Little moments,<br /><span className="flourish">styled to last.</span>
          </h1>
          <p className="h-anim mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            An exclusive Bangalore studio with a wide variety of props and backdrops — 150+ themes across 2,500 sq ft, with costumes for every set. One stop for maternity, newborn, baby and model shoots.
          </p>
          <div className="h-anim mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a href="#book" className="btn btn-primary w-full sm:w-auto">
                Book your shoot <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a href="#gallery" className="btn btn-ghost">
              <Images className="h-4 w-4" /> See 300+ photos
            </a>
          </div>
          <div className="h-anim mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold tracking-tight">5.0</span>
              <span className="text-sm leading-tight text-muted"><Stars className="h-3.5 w-3.5" /><br />444 ratings · Justdial</span>
            </div>
            <span className="hidden h-10 w-px bg-line sm:block" />
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold tracking-tight">4.9</span>
              <span className="text-sm leading-tight text-muted"><Stars className="h-3.5 w-3.5" /><br />70 Google reviews</span>
            </div>
          </div>
        </div>

        {/* collage */}
        <div className="h-parallax relative mx-auto w-full max-w-[560px]">
          <div className="grid grid-cols-[1.15fr_1fr] gap-3 sm:gap-4">
            <figure className="h-img row-span-2 overflow-hidden rounded-[2rem] shadow-lift">
              <img src={img(9)} alt="Expecting mother in a flowing lime tulle gown seated in a gold birdcage set" width="1196" height="1600" className="h-full w-full object-cover" fetchPriority="high" />
            </figure>
            <figure className="h-img overflow-hidden rounded-[2rem] shadow-soft">
              <img src={img(22)} alt="Smiling baby girl with pigtails in a pink first-birthday set" width="1600" height="1065" className="aspect-[4/5] h-full w-full object-cover object-[40%_50%]" />
            </figure>
            <figure className="h-img overflow-hidden rounded-[2rem] shadow-soft">
              <img src={img(196)} alt="Newborn asleep on a glowing crescent moon prop above clouds" width="1600" height="1446" className="aspect-[4/5] h-full w-full object-cover object-[78%_50%]" />
            </figure>
          </div>
          <div className="h-chip glass absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift sm:-left-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-soft text-gold-deep"><Palette className="h-5 w-5" /></span>
            <span className="leading-tight"><b className="font-display text-lg">150+</b><span className="block text-xs text-muted">themes on set</span></span>
          </div>
          <div className="h-chip glass float-y absolute -right-2 top-6 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-soft sm:-right-5">
            <Shirt className="h-4 w-4 text-plum" /> Costumes included
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 3 · Features ─────────────────────────── */

function ThemeShuffler() {
  const [order, setOrder] = useState(THEMES.map((_, i) => i))
  const [paused, setPaused] = useState(false)
  const next = useCallback(() => setOrder((o) => [...o.slice(1), o[0]]), [])
  useEffect(() => {
    if (paused || prefersReduced()) return
    const t = setInterval(next, 2800)
    return () => clearInterval(t)
  }, [paused, next])
  const top = THEMES[order[0]]

  return (
    <div className="card flex h-full flex-col p-6 sm:p-7" data-reveal onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-plum-soft text-plum"><Palette className="h-5 w-5" /></span>
        <span className="font-mono text-xs text-muted">{String(order[0] + 1).padStart(2, '0')} / 150+</span>
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight">150+ themes, ready on set</h3>
      <p className="mt-2 text-[0.95rem] text-muted">Pick a world — the props, backdrop and costume are already waiting.</p>
      <button type="button" onClick={next} className="relative mt-6 h-64 w-full cursor-pointer" aria-label={`Showing theme ${top.name}. Show next theme`}>
        {order.slice(0, 3).map((idx, depth) => (
          <span
            key={THEMES[idx].id}
            className="absolute inset-x-0 top-0 mx-auto block h-56 overflow-hidden rounded-3xl border-4 border-white shadow-soft transition-all duration-700 ease-[cubic-bezier(.34,1.3,.64,1)]"
            style={{
              width: `${100 - depth * 8}%`,
              transform: `translateY(${depth * 14}px)`,
              zIndex: 3 - depth,
              opacity: 1 - depth * 0.25,
            }}
          >
            <img src={img(THEMES[idx].id, 'thumb')} alt="" className="h-full w-full object-cover" loading="lazy" />
            {depth === 0 && (
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 font-display text-sm font-semibold text-ink shadow-soft">{THEMES[idx].name}</span>
            )}
          </span>
        ))}
      </button>
      <p className="mt-auto pt-2 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">Tap to shuffle</p>
    </div>
  )
}

function MoonCradle() {
  // Signature animation: stars fall and settle on the crescent moon, rippling as they land
  const drops = [
    { x: 30, d: 0, dur: 3.4, fall: 118, s: 14, c: 'text-gold' },
    { x: 46, d: 1.1, dur: 3.0, fall: 102, s: 10, c: 'text-plum/60' },
    { x: 62, d: 2.0, dur: 3.6, fall: 96, s: 16, c: 'text-gold' },
    { x: 38, d: 2.7, dur: 3.2, fall: 112, s: 9, c: 'text-[#D9A6B8]' },
    { x: 55, d: 0.6, dur: 3.8, fall: 100, s: 12, c: 'text-[#D9A6B8]' },
  ]
  return (
    <div className="card flex h-full flex-col overflow-hidden p-6 sm:p-7" data-reveal>
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-soft text-gold-deep"><Baby className="h-5 w-5" /></span>
        <span className="font-mono text-xs text-muted">Newborn care</span>
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight">Gentle with the littlest ones</h3>
      <p className="mt-2 text-[0.95rem] text-muted">Patient photographers, a homely studio and babies handled with great care and love.</p>
      <div className="relative mt-6 h-64 overflow-hidden rounded-3xl bg-gradient-to-b from-[#2C2140] via-[#4E2E52] to-[#8C5A72]" aria-hidden="true">
        {[[12, 18], [80, 26], [22, 54], [88, 60], [70, 14], [50, 36]].map(([x, y], i) => (
          <span key={i} className="twinkle absolute h-1 w-1 rounded-full bg-white" style={{ left: `${x}%`, top: `${y}%`, '--delay': `${i * 0.5}s` }} />
        ))}
        {drops.map((p, i) => (
          <div key={i} className="absolute top-0" style={{ left: `${p.x}%` }}>
            <Sparkle className={`star-drop ${p.c}`} style={{ width: p.s, height: p.s, '--delay': `${p.d}s`, '--dur': `${p.dur}s`, '--fall': `${p.fall}px` }} />
            <span className="star-ring absolute left-1/2 h-8 w-8 rounded-full border border-gold-soft/80" style={{ top: p.fall + p.s / 2, '--delay': `${p.d}s`, '--dur': `${p.dur}s` }} />
          </div>
        ))}
        {/* crescent cradle */}
        <svg viewBox="0 0 220 120" className="absolute bottom-0 left-1/2 w-[86%] -translate-x-1/2">
          <defs>
            <linearGradient id="moonG" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#F8E6B8" /><stop offset="1" stopColor="#D9A65A" />
            </linearGradient>
          </defs>
          <path d="M20 40 Q110 150 200 40 Q110 112 20 40z" fill="url(#moonG)" />
          <ellipse cx="110" cy="104" rx="104" ry="18" fill="#fff" opacity=".85" />
          <ellipse cx="60" cy="108" rx="46" ry="14" fill="#fff" />
          <ellipse cx="160" cy="110" rx="50" ry="13" fill="#fff" />
        </svg>
      </div>
    </div>
  )
}

function SlotScheduler() {
  const root = useRef(null)
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, scrollTrigger: { trigger: root.current, start: 'top 85%', toggleActions: 'play pause resume pause' } })
      tl.set('.cursor', { x: 10, y: 150, opacity: 0 })
        .set('.day-5', { backgroundColor: '#FBF8F3', color: '#211B1E' })
        .set('.slot-btn', { backgroundColor: '#EADFD4', color: '#665A5F' })
        .to('.cursor', { opacity: 1, duration: 0.3 })
        .to('.cursor', { x: () => root.current.querySelector('.day-5').offsetLeft + 14, y: () => root.current.querySelector('.day-5').offsetTop + 14, duration: 1, ease: 'power2.inOut' })
        .to('.cursor', { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-5', { backgroundColor: '#6E2F4F', color: '#FBF8F3', duration: 0.2 }, '<')
        .to('.cursor', { x: () => root.current.querySelector('.slot-btn').offsetLeft + 40, y: () => root.current.querySelector('.slot-btn').offsetTop + 16, duration: 0.8, ease: 'power2.inOut' }, '+=0.3')
        .to('.cursor', { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.slot-btn', { backgroundColor: '#228b54', color: '#fff', duration: 0.2 }, '<')
        .to('.cursor', { opacity: 0, duration: 0.4 }, '+=0.8')
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div className="card flex h-full flex-col p-6 sm:p-7" data-reveal>
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-plum-soft text-plum"><CalendarCheck className="h-5 w-5" /></span>
        <span className="font-mono text-xs text-muted">Limited slots</span>
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight">Reserve your session early</h3>
      <p className="mt-2 text-[0.95rem] text-muted">Slots fill fast — call or WhatsApp to lock in your date and theme.</p>
      <div ref={root} className="relative mt-6 h-64 rounded-3xl border border-line bg-ivory p-5" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="font-display font-semibold">Pick a day</span>
          <span className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">This week</span>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {days.map((d, i) => (
            <span key={i} className={`day-${i} grid aspect-square place-items-center rounded-xl border border-line bg-ivory font-mono text-xs`}>{d}</span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-1.5 font-mono text-[0.62rem] text-muted">
          {['Morning', 'Afternoon', 'Evening'].map((s) => <span key={s} className="rounded-lg border border-line bg-white px-1 py-2 text-center">{s}</span>)}
        </div>
        <span className="slot-btn mt-4 block w-full rounded-full bg-sand py-2.5 text-center text-sm font-semibold text-muted">Hold my slot</span>
        <svg className="cursor pointer-events-none absolute left-0 top-0 h-6 w-6 opacity-0 drop-shadow" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#211B1E" stroke="#fff" strokeWidth="1.4" /></svg>
      </div>
    </div>
  )
}

function Features() {
  return (
    <section id="themes" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="Why families choose us" title="A studio built around" flourish="your story." text="Many customers praise our wide variety of themes and props, a friendly and patient team, and a spacious, hygienic studio." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <ThemeShuffler />
          <MoonCradle />
          <SlotScheduler />
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 4 · Pillars ─────────────────────────── */

function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(prefersReduced() ? to : 0)
  useEffect(() => {
    if (prefersReduced()) return
    const el = ref.current
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1600
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur)
        setVal(to * (1 - Math.pow(1 - p, 4)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref} className="tabular-nums">{val.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}

function Pillars() {
  const items = [
    { to: 5, dec: 1, suffix: '★', label: 'Justdial rating', sub: 'from 444 ratings' },
    { to: 4.9, dec: 1, suffix: '★', label: 'Google rating', sub: 'from 70 reviews' },
    { to: 150, suffix: '+', label: 'Themes & sets', sub: 'with costumes for each' },
    { to: 2500, suffix: '', label: 'Sq ft of studio', sub: 'space and props' },
  ]
  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.label} className={`px-2 sm:px-6 ${i > 0 ? 'lg:border-l lg:border-line' : ''}`} data-reveal>
            <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-none tracking-[-0.04em] text-plum">
              <CountUp to={it.to} decimals={it.dec || 0} suffix={it.suffix} />
            </p>
            <p className="mt-3 font-display font-semibold">{it.label}</p>
            <p className="text-sm text-muted">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────── 5 · Protocol (sticky stack) ─────────────────────────── */

function Protocol() {
  const root = useRef(null)
  const steps = [
    { n: '01', icon: Palette, title: 'Choose your theme & date', text: 'Call or WhatsApp either studio. Tell us whether it’s maternity, newborn, a first birthday or a family shoot, and pick from 150+ themes — Little Krishna, Ravi Varma, seaside, moonlight and more.', img: 285, alt: 'Shelves of props and a crescent moon prop at the studio' },
    { n: '02', icon: Shirt, title: 'Shoot day, fully styled', text: 'Props, backdrops and suitable costumes are provided for every theme, and a makeup artist is available. Many families shoot several themes in one session — our team stays patient until everyone is comfortable.', img: 246, alt: 'Mother and baby in traditional dress on a marigold-decorated set' },
    { n: '03', icon: BookOpen, title: 'Edited photos & albums', text: 'Your edited photos are delivered in less than a month, with albums and videography available. Bookings need an advance of up to 50%.', img: 177, alt: 'Vishu Studio standee showing newborn, toddler and maternity photos' },
  ]
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray('.proto-card', root.current)
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card, {
          scale: 0.92, opacity: 0.45, filter: 'blur(6px)', ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 120px', scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={root} className="relative bg-blush/60 py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="How it works" title="Three easy steps to" flourish="timeless memories." />
        <div className="mt-14 space-y-6 lg:space-y-10">
          {steps.map((s) => (
            <article key={s.n} className="proto-card card grid origin-top overflow-hidden lg:sticky lg:top-[110px] lg:grid-cols-2" style={{ willChange: 'transform' }}>
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-gold-deep">{s.n}</span>
                  <span className="h-px flex-1 bg-line" />
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-plum-soft text-plum"><s.icon className="h-5 w-5" /></span>
                </div>
                <h3 className="mt-8 text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-tight tracking-[-0.025em]">{s.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s.text}</p>
              </div>
              <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[440px]">
                <img src={img(s.img)} alt={s.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 6 · Services grid ─────────────────────────── */

function Services() {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHead label="Shoots & services" title="Every milestone," flourish="one studio." text="From the first bump to the first birthday — and the studio itself, if you’re a photographer." />
          <a href="#book" className="btn btn-ghost self-start lg:self-auto" data-reveal>Ask for packages <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {SERVICES.map((s) => (
            <article key={s.title} className="group relative flex flex-col bg-white">
              <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[4/3]">
                <img src={img(s.img, 'thumb')} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                {s.tag && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-plum">{s.tag}</span>}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-plum-soft text-plum transition-colors group-hover:bg-plum group-hover:text-ivory"><s.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Event price list (Justdial) */}
        <div className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_2fr] lg:items-start">
          <div data-reveal>
            <p className="label">Event price list</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight">Weddings, engagements & birthdays</h3>
            <p className="mt-3 text-muted">Customisable packages, including albums, digital galleries and pre-wedding shoots. Studio shoot prices are shared on enquiry.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {PRICES.map((p) => (
              <div key={p.title} className="card flex flex-col p-6" data-reveal>
                <p className="font-display font-semibold">{p.title}</p>
                <p className="mt-3 font-display text-2xl font-bold tracking-tight text-plum">{p.range}</p>
                <p className="font-mono text-[0.68rem] uppercase tracking-widest text-muted">per package</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{p.text}</p>
                <a href={`https://wa.me/${PHONES.vidyaranyapura.wa}?text=${encodeURIComponent(`Hi, I'd like details on ${p.title}.`)}`} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-plum hover:underline">Enquire now <ArrowRight className="h-4 w-4" /></a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 7 · Gallery + Lightbox ─────────────────────────── */

function Lightbox({ items, index, onClose, onIndex }) {
  const item = items[index]
  const closeRef = useRef(null)
  const stage = useRef(null)
  const drag = useRef(null)
  const [dx, setDx] = useState(0)

  const go = useCallback((dir) => onIndex((index + dir + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = ''; prev?.focus?.() }
  }, [])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])
  // preload neighbours
  useEffect(() => {
    ;[1, -1].forEach((d) => { const n = items[(index + d + items.length) % items.length]; if (n) new Image().src = `/img/full/${n.src}` })
  }, [index, items])

  // 1:1 swipe with velocity-based commit
  const onDown = (e) => {
    if (e.pointerType === 'mouse') return
    stage.current.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, hist: [{ x: e.clientX, t: performance.now() }] }
  }
  const onMove = (e) => {
    if (!drag.current) return
    drag.current.hist.push({ x: e.clientX, t: performance.now() })
    if (drag.current.hist.length > 5) drag.current.hist.shift()
    setDx(e.clientX - drag.current.x)
  }
  const onUp = () => {
    if (!drag.current) return
    const h = drag.current.hist
    const v = h.length > 1 ? (h[h.length - 1].x - h[0].x) / Math.max(1, h[h.length - 1].t - h[0].t) : 0
    const projected = dx + v * 180
    drag.current = null
    setDx(0)
    if (projected < -90) go(1)
    else if (projected > 90) go(-1)
  }

  if (!item) return null
  const cat = CATS.find((c) => c.key === item.cat)?.label
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#120d10]/95" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="flex items-center justify-between p-3 text-ivory sm:p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-ivory/70">{cat} · {index + 1} / {items.length}</p>
        <button ref={closeRef} type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close viewer"><X className="h-5 w-5" /></button>
      </div>
      <div
        ref={stage}
        className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center px-2 pb-6 sm:px-20"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img
          key={item.src}
          src={`/img/full/${item.src}`}
          alt={`Vishu Props Studio — ${cat} photo`}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          style={{ transform: `translateX(${dx}px)`, transition: dx ? 'none' : 'transform 380ms cubic-bezier(.32,.72,0,1)', animation: 'star-fadein 260ms ease-out' }}
          draggable="false"
        />
        <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 sm:grid" aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
        <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 sm:grid" aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
      </div>
      <div className="flex justify-center gap-3 pb-5 sm:hidden">
        <button type="button" onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory" aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
        <button type="button" onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory" aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
      </div>
    </div>
  )
}

function Gallery() {
  const PAGE = 24
  const [cat, setCat] = useState('all')
  const [shown, setShown] = useState(PAGE)
  const [open, setOpen] = useState(null)
  const items = useMemo(() => (cat === 'all' ? GALLERY : GALLERY.filter((g) => g.cat === cat)), [cat])
  const counts = useMemo(() => Object.fromEntries(CATS.map((c) => [c.key, c.key === 'all' ? GALLERY.length : GALLERY.filter((g) => g.cat === c.key).length])), [])
  const visible = items.slice(0, shown)

  return (
    <section id="gallery" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="Portfolio" title="Straight from" flourish="our studio floor." text={`${GALLERY.length} photos from real sessions — maternity, newborn, first birthdays, families and the studio itself.`} />

        <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter photos">
          {CATS.map((c) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={cat === c.key}
              onClick={() => { setCat(c.key); setShown(PAGE) }}
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${cat === c.key ? 'border-plum bg-plum text-ivory' : 'border-line bg-ivory text-ink hover:border-plum/40'}`}
            >
              {c.label} <span className={`font-mono text-[0.7rem] ${cat === c.key ? 'text-ivory/70' : 'text-muted'}`}>{counts[c.key]}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {visible.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-blush sm:mb-4"
              style={{ aspectRatio: `${g.w} / ${g.h}` }}
              aria-label={`Open ${CATS.find((c) => c.key === g.cat)?.label} photo ${i + 1}`}
            >
              <img src={`/img/thumb/${g.src}`} alt="" loading="lazy" decoding="async" width={g.w} height={g.h} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Showing {visible.length} of {items.length}</p>
          {shown < items.length && (
            <button type="button" onClick={() => setShown((s) => s + PAGE)} className="btn btn-ghost">Show more photos</button>
          )}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-plum hover:underline">
            <InstagramIcon className="h-4 w-4" /> More on Instagram @vishupropsstudio
          </a>
        </div>
      </div>
      {open !== null && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  )
}

/* ─────────────────────────── 8 · Studios ─────────────────────────── */

function Studios() {
  return (
    <section id="studios" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="Two studios in Bangalore" title="Come and see" flourish="the sets in person." text="Studio space and props are also available for rent — ideal for photographers and model shoots." />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {STUDIOS.map((s) => {
            const p = PHONES[s.key]
            return (
              <article key={s.key} className="card overflow-hidden" data-reveal>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={img(s.img)} alt={`Inside the ${s.name} studio`} loading="lazy" className="h-full w-full object-cover" />
                  <span className="glass absolute left-4 top-4 rounded-full px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-ink">{s.sub}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold tracking-tight">{s.name}</h3>
                  <p className="mt-2 text-muted">{s.note}</p>
                  <ul className="mt-6 space-y-3 text-[0.95rem]">
                    <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" /><span>{s.address}</span></li>
                    <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" /><a href={`tel:${p.tel}`} className="font-medium hover:text-plum">{p.label}</a></li>
                    <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" /><span>Open until 8:30 pm · by appointment</span></li>
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a href={`https://wa.me/${p.wa}?text=${encodeURIComponent(`Hi Vishu Props Studio (${s.name}), I'd like to book a shoot.`)}`} target="_blank" rel="noreferrer" className="btn btn-primary !px-5 text-sm"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
                    <a href={s.maps} target="_blank" rel="noreferrer" className="btn btn-ghost !px-5 text-sm"><Navigation className="h-4 w-4" /> Directions</a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 9 · Reviews ─────────────────────────── */

function Reviews() {
  return (
    <section id="reviews" className="bg-blush/60 py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <SectionHead label="Kind words" title="Loved by" flourish="Bangalore parents." />
          <div className="flex flex-wrap gap-4" data-reveal>
            <div className="card flex items-center gap-4 px-6 py-5">
              <span className="font-display text-4xl font-bold tracking-tight">5.0</span>
              <span className="text-sm text-muted"><Stars /><br />444 ratings on Justdial</span>
            </div>
            <div className="card flex items-center gap-4 px-6 py-5">
              <span className="font-display text-4xl font-bold tracking-tight">4.9</span>
              <span className="text-sm text-muted"><Stars /><br />70 reviews on Google</span>
            </div>
          </div>
        </div>
        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card mb-5 break-inside-avoid p-7" data-reveal>
              <Quote className="h-7 w-7 text-gold" />
              <blockquote className="mt-4 leading-relaxed text-ink/90">“{r.text}”</blockquote>
              <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-plum-soft font-display font-bold text-plum">{r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <span><span className="block font-display font-semibold">{r.name}</span><span className="text-xs text-muted">Google review · {r.when}</span></span>
                </span>
                <Stars className="h-3.5 w-3.5" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 10 · Trust signals ─────────────────────────── */

function TrustSignals() {
  const items = [
    { icon: ShieldCheck, title: 'Claimed & verified', text: 'Claimed listing on Justdial and a verified listing on magicpin.' },
    { icon: Shirt, title: 'Costumes & props included', text: 'Suitable costumes provided for every theme, plus a wide range of creative props.' },
    { icon: Clock, title: 'Delivered within a month', text: 'Edited photos delivered in less than a month after your shoot.' },
    { icon: Video, title: 'Albums & videography', text: 'Printed albums and videography available for any shoot or event.' },
    { icon: Wallet, title: 'Simple booking', text: 'Reserve your date with an advance of up to 50%.' },
    { icon: Sparkles, title: 'Spacious & hygienic', text: 'Reviewers describe the studio as spacious, hygienic and well maintained.' },
  ]
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead label="Good to know" title="Thoughtful details," flourish="from booking to album." center />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.title} className="flex gap-4 rounded-3xl border border-line bg-white/60 p-6" data-reveal>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold-deep"><t.icon className="h-5 w-5" /></span>
              <div>
                <h3 className="font-display text-base font-bold">{t.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 11 · Booking form ─────────────────────────── */

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [file, setFile] = useState(null)
  const [drag, setDrag] = useState(false)
  const [summary, setSummary] = useState(null)
  const formRef = useRef(null)

  const validate = (name, value) => {
    if (name === 'name' && value.trim().length < 2) return 'Please enter your name.'
    if (name === 'phone' && value.replace(/\D/g, '').length < 10) return 'Enter a 10-digit mobile number so we can call you back.'
    return ''
  }
  // Errors appear on blur but clear while typing — clearing on blur would shift the submit button mid-click
  const onBlur = (e) => {
    const msg = validate(e.target.name, e.target.value)
    if (msg) setErrors((er) => ({ ...er, [e.target.name]: msg }))
  }
  const onInput = (e) => {
    if (errors[e.target.name] && !validate(e.target.name, e.target.value)) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(formRef.current)
    const next = { name: validate('name', fd.get('name')), phone: validate('phone', fd.get('phone')) }
    setErrors(next)
    const first = Object.keys(next).find((k) => next[k])
    if (first) { formRef.current.elements[first].focus(); return }
    setStatus('sending')
    const data = Object.fromEntries(fd.entries())
    setTimeout(() => { setSummary(data); setStatus('sent') }, 1100)
  }

  const waLink = summary && (() => {
    const p = PHONES[summary.studio] || PHONES.vidyaranyapura
    const msg = `Hi Vishu Props Studio! I'm ${summary.name}. I'd like to book a ${summary.shoot} at the ${summary.studio === 'vijaynagar' ? 'Vijaynagar' : 'Vidyaranyapura'} studio.${summary.date ? ` Preferred date: ${summary.date}.` : ''}${summary.message ? ` ${summary.message}` : ''} My number: ${summary.phone}`
    return `https://wa.me/${p.wa}?text=${encodeURIComponent(msg)}`
  })()

  return (
    <section id="book" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-plum-soft blur-3xl" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead label="Book a shoot" title="Let’s plan your" flourish="session." text="Share a few details and we’ll get back to you with themes, availability and packages. Prefer to talk? Call or WhatsApp either studio." />
          <div className="mt-10 space-y-4" data-reveal>
            {[['Vidyaranyapura', PHONES.vidyaranyapura], ['Vijaynagar', PHONES.vijaynagar]].map(([n, p]) => (
              <div key={n} className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-ivory p-5">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-widest text-gold-deep">{n}</p>
                  <a href={`tel:${p.tel}`} className="mt-1 block font-display text-xl font-bold tracking-tight hover:text-plum">{p.label}</a>
                </div>
                <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-[#1f9d55] text-white shadow-soft" aria-label={`WhatsApp the ${n} studio`}><WhatsAppIcon className="h-6 w-6" /></a>
              </div>
            ))}
            <p className="text-sm text-muted">Model shoots & studio rental: <a href={`tel:${PHONES.general.tel}`} className="font-semibold text-ink hover:text-plum">{PHONES.general.label}</a></p>
          </div>
        </div>

        <div className="card p-6 sm:p-9" data-reveal>
          {status === 'sent' ? (
            <div className="flex min-h-[460px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[#228b54] text-white"><Check className="h-8 w-8" /></span>
              <h3 className="mt-6 text-2xl font-bold tracking-tight">Thank you, {summary.name.split(' ')[0]}!</h3>
              <p className="mt-3 max-w-sm text-muted">Your request is ready. Send it on WhatsApp so the studio can confirm your slot right away.</p>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary mt-8"><WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp</a>
              <button type="button" onClick={() => { setStatus('idle'); setSummary(null); setFile(null) }} className="mt-4 min-h-[44px] text-sm font-medium text-muted hover:text-plum">Start a new request</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">Your name <span className="text-plum">*</span></label>
                <input id="name" name="name" autoComplete="name" className="field" onBlur={onBlur} onInput={onInput} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
                {errors.name && <p id="name-err" role="alert" className="mt-1.5 text-sm text-[#b42318]">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold">Mobile number <span className="text-plum">*</span></label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" onBlur={onBlur} onInput={onInput} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} />
                {errors.phone && <p id="phone-err" role="alert" className="mt-1.5 text-sm text-[#b42318]">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="shoot" className="mb-2 block text-sm font-semibold">Type of shoot</label>
                <select id="shoot" name="shoot" className="field">
                  {['Maternity shoot', 'Newborn shoot', 'Baby / toddler shoot', 'Pre-birthday / cake smash', 'Family portraits', 'Model shoot', 'Studio & props rental', 'Event coverage'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="studio" className="mb-2 block text-sm font-semibold">Preferred studio</label>
                <select id="studio" name="studio" className="field">
                  <option value="vidyaranyapura">Vidyaranyapura</option>
                  <option value="vijaynagar">Vijaynagar</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="date" className="mb-2 block text-sm font-semibold">Preferred date</label>
                <input id="date" name="date" type="date" className="field" />
                <p className="mt-1.5 text-xs text-muted">For newborn shoots, the first two weeks after birth are ideal — tell us your due date in the message.</p>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">Anything else?</label>
                <textarea id="message" name="message" rows="3" className="field resize-none" placeholder="Themes you love, baby’s age, number of people…" />
              </div>
              <div className="sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold">Inspiration photo <span className="font-normal text-muted">(optional)</span></span>
                <label
                  onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) setFile(f) }}
                  className={`flex min-h-[88px] cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 text-sm transition-colors ${drag ? 'border-plum bg-plum-soft' : 'border-line bg-ivory hover:border-plum/40'}`}
                >
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  <Upload className="h-5 w-5 text-plum" />
                  <span className="text-muted">{file ? <b className="text-ink">{file.name}</b> : <>Drag a reference photo here or <u className="text-plum">browse</u></>}</span>
                </label>
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-70">
                  {status === 'sending' ? <><Loader2 className="h-5 w-5 animate-spin" /> Preparing your request…</> : <>Request my slot <ArrowRight className="h-4 w-4" /></>}
                </button>
                <p className="mt-3 text-center text-xs text-muted">We only use your number to reply to this request.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 12 · Footer ─────────────────────────── */

function Footer() {
  return (
    <footer className="bg-ink text-ivory/80">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">Studio with a variety of props & backdrops. Exclusive studio for maternity, newborn, toddler and first-year shoots in Bangalore. Est. 2025.</p>
          <div className="mt-6 flex gap-2">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 hover:bg-ivory/10"><InstagramIcon className="h-5 w-5" /></a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 hover:bg-ivory/10"><FacebookIcon className="h-5 w-5" /></a>
            <a href={WA_DEFAULT} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-ivory/15 hover:bg-ivory/10"><WhatsAppIcon className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-gold">Shoots</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {['Maternity', 'Newborn', 'Toddler & 1st year', 'Pre-birthday', 'Family portraits', 'Studio rental'].map((s) => <li key={s}><a href="#services" className="hover:text-ivory">{s}</a></li>)}
          </ul>
        </div>
        {STUDIOS.map((s) => (
          <div key={s.key}>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-gold">{s.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-ivory/65">{s.address}</p>
            <a href={`tel:${PHONES[s.key].tel}`} className="mt-3 inline-block text-sm font-semibold text-ivory hover:text-gold">{PHONES[s.key].label}</a>
          </div>
        ))}
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Vishu Props Studio, Bangalore. All rights reserved.</p>
          <p className="flex items-center gap-2"><span className="status-dot h-2 w-2 rounded-full bg-[#2fbf71]" /> Taking bookings · open until 8:30 pm</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────── App ─────────────────────────── */

export default function App() {
  useLayoutEffect(() => {
    if (prefersReduced()) return
    const els = gsap.utils.toArray('[data-reveal]')
    gsap.set(els, { opacity: 0, y: 28 })
    const triggers = ScrollTrigger.batch(els, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07, overwrite: true }),
    })
    return () => { triggers.forEach((t) => t.kill()); gsap.set(els, { clearProps: 'all' }) }
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-plum focus:px-5 focus:py-3 focus:text-ivory">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <Services />
        <Gallery />
        <Studios />
        <Reviews />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
      {/* floating WhatsApp for mobile */}
      <a href={WA_DEFAULT} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-lift transition-transform active:scale-95 lg:hidden">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  )
}
