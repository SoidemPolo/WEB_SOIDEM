"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

const LANES = [
  { id: "L1", status: "Ritmo actual · 1.240 uds/h", delay: "0s" },
  { id: "L2", status: "Incidencia resuelta · línea estable", delay: ".6s" },
  { id: "L3", status: "En producción · sin incidencias", delay: "1.1s" },
  { id: "L4", status: "Control de calidad registrado", delay: "1.6s" },
];

const INCIDENTS = [
  { time: "07:00", who: "Sistema", what: "Informe diario enviado a dirección.", dot: "#37C0DB" },
  { time: "08:32", who: "Sistema", what: "Albarán procesado e integrado con el ERP.", dot: "#37C0DB" },
  { time: "08:41", who: "Mantenimiento", what: "Revisión de báscula L2 registrada y planificada.", dot: "#4ADE80" },
  { time: "09:12", who: "Sistema", what: "Desviación de temperatura detectada en L2.", dot: "#FBBF24" },
  { time: "09:13", who: "Sistema", what: "Aviso enviado y tarea asignada a mantenimiento.", dot: "#37C0DB" },
  { time: "09:18", who: "Responsable de turno", what: "«Consigna ajustada. Línea estable.»", dot: "#4ADE80" },
  { time: "09:19", who: "Sistema", what: "Incidencia cerrada y vinculada al lote activo.", dot: "#4ADE80" },
];

const OEE_TARGET = 87;
const COUNTER_MS = 1500;
const WIGGLE_MS = 1700;

/**
 * Comparador Antes/Después: el panel "Después" se recorta con clip-path y el
 * divisor lo controla un input range invisible que ocupa toda la caja, igual que
 * en la web actual. Así funciona con ratón, con dedo y con las flechas del teclado
 * sin escribir gestos a mano.
 */
