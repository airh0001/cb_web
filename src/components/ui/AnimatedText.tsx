import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: "words" | "chars" | "fade-up";
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const AnimatedText = ({
  text,
  className = "",
  type = "words",
  delay = 0,
  duration = 0.5,
  once = true,
}: AnimatedTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  // Word-by-word animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
      transition: { ease: [0.76, 0, 0.24, 1], duration: duration },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.215, 0.61, 0.355, 1], duration: duration + 0.2 },
    },
  };

  // Character-by-character animation variants
  const charContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: {
      y: "110%",
      opacity: 0,
      transition: { ease: [0.76, 0, 0.24, 1], duration: duration },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  // Simple fade up animation
  const fadeUpVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.215, 0.61, 0.355, 1],
        duration: duration + 0.3,
        delay: delay,
      },
    },
  };

  if (type === "words") {
    const words = text.split(" ");
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`flex flex-wrap items-center overflow-hidden py-1 ${className}`}
      >
        {words.map((word, index) => (
          <span key={index} className="relative overflow-hidden inline-block mr-[0.22em] py-0.5">
            <motion.span variants={childVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.div>
    );
  }

  if (type === "chars") {
    return (
      <motion.div
        ref={ref}
        variants={charContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`flex flex-wrap items-center overflow-hidden py-1 ${className}`}
      >
        {Array.from(text).map((char, index) => (
          <span key={index} className="relative overflow-hidden inline-block py-0.5">
            <motion.span variants={charVariants} className="inline-block whitespace-pre">
              {char}
            </motion.span>
          </span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {text}
    </motion.div>
  );
};
