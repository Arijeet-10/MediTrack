
import { LaboratoryDashboardClient } from "@/components/laboratory-dashboard-client";
import { labAppointments, patients } from "@/lib/data";
import { UserProvider } from "@/hooks/use-user";

export default function LaboratoryDashboardPage() {
  return (
      <UserProvider>
        <LaboratoryDashboardClient
            initialLabAppointments={labAppointments}
            patients={patients}
        />
      </UserProvider>
  );
}
