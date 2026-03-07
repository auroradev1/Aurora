import { FooterColumn } from "./FooterColumn";
import { CopyrightText } from "./CopyrightText";
import { LegalLink } from "./LegalLink";

const footerColumns = [
  {
    title: "Products",
    links: [
      { href: "/products/acceleration", label: "Acceleration Systems" },
      { href: "/products/ascension", label: "Ascension Architectures" },
      { href: "/interlink", label: "InterLink" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/blog", label: "Blog" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Social",
    links: [
      { href: "https://twitter.com", label: "Twitter" },
      { href: "https://linkedin.com", label: "LinkedIn" },
      { href: "https://github.com", label: "GitHub" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] py-8 px-8">
      <div className="mx-auto max-w-[1100px]">
        <div
          className="grid grid-cols-2 gap-10 mb-12 md:grid-cols-4 text-center md:text-left"
          role="navigation"
          aria-label="Footer"
        >
          {footerColumns.map((col) => (
            <FooterColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <CopyrightText />
          <nav className="flex gap-6" aria-label="Legal">
            <LegalLink href="/terms">Terms</LegalLink>
            <LegalLink href="/privacy">Privacy</LegalLink>
            <LegalLink href="/cookies">Cookies</LegalLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
