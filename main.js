import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ─────────────────────────────────────────────────────────────────
   RENDERER
───────────────────────────────────────────────────────────────── */
const canvas = document.querySelector("#scene");
const scene  = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog        = new THREE.Fog(0x000000, 20, 42);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace    = THREE.SRGBColorSpace;
renderer.toneMapping         = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled   = true;
renderer.shadowMap.type      = THREE.PCFSoftShadowMap;

/* ─────────────────────────────────────────────────────────────────
   CAMERA
───────────────────────────────────────────────────────────────── */
const CAM_INTRO_POS = new THREE.Vector3(3, 22, 20);
const CAM_FINAL_POS = new THREE.Vector3(0, 9, 12);
const CAM_FINAL_TGT = new THREE.Vector3(0, 2.8, 0);

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.copy(CAM_INTRO_POS);
camera.lookAt(0, 5, 0);

/* ─────────────────────────────────────────────────────────────────
   CONTROLS
───────────────────────────────────────────────────────────────── */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping   = true;
controls.dampingFactor   = 0.05;
controls.enablePan       = false;
controls.minDistance     = 8;
controls.maxDistance     = 18;
controls.maxPolarAngle   = Math.PI * 0.49;
controls.minPolarAngle   = Math.PI * 0.1;
controls.autoRotate      = false;
controls.autoRotateSpeed = 0.5;
controls.target.copy(CAM_FINAL_TGT);
controls.enabled         = false;   // re-enabled after intro

/* ─────────────────────────────────────────────────────────────────
   ROOT GROUP
───────────────────────────────────────────────────────────────── */
const cakeRoot = new THREE.Group();
scene.add(cakeRoot);

/* ─────────────────────────────────────────────────────────────────
   PLATE BUNDLE  – champagne-gold spinning turntable
───────────────────────────────────────────────────────────────── */
const plateBundle = new THREE.Group();
cakeRoot.add(plateBundle);

const plate = new THREE.Mesh(
  new THREE.CylinderGeometry(5.2, 5.4, 0.5, 80),
  new THREE.MeshStandardMaterial({ color: 0xc4a030, metalness: 0.85, roughness: 0.18 }),
);
plate.position.y    = -0.25;
plate.receiveShadow = true;
plateBundle.add(plate);

const plateRim = new THREE.Mesh(
  new THREE.TorusGeometry(5.26, 0.13, 10, 80),
  new THREE.MeshStandardMaterial({ color: 0xd4b044, metalness: 0.92, roughness: 0.13 }),
);
plateRim.rotation.x = Math.PI / 2;
plateRim.position.y = 0.01;
plateBundle.add(plateRim);

/* ─────────────────────────────────────────────────────────────────
   TIER 1 BUNDLE  – main lower cake body
───────────────────────────────────────────────────────────────── */
const tier1Bundle = new THREE.Group();
cakeRoot.add(tier1Bundle);

const cakeBody = new THREE.Mesh(
  new THREE.CylinderGeometry(3.9, 4.08, 2.1, 72, 1),
  new THREE.MeshPhysicalMaterial({
    color: 0xf9f4ea,
    roughness: 0.58,
    metalness: 0.02,
    clearcoat: 0.25,
    clearcoatRoughness: 0.7,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xf8ecd6),
  }),
);
cakeBody.position.y  = 1.05;
cakeBody.castShadow    = true;
cakeBody.receiveShadow = true;
tier1Bundle.add(cakeBody);

const topFrost1 = new THREE.Mesh(
  new THREE.CylinderGeometry(3.92, 3.92, 0.26, 72),
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.56, metalness: 0.02 }),
);
topFrost1.position.y = 2.23;
topFrost1.castShadow = true;
tier1Bundle.add(topFrost1);

/* ─────────────────────────────────────────────────────────────────
   TIER 2 BUNDLE  – smaller upper cake body
───────────────────────────────────────────────────────────────── */
const tier2Bundle = new THREE.Group();
cakeRoot.add(tier2Bundle);

const cakeBody2 = new THREE.Mesh(
  new THREE.CylinderGeometry(2.5, 2.65, 1.7, 64, 1),
  new THREE.MeshPhysicalMaterial({
    color: 0xfaf5ec,
    roughness: 0.55,
    metalness: 0.02,
    clearcoat: 0.3,
    clearcoatRoughness: 0.65,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xf8ecd6),
  }),
);
cakeBody2.position.y   = 3.25;
cakeBody2.castShadow   = true;
cakeBody2.receiveShadow = true;
tier2Bundle.add(cakeBody2);

const topFrost2 = new THREE.Mesh(
  new THREE.CylinderGeometry(2.52, 2.52, 0.24, 64),
  new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.56, metalness: 0.02 }),
);
topFrost2.position.y = 4.22;
topFrost2.castShadow = true;
tier2Bundle.add(topFrost2);

/* ─────────────────────────────────────────────────────────────────
   CREAM GROUPS
───────────────────────────────────────────────────────────────── */
const creamMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xfaf4e8,
  roughness: 0.42,
  metalness: 0.01,
  clearcoat: 0.3,
  clearcoatRoughness: 0.66,
  sheen: 0.62,
  sheenColor: new THREE.Color(0xfff7ef),
});

