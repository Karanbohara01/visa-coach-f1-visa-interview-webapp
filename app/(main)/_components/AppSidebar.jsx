
'use client'
import Logo from "@/app/auth/Logo"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarOptions } from "@/services/Constant"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const path = usePathname();
    console.log(path);
    return (
        <Sidebar>
            <SidebarHeader className='flex  items-center mt-5'>


                <Logo />


                <Button className='w-full mt-5'><Plus />Create New Interview</Button>

            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarContent>
                        <SidebarMenu>
                            {SidebarOptions.map((option, index) => (
                                <SidebarMenuItem key={index} className='p-1'>
                                    <Link href={option.path}>
                                        <SidebarMenuButton className={`p-5  ${path == option.path && 'bg-purple-100'}`} >
                                            <option.icon />
                                            <span className={`w-[160px] ${path == option.path && 'text-primary'}`}>{option.name}</span>
                                        </SidebarMenuButton>
                                    </Link>

                                </SidebarMenuItem>
                            ))}

                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

