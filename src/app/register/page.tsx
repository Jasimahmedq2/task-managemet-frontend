"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IRegister } from "@/interfaces/auth.interface";
import { useRegisterUserMutation } from "@/redux/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegister>();

  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();

  const onsubmit = async (data: IRegister) => {
    await registerUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "check email to verify your email",
      });
      reset();
    }
  }, [isLoading, isSuccess, isError, reset, toast]);
  return (
    <div className="flex justify-center items-center h-screen bg-[#F0F8FF]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Name</Label>
                <Input
                  {...register("name", { required: "name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder="write name here"
                />
                {errors?.name && (
                  <p className="text-sm text-red-400">{errors?.name.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>E-mail</Label>
                <Input
                  {...register("email", { required: "email is required" })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="write email here"
                />
                {errors?.email && (
                  <p className="text-sm text-red-400">
                    {errors?.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  {...register("password", {
                    required: "password is required",
                  })}
                  aria-invalid={errors.password ? "true" : "false"}
                  placeholder="write password here"
                />
                {errors?.password && (
                  <p className="text-sm text-red-400">
                    {errors?.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Link href="/login" className="text-green-500 underline">
                Login
              </Link>
              <Button type="submit">Register</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
