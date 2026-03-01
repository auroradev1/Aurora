type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "6xl";

type SectionWrapperProps = {
  children: React.ReactNode;
  centered?: boolean;
  maxWidth?: MaxWidth;
  className?: string;
};

const maxWidthClass: Record<MaxWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "6xl": "max-w-6xl",
};

export function SectionWrapper({
  children,
  centered = true,
  maxWidth = "6xl",
  className = "",
}: SectionWrapperProps) {
  return (
    <div
      className={`mx-auto w-full px-6 py-16 sm:py-24 ${maxWidthClass[maxWidth]} ${
        centered ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
