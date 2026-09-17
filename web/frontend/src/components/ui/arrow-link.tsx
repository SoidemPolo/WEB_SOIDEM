import Link from "next/link";

import { cn } from "@/lib/utils";

/** El enlace con flecha de la web actual (.tlink): la flecha avanza al pasar el ratón. */
export function ArrowLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "group inline-flex items-center gap-1.5 text-base font-semibold text-teal",
    className,
  );
  const content = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
