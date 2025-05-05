import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sc from "../assets/sc.jpeg";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api";
import { notifyError } from "../toast";
import { DummyCard, MemberCard } from "./CurrentMembers";

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
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
    refetchOnWindowFocus: false,
    onError: () => {
      notifyError("Failed to fetch members.");
    },
  });

  const president = data?.find(
    (member) => member.position.toLowerCase() === "president"
  );

  const vicePresident = data?.find(
    (member) => member.position.toLowerCase() === "vice president"
  );

  const secretary = data?.find(
    (member) => member.position.toLowerCase() === "secretary"
  );

  return (
    <div className="h-fit">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
        className="py-8 md:py-12 px-4 md:px-6 text-center"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-4xl font-semibold mb-4 cal-sans tracking-wider"
        >
          About the Council
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="mx-auto text-gray-800 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 font-semibold mb-6 text-sm sm:text-base"
        >
          The Student Council serves as the official voice of the student body,
          organizing events, resolving issues, and creating a vibrant college
          environment. We are a team of elected representatives committed to
          leadership, service, and unity.
        </motion.p>
        <motion.div
          variants={cardVariants}
          className="flex justify-center items-center"
        >
          <img 
            src={sc} 
            alt="Student Council" 
            className="h-[30vh] sm:h-[40vh] md:h-[50vh] w-full object-cover rounded-md max-w-2xl" 
          />
        </motion.div>
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="px-4 md:px-6 mt-4"
      >
        <motion.h2
          variants={cardVariants}
          className="text-2xl md:text-3xl font-semibold text-center mb-4 md:mb-6 cal-sans tracking-wider"
        >
          Meet the Council Members
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="text-center text-gray-800 mb-6 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 font-semibold text-sm sm:text-base"
        >
          Our council members are dedicated to serving the student body and
          enhancing the college experience. They are passionate about
          representing the interests of their peers and making a positive impact
          on campus life.
        </motion.p>
        <motion.div
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 w-full"
        >
          {president ? <MemberCard member={president} /> : <DummyCard />}
          {vicePresident ? (
            <MemberCard member={vicePresident} />
          ) : (
            <DummyCard />
          )}
          {secretary ? <MemberCard member={secretary} /> : <DummyCard />}
        </motion.div>
        <motion.div variants={cardVariants} className="mt-10 text-center pb-8">
          <Link
            to={"/members"}
            className="bg-white px-8 sm:px-10 py-2 sm:py-3 font-semibold rounded-md hover:bg-black hover:text-white transition duration-200"
          >
            More Members
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutCouncil;