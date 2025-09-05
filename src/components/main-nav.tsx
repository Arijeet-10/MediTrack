import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Calendar, LayoutDashboard, Stethoscope, List } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/appointments",
      label: "Appointments",
      icon: Calendar,
    },
    {
      href: "/dashboard/doctors",
      label: "Doctors",
      icon: Stethoscope,
    },
    {
      href: "/dashboard/doctors/master-list",
      label: "Doctor Master List",
      icon: List,
    },
    {
      href: "/dashboard/ai-diagnosis",
      label: "AI Diagnosis",
      icon: BrainCircuit,
    },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              className={cn("w-full justify-start")}
              tooltip={item.label}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
