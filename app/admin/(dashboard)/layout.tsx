import type { ReactNode } from "react";
import { Suspense } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/lib/supabase/admin";

async function AdminDashboardContent({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <div className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </div>

      <main className="min-w-0 flex-1">
        <div className="border-b border-gray-200 bg-white px-6 py-5">
          <p className="text-sm font-medium text-gray-500">
            Everest Africa Safari
          </p>
        </div>

        <div className="mx-auto max-w-7xl p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <p className="text-sm text-gray-500">
            Verifying administrator access...
          </p>
        </div>
      }
    >
      <AdminDashboardContent>{children}</AdminDashboardContent>
    </Suspense>
  );
}
