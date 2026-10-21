import type { VerificationField, VerificationStatus } from "@/types/safari";

export type Excursion = {
  slug: string;
  title: string;
  sourceTitle: string;
  description: string;
  durationDays: number;
  departureLocation?: string;
  image: string;
  sourceUrl: string;
  verificationStatus: VerificationStatus;
  verificationNotes: VerificationField[];
  highlights: string[];
  imageStatus: "placeholder" | "source-unverified" | "approved";
};
