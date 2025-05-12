"use client"
import navbarData from "@/data/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <div className="h-screen w-full ml-3 mt-10 flex flex-col gap-1">
      {navbarData.map((value, index) => {
        const Icon = value.icon;
        const isActive = pathname === value.href;

        return (
          <Link
            key={index}
            href={value.href}
            className={`flex items-center gap-4 hover:bg-[#F5F5F5] p-2 rounded-lg mr-5 ${
              isActive ? "bg-[#F0F0F0] font-semibold active" : ""
            }`}
          >
            <Icon size={24} />
            <span className="text-lg">{value.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
