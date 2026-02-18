import React from "react";
import { useScrollReveal, useStaggerReveal } from "../hooks/useScrollReveal";

// Animated progress bar for each step
function StepProgress({ progress = 0, delay = 0, isVisible = false }) {
  return (
    <div
      style={{
        width: "100%",
        height: "3px",
        backgroundColor: "var(--bg-tertiary)",
        marginTop: "var(--space-6)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "var(--accent-orange)",
          width: isVisible ? `${progress}%` : "0%",
          transition: `width 1.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          position: "relative",
        }}
      >
        {isVisible && progress > 0 && (
          <span
            style={{
              position: "absolute",
              right: 0,
              top: "-4px",
              bottom: "-4px",
              width: "2px",
              backgroundColor: "var(--accent-orange)",
              boxShadow: "0 0 8px rgba(0, 41, 154, 0.5)",
            }}
          />
        )}
      </div>
    </div>
  );
}

// Feature bullet with dot indicator
function FeatureBullet({ children, index = 0, isVisible = false }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        lineHeight: 1.6,
        color: "var(--text-tertiary)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-8px)",
        transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${300 + index * 120}ms`,
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          backgroundColor: "var(--accent-orange)",
          flexShrink: 0,
          marginTop: "6px",
        }}
      />
      <span>{children}</span>
    </div>
  );
}

// Data log line — terminal aesthetic
function LogLine({ timestamp, level, message, isVisible = false, delay = 0 }) {
  const levelColors = {
    INFO: "#3B82F6",
    OK: "#22C55E",
    WARN: "var(--accent-orange)",
    PROC: "#8B5CF6",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        lineHeight: 2,
        opacity: isVisible ? 0.7 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(6px)",
        transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <span style={{ color: "var(--text-muted)", opacity: 0.5 }}>
        {timestamp}
      </span>
      <span
        style={{
          fontWeight: 600,
          textTransform: "uppercase",
          color: levelColors[level] || "var(--text-muted)",
          letterSpacing: "0.05em",
          minWidth: "32px",
        }}
      >
        {level}
      </span>
      <span style={{ color: "var(--text-tertiary)" }}>{message}</span>
    </div>
  );
}

