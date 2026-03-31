"use client";

import { useState } from "react";
import { TextInput } from "@/components/ui/TextInput";
import { TextareaInput } from "@/components/ui/TextareaInput";
import { CTAButton } from "@/components/ui/CTAButton";

type FormErrors = Record<string, string | undefined>;

function validate(fields: {
  name: string;
  email: string;
  message: string;
}): FormErrors {
  const errs: FormErrors = {};
  if (!fields.name.trim()) errs.name = "Name is required";
  if (!fields.email.trim()) errs.email = "Valid email required";
  else if (!/\S+@\S+\.\S+/.test(fields.email))
    errs.email = "Valid email required";
  if (!fields.message.trim()) errs.message = "Message is required";
  return errs;
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields = { name, email, message };
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error("Failed to send message");
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("idle");
      setErrors({ message: "Failed to send message. Please try again later." });
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section
      id="contact"
      className="w-full px-8 py-[100px] relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-[680px] rounded-[32px] border border-[rgba(26,159,179,0.2)] bg-[rgba(17,17,17,0.6)] backdrop-blur-[16px] p-[clamp(32px,5vw,60px)] relative z-10 shadow-[0_0_30px_rgba(26,159,179,0.1)]">
        <div className="text-center mb-10">
          <h2
            id="contact-title"
            className="font-display text-[clamp(28px,4vw,40px)] font-bold tracking-tight mb-3"
            style={{ letterSpacing: "-0.03em" }}
          >
            Welcome into the light
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-[1.8]">
            Our team of experts is always ready to help you illuminate your
            business with cutting-edge AI solutions.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-10 px-5 text-[var(--text-muted)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(26,159,179,0.1)] border border-[rgba(26,159,179,0.2)]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h4 className="text-foreground text-lg font-semibold mb-2">
              Message sent
            </h4>
            <p className="text-sm">We'll be in touch soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-3">
              <div className="w-full">
                <TextInput
                  name="name"
                  label=""
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearError("name");
                  }}
                  error={errors.name}
                />
              </div>
              <div className="w-full">
                <TextInput
                  name="email"
                  label=""
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                  error={errors.email}
                />
              </div>
            </div>
            <div>
              <TextareaInput
                name="message"
                label=""
                placeholder="Message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  clearError("message");
                }}
                error={errors.message}
                rows={5}
              />
            </div>
            <div className="text-center pt-2">
              <CTAButton
                type="submit"
                label="Submit"
                loading={status === "submitting"}
                disabled={status === "submitting"}
                size="md"
              />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
