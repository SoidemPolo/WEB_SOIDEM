"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/** Los cinco sistemas que ya existen en la empresa, con su posición en el lienzo. */
const NODES = [
  { id: "n1", label: "Máquinas", small: "· PLC", aria: "Máquinas y PLC", top: "14%" },
  { id: "n2", label: "SAP · ERP", small: null, aria: null, top: "30%" },
  { id: "n3", label: "Calidad", small: null, aria: null, top: "46%" },
  { id: "n4", label: "Excel", small: "· BBDD", aria: "Excel y bases de datos", top: "62%" },
  { id: "n5", label: "Personas", small: null, aria: null, top: "78%" },
] as const;

/** Qué parte del panel se enciende con cada nodo. Mismo orden que NODES. */
const PANEL_FOR_NODE = ["machines", "sap", "quality", "data", "people"] as const;

/** El subtítulo del panel cambia según el sistema activo. */
const SOURCE_COPY = [
  "Producción conectada y visible",
  "Órdenes y lotes sincronizados con la operación",
  "Controles de calidad vinculados al proceso",
  "Datos dispersos convertidos en una visión común",
  "Alertas e informes para quien decide",
] as const;

const CHIPS = [
  "visión en tiempo real",
  "sistemas conectados",
  "trazabilidad",
  "informes automáticos",
  "alertas a quien decide",
] as const;

const CYCLE_MS = 2400;
const HOLD_MS = 7000;

/**
 * Pieza visual del hero: lo que ya existe entra por la izquierda, SOIDEM lo conecta
 * y sale convertido en un panel operativo.
 *
 * Los conectores no son un SVG fijo: se calculan midiendo dónde han quedado de
 * verdad los nodos y la banda, igual que hacía la web actual, y se redibujan al
 * cambiar el tamaño. El sistema activo va rotando solo, y al pasar el ratón o
 * enfocar un nodo se queda fijo unos segundos.
 */
