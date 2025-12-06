"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Plus, Trash2, Loader2 } from "lucide-react";

interface BlockedDatesManagementProps {
  propertyId: number;
}

const blockedDateSchema = z.object({
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  reason: z.string().optional(),
});

type BlockedDateFormData = z.infer<typeof blockedDateSchema>;

export function BlockedDatesManagement({
  propertyId,
}: BlockedDatesManagementProps) {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blockedDateToDelete, setBlockedDateToDelete] = useState<number | null>(null);

  const { data: blockedDates, isLoading } = useQuery({
    queryKey: ["property-blocked-dates", propertyId],
    queryFn: () => PropertiesService.propertiesBlockedDatesList(propertyId),
  });

  const form = useForm<BlockedDateFormData>({
    resolver: zodResolver(blockedDateSchema),
    defaultValues: {
      start_date: "",
      end_date: "",
      reason: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: BlockedDateFormData) =>
      PropertiesService.propertiesBlockedDatesCreate(propertyId, {
        start_date: data.start_date,
        end_date: data.end_date,
        reason: data.reason || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property-blocked-dates", propertyId],
      });
      toast.success("Blocked dates added successfully");
      setDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to add blocked dates"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (blockedDateId: number) =>
      PropertiesService.propertiesBlockedDatesDestroy(
        blockedDateId,
        propertyId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property-blocked-dates", propertyId],
      });
      toast.success("Blocked dates deleted successfully");
      setDeleteDialogOpen(false);
      setBlockedDateToDelete(null);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to delete blocked dates"
      );
    },
  });

  const onSubmit = (data: BlockedDateFormData) => {
    if (new Date(data.start_date) > new Date(data.end_date)) {
      toast.error("Start date must be before end date");
      return;
    }
    createMutation.mutate(data);
  };

  const handleDelete = (id: number) => {
    setBlockedDateToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (blockedDateToDelete) {
      deleteMutation.mutate(blockedDateToDelete);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blocked Dates</CardTitle>
          <CardDescription>
            Block dates when your property is not available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Blocked Dates</CardTitle>
              <CardDescription>
                Block dates when your property is not available
              </CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Block Dates
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Block Dates</DialogTitle>
                  <DialogDescription>
                    Block a date range when your property is not available
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="start_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="end_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason (optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Maintenance, personal use, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Optional reason for blocking these dates
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={createMutation.isPending}
                      >
                        {createMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Blocking...
                          </>
                        ) : (
                          "Block Dates"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {blockedDates?.results && blockedDates.results.length > 0 ? (
            <div className="space-y-2">
              {blockedDates.results.map((blockedDate) => (
                <div
                  key={blockedDate.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {new Date(blockedDate.start_date).toLocaleDateString()} -{" "}
                        {new Date(blockedDate.end_date).toLocaleDateString()}
                      </p>
                      {blockedDate.reason && (
                        <p className="text-sm text-muted-foreground">
                          {blockedDate.reason}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(blockedDate.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                No blocked dates set yet
              </p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Block Dates
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blocked Dates?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. These blocked dates will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}





