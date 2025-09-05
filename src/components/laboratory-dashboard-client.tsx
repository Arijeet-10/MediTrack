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
import { Button } from "@/components/ui/button";
import { FlaskConical, Users, Printer, CheckCircle, Clock } from "lucide-react";
import type { LabAppointment, Patient } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LabAppointmentsClient } from "./lab-appointments-client";
import { UserNav } from "./user-nav";
import { Logo } from "./icons";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { runGenerateLabReport } from "@/app/dashboard/laboratory/actions";
import type { GenerateLabReportOutput } from "@/ai/flows/generate-lab-report";
import { Skeleton } from "./ui/skeleton";

interface LaboratoryDashboardClientProps {
  initialLabAppointments: LabAppointment[];
  patients: Patient[];
}

export function LaboratoryDashboardClient({
  initialLabAppointments,
  patients,
}: LaboratoryDashboardClientProps) {

  const [labAppointments, setLabAppointments] = useState(initialLabAppointments);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<GenerateLabReportOutput | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<LabAppointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { toast } = useToast();


  const statusCounts = labAppointments.reduce((acc, appt) => {
    acc[appt.status] = (acc[appt.status] || 0) + 1;
    return acc;
  }, { Scheduled: 0, Completed: 0, Cancelled: 0 });

  const handleGenerateReport = async (appointment: LabAppointment) => {
    const patient = patients.find(p => p.id === appointment.patientId);
    setSelectedAppointment(appointment);
    setSelectedPatient(patient || null);
    setIsReportOpen(true);
    setIsGenerating(true);
    setGeneratedReport(null);

    try {
      const report = await runGenerateLabReport({ testName: appointment.testName });
      setGeneratedReport(report);
      // Update appointment status to 'Completed'
      setLabAppointments(currentAppointments =>
        currentAppointments.map(appt =>
          appt.id === appointment.id ? { ...appt, status: 'Completed' } : appt
        )
      );
      toast({
        title: "Report Generated",
        description: `Lab report for ${appointment.testName} has been successfully generated.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate the lab report. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  const handlePrint = () => {
    window.print();
  }


  return (
     <div className="min-h-screen w-full bg-background printable-area-container">
       <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 no-print">
         <Link href="#" className="flex items-center gap-2 font-semibold">
          <Logo className="h-6 w-6" />
          <span>MediTrack - Laboratory Portal</span>
        </Link>
        <div className="ml-auto">
          <UserNav />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 no-print">
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
                    <div className="text-2xl font-bold">{labAppointments.length}</div>
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
        <LabAppointmentsClient
          initialLabAppointments={labAppointments}
          patients={patients}
          onGenerateReport={handleGenerateReport}
        />
      </main>

      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogContent className="sm:max-w-3xl printable-area">
              <DialogHeader>
                  <DialogTitle className="font-headline text-2xl">Lab Report</DialogTitle>
                  <DialogDescription>
                      Report for {selectedAppointment?.testName} - Generated on {format(new Date(), "PPP")}
                  </DialogDescription>
              </DialogHeader>
              {selectedPatient && selectedAppointment && (
                  <div className="space-y-6 py-4 text-sm">
                      <div className="grid grid-cols-2 gap-4 border-b pb-4">
                          <div>
                              <h3 className="font-semibold">Patient Information</h3>
                              <p><strong>Name:</strong> {selectedPatient.name}</p>
                              <p><strong>Age:</strong> {selectedPatient.age}</p>
                              <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                          </div>
                          <div>
                              <h3 className="font-semibold">Test Details</h3>
                              <p><strong>Test Name:</strong> {selectedAppointment.testName}</p>
                              <p><strong>Appointment ID:</strong> {selectedAppointment.id}</p>
                              <p><strong>Date of Test:</strong> {format(selectedAppointment.date, "PPP")}</p>
                          </div>
                      </div>
                      
                      {isGenerating && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg mb-2">Generating Results...</h3>
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                      )}

                      {generatedReport && (
                        <>
                          <div>
                              <h3 className="font-semibold text-lg mb-2">Test Results</h3>
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead>Analyte</TableHead>
                                          <TableHead>Result</TableHead>
                                          <TableHead>Reference Range</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {generatedReport.results.map((res, i) => (
                                          <TableRow key={i}>
                                              <TableCell>{res.analyte}</TableCell>
                                              <TableCell>{res.result}</TableCell>
                                              <TableCell>{res.referenceRange}</TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </div>

                          <div className="border-t pt-4">
                              <h3 className="font-semibold mb-2">Interpretation</h3>
                              <p className="text-muted-foreground">{generatedReport.interpretation}</p>
                          </div>
                        </>
                      )}
                  </div>
              )}
              <DialogFooter className="no-print">
                  <Button variant="outline" onClick={() => setIsReportOpen(false)}>Close</Button>
                  <Button onClick={handlePrint} disabled={isGenerating || !generatedReport}><Printer className="mr-2 h-4 w-4" />Print Report</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
