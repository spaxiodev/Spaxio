"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════
   CINEMATIC WORKSPACE — Photorealistic developer room
   ═══════════════════════════════════════════════════ */

/* ── Materials ── */
function woodMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.85, metalness: 0.0 });
}
function concreteMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.95, metalness: 0.0 });
}
function metalMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.3, metalness: 0.85 });
}
function aluminumMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.2, metalness: 0.8 });
}
function screenMat(color = 0x111111): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.1, metalness: 0.3, emissive: color, emissiveIntensity: 0.15 });
}
function fabricMat(color: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0.0 });
}
function plantMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.8, metalness: 0.0 });
}
function potMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x8b6914, roughness: 0.75, metalness: 0.1 });
}
function frameMat(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.6 });
}
function bookMat(color: number): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0.0 });
}

/* ── Room geometry builders ── */

function buildFloor(): THREE.Mesh {
  const geo = new THREE.PlaneGeometry(20, 25);
  const mesh = new THREE.Mesh(geo, woodMat());
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(0, 0, -5);
  mesh.receiveShadow = true;
  return mesh;
}

function buildWalls(): THREE.Group {
  const g = new THREE.Group();
  const wall = concreteMat();
  // Back wall
  const back = new THREE.Mesh(new THREE.PlaneGeometry(20, 8), wall);
  back.position.set(0, 4, -17);
  back.receiveShadow = true;
  g.add(back);
  // Left wall
  const left = new THREE.Mesh(new THREE.PlaneGeometry(25, 8), wall);
  left.position.set(-10, 4, -5);
  left.rotation.y = Math.PI / 2;
  left.receiveShadow = true;
  g.add(left);
  // Right wall (window side — slightly different tone)
  const rightMat = new THREE.MeshStandardMaterial({ color: 0x2e2e30, roughness: 0.9, metalness: 0.0 });
  const right = new THREE.Mesh(new THREE.PlaneGeometry(25, 8), rightMat);
  right.position.set(10, 4, -5);
  right.rotation.y = -Math.PI / 2;
  g.add(right);
  // Ceiling (subtle)
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(20, 25), new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 1 }));
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, 8, -5);
  g.add(ceil);
  return g;
}

function buildDesk(): THREE.Group {
  const g = new THREE.Group();
  const deskY = 2.8;
  // Desktop surface
  const top = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.08, 2.2), woodMat());
  top.position.set(0, deskY, -15);
  top.castShadow = true;
  g.add(top);
  // Legs (metal)
  const legGeo = new THREE.CylinderGeometry(0.06, 0.06, deskY, 8);
  const lm = metalMat();
  [[-2.5, -0.9], [2.5, -0.9], [-2.5, 0.9], [2.5, 0.9]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(legGeo, lm);
    leg.position.set(x, deskY / 2, -15 + z);
    leg.castShadow = true;
    g.add(leg);
  });
  return g;
}

function buildMacBook(): THREE.Group {
  const g = new THREE.Group();
  const deskY = 2.84;
  // Base
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 1.5), aluminumMat());
  base.position.set(0, deskY + 0.03, -15);
  base.castShadow = true;
  g.add(base);
  // Lid (tilted back ~110 degrees)
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, deskY + 0.06, -15.75);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 0.04), aluminumMat());
  lid.position.y = 0.75;
  lid.castShadow = true;
  lidGroup.add(lid);
  // Screen
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.3), screenMat(0x0a0a10));
  screen.position.set(0, 0.75, 0.025);
  lidGroup.add(screen);
  lidGroup.rotation.x = -0.35; // ~20 degree tilt
  g.add(lidGroup);
  // Screen glow light
  const screenLight = new THREE.PointLight(0xddeeff, 0.6, 5, 2);
  screenLight.position.set(0, deskY + 1.2, -15.5);
  g.add(screenLight);
  return g;
}

function buildMonitor(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const deskY = 2.84;
  // Screen
  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 0.08), new THREE.MeshStandardMaterial({ color: 0x0c0c0f, roughness: 0.1, metalness: 0.4 }));
  screen.position.set(x, deskY + 1.4, z);
  g.add(screen);
  // Screen face (emissive)
  const face = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.35), screenMat(0x0e1018));
  face.position.set(x, deskY + 1.4, z + 0.045);
  g.add(face);
  // Stand
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8), metalMat());
  stand.position.set(x, deskY + 0.3, z);
  g.add(stand);
  // Base
  const standBase = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.04, 16), metalMat());
  standBase.position.set(x, deskY + 0.02, z);
  g.add(standBase);
  return g;
}

