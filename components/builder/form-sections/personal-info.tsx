"use client";

import { PersonalInfo } from "@/types/resume";
import { Camera, X, ImageIcon } from "lucide-react";

interface Props {
  value: PersonalInfo;
  onChange: (v: PersonalInfo) => void;
}

type Field = {
  key: keyof PersonalInfo;
  label: string;
  placeholder: string;
  type?: string;
};

const fields: Field[] = [
  { key: "fullName",   label: "Full Name",             placeholder: "Jane Doe" },
  { key: "headline",   label: "Professional Headline", placeholder: "Senior Software Engineer" },
  { key: "email",      label: "Email",                 placeholder: "jane@example.com", type: "email" },
  { key: "phone",      label: "Phone",                 placeholder: "+1 (555) 000-0000", type: "tel" },
  { key: "location",   label: "Location",              placeholder: "New York, NY" },
  { key: "linkedin",   label: "LinkedIn URL",          placeholder: "linkedin.com/in/janedoe" },
  { key: "github",     label: "GitHub URL",            placeholder: "github.com/janedoe" },
  { key: "portfolio",  label: "Portfolio / Website",   placeholder: "janedoe.dev" },
];

export function PersonalInfoForm({ value, onChange }: Props) {
  const update = (key: keyof PersonalInfo, val: string) =>
    onChange({ ...value, [key]: val });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      update("photoUrl", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Photo Uploader */}
      <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-xl border border-border/50">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted/50 flex items-center justify-center flex-shrink-0 border border-border/60">
          {value.photoUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
              <button
                onClick={() => update("photoUrl", "")}
                className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Camera className="w-6 h-6 text-muted-foreground/60" />
          )}
        </div>
        <div className="flex-1">
          <label className="field-label mb-1.5">Profile Photo</label>
          <input
            title="Upload Photo"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer transition-colors"
          />
        </div>
      </div>

      {fields.map((f) => (
        <div key={f.key} className="field-group mb-1">
          <label htmlFor={`pi-${f.key}`} className="field-label">{f.label}</label>
          <input
            id={`pi-${f.key}`}
            type={f.type || "text"}
            className="field-input transition-all"
            placeholder={f.placeholder}
            value={value[f.key] ?? ""}
            onChange={(e) => update(f.key, e.target.value)}
            autoComplete="off"
          />
        </div>
      ))}
    </div>
  );
}
