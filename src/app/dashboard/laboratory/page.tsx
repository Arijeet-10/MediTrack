import { AppShell } from "@/components/app-shell";
import { LaboratoryDashboardClient } from "@/components/laboratory-dashboard-client";
import { labAppointments, patients } from "@/lib/data";

export default function LaboratoryDashboardPage() {
  return (
    <AppShell>
      <LaboratoryDashboardClient
        initialLabAppointments={labAppointments}
        patients={patients}
      />
    </AppShell>
  );
}
