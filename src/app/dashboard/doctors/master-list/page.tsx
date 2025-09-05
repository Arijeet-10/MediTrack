import { AppShell } from "@/components/app-shell";
import { doctors, departments } from "@/lib/data";
import { DoctorMasterListClient } from "@/components/doctor-master-list-client";

export default function DoctorMasterListPage() {
  return (
    <AppShell>
      <DoctorMasterListClient initialDoctors={doctors} departments={departments} />
    </AppShell>
  );
}
