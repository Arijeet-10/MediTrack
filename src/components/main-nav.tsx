import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Calendar, LayoutDashboard, Stethoscope, List, CreditCard, FlaskConical, User, Pill } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const adminMenuItems = [
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
    href: "/dashboard/billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    href: "/dashboard/lab-appointments",
    label: "Lab Appointments",
    icon: FlaskConical,
  },
  {
    href: "/dashboard/ai-diagnosis",
    label: "AI Diagnosis",
    icon: BrainCircuit,
  },
];

const doctorMenuItems = [
    {
        href: "/dashboard/doctor",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/appointments",
        label: "Appointments",
        icon: Calendar,
    },
    {
        href: "/dashboard/ai-diagnosis",
        label: "AI Diagnosis",
        icon: BrainCircuit,
    }
]

const labMenuItems = [
    {
        href: "/dashboard/laboratory",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/lab-appointments",
        label: "Lab Appointments",
        icon: FlaskConical,
    }
]

const pharmacistMenuItems = [
    {
        href: "/dashboard/pharmacist",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/dashboard/pharmacist/prescriptions",
        label: "Prescriptions",
        icon: Pill,
    }
]



export function MainNav() {
  const pathname = usePathname();

  let menuItems = adminMenuItems;

  if (pathname.startsWith('/dashboard/doctor')) {
    menuItems = doctorMenuItems;
  } else if (pathname.startsWith('/dashboard/laboratory')) {
    menuItems = labMenuItems;
  } else if (pathname.startsWith('/dashboard/pharmacist')) {
    menuItems = pharmacistMenuItems;
  }


  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href) && (item.href.split('/').length === 3 ? pathname === item.href : true)}
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