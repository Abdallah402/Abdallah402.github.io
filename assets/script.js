/* ---------- Theme toggle (dark/light) ---------- */
function initTheme() {
  const saved = localStorage.getItem("theme");
  const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  const initial = saved || (systemPrefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", initial);

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

/* ---------- Rotating status pill (typewriter loop) ---------- */
const STATUS_MESSAGES = [
  "Automating invoice pipeline...",
  "Syncing ERP ↔ Shopify...",
  "Indexing documents for RAG...",
  "Deploying to production...",
];

function typeStatus() {
  const el = document.getElementById("status-typed");
  if (!el) return;
  let msgIdx = 0;

  function typeMsg() {
    const msg = STATUS_MESSAGES[msgIdx % STATUS_MESSAGES.length];
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      el.textContent = msg.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx >= msg.length) {
        clearInterval(typeInterval);
        setTimeout(eraseMsg, 1800);
      }
    }, 40);
  }

  function eraseMsg() {
    const msg = el.textContent;
    let charIdx = msg.length;
    const eraseInterval = setInterval(() => {
      el.textContent = msg.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx <= 0) {
        clearInterval(eraseInterval);
        msgIdx++;
        setTimeout(typeMsg, 300);
      }
    }, 22);
  }

  typeMsg();
}

/* ---------- Scroll-triggered reveals ---------- */
function initReveals() {
  const targets = document.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  targets.forEach((t) => io.observe(t));
}

/* ---------- Circuit-line ambient background ---------- */
function initCircuitCanvas() {
  const canvas = document.getElementById("circuit-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, nodes, pulses, stars;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }

  function buildGrid() {
    nodes = [];
    const cols = 7, rows = 5;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        nodes.push({
          x: (w / (cols - 1)) * i + (Math.random() - 0.5) * 40,
          y: (h / (rows - 1)) * j + (Math.random() - 0.5) * 40,
        });
      }
    }
    pulses = [];
    for (let i = 0; i < 10; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      pulses.push({ a, b, t: Math.random() });
    }
    stars = [];
    const starCount = Math.floor((w * h) / 28000);
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const isLight = currentTheme() === "light";
    const starColor = isLight ? "23, 27, 38" : "223, 231, 245";
    const lineColor = isLight ? "8, 145, 178" : "77, 238, 234";
    const pulseColor = isLight ? "124, 58, 237" : "167, 139, 250";

    const time = Date.now() / 1000;
    stars.forEach((s) => {
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 0.6 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${starColor}, ${twinkle * (isLight ? 0.5 : 0.7)})`;
      ctx.fill();
    });

    ctx.strokeStyle = `rgba(${lineColor}, ${isLight ? 0.08 : 0.06})`;
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < w / 5) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    if (!prefersReduced) {
      pulses.forEach((p) => {
        p.t += 0.003;
        if (p.t > 1) {
          p.t = 0;
          p.a = nodes[Math.floor(Math.random() * nodes.length)];
          p.b = nodes[Math.floor(Math.random() * nodes.length)];
        }
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pulseColor}, 0.9)`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }
  }

  resize();
  buildGrid();
  draw();
  window.addEventListener("resize", () => {
    resize();
    buildGrid();
    if (prefersReduced) draw();
  });
}

/* ---------- Pipeline signature animation (About section) ---------- */
function initPipelineSignature() {
  const svg = document.getElementById("pipeline-svg");
  if (!svg) return;
  const paths = svg.querySelectorAll(".pipe-path");
  paths.forEach((path, i) => {
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", "4");
    dot.setAttribute("class", "pipe-pulse");
    svg.appendChild(dot);
    const len = path.getTotalLength();
    let t = (i * 0.33) % 1;
    function animate() {
      t += 0.004;
      if (t > 1) t = 0;
      const pt = path.getPointAtLength(t * len);
      dot.setAttribute("cx", pt.x);
      dot.setAttribute("cy", pt.y);
      requestAnimationFrame(animate);
    }
    animate();
  });
}

/* ---------- Nav active state + smooth scroll ---------- */
function initNav() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  typeStatus();
  initReveals();
  initCircuitCanvas();
  initPipelineSignature();
  initNav();
});
