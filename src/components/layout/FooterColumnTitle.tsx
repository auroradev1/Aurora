type FooterColumnTitleProps = {
  children: React.ReactNode;
};

export function FooterColumnTitle({ children }: FooterColumnTitleProps) {
  return (
    <h3 className="font-display font-semibold text-xs uppercase tracking-[0.1em] text-foreground mb-5">
      {children}
    </h3>
  );
}
