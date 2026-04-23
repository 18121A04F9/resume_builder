import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const CreateResumeSchema = z.object({
  title: z.string().min(1).max(100).default("Untitled Resume"),
  template: z.enum(["modern", "minimal", "professional-ats"]).default("modern"),
  data: z.record(z.string(), z.unknown()).default({}),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      template: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ resumes });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, template, data } = CreateResumeSchema.parse(body);

    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        template,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      },
    });

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
