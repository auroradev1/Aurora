import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3.5 text-foreground hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded"
      aria-label="Aurora home"
    >
      <Image
        src="/aurora-logo.svg"
        alt="Aurora logo"
        width={size}
        height={size}
        className="shrink-0"
        priority
        loading="eager"
        fetchPriority="high"
      />
    </Link>
  );
}
