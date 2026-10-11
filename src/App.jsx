import { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Menu, X, Star, Phone, MapPin, Clock, ArrowRight, ArrowUpRight, Baby, Heart, Users, Camera,
  Cake, Sparkles, Building2, Gift, ChevronLeft, ChevronRight, Shirt, CalendarCheck, Images,
  Wallet, Video, BookOpen, Palette, ShieldCheck, Upload, Check, Loader2, Navigation, Quote,
  Play, Pause, Volume2, VolumeX,
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
// Booking form — paste the Google Form share link here. While empty, the booking card falls back to WhatsApp.
const GOOGLE_FORM_URL = ''

const INSTAGRAM = 'https://www.instagram.com/vishupropsstudio/'
const FACEBOOK = 'https://www.facebook.com/p/Vishu-Prop-Studio-61563375611543/'
const WA_DEFAULT = `https://wa.me/${PHONES.vidyaranyapura.wa}?text=${encodeURIComponent('Hi Vishu Props Studio, I would like to book a photoshoot.')}`

const NAV = [
  { href: '#tour', label: 'Studio tour' },
  { href: '#services', label: 'Services' },
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

let scrollLocks = 0
function lockScroll() { if (scrollLocks++ === 0) document.body.style.overflow = 'hidden' }
function unlockScroll() { if (--scrollLocks <= 0) { scrollLocks = 0; document.body.style.overflow = '' } }

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
      <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-ice-light text-white shadow-soft">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path d="M20 6a11 11 0 1 0 6 19.6A9 9 0 0 1 20 6z" fill="currentColor" />
          <path d="M23 8l.9 2.1 2.1.9-2.1.9L23 14l-.9-2.1-2.1-.9 2.1-.9z" fill="#2F739C" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.05rem] font-bold tracking-tight transition-colors duration-300 ${light ? 'text-white' : 'text-ink'}`}>Vishu Props</span>
        <span className={`mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.28em] transition-colors duration-300 ${light ? 'text-white/75' : 'text-gold-deep'}`}>Studio · Bangalore</span>
      </span>
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    lockScroll()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => { unlockScroll(); window.removeEventListener('keydown', onKey) }
  }, [open])

  // Over the photo hero the bar is transparent with light text; it becomes frosted cream once scrolled
  const onDark = !scrolled
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-3 pr-2 transition-all duration-300 ${scrolled ? 'glass shadow-soft' : 'border border-transparent'}`}
      >
        <Logo light={onDark} />
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`rounded-full px-4 py-2.5 text-[0.92rem] font-medium transition-colors ${onDark ? 'text-white/90 hover:bg-white/15 hover:text-white' : 'text-ink/80 hover:bg-ice-soft hover:text-ice'}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={`tel:${PHONES.vidyaranyapura.tel}`} className={`hidden items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium md:inline-flex ${onDark ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-ice'}`}>
            <Phone className="h-4 w-4" /> {PHONES.vidyaranyapura.label}
          </a>
          <a href="#book" className={`btn hidden !min-h-[44px] !px-5 text-sm sm:inline-flex ${onDark ? 'bg-white text-ink shadow-soft hover:bg-ice-soft' : 'btn-primary'}`}>Book a shoot</a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`grid h-11 w-11 place-items-center rounded-full border lg:hidden ${onDark ? 'border-white/30 bg-white/10 text-white' : 'border-line bg-white/80 text-ink'}`}
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
                <a onClick={() => setOpen(false)} href={n.href} className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-semibold tracking-tight hover:bg-ice-soft">
                  {n.label} <ArrowRight className="h-5 w-5 text-ice" />
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

/* ─────────────────────────── 2 · Hero (full-bleed sliding background) ─────────────────────────── */

const HERO_SLIDES = [
  { id: 147, pos: '70% 45%', label: 'Maternity', alt: 'Expecting mother in a lime tulle gown in the boho bedroom set' },
  { id: 196, pos: '78% 50%', label: 'Newborn', alt: 'Newborn asleep on a glowing crescent moon above the clouds' },
  { id: 123, pos: '62% 45%', label: 'Maternity', alt: 'Expecting mother in a blush gown beneath a floral arch' },
  { id: 75, pos: '68% 50%', label: 'First birthday', alt: 'Baby girl in a pink tutu on a first-birthday set' },
  { id: 87, pos: '62% 40%', label: 'Maternity', alt: 'Mother in a red gown with a dramatic flowing trail' },
  { id: 168, pos: '60% 45%', label: 'Family', alt: 'Family in traditional dress in the boho bedroom set' },
  { id: 65, pos: '58% 50%', label: 'Baby', alt: 'Laughing baby in a milk bath with oranges and leaves' },
]
const SLIDE_MS = 6000

