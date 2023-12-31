import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/lib/reduxProvider";
import { Toaster } from "@/components/ui/toaster";
import { NavBar } from "@/components/Layout/Navbar";
import { isLoggedIn } from "@/utiliies/auth.service";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {children}
          <Toaster />
        </body>
      </html>
    </ReduxProvider>
  );
}