export function HeroDiagram() {
  const boxRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const holdUntil = useRef(0);

  const [paths, setPaths] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  /**
   * Dibuja una curva desde el borde derecho de cada nodo hasta el borde izquierdo
   * de la banda, con dos puntos de control horizontales. Es la misma geometría que
   * calculaba drawNet() en la web actual.
   */
  const drawConnectors = useCallback(() => {
    const box = boxRef.current;
    const band = bandRef.current;
    if (!box || !band) return;

    const boxRect = box.getBoundingClientRect();
    if (!boxRect.width || !boxRect.height) return;

    const bandRect = band.getBoundingClientRect();
    const endX = bandRect.left + bandRect.width / 2 - boxRect.left - bandRect.width / 2 - 4;
    const endY = bandRect.top + bandRect.height / 2 - boxRect.top;

    const next = nodeRefs.current.map((node) => {
      if (!node) return "";
      const rect = node.getBoundingClientRect();
      const startX = rect.left + rect.width / 2 - boxRect.left + rect.width / 2 + 4;
      const startY = rect.top + rect.height / 2 - boxRect.top;
      const dx = endX - startX;

      return [
        `M${startX.toFixed(1)} ${startY.toFixed(1)}`,
        `C ${(startX + dx * 0.5).toFixed(1)} ${startY.toFixed(1)},`,
        `${(endX - dx * 0.5).toFixed(1)} ${endY.toFixed(1)},`,
        `${endX.toFixed(1)} ${endY.toFixed(1)}`,
      ].join(" ");
    });

    setPaths(next);
  }, []);

  useLayoutEffect(() => {
    drawConnectors();

    const box = boxRef.current;
    if (!box) return;

    const observer = new ResizeObserver(drawConnectors);
    observer.observe(box);
    window.addEventListener("resize", drawConnectors);

    // Las fuentes web desplazan los nodos al cargar: recalcular cuando terminen.
    document.fonts?.ready.then(drawConnectors).catch(() => {});

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", drawConnectors);
    };
  }, [drawConnectors]);

  /**
   * Relanza el destello del panel al cambiar de sistema. Se quita la clase, se fuerza
   * un reflow y se vuelve a poner, que es la forma de reiniciar una animación CSS sin
   * remontar el panel: remontarlo invalidaría la referencia a la banda y, con ella, la
   * medida de los conectores.
   */
  const pulsePanel = useCallback(() => {
    const output = outputRef.current;
    if (!output) return;
    output.classList.remove("pulse-on");
    void output.offsetWidth;
    output.classList.add("pulse-on");
  }, []);

  const select = useCallback(
    (index: number, hold = false) => {
      setActive(index);
      pulsePanel();
      if (hold) holdUntil.current = Date.now() + HOLD_MS;
    },
    [pulsePanel],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (Date.now() < holdUntil.current || document.hidden) return;
      setActive((current) => (current + 1) % NODES.length);
      pulsePanel();
    }, CYCLE_MS);

    return () => window.clearInterval(timer);
  }, [pulsePanel]);

  function handleNodeKeyDown(event: React.KeyboardEvent, index: number) {
    const last = NODES.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % NODES.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + NODES.length) % NODES.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next !== null) {
      event.preventDefault();
      nodeRefs.current[next]?.focus();
    }
  }

  const activePanel = PANEL_FOR_NODE[active];

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label="Lo que ya existe en tu empresa (máquinas, SAP, calidad, Excel, personas) pasa por SOIDEM, que lo entiende y lo conecta, y se convierte en lo que faltaba: visión común, alertas, trazabilidad y una aplicación a medida."
      className="hviz"
    >
      <p aria-hidden className="hv-cap">
        Lo que ya existe → lo que faltaba
      </p>

      <svg aria-hidden className="hv-flow">
        {paths.map((d, i) =>
          d ? (
            <path key={NODES[i].id} d={d} className={i === active ? "live" : "ghost"} />
          ) : null,
        )}
      </svg>

      {NODES.map((node, i) => (
        <button
          key={node.id}
          type="button"
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          aria-label={node.aria ?? undefined}
          aria-pressed={i === active}
          style={{ left: "20%", top: node.top }}
          className={cn("hv-node", i === active && "on2")}
          onPointerEnter={() => select(i, true)}
          onFocus={() => select(i, true)}
          onClick={() => select(i, true)}
          onKeyDown={(event) => handleNodeKeyDown(event, i)}
        >
          {node.label}
          {node.small && <small> {node.small}</small>}
        </button>
      ))}

      <div ref={outputRef} className="hv-output">
        <div ref={bandRef} aria-hidden className="hv-band">
          <b>SOIDEM</b>
          <small>entiende · conecta · integra</small>
        </div>

        <div aria-hidden className="hv-handoff">
          <i className="pulse" />
          <span className="handoff-label">datos conectados</span>
        </div>

        <div aria-hidden className="hv-frag">
          <div className="flex gap-[5px] border-b border-hair bg-paper px-3.5 py-2.5">
            {[0, 1, 2].map((i) => (
              <i key={i} className="size-2 rounded-full bg-[#D8D4C9]" />
            ))}
          </div>

          <div className="hv-dash flex flex-col">
            <div className="flex items-center justify-between border-b border-hair px-4 pb-2.5 pt-3">
              <div>
                <strong className="block text-[12.5px] font-[750] tracking-[-0.01em] text-ink">
                  Panel operativo
                </strong>
                <span className="mt-0.5 block text-[10.5px] font-semibold text-stone transition-colors">
                  {SOURCE_COPY[active]}
                </span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[rgba(22,133,109,.18)] bg-[rgba(22,133,109,.08)] px-2.5 py-[5px] text-[10.5px] font-bold text-[#16856d]">
                <i className="size-[7px] rounded-full bg-[#20C997] shadow-[0_0_0_4px_rgba(32,201,151,.14)]" />
                en línea
              </span>
            </div>

            <div className="flex flex-col gap-2 px-3 pb-3 pt-2.5">
              <div className="grid grid-cols-3 gap-1.5">
                <Kpi label="Líneas activas" value="4" panel="machines" activePanel={activePanel} />
                <Kpi label="OEE" value="87" unit="%" />
                <Kpi label="Alertas" value="3" />
              </div>

              <div
                data-panel="data"
                className={cn(
                  "rounded-[10px] border border-[#E7E3D8] bg-white p-2",
                  activePanel === "data" && "active",
                )}
              >
                <CardTitle left="Producción y energía" right="Ahora" />
                <div className="relative h-[58px] overflow-hidden rounded-lg bg-gradient-to-b from-[#F9FBFC] to-[#F2F7F8] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(30,121,141,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,121,141,.08)_1px,transparent_1px)] before:bg-[length:100%_25%,20%_100%] before:content-['']">
                  <svg
                    viewBox="0 0 220 78"
                    preserveAspectRatio="none"
                    className="absolute inset-0 size-full"
                  >
                    <defs>
                      <linearGradient id="areaHero" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(30,121,141,.26)" />
                        <stop offset="100%" stopColor="rgba(30,121,141,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 62 L22 54 L44 56 L66 40 L88 42 L110 30 L132 34 L154 22 L176 26 L198 18 L220 20 L220 78 L0 78 Z"
                      fill="url(#areaHero)"
                    />
                    <path
                      d="M0 62 L22 54 L44 56 L66 40 L88 42 L110 30 L132 34 L154 22 L176 26 L198 18 L220 20"
                      fill="none"
                      stroke="#1E798D"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M0 68 L22 66 L44 60 L66 58 L88 52 L110 50 L132 48 L154 46 L176 40 L198 42 L220 36"
                      fill="none"
                      stroke="#0F3D47"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <Legend color="#1E798D">producción</Legend>
                  <Legend color="#0F3D47">consumo</Legend>
                </div>
              </div>

              <div className="rounded-[10px] border border-[#E7E3D8] bg-white p-2">
                <CardTitle left="Estado conectado" right="OK" />
                <ul className="flex flex-col gap-[5px]">
                  <StatusRow label="SAP" value="conectado" panel="sap" activePanel={activePanel} />
                  <StatusRow label="Calidad" value="trazabilidad" panel="quality" activePanel={activePanel} />
                  <StatusRow label="Incidencias" value="contexto" />
                  <StatusRow label="Dirección" value="informe auto" panel="people" activePanel={activePanel} />
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {CHIPS.map((chip, i) => (
                  <span key={chip} className={cn("hv-chip", i === active && "on2")}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  unit,
  panel,
  activePanel,
}: {
  label: string;
  value: string;
  unit?: string;
  panel?: string;
  activePanel?: string;
}) {
  return (
    <div
      data-panel={panel}
      className={cn(
        "rounded-[10px] border border-[#E7E3D8] bg-[#FAF8F2] px-2.5 py-2",
        panel && panel === activePanel && "active",
      )}
    >
      <small className="mb-[3px] block text-[8.5px] uppercase leading-[1.15] tracking-[0.08em] text-stone">
        {label}
      </small>
      <b className="text-[14px] tracking-[-0.02em] text-ink">
        {value}
        {unit && <em className="ml-1 text-[10px] font-bold not-italic text-stone">{unit}</em>}
      </b>
    </div>
  );
}

function CardTitle({ left, right }: { left: string; right: string }) {
  return (
    <div className="mb-1.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.08em] text-stone">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Legend({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[5px] text-[9px] text-stone">
      <i className="size-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

function StatusRow({
  label,
  value,
  panel,
  activePanel,
}: {
  label: string;
  value: string;
  panel?: string;
  activePanel?: string;
}) {
  return (
    <li
      data-panel={panel}
      className={cn(
        "flex justify-between gap-2.5 border-b border-dashed border-[#E7E3D8] pb-[5px] text-[9.5px] text-[#4C5356] last:border-b-0 last:pb-0",
        panel && panel === activePanel && "active",
      )}
    >
      <b className="text-[10px] text-ink">{label}</b>
      <span className="font-bold text-teal-dark">{value}</span>
    </li>
  );
}
