import { Suspense } from "react";
import { redirect } from "next/navigation";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { createClient } from "@/lib/supabase/server";

async function AdminLoginContent() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const appMetadata = data?.claims?.app_metadata as
    | { role?: string }
    | undefined;

  if (appMetadata?.role === "admin") {
    redirect("/admin/journeys");
  }

  return <AdminLoginForm />;
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-stone-100 px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Everest Africa Safari
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
            Administrator Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Sign in to manage safari journeys, destinations and travel
            photographs.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-6 text-center text-sm text-stone-500">
              Checking authentication...
            </div>
          }
        >
          <AdminLoginContent />
        </Suspense>
      </div>
    </main>
  );
}
