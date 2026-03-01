import { NavItem } from "./NavItem";

type NavMenuProps = {
  items: { label: string; href: string }[];
};

export function NavMenu({ items }: NavMenuProps) {
  return (
    <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8 sm:items-center">
      {items.map(({ href, label }) => (
        <li key={href}>
          <NavItem label={label} href={href} />
        </li>
      ))}
    </ul>
  );
}
