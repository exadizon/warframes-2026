import React, { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Terrain Canvas — draws a desaturated 3D topographic grid with pulsing risk overlays
function TerrainCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Elevation data — procedural terrain
    const cols = 48;
    const rows = 24;
    const elevationMap = [];
    for (let r = 0; r < rows; r++) {
      elevationMap[r] = [];
      for (let c = 0; c < cols; c++) {
        // Multi-octave noise approximation
        const nx = c / cols;
        const ny = r / rows;
        const val =
          Math.sin(nx * 6.28 * 2 + 0.5) * 0.3 +
          Math.cos(ny * 6.28 * 3 + 1.2) * 0.25 +
          Math.sin((nx + ny) * 6.28 * 1.5) * 0.2 +
          Math.sin(nx * 12 + ny * 8) * 0.1 +
          Math.cos(nx * 5 - ny * 6) * 0.15;
        elevationMap[r][c] = (val + 1) / 2; // normalize 0-1
      }
    }

    // Risk hotspots — positioned as percentages
    const hotspots = [
      { x: 0.25, y: 0.35, intensity: 1.0, radius: 35 },
      { x: 0.62, y: 0.28, intensity: 0.8, radius: 28 },
      { x: 0.78, y: 0.55, intensity: 0.6, radius: 22 },
      { x: 0.15, y: 0.65, intensity: 0.5, radius: 18 },
      { x: 0.48, y: 0.72, intensity: 0.9, radius: 32 },
      { x: 0.88, y: 0.38, intensity: 0.4, radius: 16 },
    ];

    const draw = (timestamp) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Background gradient — desaturated terrain feel
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#EDEDEE");
      bgGrad.addColorStop(0.5, "#E8E8EA");
      bgGrad.addColorStop(1, "#F0F0F2");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw topographic contour lines
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      // Contour levels
      const levels = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

      for (const level of levels) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(26, 28, 30, ${0.04 + (level - 0.2) * 0.04})`;
        ctx.lineWidth = level > 0.6 ? 1 : 0.5;

        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const x = c * cellW;
            const y = r * cellH;

            const tl = elevationMap[r][c];
            const tr = elevationMap[r][c + 1];
            const bl = elevationMap[r + 1][c];
            const br = elevationMap[r + 1][c + 1];

            // Simplified marching squares — draw line segments where contour crosses
            const edges = [];

            if (tl >= level !== tr >= level) {
              const frac = (level - tl) / (tr - tl);
              edges.push({ x: x + frac * cellW, y: y });
            }
            if (tr >= level !== br >= level) {
              const frac = (level - tr) / (br - tr);
              edges.push({ x: x + cellW, y: y + frac * cellH });
            }
            if (bl >= level !== br >= level) {
              const frac = (level - bl) / (br - bl);
              edges.push({ x: x + frac * cellW, y: y + cellH });
            }
            if (tl >= level !== bl >= level) {
              const frac = (level - tl) / (bl - tl);
              edges.push({ x: x, y: y + frac * cellH });
            }

            if (edges.length >= 2) {
              ctx.moveTo(edges[0].x, edges[0].y);
              ctx.lineTo(edges[1].x, edges[1].y);
            }
          }
        }
        ctx.stroke();
      }

      // Grid overlay — subtle architectural grid
      ctx.strokeStyle = "rgba(26, 28, 30, 0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Risk hotspot overlays — pulsing Emergency Orange
      for (const hs of hotspots) {
        const cx = hs.x * width;
        const cy = hs.y * height;
        const pulsePhase = Math.sin(t * 1.5 + hs.x * 10 + hs.y * 7) * 0.5 + 0.5;
        const currentRadius = hs.radius + pulsePhase * 12;

        // Outer glow
        const outerGrad = ctx.createRadialGradient(
          cx,
          cy,
          0,
          cx,
          cy,
          currentRadius * 2,
        );
        outerGrad.addColorStop(
          0,
          `rgba(0, 41, 154, ${0.12 * hs.intensity * (0.6 + pulsePhase * 0.4)})`,
        );
        outerGrad.addColorStop(0.5, `rgba(0, 41, 154, ${0.05 * hs.intensity})`);
        outerGrad.addColorStop(1, "rgba(0, 41, 154, 0)");
        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, currentRadius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner pulse ring
        const ringRadius = hs.radius * 0.6 + pulsePhase * hs.radius * 0.8;
        ctx.strokeStyle = `rgba(0, 41, 154, ${0.25 * (1 - pulsePhase) * hs.intensity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Core dot
        ctx.fillStyle = `rgba(0, 41, 154, ${0.7 * hs.intensity})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();

        // Crosshair lines
        const crossSize = 8;
        ctx.strokeStyle = `rgba(0, 41, 154, ${0.3 * hs.intensity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx - crossSize, cy);
        ctx.lineTo(cx + crossSize, cy);
        ctx.moveTo(cx, cy - crossSize);
        ctx.lineTo(cx, cy + crossSize);
        ctx.stroke();
      }

      // Coordinate labels in corners
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(26, 28, 30, 0.2)";
      ctx.textAlign = "left";
      ctx.fillText("14.5995° N", 12, 20);
      ctx.fillText("120.9842° E", 12, 32);
      ctx.textAlign = "right";
      ctx.fillText(`TERRAIN.ELEV`, width - 12, 20);
      ctx.fillText(`NCR METRO MANILA`, width - 12, 32);

      // Bottom status line
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(26, 28, 30, 0.15)";
      ctx.fillText(
        `HAZARD_OVERLAY // ${hotspots.length} ACTIVE ZONES // REAL-TIME`,
        12,
        height - 12,
      );

      // Scan line moving effect
      const scanY = (t * 30) % height;
      ctx.strokeStyle = "rgba(0, 41, 154, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}

// Typing effect for system status text
function TypeWriter({ text, speed = 25, startDelay = 800 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "14px",
            backgroundColor: "var(--accent-orange)",
            marginLeft: "2px",
            verticalAlign: "middle",
            animation: "cursor-blink 1s step-end infinite",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

// Status indicator badges
function StatusBadge({ label, value, status = "nominal" }) {
  const statusColors = {
    nominal: "#22C55E",
    warning: "#00299A",
    pending: "#F59E0B",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: statusColors[status],
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span style={{ color: "var(--text-secondary)", marginLeft: "auto" }}>
        {value}
      </span>
    </div>
  );
}

// Live incident simulation — demonstrates the product working in real time
function LiveIncidentDemo() {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 4000),
      setTimeout(() => setPhase(2), 6200),
      setTimeout(() => setPhase(3), 8400),
      setTimeout(() => setPhase(4), 11500),
      setTimeout(() => setPhase(0), 12500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 0) return null;

  const statusColor =
    phase === 3 ? "#22C55E" : phase === 2 ? "#F59E0B" : "#EB433A";
  const statusText =
    phase === 1
      ? "NEW SOS REPORT"
      : phase === 2
        ? "AI TRIAGE"
        : "TEAM DISPATCHED";

  return (
    <div
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        width: "220px",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${phase === 3 ? "rgba(34, 197, 94, 0.3)" : "var(--border-light)"}`,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
        opacity: phase === 4 ? 0 : 1,
        transform: phase === 4 ? "translateX(8px)" : "translateX(0)",
        transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        animation:
          phase === 1
            ? "slideInNotification 500ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "none",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "3px",
          backgroundColor: statusColor,
          transition: "background-color 300ms ease",
        }}
      />
      <div style={{ padding: "10px 12px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "8px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: statusColor,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: statusColor,
                animation:
                  phase < 3
                    ? "status-blink 1s ease-in-out infinite"
                    : "none",
              }}
            />
            {statusText}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "7px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}
          >
            LIVE
          </span>
        </div>

        {/* Incident details */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            lineHeight: 1.5,
            color: "var(--text-secondary)",
            fontWeight: 500,
          }}
        >
          Flooding — 3 persons trapped
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "8px",
            color: "var(--text-muted)",
            marginTop: "3px",
          }}
        >
          14.5892°N, 120.9813°E · Brgy. San Antonio
        </div>

        {/* Processing phases */}
        {phase >= 2 && (
          <div
            style={{
              marginTop: "8px",
              paddingTop: "7px",
              borderTop: "1px solid var(--border-lighter)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              lineHeight: 1.6,
              animation: "fadeInUp 300ms ease",
            }}
          >
            {phase === 2 && (
              <div
                style={{
                  color: "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "10px",
                    height: "10px",
                    border: "1.5px solid #F59E0B",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Analyzing severity...
              </div>
            )}
            {phase >= 3 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                <div style={{ color: "#22C55E", fontWeight: 600 }}>
                  Severity: CRITICAL (8.7/10)
                </div>
                <div style={{ color: "var(--text-secondary)" }}>
                  Rescue Team Bravo dispatched
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal({
    threshold: 0.05,
  });
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStatus(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollToIntelligence = (e) => {
    e.preventDefault();
    const el = document.getElementById("intelligence");
    if (el) {
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      className="section"
      id="hero"
      ref={heroRef}
      style={{
        paddingTop: "calc(var(--nav-height) + var(--space-16))",
        paddingBottom: "var(--space-16)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background grid */}
      <div className="grid-overlay" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top metadata bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "var(--space-6)",
            opacity: showStatus ? 1 : 0,
            transform: showStatus ? "translateY(0)" : "translateY(-10px)",
            transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="eyebrow">Mission Briefing</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  animation: "status-blink 2s ease-in-out infinite",
                }}
              />
              System Online
            </span>
            <span style={{ color: "var(--border-light)" }}>|</span>
            <span>v2.0 Beta</span>
          </div>
        </div>

        {/* Main content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--space-10)",
          }}
        >
          {/* Headline */}
          <div
            style={{
              maxWidth: "960px",
              opacity: showStatus ? 1 : 0,
              transform: showStatus ? "translateY(0)" : "translateY(30px)",
              transition: "all 1000ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            <h1
              className="heading-hero"
              style={{
                marginBottom: "var(--space-6)",
                maxWidth: "900px",
              }}
            >
              <span style={{ color: "var(--accent-orange)" }}>Actionable Intelligence</span>{" "}
              <span
                style={{
                  display: "block",
                  color: "var(--accent-red)",
                  fontStyle: "italic",
                }}
              >
                When Lives Depend on It
              </span>
            </h1>

            <p
              className="body-lg"
              style={{
                maxWidth: "640px",
                marginBottom: "var(--space-8)",
                color: "var(--text-secondary)",
              }}
            >
              ResQLink transforms disaster response with AI-powered
              coordination, real-time intelligence, and seamless multi-agency
              collaboration — built for the communities that need it most.
            </p>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btn--primary btn--pulse"
                onClick={handleScrollToIntelligence}
              >
                Explore the Platform
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </button>
              <button
                className="btn btn--secondary"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("waitlist");
                  if (el) {
                    const top =
                      el.getBoundingClientRect().top + window.scrollY - 64;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
              >
                Join the Waitlist
              </button>
            </div>
          </div>

          {/* Terrain Visualization + System Status */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "1px",
              backgroundColor: "var(--border-light)",
              border: "1px solid var(--border-light)",
              opacity: showStatus ? 1 : 0,
              transform: showStatus ? "translateY(0)" : "translateY(30px)",
              transition: "all 1000ms cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            }}
          >
            {/* Terrain Map */}
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 8",
                backgroundColor: "var(--bg-secondary)",
                overflow: "hidden",
                minHeight: "320px",
              }}
            >
              <TerrainCanvas />

              {/* Live incident simulation overlay */}
              <LiveIncidentDemo />

              {/* Map legend overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  backgroundColor: "rgba(251, 251, 251, 0.8)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 12px",
                  border: "1px solid var(--border-lighter)",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 41, 154, 0.7)",
                    }}
                  />
                  High Risk
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 41, 154, 0.3)",
                    }}
                  />
                  Moderate
                </span>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 1,
                      backgroundColor: "rgba(26, 28, 30, 0.15)",
                    }}
                  />
                  Contour
                </span>
              </div>

              {/* Corner marks for architectural feel */}
              <div
                className="corner-mark corner-mark--tl"
                style={{ borderColor: "var(--border-medium)" }}
              />
              <div
                className="corner-mark corner-mark--tr"
                style={{ borderColor: "var(--border-medium)" }}
              />
              <div
                className="corner-mark corner-mark--bl"
                style={{ borderColor: "var(--border-medium)" }}
              />
              <div
                className="corner-mark corner-mark--br"
                style={{ borderColor: "var(--border-medium)" }}
              />
            </div>

            {/* System Status Panel */}
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                padding: "var(--space-8)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Status Header */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "var(--space-4)",
                    paddingBottom: "var(--space-3)",
                    borderBottom: "1px solid var(--border-lighter)",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#22C55E",
                      animation: "status-blink 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    System Status
                  </span>
                </div>

                {/* Typed description */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    marginBottom: "var(--space-6)",
                    minHeight: "100px",
                  }}
                >
                  <TypeWriter
                    text="ResQLink is a multi-hazard coordination platform that uses AI to triage reports and BLE Mesh to connect the disconnected. Designed for Philippine disaster resilience."
                    speed={18}
                    startDelay={1200}
                  />
                </div>

                {/* Capability tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  {[
                    "AI Triage",
                    "BLE Mesh",
                    "Offline-First",
                    "Multi-Agency",
                  ].map((tag) => (
                    <span key={tag} className="tag tag--orange">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status indicators */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div
                  style={{
                    borderTop: "1px solid var(--border-lighter)",
                    paddingTop: "var(--space-4)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    Active Modules
                  </span>
                </div>
                <StatusBadge
                  label="AI Engine"
                  value="Active"
                  status="nominal"
                />
                <StatusBadge
                  label="Mesh Network"
                  value="Standby"
                  status="pending"
                />
                <StatusBadge
                  label="Triage Queue"
                  value="0 Pending"
                  status="nominal"
                />
                <StatusBadge
                  label="Coverage"
                  value="NCR Region"
                  status="nominal"
                />
              </div>
            </div>
          </div>

          {/* Bottom stats strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              backgroundColor: "var(--border-light)",
              border: "1px solid var(--border-light)",
              opacity: showStatus ? 1 : 0,
              transform: showStatus ? "translateY(0)" : "translateY(20px)",
              transition: "all 1000ms cubic-bezier(0.16, 1, 0.3, 1) 800ms",
            }}
          >
            {[
              {
                label: "Offline-First Compatibility",
                value: "Active",
                desc: "Keeps people connected in all situations",
              },
              {
                label: "Rapid Response Tools",
                value: "Enabled",
                desc: "Enhanced tools for disaster response",
              },
              {
                label: "AI-Powered Insights",
                value: "Online",
                desc: "Smart analytics for actionable intelligence",
              },
              {
                label: "Multi-Hazard Support",
                value: "PH Focus",
                desc: "Flood, Typhoon, Earthquake, Landslide",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: "var(--bg-card)",
                  padding: "var(--space-5) var(--space-6)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#22C55E",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.value}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    lineHeight: 1.5,
                    color: "var(--text-tertiary)",
                  }}
                >
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cursor blink keyframe — injected inline for the TypeWriter */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes slideInNotification {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 900px) {
          #hero > .container > div:nth-child(2) > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #hero > .container > div:nth-child(2) > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          #hero > .container > div:nth-child(2) > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
