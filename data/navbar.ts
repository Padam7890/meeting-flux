import React from "react";
import { RiHome5Line } from "react-icons/ri";
import { IoAnalytics } from "react-icons/io5";

type NavbarItem = {
    icon: React.ElementType; 
    title: string;
    href:string
};

const navbarData: NavbarItem[] = [
    {
        icon: RiHome5Line,
        title: "Dashboard",
        href:"/"
    },
    {
        icon: IoAnalytics,
        title: "Analytics",
        href:"/analytics"
    }
];

export default navbarData;
