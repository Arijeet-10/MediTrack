"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, CheckCircle, Clock, XCircle, FlaskConical, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LabAppointment, Patient } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LabAppointmentsClient } from "./lab-appointments-client";
import { UserNav } from "./user-nav";
import { Logo } from "./icons";
import Link from "next/link";

interface LaboratoryDashboardClientProps {
  initialLabAppointments: LabAppointment[];
  patients: Patient[];
}

export function LaboratoryDashboardClient({
  initialLabAppointments,
  patients,
}: LaboratoryDashboardClientProps) {

  const statusCounts = initialLabAppointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, { Scheduled: 0, Completed: 0, Cancelled: 0 });


  return (
     <div className="min-h-screen w-full bg-background">
       <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
         <Link href="#" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6" />
          <span>MediTrack - Laboratory Portal</span>
        </Link>
        <div className="ml-auto">
          <UserNav />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <header className="flex items-center justify-between">
            <h1 className="text-lg font-semibold md:text-2xl font-headline">
                Laboratory Dashboard
            </h1>
        </header>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Tests Today</CardTitle>
                    <FlaskConical className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{initialLabAppointments.length}</div>
                    <p className="text-xs text-muted-foreground">
                       Across all patients.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusCounts.Scheduled}</div>
                     <p className="text-xs text-muted-foreground">
                        Awaiting results.
                    </p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statusCounts.Completed}</div>
                     <p className="text-xs text-muted-foreground">
                        Reports sent.
                    </p>
                </CardContent>
            </Card>
        </div>
        <LabAppointmentsClient initialLabAppointments={initialLabAppointments} patients={patients} />
      </main>
    </div>
  );
}
