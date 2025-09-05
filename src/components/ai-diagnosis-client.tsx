"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { runAiDiagnosis } from "@/app/dashboard/ai-diagnosis/actions";
import type { AiDiagnosisSupportOutput } from "@/ai/flows/ai-diagnostic-support";
import type { Patient } from "@/lib/types";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  patientId: z.string().min(1, { message: "Please select a patient." }),
  currentSymptoms: z.string().min(10, { message: "Please describe the current symptoms." }),
  historicalData: z.string().optional(),
  labReports: z.string().optional(),
  doctorNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AiDiagnosisClientProps {
  patients: Patient[];
}

export function AiDiagnosisClient({ patients }: AiDiagnosisClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiDiagnosisSupportOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      currentSymptoms: "",
      historicalData: "",
      labReports: "",
      doctorNotes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    const patient = patients.find(p => p.id === data.patientId);
    if (!patient) {
      setError("Selected patient not found.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await runAiDiagnosis({
        ...data,
        historicalData: data.historicalData || "No historical data provided.",
        labReports: data.labReports || "No lab reports provided.",
        doctorNotes: data.doctorNotes || "No doctor notes provided.",
      });
      setResult(response);
    } catch (e) {
      setError("An error occurred while fetching the AI diagnosis. Please try again.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Diagnostic Support</CardTitle>
          <CardDescription>
            Fill in the patient's details to get an AI-powered diagnosis suggestion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} (ID: {p.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSymptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Symptoms</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Persistent cough, fever, and shortness of breath..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="(Optional) e.g., History of asthma, non-smoker..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="labReports"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab Reports</FormLabel>
                    <FormControl>
                      <Textarea placeholder="(Optional) e.g., CBC: High WBC, CRP: Elevated..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Analyzing..." : "Get AI Suggestion"}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold font-headline">Diagnosis Result</h2>
        {isLoading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        )}
        {error && <Card className="border-destructive bg-destructive/10"><CardContent className="p-4 text-destructive-foreground"><p>{error}</p></CardContent></Card>}
        {!isLoading && !result && !error && (
            <Card className="flex items-center justify-center h-full border-dashed">
                <CardContent className="p-6 text-center text-muted-foreground">
                    <p>The AI-generated diagnosis will appear here.</p>
                </CardContent>
            </Card>
        )}
        {result && (
          <Card className="bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <CardTitle className="font-headline flex items-center justify-between">
                <span>{result.diagnosisSuggestion}</span>
                <Badge variant="secondary">
                    Confidence: {(result.confidenceLevel * 100).toFixed(0)}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.factorsForConcern && (
                <div>
                  <h3 className="font-semibold mb-2">Factors for Concern</h3>
                  <p className="text-sm text-muted-foreground">{result.factorsForConcern}</p>
                </div>
              )}
              {result.suggestedTreatment && (
                <div>
                  <h3 className="font-semibold mb-2">Suggested Treatment</h3>
                  <p className="text-sm text-muted-foreground">{result.suggestedTreatment}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
