import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doctors } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Stethoscope } from "lucide-react";

export default function DoctorsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Our Doctors
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/avatars/${doctor.id}.png`} alt={doctor.name} data-ai-hint="doctor headshot" />
                  <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.department}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Stethoscope className="h-4 w-4" />
                  <span>{doctor.department}</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Availability</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map((slot) => (
                      <Badge key={slot} variant="secondary">{slot}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