function buildKeyboard(): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.04, 0.5),
    new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6, metalness: 0.3 })
  );
  mesh.position.set(0.3, 2.86, -14.3);
  return mesh;
}

function buildMouse(): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.06, 0.35),
    new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.2, metalness: 0.7 })
  );
  mesh.position.set(2, 2.86, -14.3);
  return mesh;
}

function buildCoffeeMug(): THREE.Group {
  const g = new THREE.Group();
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.13, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0xf5f0e8, roughness: 0.6, metalness: 0.1 }));
  mug.position.set(-2.2, 3.02, -14.5);
  g.add(mug);
  // Coffee inside
  const coffee = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.02, 12), new THREE.MeshStandardMaterial({ color: 0x3b1f0a, roughness: 0.3 }));
  coffee.position.set(-2.2, 3.18, -14.5);
  g.add(coffee);
  return g;
}

function buildDeskLamp(): THREE.Group {
  const g = new THREE.Group();
  const armMat = metalMat();
  // Base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.06, 16), armMat);
  base.position.set(-2.3, 2.87, -15.8);
  g.add(base);
  // Arm
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 6), armMat);
  arm.position.set(-2.3, 3.77, -15.8);
  arm.rotation.z = 0.15;
  g.add(arm);
  // Shade
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.3, 12, 1, true), new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.7, metalness: 0.3, side: THREE.DoubleSide }));
  shade.position.set(-2.15, 4.55, -15.8);
  shade.rotation.z = Math.PI;
  g.add(shade);
  return g;
}

function buildBookshelf(x: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const shelfMat = woodMat();
  // Shelves
  for (let i = 0; i < 4; i++) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.06, 0.4), shelfMat);
    shelf.position.set(x, 1.5 + i * 1.2, z);
    g.add(shelf);
  }
  // Side panels
  for (const sx of [-1.25, 1.25]) {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.05, 4.8, 0.4), shelfMat);
    side.position.set(x + sx, 3.9, z);
    g.add(side);
  }
  // Books
  const bookColors = [0x8b2500, 0x1a3a5c, 0x2e4e1e, 0x4a3060, 0xc4a35a, 0x1e3d3d, 0x5c1a1a, 0x3d3d1a];
  for (let row = 0; row < 4; row++) {
    const numBooks = 5 + Math.floor(Math.random() * 4);
    let bx = x - 1.1;
    for (let b = 0; b < numBooks; b++) {
      const w = 0.08 + Math.random() * 0.12;
      const h = 0.6 + Math.random() * 0.4;
      const book = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.3), bookMat(bookColors[b % bookColors.length]));
      book.position.set(bx + w / 2, 1.53 + row * 1.2 + h / 2, z);
      g.add(book);
      bx += w + 0.02;
    }
  }
  return g;
}

function buildPlant(x: number, y: number, z: number): THREE.Group {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.35, 8), potMat());
  pot.position.set(x, y + 0.175, z);
  g.add(pot);
  // Foliage (cluster of spheres)
  const pm = plantMat();
  for (let i = 0; i < 5; i++) {
    const s = 0.1 + Math.random() * 0.12;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(s, 8, 6), pm);
    leaf.position.set(
      x + (Math.random() - 0.5) * 0.2,
      y + 0.4 + Math.random() * 0.25,
      z + (Math.random() - 0.5) * 0.2
    );
    g.add(leaf);
  }
  return g;
}

function buildPictureFrame(x: number, y: number, z: number, rotY: number): THREE.Group {
  const g = new THREE.Group();
  // Frame
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 0.06), frameMat());
  frame.position.set(x, y, z);
  frame.rotation.y = rotY;
  g.add(frame);
  // Inner mat (light)
  const inner = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 0.9),
    new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5, metalness: 0.1 })
  );
  inner.position.set(x + (rotY === 0 ? 0 : Math.sin(rotY) * 0.035), y, z + (rotY === 0 ? 0.035 : Math.cos(rotY) * 0.035));
  inner.rotation.y = rotY;
  g.add(inner);
  return g;
}