const creamGroup1 = new THREE.Group();
const creamGroup2 = new THREE.Group();
cakeRoot.add(creamGroup1, creamGroup2);

const _creamXAxis = new THREE.Vector3(1, 0, 0);
const _creamRadial = new THREE.Vector3();
const _creamTangent = new THREE.Vector3();

// Star-like cross-section to mimic piping-nozzle ridges.
// ridges: number of grooves, groove: groove depth ratio.
function createCreamProfileShape(baseRadius, ridges = 10, groove = 0.24) {
  const shape = new THREE.Shape();
  const pointCount = ridges * 2;
  for (let i = 0; i <= pointCount; i += 1) {
    const a = (i / pointCount) * Math.PI * 2;
    const r = i % 2 === 0 ? baseRadius : baseRadius * (1 - groove);
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

// A single frosting segment path; tweak control-point multipliers for curl character.
function createCreamSwirlGeometry(segLength, baseRadius) {
  const profile = createCreamProfileShape(baseRadius, 11, 0.22);
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-segLength * 0.5, 0, 0),
    new THREE.Vector3(-segLength * 0.22, baseRadius * 0.34, baseRadius * 0.18),
    new THREE.Vector3(segLength * 0.08, -baseRadius * 0.12, -baseRadius * 0.14),
    new THREE.Vector3(segLength * 0.34, baseRadius * 0.24, baseRadius * 0.1),
    new THREE.Vector3(segLength * 0.5, 0, 0),
  ]);

  const geometry = new THREE.ExtrudeGeometry(profile, {
    steps: 26,
    bevelEnabled: false,
    curveSegments: 18,
    extrudePath: path,
  });
  geometry.computeVertexNormals();
  return geometry;
}

// Build one full cream ring from repeated swirl segments.
// radius/y/count/puffRadius are the main artistic controls for future edits.
function makeCreamRing(grp, radius, y, count, puffRadius) {
  const arcLength = (Math.PI * 2 * radius) / count;
  // Slight overlap prevents visible seams between neighboring segments.
  const segLength = arcLength * 0.94;
  const swirlGeometry = createCreamSwirlGeometry(segLength, puffRadius);

  for (let i = 0; i < count; i += 1) {
    const t = (i / count) * Math.PI * 2;

    _creamRadial.set(Math.cos(t), 0, Math.sin(t));
    _creamTangent.set(-_creamRadial.z, 0, _creamRadial.x);

    const swirl = new THREE.Mesh(swirlGeometry, creamMaterial);
    swirl.position.set(
      _creamRadial.x * (radius - puffRadius * 0.08),
      // Tiny height noise keeps ring from looking mechanically perfect.
      y + Math.sin(t * 3) * 0.015,
      _creamRadial.z * (radius - puffRadius * 0.08),
    );
    swirl.quaternion.setFromUnitVectors(_creamXAxis, _creamTangent);
    swirl.rotateX(-0.2);
    swirl.rotateY(Math.sin(t * 2.6) * 0.08);
    swirl.castShadow = true;
    grp.add(swirl);
  }
}

// Tier-1 cream
makeCreamRing(creamGroup1, 3.92, 2.30, 36, 0.25);  // top edge
makeCreamRing(creamGroup1, 4.02, 1.50, 40, 0.22);  // mid side
makeCreamRing(creamGroup1, 2.65, 2.44, 22, 0.22);  // collar between tiers
// Tier-2 cream
makeCreamRing(creamGroup2, 2.52, 4.32, 24, 0.22);  // tier2 top

/* ─────────────────────────────────────────────────────────────────
   STRAWBERRIES  – on tier-2 top
───────────────────────────────────────────────────────────────── */
const strawberryGroup = new THREE.Group();
cakeRoot.add(strawberryGroup);

