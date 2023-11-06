"use client";
import TaskCard from "@/components/ui/TaskCard";
import DisplayTask from "@/components/ui/displayTask";
import { ITask } from "@/interfaces/auth.interface";
import { useGetUserTaskQuery } from "@/redux/tasks/taskSlice";
import { authKey } from "@/utiliies/authKey";
import { getFromLocalStorage } from "@/utiliies/local-storage";

const Tasks = () => {
  const token = getFromLocalStorage(authKey);
  const { data, isLoading, isSuccess } = useGetUserTaskQuery(token);
  return (
    <div className="p-12 bg-[#F0F8FF] min-h-screen">
      <div>
        <TaskCard />
      </div>
      <div className="pt-8">
        <h2 className="text-xl font-bold pt-4 pb-4">your task List</h2>
        <div className="space-y-4">
          {data?.data?.map((task: any) => (
            <DisplayTask key={task?._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
