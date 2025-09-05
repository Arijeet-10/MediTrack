import { appointments, doctors, patients } from "@/lib/data";
import { DoctorAppointmentsClient } from "@/components/doctor-appointments-client";
import { UserProvider } from "@/hooks/use-user";

export default function DoctorAppointmentsPage() {
    const doctorId = "doc1"; // In a real app, you would get this from the logged in user
    const doctorAppointments = appointments.filter(a => a.doctorId === doctorId);

    return (
        <UserProvider>
            <DoctorAppointmentsClient
                doctorAppointments={doctorAppointments}
                patients={patients}
                doctors={doctors}
            />
        </UserProvider>
    );
}