function Hero() {
  const root = useRef(null)
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useMemo(prefersReduced, [])
  const n = HERO_SLIDES.length
  const go = useCallback((d) => setIdx((i) => (i + d + n) % n), [n])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(1), SLIDE_MS)
    return () => clearTimeout(t)
  }, [idx, paused, go])
  useEffect(() => { new Image().src = img(HERO_SLIDES[(idx + 1) % n].id) }, [idx, n])

  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from('.h-anim', { y: 34, opacity: 0, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.15 })
      gsap.to('.h-content', {
        yPercent: -14, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // swipe between slides on touch
  const touch = useRef(null)
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
    touch.current = null
  }

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#18354D] pb-24 pt-32 sm:items-center sm:pb-28"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured photoshoots"
    >
      {/* slides */}
      <div className="absolute inset-0" aria-live="off">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
            style={{ opacity: i === idx ? 1 : 0 }}
            aria-hidden={i !== idx}
          >
            <img
              key={i === idx ? `on-${idx}` : 'off'}
              src={img(s.id)}
              alt={s.alt}
              className={`h-full w-full object-cover ${i === idx && !reduced ? 'kb' : ''}`}
              style={{ objectPosition: s.pos }}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable="false"
            />
          </div>
        ))}
      </div>
      {/* legibility washes: deep ice-navy from the left, soft cream fade into the page below */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#18354D]/85 via-[#18354D]/45 to-[#18354D]/25 sm:bg-gradient-to-r sm:from-[#18354D]/80 sm:via-[#18354D]/45 sm:to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#18354D]/50 to-transparent" />

      {/* floating sparkles, top-right */}
      <div aria-hidden="true" className="pointer-events-none absolute right-6 top-28 hidden h-40 w-56 sm:block">
        {[[10, 20, 14, 0], [70, 8, 10, 0.8], [130, 40, 18, 1.6], [180, 4, 9, 0.4], [96, 80, 12, 2.1], [40, 110, 8, 1.2]].map(([x, y, s, d], i) => (
          <Sparkle key={i} className={`twinkle absolute ${i % 2 ? 'text-white/70' : 'text-ice-mist'}`} style={{ left: x, top: y, width: s, height: s, '--delay': `${d}s`, '--dur': `${2.6 + i * 0.4}s` }} />
        ))}
      </div>

      <div className="h-content container-x relative">
        <div className="max-w-2xl">
          <p className="h-anim inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span className="status-dot h-2 w-2 rounded-full bg-[#4ade80]" /> Maternity · Newborn · Toddler · Family
          </p>
          <h1 className="h-anim display-xl mt-6 !text-white" style={{ textShadow: '0 2px 30px rgba(15,28,39,.35)' }}>
            Little moments,<br /><span className="font-serif font-medium italic text-ice-light">styled to last.</span>
          </h1>
          <p className="h-anim mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            An exclusive Bangalore studio with 150+ themes across 2,500 sq ft, and costumes for every set. One place for maternity, newborn, toddler and family shoots.
          </p>
          <div className="h-anim mt-9 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <a href="#book" className="btn w-full bg-white text-ink shadow-lift hover:bg-ice-soft sm:w-auto">
                Book your shoot <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <a href="#services" className="btn border border-white/35 bg-white/10 text-white backdrop-blur-md hover:bg-white/20">
              <Images className="h-4 w-4" /> Explore our services
            </a>
          </div>
          <div className="h-anim mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-white">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold tracking-tight">5.0</span>
              <span className="text-sm leading-tight text-white/80"><Stars className="h-3.5 w-3.5" /><br />444 ratings · Justdial</span>
            </div>
            <span className="hidden h-10 w-px bg-white/25 sm:block" />
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold tracking-tight">4.9</span>
              <span className="text-sm leading-tight text-white/80"><Stars className="h-3.5 w-3.5" /><br />70 Google reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* slide controls */}
      <div className="absolute inset-x-0 bottom-6 z-10">
        <div className="container-x flex items-center justify-between gap-4 pr-20 sm:pr-6 lg:pr-8">
          <p className="hidden font-mono text-xs uppercase tracking-[0.2em] text-white/80 sm:block">
            <span className="text-white">{String(idx + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')} · {HERO_SLIDES[idx].label}
          </p>
          <div className="flex flex-1 items-center gap-1.5 sm:max-w-sm" role="tablist" aria-label="Choose slide">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === idx}
                aria-label={`Slide ${i + 1}: ${s.label}`}
                onClick={() => setIdx(i)}
                className="group relative flex h-11 flex-1 items-center"
              >
                <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-white/30">
                  {i < idx && <span className="absolute inset-0 bg-white" />}
                  {i === idx && (
                    <span
                      key={`p-${idx}-${paused}`}
                      className={`absolute inset-0 origin-left bg-white ${paused || reduced ? '' : 'progress-run'}`}
                      style={{ '--dur': `${SLIDE_MS}ms`, transform: paused || reduced ? 'scaleX(1)' : undefined }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} className="hidden sm:grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/25" aria-label="Previous slide"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => setPaused((p) => !p)} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/25" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button type="button" onClick={() => go(1)} className="hidden sm:grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/25" aria-label="Next slide"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── Studio tour video ─────────────────────────── */

function StudioVideo() {
  const wrap = useRef(null)
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  // autoplay (muted) while on screen, pause when scrolled away
  useEffect(() => {
    const v = video.current
    if (!v || prefersReduced()) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.45 })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = video.current
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }
  const toggleMute = () => {
    const v = video.current
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted && v.paused) v.play().catch(() => {})
  }

  return (
    <div ref={wrap} className="relative mt-12 overflow-hidden rounded-4xl bg-ice-mist shadow-lift" data-reveal>
      <video
        ref={video}
        className="aspect-video w-full object-cover"
        src="/video/studio-tour.mp4"
        poster="/video/studio-tour-poster.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Video tour of the Vishu Props Studio sets"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#18354D]/75 to-transparent" />
      {!playing && (
        <button type="button" onClick={toggle} className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ice-light text-ink shadow-lift transition-transform hover:scale-105 active:scale-95" aria-label="Play studio tour">
          <Play className="ml-1 h-8 w-8" fill="currentColor" />
        </button>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
        <div className="text-white">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ice-light">Studio tour · 1 min</p>
          <p className="mt-1.5 font-display text-xl font-bold tracking-tight sm:text-3xl">Step inside Vishu Props Studio</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={toggle} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md hover:bg-white/30" aria-label={playing ? 'Pause video' : 'Play video'}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button type="button" onClick={toggleMute} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md hover:bg-white/30" aria-label={muted ? 'Turn sound on' : 'Mute'}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
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
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ice-soft text-ice"><Palette className="h-5 w-5" /></span>
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
    { x: 46, d: 1.1, dur: 3.0, fall: 102, s: 10, c: 'text-ice/60' },
    { x: 62, d: 2.0, dur: 3.6, fall: 96, s: 16, c: 'text-gold' },
    { x: 38, d: 2.7, dur: 3.2, fall: 112, s: 9, c: 'text-[#CDE4F2]' },
    { x: 55, d: 0.6, dur: 3.8, fall: 100, s: 12, c: 'text-[#CDE4F2]' },
  ]
  return (
    <div className="card flex h-full flex-col overflow-hidden p-6 sm:p-7" data-reveal>
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold-soft text-gold-deep"><Baby className="h-5 w-5" /></span>
        <span className="font-mono text-xs text-muted">Newborn care</span>
      </div>
      <h3 className="mt-5 text-xl font-bold tracking-tight">Gentle with the littlest ones</h3>
      <p className="mt-2 text-[0.95rem] text-muted">Patient photographers, a homely studio and babies handled with great care and love.</p>
      <div className="relative mt-6 h-64 overflow-hidden rounded-3xl bg-gradient-to-b from-[#3F7FA8] via-[#7DB6DB] to-[#D6ECF8]" aria-hidden="true">
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
              <stop offset="0" stopColor="#FFF9EC" /><stop offset="1" stopColor="#E3D3B1" />
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
        .set('.day-5', { backgroundColor: '#FCFAF5', color: '#1B2733' })
        .set('.slot-btn', { backgroundColor: '#ECE5D7', color: '#57636F' })
        .to('.cursor', { opacity: 1, duration: 0.3 })
        .to('.cursor', { x: () => root.current.querySelector('.day-5').offsetLeft + 14, y: () => root.current.querySelector('.day-5').offsetTop + 14, duration: 1, ease: 'power2.inOut' })
        .to('.cursor', { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.day-5', { backgroundColor: '#B9DDF2', color: '#1D2B38', duration: 0.2 }, '<')
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
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ice-soft text-ice"><CalendarCheck className="h-5 w-5" /></span>
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
        <svg className="cursor pointer-events-none absolute left-0 top-0 h-6 w-6 opacity-0 drop-shadow" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#1B2733" stroke="#fff" strokeWidth="1.4" /></svg>
      </div>
    </div>
  )
}

function Features() {
  return (
    <section id="tour" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="Why families choose us" title="A studio built around" flourish="your story." text="Many customers praise our wide variety of themes and props, a friendly and patient team, and a spacious, hygienic studio. Take a quick tour of the sets." />
        <StudioVideo />
        <div id="themes" className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-none tracking-[-0.04em] text-ice">
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

/* ─────────────────────────── 4b · Services showcase (5 core services) ─────────────────────────── */

const SHOWCASE = [
  {
    key: 'maternity',
    cat: 'maternity',
    icon: Heart,
    kicker: 'For the bump',
    title: 'Maternity',
    lead: 'Celebrate the last weeks before you meet your little one — in flowing gowns, graceful sarees and sets made for this moment.',
    body: 'Choose solo, couple or family maternity portraits. Pick from our wardrobe of tulle gowns and trail dresses, or go traditional with themes like the much-loved Ravi Varma set. Our photographers guide every pose, so you can relax and simply enjoy it.',
    points: ['Wardrobe of maternity gowns', 'Solo, couple & family portraits', 'Ravi Varma & traditional themes', 'Makeup artist available'],
    imgs: [123, 203, 32, 13, 141],
  },
  {
    key: 'newborn',
    cat: 'newborn',
    icon: Baby,
    kicker: 'The first few weeks',
    title: 'New Born',
    lead: 'Tiny fingers, sleepy yawns and dreamy little worlds — moons, nests, boats and flower beds sized just for your baby.',
    body: 'Newborn sessions are calm and unhurried. We work at your baby’s pace in a warm, homely studio, and parents tell us their little ones are handled with great care and love. Wraps, headbands and props are all ready on set.',
    points: ['Wraps, nests & dreamy props', 'Calm, homely studio', 'Gentle, patient handling', 'Parents can join the frame'],
    imgs: [217, 169, 40, 89, 235],
  },
  {
    key: 'toddler',
    cat: 'baby',
    icon: Sparkles,
    kicker: 'Six months to two years',
    title: 'Toddler Shoot',
    lead: 'From half-birthdays to the big “One” and “Two” — playful sets, cake smashes and costumes for every little personality.',
    body: 'Little Krishna, seaside sailor, vintage music room, milk baths and pastel first-birthday sets: families often shoot several themes in one visit, and suitable costumes are provided for each one. Perfect for pre-birthday invites and milestone albums.',
    points: ['Costumes for every theme', 'Cake smash & pre-birthday setups', 'Multiple themes in one session', 'Toys & props kids love'],
    imgs: [22, 7, 26, 65, 154],
  },
  {
    key: 'family',
    cat: 'family',
    icon: Users,
    kicker: 'Everyone together',
    title: 'Family',
    lead: 'Parents, grandparents, siblings and the newest member — portraits the whole family will want framed.',
    body: 'Gather everyone on the royal throne set, the vintage window or our light-filled boho bedroom. We arrange natural groupings for families of every size, and capture the candid moments in between.',
    points: ['Sets for big & small groups', 'Grandparents & siblings welcome', 'Couple portraits too', 'Coordinated, relaxed posing'],
    imgs: [168, 101, 0, 24, 204],
  },
  {
    key: 'rental',
    cat: 'studio',
    icon: Building2,
    kicker: 'For photographers',
    title: 'Studio Rental',
    lead: 'Rent our 2,500 sq ft studio space and props — 150+ ready themes, backdrops and furniture for your own shoots.',
    body: 'Ideal for photographers, model and fashion shoots, and content creators. Bring your crew and use our sets, from the green parlour and royal white room to the boho bedroom and the full prop store.',
    points: ['2,500 sq ft of studio space', '150+ themes & backdrops', 'Ideal for model & fashion shoots', 'Two locations in Bangalore'],
    imgs: [304, 308, 292, 299, 285],
  },
]

const catItems = (cat) => GALLERY.filter((g) => g.cat === cat)

function ServicesShowcase({ onOpenGallery, onOpenPhoto }) {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="Our services" title="Shoots we" flourish="specialise in." text="Five ways to tell your story at Vishu Props Studio. Tap any photo to view it full screen, or open the complete gallery for each service." />

        {/* quick jump */}
        <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" data-reveal>
          {SHOWCASE.map((s) => (
            <a key={s.key} href={`#svc-${s.key}`} className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-line bg-ivory px-4 text-sm font-medium hover:border-ice/40 hover:bg-ice-soft">
              <s.icon className="h-4 w-4 text-ice" /> {s.title}
            </a>
          ))}
        </div>

        <div className="mt-16 space-y-24 sm:space-y-32">
          {SHOWCASE.map((s, i) => {
            const items = catItems(s.cat)
            const flip = i % 2 === 1
            return (
              <article key={s.key} id={`svc-${s.key}`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div className={flip ? 'lg:order-2' : ''} data-reveal>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-12 bg-line" />
                    <span className="label">{s.kicker}</span>
                  </div>
                  <h3 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-5 text-xl leading-relaxed text-ink/85">{s.lead}</p>
                  <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[0.95rem]">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ice-soft text-ice"><Check className="h-3 w-3" strokeWidth={3} /></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={() => onOpenGallery(s)} className="btn btn-primary">
                      <Images className="h-4 w-4" /> View full gallery <span className="font-mono text-xs opacity-75">({items.length})</span>
                    </button>
                    <a
                      href={`https://wa.me/${PHONES.vidyaranyapura.wa}?text=${encodeURIComponent(`Hi Vishu Props Studio, I'd like to know more about your ${s.title.toLowerCase()} ${s.key === 'rental' ? '' : 'shoot '}packages.`)}`}
                      target="_blank" rel="noreferrer" className="btn btn-ghost"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-[#1f9d55]" /> Enquire
                    </a>
                  </div>
                </div>

                {/* photo mosaic */}
                <div className={`grid grid-cols-2 gap-3 sm:h-[440px] sm:grid-cols-4 sm:grid-rows-2 sm:gap-4 lg:h-[500px] ${flip ? 'lg:order-1' : ''}`}>
                  {s.imgs.map((id, j) => {
                    const at = items.findIndex((g) => g.id === id)
                    const last = j === s.imgs.length - 1
                    return (
                      <RevealTile
                        key={id}
                        as="button"
                        delay={j * 90}
                        onClick={() => (last ? onOpenGallery(s) : onOpenPhoto(items, Math.max(0, at)))}
                        className={`group relative overflow-hidden rounded-3xl bg-blush ${last ? 'cursor-pointer' : 'cursor-zoom-in'} ${j === 0 ? 'col-span-2 aspect-[16/11] sm:row-span-2 sm:aspect-auto' : 'aspect-square sm:aspect-auto'}`}
                        aria-label={last ? `View all ${items.length} ${s.title} photos` : `View ${s.title} photo ${j + 1}`}
                      >
                        <img src={img(id, j === 0 ? 'full' : 'thumb')} alt="" loading="lazy" className="reveal-img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                        {last && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 flex flex-col items-center justify-center bg-ink/45 text-white backdrop-blur-[2px] transition-colors group-hover:bg-ink/55"
                          >
                            <span className="font-display text-2xl font-bold">+{items.length - 4}</span>
                            <span className="font-mono text-[0.65rem] uppercase tracking-widest">View all</span>
                          </span>
                        )}
                      </RevealTile>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* Full-screen gallery for one service: the whole collection as a grid; tap a photo for the viewer */
function ServiceGallery({ svc, onClose }) {
  const items = useMemo(() => catItems(svc.cat), [svc])
  const [open, setOpen] = useState(null)
  const scroller = useRef(null)
  const closeRef = useRef(null)
  const openRef = useRef(open)
  openRef.current = open

  useEffect(() => {
    const prev = document.activeElement
    lockScroll()
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape' && openRef.current === null) onClose() }
    window.addEventListener('keydown', onKey)
    return () => { unlockScroll(); window.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [onClose])

  return (
    <div className="sheet-in fixed inset-0 z-[90] flex flex-col bg-ivory" role="dialog" aria-modal="true" aria-label={`${svc.title} gallery`}>
      <header className="glass z-10 border-b border-line">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button ref={closeRef} type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-white hover:bg-ice-soft" aria-label="Close gallery">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gold-deep">Gallery · {items.length} photos</p>
              <h2 className="truncate font-display text-xl font-bold tracking-tight sm:text-2xl">{svc.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${PHONES.vidyaranyapura.wa}?text=${encodeURIComponent(`Hi Vishu Props Studio, I saw your ${svc.title.toLowerCase()} gallery and would like to book.`)}`}
              target="_blank" rel="noreferrer" className="btn btn-primary hidden !min-h-[44px] !px-5 text-sm sm:inline-flex"
            >
              Book this shoot
            </a>
            <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white hover:bg-ice-soft" aria-label="Close gallery"><X className="h-5 w-5" /></button>
          </div>
        </div>
      </header>
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="container-x py-8 sm:py-10">
          <p className="max-w-2xl text-muted">{svc.lead}</p>
          <div className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
            {items.map((g, i) => (
              <RevealTile
                key={g.src}
                as="button"
                root={scroller}
                delay={(i % 4) * 70}
                onClick={() => setOpen(i)}
                className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-blush sm:mb-4"
                style={{ aspectRatio: `${g.w} / ${g.h}` }}
                aria-label={`Open ${svc.title} photo ${i + 1} of ${items.length}`}
              >
                <img src={`/img/thumb/${g.src}`} alt="" loading="lazy" decoding="async" className="reveal-img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              </RevealTile>
            ))}
          </div>
        </div>
      </div>
      {open !== null && <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} title={svc.title} />}
    </div>
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
      const STICKY_TOP = 110
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        // Only recede once the next card actually starts to cover this one (its top crosses this card's
        // pinned bottom edge) — never while the current step is still fully visible and being read.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: next,
            start: () => `top ${Math.min(window.innerHeight, STICKY_TOP + card.offsetHeight)}px`,
            end: `top ${STICKY_TOP}px`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        tl.to(card, { scale: 0.95, ease: 'none', duration: 1 }, 0)
          // fade + blur land only in the second half, once the card is mostly covered
          .fromTo(card, { opacity: 1, filter: 'blur(0px)' }, { opacity: 0.55, filter: 'blur(5px)', ease: 'power1.in', duration: 0.55 }, 0.45)
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
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ice-soft text-ice"><s.icon className="h-5 w-5" /></span>
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

/* ─────────────────────────── 6 · More services + event prices ─────────────────────────── */

const MORE = [
  { icon: Cake, title: 'Pre-Birthday & Cake Smash', text: '“One”, “Two” and half-birthday setups with balloons, cakes and toys — ready before the party.', img: 154 },
  { icon: Camera, title: 'Model & Fashion Shoot', text: 'Portfolio and fashion shoots using our backdrops, lighting and 2,500 sq ft of set space.', img: 87 },
  { icon: Gift, title: 'Event Coverage', text: 'Wedding, engagement and birthday photography, with albums and videography.', img: 316 },
]

function MoreServices() {
  return (
    <section id="more" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead label="Also at Vishu" title="More ways to" flourish="celebrate." text="Milestone parties, portfolios and the big days — we cover those too. Ask us for packages." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-4xl border border-line bg-line md:grid-cols-3" data-reveal>
          {MORE.map((s) => (
            <article key={s.title} className="group flex flex-col bg-white">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={img(s.img, 'thumb')} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ice-soft text-ice transition-colors group-hover:bg-ice-light group-hover:text-ink"><s.icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 7 · Gallery, scroll reveals + viewer ─────────────────────────── */

/* Fades, lifts and un-blurs a tile the first time it scrolls into view */
function RevealTile({ as: Tag = 'div', delay = 0, root, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(prefersReduced)
  useEffect(() => {
    if (inView) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { root: root?.current ?? null, rootMargin: '0px 0px -6% 0px', threshold: 0.1 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [inView, root])
  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? 'button' : undefined}
      className={`reveal-tile ${inView ? 'is-in' : ''} ${className}`}
      style={{ ...style, '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function Lightbox({ items, index, onClose, onIndex, title }) {
  const item = items[index]
  const closeRef = useRef(null)
  const stage = useRef(null)
  const strip = useRef(null)
  const drag = useRef(null)
  const [dx, setDx] = useState(0)

  const go = useCallback((dir) => onIndex((index + dir + items.length) % items.length), [index, items.length, onIndex])

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    lockScroll()
    return () => { unlockScroll(); prev?.focus?.() }
  }, [])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose() }
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])
  // preload neighbours + keep the active thumbnail centred
  useEffect(() => {
    ;[1, -1].forEach((d) => { const n = items[(index + d + items.length) % items.length]; if (n) new Image().src = `/img/full/${n.src}` })
    strip.current?.querySelector(`[data-i="${index}"]`)?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: prefersReduced() ? 'auto' : 'smooth' })
  }, [index, items])

  // 1:1 swipe; commit using projected momentum, not just distance
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
  const cat = title || CATS.find((c) => c.key === item.cat)?.label
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#14222E]/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <div className="flex items-center justify-between p-3 text-white sm:p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-white/75">{cat} · <span className="text-white">{index + 1}</span> / {items.length}</p>
        <button ref={closeRef} type="button" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close viewer"><X className="h-5 w-5" /></button>
      </div>
      <div
        ref={stage}
        className="relative flex min-h-0 flex-1 touch-pan-y select-none items-center justify-center px-2 sm:px-20"
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <img
          key={item.src}
          src={`/img/full/${item.src}`}
          alt={`Vishu Props Studio — ${cat} photo ${index + 1}`}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          style={{ transform: `translateX(${dx}px)`, transition: dx ? 'none' : 'transform 380ms cubic-bezier(.32,.72,0,1)', animation: 'star-fadein 260ms ease-out' }}
          draggable="false"
        />
        <button type="button" onClick={() => go(-1)} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid" aria-label="Previous photo"><ChevronLeft className="h-6 w-6" /></button>
        <button type="button" onClick={() => go(1)} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid" aria-label="Next photo"><ChevronRight className="h-6 w-6" /></button>
      </div>
      {/* thumbnail strip */}
      <div ref={strip} className="no-scrollbar overflow-x-auto px-4 py-4 sm:py-5" aria-label="Thumbnails">
        <div className="mx-auto flex w-max gap-2">
        {items.map((g, i) => (
          <button
            key={g.src}
            data-i={i}
            type="button"
            onClick={() => onIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200 sm:h-16 sm:w-16 ${i === index ? 'opacity-100 ring-2 ring-ice-light ring-offset-2 ring-offset-[#14222E]' : 'opacity-45 hover:opacity-80'}`}
          >
            <img src={`/img/thumb/${g.src}`} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
        </div>
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
              className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors ${cat === c.key ? 'border-ice-glow bg-ice-light text-ink' : 'border-line bg-white text-ink hover:border-ice-glow hover:bg-ice-soft'}`}
            >
              {c.label} <span className={`font-mono text-[0.7rem] ${cat === c.key ? 'text-ink/60' : 'text-muted'}`}>{counts[c.key]}</span>
            </button>
          ))}
        </div>

        <div key={cat} className="mt-8 columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {visible.map((g, i) => (
            <RevealTile
              key={g.src}
              as="button"
              delay={(i % 4) * 80}
              onClick={() => setOpen(i)}
              className="group relative mb-3 block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-blush sm:mb-4"
              style={{ aspectRatio: `${g.w} / ${g.h}` }}
              aria-label={`Open ${CATS.find((c) => c.key === g.cat)?.label} photo ${i + 1}`}
            >
              <img src={`/img/thumb/${g.src}`} alt="" loading="lazy" decoding="async" width={g.w} height={g.h} className="reveal-img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
              <span className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/10" />
            </RevealTile>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Showing {visible.length} of {items.length}</p>
          {shown < items.length && (
            <button type="button" onClick={() => setShown((s) => s + PAGE)} className="btn btn-ghost">Show more photos</button>
          )}
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ice hover:underline">
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
                    <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" /><a href={`tel:${p.tel}`} className="font-medium hover:text-ice">{p.label}</a></li>
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
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ice-soft font-display font-bold text-ice">{r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
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
  const hasForm = Boolean(GOOGLE_FORM_URL)
  const steps = [
    ['Tell us about your shoot', 'Maternity, newborn, toddler, family or studio rental — plus your preferred studio and date.'],
    ['We call you back', 'Our team confirms availability, themes and packages for your session.'],
    ['Lock in your slot', 'Reserve your date and get ready for a fully styled shoot day.'],
  ]
  return (
    <section id="book" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-ice-soft blur-3xl" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead label="Book a shoot" title="Let’s plan your" flourish="session." text="Fill in our short booking form and we’ll get back to you with themes, availability and packages. Prefer to talk? Call or WhatsApp either studio." />
          <div className="mt-10 space-y-4" data-reveal>
            {[['Vidyaranyapura', PHONES.vidyaranyapura], ['Vijaynagar', PHONES.vijaynagar]].map(([n, p]) => (
              <div key={n} className="flex items-center justify-between gap-4 rounded-3xl border border-line bg-ivory p-5">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-widest text-gold-deep">{n}</p>
                  <a href={`tel:${p.tel}`} className="mt-1 block font-display text-xl font-bold tracking-tight hover:text-ice">{p.label}</a>
                </div>
                <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-[#1f9d55] text-white shadow-soft" aria-label={`WhatsApp the ${n} studio`}><WhatsAppIcon className="h-6 w-6" /></a>
              </div>
            ))}
            <p className="text-sm text-muted">Model shoots & studio rental: <a href={`tel:${PHONES.general.tel}`} className="font-semibold text-ink hover:text-ice">{PHONES.general.label}</a></p>
          </div>
        </div>

        <div className="card relative overflow-hidden p-7 sm:p-10" data-reveal>
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ice-light/50 blur-2xl" />
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-ice-light text-ink"><CalendarCheck className="h-6 w-6" /></span>
          <h3 className="relative mt-6 text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight tracking-[-0.025em]">Booking takes about a minute</h3>
          <p className="relative mt-3 max-w-md text-muted">Share your details in our booking form — no account needed. We’ll reach out to confirm everything.</p>
          <ol className="relative mt-8 space-y-5">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ice-mist bg-ice-soft font-mono text-sm text-ice">{i + 1}</span>
                <div>
                  <p className="font-display font-semibold">{t}</p>
                  <p className="text-[0.95rem] text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
            {hasForm ? (
              <a href={GOOGLE_FORM_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
                Open booking form <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn btn-primary">
                <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
              </a>
            )}
            <a href={`tel:${PHONES.vidyaranyapura.tel}`} className="btn btn-ghost"><Phone className="h-4 w-4" /> Call {PHONES.vidyaranyapura.label}</a>
          </div>
          <p className="relative mt-4 text-xs text-muted">{hasForm ? 'Opens Google Forms in a new tab.' : 'Online booking form coming soon.'}</p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 12 · Footer ─────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-ice-mist bg-ice-soft text-ink/80">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">Studio with a variety of props & backdrops. Exclusive studio for maternity, newborn, toddler and first-year shoots in Bangalore. Est. 2025.</p>
          <div className="mt-6 flex gap-2">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-ice-mist bg-white text-ice hover:bg-ice-light hover:text-ink"><InstagramIcon className="h-5 w-5" /></a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-ice-mist bg-white text-ice hover:bg-ice-light hover:text-ink"><FacebookIcon className="h-5 w-5" /></a>
            <a href={WA_DEFAULT} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-ice-mist bg-white text-ice hover:bg-ice-light hover:text-ink"><WhatsAppIcon className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-ice">Shoots</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[['Maternity', 'maternity'], ['New Born', 'newborn'], ['Toddler shoot', 'toddler'], ['Family', 'family'], ['Studio rental', 'rental']].map(([s, k]) => <li key={s}><a href={`#svc-${k}`} className="hover:text-ice">{s}</a></li>)}
          </ul>
        </div>
        {STUDIOS.map((s) => (
          <div key={s.key}>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-ice">{s.name}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{s.address}</p>
            <a href={`tel:${PHONES[s.key].tel}`} className="mt-3 inline-block text-sm font-semibold text-ink hover:text-ice">{PHONES[s.key].label}</a>
          </div>
        ))}
      </div>
      <div className="border-t border-ice-mist bg-white/60">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
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

  const [svcGallery, setSvcGallery] = useState(null)
  const [photo, setPhoto] = useState(null) // { items, index } for photos opened straight from a service mosaic
  const closeSvcGallery = useCallback(() => setSvcGallery(null), [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ice-light focus:px-5 focus:py-3 focus:text-ink">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <Pillars />
        <ServicesShowcase onOpenGallery={setSvcGallery} onOpenPhoto={(items, index) => setPhoto({ items, index })} />
        <Protocol />
        <MoreServices />
        <Gallery />
        <Studios />
        <Reviews />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
      {svcGallery && <ServiceGallery svc={svcGallery} onClose={closeSvcGallery} />}
      {photo && <Lightbox items={photo.items} index={photo.index} onIndex={(i) => setPhoto((p) => ({ ...p, index: i }))} onClose={() => setPhoto(null)} />}
      {/* floating WhatsApp for mobile */}
      <a href={WA_DEFAULT} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#1f9d55] text-white shadow-lift transition-transform active:scale-95 lg:hidden">
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  )
}
