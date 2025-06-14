
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
                {/* <Image src={'/logo.png'}
                    alt="logo"
                    height={80} width={200}
                    className="w-[150px]" /> */}

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


// 'use client'
// import { Button } from "@/components/ui/button"
// import {
//     Sidebar,
//     SidebarContent,
//     SidebarFooter,
//     SidebarGroup,
//     SidebarHeader,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import { SidebarOptions } from "@/services/Constant"
// import { Plus } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// export function AppSidebar() {
//     const path = usePathname();
//     console.log(path);
//     return (
//         <Sidebar className="w-64 min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 shadow-lg">
//             <SidebarHeader className="flex flex-col items-center mt-5 space-y-3">
//                 <Image
//                     src={'/logo.png'}
//                     alt="logo"
//                     height={10}
//                     width={200}
//                     className="w-[150px]  "
//                 />
//                 <Button className="w-full  text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
//                     <Plus className="mr-2" />
//                     Create New Interview
//                 </Button>
//             </SidebarHeader>
//             <SidebarContent className="mt-6">
//                 <SidebarGroup>
//                     <SidebarContent>
//                         <SidebarMenu className="space-y-2">
//                             {SidebarOptions.map((option, index) => (
//                                 <SidebarMenuItem key={index}>
//                                     <Link href={option.path}>
//                                         <SidebarMenuButton
//                                             className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-purple-200 hover:text-purple-800 ${path === option.path
//                                                 ? 'bg-purple-100 text-purple-700  '
//                                                 : 'text-gray-700'
//                                                 }`}
//                                         >
//                                             <option.icon className="w-5 h-5" />
//                                             <span className={`font-medium ${path === option.path ? 'text-primary' : ''}`}>
//                                                 {option.name}
//                                             </span>
//                                         </SidebarMenuButton>
//                                     </Link>
//                                 </SidebarMenuItem>
//                             ))}
//                         </SidebarMenu>
//                     </SidebarContent>
//                 </SidebarGroup>
//                 <SidebarGroup />
//             </SidebarContent>
//             <SidebarFooter className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
//                 &copy; {new Date().getFullYear()} VisaCoach
//             </SidebarFooter>
//         </Sidebar>
//     )
// }
