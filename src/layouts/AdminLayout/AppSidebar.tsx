import * as React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  Users,
  LogOut,
  FileText,
  type LucideIcon,
} from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores";
import { logout } from "@/api/auth";

interface MenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: MenuItem[];
}

const data = {
  navMain: [
    { title: "工作台", url: "/home", icon: LayoutDashboard },
    {
      title: "系统管理",
      url: "/sys",
      icon: Settings,
      items: [
        { title: "用户管理", url: "/sys/user", icon: Users },
        { title: "角色管理", url: "/sys/role", icon: Users },
        {
          title: "日志管理",
          url: "#",
          icon: FileText,
          items: [
            { title: "操作日志", url: "/sys/log/opt" },
            { title: "登录日志", url: "/sys/log/login" },
          ],
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { userInfo, clearAuth } = useAuthStore();

  const handleLogout = () => {
    logout().finally(() => {
      clearAuth();
      navigate("/login", { replace: true });
    });
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <LayoutDashboard className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Mu Admin</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* 使用专门处理第一级菜单的组件 */}
            {data.navMain.map((item) => (
              <SidebarItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userInfo?.avatar} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userInfo?.username || "User"}</span>
                    <span className="truncate text-xs">Admin</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// =====================================================================
// 核心修复：将渲染拆分为“第一级”和“子级”，避免 HTML 嵌套错误
// =====================================================================

// 1. 处理第一级菜单 (Root Level)
// 使用 SidebarMenuItem 和 SidebarMenuButton
function SidebarItem({ item }: { item: MenuItem }) {
  const location = useLocation();
  const navigate = useNavigate();
  const hasChildren = item.items && item.items.length > 0;
  const isActive = location.pathname.startsWith(item.url);

  if (!hasChildren) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={item.title}
          isActive={location.pathname === item.url}
          onClick={() => navigate(item.url)}
        >
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {/* 子级渲染逻辑：调用 SubSidebarItem */}
            {item.items?.map((sub) => (
              <SubSidebarItem key={sub.title} item={sub} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

// 2. 处理无限层级子菜单 (Nested Level)
// 使用 SidebarMenuSubItem 和 SidebarMenuSubButton
function SubSidebarItem({ item }: { item: MenuItem }) {
  const location = useLocation();
  const navigate = useNavigate();
  const hasChildren = item.items && item.items.length > 0;
  const isActive = location.pathname.startsWith(item.url);

  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          isActive={location.pathname === item.url}
          onClick={() => navigate(item.url)}
        >
          <span>{item.title}</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    );
  }

  return (
    <SidebarMenuSubItem>
      <Collapsible asChild defaultOpen={isActive} className="group/collapsible">
        {/* 注意：这里加一个 div 或者 Fragment 是为了让结构更清晰，
            但 Collapsible 作为一个 Radix Primitive 也可以直接作为容器 */}
        <div>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton>
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {/* 递归：子菜单继续调用 SubSidebarItem */}
              {item.items?.map((sub) => (
                <SubSidebarItem key={sub.title} item={sub} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </SidebarMenuSubItem>
  );
}
