import { FooterColumnTitle } from "./FooterColumnTitle";
import { FooterLink } from "./FooterLink";

type LinkItem = { href: string; label: string };

type FooterColumnProps = {
  title: string;
  links: LinkItem[];
};

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <FooterColumnTitle>{title}</FooterColumnTitle>
      <ul className="mt-4 space-y-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
