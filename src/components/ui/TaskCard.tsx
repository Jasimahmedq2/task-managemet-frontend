"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ITask } from "@/interfaces/auth.interface";
import { useCreateTaskMutation } from "@/redux/tasks/taskSlice";
import { getFromLocalStorage } from "@/utiliies/local-storage";
import { authKey } from "@/utiliies/authKey";
import { useToast } from "./use-toast";

const TaskCard = () => {
  const [date, setDate] = useState<Date>();
  const token = getFromLocalStorage(authKey);
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [createTask, { isLoading, isSuccess, isError, error }] =
    useCreateTaskMutation();

  const handleTask = async (data: any) => {
    const taskInfo = {
      info: { ...data },
      token,
    };
    await createTask(taskInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "task created",
      });
      reset();
    }
    if (isError) {
      toast({
        title: "something went wrong",
      });
      reset();
    }
  }, [isLoading, isSuccess, isError, reset, toast, error]);

  return (
    <div className="flex bg-white shadow-md p-4">
      <div className="flex-grow">
        <p className="text-lg font-bold">Create New Task</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            create task
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(handleTask)}>
            {/* <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader> */}
            <div className="grid gap-4 py-4">
              <div className="">
                <Label className="text-right">title</Label>
                <Input
                  className="col-span-3"
                  {...register("title", { required: "title is required" })}
                  aria-invalid={errors?.title ? "true" : "false"}
                />
                {errors?.title && (
                  <p className="text-sm text-red-400">
                    {errors?.title?.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label className="text-right">description</Label>
                <Input
                  className="col-span-3"
                  {...register("description", {
                    required: "description is required",
                  })}
                  aria-invalid={errors?.description ? "true" : "false"}
                />
                {errors?.description && (
                  <p className="text-sm text-red-400">
                    {errors?.description?.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label className="text-right">dueDate</Label>
                <Input
                  type="date"
                  className="col-span-3"
                  {...register("dueDate", { required: "dueDate is required" })}
                  aria-invalid={errors?.dueDate ? "true" : "false"}
                />
                {errors?.dueDate && (
                  <p className="text-sm text-red-400">
                    {errors?.dueDate?.message}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit">Save changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCard;
