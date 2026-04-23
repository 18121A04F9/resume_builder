"use client";

import { ResumeData, TemplateId } from "@/types/resume";
import { ModernTemplate } from "./templates/modern";
import { MinimalTemplate } from "./templates/minimal";
import { AtsTemplate } from "./templates/professional-ats";
import { ExecutiveTemplate } from "./templates/executive";
import { CreativeTemplate } from "./templates/creative";
import { HarvardTemplate } from "./templates/harvard";
import { TwoColumnTemplate } from "./templates/two-column";
import { FunctionalTemplate } from "./templates/functional";
import { CombinationTemplate } from "./templates/combination";
import { GeneralTemplate } from "./templates/general";
import { HybridTemplate } from "./templates/hybrid";
import { SkillsBasedTemplate } from "./templates/skills-based";
import { TraditionalTemplate } from "./templates/traditional";
import { BasicTemplate } from "./templates/basic";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateId;
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  return (
    <div
      className="resume-page"
      style={{ width: "210mm", minHeight: "297mm", background: "#fff", color: "#111" }}
    >
      {template === "modern"           && <ModernTemplate data={data} />}
      {template === "minimal"          && <MinimalTemplate data={data} />}
      {template === "professional-ats" && <AtsTemplate data={data} />}
      {template === "executive"        && <ExecutiveTemplate data={data} />}
      {template === "creative"         && <CreativeTemplate data={data} />}
      {template === "harvard"          && <HarvardTemplate data={data} />}
      {template === "two-column"       && <TwoColumnTemplate data={data} />}
      {template === "functional"       && <FunctionalTemplate data={data} />}
      {template === "combination"      && <CombinationTemplate data={data} />}
      {template === "general"          && <GeneralTemplate data={data} />}
      {template === "hybrid"           && <HybridTemplate data={data} />}
      {template === "skills-based"     && <SkillsBasedTemplate data={data} />}
      {template === "traditional"      && <TraditionalTemplate data={data} />}
      {template === "basic"            && <BasicTemplate data={data} />}
      {/* Fallback */}
      {!["modern","minimal","professional-ats","executive","creative","harvard","two-column","functional","combination","general","hybrid","skills-based","traditional","basic"].includes(template) && (
        <ModernTemplate data={data} />
      )}
    </div>
  );
}
