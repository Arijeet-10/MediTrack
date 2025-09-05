export type PatientStatus = "Admitted" | "Under Observation" | "Discharged";
export type Department = "Cardiology" | "Neurology" | "Pediatrics" | "Orthopedics" | "General";
export type Gender = "Male" | "Female" | "Other";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  contact: string;
  address: string;
  status: PatientStatus;
  doctorId: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: Department;
  availability: string[]; // e.g., ["Monday 9-12", "Wednesday 14-17"]
  rating: number;
  experience: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  time: string;
  reason: string;
}

export interface MedicalRecord {
  id:string;
  patientId: string;
  date: Date;
  type: "Note" | "Report";
  title: string;
  content: string;
  fileUrl?: string;
}

export interface Billing {
  id: string;
  patientId: string;
  amount: number;
  date: Date;
  status: "Paid" | "Pending" | "Overdue";
}

export interface LabAppointment {
  id: string;
  patientId: string;
  testName: string;
  date: Date;
  status: "Scheduled" | "Completed" | "Cancelled";
}