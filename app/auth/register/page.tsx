"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import PastelButton from "@/components/PastelButton";
import { motion } from "motion/react";
import { toast } from "sonner";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

import { Eye, EyeOff } from "lucide-react";

/* ------------------ Schema ------------------ */
const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number is required"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof formSchema>;

/* ------------------ Component ------------------ */
export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterForm>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: RegisterForm) => {
    setLoading(true);

    const promise = axios.post("/api/user/register", {
      name: values.name,
      email: values.email,
      phone: values.phoneNumber,
      password: values.password,
      password_confirmation: values.confirmPassword,
    });

    toast.promise(promise, {
      loading: "Creating your account...",
      success: () => {
        router.push("/auth/verify-email");
        return "Registration successful!";
      },
      error: (err) =>
        err.response?.data?.message || "Registration failed",
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="flex w-full justify-center gap-10">

        {/* -------- Form Card -------- */}
        <motion.div
          initial={{ x: -200, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
          className="w-full max-w-md bg-[#CCFFE6] border-2 border-black p-8 shadow-2xl"
        >
          <Heading
            message="Register"
            className="text-3xl font-extrabold text-center mb-2"
          />
          <p className="text-center mb-6">
            Enter your details to get started
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <FieldContent>
                <Input {...register("name")} placeholder="Your name" />
                <FieldError errors={[errors.name]} />
              </FieldContent>
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input {...register("email")} placeholder="Email" />
                <FieldError errors={[errors.email]} />
              </FieldContent>
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <FieldContent>
                <PhoneInput
                  defaultCountry="in"
                  onChange={(value) => setValue("phoneNumber", value)}
                />
                <FieldError errors={[errors.phoneNumber]} />
              </FieldContent>
            </Field>

            {/* Password */}
            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <FieldError errors={[errors.password]} />
              </FieldContent>
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <FieldContent>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                <FieldError errors={[errors.confirmPassword]} />
              </FieldContent>
            </Field>

            <PastelButton
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Registering..." : "Submit"}
            </PastelButton>
          </form>

          <div className="text-center mt-6 space-y-2">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline font-semibold">
                Login
              </Link>
            </p>
            <Link href="/" className="underline">
              Back to home
            </Link>
          </div>
        </motion.div>

        {/* -------- Image -------- */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring" }}
          className="hidden md:block"
        >
          <Image
            src="/email-signup.png"
            alt="Register"
            width={500}
            height={500}
          />
        </motion.div>
      </div>
    </div>
  );
}
