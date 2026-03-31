import Link from "next/link";

export type FeatureGridItemProps = {
  title: string;
  subtitle: string;
  href?: string | undefined;
};

export function FeatureGridItem({
  title,
  subtitle,
  href,
}: FeatureGridItemProps) {
  const content = (
    <>
      <div
        className="h-0.5 w-8 rounded-sm bg-accent mb-4 transition-[width] duration-300"
        style={{ width: "32px" }}
      />
      <h4
        className="font-display text-[17px] font-semibold tracking-tight text-foreground mb-2"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h4>
      <p className="text-[13px] leading-[1.6] text-[var(--text-muted)]">
        {subtitle}
      </p>
      <span className="mt-4 inline-block text-[12px] font-medium uppercase tracking-widest text-accent">
        Explore →
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className="grid-item-link">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="grid-item-link">
        {content}
      </Link>
    );
  }

  return <div className="grid-item-link cursor-default">{content}</div>;
}
