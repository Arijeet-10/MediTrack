
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Doctor, Department, DoctorStatus } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


interface DoctorMasterListClientProps {
  departments: Department[];
}

const doctorStatuses: DoctorStatus[] = ["Active", "Inactive", "On Leave"];

const createFormSchema = (departments: Department[]) => z.object({
  name: z.string().min(1, "Name is required"),
  department: z.enum(departments as [string, ...string[]]),
  qualification: z.string().min(1, "Qualification is required"),
  experience: z.coerce.number().min(0, "Experience must be a positive number"),
  languages: z.string().min(1, "Languages are required"),
  email: z.string().email("Invalid email address"),
  status: z.enum(doctorStatuses as [string, ...string[]]),
});

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;


export function DoctorMasterListClient({ departments }: DoctorMasterListClientProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const { toast } = useToast();
  
  const formSchema = createFormSchema(departments);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department: departments[0] || "General",
      qualification: "",
      experience: 5,
      languages: "",
      email: "",
      status: "Active"
    },
  });

  const onSubmit = (data: FormValues) => {
      const newDoctor: Doctor = {
        id: `doc${doctors.length + 1}`,
        availability: ["Monday 9-12", "Wednesday 14-17"], // dummy availability
        ...data,
        languages: data.languages.split(",").map((s) => s.trim()),
      };
      setDoctors((prev) => [...prev, newDoctor]);
      toast({
        title: "Doctor Added Successfully",
        description: `${newDoctor.name} has been added to the master list.`,
      });
      form.reset();
  };

  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
            Add New Doctor
        </h1>
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle>Doctor Details</CardTitle>
                <CardDescription>Fill in the form below to add a new doctor to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Dr. John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {departments.map((d) => (
                                <SelectItem key={d} value={d}>
                                    {d}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="qualification"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Qualification</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., MBBS, MD" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Languages Spoken</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., English, Hindi, Tamil" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience (Yrs)</FormLabel>
                                <FormControl>
                                <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {doctorStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <Button type="submit">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Save Doctor
                    </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
