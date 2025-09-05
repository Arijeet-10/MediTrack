import type { Patient, Doctor, Department, Appointment } from "./types";

export const departments: Department[] = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General",
];

export const doctors: Doctor[] = [
  { id: "doc1", name: "Dr. Emily Carter", department: "Cardiology", availability: ["Monday 9-12", "Wednesday 14-17"], rating: 4.8, experience: 12 },
  { id: "doc2", name: "Dr. Ben Hayes", department: "Neurology", availability: ["Tuesday 10-13", "Thursday 15-18"], rating: 4.9, experience: 15 },
  { id: "doc3", name: "Dr. Olivia Chen", department: "Pediatrics", availability: ["Friday 8-11"], rating: 4.7, experience: 8 },
  { id: "doc4", name: "Dr. Marcus Rodriguez", department: "Orthopedics", availability: ["Monday 13-16", "Wednesday 9-12"], rating: 4.6, experience: 10 },
  { id: "doc5", name: "Dr. Sophia Lee", department: "General", availability: ["Tuesday 14-17", "Thursday 10-13"], rating: 4.8, experience: 7 },
];

export const patients: Patient[] = [
  {
    id: "pat1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    contact: "555-0101",
    address: "123 Maple St, Springfield",
    status: "Admitted",
    doctorId: "doc1",
  },
  {
    id: "pat2",
    name: "Jane Doe",
    age: 32,
    gender: "Female",
    contact: "555-0102",
    address: "456 Oak Ave, Springfield",
    status: "Under Observation",
    doctorId: "doc2",
  },
  {
    id: "pat3",
    name: "Peter Jones",
    age: 67,
    gender: "Male",
    contact: "555-0103",
    address: "789 Pine Ln, Springfield",
    status: "Discharged",
    doctorId: "doc4",
  },
  {
    id: "pat4",
    name: "Mary Johnson",
    age: 8,
    gender: "Female",
    contact: "555-0104",
    address: "101 Birch Rd, Springfield",
    status: "Admitted",
    doctorId: "doc3",
  },
    {
    id: "pat5",
    name: "David Williams",
    age: 58,
    gender: "Male",
    contact: "555-0105",
    address: "212 Cedar Blvd, Springfield",
    status: "Under Observation",
    doctorId: "doc1",
  },
];

export const appointments: Appointment[] = [
    {
        id: "apt1",
        patientId: "pat1",
        doctorId: "doc1",
        date: new Date("2024-08-10T10:00:00Z"),
        time: "10:00 AM",
        reason: "Follow-up",
    },
    {
        id: "apt2",
        patientId: "pat2",
        doctorId: "doc2",
        date: new Date("2024-08-10T11:00:00Z"),
        time: "11:00 AM",
        reason: "Initial Consultation",
    },
    {
        id: "apt3",
        patientId: "pat4",
        doctorId: "doc3",
        date: new date("2024-08-11T09:30:00Z"),
        time: "09:30 AM",
        reason: "Checkup",
    },
     {
        id: "apt4",
        patientId: "pat5",
        doctorId: "doc1",
        date: new Date("2024-08-12T15:00:00Z"),
        time: "03:00 PM",
        reason: "Routine Check",
    },
];
