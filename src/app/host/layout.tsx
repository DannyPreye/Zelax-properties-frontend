"use client";

import * as React from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function getBreadcrumbs(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    if (
        segments.length === 0 ||
        (segments.length === 1 && segments[0] === "host")
    ) {
        return [{ label: "Dashboard", href: "/host" }];
    }

    // Always start with Dashboard
    breadcrumbs.push({ label: "Dashboard", href: "/host" });

    // Add other segments
    for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const href = `/${segments.slice(0, i + 1).join("/")}`;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);
        breadcrumbs.push({ label, href });
    }

    return breadcrumbs;
}

export default function HostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const breadcrumbs = useMemo(
        () => getBreadcrumbs(pathname || ""),
        [pathname]
    );

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
                    <SidebarTrigger className='-ml-1' />
                    <Separator
                        orientation='vertical'
                        className='mr-2 data-[orientation=vertical]:h-4'
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((crumb, index) => (
                                <React.Fragment key={crumb.href}>
                                    {index > 0 && (
                                        <BreadcrumbSeparator className='hidden md:block' />
                                    )}
                                    <BreadcrumbItem
                                        className={
                                            index === 0 ? "hidden md:block" : ""
                                        }
                                    >
                                        {index === breadcrumbs.length - 1 ? (
                                            <BreadcrumbPage>
                                                {crumb.label}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={crumb.href}>
                                                    {crumb.label}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
