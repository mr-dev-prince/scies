import React from "react";
import { motion } from "framer-motion";

const dotTransition = {
  repeat: Infinity,
  ease: "easeInOut",
  duration: 1,
};

const Loader = () => {
  return (
    <div className="flex justify-center items-center gap-1 text-3xl font-bold text-white">
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ ...dotTransition, delay: 0 }}
      >
        •
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ ...dotTransition, delay: 0.2 }}
      >
        •
      </motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ ...dotTransition, delay: 0.4 }}
      >
        •
      </motion.span>
    </div>
  );
};

export default Loader;
