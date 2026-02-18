import React from 'react'
import { Zap, FlaskConical, Shield, Users } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Animated counter that counts up when scrolled into view
function AnimatedNumber({ end, decimals = 0, suffix = '', prefix = '', isVisible, delay = 0 }) {
  const [current, setCurrent] = React.useState(0)
  const hasAnimated = React.useRef(false)

  React.useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true
    const duration = 2200
    const startTime = performance.now() + delay
    let frame

    const animate = (t) => {
      const elapsed = t - startTime
      if (elapsed < 0) { frame = requestAnimationFrame(animate); return }
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * end)
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => { if (frame) cancelAnimationFrame(frame) }
  }, [isVisible, end, delay])

  return `${prefix}${current.toFixed(decimals)}${suffix}`
}

// Animated hollow number with counter
function ImpactMetric({ end, decimals = 0, suffix = '', prefix = '', label, sublabel, isOrange = false, isRed = false, isVisible = false, delay = 0 }) {
  const [isHovered, setIsHovered] = React.useState(false)

  const strokeColor = isRed
    ? '2px var(--accent-red)'
    : isOrange
      ? '2px var(--accent-orange)'
      : '2px var(--text-primary)'

  const accentColor = isRed
    ? 'var(--accent-red)'
    : isOrange
      ? 'var(--accent-orange)'
      : 'var(--text-primary)'

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-3)',
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? (isHovered ? 'translateY(-4px)' : 'translateY(0)') : 'translateY(30px)',
        transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        padding: 'var(--space-8) var(--space-4)',
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: isHovered ? '60%' : '24px',
          height: '3px',
          backgroundColor: accentColor,
          transition: 'width 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Giant hollow number */}
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(64px, 10vw, 144px)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'transparent',
          WebkitTextStroke: strokeColor,
          userSelect: 'none',
          position: 'relative',
        }}
      >
        <AnimatedNumber end={end} decimals={decimals} suffix={suffix} prefix={prefix} isVisible={isVisible} delay={delay} />
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          marginTop: 'var(--space-2)',
        }}
      >
        {label}
      </div>

      {/* Sublabel */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          lineHeight: 1.6,
          color: 'var(--text-tertiary)',
          maxWidth: '280px',
        }}
      >
        {sublabel}
      </div>
    </div>
  )
}

