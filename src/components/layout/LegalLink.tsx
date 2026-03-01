import Link from "next/link";

type LegalLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <Link
      href={href}
      className="text-[12px] text-[var(--text-dim)] hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-foreground rounded"
    >
      {children}
    </Link>
  );
}
