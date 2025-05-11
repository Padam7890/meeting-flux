"use client"
import { Heading, Paragraph } from "@/app/_components/Typography";
import { STATIC_IMAGES } from "@/data/staticimage";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/Button";

const SignUpPage = () => {

  const handlegooglelogin = () => {
    window.open('http://localhost:3001/api/v1/auth/google/login', '_blank');
  }
  return (
    <div className="flex flex-col  justify-center items-center mt-10 ">
      <div className=" max-w-[36.563rem] flex flex-col items-center justify-center gap-10">
        <Heading
          as={"h3"}
          className="text-h4 lg:text-h1 font-extrabold text-center"
        >
          Don’t know where your work time is going?
        </Heading>
        <Image
          src={STATIC_IMAGES.npcnoanswer.src}
          height={400}
          width={300}
          alt="image"
        />
        <Paragraph className=" text-base bg-[#F5F5F5]  p-3 rounded-full shadow-md ">
          *sshh* its the meetings 🤫😒
        </Paragraph>
        <div className=" mt-3 flex flex-col gap-3.5 items-center">
          <Paragraph>
            Power your accountability and boost productivity with Focus.{" "}
          </Paragraph>
          <Button onClick={handlegooglelogin} variant="primary" withArrow>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
