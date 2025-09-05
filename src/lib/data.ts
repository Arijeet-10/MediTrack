import type { Patient, Doctor, Department } from "./types";

export const departments: Department[] = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General",
];

export const doctors: Doctor[] = [
  { id: "doc1", name: "Dr. Emily Carter", department: "Cardiology", availability: ["Monday 9-12", "Wednesday 14-17"] },
  { id: "doc2", name: "Dr. Ben Hayes", department: "Neurology", availability: ["Tuesday 10-13", "Thursday 15-18"] },
  { id: "doc3", name: "Dr. Olivia Chen", department: "Pediatrics", availability: ["Friday 8-11"] },
  { id: "doc4", name: "Dr. Marcus Rodriguez", department: "Orthopedics", availability: ["Monday 13-16", "Wednesday 9-12"] },
  { id: "doc5", name: "Dr. Sophia Lee", department: "General", availability: ["Tuesday 14-17", "Thursday 10-13"] },
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