function createBerrySkinTextures() {
  const size = 512;

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) return null;

  const baseGrad = colorCtx.createRadialGradient(size * 0.5, size * 0.28, size * 26 * 0.12, size * 0.5, size * 0.5, size * 0.5);
  baseGrad.addColorStop(0, "#ff5a62");
  baseGrad.addColorStop(0.45, "#e13345");
  baseGrad.addColorStop(1, "#8e1025");
  colorCtx.fillStyle = baseGrad;
  colorCtx.fillRect(0, 0, size, size);

  const rimShade = colorCtx.createRadialGradient(size * 0.5, size * 0.55, size * 0.12, size * 0.5, size * 0.55, size * 0.55);
  rimShade.addColorStop(0, "rgba(255,255,255,0)");
  rimShade.addColorStop(1, "rgba(35,0,8,0.38)");
  colorCtx.fillStyle = rimShade;
  colorCtx.fillRect(0, 0, size, size);

  const shine = colorCtx.createRadialGradient(size * 0.39, size * 0.3, 0, size * 0.39, size * 0.3, size * 0.19);
  shine.addColorStop(0, "rgba(255,255,255,0.34)");
  shine.addColorStop(1, "rgba(255,255,255,0)");
  colorCtx.fillStyle = shine;
  colorCtx.fillRect(0, 0, size, size);

  for (let i = 0; i < 4200; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const s = Math.random() * 2.1;
    colorCtx.fillStyle = `rgba(0,0,0,${Math.random() * 0.055})`;
    colorCtx.fillRect(x, y, s, s);
  }

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size;
  roughCanvas.height = size;
  const roughCtx = roughCanvas.getContext("2d");
  if (!roughCtx) return null;
  roughCtx.fillStyle = "rgb(132,132,132)";
  roughCtx.fillRect(0, 0, size, size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return null;
  bumpCtx.fillStyle = "rgb(126,126,126)";
  bumpCtx.fillRect(0, 0, size, size);

  const rowStep = 27;
  const colStep = 31;
  for (let y = 18; y < size - 18; y += rowStep) {
    const offset = Math.floor(y / rowStep) % 2 === 0 ? 0 : colStep * 0.48;
    for (let x = 18 + offset; x < size - 18; x += colStep) {
      const jitterX = x + (Math.random() * 2 - 1) * 4;
      const jitterY = y + (Math.random() * 2 - 1) * 4;
      const radiusX = 3 + Math.random() * 1.1;
      const radiusY = 4.8 + Math.random() * 1.3;
      const rot = (Math.random() - 0.5) * 0.45;

      colorCtx.save();
      colorCtx.translate(jitterX, jitterY);
      colorCtx.rotate(rot);
      colorCtx.fillStyle = "rgba(255,228,170,0.88)";
      colorCtx.beginPath();
      colorCtx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
      colorCtx.fill();
      colorCtx.fillStyle = "rgba(152,68,18,0.32)";
      colorCtx.beginPath();
      colorCtx.ellipse(0, 1.2, radiusX * 0.36, radiusY * 0.45, 0, 0, Math.PI * 2);
      colorCtx.fill();
      colorCtx.restore();

      const roughV = 152 + Math.random() * 32;
      roughCtx.fillStyle = `rgb(${roughV},${roughV},${roughV})`;
      roughCtx.beginPath();
      roughCtx.ellipse(jitterX, jitterY, radiusX * 0.82, radiusY * 0.95, rot, 0, Math.PI * 2);
      roughCtx.fill();

      const bumpInner = 118 + Math.random() * 10;
      bumpCtx.fillStyle = `rgb(${bumpInner},${bumpInner},${bumpInner})`;
      bumpCtx.beginPath();
      bumpCtx.ellipse(jitterX, jitterY, radiusX * 0.8, radiusY * 0.92, rot, 0, Math.PI * 2);
      bumpCtx.fill();

      bumpCtx.fillStyle = "rgb(150,150,150)";
      bumpCtx.beginPath();
      bumpCtx.ellipse(jitterX, jitterY, radiusX * 0.3, radiusY * 0.32, rot, 0, Math.PI * 2);
      bumpCtx.fill();
    }
  }

  const berryMap = new THREE.CanvasTexture(colorCanvas);
  berryMap.colorSpace = THREE.SRGBColorSpace;
  berryMap.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  const berryRoughnessMap = new THREE.CanvasTexture(roughCanvas);
  berryRoughnessMap.anisotropy = berryMap.anisotropy;

  const berryBumpMap = new THREE.CanvasTexture(bumpCanvas);
  berryBumpMap.anisotropy = berryMap.anisotropy;

  return {
    map: berryMap,
    roughnessMap: berryRoughnessMap,
    bumpMap: berryBumpMap,
  };
}

function createBerryBodyGeometry() {
  const geom = new THREE.SphereGeometry(0.31, 28, 22);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i += 1) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    const t = THREE.MathUtils.clamp((y / 0.31 + 1) * 0.5, 0, 1);
    const waist = 1 - Math.pow(t - 0.58, 2) * 0.28;
    const topTaper = 1 - Math.max(0, t - 0.54) * 0.34;
    const bottomTaper = 1 - Math.max(0, 0.3 - t) * 0.2;
    const radialScale = waist * topTaper * bottomTaper;

    x *= radialScale;
    z *= radialScale;

    if (t < 0.24) y -= (0.24 - t) * 0.075;

    pos.setXYZ(i, x, y, z);
  }

  geom.computeVertexNormals();
  return geom;
}

const berryTextures = createBerrySkinTextures();
const berryMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xd4283b,
  roughness: 0.5,
  metalness: 0.0,
  clearcoat: 0.38,
  clearcoatRoughness: 0.34,
  sheen: 0.35,
  sheenColor: new THREE.Color(0xff7a82),
  map: berryTextures?.map,
  roughnessMap: berryTextures?.roughnessMap,
  bumpMap: berryTextures?.bumpMap,
  bumpScale: 0.018,
});
const leafMaterial  = new THREE.MeshStandardMaterial({ color: 0x4f8d45, roughness: 0.78, metalness: 0.02 });
const berryBodyGeometry = createBerryBodyGeometry();

function createStrawberry(angle, radius = 1.55) {
  const berry = new THREE.Group();
  const body  = new THREE.Mesh(berryBodyGeometry, berryMaterial);
  body.rotation.y = Math.random() * Math.PI * 2;

  const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.17, 6), leafMaterial);
  leaf.position.y = 0.285;
  leaf.rotation.x = Math.PI;

  berry.add(body, leaf);
  berry.position.set(Math.cos(angle) * radius, 4.52, Math.sin(angle) * radius);
  berry.castShadow = true;
  strawberryGroup.add(berry);
}