function buildChair(): THREE.Group {
  const g = new THREE.Group();
  const mat = fabricMat(0x1a1a1a);
  // Seat
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 1.2), mat);
  seat.position.set(0, 1.8, -13.5);
  g.add(seat);
  // Back
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.1), mat);
  back.position.set(0, 2.56, -14.05);
  back.rotation.x = 0.08;
  g.add(back);
  // Base
  const baseMat = metalMat();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 6), baseMat);
  pole.position.set(0, 1.2, -13.5);
  g.add(pole);
  // Star base
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.6, 4), baseMat);
    leg.rotation.z = Math.PI / 2;
    leg.rotation.y = angle;
    leg.position.set(Math.cos(angle) * 0.3, 0.6, -13.5 + Math.sin(angle) * 0.3);
    g.add(leg);
    const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), baseMat);
    wheel.position.set(Math.cos(angle) * 0.55, 0.56, -13.5 + Math.sin(angle) * 0.55);
    g.add(wheel);
  }
  return g;
}

/* ═══════════════════════════════════════════════════
   DUST PARTICLES (warm, floating)
   ═══════════════════════════════════════════════════ */
const DUST_VERT = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.15 + aPhase) * 0.3;
    p.x += cos(uTime * 0.1 + aPhase * 1.7) * 0.15;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aSize * (80.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vAlpha = smoothstep(40.0, 2.0, -mv.z) * 0.35;
  }
`;

const DUST_FRAG = `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float g = exp(-d * d * 6.0);
    gl_FragColor = vec4(uColor, g * vAlpha);
  }
