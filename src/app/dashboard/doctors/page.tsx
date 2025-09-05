import { AppShell } from "@/components/app-shell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doctors } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Heart, Brain, Bone, Baby, Star, MessageSquare, Phone, GraduationCap, Languages } from "lucide-react";
import type { Department } from "@/lib/types";
import { Button } from "@/components/ui/button";

const departmentIcons: Record<Department, React.ElementType> = {
  Cardiology: Heart,
  Neurology: Brain,
  Orthopedics: Bone,
  Pediatrics: Baby,
  General: Stethoscope,
};

const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            {halfStar && <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="h-4 w-4 fill-muted stroke-muted-foreground" />
            ))}
        </div>
    );
};


export default function DoctorsPage() {
  const activeDoctors = doctors.filter(d => d.status === 'Active' || d.status === 'On Leave');

  return (
    <AppShell>
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Our Doctors
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeDoctors.map((doctor) => {
            const Icon = departmentIcons[doctor.department] || Stethoscope;
            return (
            <Card key={doctor.id} className="transition-all duration-200 hover:shadow-lg hover:scale-105 flex flex-col">
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
              <CardContent className="space-y-4 flex-grow">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{doctor.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4" />
                  <span>{doctor.experience} years experience</span>
                </div>
                 <div className="flex items-center gap-2 text-sm">
                  {renderStars(doctor.rating)}
                  <span className="text-muted-foreground">({doctor.rating}/5)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages className="h-4 w-4" />
                    <span>{doctor.languages.join(", ")}</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Availability</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availability.map((slot) => (
                      <Badge key={slot} variant="secondary">{slot}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-2 mt-auto">
                 <div className="flex gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="mr-2 h-4 w-4" /> Call
                    </Button>
                </div>
                <Button className="w-full mt-2">Book Appointment</Button>
              </CardContent>
            </Card>
          )})}
        </div>
      </div>
    </AppShell>
  );
}
