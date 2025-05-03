import React from "react";
import { motion } from "framer-motion";
import { councilMembers } from "../constants/images";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AboutCouncil = () => {
  return (
    <div className="h-screen">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className="py-16 px-6 text-center"
      >
        <motion.h2
          variants={cardVariants}
          className="text-4xl font-semibold mb-4 cal-sans tracking-wider"
        >
          About the Council
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="mx-auto text-gray-800 px-64"
        >
          The Student Council serves as the official voice of the student body,
          organizing events, resolving issues, and creating a vibrant college
          environment. We are a team of elected representatives committed to
          leadership, service, and unity.
        </motion.p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="px-6 mt-12"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl font-semibold text-center mb-10 cal-sans tracking-wider"
        >
          Meet the Council Members
        </motion.h2>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mt-4"
        >
          {councilMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition flex justify-center items-center flex-col"
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-blue-600">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutCouncil;
