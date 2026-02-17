import React from 'react'
import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal'

// Animated progress bar for each step
function StepProgress({ progress = 0, delay = 0, isVisible = false }) {
  return (
    <div
      style={{
        width: '100%',
        height: '3px',
        backgroundColor: 'var(--bg-tertiary)',
        marginTop: 'var(--space-6)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: '100%',
          backgroundColor: 'var(--accent-orange)',
          width: isVisible ? `${progress}%` : '0%',
          transition: `width 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          position: 'relative',
        }}
      >
        {isVisible && progress > 0 && (
          <span
            style={{
              position: 'absolute',
              right: 0,
              top: '-4px',
              bottom: '-4px',
              width: '2px',
              backgroundColor: 'var(--accent-orange)',
              boxShadow: '0 0 8px rgba(255, 69, 0, 0.5)',
            }}
          />
        )}
      </div>
    </div>
  )
}

// Feature bullet with dot indicator
function FeatureBullet({ children, index = 0, isVisible = false }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        lineHeight: 1.6,
        color: 'var(--text-tertiary)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
        transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + index * 120}ms`,
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: 'var(--accent-orange)',
          flexShrink: 0,
          marginTop: '6px',
        }}
      />
      <span>{children}</span>
    </div>
  )
}

// Data log line — terminal aesthetic
function LogLine({ timestamp, level, message, isVisible = false, delay = 0 }) {
  const levelColors = {
    INFO: '#3B82F6',
    OK: '#22C55E',
    WARN: 'var(--accent-orange)',
    PROC: '#8B5CF6',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        lineHeight: 2,
        opacity: isVisible ? 0.7 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
        transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      <span style={{ color: 'var(--text-muted)', opacity: 0.5 }}>{timestamp}</span>
      <span
        style={{
          fontWeight: 600,
          textTransform: 'uppercase',
          color: levelColors[level] || 'var(--text-muted)',
          letterSpacing: '0.05em',
          minWidth: '32px',
        }}
      >
        {level}
      </span>
      <span style={{ color: 'var(--text-tertiary)' }}>{message}</span>
    </div>
  )
}

// Step card for the bento grid
function StepCard({ number, title, subtitle, description, bullets, progress, logLines, isDark = false, isAccent = false, isVisible = false, delay = 0 }) {
  const bgColor = isAccent
    ? 'var(--accent-orange)'
    : isDark
    ? 'var(--bg-dark)'
    : 'var(--bg-card)'

  const textColor = isAccent || isDark ? 'rgba(255, 255, 255, 0.92)' : 'var(--text-primary)'
  const subtextColor = isAccent ? 'rgba(255, 255, 255, 0.7)' : isDark ? 'rgba(255, 255, 255, 0.55)' : 'var(--text-secondary)'
  const mutedColor = isAccent ? 'rgba(255, 255, 255, 0.4)' : isDark ? 'rgba(255, 255, 255, 0.3)' : 'var(--text-muted)'
  const borderColor = isAccent ? 'rgba(255, 255, 255, 0.2)' : isDark ? 'rgba(255, 255, 255, 0.08)' : 'var(--border-lighter)'
  const bulletDotColor = isAccent ? 'rgba(255, 255, 255, 0.8)' : isDark ? 'var(--accent-orange)' : 'var(--accent-orange)'
  const numberColor = isAccent
    ? 'rgba(255, 255, 255, 0.12)'
    : isDark
    ? 'rgba(255, 255, 255, 0.04)'
    : 'var(--bg-tertiary)'

  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: 'var(--space-10)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Large background step number */}
      <span
        style={{
          position: 'absolute',
          top: 'var(--space-4)',
          right: 'var(--space-6)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(48px, 5vw, 72px)',
          fontWeight: 800,
          lineHeight: 1,
          color: numberColor,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Step label */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: 'var(--space-6)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: isAccent ? 'white' : 'var(--accent-orange)',
            padding: '3px 10px',
            border: `1px solid ${isAccent ? 'rgba(255,255,255,0.4)' : 'var(--accent-orange)'}`,
          }}
        >
          Step {number}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: mutedColor,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(20px, 1.8vw, 28px)',
          lineHeight: 1.25,
          color: textColor,
          marginBottom: 'var(--space-4)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          lineHeight: 1.75,
          color: subtextColor,
          marginBottom: 'var(--space-6)',
          maxWidth: '420px',
        }}
      >
        {description}
      </p>

      {/* Feature bullets */}
      {bullets && bullets.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingTop: 'var(--space-4)',
            borderTop: `1px solid ${borderColor}`,
            flex: 1,
          }}
        >
          {bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: 1.6,
                color: subtextColor,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
                transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 300 + i * 120}ms`,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  backgroundColor: bulletDotColor,
                  flexShrink: 0,
                  marginTop: '6px',
                }}
              />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {/* Log lines — terminal output at bottom */}
      {logLines && logLines.length > 0 && (
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 'var(--space-6)',
            borderTop: `1px solid ${borderColor}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          {logLines.map((log, i) => (
            <LogLine
              key={i}
              timestamp={log.ts}
              level={log.level}
              message={log.msg}
              isVisible={isVisible}
              delay={delay + 500 + i * 100}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <StepProgress progress={progress} delay={delay + 400} isVisible={isVisible} />
      )}
    </div>
  )
}