for (let i = 0; i < 7; i += 1) {
  createStrawberry((i / 7) * Math.PI * 2 + (i % 2) * 0.1);
}

/* ─────────────────────────────────────────────────────────────────
   CANDLE  – centre of tier-2 top
───────────────────────────────────────────────────────────────── */
const candleGroup = new THREE.Group();
cakeRoot.add(candleGroup);
const candleData = [];

function createCandle(positionX, positionZ, idx) {
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 1.15, 24),
    new THREE.MeshStandardMaterial({ color: 0xf6df9f, roughness: 0.44, metalness: 0.12 }),
  );
  base.castShadow = true;

  const stripe = new THREE.Mesh(
    new THREE.TorusGeometry(0.122, 0.015, 10, 40),
    new THREE.MeshStandardMaterial({ color: 0xe8b457, roughness: 0.45 }),
  );
  stripe.rotation.x = Math.PI / 2;

  const wick = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.09, 8),
    new THREE.MeshStandardMaterial({ color: 0x1d1d1d, roughness: 0.7 }),
  );
  wick.position.y = 0.62;

  const flame = new THREE.Group();
  flame.position.y = 0.76;
  flame.scale.setScalar(0);   // hidden until candle is lit

  const flameOuter = new THREE.Mesh(
    new THREE.ConeGeometry(0.09, 0.25, 18),
    new THREE.MeshBasicMaterial({ color: 0xff9c2f, transparent: true, opacity: 0.95 }),
  );
  flameOuter.position.y = 0.11;

  const flameCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.045, 0.14, 14),
    new THREE.MeshBasicMaterial({ color: 0xfff2bf, transparent: true, opacity: 0.98 }),
  );
  flameCore.position.y = 0.09;

  const flameGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffb85a, transparent: true, opacity: 0.22 }),
  );
  flameGlow.position.y = 0.1;
  flameGlow.scale.set(1.15, 1.35, 1.15);

  flame.add(flameGlow, flameOuter, flameCore);

  const point = new THREE.PointLight(0xffaa55, 0, 5, 2);  // starts at intensity 0
  point.position.y = 0.74;

  const candle = new THREE.Group();
  candle.add(base, stripe, wick, flame, point);
  candle.position.set(positionX, 4.72, positionZ);
  candleGroup.add(candle);

  candleData.push({
    flame,
    light: point,
    enabled: false,      // lit during intro ignition
    phase: idx * 0.72,
    ignitionTime: -1,
  });
}

createCandle(0, 0, 0);

/* ─────────────────────────────────────────────────────────────────
   LIGHTS
───────────────────────────────────────────────────────────────── */
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const keyLight = new THREE.DirectionalLight(0xfff2dd, 1.2);
keyLight.position.set(6, 10, 7);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.near   = 0.5;
keyLight.shadow.camera.far    = 35;
keyLight.shadow.camera.left   = -8;
keyLight.shadow.camera.right  = 8;
keyLight.shadow.camera.top    = 8;
keyLight.shadow.camera.bottom = -8;
keyLight.shadow.bias = -0.0002;
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0xffdda8, 0.65);
rimLight.position.set(-10, 6, -8);
scene.add(rimLight);

