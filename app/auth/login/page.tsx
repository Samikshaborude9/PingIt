"use client"
import Heading from "@/components/Heading";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import PastelButton from "@/components/PastelButton";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),

});

type LoginForm = z.infer<typeof formSchema>;


export default function LoginPage(){
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: LoginForm) =>{
    setLoading(true);
    const promise = axios.post(
      "/api/user/login",
      {
        email: values.email,
        password: values.password,
      },
      { withCredentials: true }
    );
    toast.promise(promise, {
      loading: "Logging in...",
      success: () => {
        router.push("/app/home");
        return "Login successful!";
      },
      error: (err) =>
        err.response?.data?.message || "Invalid email or password",
    });

    setLoading(false);
  }


  return(
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="flwx w-full justify-center gap-10">
        <motion.div
        initial={{ x: -200, opacity: 0, scale: 0.9 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring" }}
        className="w-full max-w-md bg-[#CCFFE6] border-2 border-black p-8 shadow-2xl">

          <Heading
            message="Login"
            className="text-3xl font-extrabold text-center mb-2"
          />
          <p className="text-center mb-6">
            Welcome back! Please log in to your account.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            </form>


        </motion.div>


        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring" }}
          className="hidden md:block"
        >
          <Image
            src="/login.png"
            alt="Login"
            width={500}
            height={500}
          />
        </motion.div>
      </div>

    </div>
  )
} 