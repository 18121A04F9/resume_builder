import type { Metadata } from "next";
import { BuilderClient } from "./builder-client";

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Build and customize your professional resume with live preview.",
};

export default async function BuilderPage() {
  // If no real credentials, allow builder access without auth
  const hasRealCreds =
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_ID !== "your-google-client-id-here";

  if (!hasRealCreds) {
    // Allow builder without login in dev mode
    return <BuilderClient userId="demo-user" />;
  }

  // Real auth check
  const { auth } = await import("@/lib/auth");
  const { redirect } = await import("next/navigation");
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return <BuilderClient userId={session!.user!.id!} />;
}
