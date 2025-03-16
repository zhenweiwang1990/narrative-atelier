
// Export all sidebar components from a single entry point
export {
  SidebarProvider,
  useSidebar,
} from "./SidebarProvider";

// Core components
export { Sidebar } from "./core/Sidebar";
export { SidebarTrigger } from "./core/SidebarTrigger";
export { SidebarRail } from "./core/SidebarRail";
export { SidebarInset } from "./core/SidebarInset";

// Structure components
export {
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
} from "./structure/SidebarStructure";

// Group components
export {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
} from "./group/SidebarGroup";

// Menu components
export {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./menu";
