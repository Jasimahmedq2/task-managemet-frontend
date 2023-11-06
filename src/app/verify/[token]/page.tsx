"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useVerifyEmailMutation } from "@/redux/auth/authApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { error } from "console";
import { useRouter } from "next/navigation";

const VerifyEmail = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [verifyEmail, { isLoading, isSuccess, isError }] =
    useVerifyEmailMutation();

  const handleVerifyEmail = async (token: string) => {
    await verifyEmail(token);
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "email verified",
      });
      router.push("/login");
    }
    if (isError) {
      toast({
        title: "something went wrong",
      });
    }
  }, [isLoading, isSuccess, isError, toast, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-[#F0F8FF]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>verify</CardTitle>
          <CardDescription>
            hello there, click verify button to verify your email
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            onClick={() => handleVerifyEmail(params?.token)}
            className="w-full"
          >
            Verify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
