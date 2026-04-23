import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const hasGoogleCreds =
  process.env.AUTH_GOOGLE_ID &&
  process.env.AUTH_GOOGLE_ID !== "your-google-client-id-here" &&
  process.env.AUTH_GOOGLE_SECRET &&
  process.env.AUTH_GOOGLE_SECRET !== "your-google-client-secret-here";

const hasDatabaseUrl =
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes("password@localhost");

async function getAdapter() {
  if (!hasDatabaseUrl) return undefined;
  try {
    const { PrismaAdapter } = await import("@auth/prisma-adapter");
    const { prisma } = await import("@/lib/prisma");
    return PrismaAdapter(prisma);
  } catch {
    console.warn("[auth] PrismaAdapter unavailable — running without DB adapter");
    return undefined;
  }
}

const adapter = hasDatabaseUrl
  ? await (async () => {
      try {
        const { PrismaAdapter } = await import("@auth/prisma-adapter");
        const { prisma } = await import("@/lib/prisma");
        return PrismaAdapter(prisma);
      } catch {
        return undefined;
      }
    })()
  : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...(adapter ? { adapter } : {}),
  providers: hasGoogleCreds
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
    : [],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  session: {
    strategy: adapter ? "database" : "jwt",
  },
});
