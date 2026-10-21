import { NextResponse } from "next/server";
import { Resend } from "resend";

import { enquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body === "object" &&
      body !== null &&
      "website" in body &&
      typeof body.website === "string" &&
      body.website.trim() !== ""
    ) {
      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received.",
      });
    }

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

    const enquiry = parsed.data;

    // Silently accept honeypot submissions without sending email.
    if (enquiry.website.trim() !== "") {
      return NextResponse.json({
        success: true,
        message: "Your enquiry has been received.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ENQUIRY_FROM_EMAIL;
    const to = process.env.ENQUIRY_TO_EMAIL;

    if (!apiKey || !from || !to) {
      console.error("Resend is not fully configured.");

      return NextResponse.json(
        {
          success: false,
          message:
            "Email delivery is temporarily unavailable. Please try again later.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const enquiryLabels: Record<string, string> = {
      safari: "Safari package",
      excursion: "Day excursion",
      destination: "Destination",
      custom: "Custom trip",
    };

    const selectedItem =
      enquiry.enquiryType === "safari"
        ? enquiry.safariSlug
        : enquiry.enquiryType === "excursion"
          ? enquiry.excursionSlug
          : enquiry.enquiryType === "destination"
            ? enquiry.destinationSlug
            : enquiry.customTrip;

    const details = [
      "NEW SAFARI ENQUIRY",
      "",
      `Enquiry type: ${enquiryLabels[enquiry.enquiryType]}`,
      `Selected package / destination: ${selectedItem || "Not specified"}`,
      "",
      "CONTACT DETAILS",
      `Name: ${enquiry.fullName}`,
      `Email: ${enquiry.email}`,
      `Phone / WhatsApp: ${enquiry.phone}`,
      `Country: ${enquiry.country || "Not provided"}`,
      "",
      "TRAVEL PREFERENCES",
      `Departure location: ${enquiry.departureLocation || "Not specified"}`,
      `Start date: ${enquiry.startDate || "Not specified"}`,
      `End date: ${enquiry.endDate || "Not specified"}`,
      `Flexible dates: ${enquiry.flexibleDates ? "Yes" : "No"}`,
      `Adults: ${enquiry.adults || "Not specified"}`,
      `Children: ${enquiry.children || "Not specified"}`,
      `Accommodation: ${enquiry.accommodation || "Not specified"}`,
      `Transport: ${enquiry.transport || "Not specified"}`,
      `Budget per person: ${enquiry.budget || "Not specified"}`,
      "",
      "ADDITIONAL INFORMATION",
      `Custom trip details: ${enquiry.customTrip || "Not provided"}`,
      `Message: ${enquiry.message || "Not provided"}`,
      "",
      "Privacy consent: Yes",
    ].join("\n");

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: enquiry.email,
      subject: `New ${enquiryLabels[enquiry.enquiryType]} enquiry — ${enquiry.fullName}`,
      text: details,
    });

    if (error) {
      console.error("Resend email error:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "We could not send your enquiry right now. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent successfully.",
    });
  } catch (error) {
    console.error("Enquiry API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while processing your enquiry.",
      },
      { status: 500 },
    );
  }
}