// Short-burst flash for candle ignition
const ignitionFlash = new THREE.PointLight(0xffeebb, 0, 10, 1.5);
ignitionFlash.position.set(0, 5.8, 0);
scene.add(ignitionFlash);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(12, 72),
  new THREE.ShadowMaterial({ opacity: 0.25 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y  = -0.01;
floor.receiveShadow = true;
scene.add(floor);

/* ─────────────────────────────────────────────────────────────────
   CAKE DECAL  ("Best Wishes!" on tier-2 top)
───────────────────────────────────────────────────────────────── */
function drawCakeDecal(ctx, cursiveFont) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  ctx.clearRect(0, 0, W, H);

  function arcText(text, font, radius, midAngle, fillColor, strokeColor, strokeW, flip) {
    const chars = [...text];
    ctx.font = font;
    const totalW = chars.reduce((s, c) => s + ctx.measureText(c).width, 0);
    const span = totalW / radius;
    let a = midAngle - span / 2;
    for (const ch of chars) {
      ctx.font = font;
      const cw = ctx.measureText(ch).width;
      const ca = a + cw / radius / 2;
      ctx.save();
      ctx.translate(cx + radius * Math.cos(ca), cy + radius * Math.sin(ca));
      ctx.rotate(ca + (flip ? -Math.PI / 2 : Math.PI / 2));
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      if (strokeW > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeW;
        ctx.lineJoin = "round";
        ctx.strokeText(ch, 0, 0);
      }
      ctx.fillStyle = fillColor;
      ctx.fillText(ch, 0, 0);
      ctx.restore();
      a += cw / radius;
    }
  }

  // ── helper: single laurel leaf ────────────────────────────────
  function drawLeaf(lx, ly, angle, size) {
    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-size * 0.38, -size * 0.5, -size * 0.28, -size, 0, -size * 1.1);
    ctx.bezierCurveTo(size * 0.28, -size, size * 0.38, -size * 0.5, 0, 0);
    ctx.fillStyle = "#7aaa5e";
    ctx.fill();
    // vein
    ctx.beginPath();
    ctx.moveTo(0, -1);
    ctx.lineTo(0, -size * 1.05);
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  // ── laurel wreath (full circular ring) ───────────────────────
  const wreathR = 158;
  const leafCount = 32;
  for (let i = 0; i < leafCount; i++) {
    const t = i / leafCount;
    const baseAngle = -Math.PI / 2 + t * Math.PI * 2;
    const lx = cx + wreathR * Math.cos(baseAngle);
    const ly = cy + wreathR * Math.sin(baseAngle);
    const leafAngle = baseAngle + Math.PI / 2;
    const size = i % 2 === 0 ? 22 : 19;
    drawLeaf(lx, ly, leafAngle, size);
  }

  // ── elegant bow at the top of the wreath ─────────────────────
  ctx.save();
  ctx.translate(cx, cy - wreathR - 4);
  const bowColor = "#c96050";
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.bezierCurveTo(s * 12, -18, s * 65, -50, s * 36, -4);
    ctx.bezierCurveTo(s * 18, 12, s * 7, 9, 0, 4);
    ctx.fillStyle = bowColor;
    ctx.globalAlpha = 0.88;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  // knot
  ctx.beginPath();
  ctx.ellipse(0, 2, 12, 9, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#a84030";
  ctx.globalAlpha = 1;
  ctx.fill();
  // ribbon tails
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(s * 5, 7);
    ctx.quadraticCurveTo(s * 26, 32, s * 20, 50);
    ctx.strokeStyle = bowColor;
    ctx.lineWidth = 8;
    ctx.globalAlpha = 0.82;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // ── top arc: "Best Wishes!" ───────────────────────────────────
  arcText(
    "Best Wishes!",
    `150px ${cursiveFont}`,
    345,
    -Math.PI / 2,
    "#cc4f63",
    "rgba(255,255,255,0.82)",
    18,
    false,
  );

  // ── bottom arc: "2026" ───────────────────────────────
  // arcText(
  //   "2026",
  //   `italic 68px ${cursiveFont}`,
  //   330,
  //   Math.PI / 2,
  //   "#9b7a3f",
  //   "rgba(255,255,255,0.78)",
  //   13,
  //   false,
  // );
}

function createCakeMessageDecal() {
  const textCanvas = document.createElement("canvas");
  textCanvas.width  = 1024;
  textCanvas.height = 1024;
  const textCtx = textCanvas.getContext("2d");
  if (!textCtx) return;

  const texture = new THREE.CanvasTexture(textCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  // Square plane fitted to tier-2 top surface (radius 2.5, inscribed square ≈3.5)
  const decal = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 3.4),
    new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.56,
      metalness: 0.01,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    }),
  );
  decal.rotation.x = -Math.PI / 2;
  decal.position.set(0, 4.35, 0);   // sits on tier-2 top frost surface
  tier2Bundle.add(decal);            // moves with tier-2 during intro drop

  const fallback = "'Brush Script MT', 'Segoe Script', cursive";
  drawCakeDecal(textCtx, fallback);
  texture.needsUpdate = true;

  new FontFace(
    "Great Vibes",
    "url(https://fonts.gstatic.com/s/greatvibes/v21/RWmMoKWR9v4ksMfaWd_JN9XFiaQ6DQ.woff2)",
  )
    .load()
    .then((face) => {
      document.fonts.add(face);
      drawCakeDecal(textCtx, "'Great Vibes', 'Brush Script MT', cursive");
      texture.needsUpdate = true;
    })
    .catch(() => {});
}

createCakeMessageDecal();

const starGroup = new THREE.Group();
scene.add(starGroup);

const starData = [];
for (let i = 0; i < 300; i += 1) {
  const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.03 + Math.random() * 0.05, 7, 7),
    new THREE.MeshBasicMaterial({
      color: i % 5 === 0 ? 0xfff0c8 : 0xffffff,
      transparent: true,
      opacity: 0.35 + Math.random() * 0.35,
      fog: false,
    }),
  );

  const dir = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 1.3 - 0.15,
    Math.random() * 2 - 1,
  ).normalize();

  const dist = 17 + Math.random() * 9;
  star.position.copy(dir.multiplyScalar(dist));
  starGroup.add(star);

  starData.push({
    mesh: star,
    home: star.position.clone(),
    baseOpacity: star.material.opacity,
    pulse: (0.12 + Math.random() * 0.18) * 1.2,
    speed: 0.35 + Math.random() * 1.05,
    phase: Math.random() * Math.PI * 2,
    sway: 0.01 + Math.random() * 0.03,
    driftPhase: Math.random() * Math.PI * 2,
    parallax: (0.08 + Math.random() * 0.16) * 1.2,
  });
}

const meteorGroup = new THREE.Group();
scene.add(meteorGroup);

const meteorData = [];

