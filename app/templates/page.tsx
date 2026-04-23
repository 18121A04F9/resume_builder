import type { Metadata } from "next";
import { TemplatesPageClient } from "./templates-client";

export const metadata: Metadata = {
  title: "Resume Templates",
  description:
    "Browse professional resume templates: Modern, Minimal, and ATS-Optimized. Choose the perfect template for your career.",
};

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}
