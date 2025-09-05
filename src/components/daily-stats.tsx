
"use client";

import { useMemo } from "react";
import { appointments, doctors, billings } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, CreditCard, Stethoscope } from "lucide-react";
import { format, startOfDay } from "date-fns";

export function DailyStats() {
    const today = startOfDay(new Date());

    const dailyStats = useMemo(() => {
        const todaysAppointments = appointments.filter(a => startOfDay(new Date(a.date)).getTime() === today.getTime());

        const totalPatients = new Set(todaysAppointments.map(a => a.patientName)).size;
        
        const todaysBillings = billings.filter(b => startOfDay(new Date(b.date)).getTime() === today.getTime());
        const amountCollected = todaysBillings
            .filter(b => b.status === 'Paid')
            .reduce((sum, b) => sum + b.amount, 0);

        const getDoctorName = (doctorId: string) => doctors.find((d) => d.id === doctorId)?.name || "Unknown";

        const appointmentsPerDoctor = todaysAppointments.reduce((acc, a) => {
            const docName = getDoctorName(a.doctorId);
            acc[docName] = (acc[docName] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return { totalPatients, amountCollected, appointmentsPerDoctor };
    }, [today]);

    return (
        <div className="space-y-2">
             <Card className="bg-sidebar-accent border-sidebar-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                    <CardTitle className="text-xs font-medium">
                        Total Patients
                    </CardTitle>
                    <Users className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-lg font-bold">{dailyStats.totalPatients}</div>
                </CardContent>
            </Card>
            <Card className="bg-sidebar-accent border-sidebar-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                    <CardTitle className="text-xs font-medium">
                        Amount Collected
                    </CardTitle>
                    <CreditCard className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-lg font-bold">Rs. {dailyStats.amountCollected.toLocaleString('en-IN')}</div>
                </CardContent>
            </Card>
             <Card className="bg-sidebar-accent border-sidebar-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                    <CardTitle className="text-xs font-medium">Appts. / Doctor</CardTitle>
                    <Stethoscope className="h-3 w-3 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-2xs text-muted-foreground p-2 pt-0 space-y-1">
                   {Object.entries(dailyStats.appointmentsPerDoctor).length > 0 ? (
                        Object.entries(dailyStats.appointmentsPerDoctor).map(([name, count]) => (
                            <div key={name} className="flex justify-between">
                                <span>{name}</span>
                                <span>{count}</span>
                            </div>
                        ))
                   ) : <p>No appointments.</p>}
                </CardContent>
            </Card>
        </div>
    )
}

