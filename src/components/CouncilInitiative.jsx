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
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
      className="py-16 px-6 text-center"
    >
      <motion.h2
        variants={itemVariants}
        className="text-5xl font-semibold cal-sans tracking-wider"
      >
        Council Initiatives
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mt-12">
        {homePageEventImages.map((image) => (
          <motion.img
            key={image.id}
            src={image.src}
            alt={image.title}
            variants={itemVariants}
            className="rounded-lg shadow-lg mb-4 h-[25vh] w-[25vw] object-cover mx-auto"
          />
        ))}
      </div>

      <motion.p
        variants={itemVariants}
        className="max-w-3xl mx-auto text-gray-600 mb-12"
      >
        We host events, workshops, and campaigns for student welfare, social
        awareness, and campus engagement. Stay tuned for our upcoming drives,
        fests, and leadership forums!
      </motion.p>

      <motion.div variants={itemVariants}>
        <Link
          to="/events"
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          View Events
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default CouncilInitiative;
