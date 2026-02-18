import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Platform feature card with hover interactions
function PlatformCard({
  number,
  title,
  subtitle,
  description,
  features,
  ctaLabel = "Learn More",
  accentColor = "var(--accent-orange)",
  isVisible = false,
  delay = 0,
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-light)",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(32px)",
        transition: `
          opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
          transform 400ms cubic-bezier(0.16, 1, 0.3, 1)
        `,
        boxShadow: isHovered
          ? "0 12px 40px rgba(26, 28, 30, 0.1), 0 0 0 1px var(--border-medium)"
          : "0 1px 4px rgba(26, 28, 30, 0.03)",
      }}
    >
      {/* Top accent bar — animates on hover */}
      <div
        style={{
          height: "3px",
          backgroundColor: isHovered ? accentColor : "transparent",
          transition: "background-color 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Card content */}
      <div
        style={{
          padding: "var(--space-10)",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Header row — number + icon */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "var(--space-8)",
          }}
        >
          {/* Platform number */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(56px, 5vw, 80px)",
              fontWeight: 800,
              lineHeight: 1,
              color: isHovered
                ? "rgba(0, 41, 154, 0.08)"
                : "var(--bg-tertiary)",
              transition: "color 300ms ease",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            {number}
          </div>

          {/* Stakeholder tag */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isHovered ? accentColor : "var(--text-muted)",
              padding: "4px 10px",
              border: `1px solid ${isHovered ? accentColor : "var(--border-light)"}`,
              backgroundColor: isHovered
                ? "var(--accent-orange-soft)"
                : "transparent",
              transition: "all 300ms ease",
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(22px, 2vw, 30px)",
            lineHeight: 1.2,
            color: "var(--text-primary)",
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
            color: "var(--text-secondary)",
            marginBottom: "var(--space-8)",
            maxWidth: "380px",
          }}
        >
          {description}
        </p>

        {/* Feature list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--border-lighter)",
            flex: 1,
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-10px)",
                transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 200 + i * 100}ms`,
              }}
            >
              {/* Bullet marker */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "1px",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: isHovered
                      ? accentColor
                      : "var(--border-medium)",
                    transition: "background-color 300ms ease",
                  }}
                />
              </div>

              {/* Feature text */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--text-primary)",
                    lineHeight: 1.4,
                  }}
                >
                  {feature.title}
                </span>
                {feature.desc && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      lineHeight: 1.6,
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {feature.desc}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA button area */}
        <div
          style={{
            marginTop: "var(--space-8)",
            paddingTop: "var(--space-6)",
            borderTop: "1px solid var(--border-lighter)",
          }}
        >
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: isHovered ? accentColor : "var(--text-tertiary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              transition: "color 300ms ease",
            }}
          >
            {ctaLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isHovered ? "translateX(4px)" : "translateX(0)",
                transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Mini device mockup to add visual interest
function DeviceMockup({ type = "phone", label, isVisible = false, delay = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        style={{
          width: type === "desktop" ? 64 : type === "tablet" ? 48 : 32,
          height: type === "desktop" ? 44 : type === "tablet" ? 56 : 56,
          border: "1.5px solid var(--border-medium)",
          borderRadius: type === "desktop" ? "4px 4px 0 0" : "4px",
          backgroundColor: "var(--bg-secondary)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Screen content indicator */}
        <div
          style={{
            width: "70%",
            height: "60%",
            backgroundColor: "var(--accent-orange-soft)",
            border: "1px solid var(--border-orange)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "2px",
              backgroundColor: "var(--accent-orange)",
              opacity: 0.4,
            }}
          />
        </div>

        {/* Notch for phone */}
        {type === "phone" && (
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10px",
              height: "2px",
              borderRadius: "1px",
              backgroundColor: "var(--border-medium)",
            }}
          />
        )}
      </div>

      {/* Desktop stand */}
      {type === "desktop" && (
        <>
          <div
            style={{
              width: "16px",
              height: "8px",
              backgroundColor: "var(--border-light)",
              borderRadius: "0 0 2px 2px",
            }}
          />
          <div
            style={{
              width: "28px",
              height: "2px",
              backgroundColor: "var(--border-light)",
              borderRadius: "1px",
              marginTop: "-6px",
            }}
          />
        </>
      )}

      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Platforms() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({
    threshold: 0.2,
  });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({
    threshold: 0.08,
  });
  const { ref: devicesRef, isVisible: devicesVisible } = useScrollReveal({
    threshold: 0.2,
  });

  const platforms = [
    {
      number: "01",
      title: "Citizen Portal",
      subtitle: "Community",
      description:
        "One-tap reporting with offline tracking — know when help is coming, even off-grid.",
      features: [
        {
          title: "One-Tap Emergency Reporting",
          desc: "GPS auto-location with AI severity assessment",
        },
        {
          title: "Offline Status Tracking",
          desc: "Progress updates without internet",
        },
        {
          title: "Community Alert Feed",
          desc: "Nearby incidents and evacuation notices",
        },
        {
          title: "Preparedness Resources",
          desc: "Go-bag checklists and evacuation routes",
        },
      ],
      ctaLabel: "Explore Citizen Portal",
    },
    {
      number: "02",
      title: "Rescuer Dashboard",
      subtitle: "First Responders",
      description:
        "Self-assign missions, view GPS heatmaps, and accept incidents by expertise.",
      features: [
        {
          title: "Self-Assignment System",
          desc: "Accept incidents by skill — Boat, Fire, Medical, or SAR",
        },
        {
          title: "Real-Time GPS Heatmaps",
          desc: "Live density maps for priority zones",
        },
        {
          title: "Secure Team Comms",
          desc: "Encrypted multi-team channels",
        },
        {
          title: "AI Triage Briefings",
          desc: "1-sentence summaries with severity scores",
        },
      ],
      ctaLabel: "Explore Rescuer Tools",
    },
    {
      number: "03",
      title: "LGU Command Center",
      subtitle: "Government",
      description:
        "Coordinate multi-agency assets and track resources in real time.",
      features: [
        {
          title: "Multi-Agency Coordination",
          desc: "Unified command for PNP, BFP, Medical, LGU, and NGOs",
        },
        {
          title: "Resource Tracking",
          desc: "Real-time inventory of boats, supplies, and vehicles",
        },
        {
          title: "Analytics & Reporting",
          desc: "Response metrics and post-disaster data",
        },
        {
          title: "Role-Based Access",
          desc: "Secure permissions across agencies",
        },
      ],
      ctaLabel: "Explore Command Center",
    },
  ];

  return (
    <section
      className="section section--bordered"
      id="platforms"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "var(--space-16)",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
            flexWrap: "wrap",
            gap: "var(--space-6)",
          }}
        >
          <div style={{ maxWidth: "640px" }}>
            <span
              className="eyebrow"
              style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}
            >
              Three-Tier Coordination
            </span>

            <h2
              className="heading-1"
              style={{
                marginTop: "var(--space-4)",
                marginBottom: "var(--space-4)",
              }}
            >
              One Application,{" "}
              <span
                style={{ fontStyle: "italic", color: "var(--text-secondary)" }}
              >
                Multiple Stakeholders
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                maxWidth: "520px",
              }}
            >
              Tailored interfaces and tools designed for citizens, rescue teams,
              and government agencies — each optimized for their unique role in
              disaster response.
            </p>
          </div>

          {/* Device mockups — visual interest */}
          <div
            ref={devicesRef}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "var(--space-6)",
              padding: "var(--space-4) var(--space-6)",
              border: "1px solid var(--border-lighter)",
              backgroundColor: "var(--bg-card)",
            }}
          >
            <DeviceMockup
              type="phone"
              label="Mobile"
              isVisible={devicesVisible}
              delay={0}
            />
            <DeviceMockup
              type="tablet"
              label="Tablet"
              isVisible={devicesVisible}
              delay={100}
            />
            <DeviceMockup
              type="desktop"
              label="Desktop"
              isVisible={devicesVisible}
              delay={200}
            />
          </div>
        </div>

        {/* Platform Cards Grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-6)",
          }}
        >
          {platforms.map((platform, i) => (
            <PlatformCard
              key={platform.number}
              number={platform.number}
              title={platform.title}
              subtitle={platform.subtitle}
              description={platform.description}
              features={platform.features}
              ctaLabel={platform.ctaLabel}
              isVisible={cardsVisible}
              delay={i * 150}
            />
          ))}
        </div>


      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1100px) {
          #platforms .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
        }
        @media (max-width: 900px) {
          #platforms .container > div:first-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          #platforms .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
          #platforms .container > div:nth-child(3) > div:nth-child(2) {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          #platforms .container > div:nth-child(3) > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
