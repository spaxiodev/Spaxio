"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import "./scene.css";

gsap.registerPlugin(ScrollTrigger);

/* ════════════ Content ════════════ */
type Lang = "en" | "fr";

const COPY = {
  en: {
    heroTag: "Luxury Web Development",
    heroSub: "We build websites that look like a million bucks — at prices that make sense.",
    scrollHint: "Scroll to explore",
    aboutEyebrow: "— About the atelier",
    aboutTitle: "About",
    aboutBody: [
      "Founded in Montreal, 2026.",
      "One developer. Zero bloat.",
      "",
      "Obsessive attention to detail meets lean, efficient production.",
      "Luxury watchmaking precision — applied to web development.",
      "",
      "Stack: Next.js, React, Vercel, AI",
      "Clients across Canada & U.S.",
    ],
    svcEyebrow: "— Commissions",
    svcTitle: "What I Build",
    services: [
      { title: "Web Design & Dev", body: "Custom sites from scratch with Next.js. No templates — clean code, sharp design." },
      { title: "Launch & Support", body: "Deployed on Vercel with SMTP, analytics, and SEO baked in." },
    ],
    work: [
      { title: "Ciavaglia Timepieces", url: "https://ciavagliatimepieces.ca" },
      { title: "Spaxio Assistant", url: "https://www.spaxioassistant.com" },
    ],
    skillsEyebrow: "— Craft",
    skillsTitle: "Tech Stack",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "Vercel", "AI / LLM"],
    ctTitle: "New Message",
    ctHead: "Let's talk",
    ctSub: "— a quiet conversation",
    lName: "Name", lEmail: "Email", lPtype: "Project Type", lBudget: "Budget", lMsg: "What can I build for you?",
    btnSend: "Send Message", btnSending: "Sending…",
    projectTypes: ["Website", "E-commerce", "Landing page", "Redesign", "Other"],
    budgets: ["Under $2k", "$2k – $5k", "$5k – $10k", "$10k+", "Not sure yet"],
    sucH: "I'll be in touch", sucP: "Your message has landed on my desk.",
    labels: ["SPAXIO", "Full Stack Developer", "Welcome", "About", "What I Do", "Craft", "Let's Talk"],
  },
  fr: {
    heroTag: "Développement Web de Luxe",
    heroSub: "On crée des sites qui ont l'air d'un million — à des prix qui ont du sens.",
    scrollHint: "Défilez pour explorer",
    aboutEyebrow: "— L'atelier",
    aboutTitle: "À propos",
    aboutBody: [
      "Fondé à Montréal, 2026.",
      "Un développeur. Zéro surplus.",
      "",
      "Un souci obsessif du détail avec une production lean et efficace.",
      "Précision horlogère — appliquée au développement web.",
      "",
      "Stack: Next.js, React, Vercel, IA",
      "Clients au Canada et aux États-Unis.",
    ],
    svcEyebrow: "— Commissions",
    svcTitle: "Ce que je construis",
    services: [
      { title: "Design & développement", body: "Sites sur mesure avec Next.js. Pas de templates — du code propre, un design taillé." },
      { title: "Lancement & support", body: "Déployé sur Vercel avec SMTP, analytics et SEO intégrés." },
    ],
    work: [
      { title: "Ciavaglia Timepieces", url: "https://ciavagliatimepieces.ca" },
      { title: "Spaxio Assistant", url: "https://www.spaxioassistant.com" },
    ],
    skillsEyebrow: "— Métier",
    skillsTitle: "Technologies",
    skills: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Three.js", "Vercel", "IA / LLM"],
    ctTitle: "Nouveau message",
    ctHead: "Conversons",
    ctSub: "— à voix basse",
    lName: "Nom", lEmail: "Courriel", lPtype: "Type de projet", lBudget: "Budget", lMsg: "Que puis-je construire pour vous ?",
    btnSend: "Envoyer", btnSending: "Envoi…",
    projectTypes: ["Site web", "E-commerce", "Page d'atterrissage", "Redesign", "Autre"],
    budgets: ["Moins de 2k$", "2k$ – 5k$", "5k$ – 10k$", "10k$+", "Pas encore sûr"],
    sucH: "Je vous reviens bientôt", sucP: "Votre message est sur mon bureau.",
    labels: ["SPAXIO", "Développeur Full Stack", "Bienvenue", "À propos", "Ce que je fais", "Métier", "Conversons"],
  },
} as const;

