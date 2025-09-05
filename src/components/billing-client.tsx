
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Billing, Patient, BillingStatus } from "@/lib/types";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface BillingClientProps {
  initialBillings: Billing[];
  patients: Patient[];
}

const billingStatuses: BillingStatus[] = ["Paid", "Pending", "Overdue"];
const serviceTypes = ["Consultation", "Lab Test", "Procedure", "Surgery", "Pharmacy", "Other"];


const formSchema = z.object({
    patientId: z.string().min(1, "Patient is required"),
    serviceType: z.enum(serviceTypes as [string, ...string[]]),
    amount: z.coerce.number().min(0, "Amount must be a positive number"),
    status: z.enum(billingStatuses as [string, ...string[]]),
});

type FormValues = z.infer<typeof formSchema>;


export function BillingClient({
  initialBillings,
  patients,
}: BillingClientProps) {
  const [billings, setBillings] = useState(initialBillings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const getPatientName = (patientId: string) =>
    patients.find((p) => p.id === patientId)?.name || "Unknown";

  const getStatusVariant = (status: BillingStatus) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Pending":
        return "secondary";
      case "Overdue":
        return "destructive";
    }
  };

  const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          patientId: "",
          serviceType: "Consultation",
          amount: 0,
          status: "Pending",
      }
  });

  const onSubmit = (data: FormValues) => {
      const newBill: Billing = {
          id: `bill${billings.length + 1}`,
          patientId: data.patientId,
          amount: data.amount,
          date: new Date(),
          status: data.status,
          serviceType: data.serviceType
      };
      setBillings(prev => [newBill, ...prev]);
      setIsDialogOpen(false);
      form.reset();
      toast({
          title: "Bill Generated",
          description: `A new bill for ${getPatientName(newBill.patientId)} has been generated successfully.`
      })
  }

  return (
    <>
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">
          Billing
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Generate Bill
            </span>
          </Button>
        </div>
      </div>
      <div className="rounded-xl border shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billings.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">{bill.id.toUpperCase()}</TableCell>
                <TableCell>{getPatientName(bill.patientId)}</TableCell>
                <TableCell>{bill.serviceType}</TableCell>
                <TableCell>Rs. {bill.amount.toLocaleString("en-IN")}</TableCell>
                <TableCell>{format(bill.date, "dd-MMM-yyyy")}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(bill.status)}>{bill.status}</Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
             <DialogHeader>
                <DialogTitle>Generate New Bill</DialogTitle>
                <DialogDescription>
                    Fill in the details for the new bill.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                     <FormField
                        control={form.control}
                        name="patientId"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a patient" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {patients.map((p) => (
                                <SelectItem key={p.id} value={p.id}>
                                    {p.name}
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
                        name="serviceType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a service type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {serviceTypes.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="e.g., 1500" {...field} />
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
                               {billingStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit">Generate Bill</Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    </>
  );
}
