"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, PlusCircle } from "lucide-react";

import AdminLogout from "./AdminLogout";

const navigation = [
  {
    label: "Journeys",
    href: "/admin/journeys",
    icon: Map,
  },
  {
    label: "New Journey",
    href: "/admin/journeys/new",
    icon: PlusCircle,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-6">
        <p className="text-lg font-semibold tracking-tight">Everest Africa</p>

        <p className="mt-1 text-xs text-gray-500">Journey Tracker CMS</p>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Management
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin/journeys"
              ? pathname === item.href ||
                /^\/admin\/journeys\/[^/]+$/.test(pathname)
              : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-100 text-gray-950"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <AdminLogout />
      </div>
    </aside>
  );
}
