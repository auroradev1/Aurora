"use client";

import Link from "next/link";

type CTAButtonProps = {
  label: string;
  onClick?: (() => void) | undefined;
  href?: string | undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function CTAButton({
  label,
  onClick,
  href,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className = "",
}: CTAButtonProps) {
  const sizeClass = {
    sm: "px-4 py-2 text-[13px]",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-[15px]",
  };
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[background-color,color,border-color,transform,box-shadow,opacity] duration-200 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap relative overflow-hidden";
  const variantClass = {
    primary:
      "bg-accent text-white hover:bg-[var(--accent-hover)] hover:-translate-y-px hover:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
    outline:
      "bg-transparent text-foreground border border-[var(--border)] hover:border-accent hover:-translate-y-px",
    ghost: "bg-transparent text-accent border-none hover:bg-foreground/5",
  };

  const combinedClass = `${baseClass} ${sizeClass[size]} ${variantClass[variant]} ${className}`;

  const content = loading ? (
    <>
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden
      />
      {type === "submit" ? "Sending…" : label}
    </>
  ) : (
    label
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (type === "submit") {
    return (
      <button
        type="submit"
        disabled={disabled || loading}
        onClick={handleClick}
        className={combinedClass}
      >
        {content}
      </button>
    );
  }

  if (href !== undefined) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={combinedClass}
          aria-disabled={disabled || loading}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClass}
        aria-disabled={disabled || loading}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={combinedClass}
    >
      {content}
    </button>
  );
}
