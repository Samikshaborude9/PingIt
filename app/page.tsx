"use client";
import Image from "next/image";
import { Manrope } from "next/font/google";
import React from "react";
import Navbar from "@/components/Navbar";
import Steps from "@/components/Steps";
import FeatureCards from "@/components/FeatureCards";
import { motion } from "motion/react";
import { BiDevices } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { LuFileSliders } from "react-icons/lu";
import { MdAccessTime } from "react-icons/md";
import { ImWhatsapp } from "react-icons/im";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import Heading from "@/components/Heading";


export default function Home() {
  return (
    <div className="bg-yellow-50 h-screen 2xl:px-16 xl:px-12 lg:px-5  sm:pt-5 pt-8">
      <Navbar />


      <div className="">

      
      <Heading message="How It Works" className="text-3xl md:text-4xl font-extrabold pt-16"/>
      <Steps/>
      </div>
    </div>
  );
}
