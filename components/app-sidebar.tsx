"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Home,
  Map,
  ShoppingCart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Hali Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Danh sách",
      url: "#",
      icon: ShoppingCart,
      isActive: true,
      items: [
        {
          title: "Sản phẩm",
          url: "/dashboard/products",
        },
        {
          title: "Mã khuyến mãi",
          url: "/dashboard/coupons",
        },
        {
          title: "Danh mục sản phẩm",
          url: "/dashboard/categories",
        }
      ],
    },
    {
      title: "Tài liệu",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Giới thiệu",
          url: "#",
        },
        {
          title: "Bắt đầu",
          url: "#",
        },
        {
          title: "Hướng dẫn",
          url: "#",
        },
        {
          title: "Thay đổi",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Trang chủ",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Bản tin du lịch",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
