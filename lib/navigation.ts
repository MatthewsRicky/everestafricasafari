import { LayoutDashboard, PlusCircle } from "lucide-react";

export const navigation = [
  { label: "Safaris", href: "/safaris" },
  { label: "Destinations", href: "/destinations" },
  { label: "Excursions", href: "/excursions" },
  { label: "About", href: "/about" },
  {
    label: "Safari Tracker",
    href: "/safari-tracker",
  },
  {
    label: "Dashboard",
    href: "/admin/journeys",
    icon: LayoutDashboard,
  },
  {
    label: "New Journey",
    href: "/admin/journeys/new",
    icon: PlusCircle,
  },
] as const;
