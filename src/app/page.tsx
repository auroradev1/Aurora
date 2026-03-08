import {
  HeroSection,
  GridFeatureSection,
  TransformationSection,
  ContactSection,
} from "@/components/sections";
import { PerformanceIndicator } from "@/components/development/PerformanceIndicator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <GridFeatureSection />
      <TransformationSection />
      <ContactSection />
      <PerformanceIndicator />
    </>
  );
}
