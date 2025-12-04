"use client";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/lib/providers/query-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

interface MainProviderProps {
    children: React.ReactNode;
}
const MainProvider = ({ children }: MainProviderProps) => {
    const [queryClient] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                    refetchOnWindowFocus: false,
                },
            },
        })
    );
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default MainProvider;
