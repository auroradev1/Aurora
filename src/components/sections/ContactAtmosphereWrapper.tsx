"use client";

import dynamic from "next/dynamic";

const ContactAtmosphere = dynamic(
  () => import("./ContactAtmosphere").then((mod) => mod.ContactAtmosphere),
  {
    ssr: false,
    loading: () => null,
  },
);

export default function ContactAtmosphereWrapper() {
  return <ContactAtmosphere />;
}