/* ════════════ Procedural textures (Canvas based) ════════════ */
function makeCanvas(size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  return { c, ctx: c.getContext("2d")! };
}
function valueNoise(ctx: CanvasRenderingContext2D, size: number, scale: number, alpha = 0.4) {
  const img = ctx.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const n = Math.random();
      const v = 128 + (n - 0.5) * 255 * scale;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255 * alpha;
    }
  }
  ctx.putImageData(img, 0, 0);
}
function marbleTexture() {
  const { c, ctx } = makeCanvas(1024);
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, "#f2ede3");
  grad.addColorStop(0.5, "#ece6d8");
  grad.addColorStop(1, "#e6dfcf");
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 1024, 1024);
  for (let i = 0; i < 60; i++) {
    ctx.strokeStyle = `rgba(168,150,110,${0.08 + Math.random() * 0.14})`;
    ctx.lineWidth = 0.4 + Math.random() * 1.4;
    ctx.beginPath();
    let x = Math.random() * 1024, y = Math.random() * 1024;
    ctx.moveTo(x, y);
    const steps = 40 + Math.random() * 60;
    const dir = Math.random() * Math.PI * 2;
    for (let j = 0; j < steps; j++) {
      x += Math.cos(dir + Math.sin(j * 0.3) * 0.8) * 12;
      y += Math.sin(dir + Math.cos(j * 0.3) * 0.8) * 12;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  for (let i = 0; i < 1200; i++) {
    ctx.fillStyle = `rgba(${180 + Math.random() * 40},${165 + Math.random() * 40},${130 + Math.random() * 30},${0.04 + Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 1.5, 1.5);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function woodPlankTexture(base = "#6b3a1a", grain = "#3a1c0a", dark = "#2a1208") {
  const { c, ctx } = makeCanvas(1024);
  ctx.fillStyle = base; ctx.fillRect(0, 0, 1024, 1024);
  // grain lines
  for (let i = 0; i < 280; i++) {
    ctx.strokeStyle = `rgba(20,10,4,${0.05 + Math.random() * 0.12})`;
    ctx.lineWidth = 0.4 + Math.random() * 0.8;
    ctx.beginPath();
    const y = Math.random() * 1024;
    let x = 0;
    const amp = 6 + Math.random() * 20;
    const freq = 0.004 + Math.random() * 0.01;
    const phase = Math.random() * Math.PI * 2;
    ctx.moveTo(x, y);
    while (x < 1024) {
      x += 3;
      ctx.lineTo(x, y + Math.sin(x * freq + phase) * amp);
    }
    ctx.stroke();
  }
  // plank seams
  const plankH = 128;
  for (let y = 0; y < 1024; y += plankH) {
    ctx.strokeStyle = dark;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
    // random short vertical seams
    for (let k = 0; k < 3; k++) {
      const sx = Math.random() * 1024;
      ctx.beginPath(); ctx.moveTo(sx, y); ctx.lineTo(sx, y + plankH); ctx.stroke();
    }
  }
  // darker knots
  for (let i = 0; i < 12; i++) {
    const x = Math.random() * 1024, y = Math.random() * 1024, r = 6 + Math.random() * 10;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(20,10,4,0.9)");
    g.addColorStop(1, "rgba(20,10,4,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function grassTexture() {
  const { c, ctx } = makeCanvas(512);
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#617857"); g.addColorStop(1, "#55684b");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 8000; i++) {
    ctx.fillStyle = `rgba(${40 + Math.random() * 60},${70 + Math.random() * 70},${40 + Math.random() * 30},${0.35 + Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random(), 1 + Math.random() * 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(60, 60);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function stoneTexture() {
  const { c, ctx } = makeCanvas(512);
  ctx.fillStyle = "#d6cdba"; ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 3000; i++) {
    const v = 180 + Math.random() * 50;
    ctx.fillStyle = `rgba(${v},${v - 10},${v - 30},${0.2 + Math.random() * 0.3})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  // block lines
  for (let y = 0; y < 512; y += 64) {
    ctx.strokeStyle = "rgba(120,110,90,0.35)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(512, y); ctx.stroke();
  }
  for (let y = 0; y < 512; y += 64) {
    const offset = (y / 64) % 2 === 0 ? 0 : 32;
    for (let x = offset; x < 512; x += 64) {
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 64); ctx.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function rugTexture() {
  const { c, ctx } = makeCanvas(512);
  ctx.fillStyle = "#7a1818"; ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = `rgba(${100 + Math.random() * 60},${20 + Math.random() * 20},${20 + Math.random() * 20},${0.5 + Math.random() * 0.4})`;
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
  }
  ctx.strokeStyle = "#d4a030"; ctx.lineWidth = 4;
  ctx.strokeRect(12, 12, 488, 488);
  ctx.strokeStyle = "#c8902a"; ctx.lineWidth = 1.5;
  ctx.strokeRect(26, 26, 460, 460);
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = "rgba(200,150,40,0.55)";
    ctx.beginPath(); ctx.arc(256, 60 + i * 50, 10, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(60 + i * 50, 256, 10, 0, Math.PI * 2); ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}
function curtainTexture() {
  const { c, ctx } = makeCanvas(256);
  const g = ctx.createLinearGradient(0, 0, 256, 0);
  g.addColorStop(0, "#e8dcc4"); g.addColorStop(0.5, "#f4e8cc"); g.addColorStop(1, "#d8cab0");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 20; i++) {
    ctx.strokeStyle = `rgba(140,110,70,${0.08 + Math.random() * 0.1})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    const x = Math.random() * 256;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function paperTexture() {
  const { c, ctx } = makeCanvas(256);
  ctx.fillStyle = "#f5edd4"; ctx.fillRect(0, 0, 256, 256);
  valueNoise(ctx, 256, 0.15, 0.25);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function leatherTexture(color = "#1a1410") {
  const { c, ctx } = makeCanvas(512);
  ctx.fillStyle = color; ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 5000; i++) {
    const a = 0.08 + Math.random() * 0.14;
    ctx.fillStyle = `rgba(200,180,160,${a * 0.3})`;
    const x = Math.random() * 512, y = Math.random() * 512, r = 1 + Math.random() * 2;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = useMemo(() => COPY[lang], [lang]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [activeLabel, setActiveLabel] = useState<number | null>(null);
  const [opacities, setOpacities] = useState({ hero: 1, about: 0, services: 0, skills: 0, contact: 0 });
  const macbookRef = useRef<HTMLDivElement>(null);
  const screenMeshRef = useRef<THREE.Mesh | null>(null);

  const [form, setForm] = useState({ name: "", email: "", projectType: "", budget: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setFormError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setSent(true);
      else setFormError(data?.error || "Could not send — please email polidorispaxio@gmail.com");
    } catch {
      setFormError("Could not send — please email polidorispaxio@gmail.com");
    } finally { setSending(false); }
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const isMobile = window.innerWidth < 768;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0xcadaf0, 30, 150);
    scene.fog = fog;

    /* ── PMREM environment for PBR reflections ── */
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envScene = new RoomEnvironment();
    const envMap = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envMap;

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 18, 80);

    /* ── Post-processing ── */
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.18, // strength
      0.5,  // radius
      1.05  // threshold — only blows past pure white blooms
    );
    composer.addPass(bloom);
    if (!isMobile) composer.addPass(new SMAAPass());
    composer.addPass(new OutputPass());

    /* ── Textures ── */
    const texMarble = marbleTexture();
    const texOak = woodPlankTexture("#a8804a", "#6a4228", "#3a2414");
    const texWalnut = woodPlankTexture("#4a2f1a", "#26170a", "#18100a");
    const texMahogany = woodPlankTexture("#6b3a1a", "#3a1c0a", "#2a1208");
    const texParquet = woodPlankTexture("#3e2818", "#1c100a", "#0f0804");
    const texGrass = grassTexture();
    const texStone = stoneTexture();
    const texRug = rugTexture();
    const texCurtain = curtainTexture();
    const texPaper = paperTexture();
    const texLeatherBlack = leatherTexture("#1a1410");
    const texLeatherDark = leatherTexture("#2a1a20");

    texMarble.repeat.set(4, 4);
    texOak.repeat.set(6, 6);
    texWalnut.repeat.set(2, 4);
    texMahogany.repeat.set(2, 2);
    texParquet.repeat.set(6, 10);
    texStone.repeat.set(6, 3);

    /* ── Sky (gradient sphere) ── */
    const skyGeo = new THREE.SphereGeometry(200, 32, 20);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        top: { value: new THREE.Color(0x6b93c4) },
        horizon: { value: new THREE.Color(0xe5c890) },
        ground: { value: new THREE.Color(0x3d4858) },
        offset: { value: 0.35 },
      },
      vertexShader: `varying vec3 vWorldPos; void main(){ vec4 p = modelMatrix * vec4(position,1.0); vWorldPos = p.xyz; gl_Position = projectionMatrix * viewMatrix * p; }`,
      fragmentShader: `varying vec3 vWorldPos; uniform vec3 top; uniform vec3 horizon; uniform vec3 ground; uniform float offset;
        void main(){
          float h = normalize(vWorldPos).y;
          vec3 col;
          if (h > 0.0) col = mix(horizon, top, pow(h, offset));
          else col = mix(horizon, ground, pow(-h, 0.5));
          gl_FragColor = vec4(col, 1.0);
        }`,
      depthWrite: false,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat); scene.add(sky);

    // Sun glow sprite
    const sunCanvas = makeCanvas(256);
    const sctx = sunCanvas.ctx;
    const sg = sctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    sg.addColorStop(0, "rgba(255,240,200,1)");
    sg.addColorStop(0.3, "rgba(255,200,120,0.6)");
    sg.addColorStop(1, "rgba(255,200,120,0)");
    sctx.fillStyle = sg; sctx.fillRect(0, 0, 256, 256);
    const sunTex = new THREE.CanvasTexture(sunCanvas.c);
    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: sunTex, color: 0xffe8c0, depthWrite: false, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }));
    sunSprite.position.set(30, 50, -90); sunSprite.scale.set(14, 14, 1);
    scene.add(sunSprite);

    // Clouds
    for (let i = 0; i < 7; i++) {
      const cloud = new THREE.Mesh(
        new THREE.SphereGeometry(6 + Math.random() * 4, 10, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, fog: false })
      );
      cloud.position.set((Math.random() - 0.5) * 200, 45 + Math.random() * 15, -80 - Math.random() * 100);
      cloud.scale.y = 0.45; scene.add(cloud);
    }

    /* ── Lights ── */
    scene.add(new THREE.HemisphereLight(0xbcd0ee, 0x6a6256, 0.35));
    const sun = new THREE.DirectionalLight(0xfff0d0, 1.8);
    sun.position.set(35, 60, 40);
    sun.castShadow = true;
    sun.shadow.camera.left = -50; sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 60; sun.shadow.camera.bottom = -60;
    sun.shadow.camera.near = 1; sun.shadow.camera.far = 180;
    sun.shadow.mapSize.set(isMobile ? 1024 : 4096, isMobile ? 1024 : 4096);
    sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const skyFill = new THREE.DirectionalLight(0xaabbd8, 0.18);
    skyFill.position.set(-15, 12, -8); scene.add(skyFill);
    const bounce = new THREE.DirectionalLight(0xffe8cc, 0.08);
    bounce.position.set(0, -3, 15); scene.add(bounce);
    scene.environmentIntensity = 0.45;

    /* ── Materials (PBR) ── */
    const mat = {
      stone: new THREE.MeshStandardMaterial({ color: 0xe8dec8, roughness: 0.82, metalness: 0.0, map: texStone }),
      stoneLight: new THREE.MeshStandardMaterial({ color: 0xe8e4de, roughness: 0.65 }),
      stoneWarm: new THREE.MeshStandardMaterial({ color: 0xc8bfb0, roughness: 0.85 }),
      stoneDark: new THREE.MeshStandardMaterial({ color: 0xb8b0a0, roughness: 0.8 }),
      slate: new THREE.MeshStandardMaterial({ color: 0x433c36, roughness: 0.85 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0x9ab8cc, roughness: 0.05, metalness: 0.0, transmission: 0.6, ior: 1.5, transparent: true, opacity: 0.6, thickness: 0.3, envMapIntensity: 0.8 }),
      glassBright: new THREE.MeshPhysicalMaterial({ color: 0xcedcec, roughness: 0.05, metalness: 0.0, transmission: 0.4, ior: 1.5, transparent: true, opacity: 0.65, emissive: 0x6a8aaa, emissiveIntensity: 0.15, envMapIntensity: 0.9 }),
      frame: new THREE.MeshStandardMaterial({ color: 0xc8bfb4, roughness: 0.5 }),
      brass: new THREE.MeshStandardMaterial({ color: 0xa88628, roughness: 0.3, metalness: 0.9, envMapIntensity: 0.9 }),
      brassDark: new THREE.MeshStandardMaterial({ color: 0x8a6c20, metalness: 0.8, roughness: 0.3 }),
      lawn: new THREE.MeshStandardMaterial({ color: 0x6d8257, roughness: 0.95, map: texGrass }),
      drive: new THREE.MeshStandardMaterial({ color: 0xc8bfb0, roughness: 0.9 }),
      hedge: new THREE.MeshStandardMaterial({ color: 0x385a2a, roughness: 0.95 }),
      topiary: new THREE.MeshStandardMaterial({ color: 0x2d5a24, roughness: 0.95 }),
      trunk: new THREE.MeshStandardMaterial({ color: 0x3b2818, roughness: 0.9 }),
      foliage1: new THREE.MeshStandardMaterial({ color: 0x3d6b2e, roughness: 0.95 }),
      foliage2: new THREE.MeshStandardMaterial({ color: 0x4a7a38, roughness: 0.95 }),
      iron: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.85, roughness: 0.4, envMapIntensity: 0.8 }),
      marble: new THREE.MeshStandardMaterial({ color: 0xece8e0, roughness: 0.2, metalness: 0.0, map: texMarble, envMapIntensity: 0.7 }),
      wallCream: new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: 0.78 }),
      wallOffWhite: new THREE.MeshStandardMaterial({ color: 0xf4f0ea, roughness: 0.9 }),
      trim: new THREE.MeshStandardMaterial({ color: 0xd8d0c8, roughness: 0.6 }),
      oak: new THREE.MeshStandardMaterial({ color: 0xb0865a, roughness: 0.55, map: texOak }),
      oakDark: new THREE.MeshStandardMaterial({ color: 0x6b4c2a, roughness: 0.48, map: texOak }),
      walnut: new THREE.MeshStandardMaterial({ color: 0x2a1f14, roughness: 0.28, metalness: 0.05, map: texWalnut, envMapIntensity: 0.6 }),
      mahogany: new THREE.MeshStandardMaterial({ color: 0x6b3a1a, roughness: 0.2, metalness: 0.08, map: texMahogany, envMapIntensity: 0.8 }),
      walnutPanel: new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0.45, map: texWalnut }),
      parquet: new THREE.MeshStandardMaterial({ color: 0x4a3218, roughness: 0.3, metalness: 0.05, map: texParquet, envMapIntensity: 0.9 }),
      leather: new THREE.MeshStandardMaterial({ color: 0x14121a, roughness: 0.7, map: texLeatherDark }),
      leatherDesk: new THREE.MeshStandardMaterial({ color: 0x1a1410, roughness: 0.72, map: texLeatherBlack }),
      navy: new THREE.MeshStandardMaterial({ color: 0x2a3a4c, roughness: 0.88 }),
      navyLight: new THREE.MeshStandardMaterial({ color: 0x3a4a5c, roughness: 0.88 }),
      rug: new THREE.MeshStandardMaterial({ color: 0x7a1818, roughness: 0.9, map: texRug }),
      gold: new THREE.MeshStandardMaterial({ color: 0xa88628, metalness: 1, roughness: 0.3, envMapIntensity: 1.0 }),
      gold2: new THREE.MeshStandardMaterial({ color: 0x9a7c24, metalness: 0.95, roughness: 0.32, envMapIntensity: 0.9 }),
      mirror: new THREE.MeshStandardMaterial({ color: 0xc8ccd0, roughness: 0.08, metalness: 1.0, envMapIntensity: 1.2 }),
      silver: new THREE.MeshStandardMaterial({ color: 0xa8a8a8, roughness: 0.3, metalness: 0.9, envMapIntensity: 0.8 }),
      keyboard: new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 }),
      trackpad: new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.25, metalness: 0.5, envMapIntensity: 0.8 }),
      bezel: new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.9 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x4a6a8a, emissive: 0x5a7a9a, emissiveIntensity: 0.25, roughness: 0.3 }),
      chrome: new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1, roughness: 0.3, envMapIntensity: 0.9 }),
      charcoal: new THREE.MeshStandardMaterial({ color: 0x1a1a1f, roughness: 0.55 }),
      fire1: new THREE.MeshStandardMaterial({ color: 0xff7722, emissive: 0xff6622, emissiveIntensity: 1.2 }),
      fire2: new THREE.MeshStandardMaterial({ color: 0xffaa33, emissive: 0xffaa22, emissiveIntensity: 1.0 }),
      curtain: new THREE.MeshStandardMaterial({ color: 0xe8dcc4, roughness: 0.95, map: texCurtain, transparent: true, opacity: 0.75, side: THREE.DoubleSide }),
      lantern: new THREE.MeshStandardMaterial({ color: 0xf4dc9a, emissive: 0xf4dc9a, emissiveIntensity: 0.9, transparent: true, opacity: 0.9 }),
      bulb: new THREE.MeshStandardMaterial({ color: 0xfff2c0, emissive: 0xfff2c0, emissiveIntensity: 1.0 }),
      flower1: new THREE.MeshStandardMaterial({ color: 0xff9c9c, roughness: 0.8 }),
      flower2: new THREE.MeshStandardMaterial({ color: 0xf5c995, roughness: 0.8 }),
      paper: new THREE.MeshStandardMaterial({ color: 0xeee4c8, roughness: 0.95, map: texPaper }),
    };

    /* ════ EXTERIOR ════ */
    const ext = new THREE.Group(); scene.add(ext);
    const lawn = new THREE.Mesh(new THREE.PlaneGeometry(260, 260, 1, 1), mat.lawn);
    lawn.rotation.x = -Math.PI / 2; lawn.receiveShadow = true; ext.add(lawn);

    const drive = new THREE.Mesh(new THREE.PlaneGeometry(8, 44), mat.drive);
    drive.rotation.x = -Math.PI / 2; drive.position.set(0, 0.01, 28); drive.receiveShadow = true; ext.add(drive);

    // Flower beds (more varied)
    [-1, 1].forEach(s => {
      const bedMat = new THREE.MeshStandardMaterial({ color: 0x7a4a26, roughness: 0.95 });
      const bed = new THREE.Mesh(new THREE.PlaneGeometry(3, 8), bedMat);
      bed.rotation.x = -Math.PI / 2; bed.position.set(s * 6.5, 0.02, 12); ext.add(bed);
      for (let i = 0; i < 14; i++) {
        const col = [0xff6688, 0xffaa44, 0xffe088, 0xcc8866][Math.floor(Math.random() * 4)];
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), new THREE.MeshStandardMaterial({ color: col, roughness: 0.8 }));
        fl.position.set(s * 6.5 + (Math.random() - 0.5) * 2.5, 0.18, 8 + Math.random() * 8); ext.add(fl);
      }
    });

    const hedgeStrip = (x: number, z: number, len: number) => {
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.6, len, 1, 2, Math.floor(len)), mat.hedge);
      const pos = h.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 0.06);
      }
      pos.needsUpdate = true; h.geometry.computeVertexNormals();
      h.position.set(x, 0.8, z); h.castShadow = true; h.receiveShadow = true; ext.add(h);
    };
    hedgeStrip(-4.6, 28, 36); hedgeStrip(4.6, 28, 36);

    ([[-3, 7], [3, 7], [-3, 14], [3, 14]] as const).forEach(([x, z]) => {
      const tp = new THREE.Mesh(new THREE.SphereGeometry(0.65, 18, 14), mat.topiary);
      tp.position.set(x, 0.65, z); tp.castShadow = true; ext.add(tp);
    });

    [-1, 1].forEach(s => {
      const urn = new THREE.Mesh(new THREE.LatheGeometry([
        new THREE.Vector2(0.22, 0), new THREE.Vector2(0.32, 0.05), new THREE.Vector2(0.28, 0.2),
        new THREE.Vector2(0.3, 0.35), new THREE.Vector2(0.36, 0.55), new THREE.Vector2(0.3, 0.6),
      ], 16), mat.stoneDark);
      urn.position.set(s * 2.6, 0, 6); urn.castShadow = true; ext.add(urn);
      for (let i = 0; i < 6; i++) {
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), i % 2 ? mat.flower1 : mat.flower2);
        fl.position.set(s * 2.6 + (Math.random() - 0.5) * 0.3, 0.68 + Math.random() * 0.1, 6 + (Math.random() - 0.5) * 0.3);
        ext.add(fl);
      }
    });

    /* Gate with finials */
    const gate = new THREE.Group(); gate.position.set(0, 0, 50);
    [-1, 1].forEach(s => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5, 1.2), mat.stoneLight);
      p.position.set(s * 4.5, 2.5, 0); p.castShadow = true; gate.add(p);
      const f = new THREE.Mesh(new THREE.LatheGeometry([
        new THREE.Vector2(0.45, 0), new THREE.Vector2(0.5, 0.1), new THREE.Vector2(0.35, 0.2),
        new THREE.Vector2(0.5, 0.35), new THREE.Vector2(0.2, 0.5), new THREE.Vector2(0.05, 0.65),
      ], 12), mat.stoneLight);
      f.position.set(s * 4.5, 5.1, 0); f.castShadow = true; gate.add(f);
    });
    [-1, 1].forEach(s => {
      const panel = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.6, 0.08), mat.iron);
      panel.position.set(s * 1.95, 1.8, 0); panel.castShadow = true; gate.add(panel);
      for (let i = 0; i < 7; i++) {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.4, 8), mat.iron);
        b.position.set(s * (0.2 + i * 0.47), 1.8, 0); gate.add(b);
        // spear tops
        const st = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 8), mat.iron);
        st.position.set(s * (0.2 + i * 0.47), 3.6, 0); gate.add(st);
      }
    });
    const cross = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.15, 0.15), mat.iron);
    cross.position.set(0, 3.4, 0); gate.add(cross);
    // gold scrollwork medallion
    const med = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.04, 8, 20), mat.gold);
    med.position.set(0, 1.8, 0.1); gate.add(med);
    ext.add(gate);

    /* Fountain (lathe) */
    const fountain = new THREE.Group(); fountain.position.set(0, 0, 35);
    const fBase = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(1.7, 0), new THREE.Vector2(1.7, 0.25), new THREE.Vector2(1.5, 0.3),
      new THREE.Vector2(1.5, 0.4), new THREE.Vector2(1.2, 0.42),
    ], 28), mat.stoneDark);
    fBase.castShadow = true; fBase.receiveShadow = true; fountain.add(fBase);
    const fCol = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(0.16, 0.42), new THREE.Vector2(0.16, 0.55), new THREE.Vector2(0.22, 0.6),
      new THREE.Vector2(0.12, 0.62), new THREE.Vector2(0.12, 0.95), new THREE.Vector2(0.2, 1.0),
      new THREE.Vector2(0.08, 1.02),
    ], 20), mat.stoneDark);
    fountain.add(fCol);
    // water basin
    const basin = new THREE.Mesh(
      new THREE.CircleGeometry(1.4, 28),
      new THREE.MeshPhysicalMaterial({ color: 0xa8d0e8, roughness: 0.1, metalness: 0.0, transmission: 0.3, transparent: true, opacity: 0.75, envMapIntensity: 2 })
    );
    basin.rotation.x = -Math.PI / 2; basin.position.y = 0.38; fountain.add(basin);
    const fSpray = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), new THREE.MeshStandardMaterial({ color: 0xaaccff, emissive: 0x88aaff, emissiveIntensity: 0.8, transparent: true, opacity: 0.4 }));
    fSpray.position.y = 1.15; fountain.add(fSpray);
    // water droplets
    for (let i = 0; i < 14; i++) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), new THREE.MeshStandardMaterial({ color: 0xd8eaff, emissive: 0xa8c8ee, emissiveIntensity: 0.6, transparent: true, opacity: 0.7 }));
      const a = Math.random() * Math.PI * 2;
      d.position.set(Math.cos(a) * (0.4 + Math.random() * 0.6), 0.6 + Math.random() * 0.5, Math.sin(a) * (0.4 + Math.random() * 0.6));
      fountain.add(d);
    }
    ext.add(fountain);

    /* ════ MANSION EXTERIOR ════ */
    const mansion = new THREE.Group(); scene.add(mansion);
    const bodyDepth = 20;

    // Main body (with rustication texture)
    const body = new THREE.Mesh(new THREE.BoxGeometry(22, 14, bodyDepth), mat.stone);
    body.position.set(0, 7, -bodyDepth / 2); body.castShadow = true; body.receiveShadow = true; mansion.add(body);

    // Upper cornice (trim around top)
    const cornice = new THREE.Mesh(new THREE.BoxGeometry(23, 0.5, bodyDepth + 1), mat.stoneLight);
    cornice.position.set(0, 14.0, -bodyDepth / 2); cornice.castShadow = true; mansion.add(cornice);

    // Roof — mansard style with two levels
    const mainRoof = new THREE.Mesh(new THREE.BoxGeometry(23.5, 1.2, bodyDepth + 1.5), mat.slate);
    mainRoof.position.set(0, 14.9, -bodyDepth / 2); mainRoof.castShadow = true; mansion.add(mainRoof);
    const ridgeShape = new THREE.Shape();
    ridgeShape.moveTo(-10, 0); ridgeShape.lineTo(10, 0); ridgeShape.lineTo(7, 3.5); ridgeShape.lineTo(-7, 3.5); ridgeShape.lineTo(-10, 0);
    const ridge = new THREE.Mesh(new THREE.ExtrudeGeometry(ridgeShape, { depth: bodyDepth - 2, bevelEnabled: false }), mat.slate);
    ridge.position.set(0, 15.5, -bodyDepth / 2 + (bodyDepth - 2) / 2); ridge.rotation.y = Math.PI; ridge.castShadow = true; mansion.add(ridge);

    // Wings with dormers
    [-1, 1].forEach(s => {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(12, 10, 10), mat.stone);
      wing.position.set(s * 17, 5, -5); wing.castShadow = true; wing.receiveShadow = true; mansion.add(wing);
      const wingCornice = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.4, 10.5), mat.stoneLight);
      wingCornice.position.set(s * 17, 10.0, -5); mansion.add(wingCornice);
      const wingRoof = new THREE.Mesh(new THREE.BoxGeometry(13, 1, 10.5), mat.slate);
      wingRoof.position.set(s * 17, 10.75, -5); wingRoof.castShadow = true; mansion.add(wingRoof);
      for (let i = -1; i <= 1; i++) {
        const w = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.6), mat.glass);
        w.position.set(s * 22.99, 5.5, i * 3.2); w.rotation.y = s * Math.PI / 2; mansion.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.9, 1.7), mat.frame);
        fr.position.set(s * 23.01, 5.5, i * 3.2); mansion.add(fr);
        // window sill
        const sill = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 2.0), mat.stoneLight);
        sill.position.set(s * 23.0, 4.1, i * 3.2); mansion.add(sill);
      }
    });

    // Columns (fluted)
    for (let i = 0; i < 6; i++) {
      const x = -10 + i * 4;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 9.6, 24), mat.stoneLight);
      col.position.set(x, 5, 1.0); col.castShadow = true; col.receiveShadow = true; mansion.add(col);
      // flutes
      for (let f = 0; f < 12; f++) {
        const a = f / 12 * Math.PI * 2;
        const flute = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 9.5, 6), new THREE.MeshStandardMaterial({ color: 0xd6d0c4, roughness: 0.7 }));
        flute.position.set(x + Math.cos(a) * 0.28, 5, 1.0 + Math.sin(a) * 0.28); mansion.add(flute);
      }
      // Ionic-ish capital
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.55, 0.95), mat.stoneLight);
      cap.position.set(x, 10.1, 1.0); cap.castShadow = true; mansion.add(cap);
      const cap2 = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 1.1), mat.stoneLight);
      cap2.position.set(x, 10.48, 1.0); mansion.add(cap2);
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.35, 0.85), mat.stoneLight);
      base.position.set(x, 0.18, 1.0); mansion.add(base);
    }
    const ped = new THREE.Mesh(new THREE.BoxGeometry(22.5, 0.6, 1.3), mat.stoneLight);
    ped.position.set(0, 11.0, 1.0); ped.castShadow = true; mansion.add(ped);
    const pedTop = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 1.1), mat.stoneLight);
    pedTop.position.set(0, 11.8, 1.0); pedTop.castShadow = true; mansion.add(pedTop);

    // Arched windows on facade
    for (let row = 0; row < 2; row++) {
      for (let c = 0; c < 5; c++) {
        const x = -8 + c * 4;
        if (row === 0 && Math.abs(x) < 1.5) continue;
        const wy = row === 0 ? 3.2 : 8.0;
        // arched glass via ExtrudeGeometry
        const shape = new THREE.Shape();
        shape.moveTo(-0.75, -1.5);
        shape.lineTo(0.75, -1.5);
        shape.lineTo(0.75, 0.5);
        shape.absarc(0, 0.5, 0.75, 0, Math.PI, false);
        shape.lineTo(-0.75, -1.5);
        const glassMesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), mat.glass);
        glassMesh.position.set(x, wy, 0.08); mansion.add(glassMesh);
        const frameMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2 }), mat.frame);
        frameMesh.position.set(x, wy, -0.02); mansion.add(frameMesh);
        // interior glass (less transparent so facade reads at night)
        const interiorBack = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 3.0), new THREE.MeshStandardMaterial({ color: 0x22303a, roughness: 0.9 }));
        interiorBack.position.set(x, wy, -0.05); mansion.add(interiorBack);
        // mullions
        const m1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.04, 0.06), mat.frame);
        m1.position.set(x, wy, 0.1); mansion.add(m1);
        const m2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 3.0, 0.06), mat.frame);
        m2.position.set(x, wy, 0.1); mansion.add(m2);
        // sill
        const sill = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 0.24), mat.stoneLight);
        sill.position.set(x, wy - 1.6, 0.2); mansion.add(sill);
      }
    }

    // Balustrade
    for (let i = -10; i <= 10; i += 0.8) {
      const p = new THREE.Mesh(new THREE.LatheGeometry([
        new THREE.Vector2(0.1, 0), new THREE.Vector2(0.14, 0.2), new THREE.Vector2(0.08, 0.4),
        new THREE.Vector2(0.13, 0.6), new THREE.Vector2(0.08, 0.8),
      ], 8), mat.stoneLight);
      p.position.set(i, 12.4, 1.0); mansion.add(p);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(21.5, 0.2, 0.32), mat.stoneLight);
    rail.position.set(0, 13.3, 1.0); mansion.add(rail);

    // Chimneys
    [-1, 1].forEach(s => {
      const ch = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 1.6), mat.stone);
      ch.position.set(s * 6, 17.3, -7); ch.castShadow = true; mansion.add(ch);
      const chCap = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, 1.9), mat.slate);
      chCap.position.set(s * 6, 19.0, -7); mansion.add(chCap);
      const chPot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.5, 10), mat.stoneDark);
      chPot.position.set(s * 6 - 0.3, 19.4, -7); mansion.add(chPot);
      const chPot2 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.5, 10), mat.stoneDark);
      chPot2.position.set(s * 6 + 0.3, 19.4, -7); mansion.add(chPot2);
    });

    // Stone steps
    for (let i = 0; i < 4; i++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(7.6 - i * 0.6, 0.22, 1.3 - i * 0.1), mat.stoneLight);
      step.position.set(0, 0.11 + i * 0.22, 3.2 - i * 0.7); step.castShadow = true; step.receiveShadow = true; mansion.add(step);
    }

    // Front door (arched, with panels + knocker)
    const doorFrameShape = new THREE.Shape();
    doorFrameShape.moveTo(-1.4, -2.5); doorFrameShape.lineTo(1.4, -2.5);
    doorFrameShape.lineTo(1.4, 1.0); doorFrameShape.absarc(0, 1.0, 1.4, 0, Math.PI, false);
    doorFrameShape.lineTo(-1.4, -2.5);
    const doorFrame = new THREE.Mesh(new THREE.ExtrudeGeometry(doorFrameShape, { depth: 0.4, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 2 }), mat.stoneLight);
    doorFrame.position.set(0, 2.5, -0.1); mansion.add(doorFrame);

    const doorShape = new THREE.Shape();
    doorShape.moveTo(-1.15, -2.3); doorShape.lineTo(1.15, -2.3);
    doorShape.lineTo(1.15, 0.9); doorShape.absarc(0, 0.9, 1.15, 0, Math.PI, false);
    doorShape.lineTo(-1.15, -2.3);
    const door = new THREE.Mesh(new THREE.ExtrudeGeometry(doorShape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.03, bevelSegments: 1 }), mat.brassDark);
    door.position.set(0, 2.4, 0.25); mansion.add(door);
    // door panels
    [-1, 1].forEach(s => [-1, 1].forEach(v => {
      const pnl = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 0.02), new THREE.MeshStandardMaterial({ color: 0x6a5218, roughness: 0.4, metalness: 0.4 }));
      pnl.position.set(s * 0.5, 2.1 + v * 0.8, 0.34); mansion.add(pnl);
    }));
    // knocker
    const knocker = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 8, 16), mat.brass);
    knocker.position.set(0, 2.6, 0.36); mansion.add(knocker);
    [-1, 1].forEach(s => {
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 10), mat.brass);
      h.position.set(s * 0.85, 1.9, 0.36); mansion.add(h);
    });

    // Lanterns
    const lanternLights: THREE.PointLight[] = [];
    [-1, 1].forEach(s => {
      const g = new THREE.Group(); g.position.set(s * 2.6, 0, 1.8);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.6, 8), mat.stoneDark);
      post.position.y = 1.3; post.castShadow = true; g.add(post);
      const cage = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.8, 0.55), new THREE.MeshStandardMaterial({ color: 0xf4dc9a, emissive: 0xf4dc9a, emissiveIntensity: 0.7, transparent: true, opacity: 0.85, roughness: 0.4 }));
      cage.position.y = 2.9; g.add(cage);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.45, 4), mat.stoneDark);
      cap.position.y = 3.5; cap.rotation.y = Math.PI / 4; g.add(cap);
      const pl = new THREE.PointLight(0xfff2c8, 1.2, 8, 2);
      pl.position.y = 2.9; g.add(pl); lanternLights.push(pl);
      mansion.add(g);
    });

    // Trees (better silhouettes, more layered)
    const tree = (x: number, z: number, scl: number) => {
      const g = new THREE.Group(); g.position.set(x, 0, z);
      const trunkH = 3.2;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.38, trunkH, 10), mat.trunk);
      trunk.position.y = trunkH / 2; trunk.castShadow = true; g.add(trunk);
      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const r = 1.7 - i * 0.15;
        const y = trunkH + 0.2 + i * 0.6;
        const crown = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), i % 2 ? mat.foliage1 : mat.foliage2);
        crown.position.set((Math.random() - 0.5) * 0.5, y, (Math.random() - 0.5) * 0.5);
        crown.scale.set(1 + Math.random() * 0.2, 0.9, 1 + Math.random() * 0.2);
        crown.castShadow = true; g.add(crown);
      }
      g.scale.setScalar(scl); ext.add(g);
    };
    ([[-14, 22, 1.2], [14, 22, 1.3], [-20, 40, 1.4], [20, 40, 1.1], [-25, 12, 1.5], [25, 12, 1.4], [-30, -4, 1.3], [30, -4, 1.3], [-18, 62, 1.2], [18, 62, 1.2], [-35, 28, 1.4], [35, 28, 1.4]] as const).forEach(([x, z, s]) => tree(x, z, s));

    // interior shell (dark backdrop)
    const shell = new THREE.Mesh(new THREE.BoxGeometry(40, 20, 80), new THREE.MeshStandardMaterial({ color: 0x0a0806, side: THREE.BackSide, roughness: 1 }));
    shell.position.set(0, 8, -28); scene.add(shell);

    /* ════ FOYER ════ */
    const foyer = new THREE.Group(); scene.add(foyer);
    const foyerFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), mat.marble);
    foyerFloor.rotation.x = -Math.PI / 2; foyerFloor.position.set(0, 0.02, -7); foyerFloor.receiveShadow = true; foyer.add(foyerFloor);
    const foyerCeil = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), mat.wallOffWhite);
    foyerCeil.rotation.x = Math.PI / 2; foyerCeil.position.set(0, 5.5, -7); foyer.add(foyerCeil);
    // ceiling medallion
    const medallion = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.08, 10, 40), mat.trim);
    medallion.rotation.x = Math.PI / 2; medallion.position.set(0, 5.48, -7); foyer.add(medallion);
    [-1, 1].forEach(s => {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(12, 5.5), mat.wallCream);
      w.rotation.y = -s * Math.PI / 2; w.position.set(s * 6, 2.75, -7); foyer.add(w);
      const bb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 12), mat.trim);
      bb.position.set(s * 5.97, 0.15, -7); foyer.add(bb);
      // crown molding
      const cm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 12), mat.trim);
      cm.position.set(s * 5.95, 5.4, -7); foyer.add(cm);
    });
    const fBack = new THREE.Mesh(new THREE.PlaneGeometry(12, 5.5), mat.wallCream);
    fBack.position.set(0, 2.75, -13); foyer.add(fBack);
    const fOpen = new THREE.Mesh(new THREE.BoxGeometry(4, 3.8, 0.2), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    fOpen.position.set(0, 2.0, -12.95); foyer.add(fOpen);

    // Curved staircase using ShapeGeometry arc of steps
    [-1, 1].forEach(s => {
      const sg = new THREE.Group();
      const steps = 10;
      for (let i = 0; i < steps; i++) {
        const step = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.2, 0.55), new THREE.MeshStandardMaterial({ color: 0xd4cab8, roughness: 0.25, metalness: 0.02, map: texMarble }));
        const a = (i / steps) * 0.7 * s;
        const r = 3.8;
        step.position.set(s * 3.2 - Math.sin(a) * 0.5, 0.2 + i * 0.25, -8.6 + i * 0.45);
        step.rotation.y = -a;
        step.receiveShadow = true; step.castShadow = true; sg.add(step);
      }
      // railing
      for (let i = 0; i < 6; i++) {
        const p = new THREE.Mesh(new THREE.LatheGeometry([
          new THREE.Vector2(0.04, 0), new THREE.Vector2(0.06, 0.1), new THREE.Vector2(0.03, 0.2), new THREE.Vector2(0.06, 0.3), new THREE.Vector2(0.04, 1.0),
        ], 8), mat.walnut);
        p.position.set(s * 4.5, 0.6 + i * 0.4, -7.5 + i * 0.55); sg.add(p);
      }
      foyer.add(sg);
    });

    // Entry table
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.05, 32), mat.walnut);
    tableTop.position.set(0, 0.9, -12.5); tableTop.castShadow = true; foyer.add(tableTop);
    const tablePed = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(0.16, 0), new THREE.Vector2(0.22, 0.05), new THREE.Vector2(0.1, 0.25),
      new THREE.Vector2(0.13, 0.6), new THREE.Vector2(0.08, 0.85),
    ], 20), mat.walnut);
    tablePed.position.set(0, 0.0, -12.5); foyer.add(tablePed);

    // Vase + flowers
    const vase = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(0.06, 0), new THREE.Vector2(0.12, 0.05), new THREE.Vector2(0.15, 0.12),
      new THREE.Vector2(0.09, 0.22), new THREE.Vector2(0.1, 0.3),
    ], 18), new THREE.MeshPhysicalMaterial({ color: 0xf0ece4, roughness: 0.1, metalness: 0.0, transmission: 0.1, envMapIntensity: 1.5 }));
    vase.position.set(0, 0.95, -12.5); foyer.add(vase);
    for (let i = 0; i < 12; i++) {
      const f = new THREE.Mesh(new THREE.SphereGeometry(0.07 + Math.random() * 0.03, 10, 8), i % 2 ? mat.flower1 : mat.flower2);
      const a = i * 0.523; const r = 0.08 + Math.random() * 0.06;
      f.position.set(Math.cos(a) * r, 1.28 + Math.random() * 0.1, -12.5 + Math.sin(a) * r);
      foyer.add(f);
      // stems
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.25, 6), new THREE.MeshStandardMaterial({ color: 0x3a5a2a, roughness: 0.8 }));
      stem.position.set(Math.cos(a) * r, 1.15, -12.5 + Math.sin(a) * r);
      foyer.add(stem);
    }

    // Mirror + frame (ornate)
    const mirrorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.6, 1.6), mat.gold);
    mirrorFrame.position.set(-5.93, 2.6, -7); foyer.add(mirrorFrame);
    const mirror = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 2.25), mat.mirror);
    mirror.rotation.y = Math.PI / 2; mirror.position.set(-5.84, 2.6, -7); foyer.add(mirror);
    // ornate top flourish
    const flourish = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.05, 8, 16, Math.PI), mat.gold);
    flourish.rotation.y = Math.PI / 2; flourish.position.set(-5.9, 4.05, -7); foyer.add(flourish);

    // Chandelier (more detailed, multi-tier)
    const chand = new THREE.Group(); chand.position.set(0, 4.1, -7);
    const chChain = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4, 8), mat.brass);
    chChain.position.y = 0.8; chand.add(chChain);
    const chCore = new THREE.Mesh(new THREE.SphereGeometry(0.14, 18, 14), mat.brass);
    chand.add(chCore);
    const arms = 12;
    for (let r = 0; r < arms; r++) {
      const a = r / arms * Math.PI * 2;
      // arm (curved using tube)
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * 0.08, -0.02, Math.sin(a) * 0.08),
        new THREE.Vector3(Math.cos(a) * 0.35, 0.06, Math.sin(a) * 0.35),
        new THREE.Vector3(Math.cos(a) * 0.58, -0.12, Math.sin(a) * 0.58),
      ]);
      const armMesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 10, 0.015, 6, false), mat.brass);
      chand.add(armMesh);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), mat.bulb);
      bulb.position.set(Math.cos(a) * 0.58, -0.12, Math.sin(a) * 0.58);
      chand.add(bulb);
      // crystal drop
      const drop = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.16, 6), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.0, metalness: 0.0, ior: 1.5, transparent: true, opacity: 0.7, envMapIntensity: 2 }));
      drop.position.set(Math.cos(a) * 0.58, -0.26, Math.sin(a) * 0.58); chand.add(drop);
    }
    // lower tier
    for (let r = 0; r < 8; r++) {
      const a = r / 8 * Math.PI * 2;
      const drop = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 6), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.9, roughness: 0.0, metalness: 0.0, ior: 1.5, transparent: true, opacity: 0.7, envMapIntensity: 2 }));
      drop.position.set(Math.cos(a) * 0.35, -0.38, Math.sin(a) * 0.35); chand.add(drop);
    }
    const chLight = new THREE.PointLight(0xfff2b8, 0, 16, 2); chand.add(chLight);
    foyer.add(chand);
    const foyerLight1 = new THREE.PointLight(0xfff5e0, 0, 10, 2); foyerLight1.position.set(0, 3.5, -4); foyer.add(foyerLight1);
    const foyerLight2 = new THREE.PointLight(0xfff5e0, 0, 10, 2); foyerLight2.position.set(0, 3.5, -11); foyer.add(foyerLight2);

    /* ════ LIVING ROOM ════ */
    const living = new THREE.Group(); scene.add(living);
    const livFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), mat.oak);
    livFloor.rotation.x = -Math.PI / 2; livFloor.position.set(0, 0.02, -18.5); livFloor.receiveShadow = true; living.add(livFloor);
    const lCeil = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), mat.wallOffWhite);
    lCeil.rotation.x = Math.PI / 2; lCeil.position.set(0, 4.6, -18.5); living.add(lCeil);
    [-1, 1].forEach(s => {
      const cm = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 12), mat.trim);
      cm.position.set(s * 5.92, 4.5, -18.5); living.add(cm);
    });
    [-1, 1].forEach(s => {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(12, 4.6), mat.wallCream);
      w.rotation.y = -s * Math.PI / 2; w.position.set(s * 6, 2.3, -18.5); living.add(w);
      const bb = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 12), mat.trim);
      bb.position.set(s * 5.97, 0.1, -18.5); living.add(bb);
    });
    const lBack = new THREE.Mesh(new THREE.PlaneGeometry(12, 4.6), mat.wallCream);
    lBack.position.set(0, 2.3, -24.5); living.add(lBack);
    const lOpen = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.6, 0.2), new THREE.MeshBasicMaterial({ color: 0x120e08 }));
    lOpen.position.set(0, 1.8, -24.48); living.add(lOpen);

    // Fireplace with carved mantel
    const fp = new THREE.Group(); fp.position.set(5.2, 0, -17);
    const fpSurround = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.2, 2.6), mat.stoneWarm);
    fpSurround.position.set(0, 1.6, 0); fp.add(fpSurround);
    const fpOpening = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.7, 1.5), new THREE.MeshBasicMaterial({ color: 0x0a0604 }));
    fpOpening.position.set(-0.12, 1.0, 0); fp.add(fpOpening);
    const fpMantel = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.2, 3.0), mat.stoneWarm);
    fpMantel.position.set(0, 2.4, 0); fp.add(fpMantel);
    // carvings along top
    for (let k = 0; k < 5; k++) {
      const carv = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.18, 0.22), mat.stoneLight);
      carv.position.set(0.02, 2.15, -0.9 + k * 0.45); fp.add(carv);
    }
    // fire logs
    for (let i = 0; i < 3; i++) {
      const log = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 10), new THREE.MeshStandardMaterial({ color: 0x2a1408, roughness: 0.9 }));
      log.rotation.z = Math.PI / 2; log.position.set(-0.15, 0.35 + i * 0.08, (i - 1) * 0.15); fp.add(log);
    }
    // flames
    for (let i = 0; i < 5; i++) {
      const f = new THREE.Mesh(new THREE.ConeGeometry(0.08 - i * 0.01, 0.5 - i * 0.06, 8), i % 2 ? mat.fire1 : mat.fire2);
      f.position.set(-0.15, 0.55 + i * 0.06, (i - 2) * 0.12); fp.add(f);
    }
    const fpLight = new THREE.PointLight(0xff6622, 0, 10, 2); fpLight.position.set(-0.2, 1.0, 0); fp.add(fpLight);
    living.add(fp);

    // Sofa (Chesterfield-ish with tufting suggested by cushions)
    const sofa = new THREE.Group(); sofa.position.set(-4.6, 0, -17);
    const sofaBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.95, 3.2), mat.navy);
    sofaBody.position.set(0, 0.5, 0); sofaBody.castShadow = true; sofa.add(sofaBody);
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.28, 0.95), mat.navyLight);
      c.position.set(0.03, 0.86, -1.0 + i * 1.0); sofa.add(c);
    }
    for (let i = 0; i < 3; i++) {
      const c = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.9), mat.navyLight);
      c.position.set(-0.3, 1.2, -0.9 + i * 0.95); sofa.add(c);
    }
    [-1, 1].forEach(s => {
      const a = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.05, 0.35), mat.navy);
      a.position.set(0, 0.55, s * 1.7); sofa.add(a);
    });
    // throw pillows
    [-0.8, 0.7].forEach(z => {
      const pil = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.18, 0.55), new THREE.MeshStandardMaterial({ color: 0xb08030, roughness: 0.9 }));
      pil.position.set(0.15, 0.98, z); sofa.add(pil);
    });
    living.add(sofa);

    // Coffee table (marble top)
    const ct = new THREE.Group(); ct.position.set(-2.3, 0, -18);
    const ctTop = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.95), new THREE.MeshStandardMaterial({ color: 0xd8cab0, roughness: 0.15, metalness: 0.08, map: texMarble, envMapIntensity: 1.2 }));
    ctTop.position.y = 0.5; ctTop.castShadow = true; ct.add(ctTop);
    [-1, 1].forEach(sx => [-1, 1].forEach(sz => {
      const lg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.48, 8), mat.gold2);
      lg.position.set(sx * 0.82, 0.24, sz * 0.4); ct.add(lg);
    }));
    const bk = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.05, 0.23), new THREE.MeshStandardMaterial({ color: 0x5a2020, roughness: 0.7 }));
    bk.position.set(-0.3, 0.56, 0); ct.add(bk);
    const bk2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 0.2), new THREE.MeshStandardMaterial({ color: 0x1a3a5a, roughness: 0.7 }));
    bk2.position.set(-0.32, 0.61, 0.03); ct.add(bk2);
    living.add(ct);

    // Windows + volumetric beams
    const windowSpots: THREE.SpotLight[] = [];
    for (let i = 0; i < 2; i++) {
      const wx = -5.95, wz = -15.5 - i * 3;
      const wn = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.4), mat.glassBright);
      wn.rotation.y = Math.PI / 2; wn.position.set(wx + 0.02, 2.3, wz); living.add(wn);
      const fr = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.7, 1.9), mat.frame);
      fr.position.set(wx, 2.3, wz); living.add(fr);
      [-1, 1].forEach(s => {
        const cu = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 3.8, 6, 1), mat.curtain);
        const pos = cu.geometry.attributes.position;
        for (let j = 0; j < pos.count; j++) pos.setX(j, pos.getX(j) + Math.sin((j % 7) * 0.5) * 0.03);
        pos.needsUpdate = true;
        cu.rotation.y = Math.PI / 2; cu.position.set(wx + 0.08, 2.3, wz + s * 1.1); living.add(cu);
      });
      const sl = new THREE.SpotLight(0xffe8cc, 2.4, 14, Math.PI / 8, 0.5, 1);
      sl.position.set(wx - 0.8, 3.7, wz); sl.target.position.set(-1.5, 0.3, wz + 1);
      sl.castShadow = true; sl.shadow.mapSize.set(512, 512);
      living.add(sl); living.add(sl.target);
      windowSpots.push(sl);
      const beam = new THREE.Mesh(
        new THREE.PlaneGeometry(1.4, 5),
        new THREE.MeshBasicMaterial({ color: 0xffe2b0, transparent: true, opacity: 0.035, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
      );
      beam.position.set(wx + 1.8, 2.3, wz);
      beam.rotation.y = Math.PI / 2;
      beam.rotation.x = -0.3;
      living.add(beam);
    }

    // Art on back wall
    const art = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.2), new THREE.MeshStandardMaterial({ color: 0x6a4a28, emissive: 0x3a2814, emissiveIntensity: 0.25, roughness: 0.8 }));
    art.position.set(0, 2.8, -24.43); living.add(art);
    const artFrame = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.4, 0.08), mat.gold);
    artFrame.position.set(0, 2.8, -24.47); living.add(artFrame);

    // Side lamp
    const lampSide = new THREE.Group(); lampSide.position.set(-5.4, 0, -14);
    const lsBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.06, 14), mat.brass);
    lsBase.position.y = 0.03; lampSide.add(lsBase);
    const lsPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.6, 10), mat.brass);
    lsPole.position.y = 0.85; lampSide.add(lsPole);
    const lsShade = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.45, 20, 1, true), new THREE.MeshStandardMaterial({ color: 0xf4e5b8, roughness: 0.8, emissive: 0xcaa668, emissiveIntensity: 0.2, side: THREE.DoubleSide }));
    lsShade.position.y = 1.75; lampSide.add(lsShade);
    const lsLight = new THREE.PointLight(0xfff5cc, 0, 5, 2); lsLight.position.y = 1.7; lampSide.add(lsLight);
    living.add(lampSide);

    const lLight1 = new THREE.PointLight(0xfff5e0, 0, 9, 2); lLight1.position.set(0, 3.8, -16); living.add(lLight1);
    const lLight2 = new THREE.PointLight(0xfff5e0, 0, 9, 2); lLight2.position.set(0, 3.8, -22); living.add(lLight2);

    /* ════ LIBRARY ════ */
    const library = new THREE.Group(); scene.add(library);
    const libFloor = new THREE.Mesh(new THREE.PlaneGeometry(10, 14), mat.oakDark);
    libFloor.rotation.x = -Math.PI / 2; libFloor.position.set(0, 0.02, -31.5); libFloor.receiveShadow = true; library.add(libFloor);
    const rug = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 12), mat.rug);
    rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.03, -31.5); library.add(rug);
    const libCeil = new THREE.Mesh(new THREE.PlaneGeometry(10, 14), new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.9 }));
    libCeil.rotation.x = Math.PI / 2; libCeil.position.set(0, 3.8, -31.5); library.add(libCeil);
    for (let i = 0; i < 5; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(10, 0.15, 0.1), mat.walnut);
      b.position.set(0, 3.72, -25.5 - i * 2.5); library.add(b);
    }

    const bookshelfUnit = (x: number, z: number, facing: number) => {
      const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = facing * Math.PI / 2;
      const back = new THREE.Mesh(new THREE.BoxGeometry(2.0, 3.6, 0.08), mat.walnut);
      back.position.set(0, 1.8, 0); g.add(back);
      const side1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.6, 0.3), mat.walnut);
      side1.position.set(-0.99, 1.8, 0.16); g.add(side1);
      const side2 = side1.clone(); side2.position.x = 0.99; g.add(side2);
      for (let sIdx = 0; sIdx < 5; sIdx++) {
        const sh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.3), mat.walnut);
        sh.position.set(0, 0.4 + sIdx * 0.7, 0.15); g.add(sh);
        const colors = [0x6a1818, 0x2a3a6a, 0x5a4a1a, 0x3a1a1a, 0x2a5a3a, 0x6a5a2a, 0x4a1a4a, 0x1a3a5a, 0x5a3a1a, 0x3a2a1a];
        let bx = -0.95;
        while (bx < 0.9) {
          const bw = 0.07 + Math.random() * 0.06;
          const bh = 0.4 + Math.random() * 0.22;
          const bkM = new THREE.Mesh(
            new THREE.BoxGeometry(bw, bh, 0.2),
            new THREE.MeshStandardMaterial({
              color: colors[Math.floor(Math.random() * colors.length)],
              roughness: 0.55 + Math.random() * 0.2,
              metalness: Math.random() < 0.2 ? 0.4 : 0.0,
            })
          );
          bkM.position.set(bx + bw / 2, 0.43 + sIdx * 0.7 + bh / 2, 0.15);
          if (Math.random() < 0.15) bkM.rotation.z = (Math.random() - 0.5) * 0.3; // leaning
          g.add(bkM);
          bx += bw + 0.01;
        }
      }
      library.add(g);
    };
    for (let i = 0; i < 5; i++) {
      bookshelfUnit(-4.98, -26 - i * 2.2, 1);
      bookshelfUnit(4.98, -26 - i * 2.2, -1);
    }

    const sconceLights: THREE.PointLight[] = [];
    ([[-4.9, -27], [-4.9, -32], [-4.9, -37], [4.9, -27], [4.9, -32], [4.9, -37]] as const).forEach(([x, z]) => {
      const g = new THREE.Group(); g.position.set(x, 2.6, z);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.15, 0.08), mat.brass);
      g.add(back);
      const sh = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.25, 12, 1, true), new THREE.MeshStandardMaterial({ color: 0xf4d886, roughness: 0.7, emissive: 0xcc9a44, emissiveIntensity: 0.5, side: THREE.DoubleSide }));
      sh.position.set(x > 0 ? -0.1 : 0.1, 0, 0); g.add(sh);
      const pl = new THREE.PointLight(0xffcc66, 0, 4, 2); pl.position.set(x > 0 ? -0.15 : 0.15, 0, 0); g.add(pl);
      sconceLights.push(pl);
      library.add(g);
    });

    for (let i = 0; i < 3; i++) {
      const pf = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.3, 1.0), mat.gold);
      pf.position.set(-4.9, 2.3, -28 - i * 3.5); pf.rotation.y = Math.PI / 2; library.add(pf);
      const pp = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 1.05), new THREE.MeshStandardMaterial({ color: 0x7a6240 + i * 0x020804, roughness: 0.7, emissive: 0x2a1a08, emissiveIntensity: 0.3 }));
      pp.rotation.y = Math.PI / 2; pp.position.set(-4.85, 2.3, -28 - i * 3.5); library.add(pp);
    }

    const doorWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 3.8), mat.walnutPanel);
    doorWall.position.set(0, 1.9, -38.5); library.add(doorWall);
    const officeDoor = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.4, 0.1), mat.walnut);
    officeDoor.position.set(-0.15, 1.7, -38.35); officeDoor.rotation.y = 0.22; library.add(officeDoor);
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.1, 0.02), mat.brass);
    plate.position.set(-0.15, 2.4, -38.28); library.add(plate);
    const spill = new THREE.PointLight(0xffbc7a, 0, 6, 2); spill.position.set(0.3, 1.8, -39); library.add(spill);

    /* ════ OFFICE ════ */
    const office = new THREE.Group(); scene.add(office);
    const oFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 20), mat.parquet);
    oFloor.rotation.x = -Math.PI / 2; oFloor.position.set(0, 0.02, -48); oFloor.receiveShadow = true; office.add(oFloor);

    [-1, 1].forEach(s => {
      const w = new THREE.Mesh(new THREE.PlaneGeometry(20, 4), mat.walnutPanel);
      w.rotation.y = -s * Math.PI / 2; w.position.set(s * 6, 2, -48); office.add(w);
      const trimM = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 20), mat.gold2);
      trimM.position.set(s * 5.92, 3.4, -48); office.add(trimM);
      const baseTrim = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 20), mat.walnut);
      baseTrim.position.set(s * 5.94, 0.18, -48); office.add(baseTrim);
      // wainscoting
      for (let i = 0; i < 5; i++) {
        const wp = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.2, 3.5), mat.gold2);
        wp.position.set(s * 5.91, 1.0, -40 - i * 3.5); office.add(wp);
      }
    });

    const oBack = new THREE.Mesh(new THREE.PlaneGeometry(12, 4), mat.walnutPanel);
    oBack.position.set(0, 2, -57.5); office.add(oBack);
    const oWindow = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.6), mat.glassBright);
    oWindow.position.set(0, 2.3, -57.45); office.add(oWindow);
    const oWinFrame = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.9, 0.1), mat.frame);
    oWinFrame.position.set(0, 2.3, -57.48); office.add(oWinFrame);
    const wmH = new THREE.Mesh(new THREE.BoxGeometry(5, 0.06, 0.1), mat.frame);
    wmH.position.set(0, 2.3, -57.42); office.add(wmH);
    const wmV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.6, 0.1), mat.frame);
    wmV.position.set(0, 2.3, -57.42); office.add(wmV);

    const oCeil = new THREE.Mesh(new THREE.PlaneGeometry(12, 20), new THREE.MeshStandardMaterial({ color: 0x1a1208, roughness: 0.9 }));
    oCeil.rotation.x = Math.PI / 2; oCeil.position.set(0, 3.6, -48); office.add(oCeil);
    for (let i = 0; i < 5; i++) {
      for (let j = -1; j <= 1; j += 2) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 3.5), mat.walnut);
        b.position.set(j * 2.5, 3.54, -40 - i * 3.5); office.add(b);
      }
      const bh = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.15, 0.1), mat.walnut);
      bh.position.set(0, 3.54, -40 - i * 3.5); office.add(bh);
    }

    const ws = new THREE.SpotLight(0xd8eaff, 3.5, 18, Math.PI / 6, 0.4, 1);
    ws.position.set(0, 3.2, -58); ws.target.position.set(0, 0.5, -52);
    ws.castShadow = true; ws.shadow.mapSize.set(1024, 1024);
    office.add(ws); office.add(ws.target);

    // Office volumetric beam
    const officeBeam = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 6),
      new THREE.MeshBasicMaterial({ color: 0xd8eaff, transparent: true, opacity: 0.045, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })
    );
    officeBeam.position.set(0, 2.3, -56);
    officeBeam.rotation.x = -0.5;
    office.add(officeBeam);

    /* Desk */
    const desk = new THREE.Group(); desk.position.set(0, 0, -54); office.add(desk);
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.08, 1.35, 2, 1, 1), mat.mahogany);
    deskTop.position.set(0, 0.78, 0); deskTop.castShadow = true; deskTop.receiveShadow = true; desk.add(deskTop);
    // inlay trim
    const inlay = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.001, 1.15), new THREE.MeshStandardMaterial({ color: 0xc8a030, metalness: 1, roughness: 0.3 }));
    inlay.position.set(0, 0.82, 0); desk.add(inlay);
    // sides/pedestals (full boxes for storage look)
    [-1, 1].forEach(s => {
      const ped = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.74, 1.3), mat.mahogany);
      ped.position.set(s * 1.1, 0.37, 0); ped.castShadow = true; desk.add(ped);
      for (let i = 0; i < 3; i++) {
        const dr = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.2, 0.02), mat.mahogany);
        dr.position.set(s * 1.1, 0.6 - i * 0.22, 0.66); desk.add(dr);
        const hd = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.012, 8, 16), mat.brass);
        hd.rotation.x = Math.PI / 2; hd.position.set(s * 1.1, 0.6 - i * 0.22, 0.69); desk.add(hd);
      }
    });
    // desk mat (leather blotter)
    const deskMat = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.85), mat.leatherDesk);
    deskMat.rotation.x = -Math.PI / 2; deskMat.position.set(0, 0.822, 0.05); desk.add(deskMat);
    const blotterTrim = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.01, 0.03), mat.gold2);
    blotterTrim.position.set(0, 0.822, 0.47); desk.add(blotterTrim);
    const blotterTrim2 = blotterTrim.clone(); blotterTrim2.position.z = -0.37; desk.add(blotterTrim2);

    // Crystal paperweight
    const cpw = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08), new THREE.MeshPhysicalMaterial({ color: 0xf0f6fa, roughness: 0.0, metalness: 0.0, transmission: 0.95, ior: 1.5, thickness: 0.1, envMapIntensity: 2 }));
    cpw.position.set(-0.9, 0.88, -0.3); desk.add(cpw);
    // Fountain pen
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.16, 12), mat.brass);
    pen.rotation.z = Math.PI / 2 + 0.3; pen.position.set(-0.7, 0.83, -0.4); desk.add(pen);
    const penTip = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.02, 8), new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.3 }));
    penTip.rotation.z = -Math.PI / 2 - 0.3; penTip.position.set(-0.62, 0.835, -0.38); desk.add(penTip);
    // Papers
    for (let k = 0; k < 3; k++) {
      const papers = new THREE.Mesh(new THREE.BoxGeometry(0.38 - k * 0.01, 0.008, 0.27 - k * 0.01), mat.paper);
      papers.position.set(-1.0 + k * 0.01, 0.828 + k * 0.009, 0.2 + k * 0.008); papers.rotation.y = (k - 1) * 0.04; desk.add(papers);
    }
    // Whisky glass
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.1, 18, 1, false),
      new THREE.MeshPhysicalMaterial({ color: 0xf0f6fa, roughness: 0.05, metalness: 0.0, transmission: 0.9, ior: 1.5, thickness: 0.05, transparent: true, opacity: 0.5, envMapIntensity: 2 }));
    glass.position.set(1.0, 0.87, 0.1); desk.add(glass);
    const whiskyLiquid = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.036, 0.05, 16), new THREE.MeshStandardMaterial({ color: 0xcc8222, transparent: true, opacity: 0.8, roughness: 0.1 }));
    whiskyLiquid.position.set(1.0, 0.85, 0.1); desk.add(whiskyLiquid);

    /* Desk lamp */
    const lamp = new THREE.Group(); lamp.position.set(-1.1, 0.81, -0.45);
    const lBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.05, 24), mat.brass);
    lBase.position.y = 0.025; lamp.add(lBase);
    const lPole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5, 12), mat.brass);
    lPole.position.y = 0.3; lamp.add(lPole);
    const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.03, 0.03), mat.brass);
    lArm.position.set(0.1, 0.56, 0); lArm.rotation.z = -0.2; lamp.add(lArm);
    const lShade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 22, 1, true),
      new THREE.MeshStandardMaterial({ color: 0xe8d9a8, roughness: 0.65, side: THREE.DoubleSide, emissive: 0xcaa668, emissiveIntensity: 0.25 }));
    lShade.position.set(0.24, 0.52, 0); lShade.rotation.z = -0.1; lamp.add(lShade);
    const lInner = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.22), new THREE.MeshStandardMaterial({ color: 0xfff5cc, emissive: 0xfff5cc, emissiveIntensity: 0.9 }));
    lInner.rotation.x = Math.PI / 2; lInner.position.set(0.24, 0.42, 0); lamp.add(lInner);
    const lampLight = new THREE.PointLight(0xfff5cc, 0, 4, 2); lampLight.position.set(0.24, 0.42, 0); lamp.add(lampLight);
    desk.add(lamp);

    /* Laptop (more detailed) */
    const laptop = new THREE.Group(); laptop.position.set(0.1, 0.82, 0.1);
    const lapBase = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.022, 0.64), mat.silver);
    lapBase.position.y = 0.011; laptop.add(lapBase);
    // key area recess
    const keyArea = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.005, 0.36), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 }));
    keyArea.position.set(0, 0.023, -0.08); laptop.add(keyArea);
    // individual keys (suggested)
    for (let r = 0; r < 4; r++) {
      for (let k = 0; k < 14; k++) {
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.003, 0.052), new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.55 }));
        key.position.set(-0.37 + k * 0.057, 0.028, -0.2 + r * 0.08); laptop.add(key);
      }
    }
    const tp = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.24), mat.trackpad);
    tp.rotation.x = -Math.PI / 2; tp.position.set(0, 0.023, 0.2); laptop.add(tp);
    // lid
    const lid = new THREE.Group();
    lid.position.set(0, 0.022, -0.32);
    lid.rotation.x = -Math.PI / 2 + 0.28;
    const lidBack = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.018, 0.6), mat.silver);
    lidBack.position.set(0, 0.3, 0.3); lid.add(lidBack);
    const apple = new THREE.Mesh(new THREE.CircleGeometry(0.03, 20), new THREE.MeshStandardMaterial({ color: 0xc0c0c0, emissive: 0x99bbdd, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.3 }));
    apple.rotation.y = Math.PI; apple.position.set(0, 0.309, 0.3); lid.add(apple);
    const bz = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.006, 0.56), mat.bezel);
    bz.position.set(0, 0.3, 0.3); lid.add(bz);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.84, 0.52), mat.screen);
    screen.rotation.x = Math.PI / 2; screen.position.set(0, 0.305, 0.3); lid.add(screen);
    screenMeshRef.current = screen;
    const notch = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.008, 0.03), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    notch.position.set(0, 0.305, 0.02); lid.add(notch);
    laptop.add(lid);
    const screenLight = new THREE.PointLight(0xaaccff, 0, 3, 2); screenLight.position.set(0, 0.6, 0.05); laptop.add(screenLight);
    desk.add(laptop);

    /* Chair */
    const chair = new THREE.Group(); chair.position.set(0, 0, -55.6);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.14, 0.75), mat.leather); seat.position.y = 0.58; seat.castShadow = true; chair.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1.1, 0.15), mat.leather); back.position.set(0, 1.15, -0.32); back.castShadow = true; chair.add(back);
    // tufted buttons on back (suggested)
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
      const btn = new THREE.Mesh(new THREE.SphereGeometry(0.015, 8, 6), mat.gold2);
      btn.position.set(-0.2 + j * 0.4, 0.85 + i * 0.3, -0.24); chair.add(btn);
    }
    [-1, 1].forEach(s => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.28, 0.55), mat.charcoal);
      arm.position.set(s * 0.42, 0.8, -0.05); chair.add(arm);
    });
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.48, 12), mat.chrome); col.position.y = 0.3; chair.add(col);
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.38), mat.chrome);
      spoke.position.set(Math.cos(a) * 0.2, 0.05, Math.sin(a) * 0.2); spoke.rotation.y = -a; chair.add(spoke);
      const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), mat.charcoal);
      wheel.position.set(Math.cos(a) * 0.38, 0.045, Math.sin(a) * 0.38); chair.add(wheel);
    }
    office.add(chair);

    /* Office accessories */
    const obs = new THREE.Group(); obs.position.set(-5.8, 0, -46);
    const obsBack = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 3), mat.walnut); obsBack.position.set(0, 1.2, 0); obs.add(obsBack);
    for (let s = 0; s < 4; s++) {
      const sh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 3), mat.walnut); sh.position.set(0.15, 0.4 + s * 0.6, 0); obs.add(sh);
      const bkCols = [0x6a1818, 0x2a3a6a, 0x5a4a1a, 0x4a2828, 0x3a5a3a];
      let bx = -1.4;
      while (bx < 1.4) {
        const bw = 0.09 + Math.random() * 0.05, bh = 0.35 + Math.random() * 0.15;
        const bkM = new THREE.Mesh(new THREE.BoxGeometry(0.2, bh, bw), new THREE.MeshStandardMaterial({ color: bkCols[Math.floor(Math.random() * bkCols.length)], roughness: 0.6 }));
        bkM.position.set(0.2, 0.42 + s * 0.6 + bh / 2, bx + bw / 2); obs.add(bkM);
        bx += bw + 0.01;
      }
    }
    office.add(obs);

    const globe = new THREE.Group(); globe.position.set(4.5, 0, -46);
    const gStand = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(0.15, 0), new THREE.Vector2(0.2, 0.03), new THREE.Vector2(0.06, 0.1),
      new THREE.Vector2(0.06, 0.55), new THREE.Vector2(0.08, 0.6), new THREE.Vector2(0.06, 0.65),
    ], 14), mat.walnut);
    globe.add(gStand);
    const gSphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 18), new THREE.MeshStandardMaterial({ color: 0x3a5888, roughness: 0.7 })); gSphere.position.y = 1.0; globe.add(gSphere);
    for (let i = 0; i < 8; i++) {
      const land = new THREE.Mesh(new THREE.SphereGeometry(0.08 + Math.random() * 0.06, 10, 8), new THREE.MeshStandardMaterial({ color: 0x4a8a44, roughness: 0.7 }));
      const a = Math.random() * Math.PI * 2, bb = (Math.random() - 0.5) * Math.PI;
      land.position.set(Math.cos(bb) * Math.cos(a) * 0.3, 1.0 + Math.sin(bb) * 0.3, Math.cos(bb) * Math.sin(a) * 0.3);
      land.scale.set(1 + Math.random() * 0.6, 0.6, 1 + Math.random() * 0.6); globe.add(land);
    }
    office.add(globe);

    for (let i = 0; i < 3; i++) {
      const af = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.75, 0.95), mat.gold);
      af.position.set(5.95, 2.2, -42 - i * 2.2); office.add(af);
      const ap = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.55), mat.paper);
      ap.rotation.y = -Math.PI / 2; ap.position.set(5.91, 2.2, -42 - i * 2.2); office.add(ap);
    }

    for (let i = 0; i < 3; i++) {
      const lbCol = [0x4a2020, 0x2a3a5a, 0x5a3a1a];
      const lb = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.055, 0.34), new THREE.MeshStandardMaterial({ color: lbCol[i], roughness: 0.5 }));
      lb.position.set(1.1, 0.83 + i * 0.055, -0.35); desk.add(lb);
    }

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.1, 14), new THREE.MeshStandardMaterial({ color: 0xc8b090, roughness: 0.9 }));
    pot.position.set(0.9, 0.87, 0.38); desk.add(pot);
    for (let i = 0; i < 7; i++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.03 + Math.random() * 0.018, 8, 6), new THREE.MeshStandardMaterial({ color: 0x3a6a3a, roughness: 0.75 }));
      leaf.position.set(0.9 + (Math.random() - 0.5) * 0.07, 0.94 + Math.random() * 0.04, 0.38 + (Math.random() - 0.5) * 0.07);
      desk.add(leaf);
    }

    const st = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.45, 0.55), mat.walnut); st.position.set(-4.6, 0.225, -50); st.castShadow = true; office.add(st);
    const decanter = new THREE.Mesh(new THREE.LatheGeometry([
      new THREE.Vector2(0.02, 0), new THREE.Vector2(0.1, 0.03), new THREE.Vector2(0.12, 0.12),
      new THREE.Vector2(0.09, 0.2), new THREE.Vector2(0.03, 0.25), new THREE.Vector2(0.035, 0.3),
    ], 20), new THREE.MeshPhysicalMaterial({ color: 0xcc8822, roughness: 0.05, metalness: 0.0, transmission: 0.85, ior: 1.45, thickness: 0.1, transparent: true, opacity: 0.85, envMapIntensity: 2 }));
    decanter.position.set(-4.6, 0.48, -50); office.add(decanter);

    for (let i = 0; i < 4; i++) {
      const rp = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshStandardMaterial({ color: 0xfff5cc, emissive: 0xfff5cc, emissiveIntensity: 0.7 }));
      rp.rotation.x = Math.PI / 2; rp.position.set(0, 3.55, -42 - i * 4); office.add(rp);
    }
    const officeFill = new THREE.PointLight(0xffe8c0, 0, 10, 2); officeFill.position.set(0, 3, -48); office.add(officeFill);
    const officeFill2 = new THREE.PointLight(0xffe8c0, 0, 10, 2); officeFill2.position.set(0, 3, -52); office.add(officeFill2);

    /* Dust motes in office */
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = isMobile ? 60 : 160;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 1] = Math.random() * 3 + 0.5;
      dustPos[i * 3 + 2] = -42 - Math.random() * 14;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xffeac0, size: 0.022, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    const dust = new THREE.Points(dustGeo, dustMat); office.add(dust);

    /* Camera journey */
    const cam = [
      { t: 0.00, pos: [0, 18, 80] as const, look: [0, 8, 0] as const },
      { t: 0.12, pos: [0, 4, 45] as const, look: [0, 5, 10] as const },
      { t: 0.25, pos: [0, 2.8, 8] as const, look: [0, 2.5, 0] as const },
      { t: 0.38, pos: [0, 2.2, -4] as const, look: [0, 2.0, -12] as const },
      { t: 0.50, pos: [-2, 1.8, -16] as const, look: [0, 1.6, -22] as const },
      { t: 0.63, pos: [0, 1.7, -28] as const, look: [0, 1.6, -38] as const },
      { t: 0.76, pos: [0, 1.65, -40] as const, look: [0, 1.5, -50] as const },
      { t: 0.88, pos: [0, 1.55, -50] as const, look: [0, 1.1, -54] as const },
      { t: 1.00, pos: [0, 0.95, -53.2] as const, look: [0, 0.78, -54.0] as const },
    ];
    const sampleJourney = (tt: number) => {
      let i = 0;
      while (i < cam.length - 2 && tt > cam[i + 1].t) i++;
      const a = cam[i], b = cam[i + 1];
      const u = Math.max(0, Math.min(1, (tt - a.t) / (b.t - a.t)));
      const k = u * u * (3 - 2 * u);
      return {
        pos: [a.pos[0] + (b.pos[0] - a.pos[0]) * k, a.pos[1] + (b.pos[1] - a.pos[1]) * k, a.pos[2] + (b.pos[2] - a.pos[2]) * k] as [number, number, number],
        look: [a.look[0] + (b.look[0] - a.look[0]) * k, a.look[1] + (b.look[1] - a.look[1]) * k, a.look[2] + (b.look[2] - a.look[2]) * k] as [number, number, number],
      };
    };

    /* ScrollTrigger */
    const st2 = ScrollTrigger.create({
      trigger: scrollRef.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: 2.5,
      onUpdate: self => { progressRef.current = self.progress; },
    });

    const rampPulse = (p: number, start: number, peakIn: number, peakOut: number, end: number) => {
      if (p < start || p > end) return 0;
      if (p < peakIn) return (p - start) / (peakIn - start);
      if (p > peakOut) return 1 - (p - peakOut) / (end - peakOut);
      return 1;
    };
    const labelDefs = [
      { t: 0.02, p: 0.12, text: 0 }, { t: 0.15, p: 0.22, text: 1 }, { t: 0.24, p: 0.30, text: 2 },
      { t: 0.36, p: 0.44, text: 3 }, { t: 0.48, p: 0.58, text: 4 }, { t: 0.62, p: 0.72, text: 5 }, { t: 0.76, p: 0.84, text: 6 },
    ];

    /* Loop */
    const camTarget = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const currentLook = new THREE.Vector3(0, 8, 0);
    const clock = new THREE.Clock();
    let paused = false;
    const onVis = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    let lastOv = { hero: -1, about: -1, services: -1, skills: -1, contact: -1 };
    let lastLabel: number | null = null;
    const cExt = new THREE.Color(0xcadaf0);
    const cFoyer = new THREE.Color(0xf0ece4);
    const cOffice = new THREE.Color(0x2a2018);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (paused) return;
      const time = clock.getElapsedTime();
      const sp = progressRef.current;
      const j = sampleJourney(sp);
      camTarget.set(j.pos[0], j.pos[1], j.pos[2]);
      lookTarget.set(j.look[0], j.look[1], j.look[2]);
      camTarget.y += Math.sin(time * 0.55) * 0.008;
      camTarget.x += Math.sin(time * 0.35) * 0.004;
      camera.position.lerp(camTarget, 0.06);
      currentLook.lerp(lookTarget, 0.08);
      camera.lookAt(currentLook);

      const foyerInt = Math.max(0, Math.min(1, (sp - 0.25) / 0.12));
      foyerLight1.intensity = foyerInt * 0.8;
      foyerLight2.intensity = foyerInt * 0.7;
      chLight.intensity = foyerInt * 1.2;
      const livInt = Math.max(0, Math.min(1, (sp - 0.42) / 0.12));
      lLight1.intensity = livInt * 0.7;
      lLight2.intensity = livInt * 0.6;
      lsLight.intensity = livInt * 0.9;
      fpLight.intensity = livInt * (0.9 + Math.sin(time * 8) * 0.2 + Math.sin(time * 13) * 0.1);
      mat.fire1.emissiveIntensity = 1.1 + Math.sin(time * 9) * 0.3;
      mat.fire2.emissiveIntensity = 0.95 + Math.sin(time * 11) * 0.25;
      windowSpots.forEach(s => (s.intensity = Math.max(0, Math.min(1, (sp - 0.42) / 0.12)) * 1.2));
      const libInt = Math.max(0, Math.min(1, (sp - 0.55) / 0.12));
      sconceLights.forEach(l => (l.intensity = libInt * 0.55));
      spill.intensity = libInt * 0.4 + Math.max(0, Math.min(1, (sp - 0.70) / 0.1)) * 0.5;
      const offInt = Math.max(0, Math.min(1, (sp - 0.70) / 0.12));
      officeFill.intensity = offInt * 0.6;
      officeFill2.intensity = offInt * 0.55;
      lampLight.intensity = offInt * 1.0;
      screenLight.intensity = offInt * 0.6;
      ws.intensity = offInt * 1.5;
      lanternLights.forEach(l => (l.intensity = 1.2 + Math.sin(time * 4 + l.position.x) * 0.1));
      mat.screen.emissiveIntensity = 0.22 + Math.sin(time * 1.5) * 0.03 + offInt * 0.12;
      chand.rotation.z = Math.sin(time * 0.4) * 0.003;

      // dust motion
      const pos = dustGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dustCount; i++) {
        pos.array[i * 3 + 1] += 0.003 + Math.sin(time + i) * 0.0002;
        if (pos.array[i * 3 + 1] > 3.5) pos.array[i * 3 + 1] = 0.3;
      }
      pos.needsUpdate = true;

      // bloom strength varies by scene (kept subtle throughout)
      bloom.strength = 0.12 + offInt * 0.15 + libInt * 0.06;

      let fogCol: THREE.Color;
      if (sp < 0.38) fogCol = cExt.clone().lerp(cFoyer, sp / 0.38);
      else if (sp < 0.76) fogCol = cFoyer.clone().lerp(cOffice, ((sp - 0.38) / 0.38) * 0.5);
      else fogCol = cFoyer.clone().lerp(cOffice, 0.5 + ((sp - 0.76) / 0.24) * 0.5);
      fog.color = fogCol;
      fog.near = sp < 0.3 ? 30 : sp < 0.7 ? 15 : 8;
      fog.far = sp < 0.3 ? 160 : sp < 0.7 ? 60 : 30;

      // overlays
      const heroOp = Math.max(0, Math.min(1, 1 - sp * 7));
      const aboutOp = rampPulse(sp, 0.30, 0.36, 0.44, 0.50);
      const svcOp = rampPulse(sp, 0.46, 0.52, 0.60, 0.66);
      const skOp = rampPulse(sp, 0.62, 0.68, 0.74, 0.80);
      const ctOp = Math.max(0, Math.min(1, (sp - 0.86) * 7));
      const changed =
        Math.abs(heroOp - lastOv.hero) > 0.01 || Math.abs(aboutOp - lastOv.about) > 0.01 ||
        Math.abs(svcOp - lastOv.services) > 0.01 || Math.abs(skOp - lastOv.skills) > 0.01 ||
        Math.abs(ctOp - lastOv.contact) > 0.01;
      if (changed) {
        lastOv = { hero: heroOp, about: aboutOp, services: svcOp, skills: skOp, contact: ctOp };
        setOpacities({ hero: heroOp, about: aboutOp, services: svcOp, skills: skOp, contact: ctOp });
      }
      let newLabel: number | null = null;
      for (const L of labelDefs) { if (sp >= L.t && sp <= L.p) { newLabel = L.text; break; } }
      if (newLabel !== lastLabel) { lastLabel = newLabel; setActiveLabel(newLabel); }

      if (sp > 0.83 && screenMeshRef.current && macbookRef.current) {
        const worldPos = new THREE.Vector3();
        screenMeshRef.current.getWorldPosition(worldPos);
        const ndc = worldPos.clone().project(camera);
        const x = (ndc.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-ndc.y * 0.5 + 0.5) * window.innerHeight;
        const dist = camera.position.distanceTo(worldPos);
        const scale = Math.max(0.55, Math.min(1.05, (1.3 / dist) * 1.8));
        const el = macbookRef.current;
        el.style.position = "absolute";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.transform = `translate(-50%,-50%) scale(${scale})`;
      } else if (macbookRef.current && macbookRef.current.style.position) {
        const el = macbookRef.current;
        el.style.position = ""; el.style.left = ""; el.style.top = ""; el.style.transform = "";
      }

      composer.render();
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloom.setSize(window.innerWidth, window.innerHeight);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    animate();
    setTimeout(() => { setLoaded(true); ScrollTrigger.refresh(); }, 400);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      st2.kill();
      composer.dispose();
      renderer.dispose();
      pmrem.dispose();
      scene.traverse(o => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mm = m.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mm)) mm.forEach(x => x.dispose()); else if (mm) mm.dispose();
      });
    };
  }, []);

  return (
    <div className="mansion-root">
      <div className={`loading${loaded ? " hide" : ""}`}>
        <div className="brand">SPAXIO</div>
        <div className="tag">{t.heroTag}</div>
        <div className="bar" />
      </div>

      <canvas ref={canvasRef} className="mcanvas" />
      <div className="vignette" />

      <button className="lang" onClick={() => setLang(lang === "en" ? "fr" : "en")}>
        {lang === "en" ? "EN · FR" : "FR · EN"}
      </button>
      <div className="nav"><span className="brand">SPAXIO</span></div>

      {activeLabel !== null && <div className="section-label show">{t.labels[activeLabel]}</div>}

      <div className="ov ov-hero" style={{ opacity: opacities.hero }}>
        <h1>Spaxio</h1>
        <p className="tag">{t.heroTag}</p>
        <p className="sub">{t.heroSub}</p>
        <div className="hint"><span>{t.scrollHint}</span><div className="hint-bar" /></div>
      </div>

      <div className="ov ov-about" style={{ opacity: opacities.about }}>
        <div className="card">
          <div className="eyebrow">{t.aboutEyebrow}</div>
          <h2>{t.aboutTitle}</h2>
          <div className="rule" />
          {t.aboutBody.map((l, i) => l ? <p key={i}>{l}</p> : <p key={i} className="spacer">&nbsp;</p>)}
        </div>
      </div>

      <div className="ov ov-services" style={{ opacity: opacities.services }}>
        <div className="svc-head"><div className="eyebrow">{t.svcEyebrow}</div><h2>{t.svcTitle}</h2></div>
        <div className="svc-grid">
          {t.services.map(s => (
            <div className="svc-card" key={s.title}>
              <h3>{s.title}</h3><div className="rule" /><p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="svc-work">
          {t.work.map(w => <a key={w.title} href={w.url} target="_blank" rel="noopener noreferrer">{w.title} →</a>)}
        </div>
      </div>

      <div className="ov ov-skills" style={{ opacity: opacities.skills }}>
        <div className="skills-panel">
          <div className="eyebrow">{t.skillsEyebrow}</div>
          <h2>{t.skillsTitle}</h2>
          <div className="rule" />
          <div className="skill-grid">{t.skills.map(s => <div className="skill-pill" key={s}>{s}</div>)}</div>
        </div>
      </div>

      <div className="ov ov-contact" style={{ opacity: opacities.contact }}>
        <div className="macbook" ref={macbookRef}>
          <div className="screen">
            <div className="titlebar">
              <div className="dots"><span className="dot r" /><span className="dot y" /><span className="dot g" /></div>
              <div className="t">{t.ctTitle}</div>
              <div style={{ width: 52 }} />
            </div>
            <div className="mform">
              {!sent ? (
                <>
                  <div className="head"><h3>{t.ctHead}</h3><span>{t.ctSub}</span></div>
                  <form onSubmit={submit} autoComplete="on">
                    <div className="row">
                      <label><span className="lbl">{t.lName}</span>
                        <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </label>
                      <label><span className="lbl">{t.lEmail}</span>
                        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                      </label>
                    </div>
                    <div className="row">
                      <label><span className="lbl">{t.lPtype}</span>
                        <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })}>
                          <option value="">—</option>
                          {t.projectTypes.map(p => <option key={p}>{p}</option>)}
                        </select>
                      </label>
                      <label><span className="lbl">{t.lBudget}</span>
                        <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                          <option value="">—</option>
                          {t.budgets.map(b => <option key={b}>{b}</option>)}
                        </select>
                      </label>
                    </div>
                    <label><span className="lbl">{t.lMsg}</span>
                      <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                    </label>
                    <div className="send-row">
                      <button className="send" type="submit" disabled={sending}>{sending ? t.btnSending : t.btnSend}</button>
                      <a className="email" href="mailto:polidorispaxio@gmail.com">polidorispaxio@gmail.com</a>
                    </div>
                    {formError && <p className="privacy" style={{ color: "#a03020" }}>{formError}</p>}
                    <p className="privacy">
                      Your information is collected solely to respond to your inquiry. See our <a href="/privacy-policy">Privacy Policy</a>.
                    </p>
                  </form>
                </>
              ) : (
                <div className="success">
                  <div className="check">✓</div>
                  <h4>{t.sucH}</h4>
                  <p>{t.sucP}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mfooter" style={{ opacity: opacities.contact * 0.65 }}>
        © 2026 Spaxio<a href="/privacy-policy">Privacy Policy</a>
      </div>

      <div className="scroll-spacer" ref={scrollRef} />
    </div>
  );
}
