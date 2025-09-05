import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { appointments, patients, doctors } from "@/lib/data";
import { format } from "date-fns";

export default function AppointmentsPage() {
  const getPatientName = (patientId: string) => patients.find(p => p.id === patientId)?.name || "Unknown";
  const getDoctorName = (doctorId: string) => doctors.find(d => d.id === doctorId)?.name || "Unknown";

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl font-headline">
            Appointments
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Schedule Appointment
              </span>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Manage upcoming patient appointments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{getPatientName(appointment.patientId)}</TableCell>
                    <TableCell>{getDoctorName(appointment.doctorId)}</TableCell>
                    <TableCell>{format(appointment.date, "PPP")}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
