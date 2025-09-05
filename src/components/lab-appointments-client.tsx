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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LabAppointment, Patient } from "@/lib/types";
import { format } from "date-fns";

interface LabAppointmentsClientProps {
  initialLabAppointments: LabAppointment[];
  patients: Patient[];
}

export function LabAppointmentsClient({
  initialLabAppointments,
  patients,
}: LabAppointmentsClientProps) {
  const [labAppointments, setLabAppointments] =
    useState(initialLabAppointments);

  const getPatientName = (patientId: string) =>
    patients.find((p) => p.id === patientId)?.name || "Unknown";

  const getStatusVariant = (status: "Scheduled" | "Completed" | "Cancelled") => {
    switch (status) {
      case "Completed":
        return "default";
      case "Scheduled":
        return "secondary";
      case "Cancelled":
        return "destructive";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Lab Appointments
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Schedule Lab Test
            </span>
          </Button>
        </div>
      </div>
      <div className="rounded-xl border shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labAppointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell className="font-medium">{appt.id}</TableCell>
                <TableCell>{getPatientName(appt.patientId)}</TableCell>
                <TableCell>{appt.testName}</TableCell>
                <TableCell>{format(appt.date, "PPP")}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(appt.status)}>{appt.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Results</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
