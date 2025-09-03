"use client";

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu , SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import { HistoryIcon,  ListVideoIcon,  ThumbsUpIcon } from "lucide-react";
import Link from "next/link"
import { SignedIn, SignIn, useAuth, useClerk } from "@clerk/nextjs";

const items =[
    {
        title: "History",
        url: "/playlist/history",
        icon: HistoryIcon,
        auth:true,
    },
     {
        title: "Liked videos",
        url: "/playlist/liked",
        icon: ThumbsUpIcon,
        auth: true,
    },
     {
        title: "All playlist",
        url: "/playlists",
        icon: ListVideoIcon,
        auth: true, 
    },
];

export const PersonalSection =() =>{
    const {userId} = useAuth();
    const clerk = useClerk();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent> 
                <SidebarMenu> 
                    {items.map((item) =>(
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                            tooltip={item.title}
                            asChild
                            isActive={false} // TODO: Change to look at current pathname
                            onClick={(e) => {
                                if (!userId && item.auth){
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