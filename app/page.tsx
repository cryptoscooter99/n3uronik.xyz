"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Project = {
  number: string;
  title: string;
  discipline: string;
  description: string;
  tags: string[];
  href?: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "n3uronik",
    discipline: "Autonomous web systems",
    description:
      "An AI-operated studio pipeline that researches prospects, builds bespoke demos, runs outreach, and tracks every opportunity from signal to sale.",
    tags: ["AI automation", "WebGL", "Sales systems"],
    href: "#systems",
  },
  {
    number: "02",
    title: "Tip Doll",
    discipline: "Sound money interface",
    description:
      "A performer-first payment experience that turns a moment of audience attention into a direct, modern connection.",
    tags: ["Product", "Payments", "Identity"],
    href: "https://tipdoll.app",
  },
  {
    number: "03",
    title: "Karma Doll",
    discipline: "Live experience platform",
    description:
      "A cinematic EPK and booking engine built to move a six-piece New Orleans band from high-volume nightlife into premium private events.",
    tags: ["Music", "Multicam video", "Growth"],
    href: "https://karmadoll.band",
  },
  {
    number: "04",
    title: "Fleur Collective",
    discipline: "Resale operating system",
    description:
      "A lean multi-market resale operation with disciplined inventory, batch-level accounting, and channel-aware merchandising.",
    tags: ["Commerce", "Operations", "Data"],
  },
];

const systems = [
  {
    number: "01",
    title: "Prospect research",
    text: "Local-market discovery enriched with fit signals, decision context, and a clear reason to engage.",
  },
  {
    number: "02",
    title: "Demo generation",
    text: "Fast, business-specific websites built as proof—not promises—before the first sales conversation.",
  },
  {
    number: "03",
    title: "Human outreach",
    text: "Focused messaging, persistent follow-up, and enough context to keep automation from sounding automated.",
  },
  {
    number: "04",
    title: "Pipeline memory",
    text: "Every touch, response, next step, and handoff retained as an operating system for compounding sales.",
  },
];