// Step card for the bento grid
function StepCard({
  number,
  title,
  subtitle,
  description,
  bullets,
  progress,
  logLines,
  isDark = false,
  isAccent = false,
  isVisible = false,
  delay = 0,
}) {
  const bgColor = isAccent
    ? "var(--accent-orange)"
    : isDark
      ? "linear-gradient(160deg, #1a1c1e 0%, #22252a 50%, #1d1f23 100%)"
      : "var(--bg-card)";

  const bgStyle = isDark && !isAccent
    ? { background: bgColor }
    : { backgroundColor: bgColor };

  const textColor =
    isAccent || isDark ? "rgba(255, 255, 255, 0.92)" : "var(--text-primary)";
  const subtextColor = isAccent
    ? "rgba(255, 255, 255, 0.7)"
    : isDark
      ? "rgba(255, 255, 255, 0.7)"
      : "var(--text-secondary)";
  const mutedColor = isAccent
    ? "rgba(255, 255, 255, 0.4)"
    : isDark
      ? "rgba(255, 255, 255, 0.45)"
      : "var(--text-muted)";
  const borderColor = isAccent
    ? "rgba(255, 255, 255, 0.2)"
    : isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "var(--border-lighter)";
  const bulletDotColor = isAccent
    ? "rgba(255, 255, 255, 0.8)"
    : isDark
      ? "var(--accent-orange)"
      : "var(--accent-orange)";
  const numberColor = isAccent
    ? "rgba(255, 255, 255, 0.12)"
    : isDark
      ? "rgba(255, 255, 255, 0.06)"
      : "var(--bg-tertiary)";

  return (
    <div
      style={{
        ...bgStyle,
        padding: "var(--space-10)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Subtle corner glow for dark cards */}
      {isDark && !isAccent && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "50%",
            background: "radial-gradient(ellipse at top right, rgba(0, 41, 154, 0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}
      {/* Large background step number */}
      <span
        style={{
          position: "absolute",
          top: "var(--space-4)",
          right: "var(--space-6)",
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(48px, 5vw, 72px)",
          fontWeight: 800,
          lineHeight: 1,
          color: numberColor,
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Step label */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "var(--space-6)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: isAccent ? "white" : "var(--accent-orange)",
            padding: "3px 10px",
            border: `1px solid ${isAccent ? "rgba(255,255,255,0.4)" : "var(--accent-orange)"}`,
          }}
        >
          Step {number}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
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
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(20px, 1.8vw, 28px)",
          lineHeight: 1.25,
          color: textColor,
          marginBottom: "var(--space-4)",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          lineHeight: 1.75,
          color: subtextColor,
          marginBottom: "var(--space-6)",
          maxWidth: "420px",
        }}
      >
        {description}
      </p>

      {/* Feature bullets */}
      {bullets && bullets.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            paddingTop: "var(--space-4)",
            borderTop: `1px solid ${borderColor}`,
            flex: 1,
          }}
        >
          {bullets.map((bullet, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                lineHeight: 1.6,
                color: subtextColor,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-8px)",
                transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 300 + i * 120}ms`,
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: bulletDotColor,
                  flexShrink: 0,
                  marginTop: "6px",
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
            marginTop: "auto",
            paddingTop: "var(--space-6)",
            borderTop: `1px solid ${borderColor}`,
            display: "flex",
            flexDirection: "column",
            gap: "2px",
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
        <StepProgress
          progress={progress}
          delay={delay + 400}
          isVisible={isVisible}
        />
      )}
    </div>
  );
}

export default function IntelligenceEngine() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({
    threshold: 0.08,
  });
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({
    threshold: 0.2,
  });
  const { ref: bentoRef, isVisible: bentoVisible } = useScrollReveal({
    threshold: 0.1,
  });
  const { ref: summaryRef, isVisible: summaryVisible } = useScrollReveal({
    threshold: 0.15,
  });

  return (
    <section
      className="section section--bordered"
      id="intelligence"
      ref={sectionRef}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: "var(--space-16)",
            maxWidth: "720px",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span
            className="eyebrow"
            style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}
          >
            The Intelligence Engine
          </span>

          <h2
            className="heading-1"
            style={{
              marginTop: "var(--space-4)",
              marginBottom: "var(--space-4)",
              color: "var(--accent-red)",
            }}
          >
            AI-Powered <span style={{ color: "var(--accent-orange)" }}>Intelligence</span>
          </h2>

          <p className="body-lg" style={{ maxWidth: "600px" }}>
            Three-step AI process that transforms emergency reports into
            actionable intelligence for optimal response coordination.
          </p>
        </div>

        {/* Bento Grid — 3-step process */}
        <div
          ref={bentoRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--border-light)",
            border: "1px solid var(--border-light)",
            marginBottom: "var(--space-10)",
          }}
        >
          {/* Step 01: Submission */}
          <StepCard
            number="01"
            subtitle="Capture"
            title="Report Submission"
            description="One-tap reporting captures GPS, photos, and severity for immediate processing."
            bullets={[
              "GPS auto-location with precision coordinates",
              "Photo documentation and evidence capture",
              "Works offline — edge-processed locally",
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
            description="ML processes raw data into 1-sentence briefings with severity classification."
            bullets={[
              "Multi-modal input analysis",
              "Key facts extraction and severity scoring",
              "Life-threat prioritization in milliseconds",
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
            description="Dynamic prioritization matching the nearest team to each SOS based on severity and proximity."
            bullets={[
              "Multi-factor priority scoring",
              "Resource proximity and team matching",
              "Matches nearest Boat, Fire, or Medical unit",
            ]}
            progress={92}
            isDark
            isVisible={bentoVisible}
            delay={300}
          />
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
  );
}
