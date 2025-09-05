
import { AppShell } from "@/components/app-shell";
import { departments } from "@/lib/data";
import { DoctorMasterListClient } from "@/components/doctor-master-list-client";

export default function DoctorMasterListPage() {
  return (
    <AppShell>
      <DoctorMasterListClient departments={departments} />
    </AppShell>
  );
}
