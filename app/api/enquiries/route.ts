import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the enquiry details and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    if (parsed.data.website.trim() !== "") {
      return NextResponse.json(
        { success: false, message: "Invalid submission." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your safari enquiry has been received.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while processing your enquiry.",
      },
      { status: 500 },
    );
  }
}
