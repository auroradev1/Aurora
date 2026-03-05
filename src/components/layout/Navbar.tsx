"use client";

import { useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NavMenu } from "./NavMenu";
import { CTAButton } from "../ui/CTAButton";

export type NavbarProps = {
  navItems: { label: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
  logo: React.ReactNode;
  onCtaClick?: () => void;
};

export function Navbar({
  navItems,
  ctaLabel,
  ctaHref,
  logo,
  onCtaClick,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrollPosition(20);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] flex h-[76px] items-center justify-between px-6 py-4 sm:px-8 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--bg)]/93 backdrop-blur-[12px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="flex w-full max-w-[1100px] mx-auto items-center justify-between"
        aria-label="Main navigation"
      >
        {logo}
        <div className="hidden sm:flex sm:items-center sm:gap-8">
          <NavMenu items={navItems} />
          <CTAButton
            label={ctaLabel}
            href={onCtaClick ? undefined : ctaHref}
            onClick={onCtaClick}
            size="sm"
          />
        </div>
        <div className="flex items-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col gap-1.5 rounded p-1 border-none bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-foreground sm:hidden"
            aria-expanded={menuOpen ? "true" : "false"}
            aria-controls="nav-menu-mobile"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-[22px] h-0.5 rounded-sm bg-foreground transition-transform duration-200"
                style={{
                  transform: menuOpen
                    ? i === 0
                      ? "translateY(7px) rotate(45deg)"
                      : i === 1
                        ? "scaleX(0)"
                        : "translateY(-7px) rotate(-45deg)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="nav-menu-mobile"
          className="animate-slide-down absolute left-0 right-0 top-[60px] border-b border-[var(--border)] bg-[var(--surface)]/97 backdrop-blur-xl px-8 pb-6 pt-4 flex flex-col gap-1 sm:hidden"
        >
          <NavMenu items={navItems} />
          <div className="pt-4">
            <CTAButton
              label={ctaLabel}
              href={onCtaClick ? undefined : ctaHref}
              onClick={onCtaClick}
              className="w-full justify-center"
            />
          </div>
        </div>
      )}
    </header>
  );
}
