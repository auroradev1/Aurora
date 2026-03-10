type TextareaInputProps = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string | undefined;
  disabled?: boolean;
  label?: string;
  rows?: number;
  required?: boolean;
  className?: string;
};

export function TextareaInput({
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  label,
  rows = 4,
  required,
  className = "",
}: TextareaInputProps) {
  const id = `textarea-${name}`;
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        aria-invalid={error ? true : false}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border bg-[var(--surface-alt)] px-4 py-3 text-foreground placeholder:text-[var(--text-dim)] rounded-lg focus:outline-none resize-none min-h-[100px] disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-red-500" : "border-[var(--border)]"
        }`}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
