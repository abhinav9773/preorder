"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className="relative flex min-h-screen items-center mx-auto flex-col pt-[10vh]">
        {children}
      </div>

      <Footer />
    </>
  );
}
