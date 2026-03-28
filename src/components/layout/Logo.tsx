import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 104 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 pt-[40px] text-foreground hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background rounded"
      aria-label="Aurora home"
    >
      <Image
        src="/aurora-logo.svg"
        alt="Aurora logo"
        width={size}
        height={size}
        className="w-[104px] h-[104px] sm:w-[136px] sm:h-[136px] md:w-[160px] md:h-[160px]"
        priority
        loading="eager"
        fetchPriority="high"
      />
    </Link>
  );
}
