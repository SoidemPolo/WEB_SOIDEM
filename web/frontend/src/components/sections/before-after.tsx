"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const PAIRS = [
  {
    before: "La desviación se descubre tarde.",
    after: "Se detecta, se asigna y queda registrada.",
  },
  {
    before: "La información depende de quien preparó el Excel.",
    after: "La información vive en el sistema, no en una persona.",
  },
  {
    before: "El informe se prepara fuera de horario.",
    after: "El informe llega automáticamente a dirección.",
  },
];

const TIMELINE = [
  { time: "07:00", who: "Sistema", what: "Informe diario enviado a dirección.", color: "bg-info" },
  { time: "08:32", who: "Sistema", what: "Albarán procesado e integrado con el ERP.", color: "bg-info" },
  { time: "08:41", who: "Mantenimiento", what: "Revisión de báscula L2 registrada y planificada.", color: "bg-ok" },
  { time: "09:12", who: "Sistema", what: "Desviación de temperatura detectada en L2.", color: "bg-warn" },
  { time: "09:13", who: "Sistema", what: "Aviso enviado y tarea asignada a mantenimiento.", color: "bg-info" },
  { time: "09:18", who: "Responsable de turno", what: "«Consigna ajustada. Línea estable.»", color: "bg-ok" },
  { time: "09:19", who: "Sistema", what: "Incidencia cerrada y vinculada al lote activo.", color: "bg-ok" },
];

const LANES = [
  { id: "L1", status: "Ritmo actual · 1.240 uds/h" },
  { id: "L2", status: "Incidencia resuelta · línea estable" },
  { id: "L3", status: "En producción · sin incidencias" },
  { id: "L4", status: "Control de calidad registrado" },
];

