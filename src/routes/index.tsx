import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Dam, LocateFixed, Map, Mountain, Route as RouteIcon } from "lucide-react";
import { CanyonView, type Layer, type MapMode } from "@/canyon/CanyonView";
import { NOTES, POIS, type PoiKind } from "@/canyon/course";

export const Route = createFileRoute("/")({ component: Home });

const KIND: Record<PoiKind, string> = {
  landmark: "Landmark",
  l1: "Level 1",
  l2: "Level 2",
  shortcut: "Shortcut",
};

function Home() {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<MapMode>("orbit");
  const [layer, setLayer] = useState<Layer>("rock");
  const [damDown, setDamDown] = useState(false);
  const [focusId, setFocusId] = useState<string | null>("dam");
  const [listOpen, setListOpen] = useState(true);

  useEffect(() => setReady(true), []);

  const active = useMemo(() => POIS.find((p) => p.id === focusId) ?? POIS[0], [focusId]);

  return (
    <main className="relative h-full min-h-dvh overflow-hidden bg-bg text-fg">
      {ready ? (
        <CanyonView
          mode={mode}
          layer={layer}
          damDown={damDown}
          focusId={focusId}
          onSelect={setFocusId}
        />
      ) : (
        <div className="grid h-full place-items-center text-muted">Building the canyon…</div>
      )}

      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 sm:p-4">
        <div className="pointer-events-auto max-w-[70%] rounded-xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-md">
          <p className="font-display text-xs tracking-[0.22em] text-accent uppercase">Episode 10 · Boneyard Rush</p>
          <h1 className="font-display text-3xl leading-none font-bold tracking-wide sm:text-4xl">Canyon</h1>
          <p className="mt-1 max-w-sm text-sm text-muted">
            3D course atlas. Drag to orbit. Reconstruction from the published track notes — not an official extract.
          </p>
        </div>
        <div className="pointer-events-auto hidden rounded-xl border border-border bg-surface/90 px-3 py-2 text-right text-xs text-muted backdrop-blur-md sm:block">
          <div>{NOTES.laps} laps · Race / Detonator / Elimination</div>
          <div>
            {NOTES.powerPlays} power plays · {NOTES.level2} level-2
          </div>
          <div>1 route changer · {NOTES.shortcuts} shortcuts</div>
        </div>
      </header>

      <aside
        className={`absolute top-28 bottom-24 left-3 z-10 flex w-[min(100%-1.5rem,20rem)] flex-col overflow-hidden rounded-xl border border-border bg-surface/92 backdrop-blur-md sm:top-4 sm:bottom-4 sm:left-auto sm:right-4 ${listOpen ? "" : "hidden sm:flex"}`}
      >
        <div className="border-b border-border px-4 py-3">
          <p className="font-display text-lg tracking-wide">Course pins</p>
          <p className="text-xs text-muted">Tap a pin or its marker in the canyon.</p>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto">
          {POIS.map((poi) => {
            const on = poi.id === active.id;
            return (
              <li key={poi.id}>
                <button
                  type="button"
                  onClick={() => setFocusId(poi.id)}
                  className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left ${on ? "bg-surface-2" : "hover:bg-surface-2/70"}`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`inline-block size-2 rounded-full ${poi.kind === "l2" ? "bg-accent" : poi.kind === "shortcut" ? "bg-ok" : poi.kind === "l1" ? "bg-accent-2" : "bg-fg"}`}
                    />
                    <span className="font-medium">{poi.title}</span>
                  </span>
                  <span className="pl-4 text-xs tracking-wide text-muted uppercase">{KIND[poi.kind]}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border px-4 py-3 text-sm">
          <p className="font-display text-xl leading-none">{active.title}</p>
          <p className="mt-1 text-muted">{active.detail}</p>
        </div>
      </aside>

      <div className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-2 sm:bottom-4">
        <div className="flex rounded-xl border border-border bg-surface/92 p-1 backdrop-blur-md">
          {(
            [
              ["orbit", "Orbit", Mountain],
              ["fly", "Fly", LocateFixed],
              ["line", "Racing line", RouteIcon],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm ${mode === id ? "bg-accent text-bg" : "text-fg"}`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
        <div className="flex rounded-xl border border-border bg-surface/92 p-1 backdrop-blur-md">
          {(
            [
              ["rock", "Terrain"],
              ["asphalt", "Asphalt"],
              ["blueprint", "Blueprint"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setLayer(id)}
              className={`rounded-lg px-3 py-2 text-sm ${layer === id ? "bg-fg text-bg" : "text-fg"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDamDown((v) => !v)}
          className={`flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm backdrop-blur-md ${damDown ? "bg-accent text-bg" : "bg-surface/92 text-fg"}`}
        >
          <Dam className="size-4" />
          {damDown ? "Dam collapsed" : "Collapse the dam"}
        </button>
        <button
          type="button"
          onClick={() => setListOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface/92 px-3 py-2 text-sm sm:hidden"
        >
          <Map className="size-4" />
          Pins
        </button>
      </div>

      {mode === "fly" && (
        <p className="absolute right-4 bottom-4 z-10 hidden max-w-xs rounded-lg bg-surface/80 px-3 py-2 text-xs text-muted sm:block">
          Fly: drag to look. W/S move, A/D strafe, Q/E or Space vertical, Shift faster.
        </p>
      )}
    </main>
  );
}
