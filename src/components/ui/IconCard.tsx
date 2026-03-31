type IconCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function IconCard({ icon, title, description }: IconCardProps) {
  return (
    <div className="icon-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[var(--radius-icon-card)]">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-[14px] border border-[rgba(26,159,179,0.2)] bg-[rgba(26,159,179,0.08)]">
        {icon}
      </div>
      <h4
        className="font-display text-[15px] font-semibold tracking-tight text-foreground mb-2"
        style={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </h4>
      <p className="text-[13px] leading-[1.7] text-[var(--text-muted)]">
        {description}
      </p>
    </div>
  );
}