// SDG Card with targets and impact statement
function SDGCard({
  sdgNumber,
  sdgTitle,
  sdgDescription,
  targets,
  impact,
  accentHue = '16',
  isVisible = false,
  delay = 0,
}) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? (isHovered ? 'translateY(-4px)' : 'translateY(0)')
          : 'translateY(28px)',
        transition: `
          opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          transform 400ms cubic-bezier(0.16, 1, 0.3, 1)
        `,
        boxShadow: isHovered
          ? '0 8px 32px rgba(26, 28, 30, 0.08)'
          : '0 1px 4px rgba(26, 28, 30, 0.02)',
        cursor: 'default',
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          height: '3px',
          backgroundColor: isHovered ? 'var(--accent-orange)' : 'transparent',
          transition: 'background-color 300ms ease',
        }}
      />

      <div style={{ padding: 'var(--space-10)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* SDG Number — giant outline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1.5px var(--accent-orange)',
              userSelect: 'none',
            }}
            aria-hidden="true"
          >
            {sdgNumber}
          </div>

          {/* SDG badge */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-orange)',
              padding: '4px 10px',
              border: '1px solid var(--accent-orange)',
              backgroundColor: 'var(--accent-orange-soft)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-orange)',
              }}
            />
            UN SDG
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(20px, 1.8vw, 28px)',
            lineHeight: 1.25,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {sdgTitle}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-6)',
          }}
        >
          {sdgDescription}
        </p>

        {/* Key Targets */}
        <div
          style={{
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid var(--border-lighter)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: 'var(--space-4)',
            }}
          >
            Key Targets
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {targets.map((target, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
                  transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 200 + i * 80}ms`,
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '16px',
                    height: '1px',
                    backgroundColor: 'var(--accent-orange)',
                    flexShrink: 0,
                    marginTop: '9px',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {target}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImpactSDG() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: metricsRef, isVisible: metricsVisible } = useScrollReveal({ threshold: 0.15 })
  const { ref: sdgRef, isVisible: sdgVisible } = useScrollReveal({ threshold: 0.08 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal({ threshold: 0.2 })

  const impactMetrics = [
    {
      end: 1.2,
      decimals: 1,
      suffix: 'M',
      label: 'Lives Protected',
      sublabel: 'Projected through faster response coordination',
      isOrange: true,
      isRed: false,
    },
    {
      end: 48,
      decimals: 0,
      suffix: '%',
      label: 'Response Efficiency',
      sublabel: 'Improvement in rescue deployment times',
      isOrange: false,
      isRed: true,
    },
    {
      end: 2.4,
      decimals: 1,
      suffix: 'K+',
      label: 'Communities Served',
      sublabel: 'BLE mesh networks across the Philippines',
      isOrange: true,
      isRed: false,
    },
  ]


  return (
    <section
      className="section section--bordered"
      id="impact"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto var(--space-20)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="eyebrow" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex', justifyContent: 'center' }}>
            Impact & SDG Integration
          </span>

          <h2
            className="heading-1"
            style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}
          >
            Measurable Impact,{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--accent-red)' }}>
              Global Resilience
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            ResQLink directly contributes to achieving the UN&apos;s Sustainable Development Goals
            for disaster resilience and climate adaptation. Every feature is measured against
            real-world outcomes.
          </p>
        </div>

        {/* Impact Metrics — Giant Hollow Numbers */}
        <div
          ref={metricsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-12)',
            marginBottom: 'var(--space-20)',
            paddingBottom: 'var(--space-16)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          {impactMetrics.map((metric, i) => (
            <ImpactMetric
              key={metric.label}
              end={metric.end}
              decimals={metric.decimals || 0}
              suffix={metric.suffix || ''}
              prefix={metric.prefix || ''}
              label={metric.label}
              sublabel={metric.sublabel}
              isOrange={metric.isOrange}
              isRed={metric.isRed}
              isVisible={metricsVisible}
              delay={i * 200}
            />
          ))}
        </div>

        {/* SDG Cards */}
        <div
          ref={sdgRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <SDGCard
            sdgNumber="11"
            sdgTitle="Sustainable Cities and Communities"
            sdgDescription="ResQLink's AI triage and mesh networking directly reduce casualties by cutting response times and maintaining connectivity when infrastructure fails."
            targets={[
              'AI-powered triage reduces average response time by 48%',
              'BLE mesh maintains connectivity with zero infrastructure',
              'Offline-first design reaches the most vulnerable communities',
            ]}
            impact="ResQLink's AI-powered triage and offline-first features directly help reduce response times during emergencies, contributing to lower casualty rates and faster recovery in disaster-prone Philippine communities."
            isVisible={sdgVisible}
            delay={0}
          />

          <SDGCard
            sdgNumber="13"
            sdgTitle="Climate Action"
            sdgDescription="Real-time disaster coordination and predictive analytics strengthen community resilience across the Philippine archipelago."
            targets={[
              'Multi-agency coordination platform for 2,400+ communities',
              'Real-time hazard monitoring with predictive analytics',
              'Self-healing mesh network adapts to infrastructure loss',
            ]}
            impact="Our platform builds community resilience through real-time disaster monitoring, predictive analytics, and coordinated response capabilities that adapt to changing climate risks across the Philippine archipelago."
            isVisible={sdgVisible}
            delay={200}
          />
        </div>
      </div>

        {/* CTA Section — Ready to Transform (Full Width) */}
        <div
          ref={ctaRef}
          id="waitlist"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Left — Mission CTA */}
          <div
            style={{
              background: 'linear-gradient(145deg, #1a1c1e 0%, #1f2328 45%, #1d1f23 100%)',
              padding: 'var(--space-16) var(--space-16)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'var(--space-6)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent glow */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20%',
                left: '-10%',
                width: '60%',
                height: '80%',
                background: 'radial-gradient(ellipse at center, rgba(235, 67, 58, 0.06) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--accent-orange)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: 16, height: 1, backgroundColor: 'var(--accent-orange)' }} />
              Join the Mission
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 2.5vw, 40px)',
                lineHeight: 1.2,
                color: 'rgba(255, 255, 255, 0.95)',
                maxWidth: '480px',
              }}
            >
              Ready to Transform{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--accent-red)' }}>
                Disaster Response?
              </span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.65)',
                maxWidth: '440px',
              }}
            >
              Join communities, responders, and agencies building resilient disaster response
              capabilities. Partner with ResQLink to contribute to global sustainability goals.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-2)', flexWrap: 'wrap' }}>
              <button
                className="btn btn--danger btn--pulse"
                style={{ fontSize: '13px' }}
              >
                Join the Waitlist
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                className="btn btn--secondary"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '11px',
                }}
              >
                Partnership Inquiry
              </button>
            </div>
          </div>

          {/* Right — Early Access Benefits */}
          <div
            style={{
              background: 'linear-gradient(160deg, #1a1c1e 0%, #22252a 50%, #1d1f23 100%)',
              padding: 'var(--space-12) var(--space-16)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                display: 'block',
                marginBottom: 'var(--space-8)',
              }}
            >
              Early Access Benefits
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {[
                {
                  icon: <Zap size={16} />,
                  title: 'Early Access',
                  desc: 'First to experience AI triage and mesh networking',
                },
                {
                  icon: <FlaskConical size={16} />,
                  title: 'Beta Testing',
                  desc: 'Shape the platform with your direct feedback',
                },
                {
                  icon: <Shield size={16} />,
                  title: 'Priority Support',
                  desc: 'Dedicated onboarding and technical support',
                },
                {
                  icon: <Users size={16} />,
                  title: 'LGU Partnerships',
                  desc: 'Pilot programs with full integration support',
                },
              ].map((benefit, i) => (
                <div
                  key={benefit.title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    opacity: ctaVisible ? 1 : 0,
                    transform: ctaVisible ? 'translateX(0)' : 'translateX(12px)',
                    transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 100}ms`,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      flexShrink: 0,
                      color: 'var(--accent-blue-bright)',
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        color: 'rgba(255, 255, 255, 0.95)',
                      }}
                    >
                      {benefit.title}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        lineHeight: 1.65,
                        color: 'rgba(255, 255, 255, 0.45)',
                      }}
                    >
                      {benefit.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1000px) {
          #impact .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          #impact > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          #impact .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: var(--space-10) !important;
          }
        }
      `}</style>
    </section>
  )
}
