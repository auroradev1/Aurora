import Link from "next/link";

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link href={href} className="footer-link focus:outline-none focus:ring-2 focus:ring-foreground rounded">
      {children}
    </Link>
  );
}
