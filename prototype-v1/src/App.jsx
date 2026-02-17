import React, { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import IntelligenceEngine from './components/IntelligenceEngine'
import BayanihanMesh from './components/BayanihanMesh'
import Platforms from './components/Platforms'
import ImpactSDG from './components/ImpactSDG'
import Footer from './components/Footer'

// Features overview strip between Hero and Intelligence Engine
function FeaturesStrip() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = React.useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      number: '01',
      title: 'Instant SOS Reporting',
      description: 'One-tap emergency reporting with automatic GPS location, photo capture, and initial AI severity assessment for immediate response coordination.',
      tags: ['GPS Auto-Location', 'Photo Evidence', 'AI Scoring'],
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      number: '02',
      title: 'Grab-Style SOS Matching',
      description: 'Citizens broadcast their emergency location while nearby rescuers can self-assign to incidents, creating efficient response coordination like ride-hailing for rescue.',
      tags: ['Location Broadcast', 'Self-Assignment', 'Real-Time Matching'],
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
          <polyline points="7.5,4.21 12,6.81 16.5,4.21" />
          <polyline points="7.5,19.79 7.5,14.6 3,12" />
          <polyline points="21,12 16.5,14.6 16.5,19.79" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      number: '03',
      title: 'Smart Resource Allocation',
      description: 'AI-driven assignment of rescue teams, medical supplies, and evacuation resources based on real-time demand, proximity analysis, and availability.',
      tags: ['Dynamic Tracking', 'Optimal Allocation', 'Real-Time Sync'],
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      number: '04',
      title: 'Multi-Agency Coordination',
      description: 'Unified command dashboard enabling seamless collaboration between fire departments, police, medical teams, LGUs, and NGO partners.',
      tags: ['Cross-Agency', 'Unified Command', 'Role-Based Access'],
    },
  ]

  return (
    <section
      ref={ref}
      className="section section--bordered"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-16)',
      }}
    >
      <div className="container">
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-12)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <div>
            <span className="eyebrow" style={{ marginBottom: 'var(--space-3)', display: 'inline-flex' }}>
              Powerful Features
            </span>
            <h2
              className="heading-2"
              style={{ marginTop: 'var(--space-3)' }}
            >
              Every Feature Designed{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                to Save Lives
              </span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.7,
              color: 'var(--text-tertiary)',
              maxWidth: '380px',
            }}
          >
            Smart, resilient, and reliable — built for resilience with cutting-edge
            mesh networking and AI-powered decision making.
          </p>
        </div>

        {/* Feature cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--border-light)',
            border: '1px solid var(--border-light)',
          }}
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.number}
              {...feature}
              isVisible={isVisible}
              delay={i * 120}
            />
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1100px) {
          .section--bordered .container > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .section--bordered .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// Individual feature card for the strip
function FeatureCard({ icon, number, title, description, tags, isVisible = false, delay = 0 }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? 'var(--bg-card)' : 'var(--bg-primary)',
        padding: 'var(--space-8)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `
          opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          background-color 300ms ease,
          box-shadow 300ms ease
        `,
        boxShadow: hovered ? 'inset 0 3px 0 var(--accent-orange)' : 'none',
      }}
    >
      {/* Large background number */}
      <span
        style={{
          position: 'absolute',
          top: '8px',
          right: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(40px, 4vw, 56px)',
          fontWeight: 800,
          lineHeight: 1,
          color: hovered ? 'rgba(255, 69, 0, 0.05)' : 'var(--bg-tertiary)',
          transition: 'color 300ms ease',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${hovered ? 'var(--border-orange)' : 'var(--border-light)'}`,
          backgroundColor: hovered ? 'var(--accent-orange-soft)' : 'var(--bg-secondary)',
          color: hovered ? 'var(--accent-orange)' : 'var(--text-secondary)',
          transition: 'all 300ms ease',
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(16px, 1.4vw, 20px)',
          lineHeight: 1.3,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          lineHeight: 1.7,
          color: 'var(--text-tertiary)',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginTop: 'var(--space-2)',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--border-lighter)',
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '2px 6px',
              border: `1px solid ${hovered ? 'var(--border-orange)' : 'var(--border-light)'}`,
              color: hovered ? 'var(--accent-orange)' : 'var(--text-muted)',
              backgroundColor: hovered ? 'var(--accent-orange-soft)' : 'transparent',
              transition: 'all 300ms ease',
              whiteSpace: 'nowrap',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// Resilience banner between sections — "Smart, Resilient, and Reliable"
function ResilienceBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = React.useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      icon: '📡',
      title: 'BLE Mesh Network',
      description: 'Device-to-device communication without infrastructure',
    },
    {
      icon: '🧠',
      title: 'AI Triage Engine',
      description: 'Machine learning for intelligent priority ranking',
    },
    {
      icon: '⚡',
      title: 'Smart Matching',
      description: 'Efficient rescuer-to-incident assignment system',
    },
  ]

  return (
    <section
      ref={ref}
      style={{
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
        backgroundColor: 'var(--bg-dark)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle scan lines */}
      <div className="scanline-overlay" />

      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left — Statement */}
        <div
          style={{
            backgroundColor: 'var(--bg-dark)',
            padding: 'var(--space-16) var(--space-10)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-5)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: 16, height: 1, backgroundColor: 'var(--accent-orange)' }} />
            Core Technology
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3vw, 44px)',
              lineHeight: 1.15,
              color: 'rgba(255, 255, 255, 0.95)',
              letterSpacing: '-0.02em',
            }}
          >
            Smart, Resilient,{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255, 255, 255, 0.5)' }}>
              and Reliable
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.45)',
              maxWidth: '440px',
            }}
          >
            Built for resilience with cutting-edge mesh networking and AI-powered
            decision making. When cellular towers fall and power grids fail, ResQLink
            keeps communities connected and coordinated.
          </p>
        </div>

        {/* Right — Three pillars */}
        <div
          style={{
            backgroundColor: 'var(--bg-dark)',
            padding: 'var(--space-12) var(--space-10)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-8)',
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 150}ms`,
                paddingBottom: i < pillars.length - 1 ? 'var(--space-8)' : 0,
                borderBottom: i < pillars.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  flexShrink: 0,
                  fontSize: '18px',
                }}
              >
                {pillar.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: 'rgba(255, 255, 255, 0.85)',
                  }}
                >
                  {pillar.title}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.35)',
                  }}
                >
                  {pillar.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .container[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

// Scroll progress indicator
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 999,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: 'var(--accent-orange)',
          transition: 'width 100ms linear',
          boxShadow: progress > 0 ? '0 0 8px rgba(255, 69, 0, 0.4)' : 'none',
        }}
      />
    </div>
  )
}

