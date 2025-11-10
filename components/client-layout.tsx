"use client";

import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryProvider from "@/components/react-query-client-provider";
import NavBar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <NavBar />
        <div className="min-h-screen">{children}</div>
        <Toaster position="top-center" />
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
