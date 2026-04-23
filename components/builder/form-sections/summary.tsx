"use client";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SummaryForm({ value, onChange }: Props) {
  return (
    <div className="field-group">
      <label htmlFor="summary-text" className="field-label">Professional Summary</label>
      <textarea
        id="summary-text"
        className="field-input resize-none"
        rows={8}
        placeholder="Write a compelling 3–5 sentence summary highlighting your expertise, key skills, and what you bring to the role…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-[10px] text-muted-foreground mt-1">
        {value.length} characters — aim for 300–600 for best results
      </p>
    </div>
  );
}
