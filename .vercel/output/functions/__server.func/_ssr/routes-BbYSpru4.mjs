import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as LocateFixed, i as Map, n as Route, o as Dam, r as Mountain } from "../_libs/lucide-react.mjs";
import { C as PlaneGeometry, D as Timer, E as SphereGeometry, O as Vector2, S as PerspectiveCamera, T as Scene, _ as MathUtils, a as CatmullRomCurve3, b as MeshStandardMaterial, c as CylinderGeometry, d as FogExp2, f as Group, g as LineBasicMaterial, h as Line, i as BufferGeometry, k as Vector3, l as DirectionalLight, m as InstancedMesh, n as BoxGeometry, o as Color, p as HemisphereLight, r as BufferAttribute, s as ConeGeometry, t as WebGLRenderer, u as DodecahedronGeometry, v as Mesh, w as Raycaster, x as Object3D, y as MeshBasicMaterial } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BbYSpru4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var S = 2.15;
function p(x, y, z) {
	return [
		x * S,
		y * S * .72,
		z * S
	];
}
/** Closed centerline, start/finish first. Elevations are shelf height. */
var ROAD = [
	p(70, 46, -200),
	p(28, 44, -168),
	p(-8, 40, -120),
	p(-36, 34, -62),
	p(-48, 24, -8),
	p(-28, 12, 48),
	p(8, 6, 98),
	p(58, 8, 138),
	p(118, 12, 156),
	p(176, 16, 142),
	p(214, 18, 100),
	p(228, 20, 48),
	p(210, 26, -4),
	p(168, 32, -42),
	p(112, 36, -62),
	p(52, 20, -48),
	p(4, 14, -18),
	p(-42, 14, 18),
	p(-86, 18, 58),
	p(-108, 22, 108),
	p(-78, 24, 152),
	p(-18, 26, 172),
	p(42, 28, 158),
	p(92, 30, 122),
	p(124, 32, 72),
	p(138, 34, 18),
	p(122, 38, -36),
	p(168, 36, -8),
	p(196, 32, -62),
	p(168, 28, -112),
	p(118, 22, -138),
	p(78, 14, -118),
	p(62, 28, -156),
	p(74, 42, -188)
];
var POIS = [
	{
		id: "start",
		title: "Gorge bridge",
		detail: "Start/finish. A short span over the cut. Three laps in Race.",
		t: .01,
		kind: "landmark"
	},
	{
		id: "tanker-1",
		title: "Gasoline truck",
		detail: "Lonely tanker on the right shoulder. Level 1 blast.",
		t: .07,
		kind: "l1"
	},
	{
		id: "shortcut-1",
		title: "Early shortcut",
		detail: "Opens only on the run into the end of lap one.",
		t: .1,
		kind: "shortcut"
	},
	{
		id: "tunnel",
		title: "Descent tunnel",
		detail: "The shelf drops hard through a rock cut, then a sharp right onto the vista.",
		t: .16,
		kind: "landmark"
	},
	{
		id: "boulders",
		title: "Boulder barricades",
		detail: "Timber cribs holding rock. Four barricade sites ring this course.",
		t: .3,
		kind: "l1"
	},
	{
		id: "rockwall-1",
		title: "Rigged rock wall",
		detail: "Internal charges sweep cars off the outside or bury them in debris.",
		t: .35,
		kind: "l1"
	},
	{
		id: "dam",
		title: "Canyon dam",
		detail: "The course’s one route changer. A full meter cracks the face, drops the road, and clips the span cable so a tower falls on the hut.",
		t: .42,
		kind: "l2"
	},
	{
		id: "grates",
		title: "Road grates",
		detail: "Two deck plates on the lower dam road. Drive them, or blow them and pinch the line.",
		t: .48,
		kind: "l1"
	},
	{
		id: "cliff",
		title: "Cliff lip",
		detail: "A shelf hangs over the racing line. Trigger it and two boulders sit in the groove.",
		t: .55,
		kind: "l1"
	},
	{
		id: "sbridge",
		title: "S-curve bridge",
		detail: "Tight S onto a short span, tanker on the exit, then an immediate left.",
		t: .62,
		kind: "landmark"
	},
	{
		id: "tanker-2",
		title: "Exit tanker",
		detail: "Second gasoline truck, parked on the left-hand exit.",
		t: .66,
		kind: "l1"
	},
	{
		id: "boulder-drop",
		title: "Boulder drop",
		detail: "Right-hander where charges kick rock onto the asphalt.",
		t: .74,
		kind: "l1"
	},
	{
		id: "train",
		title: "Train bridge",
		detail: "Level 2. Girders go first, then the whole trestle. The right deck blocks half the road; the left slumps against the tunnel exit.",
		t: .78,
		kind: "l2"
	},
	{
		id: "gens",
		title: "Generators",
		detail: "Three units on the dam-altered spur. They shove cars across the shelf.",
		t: .44,
		kind: "l1"
	},
	{
		id: "shortcut-2",
		title: "Dam shortcut",
		detail: "Only after the dam falls: through the core, past the holstered generator, left, and off the rubble jump.",
		t: .45,
		kind: "shortcut"
	},
	{
		id: "heli-1",
		title: "Helicopter",
		detail: "Right-hander on the alternate. Bomb bay over the groove.",
		t: .5,
		kind: "l1"
	},
	{
		id: "sweep-wall",
		title: "Sweep wall",
		detail: "Where the lines merge. The right wall is packed with graded rock.",
		t: .8,
		kind: "l1"
	},
	{
		id: "hairpin",
		title: "Hairpin crane",
		detail: "Right, short left, then the hairpin. Roadside sweeper.",
		t: .86,
		kind: "l1"
	},
	{
		id: "crush",
		title: "Overhang",
		detail: "A rock brow built to crush a perfect trigger, or shockwave you off the shelf.",
		t: .9,
		kind: "l2"
	},
	{
		id: "rockwall-2",
		title: "Downhill wall",
		detail: "Sudden drop. The wall on the right leaves almost no escape.",
		t: .94,
		kind: "l1"
	},
	{
		id: "heli-2",
		title: "Final helicopter",
		detail: "Last left before the line. One more bomb run.",
		t: .97,
		kind: "l1"
	}
];
var NOTES = {
	laps: 3,
	powerPlays: 24,
	level1: 21,
	level2: 3,
	routeChangers: 1,
	shortcuts: 2,
	sharedWithGraveyard: 5
};
function hash(ix, iz) {
	const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453;
	return n - Math.floor(n);
}
function noise(x, z) {
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
function fbm(x, z) {
	let v = 0;
	let a = .5;
	let f = 1;
	for (let i = 0; i < 5; i++) {
		v += a * noise(x * f, z * f);
		f *= 2.05;
		a *= .5;
	}
	return v;
}
function CanyonView({ mode, layer, damDown, focusId, onSelect }) {
	const host = (0, import_react.useRef)(null);
	const state = (0, import_react.useRef)({
		mode,
		layer,
		damDown,
		focusId,
		onSelect
	});
	state.current = {
		mode,
		layer,
		damDown,
		focusId,
		onSelect
	};
	(0, import_react.useEffect)(() => {
		const el = host.current;
		if (!el) return;
		const renderer = new WebGLRenderer({
			antialias: true,
			alpha: false
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
		renderer.setSize(el.clientWidth, el.clientHeight);
		renderer.shadowMap.enabled = true;
		renderer.toneMapping = 4;
		renderer.toneMappingExposure = 1.05;
		el.appendChild(renderer.domElement);
		const scene = new Scene();
		scene.background = new Color("#c4b49a");
		scene.fog = new FogExp2("#c9b79a", .00115);
		const camera = new PerspectiveCamera(48, el.clientWidth / Math.max(el.clientHeight, 1), .4, 2800);
		camera.position.set(220, 180, 260);
		const hemi = new HemisphereLight("#ffe6c4", "#6a5340", .72);
		scene.add(hemi);
		const sun = new DirectionalLight("#fff1d6", 2.15);
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
		const points = ROAD.map((r) => new Vector3(r[0], r[1], r[2]));
		const curve = new CatmullRomCurve3(points, true, "catmullrom", .18);
		const samples = 520;
		const roadW = 16;
		const sampled = [];
		const rights = [];
		const tangs = [];
		for (let i = 0; i <= samples; i++) {
			const t = i / samples;
			const pnt = curve.getPointAt(t);
			const tan = curve.getTangentAt(t).normalize();
			const up = new Vector3(0, 1, 0);
			let right = new Vector3().crossVectors(up, tan);
			if (right.lengthSq() < 1e-4) right.set(1, 0, 0);
			right.normalize();
			sampled.push(pnt);
			rights.push(right);
			tangs.push(tan);
		}
		function nearestRoad(x, z) {
			let best = 0xe8d4a51000;
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
			return {
				d: Math.sqrt(best),
				i: idx,
				y: sampled[idx].y
			};
		}
		const SPAN = 920;
		const SEG = 150;
		const geo = new PlaneGeometry(SPAN, SPAN, SEG, SEG);
		geo.rotateX(-Math.PI / 2);
		const pos = geo.attributes.position;
		const colors = new Float32Array(pos.count * 3);
		for (let i = 0; i < pos.count; i++) {
			const x = pos.getX(i);
			const z = pos.getZ(i);
			const n = fbm(x * .0045, z * .0045);
			const ridge = Math.abs(fbm(x * .01 + 20, z * .01) * 2 - 1);
			let y = 18 + n * 78 + ridge * 36;
			const river = Math.exp(-((x + 30) * (x + 30)) / 8100) * Math.exp(-((z * .15) ** 2) / 8);
			y -= river * 0;
			const meander = Math.sin(z * .008) * 70 - 20;
			const gorge = Math.abs(x - meander);
			y = Math.min(y, 8 + gorge * .22 + fbm(x * .02, z * .02) * 6);
			y = Math.max(y, -6 + fbm(x * .03, z * .03) * 3);
			const near = nearestRoad(x, z);
			const shoulder = 22;
			if (near.d < 48) {
				const k = MathUtils.smoothstep(near.d, shoulder, 48);
				const shelf = near.y - .35;
				y = MathUtils.lerp(shelf, y, k);
			}
			if (gorge < 18) y = Math.min(y, -4.5);
			pos.setY(i, y);
			const h = y;
			const rock = h > 40 ? [
				.62,
				.48,
				.36
			] : h > 16 ? [
				.55,
				.4,
				.28
			] : [
				.42,
				.34,
				.24
			];
			const scrub = n > .62 && h > 20 && h < 55 ? .35 : 0;
			colors[i * 3] = rock[0] * (.82 + n * .28) - scrub * .12;
			colors[i * 3 + 1] = rock[1] * (.82 + n * .22) + scrub * .08;
			colors[i * 3 + 2] = rock[2] * (.8 + n * .15) - scrub * .05;
		}
		geo.setAttribute("color", new BufferAttribute(colors, 3));
		geo.computeVertexNormals();
		const terrainMat = new MeshStandardMaterial({
			vertexColors: true,
			roughness: .92,
			metalness: .02,
			flatShading: false
		});
		const terrain = new Mesh(geo, terrainMat);
		terrain.receiveShadow = true;
		terrain.castShadow = false;
		scene.add(terrain);
		const waterGeo = new PlaneGeometry(SPAN * .92, SPAN * .92, 1, 1);
		waterGeo.rotateX(-Math.PI / 2);
		const water = new Mesh(waterGeo, new MeshStandardMaterial({
			color: "#3e6d78",
			roughness: .18,
			metalness: .35,
			transparent: true,
			opacity: .78
		}));
		water.position.y = -3.2;
		scene.add(water);
		function ribbon(width, yLift, closed = true) {
			sampled.length - (closed ? 0 : 1);
			const g = new BufferGeometry();
			const verts = new Float32Array(sampled.length * 2 * 3);
			const uvs = new Float32Array(sampled.length * 2 * 2);
			for (let i = 0; i < sampled.length; i++) {
				const pnt = sampled[i];
				const r = rights[i];
				const lft = pnt.clone().addScaledVector(r, -width / 2);
				const rgt = pnt.clone().addScaledVector(r, width / 2);
				lft.y += yLift;
				rgt.y += yLift;
				verts.set([
					lft.x,
					lft.y,
					lft.z,
					rgt.x,
					rgt.y,
					rgt.z
				], i * 6);
				const v = i / sampled.length * 48;
				uvs.set([
					0,
					v,
					1,
					v
				], i * 4);
			}
			const idx = [];
			const seg = closed ? sampled.length : sampled.length - 1;
			for (let i = 0; i < seg; i++) {
				const a = i * 2;
				const b = (i + 1) % sampled.length * 2;
				idx.push(a, b, a + 1, b, b + 1, a + 1);
			}
			g.setAttribute("position", new BufferAttribute(verts, 3));
			g.setAttribute("uv", new BufferAttribute(uvs, 2));
			g.setIndex(idx);
			g.computeVertexNormals();
			return g;
		}
		const asphalt = new Mesh(ribbon(roadW, .15), new MeshStandardMaterial({
			color: "#2c2c30",
			roughness: .84,
			metalness: .08
		}));
		asphalt.receiveShadow = true;
		scene.add(asphalt);
		const edgeL = new Mesh(ribbon(17.1, .22), new MeshBasicMaterial({ color: "#f4f0e6" }));
		scene.remove(edgeL);
		edgeL.geometry.dispose();
		function edgeRibbon(side) {
			const g = new BufferGeometry();
			const verts = new Float32Array(sampled.length * 2 * 3);
			for (let i = 0; i < sampled.length; i++) {
				const pnt = sampled[i];
				const r = rights[i];
				const inner = pnt.clone().addScaledVector(r, side * (roadW / 2 - .15));
				const outer = pnt.clone().addScaledVector(r, side * 8.45);
				inner.y += .28;
				outer.y += .28;
				verts.set([
					inner.x,
					inner.y,
					inner.z,
					outer.x,
					outer.y,
					outer.z
				], i * 6);
			}
			const idx = [];
			for (let i = 0; i < sampled.length; i++) {
				const a = i * 2;
				const b = (i + 1) % sampled.length * 2;
				idx.push(a, b, a + 1, b, b + 1, a + 1);
			}
			g.setAttribute("position", new BufferAttribute(verts, 3));
			g.setIndex(idx);
			g.computeVertexNormals();
			return new Mesh(g, new MeshBasicMaterial({ color: "#f7f3ea" }));
		}
		scene.add(edgeRibbon(-1), edgeRibbon(1));
		const dashMat = new MeshBasicMaterial({ color: "#efe6a8" });
		const dashGeo = new BoxGeometry(.28, .06, 3.2);
		const dashes = new InstancedMesh(dashGeo, dashMat, 90);
		const dummy = new Object3D();
		for (let i = 0; i < 90; i++) {
			const t = (i / 90 + .012) % 1;
			const pnt = curve.getPointAt(t);
			const tan = curve.getTangentAt(t);
			dummy.position.copy(pnt);
			dummy.position.y += .32;
			dummy.lookAt(pnt.clone().add(tan));
			dummy.updateMatrix();
			dashes.setMatrixAt(i, dummy.matrix);
		}
		scene.add(dashes);
		const start = curve.getPointAt(.01);
		const startTan = curve.getTangentAt(.01);
		new Vector3().crossVectors(new Vector3(0, 1, 0), startTan).normalize();
		const line = new Mesh(new BoxGeometry(roadW * .92, .08, 1.4), new MeshBasicMaterial({ color: "#f4f4f4" }));
		line.position.copy(start);
		line.position.y += .34;
		line.lookAt(start.clone().add(startTan));
		scene.add(line);
		const postGeo = new BoxGeometry(.35, 1.1, .9);
		const postMat = new MeshStandardMaterial({
			color: "#c4552a",
			roughness: .6
		});
		const posts = new InstancedMesh(postGeo, postMat, 160);
		posts.castShadow = true;
		let pi = 0;
		for (let i = 0; i < 80; i++) {
			const t = i / 80;
			const pnt = curve.getPointAt(t);
			const tan = curve.getTangentAt(t);
			const right = new Vector3().crossVectors(new Vector3(0, 1, 0), tan).normalize();
			for (const side of [-1, 1]) {
				dummy.position.copy(pnt).addScaledVector(right, side * 9.3);
				dummy.position.y += .7;
				dummy.rotation.set(0, Math.atan2(tan.x, tan.z), 0);
				dummy.scale.set(1, 1, 1);
				dummy.updateMatrix();
				posts.setMatrixAt(pi++, dummy.matrix);
			}
		}
		scene.add(posts);
		const rockGeo = new DodecahedronGeometry(1, 0);
		const rockMat = new MeshStandardMaterial({
			color: "#7d6754",
			roughness: .95,
			flatShading: true
		});
		const rocks = new InstancedMesh(rockGeo, rockMat, 520);
		rocks.castShadow = true;
		rocks.receiveShadow = true;
		for (let i = 0; i < 520; i++) {
			const t = i * .173 % 1;
			const pnt = curve.getPointAt(t);
			const tan = curve.getTangentAt(t);
			const right = new Vector3().crossVectors(new Vector3(0, 1, 0), tan).normalize();
			const side = i % 2 === 0 ? 1 : -1;
			const out = 18 + i % 7 * 6 + hash(i, 3) * 22;
			const s = 1.4 + hash(i, 9) * 4.5;
			dummy.position.copy(pnt).addScaledVector(right, side * out);
			dummy.position.y += 1.2 + hash(i, 2) * 8;
			dummy.rotation.set(hash(i, 1) * 3, hash(i, 4) * 3, hash(i, 5));
			dummy.scale.set(s, s * (.6 + hash(i, 6)), s * (.8 + hash(i, 7) * .6));
			dummy.updateMatrix();
			rocks.setMatrixAt(i, dummy.matrix);
		}
		scene.add(rocks);
		const bushGeo = new ConeGeometry(1.3, 2.4, 5);
		const bushMat = new MeshStandardMaterial({
			color: "#6d7a48",
			roughness: 1,
			flatShading: true
		});
		const bushes = new InstancedMesh(bushGeo, bushMat, 180);
		for (let i = 0; i < 180; i++) {
			const t = i * .31 % 1;
			const pnt = curve.getPointAt(t);
			const tan = curve.getTangentAt(t);
			const right = new Vector3().crossVectors(new Vector3(0, 1, 0), tan).normalize();
			dummy.position.copy(pnt).addScaledVector(right, (i % 2 ? 1 : -1) * (26 + hash(i, 8) * 30));
			dummy.position.y += 1.2;
			dummy.rotation.set(0, 0, 0);
			dummy.scale.setScalar(.8 + hash(i, 11));
			dummy.updateMatrix();
			bushes.setMatrixAt(i, dummy.matrix);
		}
		scene.add(bushes);
		function tanker(at, side) {
			const g = new Group();
			const body = new Mesh(new CylinderGeometry(1.7, 1.7, 8.5, 12), new MeshStandardMaterial({
				color: "#d7d2c6",
				metalness: .45,
				roughness: .35
			}));
			body.rotation.z = Math.PI / 2;
			body.castShadow = true;
			const cab = new Mesh(new BoxGeometry(2.4, 2.2, 2.2), new MeshStandardMaterial({
				color: "#8d3a28",
				roughness: .5
			}));
			cab.position.set(5.2, -.2, 0);
			cab.castShadow = true;
			g.add(body, cab);
			const pnt = curve.getPointAt(at);
			const tan = curve.getTangentAt(at);
			const right = new Vector3().crossVectors(new Vector3(0, 1, 0), tan).normalize();
			g.position.copy(pnt).addScaledVector(right, side * 12);
			g.position.y += 2.1;
			g.lookAt(pnt.clone().add(tan).addScaledVector(right, side * 12));
			return g;
		}
		scene.add(tanker(.07, 1), tanker(.66, -1), tanker(.5, 1));
		function heli(at) {
			const g = new Group();
			const body = new Mesh(new BoxGeometry(2.2, 1.5, 6), new MeshStandardMaterial({
				color: "#2a2e28",
				metalness: .4,
				roughness: .4
			}));
			const tail = new Mesh(new BoxGeometry(.4, .45, 4), new MeshStandardMaterial({ color: "#2a2e28" }));
			tail.position.z = -4.2;
			const rotor = new Mesh(new BoxGeometry(10, .08, .35), new MeshStandardMaterial({ color: "#111" }));
			rotor.position.y = 1.1;
			rotor.name = "rotor";
			g.add(body, tail, rotor);
			const pnt = curve.getPointAt(at);
			g.position.copy(pnt);
			g.position.y += 18;
			return g;
		}
		const heliA = heli(.5);
		const heliB = heli(.97);
		scene.add(heliA, heliB);
		const damT = .42;
		const damP = curve.getPointAt(damT);
		const damTan = curve.getTangentAt(damT);
		const dam = new Group();
		dam.position.copy(damP);
		dam.position.y -= 8;
		const face = new Mesh(new BoxGeometry(54, 42, 10), new MeshStandardMaterial({
			color: "#cfc6b6",
			roughness: .78
		}));
		face.castShadow = true;
		face.receiveShadow = true;
		const spill = new Mesh(new BoxGeometry(18, 8, 11), new MeshStandardMaterial({
			color: "#b7aea0",
			roughness: .7
		}));
		spill.position.y = 12;
		const hut = new Mesh(new BoxGeometry(8, 5, 7), new MeshStandardMaterial({ color: "#6e5848" }));
		hut.position.set(22, 16, 8);
		const tower = new Mesh(new CylinderGeometry(.6, .9, 28, 6), new MeshStandardMaterial({
			color: "#8a8174",
			metalness: .3
		}));
		tower.position.set(-18, 22, -16);
		const cableGeo = new BufferGeometry().setFromPoints([new Vector3(-18, 34, -16), new Vector3(40, 22, 30)]);
		const cable = new Line(cableGeo, new LineBasicMaterial({ color: "#2a2a2a" }));
		dam.add(face, spill, hut, tower, cable);
		dam.lookAt(damP.clone().add(damTan));
		scene.add(dam);
		const shortcut = new Mesh(new BoxGeometry(14, .4, 70), new MeshStandardMaterial({
			color: "#3a3a3e",
			roughness: .9
		}));
		shortcut.position.copy(damP);
		shortcut.position.y -= 6;
		shortcut.lookAt(damP.clone().add(new Vector3(0, -.4, 1)));
		shortcut.visible = false;
		scene.add(shortcut);
		const genGroup = new Group();
		for (let i = 0; i < 3; i++) {
			const m = new Mesh(new BoxGeometry(3.2, 2.4, 4.2), new MeshStandardMaterial({
				color: "#3c4a44",
				metalness: .35,
				roughness: .45
			}));
			m.position.set(i * 5.5, 1.2, 0);
			m.castShadow = true;
			genGroup.add(m);
		}
		const genP = curve.getPointAt(.445);
		const genTan = curve.getTangentAt(.445);
		const genRight = new Vector3().crossVectors(new Vector3(0, 1, 0), genTan).normalize();
		genGroup.position.copy(genP).addScaledVector(genRight, 16);
		genGroup.position.y += .2;
		scene.add(genGroup);
		const tr = curve.getPointAt(.78);
		const trestle = new Group();
		const deck = new Mesh(new BoxGeometry(78, 1.4, 6), new MeshStandardMaterial({
			color: "#5c4638",
			roughness: .7
		}));
		deck.position.y = 22;
		const loco = new Mesh(new BoxGeometry(4, 3.2, 14), new MeshStandardMaterial({
			color: "#1e2428",
			metalness: .4,
			roughness: .4
		}));
		loco.position.set(-8, 24.4, 0);
		for (let i = 0; i < 4; i++) {
			const pier = new Mesh(new BoxGeometry(2.2, 22, 2.2), new MeshStandardMaterial({ color: "#6a5a4c" }));
			pier.position.set(-28 + i * 18, 11, 0);
			pier.castShadow = true;
			trestle.add(pier);
			const car = new Mesh(new BoxGeometry(3.2, 2.6, 8), new MeshStandardMaterial({ color: i % 2 ? "#8a3b2a" : "#d8d2c4" }));
			car.position.set(6 + i * 10, 24, 0);
			trestle.add(car);
		}
		trestle.add(deck, loco);
		trestle.position.set(tr.x - 40, tr.y - 8, tr.z + 36);
		scene.add(trestle);
		const hp = curve.getPointAt(.86);
		const crane = new Group();
		const mast = new Mesh(new BoxGeometry(1.1, 16, 1.1), new MeshStandardMaterial({ color: "#e0a322" }));
		mast.position.y = 8;
		const boom = new Mesh(new BoxGeometry(1, .6, 18), new MeshStandardMaterial({ color: "#e0a322" }));
		boom.position.set(0, 15, 7);
		crane.add(mast, boom);
		crane.position.copy(hp);
		crane.position.x += 14;
		scene.add(crane);
		function span(at, len) {
			const pnt = curve.getPointAt(at);
			const tan = curve.getTangentAt(at);
			const m = new Mesh(new BoxGeometry(18, 1.2, len), new MeshStandardMaterial({
				color: "#9a8b78",
				roughness: .72
			}));
			m.position.copy(pnt);
			m.position.y -= .4;
			m.lookAt(pnt.clone().add(tan));
			m.castShadow = true;
			return m;
		}
		scene.add(span(.012, 36), span(.62, 22));
		function arch(at) {
			const pnt = curve.getPointAt(at);
			const tan = curve.getTangentAt(at);
			const g = new Group();
			const left = new Mesh(new BoxGeometry(3, 9, 8), new MeshStandardMaterial({ color: "#5e4e40" }));
			left.position.x = -9;
			const rightW = left.clone();
			rightW.position.x = 9;
			const cap = new Mesh(new BoxGeometry(21, 2.2, 8), new MeshStandardMaterial({ color: "#5e4e40" }));
			cap.position.y = 5;
			g.add(left, rightW, cap);
			g.position.copy(pnt);
			g.position.y += 2;
			g.lookAt(pnt.clone().add(tan));
			return g;
		}
		scene.add(arch(.145), arch(.2));
		const beaconGeo = new SphereGeometry(1.15, 12, 10);
		const beaconMat = {
			landmark: new MeshStandardMaterial({
				color: "#f0c36a",
				emissive: "#8a6418",
				emissiveIntensity: .6
			}),
			l1: new MeshStandardMaterial({
				color: "#e25b2a",
				emissive: "#8a2a10",
				emissiveIntensity: .7
			}),
			l2: new MeshStandardMaterial({
				color: "#ff4d3a",
				emissive: "#ff2208",
				emissiveIntensity: .9
			}),
			shortcut: new MeshStandardMaterial({
				color: "#7dcea0",
				emissive: "#1d6b42",
				emissiveIntensity: .6
			})
		};
		const beacons = [];
		for (const poi of POIS) {
			const pnt = curve.getPointAt(poi.t);
			const mesh = new Mesh(beaconGeo, beaconMat[poi.kind]);
			mesh.position.copy(pnt);
			mesh.position.y += 7.5;
			mesh.userData.poi = poi.id;
			const stem = new Mesh(new CylinderGeometry(.12, .12, 7, 5), new MeshStandardMaterial({ color: "#f4ecdf" }));
			stem.position.copy(pnt);
			stem.position.y += 3.4;
			scene.add(mesh, stem);
			beacons.push({
				id: poi.id,
				mesh,
				base: mesh.position.clone()
			});
		}
		const linePts = [];
		for (let i = 0; i <= 200; i++) linePts.push(curve.getPointAt(i / 200).add(new Vector3(0, 1.2, 0)));
		const racingLine = new Line(new BufferGeometry().setFromPoints(linePts), new LineBasicMaterial({ color: "#e25b2a" }));
		racingLine.visible = false;
		scene.add(racingLine);
		const sky = new Mesh(new SphereGeometry(1400, 24, 16), new MeshBasicMaterial({
			color: "#e7d3b4",
			side: 1
		}));
		scene.add(sky);
		const ray = new Raycaster();
		const pointer = new Vector2();
		const keys = {};
		let yaw = .7;
		let pitch = -.45;
		let flyPos = new Vector3(180, 120, 240);
		let orbitTarget = new Vector3(40, 20, 0);
		let orbitR = 340;
		let orbitYaw = .6;
		let orbitPitch = .62;
		let dragging = false;
		let lastX = 0;
		let lastY = 0;
		let lineT = 0;
		const focusLerp = {
			id: null,
			t: 1
		};
		const asphaltMatRock = new MeshStandardMaterial({
			color: "#2c2c30",
			roughness: .84,
			metalness: .08
		});
		const asphaltMatDark = new MeshStandardMaterial({
			color: "#1a1a1e",
			roughness: .8,
			metalness: .05
		});
		const asphaltMatBlue = new MeshStandardMaterial({
			color: "#16324a",
			roughness: .5,
			emissive: "#0b3a55",
			emissiveIntensity: .45
		});
		const skyMatDay = new MeshBasicMaterial({
			color: "#e7d3b4",
			side: 1
		});
		const skyMatBlue = new MeshBasicMaterial({
			color: "#071018",
			side: 1
		});
		sky.material = skyMatDay;
		let applied = null;
		function applyLayer(layer) {
			if (applied === layer) return;
			applied = layer;
			const blue = layer === "blueprint";
			terrain.visible = !blue;
			water.visible = !blue;
			rocks.visible = layer !== "blueprint";
			bushes.visible = layer === "rock";
			racingLine.visible = blue;
			asphalt.material = layer === "asphalt" ? asphaltMatDark : blue ? asphaltMatBlue : asphaltMatRock;
			scene.background = new Color(blue ? "#071018" : "#c4b49a");
			scene.fog = new FogExp2(blue ? "#071018" : "#c9b79a", blue ? 8e-4 : .00115);
			sky.material = blue ? skyMatBlue : skyMatDay;
			renderer.toneMappingExposure = blue ? .9 : 1.05;
		}
		function onPointerDown(e) {
			dragging = true;
			lastX = e.clientX;
			lastY = e.clientY;
		}
		function onPointerUp() {
			dragging = false;
		}
		function onPointerMove(e) {
			const rect = renderer.domElement.getBoundingClientRect();
			pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
			pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
			if (!dragging) return;
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;
			lastX = e.clientX;
			lastY = e.clientY;
			if (state.current.mode === "fly") {
				yaw -= dx * .0045;
				pitch = MathUtils.clamp(pitch - dy * .0035, -1.25, 1.2);
			} else {
				orbitYaw -= dx * .005;
				orbitPitch = MathUtils.clamp(orbitPitch + dy * .0035, .18, 1.35);
			}
		}
		function onWheel(e) {
			e.preventDefault();
			orbitR = MathUtils.clamp(orbitR + e.deltaY * .35, 60, 820);
		}
		function onClick() {
			ray.setFromCamera(pointer, camera);
			const hits = ray.intersectObjects(beacons.map((b) => b.mesh));
			if (hits[0]) state.current.onSelect(hits[0].object.userData.poi);
		}
		function onKeyDown(e) {
			keys[e.code] = true;
		}
		function onKeyUp(e) {
			keys[e.code] = false;
		}
		renderer.domElement.addEventListener("pointerdown", onPointerDown);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointermove", onPointerMove);
		renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
		renderer.domElement.addEventListener("click", onClick);
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		const clock = new Timer();
		clock.connect(document);
		let raf = 0;
		const ahead = new Vector3();
		const camRight = new Vector3();
		const wish = new Vector3();
		function frame() {
			raf = requestAnimationFrame(frame);
			clock.update();
			const dt = Math.min(clock.getDelta(), .05);
			const st = state.current;
			shortcut.visible = st.damDown;
			const collapse = st.damDown ? 1 : 0;
			face.rotation.z = collapse * .18;
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
			heliA.position.y = curve.getPointAt(.5).y + 16 + Math.sin(clock.getElapsed() * 1.4) * .6;
			heliB.position.y = curve.getPointAt(.97).y + 16 + Math.sin(clock.getElapsed() * 1.7) * .6;
			for (const b of beacons) {
				b.mesh.position.y = b.base.y + Math.sin(clock.getElapsed() * 2 + b.base.x) * .35;
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
				lineT = (lineT + dt * .035) % 1;
				const pnt = curve.getPointAt(lineT);
				const tan = curve.getTangentAt(lineT);
				const look = curve.getPointAt((lineT + .02) % 1);
				camera.position.copy(pnt).addScaledVector(tan, -28);
				camera.position.y += 12;
				camera.lookAt(look.x, look.y + 2, look.z);
				flyPos.copy(camera.position);
			} else {
				const tp = orbitPitch;
				camera.position.set(orbitTarget.x + Math.sin(orbitYaw) * Math.cos(tp * .15) * orbitR * Math.cos(1.1 - tp), orbitTarget.y + Math.sin(tp) * orbitR * .72, orbitTarget.z + Math.cos(orbitYaw) * orbitR * Math.cos(1.1 - tp));
				const rad = orbitR;
				const phi = orbitPitch;
				camera.position.set(orbitTarget.x + rad * Math.sin(phi) * Math.sin(orbitYaw), orbitTarget.y + rad * Math.cos(phi), orbitTarget.z + rad * Math.sin(phi) * Math.cos(orbitYaw));
				camera.lookAt(orbitTarget);
				flyPos.copy(camera.position);
				const to = orbitTarget.clone().sub(camera.position).normalize();
				yaw = Math.atan2(-to.x, -to.z);
				pitch = Math.asin(MathUtils.clamp(to.y, -1, 1));
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
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: host,
		className: "absolute inset-0"
	});
}
var KIND = {
	landmark: "Landmark",
	l1: "Level 1",
	l2: "Level 2",
	shortcut: "Shortcut"
};
function Home() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [mode, setMode] = (0, import_react.useState)("orbit");
	const [layer, setLayer] = (0, import_react.useState)("rock");
	const [damDown, setDamDown] = (0, import_react.useState)(false);
	const [focusId, setFocusId] = (0, import_react.useState)("dam");
	const [listOpen, setListOpen] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => setReady(true), []);
	const active = (0, import_react.useMemo)(() => POIS.find((p) => p.id === focusId) ?? POIS[0], [focusId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-full min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanyonView, {
				mode,
				layer,
				damDown,
				focusId,
				onSelect: setFocusId
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-full place-items-center text-muted",
				children: "Building the canyon…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto max-w-[70%] rounded-xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-[0.22em] text-accent uppercase",
							children: "Episode 10 · Boneyard Rush"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl leading-none font-bold tracking-wide sm:text-4xl",
							children: "Canyon"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-sm text-sm text-muted",
							children: "3D course atlas. Drag to orbit. Reconstruction from the published track notes — not an official extract."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-auto hidden rounded-xl border border-border bg-surface/90 px-3 py-2 text-right text-xs text-muted backdrop-blur-md sm:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [NOTES.laps, " laps · Race / Detonator / Elimination"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							NOTES.powerPlays,
							" power plays · ",
							NOTES.level2,
							" level-2"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							"1 route changer · ",
							NOTES.shortcuts,
							" shortcuts"
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `absolute top-28 bottom-24 left-3 z-10 flex w-[min(100%-1.5rem,20rem)] flex-col overflow-hidden rounded-xl border border-border bg-surface/92 backdrop-blur-md sm:top-4 sm:bottom-4 sm:left-auto sm:right-4 ${listOpen ? "" : "hidden sm:flex"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg tracking-wide",
							children: "Course pins"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Tap a pin or its marker in the canyon."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "min-h-0 flex-1 overflow-y-auto",
						children: POIS.map((poi) => {
							const on = poi.id === active.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setFocusId(poi.id),
								className: `flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left ${on ? "bg-surface-2" : "hover:bg-surface-2/70"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-2 rounded-full ${poi.kind === "l2" ? "bg-accent" : poi.kind === "shortcut" ? "bg-ok" : poi.kind === "l1" ? "bg-accent-2" : "bg-fg"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: poi.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pl-4 text-xs tracking-wide text-muted uppercase",
									children: KIND[poi.kind]
								})]
							}) }, poi.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl leading-none",
							children: active.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted",
							children: active.detail
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2 sm:bottom-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-xl border border-border bg-surface/92 p-1 backdrop-blur-md",
						children: [
							[
								"orbit",
								"Orbit",
								Mountain
							],
							[
								"fly",
								"Fly",
								LocateFixed
							],
							[
								"line",
								"Racing line",
								Route
							]
						].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMode(id),
							className: `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm ${mode === id ? "bg-accent text-bg" : "text-fg"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-xl border border-border bg-surface/92 p-1 backdrop-blur-md",
						children: [
							["rock", "Terrain"],
							["asphalt", "Asphalt"],
							["blueprint", "Blueprint"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLayer(id),
							className: `rounded-lg px-3 py-2 text-sm ${layer === id ? "bg-fg text-bg" : "text-fg"}`,
							children: label
						}, id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDamDown((v) => !v),
						className: `flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm backdrop-blur-md ${damDown ? "bg-accent text-bg" : "bg-surface/92 text-fg"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dam, { className: "size-4" }), damDown ? "Dam collapsed" : "Collapse the dam"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setListOpen((v) => !v),
						className: "flex items-center gap-2 rounded-xl border border-border bg-surface/92 px-3 py-2 text-sm sm:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "size-4" }), "Pins"]
					})
				]
			}),
			mode === "fly" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute right-4 bottom-4 z-10 hidden max-w-xs rounded-lg bg-surface/80 px-3 py-2 text-xs text-muted sm:block",
				children: "Fly: drag to look. W/S move, A/D strafe, Q/E or Space vertical, Shift faster."
			})
		]
	});
}
//#endregion
export { Home as component };