`;

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
interface Props {
  scrollProgress: React.MutableRefObject<number>;
}

export default function WorldScene({ scrollProgress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const isMobile = window.innerWidth < 768;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.025);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);

    /* ── Camera path ── */
    const cameraPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5.5, 2),        // 0%   — Wide shot
      new THREE.Vector3(-2, 4.5, -4),       // ~15% — Drifting in
      new THREE.Vector3(-6, 4.2, -10),      // ~25% — Wall with about frame
      new THREE.Vector3(-4, 3.8, -12),      // ~35% — Past frame
      new THREE.Vector3(6, 4, -14),         // ~45% — Pan to bookshelf
      new THREE.Vector3(3, 3.5, -14.5),     // ~55% — Looking at monitors
      new THREE.Vector3(1, 3.5, -13),       // ~70% — Pulling back
      new THREE.Vector3(0, 3.6, -12),       // ~80% — Descending
      new THREE.Vector3(0, 3.3, -13.2),     // ~90% — Moving toward MacBook
      new THREE.Vector3(0, 3.15, -14.2),    // 100% — Right in front of MacBook
    ], false, "catmullrom", 0.25);

    const lookAtPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3.5, -12),       // Look at room center
      new THREE.Vector3(-3, 3.5, -10),
      new THREE.Vector3(-8, 4, -13),         // Look at frame on wall
      new THREE.Vector3(-2, 3.5, -14),
      new THREE.Vector3(7, 3.5, -15.5),      // Look at bookshelf
      new THREE.Vector3(0, 3.5, -15.5),      // Look at monitors
      new THREE.Vector3(0, 3, -15),
      new THREE.Vector3(0, 3, -15),
      new THREE.Vector3(0, 3.1, -15.2),      // Look at MacBook
      new THREE.Vector3(0, 3.05, -15.5),     // MacBook screen center
    ], false, "catmullrom", 0.25);

    /* ── Lighting ── */
    // Hemisphere (subtle ambient)
    const hemi = new THREE.HemisphereLight(0x1a1520, 0x080808, 0.4);
    scene.add(hemi);

    // Desk lamp (warm)
    const deskLamp = new THREE.PointLight(0xff9945, 1.8, 12, 1.5);
    deskLamp.position.set(-2.15, 4.6, -15.8);
    deskLamp.castShadow = !isMobile;
    if (deskLamp.shadow) {
      deskLamp.shadow.mapSize.set(512, 512);
      deskLamp.shadow.bias = -0.002;
    }
    scene.add(deskLamp);

    // Window light (cool blue, from right)
    const windowLight = new THREE.DirectionalLight(0x4488ff, 0.35);
    windowLight.position.set(8, 6, -8);
    windowLight.target.position.set(0, 2, -14);
    scene.add(windowLight);
    scene.add(windowLight.target);

    // Subtle fill from behind camera
    const fill = new THREE.PointLight(0x221a14, 0.3, 20);
    fill.position.set(0, 5, 0);
    scene.add(fill);

    // Monitor glow
    const monGlow = new THREE.PointLight(0xddeeff, 0.4, 4, 2);
    monGlow.position.set(0, 4, -15);
    scene.add(monGlow);

    /* ── Build the room ── */
    scene.add(buildFloor());
    scene.add(buildWalls());
    scene.add(buildDesk());
    scene.add(buildMacBook());
    scene.add(buildMonitor(-1.5, -16));
    scene.add(buildMonitor(1.5, -16));
    scene.add(buildKeyboard());
    scene.add(buildMouse());
    scene.add(buildCoffeeMug());
    scene.add(buildDeskLamp());
    scene.add(buildChair());
    scene.add(buildBookshelf(7, -16));
    scene.add(buildPlant(2.8, 2.84, -15.8));
    scene.add(buildPlant(-8, 0, -12));
    scene.add(buildPlant(8, 0, -8));

    // Picture frames on left wall
    scene.add(buildPictureFrame(-9.93, 4.5, -10, Math.PI / 2));
    scene.add(buildPictureFrame(-9.93, 4.5, -13, Math.PI / 2));
    scene.add(buildPictureFrame(-9.93, 3, -11.5, Math.PI / 2));

    // Window frame (right wall)
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3, 4), frameMat());
    windowFrame.position.set(9.95, 4.5, -8);
    windowFrame.rotation.y = Math.PI / 2;
    scene.add(windowFrame);
    // Window glow plane
    const windowGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 3),
      new THREE.MeshBasicMaterial({ color: 0x1a2a40, transparent: true, opacity: 0.3 })
    );
    windowGlow.position.set(9.9, 4.5, -8);
    windowGlow.rotation.y = -Math.PI / 2;
    scene.add(windowGlow);

    // Rug under desk
    const rug = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 5),
      new THREE.MeshStandardMaterial({ color: 0x1e1614, roughness: 0.95, metalness: 0 })
    );
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.005, -13.5);
    scene.add(rug);

    /* ── Dust particles ── */
    const PCOUNT = isMobile ? 200 : 600;
    const pPos = new Float32Array(PCOUNT * 3);
    const pSize = new Float32Array(PCOUNT);
    const pPhase = new Float32Array(PCOUNT);
    for (let i = 0; i < PCOUNT; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 1] = 1 + Math.random() * 6;
      pPos[i * 3 + 2] = -Math.random() * 18;
      pSize[i] = 0.8 + Math.random() * 1.5;
      pPhase[i] = Math.random() * Math.PI * 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute("aSize", new THREE.BufferAttribute(pSize, 1));
    pGeo.setAttribute("aPhase", new THREE.BufferAttribute(pPhase, 1));
    const pMat = new THREE.ShaderMaterial({
      vertexShader: DUST_VERT,
      fragmentShader: DUST_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xffcc88) },
      },
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── Animation ── */
    const timer = new THREE.Timer();
    let raf = 0;
    let paused = false;

    const onVis = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const tmpPos = new THREE.Vector3();
    const tmpLook = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (paused) return;

      timer.update();
      const elapsed = timer.getElapsed();
      const t = scrollProgress.current;

      // Camera follows spline — slow lerp for cinematic weight
      cameraPath.getPointAt(Math.min(t, 0.999), tmpPos);
      lookAtPath.getPointAt(Math.min(t, 0.999), tmpLook);
      camera.position.lerp(tmpPos, 0.035);
      camera.lookAt(tmpLook);

      // Dust particles
      pMat.uniforms.uTime.value = elapsed;

      // Subtle desk lamp flicker
      deskLamp.intensity = 1.8 + Math.sin(elapsed * 3.7) * 0.04 + Math.sin(elapsed * 7.1) * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className="world-canvas" />;
}
