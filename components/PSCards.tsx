import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { useTransform, useScroll, MotionValue } from "motion/react";
import Heading from "./Heading";

interface PSCardsProps {
  i: number;
  heading: string;
  points: string[];
  imageSrc: string;
  className?: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function useBreakpoint(): "xl" | "lg" | "base" {
  const [breakpoint, setBreakpoint] =
    useState<"xl" | "lg" | "base">("base");

  useEffect(() => {
    const checkBreakpoint = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setBreakpoint("xl");
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setBreakpoint("lg");
      } else {
        setBreakpoint("base");
      }
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
}

const PSCards: React.FC<PSCardsProps> = ({
  i,
  heading,
  points,
  imageSrc,
  progress,
  range,
  targetScale,
  className,
}) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const breakpoint = useBreakpoint();

  const getTopOffset = () => {
    if (breakpoint === "xl") return i * 25;
    if (breakpoint === "lg") return i * 40;
    return i * 40;
  };

  return (
    <div
      ref={container}
      className="relative w-full flex justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(0vh + ${getTopOffset()}px)`,
        }}
        className={`
          relative
          flex flex-col-reverse
          sm:grid sm:grid-cols-5
          gap-5
          bg-[#CCFFE6]
          p-5 md:p-10
          border-2 border-black
          w-full
          shadow-lg
          ${className}
        `}
      >
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3 }}
          className="col-span-3 origin-top"
        >
          <Heading
            message={heading}
            className="text-2xl md:text-3xl text-start"
          />

          <div className="space-y-3 md:space-y-6 text-start text-lg md:text-xl font-semibold pt-5 md:pt-10">
            {points.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
        </motion.div>

        {/* Image Section */}
        <div className="col-span-2 flex justify-center items-center">
          <div className="overflow-hidden rounded-xl">
            <motion.div style={{ scale: imageScale }}>
              <Image
                src={imageSrc}
                alt={heading}
                height={250}
                width={250}
                className="hidden md:block"
              />
              <Image
                src={imageSrc}
                alt={heading}
                height={150}
                width={150}
                className="md:hidden"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PSCards;
