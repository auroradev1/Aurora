import {
  HeroSection,
  GridFeatureSection,
  TransformationSection,
  ContactSection,
} from "@/components/sections";
import ContactAtmosphereWrapper from "@/components/sections/ContactAtmosphereWrapper";
import { PerformanceIndicator } from "@/components/development/PerformanceIndicator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GridFeatureSection />
      <TransformationSection />
      <ContactSection />
      <ContactAtmosphereWrapper />
      <PerformanceIndicator />
    </>
  );
}
