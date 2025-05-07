import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { homePageEventImages } from "../constants/images";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CouncilInitiative = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      className="py-16 px-4 sm:px-6 text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold cal-sans tracking-wide"
      >
        Council Initiatives
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto mt-10 sm:mt-12">
        {homePageEventImages.map((image) => (
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.title}
            variants={itemVariants}
            className="rounded-md shadow-lg h-48 sm:h-56 md:h-60 w-full object-cover mx-auto"
          />
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="max-w-2xl sm:max-w-3xl mx-auto text-gray-600 mt-8 mb-10 px-2 text-sm sm:text-base"
      >
        We host events, workshops, and campaigns for student welfare, social
        awareness, and campus engagement. Stay tuned for our upcoming drives,
        fests, and leadership forums!
      </motion.p>

      <motion.div variants={itemVariants}>
        <Link
          to="/events"
          className="bg-white hover:bg-black text-black font-semibold hover:text-white px-8 py-2 sm:px-12 sm:py-3 rounded-md duration-200 border border-black"
        >
          View Events
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CouncilInitiative;
