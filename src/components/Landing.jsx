import React from "react";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="h-screen pt-[10vh] cal-sans">
      <div className="h-full w-full flex justify-center items-center flex-col">
        <motion.h1
          className="text-9xl tracking-wider"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Student Council
        </motion.h1>
        <motion.p
          className="text-3xl font-semibold mt-8 tracking-wider"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          IES University, Bhopal
        </motion.p>
        <motion.p
          className="text-2xl mt-10"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          2025
        </motion.p>
      </div>
    </div>
  );
};

export default Landing;
