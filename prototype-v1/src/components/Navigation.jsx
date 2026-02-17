import React, { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const el = document.getElementById(targetId)
    if (el) {
      const navHeight = 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const links = [
    { label: 'Features', id: 'intelligence' },
    { label: 'Mesh', id: 'mesh' },
    { label: 'Platforms', id: 'platforms' },
    { label: 'Impact', id: 'impact' },
  ]

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav__inner">
        {/* Logo */}
        <a
          href="#"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <span className="nav__logo-icon" aria-hidden="true">R</span>
          <span className="nav__logo-text" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
            ResQLink
          </span>
          <span className="nav__logo-tag">BETA</span>
        </a>

        {/* Nav Links */}
        <ul className="nav__links">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="nav__link"
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              className="nav__cta"
              onClick={(e) => handleNavClick(e, 'waitlist')}
            >
              Join Waitlist
            </button>
          </li>
        </ul>

        {/* Mobile menu button — simplified for prototype */}
        <button
          className="nav__mobile-toggle"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-light)',
            background: 'transparent',
            cursor: 'pointer',
          }}
        >
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="0" y1="1" x2="18" y2="1" />
            <line x1="0" y1="7" x2="18" y2="7" />
            <line x1="0" y1="13" x2="18" y2="13" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
