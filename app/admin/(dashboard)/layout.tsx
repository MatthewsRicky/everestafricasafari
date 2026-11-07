import type { ReactNode } from "react";

import { requireAdmin } from "@/lib/supabase/admin";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAdmin();

  return <>{children}</>;
}
