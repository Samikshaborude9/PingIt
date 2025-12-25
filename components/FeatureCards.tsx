"use client";
import React, { ReactNode } from "react";
import { motion } from "motion/react";
import Heading from "./Heading";

type FeatureCardProps = {
    message: string;
    content: string;
    icon: ReactNode;
}

export default function FeatureCard ({ message, content, icon }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{scale: 0.8 }}
            >
                <div className="border-2 border-black rotate-2 bg-[#FFCCE6] h-full ">
                    <div className="border-2 border-black -rotate-1 h-full bg-[#FFCCE6]">
                        <div className="border-2 border-black -rotate-1 h-full bg-[#FFCCE6] p-8 grid grid-cols-5 gap-5">
                            <div className="col-span-4">
                                <Heading message={message} className="text-2xl mb-4"/>
                                <p className="text-base pt-3">{content}</p>
                            </div>
                            <div className="flex items-center justify-center">{icon}</div>
                        </div>
                    </div>
                </div>

        </motion.div>
    )
    
}
