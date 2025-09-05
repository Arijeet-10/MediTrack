import type { Patient, Doctor, Department, Appointment, Billing, LabAppointment, MedicalRecord } from "./types";

export const departments: Department[] = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General",
];

export const doctors: Doctor[] = [
  { id: "doc1", name: "Dr. Priya Sharma", department: "Cardiology", qualification: "MBBS, MD (Cardiology)", experience: 12, availability: ["Monday 9-12", "Wednesday 14-17"], rating: 4.8, languages: ["English", "Hindi"], email: "priya.sharma@meditrack.com", status: "Active" },
  { id: "doc2", name: "Dr. Rohan Gupta", department: "Neurology", qualification: "MBBS, DM (Neurology)", experience: 15, availability: ["Tuesday 10-13", "Thursday 15-18"], rating: 4.9, languages: ["English", "Kannada"], email: "rohan.gupta@meditrack.com", status: "Active" },
  { id: "doc3", name: "Dr. Ananya Reddy", department: "Pediatrics", qualification: "MBBS, MD (Pediatrics)", experience: 8, availability: ["Friday 8-11"], rating: 4.7, languages: ["English", "Telugu"], email: "ananya.reddy@meditrack.com", status: "On Leave" },
  { id: "doc4", name: "Dr. Vikram Singh", department: "Orthopedics", qualification: "MBBS, MS (Orthopedics)", experience: 10, availability: ["Monday 13-16", "Wednesday 9-12"], rating: 4.6, languages: ["English", "Hindi"], email: "vikram.singh@meditrack.com", status: "Active" },
  { id: "doc5", name: "Dr. Sunita Patel", department: "General", qualification: "MBBS, DNB (General Medicine)", experience: 7, availability: ["Tuesday 14-17", "Thursday 10-13"], rating: 4.8, languages: ["English", "Gujarati"], email: "sunita.patel@meditrack.com", status: "Inactive" },
];

export const patients: Patient[] = [
  {
    id: "pat1",
    name: "Arjun Mehta",
    age: 45,
    gender: "Male",
    contact: "9876543210",
    address: "123 MG Road, Bangalore",
    status: "Admitted",
    doctorId: "doc1",
  },
  {
    id: "pat2",
    name: "Sneha Rao",
    age: 32,
    gender: "Female",
    contact: "9876543211",
    address: "456 Koramangala, Bangalore",
    status: "Under Observation",
    doctorId: "doc2",
  },
  {
    id: "pat3",
    name: "Rajesh Kumar",
    age: 67,
    gender: "Male",
    contact: "9876543212",
    address: "789 Jayanagar, Bangalore",
    status: "Discharged",
    doctorId: "doc4",
  },
  {
    id: "pat4",
    name: "Meera Iyer",
    age: 8,
    gender: "Female",
    contact: "9876543213",
    address: "101 Indiranagar, Bangalore",
    status: "Admitted",
    doctorId: "doc3",
  },
    {
    id: "pat5",
    name: "Vijay Nair",
    age: 58,
    gender: "Male",
    contact: "9876543214",
    address: "212 HSR Layout, Bangalore",
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
        status: "Completed",
        mode: "In-person",
        duration: 30,
        fees: 1500,
        paymentStatus: "Paid",
    },
    {
        id: "apt2",
        patientId: "pat2",
        doctorId: "doc2",
        date: new Date("2024-08-10T11:00:00Z"),
        time: "11:00 AM",
        reason: "Initial Consultation",
        status: "Confirmed",
        mode: "Online",
        duration: 45,
        fees: 2000,
        paymentStatus: "Pending",
    },
    {
        id: "apt3",
        patientId: "pat4",
        doctorId: "doc3",
        date: new Date("2024-08-11T09:30:00Z"),
        time: "09:30 AM",
        reason: "Checkup",
        status: "Confirmed",
        mode: "In-person",
        duration: 30,
        fees: 800,
        paymentStatus: "Paid",
    },
     {
        id: "apt4",
        patientId: "pat5",
        doctorId: "doc1",
        date: new Date("2024-08-12T15:00:00Z"),
        time: "03:00 PM",
        reason: "Routine Check",
        status: "Pending",
        mode: "Telephonic",
        duration: 15,
        fees: 500,
        paymentStatus: "Pending",
    },
     {
        id: "apt5",
        patientId: "pat3",
        doctorId: "doc4",
        date: new Date("2024-08-09T14:00:00Z"),
        time: "02:00 PM",
        reason: "Pre-surgery consultation",
        status: "Cancelled",
        mode: "In-person",
        duration: 60,
        fees: 2500,
        paymentStatus: "Pending",
    },
];

export const billings: Billing[] = [
    { id: "bill1", patientId: "pat1", amount: 1200, date: new Date("2024-08-10"), status: "Paid" },
    { id: "bill2", patientId: "pat2", amount: 750, date: new Date("2024-08-10"), status: "Pending" },
    { id: "bill3", patientId: "pat3", amount: 300, date: new Date("2024-07-05"), status: "Overdue" },
    { id: "bill4", patientId: "pat4", amount: 2500, date: new Date("2024-08-11"), status: "Pending" },
];

export const labAppointments: LabAppointment[] = [
    { id: "lab1", patientId: "pat1", testName: "Blood Panel", date: new Date("2024-08-11"), status: "Scheduled" },
    { id: "lab2", patientId: "pat2", testName: "MRI Scan", date: new Date("2024-08-12"), status: "Scheduled" },
    { id: "lab3", patientId: "pat5", testName: "X-Ray", date: new Date("2024-08-09"), status: "Completed" },
];

export const medicalRecords: MedicalRecord[] = [
    {
        id: "rec1",
        patientId: "pat1",
        date: new Date("2024-08-01"),
        type: "Note",
        title: "Initial Consultation",
        content: "Patient presents with chest pain and shortness of breath. Recommended further tests.",
    },
    {
        id: "rec2",
        patientId: "pat1",
        date: new Date("2024-08-05"),
        type: "Report",
        title: "ECG Report",
        content: "ECG shows signs of arrhythmia.",
        fileUrl: "#",
    },
    {
        id: "rec3",
        patientId: "pat2",
        date: new Date("2024-07-20"),
        type: "Note",
        title: "Migraine Follow-up",
        content: "Patient reports reduced frequency of migraines with new medication.",
    }
];
