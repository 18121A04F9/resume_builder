import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateResumeSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  template: z.enum(["modern", "minimal", "professional-ats"]).optional(),
  data: z.record(z.string(), z.unknown()).optional(),
});

async function getResumeAndVerifyOwner(id: string, userId: string) {
  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume) return null;
  if (resume.userId !== userId) return null;
  return resume;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const resume = await getResumeAndVerifyOwner(id, session.user.id);
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ resume });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await getResumeAndVerifyOwner(id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const body = await req.json();
    const updates = UpdateResumeSchema.parse(body);

    const resume = await prisma.resume.update({
      where: { id },
      data: {
        ...updates,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(updates.data !== undefined ? { data: updates.data as any } : {}),
      },
    });

    return NextResponse.json({ resume });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const existing = await getResumeAndVerifyOwner(id, session.user.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.resume.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
