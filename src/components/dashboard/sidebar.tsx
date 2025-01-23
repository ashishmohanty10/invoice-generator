"use client";

import { sideBar } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full shadow-lg border-r border-slate-500/30 h-screen rounded-2xl bg-transparent backdrop-blur-md flex flex-col items-start p-5 justify-start">
      <div className="w-full">
        <p className="text-xl text-center font-bold uppercase bg-gradient-to-tr from-stone-600 to-stone-800 bg-clip-text text-transparent">
          Invoicely
        </p>
      </div>

      <div className="py-10 w-full flex flex-col gap-2">
        {sideBar.map((items) => (
          <Link
            key={items.id}
            href={items.path}
            className={cn(
              "flex whitespace-nowrap items-center gap-3 w-full py-2 px-4 rounded-xl hover:bg-secondary hover:text-black transition-all duration-500 ease-in-out",
              pathname === items.path ? "bg-secondary text-black" : ""
            )}
          >
            <items.icon size={18} />
            <p>{items.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
