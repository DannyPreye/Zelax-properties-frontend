"use client";
import React, { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/lib/providers/query-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
            </QueryClientProvider>
        </SessionProvider>
    );
    return <div>MainProvider</div>;
};

export default MainProvider;