export function BeforeAfter() {
  const compareRef = useRef<HTMLDivElement>(null);
  const wiggleActive = useRef(true);

  const [x, setX] = useState(50);
  const [oee, setOee] = useState(0);
  const [entered, setEntered] = useState(false);

  const stopWiggle = useCallback(() => {
    wiggleActive.current = false;
  }, []);

  useEffect(() => {
    const node = compareRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setEntered(true);

        // El aro del OEE cuenta hasta 87 con desaceleración cúbica.
        if (reduced) {
          setOee(OEE_TARGET);
        } else {
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / COUNTER_MS, 1);
            setOee(Math.round(OEE_TARGET * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }

        // Vaivén de invitación: enseña que el divisor se puede arrastrar.
        if (!reduced && wiggleActive.current) {
          const start = performance.now();
          const step = (now: number) => {
            const p = (now - start) / WIGGLE_MS;
            if (p >= 1 || !wiggleActive.current) {
              setX(50);
              return;
            }
            setX(50 + Math.sin(p * Math.PI * 2) * 14 * (1 - p));
            requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cambio" className="ba">
      <div className="wrap">
        <Reveal>
          <p className="kicker">Antes y después</p>
          <h2 className="h2-display">
            De información dispersa a una operación conectada.
          </h2>
          <p className="lead">
            Desliza para comparar cómo cambia la forma de trabajar cuando máquinas,
            sistemas y personas comparten la misma información.
          </p>
        </Reveal>
      </div>

      {/* En pantallas pequeñas el arrastre es incómodo: se sustituye por dos botones. */}
      <div className="cswitch" role="group" aria-label="Ver el antes o el después">
        <button
          type="button"
          className={cn("csw", x >= 50 && "on")}
          aria-pressed={x >= 50}
          onClick={() => {
            stopWiggle();
            setX(100);
          }}
        >
          Antes
        </button>
        <button
          type="button"
          className={cn("csw", x < 50 && "on")}
          aria-pressed={x < 50}
          onClick={() => {
            stopWiggle();
            setX(0);
          }}
        >
          Después
        </button>
      </div>

      <div className="compare-card">
        <div
          ref={compareRef}
          className={cn("compare", entered && "on")}
          data-vista={x >= 50 ? "antes" : "despues"}
          style={{ "--x": `${x}%` } as React.CSSProperties}
        >
          <p className="sr-only">
            Comparación ilustrativa entre una operación con información fragmentada y
            la misma operación con sistemas conectados.
          </p>

          <ChaosSide />
          <ClaritySide x={x} oee={oee} />

          <span className="lbl a">Antes</span>
          <span className="lbl b">Después</span>
          <div className="bar" />
          <div className="knob">⇄</div>

          <input
            type="range"
            min={0}
            max={100}
            value={x}
            aria-label="Comparar antes y después"
            onChange={(event) => {
              stopWiggle();
              setX(Number(event.target.value));
            }}
          />
        </div>

        <p className="ilus">
          Escena ilustrativa basada en situaciones habituales de una operación
          industrial.
        </p>

        <Reveal>
          <div className="pairs">
            {PAIRS.map((pair) => (
              <p key={pair.before}>
                <s>{pair.before}</s>
                <b>{pair.after}</b>
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <p className="hint">
          Arrastra el divisor para comparar. También funciona con las flechas del
          teclado.
        </p>
      </div>
    </section>
  );
}

/** Antes: información repartida entre Excel, correo, chats y notas sueltas. */
function ChaosSide() {
  return (
    <div aria-hidden className="side chaos">
      <div className="win xl">
        <div className="wbar">
          <i className="r" />
          <i className="y" />
          <i className="g" />
          produccion_v3_FINAL(2).xlsx — sin guardar
        </div>
        <table>
          <tbody>
            <tr>
              {["Línea", "Turno", "Uds.", "Merma"].map((h) => (
                <td key={h} className="hh">
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
                  <td key={i} className={cell.startsWith("#") ? "err" : undefined}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="win mail">
        <div className="wbar">
          <i className="r" />
          <i className="y" />
          <i className="g" />
          RE: RE: RE: ¿datos de ayer?
        </div>
        <div className="b">
          <b>Dirección · 9:02</b>¿Alguien me pasa el cierre de ayer? Lo necesito para
          el comité de las 10:00.
        </div>
      </div>

      <div className="chatw">
        <p className="bub">¿Ha salido ya el lote 2417?</p>
        <p className="bub me">Pregunta a Juan, él lleva ese excel</p>
        <p className="bub">Juan está de vacaciones hasta el lunes…</p>
      </div>

      <span className="postit" style={{ top: "52%", left: "42%", "--rot": "-4deg" } as React.CSSProperties}>
        Revisar báscula L2 (¿el lunes?)
      </span>
      <span className="postit p2" style={{ top: "4%", right: "3%", "--rot": "3deg" } as React.CSSProperties}>
        Informe del comité → hacerlo el domingo
      </span>

      <p className="toast" style={{ bottom: "16%", right: "4%" }}>
        <span>⚠</span>
        <span>
          <b>Parada en Línea 2</b>detectada demasiado tarde
        </span>
      </p>

      <span className="nbadge" style={{ top: "9%", left: "41.5%" }}>
        23
      </span>
      <span className="clockx" style={{ bottom: "4%", left: "38%", "--rot": "-1.5deg" } as React.CSSProperties}>
        Domingo · <b>21:47</b> · haciendo el informe
      </span>

      <div className="win alb">
        <div className="wbar">
          <i className="r" />
          <i className="y" />
          <i className="g" />
          albaranes_enero — pendientes
        </div>
        <div className="b">
          <b>47 albaranes por picar a mano</b>
          {[
            ["ALB-2201 · Prov. Metalúrgica", "sin picar"],
            ["ALB-2202 · Química Norte", "sin picar"],
            ["ALB-2203 · ilegible (escaneo)", "¿?"],
          ].map(([ref, state]) => (
            <p key={ref} className="rowx">
              <span>{ref}</span>
              <em>{state}</em>
            </p>
          ))}
        </div>
      </div>

      <span className="callsx" style={{ bottom: "6%", right: "26%", "--rot": "1.5deg" } as React.CSSProperties}>
        <i />
        Mantenimiento · 5 llamadas perdidas
      </span>
      <span className="postit" style={{ top: "33%", left: "31%", "--rot": "6deg" } as React.CSSProperties}>
        ¿Cuánta merma llevamos? Preguntar en almacén
      </span>
      <span className="clockx" style={{ top: "58%", right: "29%", "--rot": "-3deg" } as React.CSSProperties}>
        OEE del turno = <b>¿?</b>
      </span>
      <span className="clockx" style={{ top: "71%", right: "4%", "--rot": "2deg" } as React.CSSProperties}>
        La factura de luz sube · ¿qué línea? <b>¿?</b>
      </span>
    </div>
  );
}

/** Después: un único panel conectado. Se recorta por la izquierda según el divisor. */
function ClaritySide({ x, oee }: { x: number; oee: number }) {
  return (
    <div aria-hidden className="side clar" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
      <div className="clar-chrome">
        <i className="r" />
        <i className="y" />
        <i className="g" />
        <span>app.soidemdt.com/planta · sesion segura</span>
      </div>

      <div className="hdr2">
        <span className="t2">Planta · ahora mismo</span>
        <span className="live">
          <i /> En tiempo real · <span className="hora">09:41</span>
        </span>
      </div>

      <div className="cg">
        <div className="ct lanes">
          <p className="k">Líneas en marcha</p>
          <p className="lane-total">
            <span>Turno de mañana · 4 líneas en producción</span>
            <b>3.410 uds acumuladas</b>
          </p>
          {LANES.map((lane) => (
            <div key={lane.id} className="lane">
              <b>{lane.id}</b>
              <span className="track">
                <i className="fdot" style={{ animationDelay: lane.delay }} />
              </span>
              <span className="st2">{lane.status}</span>
            </div>
          ))}

          <p className="k" style={{ margin: "14px 0 0" }}>
            Incidencias y comentarios
          </p>
          <div className="incs">
            {INCIDENTS.map((item) => (
              <p key={item.time} className="inc">
                <i className="id2" style={{ background: item.dot }} />
                <span>
                  <em>{item.time}</em> · <b>{item.who}</b> — {item.what}
                </span>
              </p>
            ))}
          </div>
        </div>

        <div className="ct">
          <p className="k">OEE · en vivo</p>
          <div className="ringt">
            <svg className="ringsvg" fill="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ringgrad" x1="0" x2="1" y1="0" y2="1">
                  <stop stopColor="#1E798D" />
                  <stop offset="1" stopColor="#5AC8FA" />
                </linearGradient>
              </defs>
              <circle className="ringbg" cx="50" cy="50" r="44" strokeWidth="9" />
              <circle
                className="ringfg"
                cx="50"
                cy="50"
                r="44"
                strokeWidth="9"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <p className="ringlbl">
              {oee},0%
              <small>seguimiento en tiempo real</small>
            </p>
          </div>
          <div className="obars">
            {(
              [
                ["Disponibilidad", "92%", "92"],
                ["Rendimiento", "95%", "95"],
                ["Calidad", "99.5%", "99,5"],
              ] as const
            ).map(([label, width, value]) => (
              <p key={label} className="ob">
                <span>{label}</span>
                <i style={{ "--w": width } as React.CSSProperties} />
                <em>{value}</em>
              </p>
            ))}
          </div>
          <p className="tfoot">
            Calculado automáticamente a partir de producción y calidad.{" "}
            <b>Actualizado durante el turno.</b>
          </p>
        </div>

        <div className="ct">
          <p className="k">Consumo energético</p>
          <p className="bignum">
            Consumo estable
            <small>disponible por línea y franja horaria</small>
          </p>
          <div className="obars">
            {(["78%", "92%", "57%", "50%"] as const).map((width, i) => (
              <p key={width} className="ob">
                <span>Línea {i + 1}</span>
                <i style={{ "--w": width } as React.CSSProperties} />
                <em />
              </p>
            ))}
          </div>
          <p className="tfoot">
            Lectura conectada a la operación. <b>Distribución relativa por línea.</b>
          </p>
        </div>

        <div className="ct">
          <p className="k">Centro de alertas</p>
          <p className="bignum">
            3 <span className="good2">todas atendidas</span>
            <small>hoy</small>
          </p>
          {(
            [
              ["Críticas", "0", "#F87171"],
              ["Medias · temp. L2", "1", "#FBBF24"],
              ["Informativas", "2", "#37C0DB"],
            ] as const
          ).map(([label, count, color]) => (
            <p key={label} className="arow">
              <span className="sev">
                <i style={{ background: color }} />
                {label}
              </span>
              <em>{count}</em>
            </p>
          ))}
          <p className="tfoot">
            Aviso por app, correo o Teams. <b>Asignación y registro automáticos.</b>
          </p>
        </div>

        <div className="ct trace">
          <p className="k">Trazabilidad · lote activo</p>
          <div className="tline">
            {(
              [
                ["Orden iniciada", "06:12", false],
                ["Producción", "07:40", false],
                ["Calidad", "09:05", false],
                ["Lote actualizado", "09:19", true],
              ] as const
            ).map(([step, time, now]) => (
              <div key={step} className={cn("tstep", now && "now")}>
                <i className="pt" />
                <span>
                  <b>{step}</b>
                  {time}
                </span>
              </div>
            ))}
          </div>
          <p className="tans">
            Registros de proceso y calidad{" "}
            <b>actualizados y consultables al momento</b>.
          </p>
        </div>

        <div className="kpis">
          {(
            [
              ["Órdenes", "Según planificación", "good"],
              ["Incidencias críticas", "Ninguna abierta", "good"],
              ["Calidad y merma", "Por línea y lote", "info"],
              ["Información", "Disponible para el equipo autorizado", "info"],
            ] as const
          ).map(([label, value, tone]) => (
            <div key={label} className="kpi2">
              <p className="kk">{label}</p>
              <p className="kv">
                <span className={tone}>{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="toast2">
        <span className="ok2">OK</span>
        <span>
          <b>Informe de dirección</b>enviado automáticamente a las 07:00
        </span>
      </p>
    </div>
  );
}
