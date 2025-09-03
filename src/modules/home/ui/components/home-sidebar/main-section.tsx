"use client";

import { SidebarGroup, SidebarGroupContent, SidebarMenu , SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import { FrameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link"
import { SignedIn, useAuth, useClerk } from "@clerk/nextjs";

const items =[
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
     {
        title: "Subscriptions",
        url: "/feed/subscriptions",
        icon: PlaySquareIcon,
        auth: true,
    },
     {
        title: "Trending",
        url: "/feed/trending",
        icon: FrameIcon,
    },
];

export const MainSection =() =>{
    const {userId} = useAuth();
    const clerk = useClerk();
    return (
        <SidebarGroup>
            <SidebarGroupContent> 
                <SidebarMenu> 
                    {items.map((item) =>(
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                            tooltip={item.title}
                            asChild
                            isActive={false} // TODO: Change to look at current pathname
                            onClick={(e) => {
                                if (!userId && item.auth) {
                                    e.preventDefault();
                                    return clerk.openSignIn();
                                }
                            }} 
                            >
                                <Link href={item.url} className="flex items-center gap-4">
                                    <item.icon />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};