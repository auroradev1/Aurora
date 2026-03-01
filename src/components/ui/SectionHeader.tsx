type SectionHeaderProps = {
  id?: string;
  title: string;
  subtext?: string;
  className?: string;
};

export function SectionHeader({
  id,
  title,
  subtext,
  className = "",
}: SectionHeaderProps) {
  return (
    <header className={`text-center max-w-2xl mx-auto ${className}`}>
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {subtext && (
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          {subtext}
        </p>
      )}
    </header>
  );
}
