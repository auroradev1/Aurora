"use client";

import Link from "next/link";

type NavItemProps = {
  label: string;
  href: string;
  isActive?: boolean;
};

export function NavItem({ label, href, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`nav-link focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 rounded px-2 py-1 ${
        isActive ? "!text-foreground" : ""
      }`}
    >
      {label}
    </Link>
  );
}
