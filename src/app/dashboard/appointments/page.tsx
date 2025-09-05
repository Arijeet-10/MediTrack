import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AppointmentsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Appointments
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              The appointment scheduling and calendar view feature is currently under development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Check back soon to manage patient appointments!</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