export default function IntelligenceEngine() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.08 })
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 })
  const { ref: bentoRef, isVisible: bentoVisible } = useScrollReveal({ threshold: 0.1 })
  const { ref: summaryRef, isVisible: summaryVisible } = useScrollReveal({ threshold: 0.15 })

  return (
    <section
      className="section section--bordered"
      id="intelligence"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: 'var(--space-16)',
            maxWidth: '720px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 800ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="eyebrow" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>
            The Intelligence Engine
          </span>

          <h2
            className="heading-1"
            style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }}
          >
            AI-Powered Intelligence
          </h2>

          <p
            className="body-lg"
            style={{ maxWidth: '600px' }}
          >
            Three-step AI process that transforms emergency reports into actionable
            intelligence for optimal response coordination.
          </p>
        </div>

        {/* Bento Grid — 3-step process */}
        <div
          ref={bentoRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--border-light)',
            border: '1px solid var(--border-light)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {/* Step 01: Submission */}
          <StepCard
            number="01"
            subtitle="Capture"
            title="Report Submission"
            description="Citizens submit emergency reports with location, photos, and description. One-tap reporting captures critical incident data including precise location coordinates, visual evidence, and initial severity indicators for immediate processing."
            bullets={[
              'GPS auto-location with precision coordinates',
              'Photo documentation and visual evidence capture',
              'Timestamp and environmental sensor data',
              'Works without internet — edge-processed locally',
            ]}
            progress={100}
            isVisible={bentoVisible}
            delay={0}
          />

          {/* Step 02: AI Summarization */}
          <StepCard
            number="02"
            subtitle="Process"
            title="AI Summarization"
            description="Machine learning processes raw data into 1-sentence briefings. Advanced AI algorithms analyze text descriptions, interpret images, and cross-reference historical data to generate comprehensive incident summaries and risk profiles."
            bullets={[
              'Instant analysis of multi-modal input data',
              'Key facts extraction and severity classification',
              'Visual damage interpretation via computer vision',
              'Life-threat prioritization in milliseconds',
            ]}
            progress={78}
            isDark
            isVisible={bentoVisible}
            delay={150}
          />

          {/* Step 03: Smart Reranking */}
          <StepCard
            number="03"
            subtitle="Dispatch"
            title="Smart Reranking"
            description="Dynamic prioritization based on resource proximity. Intelligent ranking considers injury severity, resource availability, weather conditions, and rescue team locations to match the nearest specialized team to each critical SOS."
            bullets={[
              'Priority scoring with multi-factor weighting',
              'Resource proximity and team specialization matching',
              'Time-sensitive escalation with decay factors',
              'Matches nearest Boat, Fire, or Medical unit to SOS',
            ]}
            progress={92}
            isAccent
            isVisible={bentoVisible}
            delay={300}
          />
        </div>

        {/* Bottom summary row — technical details */}
        <div
          ref={summaryRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            backgroundColor: 'var(--border-light)',
            border: '1px solid var(--border-light)',
          }}
        >
          {/* Continuous Learning note */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              opacity: summaryVisible ? 1 : 0,
              transform: summaryVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
              <span
                style={{
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'var(--accent-orange-soft)',
                  color: 'var(--accent-orange)',
                  borderRadius: '50%',
                  fontSize: '10px',
                }}
              >
                ↻
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-orange)',
                }}
              >
                Continuous Learning
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '500px',
              }}
            >
              Our AI system continuously learns from response outcomes to improve triage accuracy,
              reduce response times, and optimize resource allocation for future emergencies.
              Every completed mission makes the system smarter.
            </p>
          </div>

          {/* Process log output */}
          <div
            style={{
              backgroundColor: 'var(--bg-dark)',
              padding: 'var(--space-8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity: summaryVisible ? 1 : 0,
              transform: summaryVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: 'var(--space-4)',
                paddingBottom: 'var(--space-3)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                Triage Process Log
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: '#22C55E',
                  letterSpacing: '0.1em',
                }}
              >
                ● LIVE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {[
                { ts: '14:32:01', level: 'INFO', msg: 'New SOS report received — Brgy. Malanday' },
                { ts: '14:32:01', level: 'PROC', msg: 'GPS lock acquired: 14.6042°N, 120.9822°E' },
                { ts: '14:32:02', level: 'PROC', msg: 'Image analysis: structural damage detected' },
                { ts: '14:32:02', level: 'OK', msg: 'AI summary generated — severity: HIGH' },
                { ts: '14:32:03', level: 'WARN', msg: 'Priority escalation: life-threat indicators' },
                { ts: '14:32:03', level: 'INFO', msg: 'Matched: Rescue Boat Unit 7 — ETA 8min' },
                { ts: '14:32:04', level: 'OK', msg: 'Dispatch confirmed — mission ID: RQL-2847' },
              ].map((log, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    lineHeight: 2,
                    opacity: summaryVisible ? 0.75 : 0,
                    transform: summaryVisible ? 'translateY(0)' : 'translateY(4px)',
                    transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${400 + i * 80}ms`,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>{log.ts}</span>
                  <span
                    style={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      minWidth: '32px',
                      color:
                        log.level === 'INFO'
                          ? '#3B82F6'
                          : log.level === 'OK'
                          ? '#22C55E'
                          : log.level === 'WARN'
                          ? 'var(--accent-orange)'
                          : '#8B5CF6',
                    }}
                  >
                    {log.level}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1000px) {
          #intelligence .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #intelligence .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
