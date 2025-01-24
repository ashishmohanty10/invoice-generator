"use client";

import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function UserProfile() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
    : userEmail?.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          <p className="font-medium">{userName}</p>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={() => signOut()}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
