import { useEffect, useRef } from "react";
import * as THREE from "three";
import { POIS, ROAD, type Poi } from "./course";

export type MapMode = "orbit" | "fly" | "line";
export type Layer = "rock" | "asphalt" | "blueprint";

type Props = {
  mode: MapMode;
  layer: Layer;
  damDown: boolean;
  focusId: string | null;
  onSelect: (id: string) => void;
};

function hash(ix: number, iz: number) {
  const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function noise(x: number, z: number) {
  const x0 = Math.floor(x);
  const z0 = Math.floor(z);
  const fx = x - x0;
  const fz = z - z0;
  const sx = fx * fx * (3 - 2 * fx);
  const sz = fz * fz * (3 - 2 * fz);
  const a = hash(x0, z0);
  const b = hash(x0 + 1, z0);
  const c = hash(x0, z0 + 1);
  const d = hash(x0 + 1, z0 + 1);
  return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}

function fbm(x: number, z: number) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 5; i++) {
    v += a * noise(x * f, z * f);
    f *= 2.05;
    a *= 0.5;
  }
  return v;
}

export function CanyonView({ mode, layer, damDown, focusId, onSelect }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({ mode, layer, damDown, focusId, onSelect });
  state.current = { mode, layer, damDown, focusId, onSelect };

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#c4b49a");
    scene.fog = new THREE.FogExp2("#c9b79a", 0.00115);

    const camera = new THREE.PerspectiveCamera(48, el.clientWidth / Math.max(el.clientHeight, 1), 0.4, 2800);
    camera.position.set(220, 180, 260);

    const hemi = new THREE.HemisphereLight("#ffe6c4", "#6a5340", 0.72);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight("#fff1d6", 2.15);
    sun.position.set(280, 340, 120);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 20;
    sun.shadow.camera.far = 1400;
    sun.shadow.camera.left = -520;
    sun.shadow.camera.right = 520;
    sun.shadow.camera.top = 520;
    sun.shadow.camera.bottom = -520;
    scene.add(sun);

    const points = ROAD.map((r) => new THREE.Vector3(r[0], r[1], r[2]));
    const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.18);
    const samples = 520;
    const roadW = 16;

    const sampled: THREE.Vector3[] = [];
    const rights: THREE.Vector3[] = [];
    const tangs: THREE.Vector3[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const pnt = curve.getPointAt(t);
      const tan = curve.getTangentAt(t).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      let right = new THREE.Vector3().crossVectors(up, tan);
      if (right.lengthSq() < 1e-4) right.set(1, 0, 0);
      right.normalize();
      sampled.push(pnt);
      rights.push(right);
      tangs.push(tan);
    }

    function nearestRoad(x: number, z: number) {
      let best = 1e12;
      let idx = 0;
      const step = 2;
      for (let i = 0; i < sampled.length; i += step) {
        const dx = sampled[i].x - x;
        const dz = sampled[i].z - z;
        const d = dx * dx + dz * dz;
        if (d < best) {
          best = d;
          idx = i;
        }
      }
      return { d: Math.sqrt(best), i: idx, y: sampled[idx].y };
    }

    const SPAN = 920;
    const SEG = 150;
    const geo = new THREE.PlaneGeometry(SPAN, SPAN, SEG, SEG);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const n = fbm(x * 0.0045, z * 0.0045);
      const ridge = Math.abs(fbm(x * 0.01 + 20, z * 0.01) * 2 - 1);
      let y = 18 + n * 78 + ridge * 36;
      const river = Math.exp(-((x + 30) * (x + 30)) / (90 * 90)) * Math.exp(-((z * 0.15) ** 2) / 8);
      y -= river * 0;
      const meander = Math.sin(z * 0.008) * 70 - 20;
      const gorge = Math.abs(x - meander);
      y = Math.min(y, 8 + gorge * 0.22 + fbm(x * 0.02, z * 0.02) * 6);
      y = Math.max(y, -6 + fbm(x * 0.03, z * 0.03) * 3);

      const near = nearestRoad(x, z);
      const shoulder = 22;
      if (near.d < shoulder + 26) {
        const k = THREE.MathUtils.smoothstep(near.d, shoulder, shoulder + 26);
        const shelf = near.y - 0.35;
        y = THREE.MathUtils.lerp(shelf, y, k);
      }
      if (gorge < 18) y = Math.min(y, -4.5);
      pos.setY(i, y);

      const h = y;
      const rock = h > 40 ? [0.62, 0.48, 0.36] : h > 16 ? [0.55, 0.4, 0.28] : [0.42, 0.34, 0.24];
      const scrub = n > 0.62 && h > 20 && h < 55 ? 0.35 : 0;
      colors[i * 3] = rock[0] * (0.82 + n * 0.28) - scrub * 0.12;
      colors[i * 3 + 1] = rock[1] * (0.82 + n * 0.22) + scrub * 0.08;
      colors[i * 3 + 2] = rock[2] * (0.8 + n * 0.15) - scrub * 0.05;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const terrainMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.92,
      metalness: 0.02,
      flatShading: false,
    });
    const terrain = new THREE.Mesh(geo, terrainMat);
    terrain.receiveShadow = true;
    terrain.castShadow = false;
    scene.add(terrain);

    const waterGeo = new THREE.PlaneGeometry(SPAN * 0.92, SPAN * 0.92, 1, 1);
    waterGeo.rotateX(-Math.PI / 2);
    const water = new THREE.Mesh(
      waterGeo,
      new THREE.MeshStandardMaterial({
        color: "#3e6d78",
        roughness: 0.18,
        metalness: 0.35,
        transparent: true,
        opacity: 0.78,
      }),
    );
    water.position.y = -3.2;
    scene.add(water);

    function ribbon(width: number, yLift: number, closed = true) {
      const count = sampled.length - (closed ? 0 : 1);
      const g = new THREE.BufferGeometry();
      const verts = new Float32Array(sampled.length * 2 * 3);
      const uvs = new Float32Array(sampled.length * 2 * 2);
      for (let i = 0; i < sampled.length; i++) {
        const pnt = sampled[i];
        const r = rights[i];
        const lft = pnt.clone().addScaledVector(r, -width / 2);
        const rgt = pnt.clone().addScaledVector(r, width / 2);
        lft.y += yLift;
        rgt.y += yLift;
        verts.set([lft.x, lft.y, lft.z, rgt.x, rgt.y, rgt.z], i * 6);
        const v = (i / sampled.length) * 48;
        uvs.set([0, v, 1, v], i * 4);
      }
      const idx: number[] = [];
      const seg = closed ? sampled.length : sampled.length - 1;
      for (let i = 0; i < seg; i++) {
        const a = i * 2;
        const b = ((i + 1) % sampled.length) * 2;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
      g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      g.setIndex(idx);
      g.computeVertexNormals();
      return g;
    }

    const asphalt = new THREE.Mesh(
      ribbon(roadW, 0.15),
      new THREE.MeshStandardMaterial({ color: "#2c2c30", roughness: 0.84, metalness: 0.08 }),
    );
    asphalt.receiveShadow = true;
    scene.add(asphalt);

    const edgeL = new THREE.Mesh(
      ribbon(roadW + 1.1, 0.22),
      new THREE.MeshBasicMaterial({ color: "#f4f0e6" }),
    );
    // punch a thinner center by covering — edges via two thin ribbons
    scene.remove(edgeL);
    edgeL.geometry.dispose();

    function edgeRibbon(side: number) {
      const g = new THREE.BufferGeometry();
      const verts = new Float32Array(sampled.length * 2 * 3);
      for (let i = 0; i < sampled.length; i++) {
        const pnt = sampled[i];
        const r = rights[i];
        const inner = pnt.clone().addScaledVector(r, side * (roadW / 2 - 0.15));
        const outer = pnt.clone().addScaledVector(r, side * (roadW / 2 + 0.45));
        inner.y += 0.28;
        outer.y += 0.28;
        verts.set([inner.x, inner.y, inner.z, outer.x, outer.y, outer.z], i * 6);
      }
      const idx: number[] = [];
      for (let i = 0; i < sampled.length; i++) {
        const a = i * 2;
        const b = ((i + 1) % sampled.length) * 2;
        idx.push(a, b, a + 1, b, b + 1, a + 1);
      }
      g.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      return new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: "#f7f3ea" }));
    }
    scene.add(edgeRibbon(-1), edgeRibbon(1));

    // center dashes
    const dashMat = new THREE.MeshBasicMaterial({ color: "#efe6a8" });
    const dashGeo = new THREE.BoxGeometry(0.28, 0.06, 3.2);
    const dashes = new THREE.InstancedMesh(dashGeo, dashMat, 90);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 90; i++) {
      const t = (i / 90 + 0.012) % 1;
      const pnt = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      dummy.position.copy(pnt);
      dummy.position.y += 0.32;
      dummy.lookAt(pnt.clone().add(tan));
      dummy.updateMatrix();
      dashes.setMatrixAt(i, dummy.matrix);
    }
    scene.add(dashes);

    // start line
    const start = curve.getPointAt(0.01);
    const startTan = curve.getTangentAt(0.01);
    const startRight = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), startTan).normalize();
    const line = new THREE.Mesh(
      new THREE.BoxGeometry(roadW * 0.92, 0.08, 1.4),
      new THREE.MeshBasicMaterial({ color: "#f4f4f4" }),
    );
    line.position.copy(start);
    line.position.y += 0.34;
    line.lookAt(start.clone().add(startTan));
    scene.add(line);

    // shoulder barriers — instanced posts
    const postGeo = new THREE.BoxGeometry(0.35, 1.1, 0.9);
    const postMat = new THREE.MeshStandardMaterial({ color: "#c4552a", roughness: 0.6 });
    const posts = new THREE.InstancedMesh(postGeo, postMat, 160);
    posts.castShadow = true;
    let pi = 0;
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      const pnt = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      for (const side of [-1, 1]) {
        dummy.position.copy(pnt).addScaledVector(right, side * (roadW / 2 + 1.3));
        dummy.position.y += 0.7;
        dummy.rotation.set(0, Math.atan2(tan.x, tan.z), 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        posts.setMatrixAt(pi++, dummy.matrix);
      }
    }
    scene.add(posts);

    // rocks
    const rockGeo = new THREE.DodecahedronGeometry(1, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: "#7d6754", roughness: 0.95, flatShading: true });
    const rocks = new THREE.InstancedMesh(rockGeo, rockMat, 520);
    rocks.castShadow = true;
    rocks.receiveShadow = true;
    for (let i = 0; i < 520; i++) {
      const t = (i * 0.173) % 1;
      const pnt = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      const side = i % 2 === 0 ? 1 : -1;
      const out = 18 + (i % 7) * 6 + (hash(i, 3) * 22);
      const s = 1.4 + hash(i, 9) * 4.5;
      dummy.position.copy(pnt).addScaledVector(right, side * out);
      dummy.position.y += 1.2 + hash(i, 2) * 8;
      dummy.rotation.set(hash(i, 1) * 3, hash(i, 4) * 3, hash(i, 5));
      dummy.scale.set(s, s * (0.6 + hash(i, 6)), s * (0.8 + hash(i, 7) * 0.6));
      dummy.updateMatrix();
      rocks.setMatrixAt(i, dummy.matrix);
    }
    scene.add(rocks);

    // scrub cones
    const bushGeo = new THREE.ConeGeometry(1.3, 2.4, 5);
    const bushMat = new THREE.MeshStandardMaterial({ color: "#6d7a48", roughness: 1, flatShading: true });
    const bushes = new THREE.InstancedMesh(bushGeo, bushMat, 180);
    for (let i = 0; i < 180; i++) {
      const t = (i * 0.31) % 1;
      const pnt = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      dummy.position.copy(pnt).addScaledVector(right, (i % 2 ? 1 : -1) * (26 + hash(i, 8) * 30));
      dummy.position.y += 1.2;
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(0.8 + hash(i, 11));
      dummy.updateMatrix();
      bushes.setMatrixAt(i, dummy.matrix);
    }
    scene.add(bushes);

    function tanker(at: number, side: number) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.7, 1.7, 8.5, 12),
        new THREE.MeshStandardMaterial({ color: "#d7d2c6", metalness: 0.45, roughness: 0.35 }),
      );
      body.rotation.z = Math.PI / 2;
      body.castShadow = true;
      const cab = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 2.2, 2.2),
        new THREE.MeshStandardMaterial({ color: "#8d3a28", roughness: 0.5 }),
      );
      cab.position.set(5.2, -0.2, 0);
      cab.castShadow = true;
      g.add(body, cab);
      const pnt = curve.getPointAt(at);
      const tan = curve.getTangentAt(at);
      const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), tan).normalize();
      g.position.copy(pnt).addScaledVector(right, side * (roadW / 2 + 4));
      g.position.y += 2.1;
      g.lookAt(pnt.clone().add(tan).addScaledVector(right, side * (roadW / 2 + 4)));
      return g;
    }
    scene.add(tanker(0.07, 1), tanker(0.66, -1), tanker(0.5, 1));

    function heli(at: number) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 1.5, 6),
        new THREE.MeshStandardMaterial({ color: "#2a2e28", metalness: 0.4, roughness: 0.4 }),
      );
      const tail = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.45, 4),
        new THREE.MeshStandardMaterial({ color: "#2a2e28" }),
      );
      tail.position.z = -4.2;
      const rotor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.08, 0.35),
        new THREE.MeshStandardMaterial({ color: "#111" }),
      );
      rotor.position.y = 1.1;
      rotor.name = "rotor";
      g.add(body, tail, rotor);
      const pnt = curve.getPointAt(at);
      g.position.copy(pnt);
      g.position.y += 18;
      return g;
    }
    const heliA = heli(0.5);
    const heliB = heli(0.97);
    scene.add(heliA, heliB);

    // dam
    const damT = 0.42;
    const damP = curve.getPointAt(damT);
    const damTan = curve.getTangentAt(damT);
    const dam = new THREE.Group();
    dam.position.copy(damP);
    dam.position.y -= 8;
    const face = new THREE.Mesh(
      new THREE.BoxGeometry(54, 42, 10),
      new THREE.MeshStandardMaterial({ color: "#cfc6b6", roughness: 0.78 }),
    );
    face.castShadow = true;
    face.receiveShadow = true;
    const spill = new THREE.Mesh(
      new THREE.BoxGeometry(18, 8, 11),
      new THREE.MeshStandardMaterial({ color: "#b7aea0", roughness: 0.7 }),
    );
    spill.position.y = 12;
    const hut = new THREE.Mesh(
      new THREE.BoxGeometry(8, 5, 7),
      new THREE.MeshStandardMaterial({ color: "#6e5848" }),
    );
    hut.position.set(22, 16, 8);
    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.9, 28, 6),
      new THREE.MeshStandardMaterial({ color: "#8a8174", metalness: 0.3 }),
    );
    tower.position.set(-18, 22, -16);
    const cableGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-18, 34, -16),
      new THREE.Vector3(40, 22, 30),
    ]);
    const cable = new THREE.Line(cableGeo, new THREE.LineBasicMaterial({ color: "#2a2a2a" }));
    dam.add(face, spill, hut, tower, cable);
    dam.lookAt(damP.clone().add(damTan));
    scene.add(dam);

    // interior shortcut after collapse
    const shortcut = new THREE.Mesh(
      new THREE.BoxGeometry(14, 0.4, 70),
      new THREE.MeshStandardMaterial({ color: "#3a3a3e", roughness: 0.9 }),
    );
    shortcut.position.copy(damP);
    shortcut.position.y -= 6;
    shortcut.lookAt(damP.clone().add(new THREE.Vector3(0, -0.4, 1)));
    shortcut.visible = false;
    scene.add(shortcut);

    // generators
    const genGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.4, 4.2),
        new THREE.MeshStandardMaterial({ color: "#3c4a44", metalness: 0.35, roughness: 0.45 }),
      );
      m.position.set(i * 5.5, 1.2, 0);
      m.castShadow = true;
      genGroup.add(m);
    }
    const genP = curve.getPointAt(0.445);
    const genTan = curve.getTangentAt(0.445);
    const genRight = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), genTan).normalize();
    genGroup.position.copy(genP).addScaledVector(genRight, roadW / 2 + 8);
    genGroup.position.y += 0.2;
    scene.add(genGroup);

    // train bridge
    const tr = curve.getPointAt(0.78);
    const trestle = new THREE.Group();
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(78, 1.4, 6),
      new THREE.MeshStandardMaterial({ color: "#5c4638", roughness: 0.7 }),
    );
    deck.position.y = 22;
    const loco = new THREE.Mesh(
      new THREE.BoxGeometry(4, 3.2, 14),
      new THREE.MeshStandardMaterial({ color: "#1e2428", metalness: 0.4, roughness: 0.4 }),
    );
    loco.position.set(-8, 24.4, 0);
    for (let i = 0; i < 4; i++) {
      const pier = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 22, 2.2),
        new THREE.MeshStandardMaterial({ color: "#6a5a4c" }),
      );
      pier.position.set(-28 + i * 18, 11, 0);
      pier.castShadow = true;
      trestle.add(pier);
      const car = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 2.6, 8),
        new THREE.MeshStandardMaterial({ color: i % 2 ? "#8a3b2a" : "#d8d2c4" }),
      );
      car.position.set(6 + i * 10, 24, 0);
      trestle.add(car);
    }
    trestle.add(deck, loco);
    trestle.position.set(tr.x - 40, tr.y - 8, tr.z + 36);
    scene.add(trestle);

    // crane sweeper at hairpin
    const hp = curve.getPointAt(0.86);
    const crane = new THREE.Group();
    const mast = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 16, 1.1),
      new THREE.MeshStandardMaterial({ color: "#e0a322" }),
    );
    mast.position.y = 8;
    const boom = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.6, 18),
      new THREE.MeshStandardMaterial({ color: "#e0a322" }),
    );
    boom.position.set(0, 15, 7);
    crane.add(mast, boom);
    crane.position.copy(hp);
    crane.position.x += 14;
    scene.add(crane);

    // small bridges
    function span(at: number, len: number) {
      const pnt = curve.getPointAt(at);
      const tan = curve.getTangentAt(at);
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(roadW + 2, 1.2, len),
        new THREE.MeshStandardMaterial({ color: "#9a8b78", roughness: 0.72 }),
      );
      m.position.copy(pnt);
      m.position.y -= 0.4;
      m.lookAt(pnt.clone().add(tan));
      m.castShadow = true;
      return m;
    }
    scene.add(span(0.012, 36), span(0.62, 22));

    // tunnel mouth arches
    function arch(at: number) {
      const pnt = curve.getPointAt(at);
      const tan = curve.getTangentAt(at);
      const g = new THREE.Group();
      const left = new THREE.Mesh(
        new THREE.BoxGeometry(3, 9, 8),
        new THREE.MeshStandardMaterial({ color: "#5e4e40" }),
      );
      left.position.x = -9;
      const rightW = left.clone();
      rightW.position.x = 9;
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(21, 2.2, 8),
        new THREE.MeshStandardMaterial({ color: "#5e4e40" }),
      );
      cap.position.y = 5;
      g.add(left, rightW, cap);
      g.position.copy(pnt);
      g.position.y += 2;
      g.lookAt(pnt.clone().add(tan));
      return g;
    }
    scene.add(arch(0.145), arch(0.2));

    // POI beacons
    const beaconGeo = new THREE.SphereGeometry(1.15, 12, 10);
    const beaconMat = {
      landmark: new THREE.MeshStandardMaterial({ color: "#f0c36a", emissive: "#8a6418", emissiveIntensity: 0.6 }),
      l1: new THREE.MeshStandardMaterial({ color: "#e25b2a", emissive: "#8a2a10", emissiveIntensity: 0.7 }),
      l2: new THREE.MeshStandardMaterial({ color: "#ff4d3a", emissive: "#ff2208", emissiveIntensity: 0.9 }),
      shortcut: new THREE.MeshStandardMaterial({ color: "#7dcea0", emissive: "#1d6b42", emissiveIntensity: 0.6 }),
    };
    const beacons: { id: string; mesh: THREE.Mesh; base: THREE.Vector3 }[] = [];
    for (const poi of POIS) {
      const pnt = curve.getPointAt(poi.t);
      const mesh = new THREE.Mesh(beaconGeo, beaconMat[poi.kind]);
      mesh.position.copy(pnt);
      mesh.position.y += 7.5;
      mesh.userData.poi = poi.id;
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 7, 5),
        new THREE.MeshStandardMaterial({ color: "#f4ecdf" }),
      );
      stem.position.copy(pnt);
      stem.position.y += 3.4;
      scene.add(mesh, stem);
      beacons.push({ id: poi.id, mesh, base: mesh.position.clone() });
    }

    // blueprint overlay lines
    const linePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 200; i++) linePts.push(curve.getPointAt(i / 200).add(new THREE.Vector3(0, 1.2, 0)));
    const racingLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(linePts),
      new THREE.LineBasicMaterial({ color: "#e25b2a" }),
    );
    racingLine.visible = false;
    scene.add(racingLine);

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(1400, 24, 16),
      new THREE.MeshBasicMaterial({ color: "#e7d3b4", side: THREE.BackSide }),
    );
    scene.add(sky);

    // interaction
    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const keys: Record<string, boolean> = {};
    let yaw = 0.7;
    let pitch = -0.45;
    let flyPos = new THREE.Vector3(180, 120, 240);
    let orbitTarget = new THREE.Vector3(40, 20, 0);
    let orbitR = 340;
    let orbitYaw = 0.6;
    let orbitPitch = 0.62;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lineT = 0;
    const focusLerp = { id: null as string | null, t: 1 };

    const asphaltMatRock = new THREE.MeshStandardMaterial({ color: "#2c2c30", roughness: 0.84, metalness: 0.08 });
    const asphaltMatDark = new THREE.MeshStandardMaterial({ color: "#1a1a1e", roughness: 0.8, metalness: 0.05 });
    const asphaltMatBlue = new THREE.MeshStandardMaterial({
      color: "#16324a",
      roughness: 0.5,
      emissive: "#0b3a55",
      emissiveIntensity: 0.45,
    });
    const skyMatDay = new THREE.MeshBasicMaterial({ color: "#e7d3b4", side: THREE.BackSide });
    const skyMatBlue = new THREE.MeshBasicMaterial({ color: "#071018", side: THREE.BackSide });
    sky.material = skyMatDay;

    let applied: Layer | null = null;
    function applyLayer(layer: Layer) {
      if (applied === layer) return;
      applied = layer;
      const blue = layer === "blueprint";
      terrain.visible = !blue;
      water.visible = !blue;
      rocks.visible = layer !== "blueprint";
      bushes.visible = layer === "rock";
      racingLine.visible = blue;
      asphalt.material = layer === "asphalt" ? asphaltMatDark : blue ? asphaltMatBlue : asphaltMatRock;
      scene.background = new THREE.Color(blue ? "#071018" : "#c4b49a");
      scene.fog = new THREE.FogExp2(blue ? "#071018" : "#c9b79a", blue ? 0.0008 : 0.00115);
      sky.material = blue ? skyMatBlue : skyMatDay;
      renderer.toneMappingExposure = blue ? 0.9 : 1.05;
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onPointerUp() {
      dragging = false;
    }
    function onPointerMove(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      const m = state.current.mode;
      if (m === "fly") {
        yaw -= dx * 0.0045;
        pitch = THREE.MathUtils.clamp(pitch - dy * 0.0035, -1.25, 1.2);
      } else {
        orbitYaw -= dx * 0.005;
        orbitPitch = THREE.MathUtils.clamp(orbitPitch + dy * 0.0035, 0.18, 1.35);
      }
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      orbitR = THREE.MathUtils.clamp(orbitR + e.deltaY * 0.35, 60, 820);
    }
    function onClick() {
      ray.setFromCamera(pointer, camera);
      const hits = ray.intersectObjects(beacons.map((b) => b.mesh));
      if (hits[0]) state.current.onSelect(hits[0].object.userData.poi as string);
    }
    function onKeyDown(e: KeyboardEvent) {
      keys[e.code] = true;
    }
    function onKeyUp(e: KeyboardEvent) {
      keys[e.code] = false;
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    const clock = new THREE.Timer();
    clock.connect(document);
    let raf = 0;
    const ahead = new THREE.Vector3();
    const camRight = new THREE.Vector3();
    const wish = new THREE.Vector3();

    function frame() {
      raf = requestAnimationFrame(frame);
      clock.update();
      const dt = Math.min(clock.getDelta(), 0.05);
      const st = state.current;

      shortcut.visible = st.damDown;
      const collapse = st.damDown ? 1 : 0;
      face.rotation.z = collapse * 0.18;
      face.position.y = -collapse * 10;
      face.position.z = collapse * 6;
      tower.rotation.z = collapse * 1.15;
      tower.position.x = -18 + collapse * 16;
      tower.position.y = 22 - collapse * 14;

      heliA.traverse((o) => {
        if (o.name === "rotor") o.rotation.y += dt * 12;
      });
      heliB.traverse((o) => {
        if (o.name === "rotor") o.rotation.y += dt * 12;
      });
      heliA.position.y = curve.getPointAt(0.5).y + 16 + Math.sin(clock.getElapsed() * 1.4) * 0.6;
      heliB.position.y = curve.getPointAt(0.97).y + 16 + Math.sin(clock.getElapsed() * 1.7) * 0.6;

      for (const b of beacons) {
        b.mesh.position.y = b.base.y + Math.sin(clock.getElapsed() * 2 + b.base.x) * 0.35;
        const hot = st.focusId === b.id;
        b.mesh.scale.setScalar(hot ? 1.55 : 1);
      }

      applyLayer(st.layer);

      if (st.focusId && focusLerp.id !== st.focusId) {
        focusLerp.id = st.focusId;
        focusLerp.t = 0;
        const poi = POIS.find((p) => p.id === st.focusId);
        if (poi) orbitTarget.copy(curve.getPointAt(poi.t));
      }
      focusLerp.t = Math.min(1, focusLerp.t + dt * 1.4);

      if (st.mode === "fly") {
        const cy = Math.cos(yaw);
        const sy = Math.sin(yaw);
        const cp = Math.cos(pitch);
        const sp = Math.sin(pitch);
        ahead.set(-sy * cp, sp, -cy * cp).normalize();
        camRight.set(cy, 0, -sy).normalize();
        // A strafe left relative to view (right vector points to camera-right)
        wish.set(0, 0, 0);
        const speed = (keys.ShiftLeft || keys.ShiftRight ? 180 : 78) * dt;
        if (keys.KeyW || keys.ArrowUp) wish.addScaledVector(ahead, speed);
        if (keys.KeyS || keys.ArrowDown) wish.addScaledVector(ahead, -speed);
        if (keys.KeyA) wish.addScaledVector(camRight, -speed);
        if (keys.KeyD) wish.addScaledVector(camRight, speed);
        if (keys.KeyE || keys.Space) wish.y += speed;
        if (keys.KeyQ) wish.y -= speed;
        flyPos.add(wish);
        camera.position.copy(flyPos);
        camera.lookAt(flyPos.clone().add(ahead));
      } else if (st.mode === "line") {
        lineT = (lineT + dt * 0.035) % 1;
        const pnt = curve.getPointAt(lineT);
        const tan = curve.getTangentAt(lineT);
        const look = curve.getPointAt((lineT + 0.02) % 1);
        camera.position.copy(pnt).addScaledVector(tan, -28);
        camera.position.y += 12;
        camera.lookAt(look.x, look.y + 2, look.z);
        flyPos.copy(camera.position);
      } else {
        const tp = orbitPitch;
        camera.position.set(
          orbitTarget.x + Math.sin(orbitYaw) * Math.cos(tp * 0.15) * orbitR * Math.cos(1.1 - tp),
          orbitTarget.y + Math.sin(tp) * orbitR * 0.72,
          orbitTarget.z + Math.cos(orbitYaw) * orbitR * Math.cos(1.1 - tp),
        );
        // cleaner spherical
        const rad = orbitR;
        const phi = orbitPitch;
        camera.position.set(
          orbitTarget.x + rad * Math.sin(phi) * Math.sin(orbitYaw),
          orbitTarget.y + rad * Math.cos(phi),
          orbitTarget.z + rad * Math.sin(phi) * Math.cos(orbitYaw),
        );
        camera.lookAt(orbitTarget);
        flyPos.copy(camera.position);
        const to = orbitTarget.clone().sub(camera.position).normalize();
        yaw = Math.atan2(-to.x, -to.z);
        pitch = Math.asin(THREE.MathUtils.clamp(to.y, -1, 1));
      }

      renderer.render(scene, camera);
    }
    frame();

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = Math.max(el.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      clock.dispose();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
    // mount once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={host} className="absolute inset-0" />;
}

export type { Poi };
