
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
import { FlaskConical, Users, Printer, CheckCircle, Clock, FileText, MoreHorizontal, Sparkles, FileEdit, UserCog, Ban } from "lucide-react";
import type { LabAppointment, Patient, Analyte } from "@/lib/types";
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
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";

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

  const handleCreateOrViewReport = (appointment: LabAppointment) => {
    const patient = patients.find(p => p.id === appointment.patientId);
    setSelectedAppointment(appointment);
    setSelectedPatient(patient || null);
    
    // If report data already exists, set it. Otherwise, clear it.
    if (appointment.reportData) {
        setGeneratedReport(appointment.reportData);
    } else {
        setGeneratedReport(null);
    }

    setIsReportOpen(true);
  }

  const handleGenerateWithAI = async () => {
    if (!selectedAppointment) return;
    setIsGenerating(true);
    setGeneratedReport(null);

    try {
      const report = await runGenerateLabReport({ testName: selectedAppointment.testName });
      setGeneratedReport(report);
      toast({
        title: "AI Report Generated",
        description: "Review and save the results.",
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

  const handleSaveReport = () => {
    if (!selectedAppointment || !generatedReport) return;
    
    setLabAppointments(currentAppointments =>
      currentAppointments.map(appt =>
        appt.id === selectedAppointment.id 
          ? { ...appt, status: 'Completed', reportData: generatedReport } 
          : appt
      )
    );
    
    setIsReportOpen(false);
    toast({
        title: "Report Saved",
        description: `Lab report for ${selectedAppointment.testName} has been saved.`,
    });
  };

  const handleAnalyteChange = (index: number, field: keyof Analyte, value: string) => {
    if (!generatedReport) return;
    const newResults = [...generatedReport.results];
    newResults[index] = {...newResults[index], [field]: value };
    setGeneratedReport({...generatedReport, results: newResults});
  }

  const handleInterpretationChange = (value: string) => {
    if (!generatedReport) return;
    setGeneratedReport({...generatedReport, interpretation: value});
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
          onCreateOrViewReport={handleCreateOrViewReport}
        />
      </main>

      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogContent className="sm:max-w-4xl printable-area">
              <DialogHeader>
                  <DialogTitle className="font-headline text-2xl">Lab Report Editor</DialogTitle>
                  <DialogDescription>
                      Create or edit the report for {selectedAppointment?.testName}. Generated on {format(new Date(), "PPP")}
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
                            <h3 className="font-semibold text-lg mb-2">Generating with AI...</h3>
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                      )}

                      {!generatedReport && !isGenerating && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground mb-4">You can manually create the report or generate one with AI.</p>
                            <Button onClick={handleGenerateWithAI} disabled={isGenerating}>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Generate with AI
                            </Button>
                        </div>
                      )}

                      {generatedReport && (
                        <div className="space-y-6">
                          <div>
                              <h3 className="font-semibold text-lg mb-2">Test Results</h3>
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead className="w-1/3">Analyte</TableHead>
                                          <TableHead className="w-1/3">Result</TableHead>
                                          <TableHead className="w-1/3">Reference Range</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {generatedReport.results.map((res, i) => (
                                          <TableRow key={i}>
                                              <TableCell><Input value={res.analyte} onChange={(e) => handleAnalyteChange(i, 'analyte', e.target.value)} /></TableCell>
                                              <TableCell><Input value={res.result} onChange={(e) => handleAnalyteChange(i, 'result', e.target.value)}/></TableCell>
                                              <TableCell><Input value={res.referenceRange} onChange={(e) => handleAnalyteChange(i, 'referenceRange', e.target.value)}/></TableCell>
                                          </TableRow>
                                      ))}
                                  </TableBody>
                              </Table>
                          </div>

                          <div className="pt-4">
                              <h3 className="font-semibold mb-2">Interpretation</h3>
                              <Textarea 
                                value={generatedReport.interpretation} 
                                onChange={(e) => handleInterpretationChange(e.target.value)}
                                rows={4}
                                placeholder="Enter interpretation here..."
                              />
                          </div>
                        </div>
                      )}
                  </div>
              )}
              <DialogFooter className="no-print pt-4 border-t">
                  <div className="flex justify-between w-full">
                      <div>
                          <Button variant="outline" onClick={handlePrint} disabled={!generatedReport}><Printer className="mr-2 h-4 w-4" />Print Report</Button>
                      </div>
                      <div className="flex gap-2">
                           <Button variant="ghost" onClick={() => setIsReportOpen(false)}>Cancel</Button>
                           <Button onClick={handleSaveReport} disabled={isGenerating || !generatedReport}><FileEdit className="mr-2 h-4 w-4" />Save Report</Button>
                      </div>
                  </div>
              </DialogFooter>
          </DialogContent>
      </Dialog>
    </div>
  );
}