export function BeforeAfter() {
  const [view, setView] = useState<"antes" | "despues">("antes");

  return (
    <section id="cambio" className="py-section">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Antes y después</p>
          <h2 className="h2-display">
            De información dispersa a una operación conectada.
          </h2>
          <p className="lead">
            Cambia entre las dos vistas para comparar cómo se trabaja cuando
            máquinas, sistemas y personas comparten la misma información.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Comparar antes y después"
          className="mt-9 inline-flex rounded-full border border-hair bg-white p-1"
        >
          {(["antes", "despues"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              onClick={() => setView(key)}
              className={cn(
                "rounded-full px-6 py-2.5 text-[15px] font-semibold transition-colors",
                view === key ? "bg-teal text-white" : "text-stone hover:text-ink",
              )}
            >
              {key === "antes" ? "Antes" : "Después"}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-card border border-hair">
          <AnimatePresence mode="wait">
            {view === "antes" ? (
              <motion.div
                key="antes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ChaosPanel />
              </motion.div>
            ) : (
              <motion.div
                key="despues"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <ClarityPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-3 text-[13px] text-stone">
          Escena ilustrativa basada en situaciones habituales de una operación
          industrial.
        </p>

        <Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PAIRS.map((pair) => (
              <p key={pair.before} className="flex flex-col gap-2">
                <s className="text-[15px] text-stone">{pair.before}</s>
                <b className="text-[16px] font-[650] text-ink">{pair.after}</b>
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Antes: información fragmentada entre Excel, correo y notas sueltas. */
function ChaosPanel() {
  return (
    <div className="grid gap-4 bg-[#efeee9] p-6 md:grid-cols-2">
      <Window title="produccion_v3_FINAL(2).xlsx — sin guardar">
        <table className="w-full border-collapse text-[12.5px]">
          <tbody>
            <tr className="text-stone">
              {["Línea", "Turno", "Uds.", "Merma"].map((h) => (
                <td key={h} className="border-b border-hair py-1.5 font-semibold">
                  {h}
                </td>
              ))}
            </tr>
            {[
              ["L1", "Mañana", "1.240", "2,1%"],
              ["L2", "Mañana", "#¡REF!", "####"],
              ["L3", "Tarde", "—", "¿?"],
              ["L4", "Tarde", "974", "#¡VALOR!"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      "border-b border-hair py-1.5",
                      cell.startsWith("#") && "font-semibold text-danger",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Window>

      <div className="flex flex-col gap-4">
        <Window title="RE: RE: RE: ¿datos de ayer?">
          <p className="text-[13px] text-stone">
            <b className="block text-ink">Dirección · 9:02</b>
            ¿Alguien me pasa el cierre de ayer? Lo necesito para el comité de las
            10:00.
          </p>
        </Window>

        <Window title="albaranes_enero — pendientes">
          <b className="text-[13px]">47 albaranes por picar a mano</b>
          <div className="mt-2 space-y-1 text-[12.5px] text-stone">
            {[
              ["ALB-2201 · Prov. Metalúrgica", "sin picar"],
              ["ALB-2202 · Química Norte", "sin picar"],
              ["ALB-2203 · ilegible (escaneo)", "¿?"],
            ].map(([ref, state]) => (
              <p key={ref} className="flex justify-between gap-3">
                <span>{ref}</span>
                <em className="not-italic text-danger">{state}</em>
              </p>
            ))}
          </div>
        </Window>

        <div className="flex flex-wrap gap-2">
          {[
            "Revisar báscula L2 (¿el lunes?)",
            "Informe del comité → hacerlo el domingo",
            "OEE del turno = ¿?",
            "Domingo · 21:47 · haciendo el informe",
          ].map((note) => (
            <span
              key={note}
              className="rounded-sm bg-[#FFF3B0] px-2.5 py-1.5 text-[12px] text-ink shadow-[0_2px_8px_rgba(25,28,30,.12)]"
            >
              {note}
            </span>
          ))}
        </div>

        <p className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[12.5px] text-stone shadow-sm">
          <span className="text-danger">⚠</span>
          <span>
            <b className="block text-ink">Parada en Línea 2</b>
            detectada demasiado tarde
          </span>
        </p>
      </div>
    </div>
  );
}

/** Después: un único panel conectado donde todo tiene contexto y queda registrado. */
function ClarityPanel() {
  return (
    <div className="bg-deep p-6 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[15px] font-semibold">Planta · ahora mismo</span>
        <span className="flex items-center gap-2 text-[12.5px] text-white/70">
          <i className="size-1.5 animate-pulse rounded-full bg-ok" />
          En tiempo real · 09:41
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Líneas en marcha" className="lg:col-span-2">
          <p className="mb-3 flex flex-wrap justify-between gap-2 text-[12.5px] text-white/60">
            <span>Turno de mañana · 4 líneas en producción</span>
            <b className="text-white">3.410 uds acumuladas</b>
          </p>
          <div className="space-y-2">
            {LANES.map((lane) => (
              <div key={lane.id} className="flex items-center gap-3 text-[12.5px]">
                <b className="w-6 shrink-0">{lane.id}</b>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                  <i className="block h-full w-2/3 rounded-full bg-teal" />
                </span>
                <span className="text-white/60">{lane.status}</span>
              </div>
            ))}
          </div>

          <p className="mb-2 mt-5 text-[11px] uppercase tracking-[0.12em] text-white/50">
            Incidencias y comentarios
          </p>
          <div className="space-y-1.5">
            {TIMELINE.map((entry) => (
              <p key={entry.time} className="flex items-start gap-2 text-[12.5px]">
                <i className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", entry.color)} />
                <span className="text-white/70">
                  <em className="not-italic text-white/50">{entry.time}</em> ·{" "}
                  <b className="text-white">{entry.who}</b> — {entry.what}
                </span>
              </p>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card title="OEE · en vivo">
            <p className="text-[30px] font-[650] leading-none">
              87,0%
              <small className="mt-1 block text-[11.5px] font-normal text-white/50">
                seguimiento en tiempo real
              </small>
            </p>
            <div className="mt-4 space-y-2">
              {(
                [
                  ["Disponibilidad", 92],
                  ["Rendimiento", 95],
                  ["Calidad", 99.5],
                ] as const
              ).map(([label, value]) => (
                <p key={label} className="flex items-center gap-2 text-[12px]">
                  <span className="w-28 shrink-0 text-white/60">{label}</span>
                  <i className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                    <i
                      className="block h-full rounded-full bg-teal"
                      style={{ width: `${value}%` }}
                    />
                  </i>
                  <em className="not-italic text-white/70">{value}</em>
                </p>
              ))}
            </div>
          </Card>

          <Card title="Centro de alertas">
            <p className="text-[24px] font-[650] leading-none">
              3 <span className="text-[12px] font-normal text-ok">todas atendidas</span>
            </p>
            <div className="mt-3 space-y-1.5 text-[12.5px] text-white/70">
              {(
                [
                  ["Críticas", "0", "bg-danger"],
                  ["Medias · temp. L2", "1", "bg-warn"],
                  ["Informativas", "2", "bg-info"],
                ] as const
              ).map(([label, count, color]) => (
                <p key={label} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <i className={cn("size-1.5 rounded-full", color)} />
                    {label}
                  </span>
                  <em className="not-italic">{count}</em>
                </p>
              ))}
            </div>
          </Card>

          <Card title="Trazabilidad · lote activo">
            <div className="space-y-1.5 text-[12.5px] text-white/70">
              {(
                [
                  ["Orden iniciada", "06:12"],
                  ["Producción", "07:40"],
                  ["Calidad", "09:05"],
                  ["Lote actualizado", "09:19"],
                ] as const
              ).map(([step, time], i, arr) => (
                <p key={step} className="flex items-center gap-2">
                  <i
                    className={cn(
                      "size-1.5 rounded-full",
                      i === arr.length - 1 ? "bg-ok" : "bg-teal",
                    )}
                  />
                  <b className="text-white">{step}</b>
                  <span className="ml-auto">{time}</span>
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <p className="mt-5 flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-[12.5px]">
        <span className="rounded bg-ok px-1.5 py-0.5 text-[10px] font-bold text-deep">
          OK
        </span>
        <span>
          <b>Informe de dirección</b> enviado automáticamente a las 07:00
        </span>
      </p>
    </div>
  );
}

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-hair bg-white shadow-[0_4px_16px_rgba(25,28,30,.08)]">
      <div className="flex items-center gap-1.5 border-b border-hair bg-alt px-3 py-2 text-[11.5px] text-stone">
        <i className="size-2 rounded-full bg-danger" />
        <i className="size-2 rounded-full bg-warn" />
        <i className="size-2 rounded-full bg-ok" />
        <span className="ml-1.5 truncate">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-white/[0.04] p-4", className)}>
      <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-white/50">{title}</p>
      {children}
    </div>
  );
}
