"use client";

import { isLoggedIn, removeUserInfo } from "@/utiliies/auth.service";
import { authKey } from "@/utiliies/authKey";
import { getFromLocalStorage } from "@/utiliies/local-storage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const NavBar = () => {
  const router = useRouter();

  const token = getFromLocalStorage(authKey);

  const handleLogin = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 sticky top-0 bg-white shadow z-10">
      <div className="relative flex items-center justify-between">
        <div className="inline-flex items-center">
          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Task Management
          </span>
        </div>
        <div className="flex items-center space-x-8 lg:flex">
          {isLoggedIn() && (
            <Link className="no-underline" href="/tasks">
              <div className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#f5e3e3]  ">
                Task
              </div>
            </Link>
          )}

          {isLoggedIn() ? (
            <div>
              <Link
                href="login"
                onClick={handleLogin}
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#6922ff] focus:shadow-outline focus:outline-none cursor-pointer no-underline"
                aria-label="Sign up"
                title="Sign up"
              >
                LogOut
              </Link>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-[#6922ff] focus:shadow-outline focus:outline-none no-underline"
                aria-label="Sign up"
                title="Sign up"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