function spawnMeteor(time) {
  const angle = Math.random() * Math.PI * 2;
  const dirXZ = new THREE.Vector2(Math.cos(angle), Math.sin(angle));
  const start = new THREE.Vector3(
    dirXZ.x * (10 + Math.random() * 4),
    9 + Math.random() * 3.5,
    dirXZ.y * (8 + Math.random() * 4),
  );

  const travel = new THREE.Vector3(-dirXZ.x, -0.5 - Math.random() * 0.25, -dirXZ.y).normalize();
  const speed = 4.8 + Math.random() * 1.8;
  const life = 1.35 + Math.random() * 0.45;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.06 + Math.random() * 0.03, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xfff1cf,
      transparent: true,
      opacity: 0.95,
      fog: false,
    }),
  );

  const tail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.07, 0.95, 10),
    new THREE.MeshBasicMaterial({
      color: 0xffd9a8,
      transparent: true,
      opacity: 0.5,
      fog: false,
    }),
  );
  tail.position.copy(start.clone().add(travel.clone().multiplyScalar(-0.45)));
  tail.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), travel.clone().multiplyScalar(-1));

  head.position.copy(start);

  meteorGroup.add(tail, head);
  meteorData.push({
    head,
    tail,
    start,
    travel,
    speed,
    bornAt: time,
    life,
  });
}

let nextMeteorAt = 8;

const pointerTarget = new THREE.Vector2(0, 0);
const pointerSmooth = new THREE.Vector2(0, 0);

function updatePointerTarget(clientX, clientY) {
  const rect = renderer.domElement.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -((clientY - rect.top) / rect.height) * 2 + 1;
  pointerTarget.set(THREE.MathUtils.clamp(x, -1, 1), THREE.MathUtils.clamp(y, -1, 1));
}

renderer.domElement.addEventListener("pointermove", (event) => {
  updatePointerTarget(event.clientX, event.clientY);
});

renderer.domElement.addEventListener("touchmove", (event) => {
  if (event.touches.length > 0) {
    const t = event.touches[0];
    updatePointerTarget(t.clientX, t.clientY);
  }
}, { passive: true });

renderer.domElement.addEventListener("pointerleave", () => {
  pointerTarget.set(0, 0);
});

renderer.domElement.addEventListener("touchend", () => {
  pointerTarget.set(0, 0);
});

/* ─────────────────────────────────────────────────────────────────
   EASING HELPERS
───────────────────────────────────────────────────────────────── */
function saturate(v) { return Math.max(0, Math.min(1, v)); }

function easeOutBounce(t) {
  const n = 7.5625, d = 2.75;
  if (t < 1 / d)   return n * t * t;
  if (t < 2 / d)   { t -= 1.5  / d; return n * t * t + 0.75; }
  if (t < 2.5 / d) { t -= 2.25 / d; return n * t * t + 0.9375; }
                     t -= 2.625 / d; return n * t * t + 0.984375;
}

function easeOutCubic(t) { return 1 - (1 - t) ** 3; }

function easeOutQuart(t) { return 1 - (1 - t) ** 4; }

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// Gentle overshoot (s ≈ 0.3–0.8 for refined feel; default 1.70158 is too strong)
function easeOutBack(t, s = 0.45) {
  const c3 = s + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
}

function easeOutElastic(t) {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
}

/* ─────────────────────────────────────────────────────────────────
   IMPACT SPARKLES
───────────────────────────────────────────────────────────────── */
const sparkleGroup = new THREE.Group();
scene.add(sparkleGroup);
const sparkleData = [];
const _sparkleGeom = new THREE.SphereGeometry(0.055, 5, 5);

function spawnImpactRing(cx, cy, cz, count, elapsed, color) {
  for (let i = 0; i < count; i += 1) {
    const angle  = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const hSpeed = 1.6 + Math.random() * 2.4;
    const mesh   = new THREE.Mesh(
      _sparkleGeom,
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1.0, fog: false }),
    );
    mesh.position.set(cx, cy, cz);
    mesh.scale.setScalar(0.5 + Math.random() * 0.9);
    sparkleGroup.add(mesh);
    sparkleData.push({
      mesh,
      vx: Math.cos(angle) * hSpeed,
      vy: 0.7 + Math.random() * 2.0,
      vz: Math.sin(angle) * hSpeed,
      born: elapsed,
      life: 0.5 + Math.random() * 0.35,
    });
  }
}

function updateSparkles(elapsed, dt) {
  for (let i = sparkleData.length - 1; i >= 0; i -= 1) {
    const s   = sparkleData[i];
    const age = elapsed - s.born;
    if (age >= s.life) {
      sparkleGroup.remove(s.mesh);
      s.mesh.material.dispose();
      sparkleData.splice(i, 1);
      continue;
    }
    s.mesh.position.x += s.vx * dt;
    s.mesh.position.y += (s.vy - 9 * age) * dt;   // arc with gravity
    s.mesh.position.z += s.vz * dt;
    s.mesh.material.opacity = (1 - age / s.life) * 0.88;
  }
}

/* ─────────────────────────────────────────────────────────────────
   INTRO ANIMATION SYSTEM
───────────────────────────────────────────────────────────────── */
const DROP_H = 16;   // how high above scene things start

