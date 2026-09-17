/** Envoltorio común de las páginas legales y de calidad: mismo ancho y ritmo de lectura. */
export function LegalPage({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-section">
      <div className="wrap max-w-[820px]">
        <p className="kicker">{kicker}</p>
        <h1 className="text-[clamp(30px,4vw,46px)]">{title}</h1>
        <div className="mt-8 flex flex-col gap-5 text-[16.5px] leading-relaxed text-stone [&_a]:font-semibold [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-6 [&_h2]:text-[22px] [&_h2]:text-ink [&_li]:pl-1 [&_strong]:text-ink [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  );
}
