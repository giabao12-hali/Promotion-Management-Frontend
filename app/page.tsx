'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </QueryClientProvider>
  );
}
