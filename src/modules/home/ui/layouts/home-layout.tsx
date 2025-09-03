import { SidebarProvider } from "@/components/ui/sidebar";
import { Homenavbar } from "../components/home-navbar";
import { HomeSidebar } from "@/modules/home/ui/components/home-sidebar";


interface HomeLayoutProps {
    children: React.ReactNode;

};

export const HomeLayout =({children} : HomeLayoutProps) => {
return (
    <SidebarProvider>
        <div className="w-full">
            <Homenavbar />
            <div className="flex min-h-screen pt-[4rem]">
                <HomeSidebar />
                <main className="flex-1 overflow-y-auto">
                    {children}  
                </main>
            </div>
        </div>
    </SidebarProvider>
);
};
