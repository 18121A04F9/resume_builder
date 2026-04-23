import type { Metadata } from "next";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage all your resumes in one place.",
};

export default async function DashboardPage() {
  // Check if auth is properly configured
  const hasRealCreds =
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_ID !== "your-google-client-id-here";

  if (!hasRealCreds) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-3">
            🔑 Google OAuth Setup Required
          </h2>
          <p className="text-amber-700 dark:text-amber-300 mb-4 text-sm">
            To use the dashboard, add your Google OAuth credentials to{" "}
            <code className="bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded font-mono text-xs">
              .env.local
            </code>
          </p>
          <ol className="text-left text-sm text-amber-700 dark:text-amber-300 space-y-2 max-w-sm mx-auto">
            <li>1. Go to <a href="https://console.cloud.google.com" target="_blank" className="underline font-medium">console.cloud.google.com</a></li>
            <li>2. Create OAuth 2.0 Client ID (Web Application)</li>
            <li>
              3. Set Authorized redirect URI:<br />
              <code className="bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded font-mono text-xs">
                http://localhost:3000/api/auth/callback/google
              </code>
            </li>
            <li>4. Copy Client ID &amp; Secret to <code className="font-mono text-xs">.env.local</code></li>
            <li>5. Restart the dev server</li>
          </ol>
        </div>
      </div>
    );
  }

  // Real auth check
  const { auth } = await import("@/lib/auth");
  const { redirect } = await import("next/navigation");
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return <DashboardClient userId={session!.user!.id!} userName={session!.user!.name || "there"} />;
}
