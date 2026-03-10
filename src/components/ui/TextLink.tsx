import Link from "next/link";

type TextLinkProps = {
  label: string;
  href: string;
  onClick?: (() => void) | undefined;
  className?: string;
  showArrow?: boolean;
};

export function TextLink({
  label,
  href,
  onClick,
  className = "",
  showArrow = true,
}: TextLinkProps) {
  const isExternal = href.startsWith("http");
  const content = (
    <>
      {label}
      {showArrow && <span aria-hidden>→</span>}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`text-link focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`text-link focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded ${className}`}
    >
      {content}
    </Link>
  );
}