// Park everything above the viewport at start
plateBundle.position.y      = DROP_H;
tier1Bundle.position.y      = DROP_H;
tier2Bundle.position.y      = DROP_H;
creamGroup1.position.y      = DROP_H;
creamGroup2.position.y      = DROP_H;
strawberryGroup.position.y  = DROP_H;
candleGroup.position.y      = DROP_H;

// Timeline (seconds)
const TL = {
  plate:   { t0: 0.3,  d: 1.8 },   // plate glides in + decelerating spin
  tier1:   { t0: 1.8,  d: 2.0 },   // tier-1 descends smoothly
  tier2:   { t0: 3.5,  d: 1.7 },   // tier-2 floats down, subtle settle
  cream1:  { t0: 4.6,  d: 1.3 },   // bottom cream eases in
  cream2:  { t0: 5.5,  d: 1.2 },   // top cream eases in
  berries: { t0: 6.2,  d: 1.2 },   // strawberries settle gently
  candle:  { t0: 7.2,  d: 1.1 },   // candle drifts down, flame lights
  camEnd:  9.2,                      // camera finishes gliding
  end:     10.0,                     // controls enabled + HUD fades in
};

// One-shot trigger flags
const fired = {
  plate: false, tier1: false, tier2: false,
  berries: false, candle: false,
};

let introActive = true;
const _introV3 = new THREE.Vector3();

function updateIntro(elapsed) {
  // ── Smooth camera glide (wide → final) ────────────────────────
  const camT = easeInOutCubic(saturate(elapsed / TL.camEnd));
  camera.position.lerpVectors(CAM_INTRO_POS, CAM_FINAL_POS, camT);
  // lookAt target drifts from y=5 down to CAM_FINAL_TGT.y
  _introV3.set(0, 5 - (5 - CAM_FINAL_TGT.y) * camT, 0);
  camera.lookAt(_introV3);

  // ── Plate: easeOutExpo drop + single elegant spin ─────────────
  const tp = saturate((elapsed - TL.plate.t0) / TL.plate.d);
  plateBundle.position.y = DROP_H * (1 - easeOutExpo(tp));
  // One full spin that decelerates to a graceful stop
  plateBundle.rotation.y = easeOutExpo(tp) * Math.PI * 2;

  if (!fired.plate && tp >= 0.98) {
    fired.plate = true;
    spawnImpactRing(0, 0.1, 0, 20, elapsed, 0xd4b044);   // gold sparks
  }

  // ── Tier 1: easeOutQuart — weighted, smooth landing ──────────
  const t1 = saturate((elapsed - TL.tier1.t0) / TL.tier1.d);
  tier1Bundle.position.y = DROP_H * (1 - easeOutQuart(t1));

  if (!fired.tier1 && t1 >= 0.98) {
    fired.tier1 = true;
    spawnImpactRing(0, 0.5, 0, 22, elapsed, 0xfcf0d8);   // cream-white sparks
  }

  // ── Tier 2: easeOutBack — floats in with a delicate settle ───
  const t2 = saturate((elapsed - TL.tier2.t0) / TL.tier2.d);
  tier2Bundle.position.y = DROP_H * (1 - easeOutBack(t2, 0.35));

  if (!fired.tier2 && t2 >= 0.98) {
    fired.tier2 = true;
    spawnImpactRing(0, 2.5, 0, 16, elapsed, 0xfcf0d8);
  }

  // ── Cream 1: easeOutBack (gentle) — cream settles in place ───
  const tc1 = saturate((elapsed - TL.cream1.t0) / TL.cream1.d);
  creamGroup1.position.y = DROP_H * (1 - easeOutBack(tc1, 0.55));

  // ── Cream 2: easeOutBack (gentle) — tier-2 cream settles ─────
  const tc2 = saturate((elapsed - TL.cream2.t0) / TL.cream2.d);
  creamGroup2.position.y = DROP_H * (1 - easeOutBack(tc2, 0.5));

  // ── Berries: easeOutBack (minimal) — each berry nestles down ─
  const tb = saturate((elapsed - TL.berries.t0) / TL.berries.d);
  strawberryGroup.position.y = DROP_H * (1 - easeOutBack(tb, 0.4));

  if (!fired.berries && tb >= 0.98) {
    fired.berries = true;
    spawnImpactRing(0, 4.6, 0, 12, elapsed, 0xee8899);   // rosy sparks
  }

  // ── Candle: easeOutExpo — drifts to rest, then flame ignites ─
  const tcd = saturate((elapsed - TL.candle.t0) / TL.candle.d);
  candleGroup.position.y = DROP_H * (1 - easeOutExpo(tcd));

  if (!fired.candle && tcd >= 0.98) {
    fired.candle = true;
    candleData[0].enabled      = true;
    candleData[0].ignitionTime = elapsed;
    ignitionFlash.intensity    = 6.0;
    spawnImpactRing(0, 5.6, 0, 16, elapsed, 0xffd080);   // golden flame sparks
  }

  // Flame scale-up animation after ignition
  const cd0 = candleData[0];
  if (cd0.ignitionTime > 0) {
    const ignAge  = elapsed - cd0.ignitionTime;
    const flameT  = saturate(ignAge / 0.6);
    const fs      = easeOutElastic(flameT);
    cd0.flame.scale.set(0.68 * fs, 1.35 * fs, 0.68 * fs);
    cd0.light.intensity = flameT * 1.5;
  }

  // Ignition flash decay
  ignitionFlash.intensity = Math.max(0, ignitionFlash.intensity - 0.35);

  // ── End intro ────────────────────────────────────────────────
  if (elapsed >= TL.end) {
    introActive = false;

    // Snap all bundles to their final resting y
    plateBundle.position.y     = 0;
    tier1Bundle.position.y     = 0;
    tier2Bundle.position.y     = 0;
    creamGroup1.position.y     = 0;
    creamGroup2.position.y     = 0;
    strawberryGroup.position.y = 0;
    candleGroup.position.y     = 0;

    // Hand camera back to OrbitControls
    controls.enabled    = true;
    controls.autoRotate = true;
    controls.update();

    // Reveal HUD
    const hudEl = document.querySelector(".hud");
    if (hudEl) hudEl.classList.add("hud--visible");

    // Dismiss intro overlay
    const overlayEl = document.getElementById("intro-overlay");
    if (overlayEl) overlayEl.classList.add("intro-overlay--hidden");
  }
}

