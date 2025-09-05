import { AppShell } from "@/components/app-shell";
import { AiDiagnosisClient } from "@/components/ai-diagnosis-client";
import { patients } from "@/lib/data";

export default function AiDiagnosisPage() {
  // In a real app, you would fetch this data from an API
  const patientData = patients;

  return (
    <AppShell>
      <AiDiagnosisClient patients={patientData} />
    </AppShell>
  );
}
