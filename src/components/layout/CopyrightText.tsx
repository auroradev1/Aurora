export function CopyrightText() {
  const year = new Date().getFullYear();
  return (
    <p className="text-[12px] text-[var(--text-dim)]">
      © {year} Aurora. All rights reserved.
    </p>
  );
}