/* ─────────────────────────────────────────────────────────────────
   MAIN LOOP
───────────────────────────────────────────────────────────────── */
const clock   = new THREE.Clock();
let   elapsed = 0;

function animate() {
  requestAnimationFrame(animate);

  const dt = clock.getDelta();
  elapsed += dt;

  pointerSmooth.lerp(pointerTarget, 0.06);

  // ── Intro or steady-state ─────────────────────────────────────
  if (introActive) {
    updateIntro(elapsed);
    updateSparkles(elapsed, dt);
  } else {
    // Gentle float
    cakeRoot.position.y = Math.sin(elapsed) * 0.05;
    // Plate lazy-susan spin
    plateBundle.rotation.y += dt * 0.28;
    // Cream ring rotations (counter-rotate for visual interest)
    creamGroup1.rotation.y += dt * 0.05;
    creamGroup2.rotation.y -= dt * 0.04;
    // Candle flame wobble
    for (const candle of candleData) {
      if (!candle.enabled) continue;
      const wobble = Math.sin(elapsed * 10 + candle.phase) * 0.1;
      candle.flame.scale.set(0.68 - wobble * 0.2, 1.35 + wobble, 0.68 - wobble * 0.2);
      candle.light.intensity = 1.5 + Math.sin(elapsed * 12 + candle.phase) * 0.2;
    }
    updateSparkles(elapsed, dt);
    controls.update();
  }

  // ── Meteor shower ────────────────────────────────────────────
  if (elapsed >= nextMeteorAt) {
    spawnMeteor(elapsed);
    nextMeteorAt = elapsed + 8;
  }

  // ── Stars ────────────────────────────────────────────────────
  for (const star of starData) {
    const driftX = Math.sin(elapsed * (0.4 + star.speed * 0.2) + star.driftPhase) * star.sway;
    const driftY = Math.cos(elapsed * (0.5 + star.speed * 0.2) + star.driftPhase) * star.sway * 0.7;
    const driftZ = Math.cos(elapsed * (0.35 + star.speed * 0.2) + star.driftPhase) * star.sway;
    const parallaxX =  pointerSmooth.x * star.parallax;
    const parallaxY =  pointerSmooth.y * star.parallax * 0.45;
    const parallaxZ = -pointerSmooth.y * star.parallax;

    star.mesh.position.set(
      star.home.x + driftX + parallaxX,
      star.home.y + driftY + parallaxY,
      star.home.z + driftZ + parallaxZ,
    );

    const twinkle = 1 + 0.5 * Math.sin(elapsed * star.speed + star.phase);
    star.mesh.material.opacity = THREE.MathUtils.clamp(star.baseOpacity + twinkle * star.pulse, 0.12, 0.88);
    star.mesh.scale.setScalar(0.85 + twinkle * 0.6);
  }

  // ── Meteors ──────────────────────────────────────────────────
  for (let i = meteorData.length - 1; i >= 0; i -= 1) {
    const meteor = meteorData[i];
    const age    = elapsed - meteor.bornAt;
    const t      = age / meteor.life;

    if (t >= 1) {
      meteorGroup.remove(meteor.head, meteor.tail);
      meteor.head.geometry.dispose();
      meteor.tail.geometry.dispose();
      meteor.head.material.dispose();
      meteor.tail.material.dispose();
      meteorData.splice(i, 1);
      continue;
    }

    const distance = age * meteor.speed;
    const headPos  = meteor.start.clone().add(meteor.travel.clone().multiplyScalar(distance));
    const tailPos  = headPos.clone().add(meteor.travel.clone().multiplyScalar(-0.45));
    meteor.head.position.copy(headPos);
    meteor.tail.position.copy(tailPos);

    const fade = Math.max(0, 1 - t);
    meteor.head.material.opacity = 0.18 + fade * 0.78;
    meteor.tail.material.opacity = 0.08 + fade * 0.46;
    meteor.tail.scale.set(1, 1 + (1 - fade) * 0.35, 1);
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
});
