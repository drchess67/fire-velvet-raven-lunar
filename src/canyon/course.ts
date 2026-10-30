/** Fan layout of Episode 10 Canyon, sequenced from published course notes. */

export type PoiKind = "landmark" | "l1" | "l2" | "shortcut";

export type Poi = {
  id: string;
  title: string;
  detail: string;
  /** 0–1 progress along the closed racing line. */
  t: number;
  kind: PoiKind;
};

const S = 2.15;

function p(x: number, y: number, z: number): [number, number, number] {
  return [x * S, y * S * 0.72, z * S];
}

/** Closed centerline, start/finish first. Elevations are shelf height. */
export const ROAD: [number, number, number][] = [
  p(70, 46, -200), // gorge bridge — start
  p(28, 44, -168),
  p(-8, 40, -120), // lonely tanker, right shoulder
  p(-36, 34, -62),
  p(-48, 24, -8), // tunnel mouth, descending
  p(-28, 12, 48),
  p(8, 6, 98), // inside the cut
  p(58, 8, 138), // exit, sharp right, vista
  p(118, 12, 156),
  p(176, 16, 142),
  p(214, 18, 100), // boulder barricades
  p(228, 20, 48), // rigged rock wall
  p(210, 26, -4),
  p(168, 32, -42), // dam approach
  p(112, 36, -62), // dam face / route changer
  p(52, 20, -48), // lower dam road
  p(4, 14, -18), // twin road grates
  p(-42, 14, 18),
  p(-86, 18, 58), // cliff overhang
  p(-108, 22, 108),
  p(-78, 24, 152), // S-curve
  p(-18, 26, 172), // small bridge
  p(42, 28, 158), // tanker + immediate left
  p(92, 30, 122),
  p(124, 32, 72), // landscape straight
  p(138, 34, 18), // right curve, boulder drop
  p(122, 38, -36), // train bridge in view
  p(168, 36, -8), // hairpin entry
  p(196, 32, -62), // sweeper crane
  p(168, 28, -112), // hairpin exit
  p(118, 22, -138), // overhang crush
  p(78, 14, -118), // downhill rock wall
  p(62, 28, -156), // last left, helicopter
  p(74, 42, -188),
];

export const POIS: Poi[] = [
  {
    id: "start",
    title: "Gorge bridge",
    detail: "Start/finish. A short span over the cut. Three laps in Race.",
    t: 0.01,
    kind: "landmark",
  },
  {
    id: "tanker-1",
    title: "Gasoline truck",
    detail: "Lonely tanker on the right shoulder. Level 1 blast.",
    t: 0.07,
    kind: "l1",
  },
  {
    id: "shortcut-1",
    title: "Early shortcut",
    detail: "Opens only on the run into the end of lap one.",
    t: 0.1,
    kind: "shortcut",
  },
  {
    id: "tunnel",
    title: "Descent tunnel",
    detail: "The shelf drops hard through a rock cut, then a sharp right onto the vista.",
    t: 0.16,
    kind: "landmark",
  },
  {
    id: "boulders",
    title: "Boulder barricades",
    detail: "Timber cribs holding rock. Four barricade sites ring this course.",
    t: 0.3,
    kind: "l1",
  },
  {
    id: "rockwall-1",
    title: "Rigged rock wall",
    detail: "Internal charges sweep cars off the outside or bury them in debris.",
    t: 0.35,
    kind: "l1",
  },
  {
    id: "dam",
    title: "Canyon dam",
    detail:
      "The course’s one route changer. A full meter cracks the face, drops the road, and clips the span cable so a tower falls on the hut.",
    t: 0.42,
    kind: "l2",
  },
  {
    id: "grates",
    title: "Road grates",
    detail: "Two deck plates on the lower dam road. Drive them, or blow them and pinch the line.",
    t: 0.48,
    kind: "l1",
  },
  {
    id: "cliff",
    title: "Cliff lip",
    detail: "A shelf hangs over the racing line. Trigger it and two boulders sit in the groove.",
    t: 0.55,
    kind: "l1",
  },
  {
    id: "sbridge",
    title: "S-curve bridge",
    detail: "Tight S onto a short span, tanker on the exit, then an immediate left.",
    t: 0.62,
    kind: "landmark",
  },
  {
    id: "tanker-2",
    title: "Exit tanker",
    detail: "Second gasoline truck, parked on the left-hand exit.",
    t: 0.66,
    kind: "l1",
  },
  {
    id: "boulder-drop",
    title: "Boulder drop",
    detail: "Right-hander where charges kick rock onto the asphalt.",
    t: 0.74,
    kind: "l1",
  },
  {
    id: "train",
    title: "Train bridge",
    detail:
      "Level 2. Girders go first, then the whole trestle. The right deck blocks half the road; the left slumps against the tunnel exit.",
    t: 0.78,
    kind: "l2",
  },
  {
    id: "gens",
    title: "Generators",
    detail: "Three units on the dam-altered spur. They shove cars across the shelf.",
    t: 0.44,
    kind: "l1",
  },
  {
    id: "shortcut-2",
    title: "Dam shortcut",
    detail: "Only after the dam falls: through the core, past the holstered generator, left, and off the rubble jump.",
    t: 0.45,
    kind: "shortcut",
  },
  {
    id: "heli-1",
    title: "Helicopter",
    detail: "Right-hander on the alternate. Bomb bay over the groove.",
    t: 0.5,
    kind: "l1",
  },
  {
    id: "sweep-wall",
    title: "Sweep wall",
    detail: "Where the lines merge. The right wall is packed with graded rock.",
    t: 0.8,
    kind: "l1",
  },
  {
    id: "hairpin",
    title: "Hairpin crane",
    detail: "Right, short left, then the hairpin. Roadside sweeper.",
    t: 0.86,
    kind: "l1",
  },
  {
    id: "crush",
    title: "Overhang",
    detail: "A rock brow built to crush a perfect trigger, or shockwave you off the shelf.",
    t: 0.9,
    kind: "l2",
  },
  {
    id: "rockwall-2",
    title: "Downhill wall",
    detail: "Sudden drop. The wall on the right leaves almost no escape.",
    t: 0.94,
    kind: "l1",
  },
  {
    id: "heli-2",
    title: "Final helicopter",
    detail: "Last left before the line. One more bomb run.",
    t: 0.97,
    kind: "l1",
  },
];

export const NOTES = {
  laps: 3,
  powerPlays: 24,
  level1: 21,
  level2: 3,
  routeChangers: 1,
  shortcuts: 2,
  sharedWithGraveyard: 5,
};
