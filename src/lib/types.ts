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
  id: string;
  patientId: string;
  date: Date;
  type: "Note" | "Report";
  title: string;
  content: string;
  fileUrl?: string;
}
