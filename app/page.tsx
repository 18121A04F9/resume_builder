import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturesSection } from "@/components/home/features-section";
import { TemplatesPreview } from "@/components/home/templates-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaBanner } from "@/components/home/cta-banner";

export const metadata: Metadata = {
  title: "Free Resume Builder — Create Professional Resumes Online",
  description:
    "Build a stunning, ATS-friendly resume in minutes with ResumeForge. Free online resume builder with live compile preview, 6 templates, and instant PDF export.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <TemplatesPreview />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
