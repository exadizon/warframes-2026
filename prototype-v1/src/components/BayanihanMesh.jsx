import React, { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Animated mesh network visualization on dark background
function MeshDiagram({ isVisible }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const signalRef = useRef([]);

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
      initNodes();
    };

    // Define mesh node positions
    const initNodes = () => {
      const nodes = [
        // Citizen devices (phones) — scattered
        { x: 0.08, y: 0.3, type: "citizen", label: "Phone A", active: true },
        { x: 0.15, y: 0.65, type: "citizen", label: "Phone B", active: true },
        { x: 0.22, y: 0.4, type: "citizen", label: "Phone C", active: false },
        { x: 0.28, y: 0.75, type: "citizen", label: "Phone D", active: true },
        { x: 0.35, y: 0.25, type: "citizen", label: "Phone E", active: true },
        { x: 0.32, y: 0.55, type: "relay", label: "Relay 1", active: true },
        { x: 0.44, y: 0.45, type: "citizen", label: "Phone F", active: true },
        { x: 0.42, y: 0.7, type: "citizen", label: "Phone G", active: false },
        { x: 0.5, y: 0.3, type: "relay", label: "Relay 2", active: true },
        { x: 0.55, y: 0.6, type: "citizen", label: "Phone H", active: true },
        { x: 0.6, y: 0.42, type: "citizen", label: "Phone I", active: true },
        { x: 0.65, y: 0.72, type: "relay", label: "Relay 3", active: true },
        { x: 0.7, y: 0.28, type: "citizen", label: "Phone J", active: true },
        { x: 0.72, y: 0.52, type: "citizen", label: "Phone K", active: true },
        { x: 0.78, y: 0.38, type: "citizen", label: "Phone L", active: false },
        // SOS origin — pulsing
        { x: 0.12, y: 0.45, type: "sos", label: "SOS Origin", active: true },
        // Gateway / Responder endpoint
        {
          x: 0.88,
          y: 0.45,
          type: "gateway",
          label: "Responder Gateway",
          active: true,
        },
      ];

      nodesRef.current = nodes.map((n) => ({
        ...n,
        px: n.x * width,
        py: n.y * height,
        radius:
          n.type === "gateway"
            ? 28
            : n.type === "sos"
              ? 24
              : n.type === "relay"
                ? 20
                : 16,
      }));

      // Define connections (edges between nodes for mesh links)
      const conns = [
        [15, 0],
        [15, 2],
        [0, 2],
        [0, 1],
        [1, 3],
        [2, 5],
        [2, 4],
        [5, 6],
        [5, 3],
        [4, 8],
        [6, 8],
        [6, 9],
        [8, 10],
        [9, 11],
        [10, 12],
        [10, 13],
        [11, 13],
        [12, 14],
        [13, 16],
        [12, 16],
        [14, 16],
        [3, 7],
        [7, 9],
        [11, 16],
      ];
      connectionsRef.current = conns;

      // Signal path — SOS travels through the mesh to gateway
      signalRef.current = [15, 2, 5, 6, 8, 10, 13, 16];
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp) => {
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = "#1A1C1E";
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 0.5;
      const gridSize = 32;
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

      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const signalPath = signalRef.current;

      if (nodes.length === 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw connections (mesh lines)
      for (const [i, j] of connections) {
        if (!nodes[i] || !nodes[j]) continue;
        const a = nodes[i];
        const b = nodes[j];

        // Check if this connection is on the signal path
        const isSignalEdge = signalPath.some((nodeIdx, si) => {
          if (si >= signalPath.length - 1) return false;
          return (
            (signalPath[si] === i && signalPath[si + 1] === j) ||
            (signalPath[si] === j && signalPath[si + 1] === i)
          );
        });

        if (isSignalEdge) {
          // Animated signal line
          const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py);
          const pulsePhase = Math.sin(t * 2) * 0.5 + 0.5;
          grad.addColorStop(0, `rgba(255, 69, 0, ${0.4 + pulsePhase * 0.3})`);
          grad.addColorStop(0.5, `rgba(255, 69, 0, ${0.6 + pulsePhase * 0.2})`);
          grad.addColorStop(1, `rgba(255, 69, 0, ${0.4 + pulsePhase * 0.3})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle =
            a.active && b.active
              ? "rgba(255, 255, 255, 0.06)"
              : "rgba(255, 255, 255, 0.025)";
          ctx.lineWidth = 0.5;
        }

        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      }

      // Draw signal particles traveling along path
      const totalSegments = signalPath.length - 1;
      const cycleTime = 4; // seconds per full path traversal
      const particleCount = 3;

      for (let p = 0; p < particleCount; p++) {
        const offset = p / particleCount;
        const progress = (t / cycleTime + offset) % 1;
        const segFloat = progress * totalSegments;
        const segIdx = Math.floor(segFloat);
        const segFrac = segFloat - segIdx;

        if (segIdx < totalSegments) {
          const fromNode = nodes[signalPath[segIdx]];
          const toNode = nodes[signalPath[segIdx + 1]];
          if (fromNode && toNode) {
            const px = fromNode.px + (toNode.px - fromNode.px) * segFrac;
            const py = fromNode.py + (toNode.py - fromNode.py) * segFrac;

            // Particle glow
            const particleGrad = ctx.createRadialGradient(
              px,
              py,
              0,
              px,
              py,
              16,
            );
            particleGrad.addColorStop(0, "rgba(255, 69, 0, 0.8)");
            particleGrad.addColorStop(0.4, "rgba(255, 69, 0, 0.3)");
            particleGrad.addColorStop(1, "rgba(255, 69, 0, 0)");
            ctx.fillStyle = particleGrad;
            ctx.beginPath();
            ctx.arc(px, py, 16, 0, Math.PI * 2);
            ctx.fill();

            // Particle core
            ctx.fillStyle = "#FF4500";
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nx = node.px;
        const ny = node.py;

        if (node.type === "sos") {
          // SOS Origin — pulsing emergency beacon
          const pulsePhase = Math.sin(t * 3) * 0.5 + 0.5;

          // Outer pulse ring
          const pulseRadius = node.radius + pulsePhase * 20;
          ctx.strokeStyle = `rgba(255, 69, 0, ${0.3 * (1 - pulsePhase)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(nx, ny, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Second pulse ring
          const pulse2 = (t * 3 + 1.5) % (Math.PI * 2);
          const p2Phase = Math.sin(pulse2) * 0.5 + 0.5;
          const pulse2Radius = node.radius + p2Phase * 30;
          ctx.strokeStyle = `rgba(255, 69, 0, ${0.15 * (1 - p2Phase)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(nx, ny, pulse2Radius, 0, Math.PI * 2);
          ctx.stroke();

          // Node fill
          const sosGrad = ctx.createRadialGradient(
            nx,
            ny,
            0,
            nx,
            ny,
            node.radius,
          );
          sosGrad.addColorStop(0, "rgba(255, 69, 0, 0.25)");
          sosGrad.addColorStop(1, "rgba(255, 69, 0, 0.08)");
          ctx.fillStyle = sosGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.fill();

          // Node border
          ctx.strokeStyle = "rgba(255, 69, 0, 0.7)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.stroke();

          // SOS icon
          ctx.fillStyle = "#FF4500";
          ctx.font = 'bold 10px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("SOS", nx, ny);

          // Label
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = "rgba(255, 69, 0, 0.6)";
          ctx.textAlign = "center";
          ctx.fillText(node.label.toUpperCase(), nx, ny + node.radius + 12);
        } else if (node.type === "gateway") {
          // Gateway — green receiver
          const pulsePhase = Math.sin(t * 2) * 0.5 + 0.5;

          // Pulse ring
          const pulseRadius = node.radius + pulsePhase * 12;
          ctx.strokeStyle = `rgba(34, 197, 94, ${0.25 * (1 - pulsePhase)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(nx, ny, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Node fill
          const gwGrad = ctx.createRadialGradient(
            nx,
            ny,
            0,
            nx,
            ny,
            node.radius,
          );
          gwGrad.addColorStop(0, "rgba(34, 197, 94, 0.2)");
          gwGrad.addColorStop(1, "rgba(34, 197, 94, 0.06)");
          ctx.fillStyle = gwGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.fill();

          // Border
          ctx.strokeStyle = "rgba(34, 197, 94, 0.6)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Icon
          ctx.fillStyle = "#22C55E";
          ctx.font = 'bold 10px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("GW", nx, ny);

          // Label
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = "rgba(34, 197, 94, 0.5)";
          ctx.textAlign = "center";
          ctx.fillText("RESPONDER GATEWAY", nx, ny + node.radius + 12);
        } else if (node.type === "relay") {
          // Relay nodes — slightly larger, brighter
          const relayGrad = ctx.createRadialGradient(
            nx,
            ny,
            0,
            nx,
            ny,
            node.radius,
          );
          relayGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
          relayGrad.addColorStop(1, "rgba(255, 255, 255, 0.02)");
          ctx.fillStyle = relayGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Relay ring animation
          const ringPhase = Math.sin(t * 1.5 + i) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * ringPhase})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius + 6 + ringPhase * 4, 0, Math.PI * 2);
          ctx.stroke();

          // Icon
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("↔", nx, ny);

          // Label
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
          ctx.fillText(node.label.toUpperCase(), nx, ny + node.radius + 10);
        } else {
          // Regular citizen phone nodes
          const opacity = node.active ? 0.15 : 0.05;
          const borderOpacity = node.active ? 0.25 : 0.08;

          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(255, 255, 255, ${borderOpacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Phone icon
          ctx.fillStyle = `rgba(255, 255, 255, ${node.active ? 0.4 : 0.15})`;
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("📱", nx, ny);
        }
      }

      // Top-left overlay text
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fillText("BLE_MESH_NETWORK // BAYANIHAN PROTOCOL v2.0", 16, 20);
      ctx.fillText(
        `ACTIVE NODES: ${nodes.filter((n) => n.active).length} / ${nodes.length}`,
        16,
        34,
      );

      // Bottom-right status
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255, 69, 0, 0.3)";
      ctx.fillText("SIGNAL PROPAGATION: ACTIVE", width - 16, height - 16);

      // Bottom-left signal path indicator
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fillText(
        `HOP COUNT: ${signalPath.length - 1} // LATENCY: ~${(signalPath.length - 1) * 12}ms`,
        16,
        height - 16,
      );

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
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

// Technical spec bullet
function SpecBullet({
  icon,
  title,
  description,
  isVisible = false,
  delay = 0,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "flex-start",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border-light)",
          backgroundColor: "var(--bg-secondary)",
          flexShrink: 0,
          color: "var(--accent-orange)",
          fontSize: "14px",
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            lineHeight: 1.65,
            color: "var(--text-tertiary)",
          }}
        >
          {description}
        </span>
      </div>
    </div>
  );
}

// Hop step indicator — shows how signal travels
function HopStep({
  number,
  label,
  isLast = false,
  isVisible = false,
  delay = 0,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-12px)",
        transition: `all 500ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1.5px solid var(--accent-orange)",
          backgroundColor: "var(--accent-orange-soft)",
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--accent-orange)",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--text-secondary)",
          letterSpacing: "0.03em",
        }}
      >
        {label}
      </span>
      {!isLast && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <svg
            width="24"
            height="8"
            viewBox="0 0 24 8"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 4H20M20 4L16 1M20 4L16 7"
              stroke="var(--accent-orange)"
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function BayanihanMesh() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({
    threshold: 0.05,
  });
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({
    threshold: 0.2,
  });
  const { ref: diagramRef, isVisible: diagramVisible } = useScrollReveal({
    threshold: 0.1,
  });
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal({
    threshold: 0.15,
  });
  const { ref: specsRef, isVisible: specsVisible } = useScrollReveal({
    threshold: 0.15,
  });

  return (
    <section
      className="section section--bordered"
      id="mesh"
      ref={sectionRef}
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--space-16)",
            alignItems: "end",
            marginBottom: "var(--space-12)",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div>
            <span
              className="eyebrow"
              style={{ marginBottom: "var(--space-4)", display: "inline-flex" }}
            >
              The Bayanihan Mesh
            </span>
            <h2 className="heading-1" style={{ marginTop: "var(--space-4)" }}>
              Communication{" "}
              <span
                style={{ fontStyle: "italic", color: "var(--text-secondary)" }}
              >
                Without Towers
              </span>
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                lineHeight: 1.75,
                color: "var(--text-secondary)",
                maxWidth: "480px",
              }}
            >
              When cellular infrastructure fails during disasters, ResQLink
              creates a temporary communication bridge using Bluetooth Low
              Energy. Every phone in the community acts as a "node," hopping
              your SOS signal from device to device until it reaches a responder
              gateway.
            </p>
          </div>
        </div>

        {/* Mesh Network Diagram — Full Width */}
        <div
          ref={diagramRef}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 7",
            minHeight: "360px",
            border: "1px solid var(--border-light)",
            overflow: "hidden",
            marginBottom: "var(--space-10)",
            opacity: diagramVisible ? 1 : 0,
            transform: diagramVisible ? "scale(1)" : "scale(0.97)",
            transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1) 200ms",
          }}
        >
          <MeshDiagram isVisible={diagramVisible} />

          {/* Corner marks */}
          <div
            className="corner-mark corner-mark--tl"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          />
          <div
            className="corner-mark corner-mark--tr"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          />
          <div
            className="corner-mark corner-mark--bl"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          />
          <div
            className="corner-mark corner-mark--br"
            style={{ borderColor: "rgba(255,255,255,0.15)" }}
          />

          {/* Legend overlay */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              backgroundColor: "rgba(26, 28, 30, 0.85)",
              backdropFilter: "blur(8px)",
              padding: "10px 14px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontWeight: 600,
                marginBottom: "2px",
              }}
            >
              Legend
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "1.5px solid #FF4500",
                  backgroundColor: "rgba(255,69,0,0.2)",
                }}
              />
              SOS Origin
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.25)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              />
              Mesh Node (Phone)
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              />
              Relay Node
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "1.5px solid #22C55E",
                  backgroundColor: "rgba(34,197,94,0.15)",
                }}
              />
              Responder Gateway
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "rgba(255,69,0,0.5)",
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 1,
                  backgroundColor: "rgba(255,69,0,0.5)",
                }}
              />
              Signal Path
            </span>
          </div>
        </div>

        {/* Content Grid — Signal Path + Technical Specs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            backgroundColor: "var(--border-light)",
            border: "1px solid var(--border-light)",
          }}
        >
          {/* Left — How the signal travels */}
          <div
            ref={contentRef}
            style={{
              backgroundColor: "var(--bg-card)",
              padding: "var(--space-10)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "var(--space-6)" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent-orange)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "var(--space-4)",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: "var(--accent-orange)",
                  }}
                />
                Signal Propagation Path
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.5vw, 24px)",
                  lineHeight: 1.3,
                  marginBottom: "var(--space-3)",
                }}
              >
                From SOS to Rescue in 7 Hops
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  color: "var(--text-tertiary)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Each phone in range automatically relays the signal forward,
                creating an ad-hoc network that bypasses destroyed cell towers.
              </p>
            </div>

            {/* Hop steps */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <HopStep
                number="1"
                label="Citizen taps SOS — BLE broadcast begins"
                isVisible={contentVisible}
                delay={100}
              />
              <HopStep
                number="2"
                label="Nearest phone picks up signal, relays forward"
                isVisible={contentVisible}
                delay={200}
              />
              <HopStep
                number="3"
                label="Signal hops through community mesh nodes"
                isVisible={contentVisible}
                delay={300}
              />
              <HopStep
                number="4"
                label="Relay nodes amplify and route efficiently"
                isVisible={contentVisible}
                delay={400}
              />
              <HopStep
                number="5"
                label="Signal reaches responder gateway device"
                isVisible={contentVisible}
                delay={500}
              />
              <HopStep
                number="6"
                label="Gateway pushes alert to rescue dashboard"
                isVisible={contentVisible}
                delay={600}
              />
              <HopStep
                number="7"
                label="Rescue team dispatched — ETA sent back through mesh"
                isVisible={contentVisible}
                delay={700}
                isLast
              />
            </div>

            {/* Stats bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                backgroundColor: "var(--border-lighter)",
                border: "1px solid var(--border-lighter)",
                paddingTop: "var(--space-6)",
                marginTop: "var(--space-8)",
              }}
            >
              {[
                { label: "Max Range", value: "~100m", sub: "per hop" },
                { label: "Avg Latency", value: "<200ms", sub: "end-to-end" },
                { label: "Power Draw", value: "Ultra-Low", sub: "BLE 5.0" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    padding: "var(--space-4)",
                    textAlign: "center",
                    opacity: contentVisible ? 1 : 0,
                    transition: `opacity 500ms ease ${800 + i * 100}ms`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "9px",
                      color: "var(--text-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Technical specifications */}
          <div
            ref={specsRef}
            style={{
              backgroundColor: "var(--bg-card)",
              padding: "var(--space-10)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: "var(--space-6)" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent-orange)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "var(--space-4)",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: "var(--accent-orange)",
                  }}
                />
                Technical Deep-Dive
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(18px, 1.5vw, 24px)",
                  lineHeight: 1.3,
                  marginBottom: "var(--space-3)",
                }}
              >
                Infrastructure-Independent Design
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  lineHeight: 1.7,
                  color: "var(--text-tertiary)",
                  marginBottom: "var(--space-2)",
                }}
              >
                The Bayanihan Mesh protocol is purpose-built for the Philippine
                disaster context, where typhoons routinely destroy cell towers
                and power grids.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-6)",
                flex: 1,
              }}
            >
              <SpecBullet
                icon="📡"
                title="Offline Mesh Networking"
                description="No internet, no cell towers, no problem. BLE creates a device-to-device network using only the phones already in the community."
                isVisible={specsVisible}
                delay={0}
              />
              <SpecBullet
                icon="🔄"
                title="Device-to-Device Relay"
                description="Each smartphone acts as a signal repeater, automatically forwarding SOS messages to extend range far beyond a single Bluetooth connection."
                isVisible={specsVisible}
                delay={100}
              />
              <SpecBullet
                icon="🔋"
                title="Ultra-Low Power Consumption"
                description="Bluetooth Low Energy 5.0 protocol ensures the mesh network can operate for hours on minimal battery — critical when power is out."
                isVisible={specsVisible}
                delay={200}
              />
              <SpecBullet
                icon="🛡️"
                title="Self-Healing Network"
                description="If any node goes offline, the mesh automatically re-routes signals through alternative paths, maintaining communication resilience."
                isVisible={specsVisible}
                delay={300}
              />
              <SpecBullet
                icon="🌊"
                title="Disaster-Hardened Protocol"
                description="Designed for Typhoon Yolanda-scale events where 90%+ of cellular infrastructure is destroyed. Bayanihan Mesh keeps communities connected."
                isVisible={specsVisible}
                delay={400}
              />
            </div>

            {/* Bayanihan note */}
            <div
              style={{
                marginTop: "var(--space-8)",
                padding: "var(--space-5) var(--space-6)",
                borderLeft: "3px solid var(--accent-orange)",
                backgroundColor: "var(--accent-orange-soft)",
                opacity: specsVisible ? 1 : 0,
                transform: specsVisible ? "translateY(0)" : "translateY(12px)",
                transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1) 600ms",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                  fontStyle: "italic",
                }}
              >
                <strong
                  style={{ fontStyle: "normal", color: "var(--accent-orange)" }}
                >
                  Bayanihan{" "}
                </strong>
                — Filipino tradition of communal unity. In ResQLink, every phone
                that relays a signal embodies this spirit: neighbors helping
                neighbors reach safety, one Bluetooth hop at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1000px) {
          #mesh .container > div:first-child {
            grid-template-columns: 1fr !important;
            gap: var(--space-6) !important;
          }
          #mesh .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #mesh .container > div:nth-child(2) {
            aspect-ratio: 4 / 3 !important;
            min-height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
