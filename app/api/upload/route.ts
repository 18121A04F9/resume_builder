import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Upload resume (PDF/DOCX) scaffold.
 * Currently accepts the file and returns a placeholder extraction.
 * To enable real extraction, integrate a PDF parsing library like `pdfjs-dist`
 * or a DOCX parser like `mammoth`.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are supported" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 5MB allowed." },
        { status: 400 }
      );
    }

    // TODO: Integrate PDF/DOCX text extraction
    // For PDF: use pdfjs-dist or pdf-parse
    // For DOCX: use mammoth.js
    // Then use an AI/regex parser to extract structured fields

    return NextResponse.json({
      success: true,
      message: "File received. Extraction coming soon!",
      extractedData: null, // Will be ResumeData when extraction is implemented
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
