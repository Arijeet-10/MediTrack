import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DoctorsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Doctors
        </h1>
         <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              The doctor directory and department filtering feature is currently under development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Soon you'll be able to view and manage doctor information here.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
