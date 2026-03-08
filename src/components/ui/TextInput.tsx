type TextInputProps = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  disabled?: boolean;
  label?: string;
  type?: "text" | "email";
  required?: boolean;
  className?: string;
};

export function TextInput({
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  label,
  type = "text",
  required,
  className = "",
}: TextInputProps) {
  const id = `input-${name}`;
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
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : false}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border bg-[var(--surface-alt)] px-4 py-3 text-foreground placeholder:text-[var(--text-dim)] rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
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