function FlowField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      mount.classList.add("webgl-unavailable");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.62, 0.42) },
      uScroll: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(mount.clientWidth, mount.clientHeight),
      },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uMouse;
        uniform vec2 uResolution;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x),
            f.y
          );
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 5; i++) {
            value += amp * noise(p);
            p = mat2(1.7, 1.2, -1.2, 1.7) * p;
            amp *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / max(uResolution.y, 1.0);
          vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
          float t = uTime * 0.055 + uScroll * 0.08;

          float bend = sin(p.x * 1.45 - t) * 0.11;
          float center = -0.17 + p.x * 0.42 + bend;
          float d = abs(p.y - center);
          float n = fbm(vec2(p.x * 2.2 - t, p.y * 3.0 + t * 0.65));
          float warped = d + (n - 0.5) * 0.23;

          float ribbon = smoothstep(0.38, 0.018, warped);
          float filament = pow(
            max(0.0, sin((warped + n * 0.035) * 150.0)),
            18.0
          );
          float hair = pow(max(0.0, sin((warped - n * 0.02) * 265.0)), 34.0);
          float mouseGlow = exp(-distance(uv, uMouse) * 5.2) * 0.18;
          float fade = smoothstep(0.02, 0.25, uv.x) *
            smoothstep(0.0, 0.2, 1.0 - abs(uv.y - 0.5));

          vec3 cyan = vec3(0.03, 0.58, 1.0);
          vec3 violet = vec3(0.47, 0.16, 1.0);
          vec3 electric = mix(cyan, violet, smoothstep(0.2, 0.82, uv.x + n * 0.2));
          vec3 color = electric * (ribbon * 0.32 + filament * 0.8 + hair * 0.42);
          color += mix(cyan, violet, uv.x) * mouseGlow * ribbon;

          float stars = step(0.997, hash(floor(uv * uResolution.xy * 0.21 + t))) *
            ribbon * 1.8;
          color += electric * stars;
          float alpha = (ribbon * 0.35 + filament * 0.65 + hair * 0.28 + stars) * fade;
          gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.9));
        }
      `,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    let frame = 0;
    const start = performance.now();
    const render = (now: number) => {
      uniforms.uTime.value = reducedMotion ? 2.4 : (now - start) / 1000;
      uniforms.uScroll.value =
        window.scrollY / Math.max(window.innerHeight, 1);
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render(start);

    const onPointerMove = (event: PointerEvent) => {
      const target = new THREE.Vector2(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight,
      );
      uniforms.uMouse.value.lerp(target, 0.12);
    };
    const onResize = () => {
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      uniforms.uResolution.value.set(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      material.dispose();
      plane.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="flow-field" ref={mountRef} aria-hidden="true">
      <div className="flow-fallback">
        {Array.from({ length: 14 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
    </div>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={diagonal ? "arrow diagonal" : "arrow"}
    >
      <path d={diagonal ? "M6 18 18 6M9 6h9v9" : "M4 12h16M14 6l6 6-6 6"} />
    </svg>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState("01");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrollProgress(Math.min(1, window.scrollY / height));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div className="site-noise" aria-hidden="true" />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="n3uronik, home">
          n3uronik
        </a>
        <nav aria-label="Primary navigation">
          <a href="#index">Index</a>
          <a href="#systems">Systems</a>
          <a href="#experiments">Experiments</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="studio-status">
          <span />
          Independent studio — New Orleans
        </div>
      </header>

      <section className="hero" id="top">
        <FlowField />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">Portfolio / 2026</p>
          <h1>
            Independent systems,
            <br />
            interfaces, and live
            <br />
            experiences.
          </h1>
          <p className="hero-intro">
            A catalog of ventures, products, and experiments built across
            software, commerce, and performance.
          </p>
          <a className="text-cta" href="#index">
            <span className="cta-orbit">
              <Arrow />
            </span>
            <span>Explore the catalog</span>
          </a>
        </div>

        <div className="hero-meta" aria-hidden="true">
          <span className="meta-cross">+</span>
          <span>SYS/FLUX.26</span>
          <span>29.9511° N</span>
          <span>90.0715° W</span>
        </div>

        <div className="hero-index" aria-label="Featured work">
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.href ?? "#index"}
              target={project.href?.startsWith("http") ? "_blank" : undefined}
              rel={project.href?.startsWith("http") ? "noreferrer" : undefined}
              onMouseEnter={() => setActiveProject(project.number)}
              className={activeProject === project.number ? "active" : ""}
            >
              <span>{project.number}</span>
              <i />
              <strong>{project.title}</strong>
              <b />
            </a>
          ))}
        </div>
      </section>

      <section className="catalog section-shell" id="index">
        <div className="section-kicker">
          <span>Selected ventures</span>
          <span>04 active systems</span>
        </div>
        <div className="catalog-heading">
          <h2>Work built to move.</h2>
          <p>
            Each project is both a business and a laboratory—designed,
            operated, and refined in the real world.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              className="project-row"
              key={project.number}
              onMouseEnter={() => setActiveProject(project.number)}
            >
              <span className="project-number">{project.number}</span>
              <div className="project-title">
                <h3>{project.title}</h3>
                <span>{project.discipline}</span>
              </div>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              {project.href ? (
                <a
                  className="project-link"
                  href={project.href}
                  aria-label={`Open ${project.title}`}
                  target={project.href.startsWith("http") ? "_blank" : undefined}
                  rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Arrow diagonal />
                </a>
              ) : (
                <span className="project-link muted" aria-hidden="true">
                  <Arrow diagonal />
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="systems section-shell" id="systems">
        <div className="section-kicker">
          <span>n3uronik system</span>
          <span>Signal → proof → conversation → close</span>
        </div>
        <div className="systems-layout">
          <div className="systems-copy">
            <p className="eyebrow">Operating architecture</p>
            <h2>Four agents. One commercial loop.</h2>
            <p>
              n3uronik compresses the distance between finding a good local
              business and showing its owner what better could look like.
            </p>
          </div>
          <div className="system-steps">
            {systems.map((system) => (
              <article key={system.number}>
                <span>{system.number}</span>
                <h3>{system.title}</h3>
                <p>{system.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experiments section-shell" id="experiments">
        <div className="section-kicker">
          <span>Research log</span>
          <span>Open-ended by design</span>
        </div>
        <div className="experiment-grid">
          <article className="experiment-lead">
            <span className="eyebrow">Current fieldwork</span>
            <h2>Where code meets consequence.</h2>
            <p>
              Generative graphics, sovereign payment rails, performance
              systems, and small-business automation—all tested beyond the
              mockup.
            </p>
          </article>
          <article>
            <span>EXP.01</span>
            <h3>Generative space</h3>
            <p>Interactive fields and scroll-driven WebGL for the browser.</p>
          </article>
          <article>
            <span>EXP.02</span>
            <h3>Sound money</h3>
            <p>Direct digital value exchange for performers and audiences.</p>
          </article>
          <article>
            <span>EXP.03</span>
            <h3>Live systems</h3>
            <p>Stagecraft, media, and booking infrastructure as one product.</p>
          </article>
        </div>
      </section>

      <footer id="contact">
        <FlowField />
        <div className="footer-inner">
          <p className="eyebrow">Open channel / New Orleans</p>
          <h2>
            Bring a strange,
            <br />
            useful idea.
          </h2>
          <a className="footer-cta" href="mailto:hello@n3uronik.xyz">
            <span>hello@n3uronik.xyz</span>
            <Arrow diagonal />
          </a>
          <div className="footer-meta">
            <span>© 2026 n3uronik</span>
            <span>Independent systems studio</span>
            <a href="#top">Return to signal ↑</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
