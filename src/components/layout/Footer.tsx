import { FooterColumn } from "./FooterColumn";
import { CopyrightText } from "./CopyrightText";
import { LegalLink } from "./LegalLink";

const footerColumns = [
  {
    title: "Products",
    links: [
      { href: "#", label: "Acceleration Systems" },
      { href: "#", label: "Ascension Architectures" },
      { href: "#", label: "InterLink" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "#", label: "Documentation" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Support" },
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
          className="grid grid-cols-1 gap-10 mb-12 sm:grid-cols-2 md:grid-cols-4 text-center md:text-left"
          role="navigation"
          aria-label="Footer"
        >
          {footerColumns.map((col, index) => (
            <FooterColumn
              key={`${col.title}-${index}`}
              title={col.title}
              links={col.links}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-6 sm:flex-row">
          <CopyrightText />
          <nav className="flex gap-6" aria-label="Legal">
            <LegalLink href="#">Terms</LegalLink>
            <LegalLink href="#">Privacy</LegalLink>
            <LegalLink href="#">Cookies</LegalLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
