import React from "react";
import { motion } from "framer-motion";
import council from "../assets/council.jpeg";

const Landing = () => {
  return (
    <div
      className="h-screen pt-[10vh] cal-sans bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${council})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="h-full w-full flex justify-center items-center flex-col px-4 text-center relative z-10 text-white">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl tracking-wider font-bold"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Student Council
        </motion.h1>
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4 sm:mt-6 md:mt-8 tracking-wider"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          IES University, Bhopal
        </motion.p>
        <motion.p
          className="text-base sm:text-lg md:text-xl mt-4 sm:mt-6 md:mt-10 font-sans max-w-md md:max-w-lg lg:max-w-xl mx-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          Empowering students through events, leadership, and community.
        </motion.p>
      </div>
    </div>
  );
};

export default Landing;
