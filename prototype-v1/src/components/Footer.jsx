import React from "react";
import { AlertTriangle, Mail, Handshake } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Footer link column
function FooterColumn({ title, links, isVisible = false, delay = 0 }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: "var(--space-4)",
        }}
      >
        {title}
      </span>
      {links.map((link, i) => (
        <a
          key={link.label}
          href={link.href || "#"}
          onClick={(e) => {
            if (!link.href || link.href === "#") e.preventDefault();
          }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            lineHeight: 1.4,
            color: "var(--text-tertiary)",
            textDecoration: "none",
            padding: "4px 0",
            display: "block",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(8px)",
            transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + 100 + i * 60}ms, color 150ms ease`,
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "var(--text-tertiary)";
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

// Contact info card
function ContactCard({
  icon,
  label,
  value,
  href,
  isVisible = false,
  delay = 0,
}) {
  const isLink = href && href.startsWith("mailto:");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border-lighter)",
          backgroundColor: "var(--bg-secondary)",
          flexShrink: 0,
          fontSize: "13px",
          color: "var(--accent-orange)",
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
        {isLink ? (
          <a
            href={href}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 150ms ease",
              wordBreak: "break-all",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "var(--accent-orange)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "var(--text-secondary)";
            }}
          >
            {value}
          </a>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              lineHeight: 1.5,
              color: "var(--text-secondary)",
            }}
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const { ref: footerRef, isVisible: footerVisible } = useScrollReveal({
    threshold: 0.05,
  });

  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal({
    threshold: 0.1,
  });
  const { ref: bottomRef, isVisible: bottomVisible } = useScrollReveal({
    threshold: 0.2,
  });


  const navigationLinks = [
    { label: "Features", href: "#intelligence" },
    { label: "Mesh Network", href: "#mesh" },
    { label: "Platforms", href: "#platforms" },
    { label: "SDG Impact", href: "#impact" },
    { label: "Join Waitlist", href: "#waitlist" },
  ];

  const resourceLinks = [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Developer Guide", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Research Papers", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Data Security", href: "#" },
    { label: "AI Disclosure", href: "#" },
    { label: "Accessibility", href: "#" },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const cleanId = targetId.replace("#", "");
    const el = document.getElementById(cleanId);
    if (el) {
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="footer"
      ref={footerRef}
      role="contentinfo"
      style={{ borderTop: "1px solid var(--border-primary)" }}
    >
      <div className="container">
        {/* Main Footer Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "var(--space-12)",
            paddingBottom: "var(--space-12)",
            borderBottom: "1px solid var(--border-light)",
            marginBottom: "var(--space-8)",
          }}
        >
          {/* Brand Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "var(--space-2)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 24,
                  height: 24,
                  backgroundColor: "var(--accent-orange)",
                  color: "white",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "3px",
                }}
              >
                R
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  color: "var(--text-primary)",
                }}
              >
                ResQLink
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  padding: "1px 5px",
                  border: "1px solid var(--border-lighter)",
                  borderRadius: "3px",
                  letterSpacing: "0.1em",
                }}
              >
                BETA
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                lineHeight: 1.7,
                color: "var(--text-tertiary)",
                maxWidth: "360px",
              }}
            >
              AI-Powered Multi-Hazard Coordination Platform. Transforming
              disaster response with real-time intelligence, BLE mesh
              resilience, and multi-agency collaboration for Philippine
              communities.
            </p>

            {/* Affiliation */}
            <div
              style={{
                padding: "var(--space-4) var(--space-5)",
                borderLeft: "2px solid var(--accent-orange)",
                backgroundColor: "var(--accent-orange-soft)",
                marginTop: "var(--space-2)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  lineHeight: 1.65,
                  color: "var(--text-secondary)",
                }}
              >
                Developed for Undergraduate Thesis under the{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  College of Computing and Information Sciences
                </strong>{" "}
                at the{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  University of Makati
                </strong>
                . In partnership with{" "}
                <strong style={{ color: "var(--accent-orange)" }}>
                  UMak KALASAG DRRM
                </strong>
                .
              </p>
            </div>

            {/* Contact info cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
                marginTop: "var(--space-4)",
              }}
            >
              <ContactCard
                icon={<AlertTriangle size={14} />}
                label="Emergency Hotline"
                value="911 (Available 24/7)"
                isVisible={gridVisible}
                delay={200}
              />
              <ContactCard
                icon={<Mail size={14} />}
                label="Technical Support"
                value="jvillarosa.a12240987@umak.edu.ph"
                href="mailto:jvillarosa.a12240987@umak.edu.ph"
                isVisible={gridVisible}
                delay={300}
              />
              <ContactCard
                icon={<Handshake size={14} />}
                label="Partnership Inquiries"
                value="mcuizon.a12241782@umak.edu.ph"
                href="mailto:mcuizon.a12241782@umak.edu.ph"
                isVisible={gridVisible}
                delay={400}
              />
            </div>
          </div>

          {/* Navigation Column */}
          <FooterColumn
            title="Navigation"
            links={navigationLinks.map((link) => ({
              ...link,
              href: undefined,
              label: link.label,
            }))}
            isVisible={gridVisible}
            delay={100}
          />

          {/* Resources Column */}
          <FooterColumn
            title="Resources"
            links={resourceLinks}
            isVisible={gridVisible}
            delay={200}
          />

          {/* Legal Column */}
          <FooterColumn
            title="Legal"
            links={legalLinks}
            isVisible={gridVisible}
            delay={300}
          />
        </div>

        {/* Disclaimer bar */}
        <div
          style={{
            padding: "var(--space-4) 0",
            marginBottom: "var(--space-6)",
            borderBottom: "1px solid var(--border-lighter)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              lineHeight: 1.7,
              color: "var(--text-muted)",
              maxWidth: "800px",
            }}
          >
            <strong
              style={{
                color: "var(--text-tertiary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Disclaimer:
            </strong>{" "}
            ResQLink is a prototype platform designed for academic research and
            demonstration purposes. Response time improvements and impact
            metrics referenced on this page are estimates based on pilot data
            and projections. This platform does not guarantee emergency
            outcomes. Always contact official emergency services (911) in
            life-threatening situations.
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            opacity: bottomVisible ? 1 : 0,
            transform: bottomVisible ? "translateY(0)" : "translateY(10px)",
            transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Copyright */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              © 2025 ResQLink Platform. All rights reserved.
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--text-muted)",
                opacity: 0.5,
              }}
            >
              |
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                color: "var(--text-muted)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Warframes 2026 Competition Entry
            </span>
          </div>

          {/* Legal links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-6)",
            }}
          >
            {["Privacy Policy", "Terms & Conditions", "Data Security"].map(
              (link, i) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.04em",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "var(--text-muted)";
                  }}
                >
                  {link}
                </a>
              ),
            )}
          </div>

          {/* Version tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                padding: "3px 8px",
                border: "1px solid var(--border-lighter)",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                }}
              />
              v2.0-beta
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                padding: "3px 8px",
                border: "1px solid var(--border-lighter)",
              }}
            >
              Prototype V1
            </span>
          </div>
        </div>

        {/* Final scroll-to-top hint */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "var(--space-8)",
            paddingBottom: "var(--space-4)",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
              transition: "color 200ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-orange)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
            }}
            aria-label="Scroll to top"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Back to Top
          </button>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1000px) {
          .footer > .container > div:nth-child(2) {
            grid-template-columns: 1fr 1fr !important;
            gap: var(--space-8) !important;
          }
        }
        @media (max-width: 700px) {
          .footer > .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          .footer > .container > div:last-of-type {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: var(--space-4) !important;
          }
        }
      `}</style>
    </footer>
  );
}
