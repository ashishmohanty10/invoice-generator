import { House, BadgePlus } from "lucide-react";

export const sideBar = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: House,
  },
  {
    id: 2,
    name: "Create Invoice",
    path: "/dashboard/new",
    icon: BadgePlus,
  },
];

export const publicRoutes = ["/"];
export const authRoutes = ["/signin", "/signup"];
export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
