"use client";
import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

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
import { getFromLocalStorage } from "@/utiliies/local-storage";
import { authKey } from "@/utiliies/authKey";
import { useForm } from "react-hook-form";
import {
  useRemoveTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/tasks/taskSlice";
import { useToast } from "./use-toast";

const DisplayTask = ({ task }: { task: any }) => {
  const [taskId, setTaskId] = useState<string>("");
  const token = getFromLocalStorage(authKey);
  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [updateTask, { isLoading, isSuccess, isError, error }] =
    useUpdateTaskMutation();
  const [
    removeTask,
    { isLoading: RLoading, isSuccess: RSuccess, isError: RError },
  ] = useRemoveTaskMutation();

  const handleTask = async (data: any) => {
    const taskInfo = {
      info: { ...data },
      token,
      taskId,
    };
    await updateTask(taskInfo);
    console.log(data);
  };
  const handleEditTask = (info: any) => {
    reset({
      title: task?.title,
      description: task?.description,
      dueDate: task?.dueDate,
    });
    setTaskId(info?._id);
  };

  const handleUpdateStatus = async (status: string, id: string) => {
    const taskInfo = {
      info: { status },
      token,
      taskId: id,
    };
    await updateTask(taskInfo);
  };
  const handleDeleteTask = async (id: string) => {
    const taskInfo = {
      token,
      taskId: id,
    };
    await removeTask(taskInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "task updated",
      });
      reset();
    }
    if (RSuccess) {
      toast({
        title: `task deleted`,
      });
    }
    if (isError || RError) {
      toast({
        title: `something went wrong`,
      });
      reset();
    }
  }, [isLoading, isSuccess, isError, reset, toast, error, RSuccess, RError]);
  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{task?.title}</h2>
          <p className="text-gray-600">{task?.description}</p>
        </div>
        <div>
          <button
            onClick={() => handleDeleteTask(task?._id)}
            className=" px-4 py-2 bg-red-400 text-white rounded"
          >
            delete
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="font-semibold">Task Status:</p>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                {" "}
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">
                  {task?.status}
                </button>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => handleUpdateStatus("pending", task?._id)}
                >
                  pending
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onClick={() => handleUpdateStatus("progress", task?._id)}
                >
                  progress
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  onClick={() => handleUpdateStatus("completed", task?._id)}
                >
                  completed
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div>
          <p className="font-semibold">Due Date:</p>
          <p>{task?.dueDate}</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleEditTask(task)}
              className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              edit
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
                </div>
                <div className="">
                  <Label className="text-right">description</Label>
                  <Input
                    className="col-span-3"
                    {...register("description", {
                      required: "title is required",
                    })}
                    aria-invalid={errors?.description ? "true" : "false"}
                  />
                </div>
                <div className="">
                  <Label className="text-right">dueDate</Label>
                  <Input
                    type="date"
                    className="col-span-3"
                    {...register("dueDate")}
                  />
                </div>
              </div>
              <Button type="submit">Save changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DisplayTask;
