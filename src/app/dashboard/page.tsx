import { AppShell } from "@/components/app-shell";
import { DashboardClient } from "@/components/dashboard-client";
import { patients, doctors } from "@/lib/data";

export default function DashboardPage() {
  // In a real app, you would fetch this data from an API
  const patientData = patients;
  const doctorData = doctors;

  return (
    <AppShell>
      <DashboardClient patients={patientData} doctors={doctorData} />
    </AppShell>
  );
}