// Mission progress sidebar — shows current section
function MissionTracker() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sectionIds = ['hero', 'intelligence', 'mesh', 'platforms', 'impact']

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const sections = [
    { id: 'hero', label: 'Brief', number: '00' },
    { id: 'intelligence', label: 'Intel', number: '01' },
    { id: 'mesh', label: 'Mesh', number: '02' },
    { id: 'platforms', label: 'Tiers', number: '03' },
    { id: 'impact', label: 'Impact', number: '04' },
  ]

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            aria-label={`Navigate to ${section.label} section`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Label — only shows on active */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent-orange)' : 'transparent',
                transition: 'color 300ms ease',
                whiteSpace: 'nowrap',
              }}
            >
              {section.number} {section.label}
            </span>

            {/* Dot indicator */}
            <div
              style={{
                width: isActive ? 12 : 6,
                height: isActive ? 3 : 6,
                borderRadius: isActive ? '2px' : '50%',
                backgroundColor: isActive ? 'var(--accent-orange)' : 'var(--border-medium)',
                transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? '0 0 8px rgba(255, 69, 0, 0.4)' : 'none',
              }}
            />
          </button>
        )
      })}

      {/* Responsive — hide on mobile */}
      <style>{`
        @media (max-width: 1200px) {
          div[style*="position: fixed"][style*="right: 24px"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Small delay to ensure fonts are loaded before revealing content
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Skip to content — Accessibility */}
      <a href="#hero" className="skip-to-content">
        Skip to main content
      </a>

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Mission tracker sidebar */}
      <MissionTracker />

      {/* Fixed navigation */}
      <Navigation />

      {/* Main content — Mission Log scroll order */}
      <main id="main-content">
        {/*
          SECTION ORDER (Mission Log Flow):
          1. Hero — Value Proposition + Terrain Visualization
          2. Features Strip — Core capabilities overview
          3. Resilience Banner — Technology pillars
          4. Intelligence Engine — AI Triage deep-dive (Bento Grid)
          5. Bayanihan Mesh — BLE communication deep-dive
          6. Platforms — Three-tier coordination
          7. Impact & SDG — Measurable outcomes + CTA
        */}

        {/* 00 — MISSION BRIEFING */}
        <Hero />

        {/* FEATURES OVERVIEW STRIP */}
        <FeaturesStrip />

        {/* TECHNOLOGY PILLARS */}
        <ResilienceBanner />

        {/* 01 — THE INTELLIGENCE ENGINE */}
        <IntelligenceEngine />

        {/* 02 — THE BAYANIHAN MESH */}
        <BayanihanMesh />

        {/* 03 — THREE-TIER COORDINATION */}
        <Platforms />

        {/* 04 — IMPACT & SDG INTEGRATION */}
        <ImpactSDG />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
