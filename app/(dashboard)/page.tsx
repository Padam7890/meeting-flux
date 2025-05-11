"use client"
import http from "@/lib/http";
import React, { useEffect } from "react";

const DashBoard = () => {
  useEffect(() => {
    getUserdata();
  }, []);

  const getUserdata = async () => {
    const response = await http.get("/auth/user");
    console.log(response);
  };
  return <div>DashBoard</div>;
};

export default DashBoard;
