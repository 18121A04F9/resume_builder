import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to ResumeForge to create and manage your resumes.",
};

export default function LoginPage() {
  const hasRealCreds =
    process.env.AUTH_GOOGLE_ID &&
    process.env.AUTH_GOOGLE_ID !== "your-google-client-id-here";

  if (!hasRealCreds) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Setup Required</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Google OAuth credentials are not yet configured. Add them to{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.env.local</code> to enable sign-in.
          </p>
          <div className="text-left bg-muted rounded-xl p-4 text-xs font-mono text-muted-foreground space-y-1">
            <p>AUTH_GOOGLE_ID=your-client-id</p>
            <p>AUTH_GOOGLE_SECRET=your-secret</p>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Until then, you can test the builder directly at{" "}
            <a href="/builder" className="text-primary underline">/builder</a>.
          </p>
        </div>
      </div>
    );
  }

  // Dynamically import client component only when auth is configured
  const { LoginClient } = require("./login-client");
  return <LoginClient />;
}
