
"use client";

import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, Star, Edit, Trash, CheckCircle, XCircle, PowerOff } from "lucide-react";
import type { Doctor, Department, DoctorStatus } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


interface DoctorMasterListClientProps {
  initialDoctors: Doctor[];
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

const statusConfig: Record<DoctorStatus, { variant: "default" | "secondary" | "destructive"; icon: React.ElementType }> = {
    Active: { variant: 'default', icon: CheckCircle },
    Inactive: { variant: 'destructive', icon: XCircle },
    "On Leave": { variant: 'secondary', icon: PowerOff }
}

export function DoctorMasterListClient({ initialDoctors, departments }: DoctorMasterListClientProps) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const { toast } = useToast();

  const [departmentFilter, setDepartmentFilter] = useState<"All" | Department>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | DoctorStatus>("All");
  
  const formSchema = createFormSchema(departments);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      qualification: "",
      experience: 5,
      languages: "",
      email: "",
      status: "Active",
    },
  });

  const openDialog = (doctor: Doctor | null) => {
    setEditingDoctor(doctor);
    if (doctor) {
      form.reset({
        name: doctor.name,
        department: doctor.department,
        qualification: doctor.qualification,
        experience: doctor.experience,
        languages: doctor.languages.join(", "),
        email: doctor.email,
        status: doctor.status,
      });
    } else {
      form.reset({
        name: "",
        department: departments[0] || "General",
        qualification: "",
        experience: 5,
        languages: "",
        email: "",
        status: "Active"
      });
    }
    setIsDialogOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (editingDoctor) {
      // Update existing doctor
      const updatedDoctor: Doctor = {
        ...editingDoctor,
        ...data,
        languages: data.languages.split(",").map((s) => s.trim()),
      };
      setDoctors(doctors.map(d => d.id === editingDoctor.id ? updatedDoctor : d));
      toast({
        title: "Doctor Updated",
        description: `${updatedDoctor.name}'s details have been updated.`,
      });
    } else {
       // Add new doctor
      const newDoctor: Doctor = {
        id: `doc${doctors.length + 1}`,
        availability: ["Monday 9-12", "Wednesday 14-17"], // dummy availability
        ...data,
        languages: data.languages.split(",").map((s) => s.trim()),
      };
      setDoctors((prev) => [...prev, newDoctor]);
      toast({
        title: "Doctor Added",
        description: `${newDoctor.name} has been added to the master list.`,
      });
    }

    setIsDialogOpen(false);
    setEditingDoctor(null);
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
        const departmentMatch = departmentFilter === 'All' || doctor.department === departmentFilter;
        const statusMatch = statusFilter === 'All' || doctor.status === statusFilter;
        return departmentMatch && statusMatch;
    });
  }, [doctors, departmentFilter, statusFilter]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl font-headline">
            Doctor Master List
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" className="h-9 gap-1" onClick={() => openDialog(null)}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Doctor
              </span>
            </Button>
          </div>
        </div>

        <Card>
            <CardContent className="p-4 flex gap-4">
                <Select value={departmentFilter} onValueChange={(value) => setDepartmentFilter(value as any)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Departments</SelectItem>
                        {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        {doctorStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map(doctor => {
                const statusInfo = statusConfig[doctor.status];
                return (
                <Card key={doctor.id} className="flex flex-col">
                    <CardContent className="p-4 flex-grow">
                        <div className="flex items-start gap-4">
                            <Avatar className="h-20 w-20 border">
                                <AvatarImage src={`/avatars/${doctor.id}.png`} alt={doctor.name} data-ai-hint="doctor headshot" />
                                <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{doctor.name}</h3>
                                        <p className="text-sm text-muted-foreground">{doctor.department}</p>
                                    </div>
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onSelect={() => openDialog(doctor)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <p className="text-sm mt-1">{doctor.qualification}</p>
                                <div className="flex items-center gap-1 text-sm mt-1">
                                    <span>{doctor.experience} yrs exp.</span>
                                </div>
                            </div>
                        </div>
                         <div className="mt-4 space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Email</span>
                                <span>{doctor.email}</span>
                            </div>
                             <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Languages</span>
                                <span>{doctor.languages.join(", ")}</span>
                            </div>
                        </div>
                    </CardContent>
                     <div className="p-4 border-t">
                        <Badge variant={statusInfo.variant} className="w-full justify-center">
                            <statusInfo.icon className="mr-2 h-4 w-4" />
                            {doctor.status}
                        </Badge>
                     </div>
                </Card>
            )})}
        </div>

      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
            <DialogDescription>
              {editingDoctor ? "Update the doctor's details below." : "Fill in the details to add a new doctor."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{editingDoctor ? "Save Changes" : "Add Doctor"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
