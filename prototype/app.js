/* ═══════════════════════════════════════════════════════════
   ResQLink — App Logic & Geometric Background Animations
   Competition: Warframes 2026 / 42nd Web Design
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── INIT ───
  document.addEventListener('DOMContentLoaded', () => {
    initGeoBg();
    initNavScroll();
    initHeroCanvas();
    initFloatingCards();
    initTriageSimulation();
    initMeshDiagram();
    initPlatformModals();
    initAppModal();
    initWaitlist();
    initImpactCounters();
    initScrollReveal();
    initCtaCanvas();
    injectGradientOrbs();
  });

  /* ═══════════════════════════════════════════════════════════
     GEOMETRIC BACKGROUND (full-page canvas)
     Floating wireframe shapes, grid lines, particles
     ═══════════════════════════════════════════════════════════ */
  function initGeoBg() {
    const canvas = document.getElementById('geo-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const shapes = [];
    const particles = [];
    const gridLines = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight * 3; // tall enough for scroll
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate shapes
    const shapeTypes = ['triangle', 'hexagon', 'diamond', 'circle', 'square'];
    for (let i = 0; i < 18; i++) {
      shapes.push({
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        x: Math.random() * w,
        y: Math.random() * h,
        size: 20 + Math.random() * 50,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.15,
        opacity: 0.03 + Math.random() * 0.06,
      });
    }

    // Generate particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 1 + Math.random() * 2,
        speedY: -0.2 - Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: 0.05 + Math.random() * 0.1,
      });
    }

    // Generate horizontal grid lines
    for (let i = 0; i < 12; i++) {
      gridLines.push({
        y: (h / 12) * i + Math.random() * 100,
        opacity: 0.02 + Math.random() * 0.03,
        dashOffset: Math.random() * 100,
        speed: 0.2 + Math.random() * 0.3,
      });
    }

    function drawShape(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.strokeStyle = `rgba(255, 69, 0, ${s.opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();

      switch (s.type) {
        case 'triangle':
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.866, s.size * 0.5);
          ctx.lineTo(-s.size * 0.866, s.size * 0.5);
          ctx.closePath();
          break;
        case 'hexagon':
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = Math.cos(angle) * s.size;
            const py = Math.sin(angle) * s.size;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
        case 'diamond':
          ctx.moveTo(0, -s.size);
          ctx.lineTo(s.size * 0.6, 0);
          ctx.lineTo(0, s.size);
          ctx.lineTo(-s.size * 0.6, 0);
          ctx.closePath();
          break;
        case 'circle':
          ctx.arc(0, 0, s.size, 0, Math.PI * 2);
          break;
        case 'square':
          ctx.rect(-s.size / 2, -s.size / 2, s.size, s.size);
          break;
      }
      ctx.stroke();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);

      // Draw grid lines
      gridLines.forEach(line => {
        line.dashOffset += line.speed;
        ctx.setLineDash([4, 20]);
        ctx.lineDashOffset = -line.dashOffset;
        ctx.strokeStyle = `rgba(224, 224, 224, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, line.y);
        ctx.lineTo(w, line.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Draw shapes
      shapes.forEach(s => {
        s.rotation += s.rotSpeed;
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -100) s.x = w + 100;
        if (s.x > w + 100) s.x = -100;
        if (s.y < -100) s.y = h + 100;
        if (s.y > h + 100) s.y = -100;
        drawShape(s);
      });

      // Draw particles
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.fillStyle = `rgba(255, 69, 0, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ═══════════════════════════════════════════════════════════
     GRADIENT ORBS (injected CSS elements)
     ═══════════════════════════════════════════════════════════ */
  function injectGradientOrbs() {
    const orbData = [
      { cls: 'gradient-orb--1' },
      { cls: 'gradient-orb--2' },
      { cls: 'gradient-orb--3' },
    ];
    orbData.forEach(o => {
      const div = document.createElement('div');
      div.className = 'gradient-orb ' + o.cls;
      document.body.appendChild(div);
    });
  }

  /* ═══════════════════════════════════════════════════════════
     NAV SCROLL
     ═══════════════════════════════════════════════════════════ */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('nav--scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     HERO CANVAS — Geometric wireframe landscape
     ═══════════════════════════════════════════════════════════ */
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    let w, h, frame = 0;
    const nodes = [];
    const connections = [];

    function resize() {
      const rect = container.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      generateNodes();
    }

    function generateNodes() {
      nodes.length = 0;
      connections.length = 0;
      const count = 30;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: 0,
          baseY: 0,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 2 + Math.random() * 3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
      nodes.forEach(n => { n.baseX = n.x; n.baseY = n.y; });
    }

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Update nodes
      nodes.forEach(n => {
        n.x = n.baseX + Math.sin(frame * 0.008 + n.pulse) * 15;
        n.y = n.baseY + Math.cos(frame * 0.006 + n.pulse) * 10;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15;
            ctx.strokeStyle = `rgba(255, 69, 0, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const glow = 0.3 + Math.sin(frame * 0.02 + n.pulse) * 0.2;
        ctx.fillStyle = `rgba(255, 69, 0, ${glow})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.strokeStyle = `rgba(255, 69, 0, ${glow * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 4, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw a few floating hexagons
      for (let i = 0; i < 3; i++) {
        const cx = (w / 4) * (i + 1);
        const cy = h / 2 + Math.sin(frame * 0.01 + i * 2) * 30;
        const size = 30 + i * 10;
        const rot = frame * 0.003 + i;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = `rgba(255, 69, 0, 0.06)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const angle = (Math.PI / 3) * j - Math.PI / 6;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ═══════════════════════════════════════════════════════════
     FLOATING CARDS — Animated data
     ═══════════════════════════════════════════════════════════ */
  function initFloatingCards() {
    // Animate SOS count
    const sosEl = document.getElementById('active-sos');
    const meshEl = document.getElementById('mesh-nodes');
    const logEl = document.getElementById('triage-log');

    if (sosEl) {
      setInterval(() => {
        const val = 200 + Math.floor(Math.random() * 100);
        sosEl.textContent = val;
      }, 3000);
    }
    if (meshEl) {
      setInterval(() => {
        const val = 1200 + Math.floor(Math.random() * 200);
        meshEl.textContent = val.toLocaleString();
      }, 4000);
    }
    if (logEl) {
      const types = ['MEDICAL', 'FLOOD', 'FIRE', 'RESCUE', 'EVAC', 'SUPPLY', 'TYPHOON', 'QUAKE'];
      setInterval(() => {
        const id = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0');
        const pri = Math.floor(Math.random() * 3) + 1;
        const type = types[Math.floor(Math.random() * types.length)];
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `SOS-${id} → Priority ${pri} [${type}]`;
        entry.style.animation = 'fade-in-log 0.4s forwards';
        logEl.insertBefore(entry, logEl.firstChild);
        if (logEl.children.length > 5) logEl.removeChild(logEl.lastChild);
      }, 2500);
    }
  }

  /* ═══════════════════════════════════════════════════════════
     TRIAGE SIMULATION (Intelligence Engine)
     ═══════════════════════════════════════════════════════════ */
  function initTriageSimulation() {
    const submitBtn = document.getElementById('sim-submit-btn');
    if (!submitBtn) return;

    const submitOut = document.getElementById('t-submit-output');
    const summOut = document.getElementById('t-summarize-output');
    const rerankOut = document.getElementById('t-rerank-output');
    const whyDrawer = document.getElementById('why-drawer');
    const whyReasons = document.getElementById('why-reasons');

    let running = false;

    const scenarios = [
      {
        submit: '✓ SOS-2847 submitted | GPS: 14.5547°N, 121.0244°E | Type: Flood | Img: attached | Severity: HIGH',
        summary: '→ "Family of 5 trapped on roof, waist-deep water rising. Child needs medical attention. Nearest road impassable."',
        rank: '◆ PRIORITY 1 | Team: Boat-Alpha-7 | ETA: 12min | Resources: Medical + Evacuation',
        reasons: ['Life-threat detected (child medical)', 'Water level critical (waist-deep, rising)', 'Team Boat-Alpha-7 is closest (2.3km)', 'Medical kit available on unit'],
      },
      {
        submit: '✓ SOS-3102 submitted | GPS: 14.6293°N, 120.9820°E | Type: Earthquake | Img: attached | Severity: CRITICAL',
        summary: '→ "Building partially collapsed, 12 people trapped in ground floor. Gas leak reported. Structural integrity compromised."',
        rank: '◆ PRIORITY 1 | Team: USAR-Delta-3 | ETA: 18min | Resources: Heavy Rescue + HazMat',
        reasons: ['Multiple casualties risk', 'Gas leak hazard requires HazMat', 'Structural collapse specialist needed', 'USAR-Delta-3 has heavy equipment'],
      },
      {
        submit: '✓ SOS-4590 submitted | GPS: 14.4821°N, 121.1053°E | Type: Typhoon | Img: attached | Severity: MODERATE',
        summary: '→ "Roof blown off elementary school serving as evacuation center. 200+ evacuees exposed. No injuries yet."',
        rank: '◆ PRIORITY 2 | Team: Eng-Bravo-5 | ETA: 25min | Resources: Emergency Shelter + Tarps',
        reasons: ['No immediate life threat', 'Large population affected (200+)', 'Engineering team can deploy temp shelter', 'Weather window shows 3hr gap'],
      },
    ];

    submitBtn.addEventListener('click', async () => {
      if (running) return;
      running = true;
      submitBtn.disabled = true;

      const sc = scenarios[Math.floor(Math.random() * scenarios.length)];

      // Reset
      submitOut.textContent = 'Processing...';
      submitOut.style.color = '#a3a3a3';
      summOut.textContent = 'Waiting for report data...';
      summOut.style.color = '#a3a3a3';
      rerankOut.textContent = 'Waiting for AI summary...';
      rerankOut.style.color = '#a3a3a3';
      if (whyDrawer) whyDrawer.style.display = 'none';

      // Step 1
      await delay(800);
      submitOut.textContent = sc.submit;
      submitOut.style.color = '#22C55E';

      // Step 2
      await delay(1200);
      summOut.textContent = sc.summary;
      summOut.style.color = '#22C55E';

      // Step 3
      await delay(1500);
      rerankOut.textContent = sc.rank;
      rerankOut.style.color = '#FF4500';

      // Why drawer
      if (whyDrawer && whyReasons) {
        whyReasons.innerHTML = '';
        sc.reasons.forEach(r => {
          const li = document.createElement('li');
          li.textContent = r;
          whyReasons.appendChild(li);
        });
        whyDrawer.style.display = '';
      }

      await delay(500);
      submitBtn.disabled = false;
      running = false;
    });
  }

  /* ═══════════════════════════════════════════════════════════
     MESH DIAGRAM (canvas)
     ═══════════════════════════════════════════════════════════ */
  function initMeshDiagram() {
    const canvas = document.getElementById('mesh-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    let w, h, frame = 0;
    const nodes = [];

    function resize() {
      const rect = container.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      if (nodes.length === 0) generateNodes();
    }

    function generateNodes() {
      const roles = ['citizen', 'citizen', 'citizen', 'relay', 'relay', 'gateway'];
      const colors = {
        citizen: '#3B82F6',
        relay: '#FF4500',
        gateway: '#22C55E',
      };
      for (let i = 0; i < 20; i++) {
        const role = roles[Math.floor(Math.random() * roles.length)];
        nodes.push({
          x: 40 + Math.random() * (w - 80),
          y: 40 + Math.random() * (h - 80),
          role,
          color: colors[role],
          radius: role === 'gateway' ? 8 : role === 'relay' ? 6 : 4,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    }

    resize();
    window.addEventListener('resize', resize);

    // Signal animation
    const signals = [];
    setInterval(() => {
      if (nodes.length < 2) return;
      const from = nodes[Math.floor(Math.random() * nodes.length)];
      const to = nodes[Math.floor(Math.random() * nodes.length)];
      if (from === to) return;
      signals.push({ from, to, progress: 0 });
    }, 1200);

    function animate() {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(224, 224, 224, ${(1 - dist / 140) * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw signals
      signals.forEach((sig, idx) => {
        sig.progress += 0.015;
        if (sig.progress > 1) { signals.splice(idx, 1); return; }
        const x = sig.from.x + (sig.to.x - sig.from.x) * sig.progress;
        const y = sig.from.y + (sig.to.y - sig.from.y) * sig.progress;
        ctx.fillStyle = `rgba(255, 69, 0, ${1 - sig.progress})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach(n => {
        const glow = 0.6 + Math.sin(frame * 0.02 + n.pulse) * 0.3;
        // Glow
        ctx.fillStyle = n.color.replace(')', `, ${glow * 0.2})`).replace('rgb', 'rgba');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
        ctx.fill();
        // Node
        ctx.fillStyle = n.color;
        ctx.globalAlpha = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Legend
      const legend = [
        { label: 'Citizen', color: '#3B82F6' },
        { label: 'Relay', color: '#FF4500' },
        { label: 'Gateway', color: '#22C55E' },
      ];
      legend.forEach((l, i) => {
        const lx = 16;
        const ly = h - 60 + i * 20;
        ctx.fillStyle = l.color;
        ctx.beginPath();
        ctx.arc(lx, ly, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText(l.label, lx + 12, ly + 4);
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ═══════════════════════════════════════════════════════════
     CTA CANVAS — Animated geometric grid
     ═══════════════════════════════════════════════════════════ */
  function initCtaCanvas() {
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    let w, h, frame = 0;

    function resize() {
      const rect = container.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    function animate() {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Moving grid
      const spacing = 40;
      const offset = (frame * 0.3) % spacing;

      ctx.strokeStyle = 'rgba(255, 69, 0, 0.04)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = -spacing + offset; x < w + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      // Horizontal lines
      for (let y = -spacing + offset; y < h + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Floating circles
      for (let i = 0; i < 5; i++) {
        const cx = w * ((i + 1) / 6);
        const cy = h / 2 + Math.sin(frame * 0.008 + i * 1.5) * 30;
        const r = 15 + Math.sin(frame * 0.01 + i) * 5;
        ctx.strokeStyle = `rgba(255, 69, 0, ${0.05 + Math.sin(frame * 0.01 + i) * 0.03})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ═══════════════════════════════════════════════════════════
     PLATFORM MODALS
     ═══════════════════════════════════════════════════════════ */
  function initPlatformModals() {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    const closeBtn = document.getElementById('modal-close');
    if (!overlay || !content) return;

    const platformData = {
      citizen: {
        title: 'Citizen Portal',
        desc: 'ResQLink Citizen is the lifeline for every Filipino during disaster events. One-tap emergency reporting, real-time status tracking, and offline-first resilience.',
        features: [
          'One-tap SOS with automatic GPS location, photo capture, and severity assessment.',
          'Real-time status updates: see when help is dispatched, en-route, and arriving.',
          'Offline-first design: works without internet using BLE mesh communication.',
          'Preparedness tools: personalized checklists and evacuation route maps.',
          'Family safety: share status with loved ones even when towers are down.',
        ],
      },
      rescuer: {
        title: 'Rescuer Dashboard',
        desc: 'ResQLink Rescuer empowers volunteer and professional rescue teams with real-time mission coordination and self-assignment capabilities.',
        features: [
          'Mission queue with AI-prioritized SOS reports and severity indicators.',
          'Real-time GPS heatmap showing active emergencies and team positions.',
          'Self-assignment: accept missions based on your expertise (boat, medical, fire).',
          'Multi-team coordination: see what other teams are handling nearby.',
          'Offline sync: log activities in the field and sync when connectivity returns.',
        ],
      },
      lgu: {
        title: 'LGU Command Center',
        desc: 'The big-picture dashboard for Local Government Units. Coordinate multi-agency assets, track resource depletion, and make data-driven decisions.',
        features: [
          'Unified command view: all active SOS reports, team positions, and resource status.',
          'Multi-agency coordination: Police, Fire, Medical, BFP, NGO teams on one screen.',
          'Resource tracking: monitor supplies, equipment depletion, and resupply needs.',
          'Analytics dashboard: response times, coverage gaps, and performance metrics.',
          'RBAC access control: role-based views for mayors, DRRMO heads, and coordinators.',
        ],
      },
    };

    document.querySelectorAll('.platform-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.platform;
        const data = platformData[key];
        if (!data) return;
        content.innerHTML = `
          <h2>${data.title}</h2>
          <p>${data.desc}</p>
          <ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>
        `;
        overlay.style.display = 'flex';
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  }

  /* ═══════════════════════════════════════════════════════════
     APP MODAL
     ═══════════════════════════════════════════════════════════ */
  function initAppModal() {
    const btn = document.getElementById('get-app-btn');
    const overlay = document.getElementById('app-modal-overlay');
    const closeBtn = document.getElementById('app-modal-close');
    if (!btn || !overlay) return;

    btn.addEventListener('click', () => overlay.style.display = 'flex');
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.style.display = 'none');
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  }

  /* ═══════════════════════════════════════════════════════════
     WAITLIST
     ═══════════════════════════════════════════════════════════ */
  function initWaitlist() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        const btn = form.querySelector('button');
        btn.textContent = 'Joined!';
        btn.disabled = true;
        input.disabled = true;
        input.value = '';
        setTimeout(() => {
          btn.textContent = 'Join the Waitlist';
          btn.disabled = false;
          input.disabled = false;
        }, 3000);
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════
     IMPACT COUNTERS
     ═══════════════════════════════════════════════════════════ */
  function initImpactCounters() {
    const counters = document.querySelectorAll('.impact__number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCount(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCount(el, target) {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(target * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ═══════════════════════════════════════════════════════════
     SCROLL REVEAL
     ═══════════════════════════════════════════════════════════ */
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  /* ─── UTIL ─── */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})();
