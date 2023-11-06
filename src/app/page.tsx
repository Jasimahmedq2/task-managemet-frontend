"use client";
import { isLoggedIn } from "@/utiliies/auth.service";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  if (isLoggedIn()) router.push("/tasks");
  if(!isLoggedIn()) router.push('/login')
  return (
    <div>
      <p className="text-xl font-bold text-red-400">hello</p>
    </div>
  );
}
