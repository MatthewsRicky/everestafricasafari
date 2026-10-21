import { z } from "zod";

const optionalText = (maxLength = 5000) =>
  z
    .string()
    .trim()
    .max(maxLength, `Maximum ${maxLength} characters.`)
    .optional()
    .or(z.literal(""));

const optionalDate = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
    "Please provide a valid date.",
  );

const travellerCount = (maximum: number) =>
  z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) =>
        !value ||
        value === `${maximum}+` ||
        (/^\d+$/.test(value) && Number(value) >= 0 && Number(value) <= maximum),
      "Please select a valid number of travellers.",
    );

export const enquirySchema = z
  .object({
    enquiryType: z.enum(["safari", "excursion", "destination", "custom"]),

    safariSlug: optionalText(200),
    excursionSlug: optionalText(200),
    destinationSlug: optionalText(200),

    fullName: z
      .string()
      .trim()
      .min(2, "Please share your full name.")
      .max(100, "Your name is too long."),

    email: z
      .string()
      .trim()
      .email("Please provide a valid email address.")
      .max(254, "Please provide a valid email address."),

    phone: z
      .string()
      .trim()
      .min(6, "Please provide a valid phone number.")
      .max(40, "Please provide a valid phone number."),

    country: optionalText(100),

    departureLocation: optionalText(150),
    startDate: optionalDate,
    endDate: optionalDate,
    flexibleDates: z.boolean().optional().default(false),

    adults: travellerCount(11),
    children: travellerCount(10),

    accommodation: optionalText(100),
    transport: optionalText(100),
    budget: optionalText(100),

    customTrip: optionalText(2000),
    message: optionalText(3000),

    website: z.string().optional().default(""),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.consent) {
      ctx.addIssue({
        code: "custom",
        path: ["consent"],
        message: "Please agree to the enquiry privacy notice.",
      });
    }

    if (data.website.trim() !== "") {
      ctx.addIssue({
        code: "custom",
        path: ["website"],
        message: "Invalid submission.",
      });
    }

    if (data.enquiryType === "safari" && !data.safariSlug) {
      ctx.addIssue({
        code: "custom",
        path: ["safariSlug"],
        message: "Please select a safari package.",
      });
    }

    if (data.enquiryType === "excursion" && !data.excursionSlug) {
      ctx.addIssue({
        code: "custom",
        path: ["excursionSlug"],
        message: "Please select an excursion.",
      });
    }

    if (data.enquiryType === "destination" && !data.destinationSlug) {
      ctx.addIssue({
        code: "custom",
        path: ["destinationSlug"],
        message: "Please select a destination.",
      });
    }

    if (data.enquiryType === "custom" && !data.customTrip?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["customTrip"],
        message: "Please describe the trip you have in mind.",
      });
    }

    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "The return date must be on or after the start date.",
      });
    }
  });

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
